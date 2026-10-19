#!/usr/bin/env node
/**
 * Kotify DS — token build.
 *
 * Source:  tokens/figma-export/{primitives,semantics,component,effects}.txt
 *          (raw export of the Figma variables, one line per variable:
 *           name|type|value|scopes — see tokens/README.md)
 * Output:  tokens/kotify.tokens.json                       (structured tokens, aliases preserved)
 *          projects/kotify-ds/src/styles/tokens.css         (CSS custom properties, aliases as var())
 *          projects/kotify-ds/src/foundations/tokens.generated.ts (metadata for Storybook docs)
 *
 * Figma is the source of truth. This script never invents values: it only
 * translates what the export contains, and fails if the export breaks the
 * Primitives → Semantics → Component hierarchy.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exportDir = join(root, 'tokens/figma-export');

const COLLECTIONS = [
  { key: 'P', name: 'Primitives', file: 'primitives.txt', expected: 155, mayReference: null },
  { key: 'S', name: 'Semantics', file: 'semantics.txt', expected: 104, mayReference: 'P' },
  { key: 'C', name: 'Component', file: 'component.txt', expected: 334, mayReference: 'S' },
];
const TYPES = { C: 'color', F: 'number', S: 'string' };
const SCOPE_ALIASES = { FILL: 'FRAME_FILL,SHAPE_FILL', TSE: 'TEXT_FILL,STROKE_COLOR,EFFECT_COLOR' };

/** Same rule Figma's code syntax uses in this file: lowercase, "/", spaces and commas → "-". */
const cssName = (name) => '--' + name.toLowerCase().replace(/[\/\s,]+/g, '-');

const errors = [];
const tokens = new Map(); // key "P:name" → token

for (const col of COLLECTIONS) {
  const lines = readFileSync(join(exportDir, col.file), 'utf8').split('\n').filter(Boolean);
  if (lines.length !== col.expected) errors.push(`${col.name}: expected ${col.expected} variables, found ${lines.length}`);
  for (const line of lines) {
    const [name, t, raw, scopesRaw = ''] = line.split('|');
    const id = `${col.key}:${name}`;
    if (tokens.has(id)) errors.push(`Duplicate name: ${col.name}/${name}`);
    const scopes = scopesRaw
      ? scopesRaw.split(',').flatMap((s) => (SCOPE_ALIASES[s] ?? s).split(','))
      : [];
    const token = { collection: col.name, key: col.key, name, type: TYPES[t], scopes, css: cssName(name) };
    if (raw.startsWith('@')) {
      const [, refKey, rest] = raw.match(/^@([PSC]):(.*)$/);
      const [refName, opacity] = rest.split('~');
      token.alias = { id: `${refKey}:${refName}`, opacity: opacity === undefined ? null : Number(opacity) };
      if (refKey !== col.mayReference) {
        errors.push(`Hierarchy: ${col.name}/${name} references ${refKey}:${refName}`);
      }
    } else {
      if (col.key !== 'P' && !['C:time picker/container/number/fixed-width', 'C:time picker/container/number/fixed-height', 'C:text field/min-height'].includes(id)) {
        // Raw values outside Primitives are reported, not rejected: Figma allows them.
        console.warn(`note: raw value in ${col.name}: ${name} = ${raw}`);
      }
      token.value = t === 'F' ? Number(raw) : raw;
    }
    tokens.set(id, token);
  }
}

for (const tok of tokens.values()) {
  if (tok.alias && !tokens.has(tok.alias.id)) errors.push(`Broken alias: ${tok.collection}/${tok.name} → ${tok.alias.id}`);
}

// Kotify effect styles (Figma effect styles are not variables): name|LAYER;LAYER
// LAYER = "DROP_SHADOW x y blur spread #rrggbb alpha%"
const effects = readFileSync(join(exportDir, 'effects.txt'), 'utf8').split('\n').filter(Boolean).map((line) => {
  const [name, layersRaw] = line.split('|');
  const layers = layersRaw.split(';').map((l) => {
    const [type, x, y, blur, spread, hex, alpha] = l.trim().split(/\s+/);
    if (type !== 'DROP_SHADOW' && type !== 'INNER_SHADOW') errors.push(`Effect ${name}: unsupported layer ${type}`);
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const px = (v) => (Number(v) === 0 ? '0' : `${v}px`);
    return `${type === 'INNER_SHADOW' ? 'inset ' : ''}${px(x)} ${px(y)} ${px(blur)} ${px(spread)} rgb(${r} ${g} ${b} / ${alpha}%)`;
  });
  return { name, css: cssName(name), value: layers.join(', ') };
});

