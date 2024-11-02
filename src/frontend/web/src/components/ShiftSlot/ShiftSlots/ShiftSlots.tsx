import type {
  DeleteShiftSlotMutation,
  DeleteShiftSlotMutationVariables,
  FindShiftSlots,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ShiftSlot/ShiftSlotsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const ShiftSlotsList = ({ shiftSlots }: FindShiftSlots) => {
  const [deleteShiftSlot] = useMutation(DELETE_SHIFT_SLOT_MUTATION, {
    onCompleted: () => {
      toast.success('ShiftSlot deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteShiftSlotMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shiftSlot ' + id + '?')) {
      deleteShiftSlot({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Type</th>
            <th>Department</th>
            <th>Amount</th>
            <th>Qualification</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shiftSlots.map((shiftSlot) => (
            <tr key={shiftSlot.id}>
              <td>{truncate(shiftSlot.id)}</td>
              <td>{timeTag(shiftSlot.date)}</td>
              <td>{truncate(shiftSlot.type)}</td>
              <td>{truncate(shiftSlot.department)}</td>
              <td>{truncate(shiftSlot.amount)}</td>
              <td>{truncate(shiftSlot.qualification)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.shiftSlot({ id: shiftSlot.id })}
                    title={'Show shiftSlot ' + shiftSlot.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editShiftSlot({ id: shiftSlot.id })}
                    title={'Edit shiftSlot ' + shiftSlot.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete shiftSlot ' + shiftSlot.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(shiftSlot.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShiftSlotsList
