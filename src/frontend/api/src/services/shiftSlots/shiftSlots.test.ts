import type { ShiftSlot } from '@prisma/client'

import {
  shiftSlots,
  shiftSlot,
  createShiftSlot,
  updateShiftSlot,
  deleteShiftSlot,
} from './shiftSlots'
import type { StandardScenario } from './shiftSlots.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shiftSlots', () => {
  scenario('returns all shiftSlots', async (scenario: StandardScenario) => {
    const result = await shiftSlots()

    expect(result.length).toEqual(Object.keys(scenario.shiftSlot).length)
  })

  scenario('returns a single shiftSlot', async (scenario: StandardScenario) => {
    const result = await shiftSlot({ id: scenario.shiftSlot.one.id })

    expect(result).toEqual(scenario.shiftSlot.one)
  })

  scenario('creates a shiftSlot', async (scenario: StandardScenario) => {
    const result = await createShiftSlot({
      input: {
        date: '2024-11-02T23:14:07.201Z',
        shiftId: scenario.shiftSlot.two.shiftId,
      },
    })

    expect(result.date).toEqual(new Date('2024-11-02T23:14:07.201Z'))
    expect(result.shiftId).toEqual(scenario.shiftSlot.two.shiftId)
  })

  scenario('updates a shiftSlot', async (scenario: StandardScenario) => {
    const original = (await shiftSlot({
      id: scenario.shiftSlot.one.id,
    })) as ShiftSlot
    const result = await updateShiftSlot({
      id: original.id,
      input: { date: '2024-11-03T23:14:07.201Z' },
    })

    expect(result.date).toEqual(new Date('2024-11-03T23:14:07.201Z'))
  })

  scenario('deletes a shiftSlot', async (scenario: StandardScenario) => {
    const original = (await deleteShiftSlot({
      id: scenario.shiftSlot.one.id,
    })) as ShiftSlot
    const result = await shiftSlot({ id: original.id })

    expect(result).toEqual(null)
  })
})