if (errors.length) {
  console.error('Token build failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}

/** Unit for a raw number, decided by token path and Figma scope. */
function unitFor(tok) {
  const n = tok.name;
  if (n.includes('font-weight') || n.startsWith('font/weight/')) return '';
  if (n.startsWith('font/leading/')) return '%'; // relative line-height (100 = 100%)
  if (n.startsWith('font/tracking/')) return 'tracking'; // percent of font size → em
  return 'px';
}

function cssValue(tok) {
  if (tok.alias) {
    const target = tokens.get(tok.alias.id);
    if (tok.alias.opacity === null) return `var(${target.css})`;
    return `color-mix(in srgb, var(${target.css}) ${tok.alias.opacity}%, transparent)`;
  }
  if (tok.type === 'color') return tok.value;
  if (tok.type === 'string') return `"${tok.value}"`;
  const unit = unitFor(tok);
  if (unit === 'tracking') return tok.value === 0 ? '0' : `${tok.value / 100}em`;
  if (unit === 'px' && tok.value === 0) return '0';
  return `${tok.value}${unit}`;
}

/** Follow aliases to the final value (for documentation and checks). */
function resolve(tok, seen = new Set()) {
  if (!tok.alias) return { value: cssValue(tok), opacity: null };
  if (seen.has(tok)) throw new Error(`Alias cycle at ${tok.name}`);
  seen.add(tok);
  const inner = resolve(tokens.get(tok.alias.id), seen);
  return { value: inner.value, opacity: tok.alias.opacity ?? inner.opacity };
}

const header = `/* Kotify DS tokens — GENERATED by scripts/build-tokens.mjs from the Figma export. Do not edit by hand. */\n`;

// CSS
let css = header + ':root {\n';
for (const col of COLLECTIONS) {
  css += `  /* ${col.name} */\n`;
  for (const tok of tokens.values()) if (tok.key === col.key) css += `  ${tok.css}: ${cssValue(tok)};\n`;
  css += '\n';
}
css += '  /* Effects (Figma effect styles) */\n';
for (const e of effects) css += `  ${e.css}: ${e.value};\n`;
css = css.trimEnd() + '\n}\n';

// JSON (structured, aliases preserved)
const json = { $description: 'Kotify DS tokens exported from Figma (file a2v6x5b3ALVaR5Us1fdNGB). Figma is the source of truth.' };
for (const col of COLLECTIONS) {
  json[col.name] = {};
  for (const tok of tokens.values()) {
    if (tok.key !== col.key) continue;
    const entry = { $type: tok.type, css: tok.css, scopes: tok.scopes };
    if (tok.alias) {
      const target = tokens.get(tok.alias.id);
      entry.$value = `{${target.collection}.${target.name}}`;
      if (tok.alias.opacity !== null) entry.opacity = tok.alias.opacity;
    } else entry.$value = tok.value;
    json[col.name][tok.name] = entry;
  }
}

json.Effects = Object.fromEntries(effects.map((e) => [e.name, { $type: 'shadow', css: e.css, $value: e.value }]));

// TS metadata for Storybook
const meta = [...tokens.values()].map((tok) => {
  const r = resolve(tok);
  const target = tok.alias ? tokens.get(tok.alias.id) : null;
  return {
    collection: tok.collection,
    name: tok.name,
    type: tok.type,
    css: tok.css,
    aliasOf: target ? `${target.collection}/${target.name}` : null,
    opacity: tok.alias?.opacity ?? null,
    resolved: r.value,
  };
});
const ts = `${header}
export interface KotifyTokenMeta {
  collection: 'Primitives' | 'Semantics' | 'Component';
  name: string;
  type: 'color' | 'number' | 'string';
  /** CSS custom property name, e.g. --color-primary-base */
  css: string;
  /** Referenced variable as "Collection/name", or null for raw values. */
  aliasOf: string | null;
  /** Alias opacity in percent (Figma alias-with-opacity), or null. */
  opacity: number | null;
  /** Final value after following aliases (opacity not applied). */
  resolved: string;
}

export const KOTIFY_TOKENS: readonly KotifyTokenMeta[] = ${JSON.stringify(meta, null, 2)} as const;
`;

const out = (rel, content) => {
  const p = join(root, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
};
out('tokens/kotify.tokens.json', JSON.stringify(json, null, 2) + '\n');
out('projects/kotify-ds/src/styles/tokens.css', css);
out('projects/kotify-ds/src/foundations/tokens.generated.ts', ts);

const counts = COLLECTIONS.map((c) => `${c.name} ${[...tokens.values()].filter((t) => t.key === c.key).length}`).join(', ');
console.log(`Tokens OK — ${tokens.size} variables (${counts}) + ${effects.length} effect style(s). Hierarchy and aliases verified.`);
