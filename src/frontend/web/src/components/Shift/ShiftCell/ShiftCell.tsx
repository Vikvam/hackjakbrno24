import type { FindShiftById, FindShiftByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Shift from 'src/components/Shift/Shift'

export const QUERY: TypedDocumentNode<FindShiftById, FindShiftByIdVariables> =
  gql`
    query FindShiftById($id: Int!) {
      shift: shift(id: $id) {
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

export const Empty = () => <div>Shift not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindShiftByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  shift,
}: CellSuccessProps<FindShiftById, FindShiftByIdVariables>) => {
  return <Shift shift={shift} />
}
