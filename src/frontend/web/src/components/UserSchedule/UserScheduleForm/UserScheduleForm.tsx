import type {
  CreateUserScheduleDayInput, CreateUserScheduleInput,
  EditUserScheduleById,
  UpdateUserScheduleInput,
} from 'types/graphql'

import type {RWGqlError} from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'
import {WeeklyScheduleComponent} from "src/components/weekly-schedule"
import {useMutation} from "@redwoodjs/web";
import {getCurrentUser} from "src/lib/auth";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormUserSchedule = NonNullable<EditUserScheduleById['userSchedule']>

const CreateScheduleDay = gql`
  mutation ScheduleDayMutation($input: CreateUserScheduleDayInput!){
    createUserScheduleDay(input: $input){
      preference
      day
      dayPart
      reasonCode
      reasonText
      userScheduleId
    }
  }
`

const CREATE_SCHEDULE = gql`
  mutation ScheduleMutation($input: CreateUserScheduleInput!){
    createUserSchedule(input: $input){
      id
    }
  }
`

interface UserScheduleFormProps {
  userSchedule?: EditUserScheduleById['userSchedule']
  onSave: (data: UpdateUserScheduleInput, id?: FormUserSchedule['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserScheduleForm = (props: UserScheduleFormProps) => {
  const [createScheduleDay, {loading, error}] = useMutation(CreateScheduleDay);
  const [createSchedule, {loadingSch, errorSch}] = useMutation(CREATE_SCHEDULE);

  const onSubmit = (data: FormUserSchedule) => {
    let schedData = {}
    for (let key in data) {
      if (!key.startsWith("select-")) {
        schedData[key] = data[key]
      }
    }
    props.onSave(schedData, props?.userSchedule?.id)
    let date = new Date()
    let dateStr = date.toISOString()
    console.log(dateStr, "date is")
    let inputSch: CreateUserScheduleInput = {
      userId: data.userId,
      schedule: dateStr
    };
    createSchedule({
      variables: {
        input: inputSch
      }
    }).then((res) => {
      let id: number = res.data.createUserSchedule.id as number;
      for (let key in data) {
        if (key.startsWith("select-")) {
          let val = data[key]

          console.log("U id", id)
          let inputDay: CreateUserScheduleDayInput = {
            userScheduleId: id,
            day: dateStr,
            dayPart: 1,
            preference: val,
            reasonCode: 1,
            reasonText: "",
            userId: 1 //TODO
          }
          createScheduleDay({
            variables: {
              input: inputDay
            }
          })
        }
      }
    })


  }

  return (
    <>

      <div className="rw-form-wrapper">
        <Form<FormUserSchedule> hidden={false} onSubmit={onSubmit} error={props.error}>
          <WeeklyScheduleComponent id={props.userSchedule?.userId}></WeeklyScheduleComponent>
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
            validation={{required: true}}
          />

          <FieldError name="userId" className="rw-field-error"/>

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
            validation={{required: true}}
          />

          <FieldError name="schedule" className="rw-field-error"/>

          <div className="rw-button-group">
            <Submit disabled={props.loading} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default UserScheduleForm
