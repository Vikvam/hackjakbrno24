import type { Meta, StoryObj } from '@storybook/react'

import DefineUsersPage from './DefineUsersPage'

const meta: Meta<typeof DefineUsersPage> = {
  component: DefineUsersPage,
}

export default meta

type Story = StoryObj<typeof DefineUsersPage>

export const Primary: Story = {}
