import {db} from 'api/src/lib/db'

// Manually apply seeds via the `yarn rw prisma db seed` command.
//
// Seeds automatically run the first time you run the `yarn rw prisma migrate dev`
// command and every time you run the `yarn rw prisma migrate reset` command.
//
// See https://redwoodjs.com/docs/database-seeds for more info

const SHIFTS = [
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 3,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L3"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "RTG",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 2,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 2,
    "qualification": "L3"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L2"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "9-17:00",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 1,
    "qualification": "L2"
  },
  {
    "type": "Noční 12",
    "employeeType": "Doctor",
    "department": "CT",
    "amount": 0,
    "qualification": "L3"
  },
  {
    "type": "Ranní",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Assistant",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Nurse",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Nurse",
    "department": "CT",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Nurse",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Nurse",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 3,
    "qualification": "L1"
  },
  {
    "type": "Odpo",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 2,
    "qualification": "L1"
  },
  {
    "type": "Noční",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Ranní 12",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  },
  {
    "type": "Noční 12",
    "employeeType": "Assistant",
    "department": "RTG",
    "amount": 1,
    "qualification": "L1"
  }
]

const names = ["Jan Novák", "Petr Svoboda", "Jiří Dvořák", "Pavel Černý", "Martin Procházka", "Tomáš Kučera", "Josef Veselý", "Miroslav Král", "Jaroslav Němec", "František Marek", "Václav Pospíšil", "Karel Hájek", "Milan Jelínek", "David Kříž", "Michal Beneš", "Zdeněk Malý", "Jakub Urban", "Ondřej Sedláček", "Roman Bartoš", "Ladislav Holub", "Stanislav Kovář", "Vladimír Polák", "Lukáš Doležal", "Vojtěch Šimek", "Daniel Kopecký", "Aleš Čermák", "Radek Bláha", "Antonín Vlček", "Marek Kolář", "Filip Navrátil", "Dominik Šťastný", "Patrik Horák", "Rudolf Pokorný", "Oldřich Mareš", "Lubomír Růžička", "Vlastimil Fiala", "Radim Sedlák", "Štěpán Krejčí", "Ivan Tichý", "Richard Moravec", "Bohumil Štěpánek", "Viktor Havlík", "Adam Šimůnek", "Kamil Hrubý", "Dalibor Mašek", "Vít Soukup", "Luděk Zeman", "Bohuslav Vaněk", "Robert Matoušek", "Miloš Říha", "Jaromír Bureš", "Libor Pavlík", "Luboš Dušek", "Rostislav Šindelář", "Dušan Kafka", "Jindřich Vacek", "Přemysl Beran", "Arnošt Krása", "Vítězslav Kubík", "Radovan Strnad", "Zbyněk Hruška", "Eduard Liška", "Vratislav Musil", "Otakar Švarc", "Ivo Toman", "Erik Sýkora", "Bedřich Šíma", "Vilém Jaroš", "Hynek Švec", "Svatopluk Kadlec", "Břetislav Žák", "Čestmír Bárta", "Mikuláš Vítek", "Radomír Slavík", "Šimon Horáček", "Evžen Kratochvíl", "Alexej Kouba", "Bronislav Žižka", "Ctirad Šebek", "Denis Pešek", "Hubert Havel", "Igor Janda", "Jáchym Janků", "Kristián Hroch", "Leopold Šrámek", "Leoš Pánek", "Marcel Hladík", "Matěj Kozel", "Maxmilián Špaček", "Oliver Beránek", "Oskar Kovařík", "Pravoslav Hrůza", "René Šafařík", "Roland Kašpar", "Samuel Mach", "Tadeáš Suchý", "Teodor Vácha", "Tibor Vávra", "Timotej Richter", "Vincent Hrdina", "Vojtěch Šulc"]
export default async () => {
  try {
    const users = [
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.round(Math.random() * 100) / 100
        const qualification = ['L1', 'L2', 'L3'][Math.floor(Math.random() * 3)]
        const stem = ['RTG', ''][Math.floor(Math.random() * 3)]
        return {
          name: names[Math.floor(Math.random() * names.length)],
          occupation: 'doctor',
          qualification: qualification,
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
          stem: stem,
          attestation: stem ? ['', 'RTG'][Math.floor(Math.random() * 2)] : '',
        }
      }),
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `Sestra${idx + 1}`,
          occupation: 'nurse',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
      ...Array.from({length: 30}, (_, idx) => {
        const rtg_preference = Math.random()
        return {
          name: `RTGAsistent${idx + 1}`,
          occupation: 'rtgAssistant',
          rtg_preference: rtg_preference,
          ct_preference: 1 - rtg_preference,
        }
      }),
    ]

    await db.user.createMany({data: users})

    const createdShifts = await db.shift.createMany({
      data: SHIFTS
    })

    console.info('Seed data inserted successfully!', users.length)
  } catch (error) {
    console.error(error)
  }
}
