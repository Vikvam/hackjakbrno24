import type {
  DeleteShiftSlotMutation,
  DeleteShiftSlotMutationVariables,
  FindShiftSlotById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_SHIFT_SLOT_MUTATION: TypedDocumentNode<
  DeleteShiftSlotMutation,
  DeleteShiftSlotMutationVariables
> = gql`
  mutation DeleteShiftSlotMutation($id: Int!) {
    deleteShiftSlot(id: $id) {
      id
    }
  }
`

interface Props {
  shiftSlot: NonNullable<FindShiftSlotById['shiftSlot']>
}

const ShiftSlot = ({ shiftSlot }: Props) => {
  const [deleteShiftSlot] = useMutation(DELETE_SHIFT_SLOT_MUTATION, {
    onCompleted: () => {
      toast.success('ShiftSlot deleted')
      navigate(routes.shiftSlots())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteShiftSlotMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shiftSlot ' + id + '?')) {
      deleteShiftSlot({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ShiftSlot {shiftSlot.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{shiftSlot.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(shiftSlot.date)}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{shiftSlot.type}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{shiftSlot.department}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{shiftSlot.amount}</td>
            </tr>
            <tr>
              <th>Qualification</th>
              <td>{shiftSlot.qualification}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editShiftSlot({ id: shiftSlot.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(shiftSlot.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ShiftSlot
