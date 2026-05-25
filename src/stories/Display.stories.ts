import type { Meta, StoryObj } from '@storybook/react-vite'

import { Display } from '../components/Display'

const meta = {
  title: 'Calculator/Display',
  component: Display,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  args: {
    value: '',
  },
}

export const Number: Story = {
  args: {
    value: '123',
  },
}

export const Error: Story = {
  args: {
    value: 'ERROR',
  },
}
