import calendar
from datetime import date
from timefold.solver import (
    SolverFactory,
    SolutionManager,
    Solver
)
from timefold.solver.config import SolverConfig, ScoreDirectorFactoryConfig, TerminationConfig, Duration

from src.solver.domain import *
from src.solver.enums import *
from src.solver.solution import *


if __name__ == "__main__":
    YEAR = 2024
    MONTH = 11

    doctor_shifts = []
    shift_availabilities = {}
    for date in calendar.Calendar().itermonthdates(YEAR, MONTH):
        if date.month != MONTH: continue
        if date.weekday() > 4:
            doctor_shifts.extend([
                ShiftDetails(ShiftDatetype(date, ShiftType.WEEKEND_MORNING), Department.RTG, 1, Qualifications.L2),
                ShiftDetails(ShiftDatetype(date, ShiftType.WEEKEND_EVENING), Department.RTG, 1, Qualifications.L2),
            ])
            for shift_type in ShiftType.weekendrange():
                shift_availabilities[ShiftDatetype(date, shift_type)] = None
        else:
            doctor_shifts.extend([
                ShiftDetails(ShiftDatetype(date, ShiftType.MORNING), Department.RTG, 1, Qualifications.L3),
                ShiftDetails(ShiftDatetype(date, ShiftType.MORNING), Department.RTG, 1, Qualifications.L2),
                ShiftDetails(ShiftDatetype(date, ShiftType.AFTERNOON), Department.RTG, 1, Qualifications.L2),
                ShiftDetails(ShiftDatetype(date, ShiftType.OVERNIGHT), Department.RTG, 1, Qualifications.L2),
                ShiftDetails(ShiftDatetype(date, ShiftType.MORNING), Department.RTG, 3, None),
                ShiftDetails(ShiftDatetype(date, ShiftType.AFTERNOON), Department.RTG, 2, None),
            ])
            for shift_type in ShiftType.weekdayrange():
                shift_availabilities[ShiftDatetype(date, shift_type)] = None

    doctor_assignments = [ShiftAssignment(shift) for shift in doctor_shifts for _ in range(shift.amount)]

    doctors = [
        Doctor(
            f"Doc{i}",
            {Department.RTG: .5, Department.CT: .5},
            {datetype: Availability.random() for datetype in shift_availabilities},
            Qualifications.L3,
        ) for i in range(5)
    ]
