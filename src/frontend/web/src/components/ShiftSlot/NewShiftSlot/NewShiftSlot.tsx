import type {
  CreateShiftSlotMutation,
  CreateShiftSlotInput,
  CreateShiftSlotMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShiftSlotForm from 'src/components/ShiftSlot/ShiftSlotForm'

const CREATE_SHIFT_SLOT_MUTATION: TypedDocumentNode<
  CreateShiftSlotMutation,
  CreateShiftSlotMutationVariables
> = gql`
  mutation CreateShiftSlotMutation($input: CreateShiftSlotInput!) {
    createShiftSlot(input: $input) {
      id
    }
  }
`

const NewShiftSlot = () => {
  const [createShiftSlot, { loading, error }] = useMutation(
    CREATE_SHIFT_SLOT_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShiftSlot created')
        navigate(routes.shiftSlots())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateShiftSlotInput) => {
    createShiftSlot({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New ShiftSlot</h2>
      </header>
      <div className="rw-segment-main">
        <ShiftSlotForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewShiftSlot
