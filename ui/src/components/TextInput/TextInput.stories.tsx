import { Meta, StoryFn } from '@storybook/react'

import TextInput from './TextInput.tsx'

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Form Fields/Text Input',
  argTypes: {
    className: {
      control: null,
    },
  },
  args: {
    password: false,
    invalid: false,
    autoComplete: true,
    placeholder: 'Placeholder',
    invalidText: 'Invalid Text',
    name: 'Test'
  },
}

export default meta

const Template: StoryFn<typeof TextInput> = (args) => <TextInput {...args} />

export const Default = Template.bind({})
