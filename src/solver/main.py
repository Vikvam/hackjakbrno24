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
    p
    for date in calendar.Calendar().itermonthdates(YEAR, MONTH):
        if date.month != MONTH: continue
        if date.weekday() > 4:
            doctor_shifts.extend([
                ShiftDetails(date, ShiftType.WEEKEND_MORNING, Department.RTG, 1, Qualifications.STEM),
                ShiftDetails(date, ShiftType.WEEKEND_EVENING, Department.RTG, 1, Qualifications.STEM),
            ])
        else:
            doctor_shifts.extend([
                ShiftDetails(date, ShiftType.MORNING, Department.RTG, 1, Qualifications.CERTIFIED),
                ShiftDetails(date, ShiftType.MORNING, Department.RTG, 1, Qualifications.STEM),
                ShiftDetails(date, ShiftType.AFTERNOON, Department.RTG, 1, Qualifications.STEM),
                ShiftDetails(date, ShiftType.OVERNIGHT, Department.RTG, 1, Qualifications.STEM),
                ShiftDetails(date, ShiftType.MORNING, Department.RTG, 3, None),
                ShiftDetails(date, ShiftType.AFTERNOON, Department.RTG, 2, None),
            ])

    doctor_assignments = [ShiftAssignment(shift) for shift in doctor_shifts for _ in range(shift.amount)]

    doctors = [
        Doctor(
            f"Doc{i}",
            {Department.RTG: .5, Department.CT: .5},
            Qualifications.CERTIFIED,
            {}
        ) for i in range(5)
    ]
