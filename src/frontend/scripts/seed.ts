import {db} from 'api/src/lib/db'

const SHIFTS = {
  weekday: [
    {'type': 'MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 3, "qualification": "L1"},
    {'type': 'MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L2"},
    {'type': 'MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L3"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "RTG", "amount": 2, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L2"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L3"},
    {'type': 'MORNING', "employeeType": 'doctor', "department": "CT", "amount": 2, "qualification": "L3"},
    {'type': 'MORNING', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'MORNING', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L2"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "CT", "amount": 2, "qualification": "L3"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L2"},
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L3"},
    {'type': 'MORNING', "employeeType": 'rtgAssistant', "department": "CT", "amount": 2, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'rtgAssistant', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'MORNING', "employeeType": 'nurse', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'nurse', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'MORNING', "employeeType": 'nurse', "department": "RTG", "amount": 2, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'nurse', "department": "RTG", "amount": 1, "qualification": "L1"},
    {'type': 'MORNING', "employeeType": 'rtgAssistant', "department": "RTG", "amount": 3, "qualification": "L1"},
    {'type': 'AFTERNOON', "employeeType": 'rtgAssistant', "department": "RTG", "amount": 2, "qualification": "L1"},
  ],
  overnight: [
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L1"},
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L2"},
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L3"},
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L1"},
    {'type': 'OVERNIGHT', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L2"},
    {'type': 'OVERNIGHT', "employeeType": 'rtgAssistant', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'OVERNIGHT', "employeeType": 'rtgAssistant', "department": "RTG", "amount": 1, "qualification": "L1"},
  ],
  weekend: [
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L1"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L2"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L3"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L1"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "CT", "amount": 1, "qualification": "L2"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "CT", "amount": 0, "qualification": "L3"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L1"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L2"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L3"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L1"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "RTG", "amount": 1, "qualification": "L2"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'doctor', "department": "RTG", "amount": 0, "qualification": "L3"},
    {'type': 'WEEKEND_MORNING', "employeeType": 'rtgAssistant', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'WEEKEND_EVENING', "employeeType": 'rtgAssistant', "department": "CT", "amount": 1, "qualification": "L1"},
    {'type': 'WEEKEND_MORNING',
      "employeeType": 'rtgAssistant',
      "department": "RTG",
      "amount": 1,
      "qualification": "L1"
    },
    {'type': 'WEEKEND_EVENING', "employeeType": 'rtgAssistant', "department": "RTG", "amount": 1, "qualification": "L1"}
  ],
}

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

    // for (let u = 0; u < users.length; u++) {
    //   const user = users[u];
    //   const monthlySchedule = await db.userSchedule.create({
    //     data: {
    //       id: u * 2,
    //       userId: u,
    //       type: 'monthly',
    //       month: month,
    //     }
    //   })
    //   const weeklySchedule = await db.userSchedule.create({
    //     data: {
    //       id: u * 2 + 1,
    //       userId: u,
    //       type: 'weekly',
    //       month: month,
    //       week: 1,
    //     }
    //   })
    //   for (let day = 1; day <= daysInMonth; day++) {
    //     const date = new Date(year, month - 1, day)
    //     const preferences = []
    //     const isWeekend = date.getDay() === 0 || date.getDay() === 6
    //     if (isWeekend) {
    //       for (const shift in createdWeekendShifts) {
    //         preferences.push({
    //           userScheduleId: monthlySchedule.id,
    //           userId: user,
    //           preference: Math.floor(Math.random() * 5),
    //           reasonCode: 0,
    //           reasonText: '',
    //           shiftId: shift.id,
    //         })
    //       }
    //     }
    //     else {
    //       for (const shift in createdWeekdayShifts) {
    //         preferences.push({
    //           userScheduleId: weeklySchedule.id,
    //           userId: u,
    //           preference: Math.floor(Math.random() * 5),
    //           reasonCode: 0,
    //           reasonText: '',
    //           shiftId: shift.id,
    //         })
    //       }
    //       for (const shift in createdOvernightShifts) {
    //         preferences.push({
    //           userScheduleId: monthlySchedule.id,
    //           userId: u,
    //           preference: Math.floor(Math.random() * 5),
    //           reasonCode: 0,
    //           reasonText: '',
    //           shiftId: shift.id,
    //         })
    //       }
    //     }
    //     await db.userScheduleDay.createMany({
    //       data: preferences
    //     })
    //   }
    // }

    console.info('Seed data inserted successfully!', createdUsers.length)
  } catch (error) {
    console.error(error)
  }
}
