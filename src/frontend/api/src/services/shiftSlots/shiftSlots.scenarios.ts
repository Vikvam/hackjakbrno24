import type { Prisma, ShiftSlot } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShiftSlotCreateArgs>({
  shiftSlot: {
    one: {
      data: {
        date: '2024-11-02T23:14:07.220Z',
        shift: {
          create: {
            type: 'String',
            employeeType: 'String',
            department: 'String',
            amount: 5868567,
            qualification: 'String',
          },
        },
      },
    },
    two: {
      data: {
        date: '2024-11-02T23:14:07.220Z',
        shift: {
          create: {
            type: 'String',
            employeeType: 'String',
            department: 'String',
            amount: 8767711,
            qualification: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ShiftSlot, 'shiftSlot'>
