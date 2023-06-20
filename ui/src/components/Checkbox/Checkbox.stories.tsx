import { Meta, StoryFn } from '@storybook/react'

import Checkbox from './Checkbox.tsx'

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Form Fields/Checkbox',
  argTypes: {
    className: {
      control: null,
    },
  },
  args: {
    name: 'test',
    defaultChecked: false,
    disabled: false,
    label: 'Label',
    onChange: console.log,
  },
}

export default meta

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
