import { Meta, StoryFn } from '@storybook/react'

import RegisterForm from './RegisterForm.tsx'

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  title: 'Forms/Register',
}

export default meta

const Template: StoryFn<typeof RegisterForm> = (args) => <RegisterForm {...args} />

export const Default = Template.bind({})
Default.args = {}
