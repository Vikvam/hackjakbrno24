import type {EditShiftById, UpdateShiftInput} from 'types/graphql'

import type {RWGqlError} from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'
import { useMutation } from '@redwoodjs/web'

type FormShift = NonNullable<EditShiftById['shift']>

interface ShiftFormProps {
  shift?: EditShiftById['shift']
  onSave: (data: UpdateShiftInput, id?: FormShift['id']) => void
  error: RWGqlError
  loading: boolean
}

const CREATE_SHIFT_MUTATION_FORM = gql`
  mutation CreateShiftMutationForm($input: CreateShiftInput!) {
    createShift(input: $input) {
      id
      type
      employeeType
      department
      amount
      qualification
    }
  }
`

const ShiftForm = (props: ShiftFormProps) => {
  const [createSlot, {loading, error}] = useMutation(CREATE_SHIFT_MUTATION_FORM, {
    onCompleted: () => {
      toast.success('Shift created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: FormShift) => {
    props.onSave(data, props?.shift?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormShift> onSubmit={onSubmit} error={error}>
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.shift?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{required: true}}
        />

        <FieldError name="type" className="rw-field-error"/>

        <Label
          name="employeeType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Employee type
        </Label>

        <TextField
          name="employeeType"
          defaultValue={props.shift?.employeeType}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{required: true}}
        />

        <FieldError name="employeeType" className="rw-field-error"/>

        <Label
          name="department"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Department
        </Label>

        <TextField
          name="department"
          defaultValue={props.shift?.department}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{required: true}}
        />

        <FieldError name="department" className="rw-field-error"/>

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <NumberField
          name="amount"
          defaultValue={props.shift?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{required: true}}
        />

        <FieldError name="amount" className="rw-field-error"/>

        <Label
          name="qualification"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Qualification
        </Label>

        <TextField
          name="qualification"
          defaultValue={props.shift?.qualification}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{required: true}}
        />

        <FieldError name="qualification" className="rw-field-error"/>

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ShiftForm
