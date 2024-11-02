import type { Prisma, Shift } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ShiftCreateArgs>({
  shift: {
    one: {
      data: {
        type: 'String',
        employeeType: 'String',
        department: 'String',
        amount: 1813901,
        qualification: 'String',
      },
    },
    two: {
      data: {
        type: 'String',
        employeeType: 'String',
        department: 'String',
        amount: 1786603,
        qualification: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Shift, 'shift'>
