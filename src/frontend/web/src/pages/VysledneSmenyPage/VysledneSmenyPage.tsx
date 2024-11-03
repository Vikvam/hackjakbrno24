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
const partsOfDay = ['CT Odpo',
  'CT Odpo 12',
  'CT Ranní',
  'CT Ranní 12',
  'RTG Odpo',
  'RTG Odpo 12',
  'RTG Ranní',
  'RTG Ranní 12']

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

  let example_json_entries = {"CT Odpo": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "CT Odpo", "name": "RTG Assistant 10", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "CT Odpo", "name": "RTG Assistant 8", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "UNAVAILABLE"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "CT Odpo", "name": "RTG Assistant 1", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "DESIRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "CT Odpo", "name": "RTG Assistant 9", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "PREFERRED"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "CT Odpo", "name": "RTG Assistant 8", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "UNDESIRED"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "CT Odpo", "name": "RTG Assistant 1", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "CT Odpo", "name": "RTG Assistant 3", "shift_type": "Odpo", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}]}, "CT Odpo 12": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "CT Odpo 12", "name": "Nurse 6", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "DESIRED"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "CT Odpo 12", "name": "Nurse 16", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "UNDESIRED"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "CT Odpo 12", "name": "Nurse 23", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "PREFERRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "CT Odpo 12", "name": "Nurse 11", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "PREFERRED"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "CT Odpo 12", "name": "Nurse 3", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "UNDESIRED"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "CT Odpo 12", "name": "Nurse 19", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "DESIRED"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "CT Odpo 12", "name": "Nurse 15", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "CT", "preference": "PREFERRED"}]}, "CT Ranní": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "CT Ranní", "name": "RTG Assistant 9", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}, {"date": "2024-11-04", "date_index": 0, "part_index": "CT Ranní", "name": "RTG Assistant 11", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NEUTRAL"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "CT Ranní", "name": "RTG Assistant 7", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "UNDESIRED"}, {"date": "2024-11-05", "date_index": 1, "part_index": "CT Ranní", "name": "RTG Assistant 4", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NEUTRAL"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "CT Ranní", "name": "RTG Assistant 4", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NEUTRAL"}, {"date": "2024-11-06", "date_index": 2, "part_index": "CT Ranní", "name": "RTG Assistant 12", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "DESIRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "CT Ranní", "name": "RTG Assistant 1", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NEUTRAL"}, {"date": "2024-11-07", "date_index": 3, "part_index": "CT Ranní", "name": "RTG Assistant 9", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "UNAVAILABLE"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "CT Ranní", "name": "RTG Assistant 4", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "DESIRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "CT Ranní", "name": "RTG Assistant 11", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "CT Ranní", "name": "RTG Assistant 3", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "DESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "CT Ranní", "name": "RTG Assistant 13", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "CT Ranní", "name": "RTG Assistant 4", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "UNAVAILABLE"}, {"date": "2024-11-10", "date_index": 6, "part_index": "CT Ranní", "name": "RTG Assistant 0", "shift_type": "Ranní", "occupation": "RTG", "department": "CT", "preference": "NECESSARY"}]}, "CT Ranní 12": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "CT Ranní 12", "name": "Nurse 1", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "UNDESIRED"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "CT Ranní 12", "name": "Nurse 0", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "DESIRED"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "CT Ranní 12", "name": "Nurse 4", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "IMPOSSIBLE"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "CT Ranní 12", "name": "Nurse 18", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "NEUTRAL"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "CT Ranní 12", "name": "Nurse 20", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "UNAVAILABLE"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "CT Ranní 12", "name": "Nurse 4", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "NEUTRAL"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "CT Ranní 12", "name": "Nurse 25", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "CT", "preference": "UNDESIRED"}]}, "RTG Odpo": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo", "name": "Doctor 8", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo", "name": "Doctor 28", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo", "name": "Doctor 7", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo", "name": "RTG Assistant 0", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo", "name": "RTG Assistant 8", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo", "name": "Doctor 13", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo", "name": "Doctor 9", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo", "name": "Doctor 9", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo", "name": "RTG Assistant 14", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo", "name": "RTG Assistant 0", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "UNAVAILABLE"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo", "name": "Doctor 18", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo", "name": "Doctor 14", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo", "name": "Doctor 3", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo", "name": "RTG Assistant 4", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo", "name": "RTG Assistant 7", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "UNDESIRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo", "name": "Doctor 28", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo", "name": "Doctor 24", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo", "name": "Doctor 19", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo", "name": "RTG Assistant 6", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo", "name": "RTG Assistant 4", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "PREFERRED"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo", "name": "Doctor 22", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo", "name": "Doctor 0", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo", "name": "Doctor 19", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo", "name": "RTG Assistant 10", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo", "name": "RTG Assistant 7", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "PREFERRED"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo", "name": "Doctor 23", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo", "name": "Doctor 7", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo", "name": "Doctor 29", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo", "name": "RTG Assistant 5", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo", "name": "RTG Assistant 7", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo", "name": "Doctor 2", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo", "name": "Doctor 1", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo", "name": "Doctor 4", "shift_type": "Odpo", "occupation": "Doctor", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo", "name": "RTG Assistant 7", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo", "name": "RTG Assistant 3", "shift_type": "Odpo", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}]}, "RTG Odpo 12": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "RTG Odpo 12", "name": "Nurse 5", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "PREFERRED"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "RTG Odpo 12", "name": "Nurse 19", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "NECESSARY"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "RTG Odpo 12", "name": "Nurse 14", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "RTG Odpo 12", "name": "Nurse 1", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "RTG Odpo 12", "name": "Nurse 27", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "NEUTRAL"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "RTG Odpo 12", "name": "Nurse 29", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "DESIRED"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "RTG Odpo 12", "name": "Nurse 20", "shift_type": "Odpo 12", "occupation": "Nurse", "department": "RTG", "preference": "UNAVAILABLE"}]}, "RTG Ranní": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "Doctor 0", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "Doctor 2", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "Doctor 19", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "Doctor 3", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "Doctor 3", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "RTG Assistant 0", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "RTG Assistant 13", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní", "name": "RTG Assistant 1", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "UNAVAILABLE"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "Doctor 5", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "Doctor 6", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "Doctor 23", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "Doctor 26", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "Doctor 8", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "RTG Assistant 7", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "RTG Assistant 0", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní", "name": "RTG Assistant 2", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "IMPOSSIBLE"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "Doctor 10", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "Doctor 11", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "Doctor 4", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "Doctor 16", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "Doctor 29", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "RTG Assistant 14", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "RTG Assistant 3", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní", "name": "RTG Assistant 13", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NEUTRAL"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "Doctor 15", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "Doctor 13", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "Doctor 17", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "Doctor 18", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "Doctor 5", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNAVAILABLE"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "RTG Assistant 13", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "RTG Assistant 11", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní", "name": "RTG Assistant 2", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NEUTRAL"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "Doctor 20", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "Doctor 21", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "Doctor 21", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "Doctor 27", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "Doctor 6", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "RTG Assistant 6", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "RTG Assistant 11", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní", "name": "RTG Assistant 9", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "Doctor 25", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "Doctor 20", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "Doctor 28", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "Doctor 23", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "Doctor 9", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "RTG Assistant 0", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "RTG Assistant 11", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní", "name": "RTG Assistant 3", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "DESIRED"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "Doctor 8", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "Doctor 23", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "Doctor 3", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "Doctor 23", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "PREFERRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "Doctor 12", "shift_type": "Ranní", "occupation": "Doctor", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "RTG Assistant 0", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "RTG Assistant 1", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní", "name": "RTG Assistant 8", "shift_type": "Ranní", "occupation": "RTG", "department": "RTG", "preference": "PREFERRED"}]}, "RTG Ranní 12": {"0": [{"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní 12", "name": "Nurse 27", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "IMPOSSIBLE"}, {"date": "2024-11-04", "date_index": 0, "part_index": "RTG Ranní 12", "name": "Nurse 18", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}], "1": [{"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní 12", "name": "Nurse 13", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "NEUTRAL"}, {"date": "2024-11-05", "date_index": 1, "part_index": "RTG Ranní 12", "name": "Nurse 14", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNAVAILABLE"}], "2": [{"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní 12", "name": "Nurse 11", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}, {"date": "2024-11-06", "date_index": 2, "part_index": "RTG Ranní 12", "name": "Nurse 9", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}], "3": [{"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní 12", "name": "Nurse 12", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-07", "date_index": 3, "part_index": "RTG Ranní 12", "name": "Nurse 0", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNAVAILABLE"}], "4": [{"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní 12", "name": "Nurse 28", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "NECESSARY"}, {"date": "2024-11-08", "date_index": 4, "part_index": "RTG Ranní 12", "name": "Nurse 12", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "UNDESIRED"}], "5": [{"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní 12", "name": "Nurse 16", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-09", "date_index": 5, "part_index": "RTG Ranní 12", "name": "Nurse 16", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "DESIRED"}], "6": [{"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní 12", "name": "Nurse 28", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "DESIRED"}, {"date": "2024-11-10", "date_index": 6, "part_index": "RTG Ranní 12", "name": "Nurse 22", "shift_type": "Ranní 12", "occupation": "Nurse", "department": "RTG", "preference": "DESIRED"}]}}

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
                    <ul>
                      {example_json_entries[part][dayIndex]?.map((entry, index) => (
                        <Link to={routes.user({ id: user.id })} key={index}>
                          <li className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                              <User className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">{entry.name}</p>
                              <div className="flex flex-row space-x-2">
                                <p className="text-sm text-muted-foreground">{entry.shift_type}</p>
                                <p className="text-sm text-muted-foreground">{entry.occupation}</p>
                                <p className="text-sm text-muted-foreground">{entry.department}</p>
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
