import { Meta, StoryFn, StoryObj } from '@storybook/react'

import LoadingScreen from './LoadingScreen.tsx'

const meta: Meta<typeof LoadingScreen> = {
  component: LoadingScreen,
  title: 'LoadingScreen',
}

export default meta

const Template: StoryFn<typeof LoadingScreen> = (args) => (
  <LoadingScreen {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: true,
}
