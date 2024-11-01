// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  userScheduleDay: {
    __typename: 'UserScheduleDay' as const,
    id: 42,
  },
})
