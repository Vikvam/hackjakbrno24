import type {
  EditShiftById,
  UpdateShiftInput,
  UpdateShiftMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ShiftForm from 'src/components/Shift/ShiftForm'

export const QUERY: TypedDocumentNode<EditShiftById> = gql`
  query EditShiftById($id: Int!) {
    shift: shift(id: $id) {
      id
      type
      employeeType
      department
      amount
      qualification
    }
  }
`

const UPDATE_SHIFT_MUTATION: TypedDocumentNode<
  EditShiftById,
  UpdateShiftMutationVariables
> = gql`
  mutation UpdateShiftMutation($id: Int!, $input: UpdateShiftInput!) {
    updateShift(id: $id, input: $input) {
      id
      type
      employeeType
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

export const Success = ({ shift }: CellSuccessProps<EditShiftById>) => {
  const [updateShift, { loading, error }] = useMutation(UPDATE_SHIFT_MUTATION, {
    onCompleted: () => {
      toast.success('Shift updated')
      navigate(routes.shifts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (
    input: UpdateShiftInput,
    id: EditShiftById['shift']['id']
  ) => {
    updateShift({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Shift {shift?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ShiftForm
          shift={shift}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
