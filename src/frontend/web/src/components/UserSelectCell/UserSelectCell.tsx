import type {
  FindUserSelectQuery,
  FindUserSelectQueryVariables,
} from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import {EmployeeGeneratorComponent} from "src/components/employee-generator";
import {Form, SelectField} from '@redwoodjs/forms';



export const QUERY: TypedDocumentNode<
  FindUserSelectQuery,
  FindUserSelectQueryVariables
> = gql`
  query FindUserSelectQuery {
    users {
      id
      name
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindUserSelectQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  users,
}: CellSuccessProps<FindUserSelectQuery, FindUserSelectQueryVariables>) => {
  return (
  <Form>
    <SelectField name={"employee"} multiple={false}>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </SelectField>

  </Form>
  )
}
