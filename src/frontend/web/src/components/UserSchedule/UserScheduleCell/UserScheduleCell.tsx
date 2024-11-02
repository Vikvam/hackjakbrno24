import type {
  EditUserScheduleById,
  UpdateUserScheduleInput,
  UpdateUserScheduleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserScheduleForm from 'src/components/UserSchedule/UserScheduleForm'

export const QUERY: TypedDocumentNode<EditUserScheduleById> = gql`
  query EditUserScheduleById($id: Int!) {
    userSchedule: userSchedule(id: $id) {
      id
      userId
      schedule
      createdAt
      updatedAt
    }
  }
`

const UPDATE_USER_SCHEDULE_MUTATION: TypedDocumentNode<
  EditUserScheduleById,
  UpdateUserScheduleMutationVariables
> = gql`
  mutation UpdateUserScheduleMutation(
    $id: Int!
    $input: UpdateUserScheduleInput!
  ) {
    updateUserSchedule(id: $id, input: $input) {
      id
      userId
      schedule
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSchedule,
}: CellSuccessProps<EditUserScheduleById>) => {
  const [updateUserSchedule, { loading, error }] = useMutation(
    UPDATE_USER_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSchedule updated')
        navigate(routes.userSchedules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserScheduleInput,
    id: EditUserScheduleById['userSchedule']['id']
  ) => {
    updateUserSchedule({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserSchedule {userSchedule?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserScheduleForm
          userSchedule={userSchedule}
          onSave={onSave}
          error={error}
          loading={loading}
          edit={false}
        />
      </div>
    </div>
  )
}
