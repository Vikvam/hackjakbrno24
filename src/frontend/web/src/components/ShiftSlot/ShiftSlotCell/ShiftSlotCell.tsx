import type {
  FindShiftSlotById,
  FindShiftSlotByIdVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import ShiftSlot from 'src/components/ShiftSlot/ShiftSlot'

export const QUERY: TypedDocumentNode<
  FindShiftSlotById,
  FindShiftSlotByIdVariables
> = gql`
  query FindShiftSlotById($id: Int!) {
    shiftSlot: shiftSlot(id: $id) {
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

export const Empty = () => <div>ShiftSlot not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindShiftSlotByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shiftSlot,
}: CellSuccessProps<FindShiftSlotById, FindShiftSlotByIdVariables>) => {
  return <ShiftSlot shiftSlot={shiftSlot} />
}
