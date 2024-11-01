import type {
  QueryResolvers,
  MutationResolvers,
  UserScheduleRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userSchedules: QueryResolvers['userSchedules'] = () => {
  return db.userSchedule.findMany()
}

export const userSchedule: QueryResolvers['userSchedule'] = ({ id }) => {
  return db.userSchedule.findUnique({
    where: { id },
  })
}

export const createUserSchedule: MutationResolvers['createUserSchedule'] = ({
  input,
}) => {
  return db.userSchedule.create({
    data: input,
  })
}

export const updateUserSchedule: MutationResolvers['updateUserSchedule'] = ({
  id,
  input,
}) => {
  return db.userSchedule.update({
    data: input,
    where: { id },
  })
}

export const deleteUserSchedule: MutationResolvers['deleteUserSchedule'] = ({
  id,
}) => {
  return db.userSchedule.delete({
    where: { id },
  })
}

export const UserSchedule: UserScheduleRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userSchedule.findUnique({ where: { id: root?.id } }).user()
  },
  UserScheduleDay: (_obj, { root }) => {
    return db.userSchedule
      .findUnique({ where: { id: root?.id } })
      .UserScheduleDay()
  },
}
