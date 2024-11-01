import type { UserScheduleDay } from '@prisma/client'

import {
  userScheduleDays,
  userScheduleDay,
  createUserScheduleDay,
  updateUserScheduleDay,
  deleteUserScheduleDay,
} from './userScheduleDays'
import type { StandardScenario } from './userScheduleDays.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userScheduleDays', () => {
  scenario(
    'returns all userScheduleDays',
    async (scenario: StandardScenario) => {
      const result = await userScheduleDays()

      expect(result.length).toEqual(
        Object.keys(scenario.userScheduleDay).length
      )
    }
  )

  scenario(
    'returns a single userScheduleDay',
    async (scenario: StandardScenario) => {
      const result = await userScheduleDay({
        id: scenario.userScheduleDay.one.id,
      })

      expect(result).toEqual(scenario.userScheduleDay.one)
    }
  )

  scenario('creates a userScheduleDay', async (scenario: StandardScenario) => {
    const result = await createUserScheduleDay({
      input: {
        userScheduleId: scenario.userScheduleDay.two.userScheduleId,
        day: '2024-11-01T22:36:53.101Z',
        updatedAt: '2024-11-01T22:36:53.101Z',
      },
    })

    expect(result.userScheduleId).toEqual(
      scenario.userScheduleDay.two.userScheduleId
    )
    expect(result.day).toEqual(new Date('2024-11-01T22:36:53.101Z'))
    expect(result.updatedAt).toEqual(new Date('2024-11-01T22:36:53.101Z'))
  })

  scenario('updates a userScheduleDay', async (scenario: StandardScenario) => {
    const original = (await userScheduleDay({
      id: scenario.userScheduleDay.one.id,
    })) as UserScheduleDay
    const result = await updateUserScheduleDay({
      id: original.id,
      input: { day: '2024-11-02T22:36:53.101Z' },
    })

    expect(result.day).toEqual(new Date('2024-11-02T22:36:53.101Z'))
  })

  scenario('deletes a userScheduleDay', async (scenario: StandardScenario) => {
    const original = (await deleteUserScheduleDay({
      id: scenario.userScheduleDay.one.id,
    })) as UserScheduleDay
    const result = await userScheduleDay({ id: original.id })

    expect(result).toEqual(null)
  })
})