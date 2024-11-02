import type { Prisma, ShiftSlot } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShiftSlotCreateArgs>({
  shiftSlot: {
    one: {
      data: {
        date: '2024-11-02T20:57:40.458Z',
        type: 'String',
        department: 'String',
        amount: 8670838,
        qualification: 'String',
      },
    },
    two: {
      data: {
        date: '2024-11-02T20:57:40.458Z',
        type: 'String',
        department: 'String',
        amount: 6419246,
        qualification: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<ShiftSlot, 'shiftSlot'>
