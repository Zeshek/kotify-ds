import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Brand the Storybook UI as Kotify DS (sidebar title and browser tab).
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Kotify DS',
    brandUrl: 'https://github.com/Zeshek/kotify-ds',
    brandTarget: '_blank',
  }),
});
