import type {
  CreateShiftMutation,
  CreateShiftInput,
  CreateShiftMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShiftForm from 'src/components/Shift/ShiftForm'

const CREATE_SHIFT_MUTATION: TypedDocumentNode<
  CreateShiftMutation,
  CreateShiftMutationVariables
> = gql`
  mutation CreateShiftMutation($input: CreateShiftInput!) {
    createShift(input: $input) {
      id
    }
  }
`

const NewShift = () => {
  const [createShift, { loading, error }] = useMutation(CREATE_SHIFT_MUTATION, {
    onCompleted: () => {
      toast.success('Shift created')
      navigate(routes.shifts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateShiftInput) => {
    createShift({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Shift</h2>
      </header>
      <div className="rw-segment-main">
        <ShiftForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewShift
