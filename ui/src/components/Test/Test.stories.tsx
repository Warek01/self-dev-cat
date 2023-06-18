import { Meta, StoryObj } from '@storybook/react'

import Test from './Test.tsx'

const meta: Meta<typeof Test> = {
  component: Test,
  title: 'Test',
}

export default meta

type Story = StoryObj<typeof Test>

export const Default: Story = {
  args: {},
}
