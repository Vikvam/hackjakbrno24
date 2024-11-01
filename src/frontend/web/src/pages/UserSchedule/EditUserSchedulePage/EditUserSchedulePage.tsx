import EditUserScheduleCell from 'src/components/UserSchedule/EditUserScheduleCell'

type UserSchedulePageProps = {
  id: number
}

const EditUserSchedulePage = ({ id }: UserSchedulePageProps) => {
  return <EditUserScheduleCell id={id} />
}

export default EditUserSchedulePage
