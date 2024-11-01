import type {
  QueryResolvers,
  MutationResolvers,
  UserScheduleDayRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userScheduleDays: QueryResolvers['userScheduleDays'] = () => {
  return db.userScheduleDay.findMany()
}

export const userScheduleDay: QueryResolvers['userScheduleDay'] = ({ id }) => {
  return db.userScheduleDay.findUnique({
    where: { id },
  })
}

export const createUserScheduleDay: MutationResolvers['createUserScheduleDay'] =
  ({ input }) => {
    return db.userScheduleDay.create({
      data: input,
    })
  }

export const updateUserScheduleDay: MutationResolvers['updateUserScheduleDay'] =
  ({ id, input }) => {
    return db.userScheduleDay.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserScheduleDay: MutationResolvers['deleteUserScheduleDay'] =
  ({ id }) => {
    return db.userScheduleDay.delete({
      where: { id },
    })
  }

export const UserScheduleDay: UserScheduleDayRelationResolvers = {
  userSchedule: (_obj, { root }) => {
    return db.userScheduleDay
      .findUnique({ where: { id: root?.id } })
      .userSchedule()
  },
  user: (_obj, { root }) => {
    return db.userScheduleDay.findUnique({ where: { id: root?.id } }).user()
  },
}

export const userScheduleDayByDayAndPartOfDay = ({
  day,
  partOfDay,
}) => {
  return db.userScheduleDay.findFirst({
    where: {
      AND: [
        { dayPart: partOfDay,
          day: day }
      ]
    }
  })
}
