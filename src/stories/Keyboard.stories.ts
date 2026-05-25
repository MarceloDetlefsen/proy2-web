import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Keyboard } from '../components/Keyboard'

const meta = {
  title: 'Calculator/Keyboard',
  component: Keyboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  args: {
    onNumber: fn(),
    onOperation: fn(),
    onEquals: fn(),
  },
} satisfies Meta<typeof Keyboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
