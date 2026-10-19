import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsPill, KdsPills } from './pills';

const meta: Meta = {
  title: 'Components/Pills',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsPills, KdsPill] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Lightweight secondary navigation or filtering. Mirrors the Figma `pills` and `pills/item` (status default | selected, editable text).',
          '',
          '- On buttons the selected item exposes `aria-pressed`; on links, `aria-current="page"`.',
          '- Selected is filled and default is outlined, so the state does not depend on colour alone.',
          '- Not a replacement for tabs or multi-step navigation. On narrow screens the row scrolls horizontally.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Interactive: StoryObj = {
  render: () => ({
    props: { sections: ['Entrantes', 'Principales', 'Postres', 'Bebidas'], current: 'Entrantes' },
    template: `
      <kds-pills ariaLabel="Secciones de la carta">
        @for (s of sections; track s) {
          <button kdsPill [selected]="s === current" (click)="current = s">{{ s }}</button>
        }
      </kds-pills>`,
  }),
};
