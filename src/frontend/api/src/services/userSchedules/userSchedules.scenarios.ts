import type { Prisma, UserSchedule } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleCreateArgs>({
  userSchedule: {
    one: {
      data: {
        type: 'String',
        month: 1686227,
        schedule: '2024-11-03T01:48:12.148Z',
        updatedAt: '2024-11-03T01:48:12.148Z',
        user: { create: { occupation: 'String' } },
      },
    },
    two: {
      data: {
        type: 'String',
        month: 7018034,
        schedule: '2024-11-03T01:48:12.148Z',
        updatedAt: '2024-11-03T01:48:12.148Z',
        user: { create: { occupation: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserSchedule, 'userSchedule'>
