import type {
  DeleteUserScheduleMutation,
  DeleteUserScheduleMutationVariables,
  FindUserScheduleById,
} from 'types/graphql'

import {Link, routes, navigate} from '@redwoodjs/router'
import {useMutation} from '@redwoodjs/web'
import type {TypedDocumentNode} from '@redwoodjs/web'
import {toast} from '@redwoodjs/web/toast'

import {timeTag} from 'src/lib/formatters'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {SelectField} from "@redwoodjs/forms";
import {useState} from "react";

const DELETE_USER_SCHEDULE_MUTATION: TypedDocumentNode<
  DeleteUserScheduleMutation,
  DeleteUserScheduleMutationVariables
> = gql`
  mutation DeleteUserScheduleMutation($id: Int!) {
    deleteUserSchedule(id: $id) {
      id
    }
  }
`

interface Props {
  userSchedule: NonNullable<FindUserScheduleById['userSchedule']>
}

const UserSchedule = ({userSchedule}: Props) => {
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
  const partsOfDay = ['Ranní', 'Odpolední', 'Večerní', 'Noční']
  let [preferences, setPreferences] = useState({})
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
                {daysOfWeek[date.getDay()]}<br/>
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

export default UserSchedule
