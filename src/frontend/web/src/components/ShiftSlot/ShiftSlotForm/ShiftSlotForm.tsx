import type { EditShiftSlotById, UpdateShiftSlotInput } from 'types/graphql'
import { useMutation } from '@redwoodjs/web'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import {toast} from "@redwoodjs/web/toast";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormShiftSlot = NonNullable<EditShiftSlotById['shiftSlot']>

interface ShiftSlotFormProps {
  shiftSlot?: EditShiftSlotById['shiftSlot']
  onSave: (data: UpdateShiftSlotInput, id?: FormShiftSlot['id']) => void
  error: RWGqlError
  loading: boolean
}

const CREATE_SHIFT_SLOT_MUTATION = gql`
  mutation CreateShiftSlotMutation($input: CreateShiftSlotInput!) {
    createShiftSlot(input: $input) {
      id
      type
      department
      amount
      qualification
    }
  }
`

const ShiftSlotForm = (props: ShiftSlotFormProps) => {
  const [createShiftSlot, { loading, error }] = useMutation(CREATE_SHIFT_SLOT_MUTATION, {
    onCompleted: () => {
      toast.success('ShiftSlot created')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: FormShiftSlot) => {
    props.onSave(data, props?.shiftSlot?.id)
    createShiftSlot({ variables: { input: data } })
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormShiftSlot> onSubmit={onSubmit} error={error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Date
        </Label>

        <DatetimeLocalField
          name="date"
          defaultValue={formatDatetime(props.shiftSlot?.date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="date" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <TextField
          name="type"
          defaultValue={props.shiftSlot?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="department"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Department
        </Label>

        <TextField
          name="department"
          defaultValue={props.shiftSlot?.department}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="department" className="rw-field-error" />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Amount
        </Label>

        <NumberField
          name="amount"
          defaultValue={props.shiftSlot?.amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="qualification"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Qualification
        </Label>

        <TextField
          name="qualification"
          defaultValue={props.shiftSlot?.qualification}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="qualification" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ShiftSlotForm
