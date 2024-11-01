import type {
  EditUserScheduleById,
  UpdateUserScheduleInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormUserSchedule = NonNullable<EditUserScheduleById['userSchedule']>

interface UserScheduleFormProps {
  userSchedule?: EditUserScheduleById['userSchedule']
  onSave: (data: UpdateUserScheduleInput, id?: FormUserSchedule['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserScheduleForm = (props: UserScheduleFormProps) => {
  const onSubmit = (data: FormUserSchedule) => {
    props.onSave(data, props?.userSchedule?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUserSchedule> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.userSchedule?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="schedule"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Schedule
        </Label>

        <DatetimeLocalField
          name="schedule"
          defaultValue={formatDatetime(props.userSchedule?.schedule)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="schedule" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserScheduleForm
