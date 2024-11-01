import UserScheduleCell from 'src/components/UserSchedule/UserScheduleCell'

type UserSchedulePageProps = {
  id: number
}

const UserSchedulePage = ({ id }: UserSchedulePageProps) => {
  return <UserScheduleCell id={id} />
}

export default UserSchedulePage
