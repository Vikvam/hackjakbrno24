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
    This day is not in database
</div>

}
export const Failure = ({
  error,
}: CellFailureProps<FindUserScheduleDayQuery2Variables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  userScheduleDay, ...props
}: CellSuccessProps<
  FindUserScheduleDayQuery2,
  FindUserScheduleDayQuery2Variables
>) => {
  const getColor = (preference) => {
    switch (preference) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-green-300';
      case 3: return 'bg-yellow-300';
      case 4: return 'bg-orange-300';
      case 5: return 'bg-red-500';
      default: return '';
    }
  }

  return <div className={getColor(userScheduleDay.preference)}>
    {/*{<Form onSubmit={onSubmit}>*/}
    <SelectField hidden={!props.edit} name={"select-" + userScheduleDay.dayIndex + userScheduleDay.part} validation={{valueAsNumber: true}} onChange={(e) => props.setPreference(e.target.value)}>
      <option value={1}>jako silne chcu</option>
      <option value={2}>chcu</option>
      <option value={3}>jedno jako</option>
      <option value={4}>nechcu</option>
      <option value={5}>jako vubec nechcu</option>
    </SelectField>
    <div hidden={props.edit}>
      {userScheduleDay.preference}
    </div>
    <FieldError name="selectSingle" style={{color: 'red'}}/>
    {/*</Form>}*/}
  </div>
}
