import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsPageHeader } from './page-header';

const meta: Meta = {
  title: 'Components/Page Header',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsPageHeader] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 384px">${s.template}</div>` }; }],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Top of a screen: back navigation (navigation IconButton, medium), title and metadata. Mirrors the Figma `page header` (title?, metadata?).',
          '',
          '- The title is a heading (level 1 by default; set `headingLevel` if the screen has its own h1).',
          '- The back button only emits `back`; the product decides where it goes.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => ({ template: `<kds-page-header title="Carta" metadata="2 pers." />` }) };
export const TitleOnly: Story = { render: () => ({ template: `<kds-page-header title="Tu pedido" />` }) };
