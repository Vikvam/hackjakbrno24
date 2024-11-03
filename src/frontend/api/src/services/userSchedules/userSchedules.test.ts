import type { UserSchedule } from '@prisma/client'

import {
  userSchedules,
  userSchedule,
  createUserSchedule,
  updateUserSchedule,
  deleteUserSchedule,
} from './userSchedules'
import type { StandardScenario } from './userSchedules.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userSchedules', () => {
  scenario('returns all userSchedules', async (scenario: StandardScenario) => {
    const result = await userSchedules()

    expect(result.length).toEqual(Object.keys(scenario.userSchedule).length)
  })

  scenario(
    'returns a single userSchedule',
    async (scenario: StandardScenario) => {
      const result = await userSchedule({ id: scenario.userSchedule.one.id })

      expect(result).toEqual(scenario.userSchedule.one)
    }
  )

  scenario('creates a userSchedule', async (scenario: StandardScenario) => {
    const result = await createUserSchedule({
      input: {
        userId: scenario.userSchedule.two.userId,
        type: 'String',
        month: 3774057,
        schedule: '2024-11-03T01:48:12.120Z',
        updatedAt: '2024-11-03T01:48:12.120Z',
      },
    })

    expect(result.userId).toEqual(scenario.userSchedule.two.userId)
    expect(result.type).toEqual('String')
    expect(result.month).toEqual(3774057)
    expect(result.schedule).toEqual(new Date('2024-11-03T01:48:12.120Z'))
    expect(result.updatedAt).toEqual(new Date('2024-11-03T01:48:12.120Z'))
  })

  scenario('updates a userSchedule', async (scenario: StandardScenario) => {
    const original = (await userSchedule({
      id: scenario.userSchedule.one.id,
    })) as UserSchedule
    const result = await updateUserSchedule({
      id: original.id,
      input: { type: 'String2' },
    })

    expect(result.type).toEqual('String2')
  })

  scenario('deletes a userSchedule', async (scenario: StandardScenario) => {
    const original = (await deleteUserSchedule({
      id: scenario.userSchedule.one.id,
    })) as UserSchedule
    const result = await userSchedule({ id: original.id })

    expect(result).toEqual(null)
  })
})
