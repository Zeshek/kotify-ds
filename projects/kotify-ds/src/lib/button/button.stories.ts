import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsButton, KdsButtonSize, KdsButtonVariant } from './button';

type ButtonArgs = { label: string; variant: KdsButtonVariant; size: KdsButtonSize; disabled: boolean };

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsButton] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Action button. Mirrors the Figma `Button` component set: **variant** (primary, secondary, ghost, destructive),',
          '**size** (large, small) and **states** (default, hover, pressed, disabled).',
          '',
          '- Use **primary** for the dominant action of a context, **secondary** for important alternatives,',
          '  **ghost** for lower-emphasis actions and **destructive** for actions with negative consequences.',
          '- Apply it to a native `<button>` (`<button kdsButton>`) to keep keyboard and disabled semantics.',
          '- Labels are concise and action-oriented. Width follows the content; sizing comes from padding, not a fixed height.',
          '- Keyboard focus uses `:focus-visible` (code-only; there is no focus variant in Figma). Tab to a button to see it.',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'inline-radio', options: ['large', 'small'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { label: 'Label', variant: 'primary', size: 'large', disabled: false },
  render: (args) => ({
    props: args,
    template: `<button kdsButton type="button" [variant]="variant" [size]="size" [disabled]="disabled">{{ label }}</button>`,
  }),
};
export default meta;

type Story = StoryObj<ButtonArgs>;

export const Playground: Story = {};

export const Primary: Story = { args: { variant: 'primary', label: 'Confirmar pedido' } };
export const Secondary: Story = { args: { variant: 'secondary', label: 'Añadir nota' } };
export const Ghost: Story = { args: { variant: 'ghost', label: 'Ahora no' } };
export const Destructive: Story = { args: { variant: 'destructive', label: 'Cancelar reserva' } };

/** Every Figma variant × size, in the default and disabled states. Hover and pressed are interactive (pointer). */
export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    props: {
      variants: ['primary', 'secondary', 'ghost', 'destructive'],
      sizes: ['large', 'small'],
    },
    template: `
      <div style="display:grid; grid-template-columns: max-content repeat(4, max-content); gap: var(--space-md) var(--space-xl); align-items:center; font-family: var(--font-caption-font-family); font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle);">
        <span></span>
        <span>large</span><span>large · disabled</span><span>small</span><span>small · disabled</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          @for (s of sizes; track s) {
            <span><button kdsButton type="button" [variant]="v" [size]="s">Label</button></span>
            <span><button kdsButton type="button" [variant]="v" [size]="s" disabled>Label</button></span>
          }
        }
      </div>`,
  }),
};

/** Longer (translated) labels grow the button horizontally instead of clipping. */
export const LongLabel: Story = {
  args: { label: 'Confirmar y pagar con Apple Pay' },
};
