from dataclasses import dataclass, field
from typing import Annotated, List, Optional
from datetime import date, datetime, timedelta
from uuid import UUID, uuid4
from timefold.solver.domain import (
    planning_entity,
    planning_solution,
    PlanningPin,
    PlanningId,
    PlanningVariable,
    PlanningScore,
    PlanningEntityCollectionProperty,
    ProblemFactCollectionProperty,
    ValueRangeProvider,
)
from timefold.solver.score import HardMediumSoftScore

from src.solver.src.enums import *


# Problem Facts
@dataclass(frozen=True)
class ShiftDatetype:
    date: date
    type: ShiftType

    @property
    def start_datetime(self) -> datetime:
        return datetime.combine(self.date, self.type.value[0])

    @property
    def end_datetime(self) -> datetime:
        date = self.date
        if self.type.is_overnight:
            date += timedelta(days=1)
        return datetime.combine(date, self.type.value[1])

    def __str__(self):
        return "<" + str(self.start_datetime) + " to " + str(self.end_datetime) + ">"

    def __sub__(self, other) -> float:
        if self.date < other.date:
            fst_end = self.end_datetime
            snd_start = other.start_datetime
        elif other.date > self.date:
            fst_end = other.end_datetime
            snd_start = self.start_datetime
        else: return float("inf")
        return (snd_start - fst_end).total_seconds() / 3600

    def __hash__(self):
        return hash((self.date, self.type))

    def __eq__(self, other):
        if not isinstance(other, ShiftDatetype):
            return NotImplemented
        return self.date == other.date and self.type == other.type


@dataclass(frozen=True)
class Shift:
    id: Annotated[UUID, PlanningId] = field(
        default_factory=uuid4,
        init=False
    )
    datetype: ShiftDatetype
    department: Departments
    amount: int
    qualification: Optional[Qualifications] = field(default=None)

    @property
    def date(self) -> date:
        return self.datetype.date

    @property
    def type(self) -> ShiftType:
        return self.datetype.type

    @property
    def start_datetime(self) -> datetime:
        return self.datetype.start_datetime

    @property
    def end_datetime(self) -> datetime:
        return self.datetype.end_datetime

    def __repr__(self):
        return "<" + str(self.datetype) + ">"

    def __sub__(self, other):
        return self.date - other.date


@dataclass(frozen=True)
class Employee:
    name: Annotated[str, PlanningId]
    department_preference: dict[Departments, float]
    shift_amounts: dict[ShiftType, int]
    shift_availability: dict[ShiftDatetype, Availability]

    def __str__(self):
        return self.name


@dataclass(frozen=True)
class Doctor(Employee):
    stem: Optional[Trunks]
    specialization: Optional[Specialization]
    qualification: Qualifications


# Planning Entity
@planning_entity
@dataclass
class ShiftAssignment:
    id: Annotated[UUID, PlanningId] = field(
        default_factory=uuid4,
        init=False
    )
    shift: Shift
    employee: Annotated[Employee, PlanningVariable] = field(default=None)
    pinned: Annotated[bool, PlanningPin] = field(default=False)

    def __str__(self):
        return f"<{self.id}, {self.employee}, {self.shift}>"

    def __repr__(self):
        return f"<{self.id}, {self.employee}, {self.shift}>"


# Planning Solution
@planning_solution
@dataclass
class ShiftsSchedule:
    # Problem facts
    employees: Annotated[
        List[Employee],
        ProblemFactCollectionProperty,
        ValueRangeProvider
    ] = field(default_factory=list)

    shifts: Annotated[
        List[Shift],
        ProblemFactCollectionProperty,
        ValueRangeProvider
    ] = field(default_factory=list)

    # Planning entities
    shift_assignments: Annotated[
        List[ShiftAssignment],
        PlanningEntityCollectionProperty
    ] = field(default_factory=list)

    # Score
    score: Annotated[
        HardMediumSoftScore,
        PlanningScore
    ] = field(default=None)

    def __str__(self) -> str:
        return (
            f"ShiftSchedule(assignments={len(self.shift_assignments)}, "
            f"employees={len(self.employees)}, "
            f"shifts={len(self.shifts)}, "
            f"score={self.score})"
        )

    def __repr__(self) -> str:
        return (
            f"ShiftSchedule(assignments={len(self.shift_assignments)}, "
            f"employees={len(self.employees)}, "
            f"shifts={len(self.shifts)}, "
            f"score={self.score})"
        )
