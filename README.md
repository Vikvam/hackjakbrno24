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

# src/frontend

Jak pustit development server:

```console
cd src/frontend
yarn install
yarn redwood dev
```

Jak updateovat database schema:

```console
yarn rw prisma migrate dev
```

# solver

Jak nastavit python env:

```console
cd src/solver
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Jak spustit fast api:

```console
python solver_api.py
```