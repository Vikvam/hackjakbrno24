import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "src/components/ui/table"
import UserScheduleDay from "src/components/UserScheduleDayCell";

export function WeeklyScheduleComponent(props) {
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
  const partsOfDay = ['Ranní', 'Odpolední', 'Večerní', 'Noční']

  const getNextWeekDates = () => {
    const today = new Date()
    return Array(7).fill(null).map((_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return date
    })
  }

  const nextWeekDates = getNextWeekDates()

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Část dne</TableHead>
            {nextWeekDates.map((date, index) => (
              <TableHead key={index} className="text-center">
                {daysOfWeek[date.getDay()]}<br />
                {date.getDate()}.{date.getMonth() + 1}.
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {partsOfDay.map((part, partIndex) => (
            <TableRow key={partIndex}>
              <TableCell className="font-medium">{part}</TableCell>
              {nextWeekDates.map((_, dayIndex) => (
                <TableCell key={dayIndex} className="text-center">
                  <UserScheduleDay id={props.id} part={part} dayIndex={dayIndex}></UserScheduleDay>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
