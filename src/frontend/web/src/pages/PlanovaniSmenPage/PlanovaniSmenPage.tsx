// import { Link, routes } from '@redwoodjs/router'
import {Metadata, useMutation} from '@redwoodjs/web'
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "src/components/ui/table";
import {Form, SelectField} from "@redwoodjs/forms";
import {CreateUserScheduleDayInput, CreateUserScheduleInput} from "types/graphql";
import {Button} from 'src/components/ui/button';

const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So']
const partsOfDay = ['Ranní', 'Odpolední', 'Večerní', 'Noční']

const CREATE_SCHEDULE = gql`
  mutation createSchedule($input: CreateUserScheduleInput!){
    createUserSchedule(input: $input){
      id
    }
  }
`

const CREATE_DAY_SCHEDULE = gql`
  mutation createDaySchedule($input: CreateUserScheduleDayInput!){
    createUserScheduleDay(input: $input){
      id
    }

  }
`


const registerPreference = (currPreferences, setter, dayIndex, partIndex, preference) => {

  let tmpPref: any = {...currPreferences}
  if (!tmpPref.hasOwnProperty(dayIndex)) {
    tmpPref[dayIndex] = {}
  }
  tmpPref[dayIndex][partIndex] = {preference: preference}
  console.log("Setting with", tmpPref)
  setter(tmpPref)
}
const PlanovaniSmenPage = () => {
  const [createSchedule] = useMutation(CREATE_SCHEDULE)
  const [createDaySchedule] = useMutation(CREATE_DAY_SCHEDULE)
  let [preferences, setPreferences] = useState({})
  const getNextWeekDates = () => {

    const today = new Date()
    return Array(7).fill(null).map((_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      return date
    })
  }

  const uploadPreferences = () => {
    console.log("Uploading state", preferences)
    let date = new Date()
    let schedData: CreateUserScheduleInput = {
      userId: 1, //TODO Hardcode
      schedule: date.toISOString(),
      month: date.getMonth(),
      week: Math.round(date.getDay()/7),
      type: "weekly"
    }
    createSchedule({
      variables: {
        input: schedData
      }
    }).then((resp) => {
      console.log("Resp is", resp)
      let id = resp.data.createUserSchedule.id;
      console.assert(id)
      for (const dayIndex in preferences) {
        for (const partIndex in preferences[dayIndex]) {
          console.log(dayIndex, partIndex, preferences[dayIndex][partIndex])
          const preferenceNum = preferences[dayIndex][partIndex]["preference"];
          // TODO hardcoded
          let dayData: CreateUserScheduleDayInput = {
            day: date.toISOString(),
            preference: preferenceNum,
            reasonCode: 1,
            dayPart: Number.parseInt(dayIndex),
            userId: 1,
            reasonText: "None",
            userScheduleId: id,

          }
          console.log("Day data is", dayData)
          createDaySchedule({
            variables: {
              input: dayData
            }
          })
        }
      }
    })
  }

  const initialPreferences = () => {
      let prefs: any = {}
    for (let i = 0; i < daysOfWeek.length; i++) {
      prefs[i] = {}
      for (let j = 0; j < partsOfDay.length; j++) {
        prefs[i][j] = {preference: 1}
      }
    }
    return prefs
  }

  const nextWeekDates = getNextWeekDates()

  return (
    <Form>
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
                    <SelectField name={"todo"} value={preferences[dayIndex][partIndex].preference} onChange={
                      (data) => {
                        registerPreference(preferences, setPreferences, dayIndex, partIndex, Number.parseInt(data.target.value))
                      }}>
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
      <Button onClick={uploadPreferences}>
        Save
      </Button>
      <div>
        {JSON.stringify(preferences)}
      </div>
    </Form>
  )
}

export default PlanovaniSmenPage
