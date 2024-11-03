// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import CallPythonSolverButton from './CallPythonSolverButton'

const meta: Meta<typeof CallPythonSolverButton> = {
  component: CallPythonSolverButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CallPythonSolverButton>

export const Primary: Story = {}
