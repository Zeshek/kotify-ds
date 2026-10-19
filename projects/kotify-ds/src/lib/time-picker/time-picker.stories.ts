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
          'Fine-tunes the arrival time inside a slot. Mirrors the Figma `time picker`: fixed hour column and a minutes drum with three visible rows.',
          '',
          '- The product supplies the hour and the minutes (in this example, the minutes of the 13:15–13:30 slot). The component never creates intervals or availability.',
          '- Scroll or swipe the drum (it snaps), click a minute, or focus the list and use ↑ ↓ Home End. Exposed as a listbox.',
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
