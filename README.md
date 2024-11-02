# hackjakbrno 2024

## solver

- Problem facts:
  - Enum[Qualifications] - NONE, STEM, ATESTATION
  - Enum[ShiftType] - MORNING, AFTERNOON, NIGHT
  - Employee (name, list[qualifications], dict[ShiftType, shift_amount])
  - Availability (employee, date, type)
  - Shift (date, type, qualification)
- Planning entities:
  - ShiftAssignment (shift, employee)


- Department (dict[ShiftType, shift_amount])


- Bez kmene - nemuze 
- Po kmeni - musi mit kontrola
- Atestace - samostatni
