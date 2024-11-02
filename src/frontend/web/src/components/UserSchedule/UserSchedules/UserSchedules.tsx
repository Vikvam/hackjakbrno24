import type {
  DeleteUserScheduleMutation,
  DeleteUserScheduleMutationVariables,
  FindUserSchedules,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/UserSchedule/UserSchedulesCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

const UserSchedulesList = ({ userSchedules }: FindUserSchedules) => {
  const [deleteUserSchedule] = useMutation(DELETE_USER_SCHEDULE_MUTATION, {
    onCompleted: () => {
      toast.success('UserSchedule deleted')
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

  const onDeleteClick = (id: DeleteUserScheduleMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userSchedule ' + id + '?')) {
      deleteUserSchedule({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Schedule</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userSchedules.map((userSchedule) => (
            <tr key={userSchedule.id}>
              <td>{truncate(userSchedule.id)}</td>
              <td>{truncate(userSchedule.userId)}</td>
              <td>{timeTag(userSchedule.schedule)}</td>
              <td>{timeTag(userSchedule.createdAt)}</td>
              <td>{timeTag(userSchedule.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userSchedule({ id: userSchedule.id })}
                    title={'Show userSchedule ' + userSchedule.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserSchedule({ id: userSchedule.id })}
                    title={'Edit userSchedule ' + userSchedule.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userSchedule ' + userSchedule.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userSchedule.id)}
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

export default UserSchedulesList
