import type { Meta, StoryObj } from '@storybook/react'

import SearchUsersPage from './SearchUsersPage'

const meta: Meta<typeof SearchUsersPage> = {
  component: SearchUsersPage,
}

export default meta

type Story = StoryObj<typeof SearchUsersPage>

export const Primary: Story = {}
