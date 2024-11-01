import type { Prisma, UserScheduleDay } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleDayCreateArgs>({
  userScheduleDay: {
    one: {
      data: {
        day: '2024-11-01T22:36:53.115Z',
        updatedAt: '2024-11-01T22:36:53.115Z',
        userSchedule: {
          create: {
            schedule: '2024-11-01T22:36:53.115Z',
            updatedAt: '2024-11-01T22:36:53.115Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
    two: {
      data: {
        day: '2024-11-01T22:36:53.115Z',
        updatedAt: '2024-11-01T22:36:53.115Z',
        userSchedule: {
          create: {
            schedule: '2024-11-01T22:36:53.115Z',
            updatedAt: '2024-11-01T22:36:53.115Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserScheduleDay, 'userScheduleDay'>
