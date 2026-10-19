import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsBadge, KdsBadgeVariant } from './badge';

type Args = { text: string; variant: KdsBadgeVariant; subtle: boolean };

const meta: Meta<Args> = {
  title: 'Components/Badge',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsBadge] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Compact status or category label. Mirrors the Figma `badge`: **variant** (primary, positive, negative, warning) and **subtle** (no, yes).',
          '',
          '- Not interactive. The text carries the meaning; never rely on colour alone.',
          '- Do not use it instead of explanatory text when the meaning is not obvious.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'positive', 'negative', 'warning'] },
    subtle: { control: 'boolean' },
  },
  args: { text: 'Disponible', variant: 'positive', subtle: true },
  render: (args) => ({ props: args, template: `<kds-badge [variant]="variant" [subtle]="subtle">{{ text }}</kds-badge>` }),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { variants: ['primary', 'positive', 'negative', 'warning'], text: { primary: 'Nuevo', positive: 'Disponible', negative: 'Completo', warning: 'Esperando confirmación' } },
    template: `
      <div style="display:grid; grid-template-columns: max-content max-content max-content; gap: var(--space-md) var(--space-xl); align-items:center; font: var(--font-caption-font-size)/1.4 var(--font-caption-font-family); color: var(--color-on-canvas-subtle)">
        <span></span><span>default</span><span>subtle</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          <span><kds-badge [variant]="v">{{ text[v] }}</kds-badge></span>
          <span><kds-badge [variant]="v" subtle>{{ text[v] }}</kds-badge></span>
        }
      </div>`,
  }),
};
