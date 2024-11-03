import calendar
from collections import defaultdict
import random
import sys
from datetime import date

from src.solver.src.domain import *
from src.solver.src.enums import *
from src.solver.src.solution import *


def doctors_mock(YEAR = 2024, MONTH = 11):
    doctor_shifts, nurse_shifts, rtg_assistant_shifts = [], [], []

    for date in calendar.Calendar().itermonthdates(YEAR, MONTH):
        if date.month != MONTH: continue
        if date.weekday() > 4:
            doctor_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1, Qualifications.L2),
            ])
            nurse_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
            rtg_assistant_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
        else:
            doctor_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 1, Qualifications.L3),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.RTG, 1, Qualifications.L2),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 3, None),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 2, None),
            ])
            nurse_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING_12), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.EVENING_12), Departments.CT, 1),
            ])
            rtg_assistant_shifts.extend([
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.RTG, 3),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.RTG, 2),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.RTG, 1),
                Shift(ShiftDatetype(date, ShiftType.MORNING), Departments.CT, 2),
                Shift(ShiftDatetype(date, ShiftType.AFTERNOON), Departments.CT, 1),
                Shift(ShiftDatetype(date, ShiftType.OVERNIGHT), Departments.CT, 1),
            ])

    doctors = [
        Doctor(
            f"Doc{i}",
            {Departments.RTG: 3, Departments.CT: 3},
            {shift_type: 1 for shift_type in ShiftType},
            {datetype: Availability.random() for datetype in doctor_availabilities},
            Qualifications.L3,
            None,
            None
        ) for i in range(15)
    ]

    doctor_assignments = [ShiftAssignment(shift, doctors[i % len(doctors)]) for i, shift in enumerate(doctor_shifts) for _ in range(shift.amount)]

    return doctors, doctor_shifts, doctor_assignments


if __name__ == "__main__":
    random.seed(42)
    YEAR = 2024
    MONTH = 11

    doctors, doctor_shifts, doctor_assignments = doctors_mock()

    problem = ShiftsSchedule(doctors, doctor_shifts, doctor_assignments)

    print(f"Solving... {datetime.now()}")
    solution, score_analysis = solve(problem)

    print(solution)
    print(score_analysis.summary)
