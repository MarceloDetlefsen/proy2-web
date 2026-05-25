import type { Meta, StoryObj } from '@storybook/react-vite'

import { Display } from '../components/Display'

const ErrorView = () => (
  <div>
    <Display value="ERROR" />
  </div>
)

const meta = {
  title: 'Calculator/Error State',
  component: ErrorView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
} satisfies Meta<typeof ErrorView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
