import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { occupation: 'String' } },
    two: { data: { occupation: 'String' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
