import type { Prisma, UserScheduleDay } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleDayCreateArgs>({
  userScheduleDay: {
    one: {
      data: {
        day: '2024-11-02T08:47:31.350Z',
        dayPart: 1097781,
        preference: 5392639,
        reasonCode: 492635,
        reasonText: 'String',
        updatedAt: '2024-11-02T08:47:31.350Z',
        userSchedule: {
          create: {
            schedule: '2024-11-02T08:47:31.350Z',
            updatedAt: '2024-11-02T08:47:31.350Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
    two: {
      data: {
        day: '2024-11-02T08:47:31.350Z',
        dayPart: 624956,
        preference: 3112851,
        reasonCode: 1566515,
        reasonText: 'String',
        updatedAt: '2024-11-02T08:47:31.350Z',
        userSchedule: {
          create: {
            schedule: '2024-11-02T08:47:31.350Z',
            updatedAt: '2024-11-02T08:47:31.350Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserScheduleDay, 'userScheduleDay'>
