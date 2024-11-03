import {db} from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

const SHIFTS = [
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 3,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L3"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 2,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 2,
    "qualification": "L3"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L2"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Nurse",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Nurse",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Nurse",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Nurse",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 3,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  }
]


export default async () => {
  try {
    const users = [
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.round(Math.random() * 100) / 100
        const qualification = ['L1', 'L2', 'L3'][Math.floor(Math.random() * 3)]
        const stem = ['RTG', ''][Math.floor(Math.random() * 3)]
        return {
          name: `Doktor${idx + 1}`,
          occupation: 'doctor',
          qualification: qualification,
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
          stem: stem,
          attestation: stem ? ['', 'RTG'][Math.floor(Math.random() * 2)] : '',
        }
      }),
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `Sestra${idx + 1}`,
          occupation: 'nurse',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `RTGAsistent${idx + 1}`,
          occupation: 'rtgAssistant',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
    ]

    await db.user.createMany({data: users})

    const createdShifts = await db.shift.createMany({
      data: SHIFTS
    })

    console.info('Seed data inserted successfully!', users.length)
  } catch (error) {
    console.error(error)
  }
}
