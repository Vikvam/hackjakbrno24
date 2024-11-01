import type {
  DeleteUserScheduleMutation,
  DeleteUserScheduleMutationVariables,
  FindUserScheduleById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_USER_SCHEDULE_MUTATION: TypedDocumentNode<
  DeleteUserScheduleMutation,
  DeleteUserScheduleMutationVariables
> = gql`
  mutation DeleteUserScheduleMutation($id: Int!) {
    deleteUserSchedule(id: $id) {
      id
    }
  }
`

interface Props {
  userSchedule: NonNullable<FindUserScheduleById['userSchedule']>
}

const UserSchedule = ({ userSchedule }: Props) => {
  const [deleteUserSchedule] = useMutation(DELETE_USER_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('UserSchedule deleted')
      navigate(routes.userSchedules())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userSchedule ' + id + '?')) {
      deleteUserSchedule({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserSchedule {userSchedule.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userSchedule.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{userSchedule.userId}</td>
            </tr>
            <tr>
              <th>Schedule</th>
              <td>{timeTag(userSchedule.schedule)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(userSchedule.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(userSchedule.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserSchedule({ id: userSchedule.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userSchedule.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default UserSchedule
