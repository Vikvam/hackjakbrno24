import type {
  DeleteShiftMutation,
  DeleteShiftMutationVariables,
  FindShiftById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

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

interface Props {
  shift: NonNullable<FindShiftById['shift']>
}

const Shift = ({ shift }: Props) => {
  const [deleteShift] = useMutation(DELETE_SHIFT_MUTATION, {
    onCompleted: () => {
      toast.success('Shift deleted')
      navigate(routes.shifts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteShiftMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete shift ' + id + '?')) {
      deleteShift({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Shift {shift.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{shift.id}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{shift.type}</td>
            </tr>
            <tr>
              <th>Employee type</th>
              <td>{shift.employeeType}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{shift.department}</td>
            </tr>
            <tr>
              <th>Amount</th>
              <td>{shift.amount}</td>
            </tr>
            <tr>
              <th>Qualification</th>
              <td>{shift.qualification}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editShift({ id: shift.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(shift.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Shift
