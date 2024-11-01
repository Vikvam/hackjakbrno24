import type {
  CreateUserScheduleMutation,
  CreateUserScheduleInput,
  CreateUserScheduleMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserScheduleForm from 'src/components/UserSchedule/UserScheduleForm'

const CREATE_USER_SCHEDULE_MUTATION: TypedDocumentNode<
  CreateUserScheduleMutation,
  CreateUserScheduleMutationVariables
> = gql`
  mutation CreateUserScheduleMutation($input: CreateUserScheduleInput!) {
    createUserSchedule(input: $input) {
      id
    }
  }
`

const NewUserSchedule = () => {
  const [createUserSchedule, { loading, error }] = useMutation(
    CREATE_USER_SCHEDULE_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserSchedule created')
        navigate(routes.userSchedules())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateUserScheduleInput) => {
    createUserSchedule({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserSchedule</h2>
      </header>
      <div className="rw-segment-main">
        <UserScheduleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserSchedule
