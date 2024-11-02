import type {
  EditShiftSlotById,
  UpdateShiftSlotInput,
  UpdateShiftSlotMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShiftSlotForm from 'src/components/ShiftSlot/ShiftSlotForm'

export const QUERY: TypedDocumentNode<EditShiftSlotById> = gql`
  query EditShiftSlotById($id: Int!) {
    shiftSlot: shiftSlot(id: $id) {
      id
      date
      type
      department
      amount
      qualification
    }
  }
`

const UPDATE_SHIFT_SLOT_MUTATION: TypedDocumentNode<
  EditShiftSlotById,
  UpdateShiftSlotMutationVariables
> = gql`
  mutation UpdateShiftSlotMutation($id: Int!, $input: UpdateShiftSlotInput!) {
    updateShiftSlot(id: $id, input: $input) {
      id
      date
      type
      department
      amount
      qualification
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ shiftSlot }: CellSuccessProps<EditShiftSlotById>) => {
  const [updateShiftSlot, { loading, error }] = useMutation(
    UPDATE_SHIFT_SLOT_MUTATION,
    {
      onCompleted: () => {
        toast.success('ShiftSlot updated')
        navigate(routes.shiftSlots())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateShiftSlotInput,
    id: EditShiftSlotById['shiftSlot']['id']
  ) => {
    updateShiftSlot({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit ShiftSlot {shiftSlot?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ShiftSlotForm
          shiftSlot={shiftSlot}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
