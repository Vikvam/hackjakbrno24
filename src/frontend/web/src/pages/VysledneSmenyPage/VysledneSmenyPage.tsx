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
const partsOfDay = ["CT No\u010dn\u00ed", 'CT Rann\u00ed 12', 'RTG No\u010dn\u00ed', 'RTG Rann\u00ed 12']

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

  let example_json_entries = {"CT No\u010dn\u00ed": {"0": [{"date": "2024-11-02", "date_index": 0, "part_index": "CT No\u010dn\u00ed", "name": "RTG Assistant 3", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "CT"}, {"date": "2024-11-02", "date_index": 0, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 25", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}], "1": [{"date": "2024-11-03", "date_index": 1, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 2", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-03", "date_index": 1, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 3", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}], "2": [{"date": "2024-11-09", "date_index": 2, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 23", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-09", "date_index": 2, "part_index": "CT No\u010dn\u00ed", "name": "RTG Assistant 3", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "CT"}], "3": [{"date": "2024-11-10", "date_index": 3, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 14", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-10", "date_index": 3, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 26", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}], "4": [{"date": "2024-11-16", "date_index": 4, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 14", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-16", "date_index": 4, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 23", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}], "5": [{"date": "2024-11-17", "date_index": 5, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 29", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-17", "date_index": 5, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 21", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}], "6": [{"date": "2024-11-23", "date_index": 6, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 21", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-23", "date_index": 6, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 21", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}], "7": [{"date": "2024-11-24", "date_index": 7, "part_index": "CT No\u010dn\u00ed", "name": "Nurse 2", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-24", "date_index": 7, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 13", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}], "8": [{"date": "2024-11-30", "date_index": 8, "part_index": "CT No\u010dn\u00ed", "name": "RTG Assistant 13", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "CT"}, {"date": "2024-11-30", "date_index": 8, "part_index": "CT No\u010dn\u00ed", "name": "Doctor 1", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "CT"}]}, "CT Rann\u00ed 12": {"0": [{"date": "2024-11-02", "date_index": 0, "part_index": "CT Rann\u00ed 12", "name": "Doctor 7", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-02", "date_index": 0, "part_index": "CT Rann\u00ed 12", "name": "Doctor 8", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}], "1": [{"date": "2024-11-03", "date_index": 1, "part_index": "CT Rann\u00ed 12", "name": "Nurse 29", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-03", "date_index": 1, "part_index": "CT Rann\u00ed 12", "name": "Doctor 17", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}], "2": [{"date": "2024-11-09", "date_index": 2, "part_index": "CT Rann\u00ed 12", "name": "Nurse 11", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-09", "date_index": 2, "part_index": "CT Rann\u00ed 12", "name": "RTG Assistant 13", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "CT"}], "3": [{"date": "2024-11-10", "date_index": 3, "part_index": "CT Rann\u00ed 12", "name": "Doctor 26", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-10", "date_index": 3, "part_index": "CT Rann\u00ed 12", "name": "Doctor 1", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}], "4": [{"date": "2024-11-16", "date_index": 4, "part_index": "CT Rann\u00ed 12", "name": "Doctor 25", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-16", "date_index": 4, "part_index": "CT Rann\u00ed 12", "name": "Nurse 11", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}], "5": [{"date": "2024-11-17", "date_index": 5, "part_index": "CT Rann\u00ed 12", "name": "Nurse 24", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-17", "date_index": 5, "part_index": "CT Rann\u00ed 12", "name": "Nurse 6", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}], "6": [{"date": "2024-11-23", "date_index": 6, "part_index": "CT Rann\u00ed 12", "name": "RTG Assistant 11", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "CT"}, {"date": "2024-11-23", "date_index": 6, "part_index": "CT Rann\u00ed 12", "name": "Doctor 3", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}], "7": [{"date": "2024-11-24", "date_index": 7, "part_index": "CT Rann\u00ed 12", "name": "Nurse 12", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}, {"date": "2024-11-24", "date_index": 7, "part_index": "CT Rann\u00ed 12", "name": "Nurse 25", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "CT"}], "8": [{"date": "2024-11-30", "date_index": 8, "part_index": "CT Rann\u00ed 12", "name": "Doctor 22", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "CT"}, {"date": "2024-11-30", "date_index": 8, "part_index": "CT Rann\u00ed 12", "name": "RTG Assistant 7", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "CT"}]}, "RTG No\u010dn\u00ed": {"0": [{"date": "2024-11-02", "date_index": 0, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 9", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 13", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 5", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 11", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}], "1": [{"date": "2024-11-03", "date_index": 1, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 19", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 14", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 11", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 3", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}], "2": [{"date": "2024-11-09", "date_index": 2, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 17", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 3", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 29", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 7", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}], "3": [{"date": "2024-11-10", "date_index": 3, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 25", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 14", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 18", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 3", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}], "4": [{"date": "2024-11-16", "date_index": 4, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 28", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 21", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 20", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 12", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}], "5": [{"date": "2024-11-17", "date_index": 5, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 25", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 6", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 3", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 14", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}], "6": [{"date": "2024-11-23", "date_index": 6, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 20", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 2", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 6", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 19", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}], "7": [{"date": "2024-11-24", "date_index": 7, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 10", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 25", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 0", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 8", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}], "8": [{"date": "2024-11-30", "date_index": 8, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 14", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG No\u010dn\u00ed", "name": "Nurse 22", "shift_type": "No\u010dn\u00ed", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG No\u010dn\u00ed", "name": "Doctor 15", "shift_type": "No\u010dn\u00ed", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG No\u010dn\u00ed", "name": "RTG Assistant 11", "shift_type": "No\u010dn\u00ed", "occupation": "RTG", "department": "RTG"}]}, "RTG Rann\u00ed 12": {"0": [{"date": "2024-11-02", "date_index": 0, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 14", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 20", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 16", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 23", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-02", "date_index": 0, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 15", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}], "1": [{"date": "2024-11-03", "date_index": 1, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 24", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 7", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 9", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 0", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-03", "date_index": 1, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 8", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}], "2": [{"date": "2024-11-09", "date_index": 2, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 28", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 19", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 4", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 5", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-09", "date_index": 2, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 6", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}], "3": [{"date": "2024-11-10", "date_index": 3, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 6", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 2", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 10", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 1", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-10", "date_index": 3, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 5", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}], "4": [{"date": "2024-11-16", "date_index": 4, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 29", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 14", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 7", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 7", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-16", "date_index": 4, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 1", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}], "5": [{"date": "2024-11-17", "date_index": 5, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 7", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 6", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 13", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 15", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-17", "date_index": 5, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 29", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}], "6": [{"date": "2024-11-23", "date_index": 6, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 27", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 24", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 24", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 8", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-23", "date_index": 6, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 2", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}], "7": [{"date": "2024-11-24", "date_index": 7, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 19", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 24", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 8", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 4", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-24", "date_index": 7, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 22", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}], "8": [{"date": "2024-11-30", "date_index": 8, "part_index": "RTG Rann\u00ed 12", "name": "RTG Assistant 14", "shift_type": "Rann\u00ed 12", "occupation": "RTG", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 8", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG Rann\u00ed 12", "name": "Nurse 2", "shift_type": "Rann\u00ed 12", "occupation": "Nurse", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 16", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}, {"date": "2024-11-30", "date_index": 8, "part_index": "RTG Rann\u00ed 12", "name": "Doctor 26", "shift_type": "Rann\u00ed 12", "occupation": "Doctor", "department": "RTG"}]}}

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

                    {example_json_entries[part].map((_, index) => (
                      <Link to={routes.user({ id: user.id })} key={index}>
                        <li className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                          <User className="h-6 w-6 text-primary-foreground"/>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">{}</p>
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
