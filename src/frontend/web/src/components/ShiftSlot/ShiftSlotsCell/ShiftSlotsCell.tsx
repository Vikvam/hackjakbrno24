import type { FindShiftSlots, FindShiftSlotsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ShiftSlots from 'src/components/ShiftSlot/ShiftSlots'

export const QUERY: TypedDocumentNode<FindShiftSlots, FindShiftSlotsVariables> =
  gql`
    query FindShiftSlots {
      shiftSlots {
        id
        date
        type
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
      No shiftSlots yet.{' '}
      <Link to={routes.newShiftSlot()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindShiftSlots>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shiftSlots,
}: CellSuccessProps<FindShiftSlots, FindShiftSlotsVariables>) => {
  return <ShiftSlots shiftSlots={shiftSlots} />
}
