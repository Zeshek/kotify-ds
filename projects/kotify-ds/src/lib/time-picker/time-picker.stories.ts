import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsTimePicker } from './time-picker';

const meta: Meta = {
  title: 'Components/Time Picker',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsTimePicker] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Fine-tunes the arrival time inside the chosen slot. Mirrors the Figma `time picker`: fixed hour column and a minutes wheel with three visible rows that behaves like the iOS alarm picker (momentum, snap, rows that curve away and fade).',
          '',
          '- The product supplies the hour and the minutes (in this example, the minutes of the 13:15–13:30 slot). The component never creates intervals or availability.',
          '- Swipe or scroll the wheel, drag it with the mouse, click a minute, or focus it and use ↑ ↓ Home End. The centred minute is highlighted while it moves and committed when it stops. Exposed as a listbox.',
          '- With `prefers-reduced-motion` the wheel stays flat and moves without animation.',
          '- Selected number: weight 600 (token). Others: 400, intentionally unbound (see AGENTS.md).',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Slot: StoryObj = {
  render: () => ({
    props: { minutes: Array.from({ length: 15 }, (_, i) => 15 + i), minute: 15 },
    template: `
      <kds-time-picker [hour]="13" [minutes]="minutes" [(value)]="minute" ariaLabel="Hora de llegada" />
      <p style="margin-top: var(--space-md); font: 14px/1.4 var(--font-body-2-font-family); color: var(--color-on-canvas-default)">Llegaré a las 13:{{ minute < 10 ? '0' + minute : minute }}</p>`,
  }),
};
