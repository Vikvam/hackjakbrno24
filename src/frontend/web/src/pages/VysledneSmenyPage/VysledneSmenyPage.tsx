// import { Link, routes } from '@redwoodjs/router'
import {Metadata, useMutation} from '@redwoodjs/web'
import {useEffect, useState} from "react";
import {CreateUserScheduleDayInput, CreateUserScheduleInput} from "types/graphql";
import {Link, navigate, routes} from "@redwoodjs/router";
import {Form, SelectField} from "@redwoodjs/forms";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "src/components/ui/table";
import {Button} from "src/components/ui/button";
import {User} from "lucide-react";

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
const VysledneSmenyPage = (props) => {
  const [createSchedule] = useMutation(CREATE_SCHEDULE)
  const [createDaySchedule] = useMutation(CREATE_DAY_SCHEDULE)
  let [preferences, setPreferences] = useState(null)
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
      week: Math.round(date.getDay() / 7),
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
      let promises = []
      for (const dayIndex in preferences) {
        for (const partIndex in preferences[dayIndex]) {
          console.log(dayIndex, partIndex, preferences[dayIndex][partIndex])
          const preferenceNum = preferences[dayIndex][partIndex]["preference"];
          // TODO hardcoded
          let dayData: CreateUserScheduleDayInput = {
            day: date.toISOString(),
            preference: preferenceNum,
            reasonCode: 1,
            // dayPart: Number.parseInt(dayIndex),
            userId: 1,
            reasonText: "None",
            userScheduleId: id,
          }
          console.log("Day data is", dayData)
          promises.push(createDaySchedule({
            variables: {
              input: dayData
            }
          }))
        }
      }
      Promise.all(promises).then((resp) => {
        navigate(routes.planovaniSmenWithId({id: id}))
      })
    })
  }

  const initialPreferences = () => {
    let prefs: any = {}
    if (!props.id) {
      for (let i = 0; i < daysOfWeek.length; i++) {
        prefs[i] = {}
        for (let j = 0; j < partsOfDay.length; j++) {
          prefs[i][j] = {preference: 3}
        }
      }
    } else {
      //TODO MOCK
      for (let i = 0; i < daysOfWeek.length; i++) {
        prefs[i] = {}
        for (let j = 0; j < partsOfDay.length; j++) {
          prefs[i][j] = {preference: Math.round(Math.random() * 5)}
        }
      }
    }
    return prefs
  }

  const nextWeekDates = getNextWeekDates()
  useEffect(() => {
    setPreferences(initialPreferences())
  }, []);

  if (!preferences) {
    return <div>Loading...</div>
  }

  let user = {occupation: "Doktor", id: 1, qualification: "quali", attestation: "att", name: "Aldw Adalw"}

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
                  <TableCell
                    key={dayIndex}
                    className="text-center"
                  >
                    <ul>

                    {Array.from({ length: Math.floor(Math.random() * 5) + 1 }).map((_, index) => (
                      <Link to={routes.user({ id: user.id })} key={index}>
                        <li className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                          <User className="h-6 w-6 text-primary-foreground"/>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <div className="flex flex-row space-x-2">
                            <p className="text-sm text-muted-foreground">{user.attestation}</p>
                            <p className="text-sm text-muted-foreground">{user.qualification}</p>
                            <p className="text-sm text-muted-foreground">{user.occupation}</p>
                          </div>
                        </div>
                      </li>
                    </Link>
                    ))}
                      </ul>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div hidden={props.id}>
        <Button onClick={uploadPreferences}>
          Save
        </Button>
      </div>
      {/*<div>*/}
      {/*  {JSON.stringify(preferences)}*/}
      {/*</div>*/}
    </Form>
  )
}

export default VysledneSmenyPage
