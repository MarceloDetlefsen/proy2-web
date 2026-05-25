import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Button } from './Button'

const meta = {
  title: 'Calculator/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'test'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const NumberKey: Story = {
  args: {
    label: '7',
    size: 'medium',
  },
}

export const OperationKey: Story = {
  args: {
    label: '+',
    primary: true,
    size: 'medium',
  },
}
