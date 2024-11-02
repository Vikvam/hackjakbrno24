import type {FindUserScheduleDayQuery2, FindUserScheduleDayQuery2Variables,} from 'types/graphql'

import type {CellFailureProps, CellSuccessProps, TypedDocumentNode,} from '@redwoodjs/web'
import {FieldError, Form, SelectField, SubmitHandler} from '@redwoodjs/forms'

export const QUERY: TypedDocumentNode<
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables
> = gql`
  query FindUserScheduleDayQuery2($id: Int!) {
    userScheduleDay: userScheduleDay(id: $id) {
      id
      userId
      day
      dayPart
      preference
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = (props) => {
  console.log(props)
  return <div>
    {/*{<Form onSubmit={onSubmit}>*/}
    <SelectField name={"select-" + props.dayIndex + props.part} validation={{ valueAsNumber: true }}>
      <option value={1}>jako silne chcu</option>
      <option value={2}>chcu</option>
      <option value={3}>jedno jako</option>
      <option value={4}>nechcu</option>
      <option value={5}>jako vubec nechcu</option>
    </SelectField>
    <FieldError name="selectSingle" style={{ color: 'red' }} />
  {/*</Form>}*/}
</div>

}
export const Failure = ({
  error,
}: CellFailureProps<FindUserScheduleDayQuery2Variables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  userScheduleDay,
}: CellSuccessProps<
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables
>) => {
  return <div>
    {/*{<Form onSubmit={onSubmit}>*/}
    <SelectField name={"select-" + userScheduleDay.dayIndex + userScheduleDay.part} validation={{valueAsNumber: true}}>
      <option value={1}>jako silne chcu</option>
      <option value={2}>chcu</option>
      <option value={3}>jedno jako</option>
      <option value={4}>nechcu</option>
      <option value={5}>jako vubec nechcu</option>
    </SelectField>
    <FieldError name="selectSingle" style={{color: 'red'}}/>
    {/*</Form>}*/}
  </div>
}
