import { Meta, StoryFn, StoryObj } from '@storybook/react'

import LoginForm from './LoginForm.tsx'

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'Forms/Login',
}

export default meta

const Template: StoryFn<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
)

export const Default = Template.bind({})
Default.args = {

}
