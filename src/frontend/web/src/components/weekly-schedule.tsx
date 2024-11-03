import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "src/components/ui/table"
import UserScheduleDay from "src/components/UserScheduleDayCell";
import {CreateUserScheduleDayInput, FindUserScheduleDayQuery2} from "types/graphql";
import {useState} from "react";
import {SelectField} from "@redwoodjs/forms";

const FindCellForDayPart = (cells, dayIndex: number, part: number) => {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].dayPart === part) {
      return cells[i]
    }
  }
  return {id: 1}
}

export function WeeklyScheduleComponent(props) {
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
  const partsOfDay = ['Ranní', 'Odpolední', 'Večerní', 'Noční']
  const cells = props.cells.map((cell) => cell.data.createUserScheduleDay)
  let [preferences, setPreferences] = useState({})
  console.log("Cells", cells)
  if (!cells || cells.length === 0) {
    return <div>Loading...</div>
  }

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
                  <SelectField name={"todo"}>
                    <option value={1}>jako silne chcu</option>
                    <option value={2}>chcu</option>
                    <option value={3}>jedno jako</option>
                    <option value={4}>nechcu</option>
                    <option value={5}>jako vubec nechcu</option>
                  </SelectField>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
