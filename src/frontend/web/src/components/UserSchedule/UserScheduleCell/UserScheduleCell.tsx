import type {
  FindUserScheduleById,
  FindUserScheduleByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import UserSchedule from 'src/components/UserSchedule/UserSchedule'

export const QUERY: TypedDocumentNode<
  FindUserScheduleById,
  FindUserScheduleByIdVariables
> = gql`
  query FindUserScheduleById($id: Int!) {
    userSchedule: userSchedule(id: $id) {
      id
      userId
      schedule
      createdAt
      updatedAt
      UserScheduleDay {
        preference
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>UserSchedule not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserScheduleByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSchedule,
}: CellSuccessProps<FindUserScheduleById, FindUserScheduleByIdVariables>) => {
  console.log("log", userSchedule.UserScheduleDay)
  return <UserSchedule id={userSchedule.id}/>
}
