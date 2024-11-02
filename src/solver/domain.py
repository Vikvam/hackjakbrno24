from dataclasses import dataclass, field
from typing import Annotated, List, Optional
from datetime import date, datetime, timedelta
from uuid import UUID, uuid4
from pydantic import BaseModel
from timefold.solver.domain import (
    planning_entity,
    planning_solution,
    PlanningId,
    PlanningVariable,
    PlanningScore,
    PlanningEntityCollectionProperty,
    ProblemFactCollectionProperty,
    ValueRangeProvider,
)
from timefold.solver.score import HardMediumSoftScore


from enums import *


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
        else:
            return float("inf")
        return (snd_start - fst_end).total_seconds() / 3600

    def __hash__(self):
        return hash((self.date, self.type))

    def __eq__(self, other):
        if not isinstance(other, ShiftDatetype):
            return NotImplemented
        return self.date == other.date and self.type == other.type


@dataclass(frozen=True)
class Shift:
    id: Annotated[UUID, PlanningId] = field(default_factory=uuid4, init=False)
    datetype: ShiftDatetype
    department: Department
    amount: int
    qualification: Optional[Qualifications]

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


class ShiftModel(BaseModel):
    datetype: tuple[date, str]
    department: str
    amount: int
    qualification: Optional[str]

    def to_dataclass(self) -> Shift:
        return Shift(
            datetype=ShiftDatetype(self.datetype[0], ShiftType.get(self.datetype[1])),
            department=self.department,
            amount=self.amount,
            qualification=self.qualification,
        )


@dataclass(frozen=True)
class Employee:
    name: Annotated[str, PlanningId]
    department_preference: dict[Department, float]
    shift_availability: dict[ShiftDatetype, Availability]

    def __str__(self):
        return self.name


@dataclass(frozen=True)
class Doctor(Employee):
    stem: Optional[Stems]
    atestation: Optional[Atestations]
    qualifications: Optional[Qualifications]


class DoctorModel(BaseModel):
    name: str
    department_preference: list[tuple[str, float]]  # ex. [("RTG", 0.7), ("CT", 0.3)]
    shift_availability: list[tuple[date, str, str]]  # ex. ("2024-11-11", "MORNING", "AVAILABLE")
    stem: Optional[str]
    atestation: Optional[str]
    qualifications: Optional[str]

    def to_dataclass(self) -> Doctor:
        return Doctor(
            name=self.name,
            department_preference={dep: prob for (dep, prob) in self.department_preference},
            shift_availability={ShiftDatetype(t[0], t[1]): t[2] for t in self.shift_availability},
            stem=self.stem,
            atestation=self.atestation,
            qualifications=self.qualifications,
        )


# Planning Entity
@planning_entity
@dataclass
class ShiftAssignment:
    id: Annotated[UUID, PlanningId] = field(default_factory=uuid4, init=False)
    shift: Shift
    employee: Annotated[Employee | None, PlanningVariable] = field(default=None)

    def __str__(self):
        return f"<{self.id}, {self.employee}, {self.shift}>"


# Planning Solution
@planning_solution
@dataclass
class ShiftsSchedule:
    # Problem facts
    employees: Annotated[List[Employee], ProblemFactCollectionProperty, ValueRangeProvider] = field(
        default_factory=list
    )

    shifts: Annotated[List[Shift], ProblemFactCollectionProperty] = field(default_factory=list)

    # Planning entities
    shift_assignments: Annotated[List[ShiftAssignment], PlanningEntityCollectionProperty] = field(default_factory=list)

    # Score
    score: Annotated[HardMediumSoftScore, PlanningScore] = field(default=None)

    def __str__(self) -> str:
        return (
            f"ShiftSchedule(assignments={len(self.shift_assignments)}, "
            f"employees={len(self.employees)}, "
            f"shifts={len(self.shifts)}, "
            f"score={self.score})"
        )


class ShiftsScheduleModel(BaseModel):
    employees: List[DoctorModel]
    shifts: List[ShiftModel]

    def to_dataclass(self) -> ShiftsSchedule:
        return ShiftsSchedule(
            employees=[emp.to_dataclass() for emp in self.employees],
            shifts=[shift.to_dataclass() for shift in self.shifts],
            shift_assignments=[ShiftAssignment(shift) for shift in self.shifts for _ in range(shift.amount)],
        )
