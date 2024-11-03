import type { Prisma, UserScheduleDay } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleDayCreateArgs>({
  userScheduleDay: {
    one: {
      data: {
        preference: 4664458,
        reasonCode: 7437711,
        reasonText: 'String',
        updatedAt: '2024-11-03T01:48:59.212Z',
        userSchedule: {
          create: {
            type: 'String',
            month: 5795361,
            schedule: '2024-11-03T01:48:59.212Z',
            updatedAt: '2024-11-03T01:48:59.212Z',
            user: { create: { occupation: 'String' } },
          },
        },
        user: { create: { occupation: 'String' } },
        shiftSlot: {
          create: {
            date: '2024-11-03T01:48:59.212Z',
            shift: {
              create: {
                type: 'String',
                employeeType: 'String',
                department: 'String',
                amount: 3493135,
                qualification: 'String',
              },
            },
            user: { create: { occupation: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        preference: 5105159,
        reasonCode: 8277340,
        reasonText: 'String',
        updatedAt: '2024-11-03T01:48:59.212Z',
        userSchedule: {
          create: {
            type: 'String',
            month: 9729303,
            schedule: '2024-11-03T01:48:59.212Z',
            updatedAt: '2024-11-03T01:48:59.212Z',
            user: { create: { occupation: 'String' } },
          },
        },
        user: { create: { occupation: 'String' } },
        shiftSlot: {
          create: {
            date: '2024-11-03T01:48:59.212Z',
            shift: {
              create: {
                type: 'String',
                employeeType: 'String',
                department: 'String',
                amount: 7718172,
                qualification: 'String',
              },
            },
            user: { create: { occupation: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserScheduleDay, 'userScheduleDay'>
