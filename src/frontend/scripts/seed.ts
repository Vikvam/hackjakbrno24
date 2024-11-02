import { db } from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

export default async () => {
  try {
    const users = [
      ...Array.from({ length: 30 }, (_, idx) => {
        const rtg_preference = Math.round(Math.random() * 100) / 100
        const qualification = ['L1', 'L2', 'L3'][Math.floor(Math.random() * 3)]
        const stem = ['RTG', ''][Math.floor(Math.random() * 3)]
        return {
          name: `Doktor${idx + 1}`,
          occupation: 'doctor',
          qualification: qualification,
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
          stem: stem,
          attestation: stem ? ['', 'RTG'][Math.floor(Math.random() * 2)] : '',
        }
      }),
      ...Array.from({ length: 30 }, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `Sestra${idx + 1}`,
          occupation: 'nurse',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
      ...Array.from({ length: 30 }, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `RTGAsistent${idx + 1}`,
          occupation: 'nurse',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
    ]

    await db.user.createMany({ data: users })
    console.info('Seed data inserted successfully!', users.length)
  } catch (error) {
    console.error(error)
  }
}
