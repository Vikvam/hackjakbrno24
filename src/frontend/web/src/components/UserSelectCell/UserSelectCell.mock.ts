// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  userSelect: {
    __typename: 'UserSelect' as const,
    id: 42,
  },
})
