import type {
  DeleteShiftMutation,
  DeleteShiftMutationVariables,
  FindShifts,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Shift/ShiftsCell'
import { truncate } from 'src/lib/formatters'

const DELETE_SHIFT_MUTATION: TypedDocumentNode<
  DeleteShiftMutation,
  DeleteShiftMutationVariables
> = gql`
  mutation DeleteShiftMutation($id: Int!) {
    deleteShift(id: $id) {
      id
    }
  }
`

const ShiftsList = ({ shifts }: FindShifts) => {
  const [deleteShift] = useMutation(DELETE_SHIFT_MUTATION, {
    onCompleted: () => {
      toast.success('Shift deleted')
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

  const onDeleteClick = (id: DeleteShiftMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shift ' + id + '?')) {
      deleteShift({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Employee type</th>
            <th>Department</th>
            <th>Amount</th>
            <th>Qualification</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id}>
              <td>{truncate(shift.id)}</td>
              <td>{truncate(shift.type)}</td>
              <td>{truncate(shift.employeeType)}</td>
              <td>{truncate(shift.department)}</td>
              <td>{truncate(shift.amount)}</td>
              <td>{truncate(shift.qualification)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.shift({ id: shift.id })}
                    title={'Show shift ' + shift.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editShift({ id: shift.id })}
                    title={'Edit shift ' + shift.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete shift ' + shift.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(shift.id)}
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

export default ShiftsList
