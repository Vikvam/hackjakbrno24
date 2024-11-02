import type { Prisma, UserScheduleDay } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleDayCreateArgs>({
  userScheduleDay: {
    one: {
      data: {
        day: '2024-11-02T18:33:11.450Z',
        dayPart: 6154168,
        preference: 1435242,
        reasonCode: 1626031,
        reasonText: 'String',
        updatedAt: '2024-11-02T18:33:11.450Z',
        userSchedule: {
          create: {
            schedule: '2024-11-02T18:33:11.450Z',
            updatedAt: '2024-11-02T18:33:11.450Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
    two: {
      data: {
        day: '2024-11-02T18:33:11.450Z',
        dayPart: 5144414,
        preference: 2536605,
        reasonCode: 205109,
        reasonText: 'String',
        updatedAt: '2024-11-02T18:33:11.450Z',
        userSchedule: {
          create: {
            schedule: '2024-11-02T18:33:11.450Z',
            updatedAt: '2024-11-02T18:33:11.450Z',
            user: { create: {} },
          },
        },
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserScheduleDay, 'userScheduleDay'>
