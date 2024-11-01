import type { Prisma, UserSchedule } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserScheduleCreateArgs>({
  userSchedule: {
    one: {
      data: {
        schedule: '2024-11-01T22:37:15.559Z',
        updatedAt: '2024-11-01T22:37:15.559Z',
        user: { create: {} },
      },
    },
    two: {
      data: {
        schedule: '2024-11-01T22:37:15.559Z',
        updatedAt: '2024-11-01T22:37:15.559Z',
        user: { create: {} },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserSchedule, 'userSchedule'>
