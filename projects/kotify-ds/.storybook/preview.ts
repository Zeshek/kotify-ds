import type { Preview } from '@storybook/angular-vite';
import '../src/styles/tokens.css';

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components'] },
    },
  },
};

export default preview;
