import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsRadio, KdsRadioGroup } from './radio';

const meta: Meta = {
  title: 'Components/Radio Button',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsRadio, KdsRadioGroup] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 344px">${s.template}</div>` }; }],
  parameters: {
    docs: {
      description: {
        component: [
          'Mutually exclusive selection, grouped in a module with a title. Mirrors the Figma `radio buttons module` and `.radio button` (status default | selected, optional details).',
          '',
          '- Native radios sharing a `name`: arrow keys move the selection. The title is the group name (`<fieldset>` + `<legend>`); without it, pass `ariaLabel`.',
          '- Works with `[(value)]`, `ngModel` and reactive forms.',
          '- The selected option changes background, border and indicator, so it does not rely on colour alone.',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Module: StoryObj = {
  render: () => ({
    props: { moment: 'arrival' },
    template: `
      <kds-radio-group title="¿Cuándo quieres que te lo sirvamos?" [(value)]="moment">
        <kds-radio value="arrival" label="Listo al llegar" details="Preparado para cuando llegues al restaurante." />
        <kds-radio value="second" label="Segundo plato" details="Te lo serviremos después de los platos iniciales." />
      </kds-radio-group>
      <p style="margin-top: var(--space-md); font: 12px/1.4 var(--font-caption-font-family); color: var(--color-on-canvas-subtle)">Valor: {{ moment }}</p>`,
  }),
};
