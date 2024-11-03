import calendar
import random
from collections import defaultdict

from src.solver.src.domain import *


def create_shiftdatetype(
        date_obj: date = None,
        shift_type: ShiftType = ShiftType.OVERNIGHT
        ) -> ShiftDatetype:
    return ShiftDatetype(
        date=date_obj if date_obj else date(2024, 11, 1),
        type=shift_type,
    )


def create_shift(
        date_obj: date = None,
        shift_type: ShiftType = ShiftType.OVERNIGHT,
        datetype: ShiftDatetype = None,
        department: Departments = Departments.RTG,
        amount: int = 1,
        qualification: Optional[Qualifications] = Qualifications.L3
        ) -> Shift:
    if not datetype:
        datetype = create_shiftdatetype(date_obj if date_obj else date(2024, 11, 1), shift_type)
    return Shift(
        datetype=datetype,
        department=department,
        amount=amount,
        qualification=qualification
    )


def create_employee(
        name: str = "Emp",
        department_preference: dict[Departments, float] | None = None,
        shift_amounts: dict[ShiftType, int] | None = None,
        shift_availability: dict[ShiftDatetype, Availability] | None = None
        ) -> Employee:
    return Employee(
        name=name,
        department_preference=department_preference if department_preference else {department: 1 / len(Departments) for department in Departments},
        shift_amounts=defaultdict(lambda: 1, shift_amounts or {}),
        shift_availability=defaultdict(lambda: Availability.NEUTRAL, shift_availability or {})
    )


def create_doctor(
        name: str = "Doc",
        department_preference: dict[Departments, float] | None = None,
        shift_amounts: dict[ShiftType, int] | None = None,
        shift_availability: dict[ShiftDatetype, Availability] | None = None,
        stem: Optional[Trunks] = Trunks.RTG,
        specialization: Optional[Specialization] = Specialization.RTG,
        qualification: Qualifications = Qualifications.L3,
        ) -> Doctor:
    return Doctor(
        name=name,
        department_preference=department_preference if department_preference else {department: 1 / len(Departments) for department in Departments},
        shift_amounts=defaultdict(lambda: 1, shift_amounts or {}),
        shift_availability=defaultdict(lambda: Availability.NEUTRAL, shift_availability or {}),
        stem=stem,
        specialization=specialization,
        qualification=qualification
    )


