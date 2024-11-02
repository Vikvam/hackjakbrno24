import type { FindShifts, FindShiftsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Shifts from 'src/components/Shift/Shifts'

export const QUERY: TypedDocumentNode<FindShifts, FindShiftsVariables> = gql`
  query FindShifts {
    shifts {
      id
      type
      employeeType
      department
      amount
      qualification
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No shifts yet.{' '}
      <Link to={routes.newShift()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindShifts>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shifts,
}: CellSuccessProps<FindShifts, FindShiftsVariables>) => {
  return <Shifts shifts={shifts} />
}
