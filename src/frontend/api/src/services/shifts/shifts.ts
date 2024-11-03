import type {
  QueryResolvers,
  MutationResolvers,
  ShiftRelationResolvers,
} from 'types/graphql'

import {db} from 'src/lib/db'

export const shiftsByDepartmentAndEmployeeType: QueryResolvers['shiftsByDepartmentAndEmployeeType'] = ({
                                                                                                         department,
                                                                                                         employeeType
                                                                                                       }) => {
  return db.shift.findMany({
    where: {
      department: department,
      employeeType: employeeType,
    },
  })
}


export const shifts: QueryResolvers['shifts'] = () => {
  return db.shift.findMany()
}

export const shift: QueryResolvers['shift'] = ({id}) => {
  return db.shift.findUnique({
    where: {id},
  })
}

export const createShift: MutationResolvers['createShift'] = ({input}) => {
  return db.shift.create({
    data: input,
  })
}

export const updateShift: MutationResolvers['updateShift'] = ({
                                                                id,
                                                                input,
                                                              }) => {
  return db.shift.update({
    data: input,
    where: {id},
  })
}

export const deleteShift: MutationResolvers['deleteShift'] = ({id}) => {
  return db.shift.delete({
    where: {id},
  })
}

export const deleteShifts: MutationResolvers['deleteShifts'] = async ({ department, employeeType }) => {
  const result = await db.shift.deleteMany({
    where: {
      department: department,
      employeeType: employeeType,
    },
  })
  return result.count > 0
}

export const Shift: ShiftRelationResolvers = {
  ShiftSlot: (_obj, {root}) => {
    return db.shift.findUnique({where: {id: root?.id}}).ShiftSlot()
  },
}
