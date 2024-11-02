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
        userId: scenario.userScheduleDay.two.userId,
        day: '2024-11-02T18:33:11.423Z',
        dayPart: 4712679,
        preference: 4116440,
        reasonCode: 7808839,
        reasonText: 'String',
        updatedAt: '2024-11-02T18:33:11.423Z',
      },
    })

    expect(result.userScheduleId).toEqual(
      scenario.userScheduleDay.two.userScheduleId
    )
    expect(result.userId).toEqual(scenario.userScheduleDay.two.userId)
    expect(result.day).toEqual(new Date('2024-11-02T18:33:11.423Z'))
    expect(result.dayPart).toEqual(4712679)
    expect(result.preference).toEqual(4116440)
    expect(result.reasonCode).toEqual(7808839)
    expect(result.reasonText).toEqual('String')
    expect(result.updatedAt).toEqual(new Date('2024-11-02T18:33:11.423Z'))
  })

  scenario('updates a userScheduleDay', async (scenario: StandardScenario) => {
    const original = (await userScheduleDay({
      id: scenario.userScheduleDay.one.id,
    })) as UserScheduleDay
    const result = await updateUserScheduleDay({
      id: original.id,
      input: { day: '2024-11-03T18:33:11.424Z' },
    })

    expect(result.day).toEqual(new Date('2024-11-03T18:33:11.424Z'))
  })

  scenario('deletes a userScheduleDay', async (scenario: StandardScenario) => {
    const original = (await deleteUserScheduleDay({
      id: scenario.userScheduleDay.one.id,
    })) as UserScheduleDay
    const result = await userScheduleDay({ id: original.id })

    expect(result).toEqual(null)
  })
})
