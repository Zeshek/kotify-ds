import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsTokenDocs, TokenDocsSection } from './token-docs';

const meta: Meta<{ section: TokenDocsSection }> = {
  title: 'Foundations',
  decorators: [moduleMetadata({ imports: [KdsTokenDocs] })],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Generated from the Figma variables (Primitives → Semantics → Component). Values are never edited by hand: run `npm run tokens` after updating the export.',
      },
    },
  },
  render: (args) => ({ props: args, template: `<kds-token-docs [section]="section" />` }),
};
export default meta;

type Story = StoryObj<{ section: TokenDocsSection }>;

export const SemanticColors: Story = { name: 'Color · Semantics', args: { section: 'semantic-colors' } };
export const PrimitiveColors: Story = { name: 'Color · Primitives', args: { section: 'primitive-colors' } };
export const Typography: Story = { args: { section: 'typography' } };
export const Spacing: Story = { args: { section: 'spacing' } };
export const Radius: Story = { args: { section: 'radius' } };
