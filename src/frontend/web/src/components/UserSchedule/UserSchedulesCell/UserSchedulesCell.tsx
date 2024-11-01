import type {
  FindUserSchedules,
  FindUserSchedulesVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import UserSchedules from 'src/components/UserSchedule/UserSchedules'

export const QUERY: TypedDocumentNode<
  FindUserSchedules,
  FindUserSchedulesVariables
> = gql`
  query FindUserSchedules {
    userSchedules {
      id
      userId
      schedule
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No userSchedules yet.{' '}
      <Link to={routes.newUserSchedule()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindUserSchedules>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userSchedules,
}: CellSuccessProps<FindUserSchedules, FindUserSchedulesVariables>) => {
  return <UserSchedules userSchedules={userSchedules} />
}
