import type {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  FindUserById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import PlanovaniSmenPage from "src/pages/PlanovaniSmenPage/PlanovaniSmenPage";

import {} from 'src/lib/formatters'

const DELETE_USER_MUTATION: TypedDocumentNode<
  DeleteUserMutation,
  DeleteUserMutationVariables
> = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

interface Props {
  user: NonNullable<FindUserById['user']>
}

const User = ({ user }: Props) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
      navigate(routes.users())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            User {user.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Occupation</th>
              <td>{user.occupation}</td>
            </tr>
            <tr>
              <th>Stem</th>
              <td>{user.stem}</td>
            </tr>
            <tr>
              <th>Attestation</th>
              <td>{user.attestation}</td>
            </tr>
            <tr>
              <th>Qualification</th>
              <td>{user.qualification}</td>
            </tr>
            <tr>
              <th>Rtg preference</th>
              <td>{user.rtg_preference}</td>
            </tr>
            <tr>
              <th>Ct preference</th>
              <td>{user.ct_preference}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <PlanovaniSmenPage id={false}></PlanovaniSmenPage>
      <nav className="rw-button-group">
        <Link
          to={routes.editUser({ id: user.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(user.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default User
