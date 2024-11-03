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
import {useMutation, useQuery} from "@redwoodjs/web";
import {getCurrentUser} from "src/lib/auth";
import {useEffect, useState} from "react";

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormUserSchedule = NonNullable<EditUserScheduleById['userSchedule']>

const CreateScheduleDay = gql`
  mutation ScheduleDayMutation($input: CreateUserScheduleDayInput!){
    createUserScheduleDay(input: $input){
      id
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


const QUERY_USER_SCHEDULE = gql`
  query userScheduleQuery($id: Int!) {
    userSchedule(id: $id){
      id
      userId
      schedule
      UserScheduleDay {
        id
        preference
        day
        dayPart
        reasonCode
        reasonText
        userScheduleId
      }
    }
  }
`

interface UserScheduleFormProps {
  userSchedule?: EditUserScheduleById['userSchedule']
  onSave: (data: UpdateUserScheduleInput, id?: FormUserSchedule['id']) => void
  error: RWGqlError
  loading: boolean
  edit: boolean
}

const createUserScheduleDays = (schedId: number, startMonday: Date, mutation) => {
  let days = []
  for (let i = 0; i < 7; i++) {
    for (let j = 1; j < 5; j++) {
      days.push({
        day: i,
        part: j,
        preference: 1
      })
    }
  }
  let promises = []
  for (let day of days) {
    let input: CreateUserScheduleDayInput = {
      userScheduleId: schedId,
      day: new Date().toISOString(),
      dayPart: day.part,
      preference: day.preference,
      reasonCode: 1,
      reasonText: "",
      userId: 1
    }
    promises.push(mutation({
      variables: {
        input: input
      }
    }))
  }
  return Promise.all(promises)
}

const UserScheduleForm = (props: UserScheduleFormProps) => {
  const [createScheduleDay, {loading, error}] = useMutation(CreateScheduleDay);
  const [createSchedule, {loadingSch, errorSch}] = useMutation(CREATE_SCHEDULE);
  const {data: queryResult, loading: loadingQ, error: errorQ} = useQuery(QUERY_USER_SCHEDULE);
  const [daysCreated, setDaysCreates] = useState(false)
  const [data, setData] = useState(null);
  const [loadingCells, setLoading] = useState(true);
  const [errorCells, setError] = useState(null);

  let userScheduleQuery;
  if (props.userSchedule) {
     userScheduleQuery = useQuery(QUERY_USER_SCHEDULE, {
      variables: {
        id: props.userSchedule.id

      }
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!props.userSchedule) {
          setLoading(true);
          const responseSched = await createSchedule({
            variables: {
              input: {
                userId: 1,
                schedule: new Date().toISOString()
              }
            }
          });
          const responseDays = await createUserScheduleDays(
            responseSched.data.createUserSchedule.id,
            responseSched.data.createUserSchedule.schedule,
            createScheduleDay
          );
          setData({schedule: responseSched.data.createUserSchedule, days: responseDays});
        } else {
          console.log("User sched id is", props.userSchedule.id);
          let userSchedule = userScheduleQuery.data()
          console.log("user sched is", userScheduleQuery.data);
          setData({schedule: userSchedule, days: userSchedule.UserScheduleDay});
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const onSubmit = (data: FormUserSchedule) => {
    let schedData = {}
    for (let key in data) {
      if (!key.startsWith("select-")) {
        schedData[key] = data[key]
      }
    }
    let date = new Date()
    let dateStr = date.toISOString()
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

  if (loading || loadingSch || data === null) return <div>Načítání dnů</div>

  console.log("Načetly se data", data);

  return (
    <>
      <div className="rw-form-wrapper">
        <h1 className={"header"} hidden={!props.edit}>Editace</h1>
        <h1 className={"header"} hidden={props.edit}>Show</h1>
        <Form<FormUserSchedule> hidden={false} onSubmit={onSubmit} error={props.error}>
          <WeeklyScheduleComponent edit={props.edit} cells={data.days}></WeeklyScheduleComponent>
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
