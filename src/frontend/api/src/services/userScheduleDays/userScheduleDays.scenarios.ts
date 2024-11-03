import type { Prisma, UserScheduleDay } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleDayCreateArgs>({
  userScheduleDay: {
    one: {
      data: {
        preference: 5229187,
        reasonCode: 8035001,
        reasonText: 'String',
        updatedAt: '2024-11-03T02:10:01.029Z',
        day: '2024-11-03T02:10:01.029Z',
        userSchedule: {
          create: {
            type: 'String',
            month: 6750919,
            schedule: '2024-11-03T02:10:01.029Z',
            updatedAt: '2024-11-03T02:10:01.029Z',
            user: { create: { occupation: 'String' } },
          },
        },
        user: { create: { occupation: 'String' } },
      },
    },
    two: {
      data: {
        preference: 1023590,
        reasonCode: 7039764,
        reasonText: 'String',
        updatedAt: '2024-11-03T02:10:01.029Z',
        day: '2024-11-03T02:10:01.029Z',
        userSchedule: {
          create: {
            type: 'String',
            month: 7495316,
            schedule: '2024-11-03T02:10:01.029Z',
            updatedAt: '2024-11-03T02:10:01.029Z',
            user: { create: { occupation: 'String' } },
          },
        },
        user: { create: { occupation: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserScheduleDay, 'userScheduleDay'>
