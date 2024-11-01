import type {
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

export const QUERY: TypedDocumentNode<
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables
> = gql`
  query FindUserScheduleDayQuery2($id: Int!) {
    userScheduleDay: userScheduleDay(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserScheduleDayQuery2Variables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  userScheduleDay,
}: CellSuccessProps<
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables
>) => {
  return <div>{JSON.stringify(userScheduleDay)}</div>
}
