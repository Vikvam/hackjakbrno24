import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const shiftSlots: QueryResolvers['shiftSlots'] = () => {
  return db.shiftSlot.findMany()
}

export const shiftSlot: QueryResolvers['shiftSlot'] = ({ id }) => {
  return db.shiftSlot.findUnique({
    where: { id },
  })
}

export const createShiftSlot: MutationResolvers['createShiftSlot'] = ({
  input,
}) => {
  return db.shiftSlot.create({
    data: input,
  })
}

export const updateShiftSlot: MutationResolvers['updateShiftSlot'] = ({
  id,
  input,
}) => {
  return db.shiftSlot.update({
    data: input,
    where: { id },
  })
}

export const deleteShiftSlot: MutationResolvers['deleteShiftSlot'] = ({
  id,
}) => {
  return db.shiftSlot.delete({
    where: { id },
  })
}
