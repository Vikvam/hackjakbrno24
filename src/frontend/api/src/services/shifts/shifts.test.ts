import type { Shift } from '@prisma/client'

import { shifts, shift, createShift, updateShift, deleteShift } from './shifts'
import type { StandardScenario } from './shifts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('shifts', () => {
  scenario('returns all shifts', async (scenario: StandardScenario) => {
    const result = await shifts()

    expect(result.length).toEqual(Object.keys(scenario.shift).length)
  })

  scenario('returns a single shift', async (scenario: StandardScenario) => {
    const result = await shift({ id: scenario.shift.one.id })

    expect(result).toEqual(scenario.shift.one)
  })

  scenario('creates a shift', async () => {
    const result = await createShift({
      input: {
        type: 'String',
        employeeType: 'String',
        department: 'String',
        amount: 2161237,
        qualification: 'String',
      },
    })

    expect(result.type).toEqual('String')
    expect(result.employeeType).toEqual('String')
    expect(result.department).toEqual('String')
    expect(result.amount).toEqual(2161237)
    expect(result.qualification).toEqual('String')
  })

  scenario('updates a shift', async (scenario: StandardScenario) => {
    const original = (await shift({ id: scenario.shift.one.id })) as Shift
    const result = await updateShift({
      id: original.id,
      input: { type: 'String2' },
    })

    expect(result.type).toEqual('String2')
  })

  scenario('deletes a shift', async (scenario: StandardScenario) => {
    const original = (await deleteShift({ id: scenario.shift.one.id })) as Shift
    const result = await shift({ id: original.id })

    expect(result).toEqual(null)
  })
})