def problem_mock(year=2024, month=11, weekend_assignments: tuple[ShiftAssignment] = (), type="monthly", seed=None):
    if seed is not None: random.seed(seed)

    doctor_shifts, nurse_shifts, rtg_assistant_shifts = [], [], []
    doctor_datetypes, nurse_datetypes, rtg_assistant_datetypes = [], [], []
    for date in calendar.Calendar().itermonthdates(year, month):
        if date.month != month: continue
        if date.weekday() > 4 and type == "monthly":
            doctor_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1, Qualifications.L2),
            ])
            doctor_datetypes.extend([ShiftDatetype(date, ShiftType.MORNING_12), ShiftDatetype(date, ShiftType.EVENING_12)])
            nurse_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
            nurse_datetypes.extend([ShiftDatetype(date, ShiftType.MORNING_12), ShiftDatetype(date, ShiftType.EVENING_12)])
            rtg_assistant_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
            rtg_assistant_datetypes.extend([ShiftDatetype(date, ShiftType.MORNING_12), ShiftDatetype(date, ShiftType.EVENING_12)])
        elif type == "weekly" and date.isocalendar()[1]:
            doctor_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 1, Qualifications.L3),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 3, None),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 2, None),
            ])
            doctor_datetypes.extend([
                ShiftDatetype(date, ShiftType.MORNING),
                ShiftDatetype(date, ShiftType.AFTERNOON),
                ShiftDatetype(date, ShiftType.OVERNIGHT)
            ])
            nurse_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
            nurse_datetypes.extend([
                ShiftDatetype(date, ShiftType.MORNING_12),
                ShiftDatetype(date, ShiftType.EVENING_12)
            ])
            rtg_assistant_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 3),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.CT, 2),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.CT, 1),
            ])
            rtg_assistant_datetypes.extend([
                ShiftDatetype(date, ShiftType.MORNING),
                ShiftDatetype(date, ShiftType.AFTERNOON),
                ShiftDatetype(date, ShiftType.OVERNIGHT)
            ])

    doctors, nurses, rtg_assistants = [], [], []
    for d in range(30):
        rtg_preference = random.random() * 100 // 100
        ct_preference = 1 - rtg_preference
        qualification = random.choice([i for i in Qualifications])
        doctors.append(
            create_doctor(
                f"Doctor {d}",
                {Departments.RTG: rtg_preference, Departments.CT: ct_preference},
                shift_amounts={
                    ShiftType.MORNING: 10,
                    ShiftType.AFTERNOON: 10,
                    ShiftType.OVERNIGHT: random.choice((2, 3)),
                    ShiftType.MORNING_12: random.choice((0, 2, 4)),
                    ShiftType.EVENING_12: random.choice((0, 2, 2)),
                },
                shift_availability={
                    **{datetype: Availability.random() for datetype in doctor_datetypes},
                    **{datetype: Availability.IMPOSSIBLE for datetype in nurse_datetypes},
                    **{datetype: Availability.IMPOSSIBLE for datetype in rtg_assistant_datetypes},
                },
                stem=random.choice([i for i in Trunks]) if qualification > Qualifications.L1 else None,
                specialization=random.choice([i for i in Trunks]) if qualification > Qualifications.L2 else None,
                qualification=qualification,
            )
        )
    for n in range(30):
        rtg_preference = random.random() * 100 // 100
        ct_preference = 1 - rtg_preference
        nurses.append(
            create_employee(
                f"Nurse {n}",
                {Departments.RTG: rtg_preference, Departments.CT: ct_preference},
                shift_amounts={
                    ShiftType.MORNING_12: random.choice((0, 2, 4)),
                    ShiftType.EVENING_12: random.choice((0, 2, 2)),
                },
                shift_availability={
                    **{datetype: Availability.IMPOSSIBLE for datetype in doctor_datetypes},
                    **{datetype: Availability.random() for datetype in nurse_datetypes},
                    **{datetype: Availability.IMPOSSIBLE for datetype in rtg_assistant_datetypes},
                },
            )
        )
    for r in range(15):
        rtg_preference = random.random() * 100 // 100
        ct_preference = 1 - rtg_preference
        rtg_assistants.append(
            create_employee(
                f"RTG Assistant {r}",
                {Departments.RTG: rtg_preference, Departments.CT: ct_preference},
                shift_amounts={
                    ShiftType.MORNING: 10,
                    ShiftType.AFTERNOON: 10,
                    ShiftType.OVERNIGHT: random.choice((2, 3)),
                    ShiftType.MORNING_12: random.choice((0, 2, 4)),
                    ShiftType.EVENING_12: random.choice((0, 2, 2)),
                },
                shift_availability={
                    **{datetype: Availability.IMPOSSIBLE for datetype in doctor_datetypes},
                    **{datetype: Availability.IMPOSSIBLE for datetype in nurse_datetypes},
                    **{datetype: Availability.random() for datetype in rtg_assistant_datetypes},
                },
            )
        )

    assignments = [i for i in weekend_assignments]
    for shifts, employees in ((doctor_shifts, doctors), (nurse_shifts, nurses), (rtg_assistant_shifts, rtg_assistants)):
        assignments.extend([
            ShiftAssignment(shift, employees[i % len(employees)])
            for i, shift in enumerate(shifts)
            for _ in range(shift.amount)
        ])

    return doctors + nurses + rtg_assistants, doctor_shifts + nurse_shifts + rtg_assistant_shifts, assignments
