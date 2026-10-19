import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsBubble } from './bubble';

const meta: Meta<{ count: number }> = {
  title: 'Components/Bubble',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsBubble] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Small circular counter, for example the number of items in the Order bar. Mirrors the Figma `bubble` (no variants, 24 px).',
          '',
          '- Not interactive. The surrounding control must give the number its meaning for assistive technology.',
          '- Two-digit numbers widen the bubble instead of clipping.',
        ].join('\n'),
      },
    },
  },
  args: { count: 3 },
  render: (args) => ({ props: args, template: `<kds-bubble>{{ count }}</kds-bubble>` }),
};
export default meta;
export const Playground: StoryObj<{ count: number }> = {};
export const TwoDigits: StoryObj<{ count: number }> = { args: { count: 12 } };
