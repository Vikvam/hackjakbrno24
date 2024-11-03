// import { Link, routes } from '@redwoodjs/router'
import {Metadata, useMutation} from '@redwoodjs/web'
import React, {useEffect, useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "src/components/ui/table";
import {Form, SelectField, TextField} from "@redwoodjs/forms";
import {CreateUserScheduleDayInput, CreateUserScheduleInput} from "types/graphql";
import {Button} from 'src/components/ui/button';
import {navigate, routes} from "@redwoodjs/router";

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
const PlanovaniSmenPage = (props) => {
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
                    style={{
                      backgroundColor: preferences[dayIndex][partIndex].preference === 0 ? 'darkgreen' :
                        preferences[dayIndex][partIndex].preference === 1 ? 'green' :
                          preferences[dayIndex][partIndex].preference === 2 ? 'lightgreen' :
                            preferences[dayIndex][partIndex].preference === 3 ? 'yellow' :
                              preferences[dayIndex][partIndex].preference === 4 ? 'orange' :
                                'red'
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <SelectField
                        name={`preference-${dayIndex}-${partIndex}`}
                        value={preferences[dayIndex][partIndex].preference}
                        onChange={(data) => {
                          registerPreference(preferences, setPreferences, dayIndex, partIndex, Number.parseInt(data.target.value))
                        }}
                        hidden={props.id}
                      >
                        <option value={1}>jako silne chcu</option>
                        <option value={2}>chcu</option>
                        <option value={3}>jedno jako</option>
                        <option value={4}>nechcu</option>
                        <option value={5}>jako vubec nechcu</option>
                      </SelectField>

                      {preferences[dayIndex][partIndex].preference === 5 && !props.id && (
                        <TextField
                          name={`reason-${dayIndex}-${partIndex}`}
                          placeholder="Důvod..."
                          className="mt-1 p-1 text-sm border rounded"
                          onChange={(e) => {
                            let tmpPref = {...preferences}
                            tmpPref[dayIndex][partIndex].reasonText = e.target.value
                            setPreferences(tmpPref)
                          }}
                          value={preferences[dayIndex][partIndex].reasonText || ''}
                        />
                      )}

                      <div hidden={!props.id}>
                        {preferences[dayIndex][partIndex].preference}
                      </div>
                    </div>
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

export default PlanovaniSmenPage
