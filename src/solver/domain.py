from dataclasses import dataclass, field
from typing import Annotated, List, Optional
from datetime import date, datetime
from uuid import UUID, uuid4
from timefold.solver.domain import (
    planning_entity,
    planning_solution,
    PlanningId,
    PlanningVariable,
    PlanningScore,
    PlanningEntityCollectionProperty,
    ProblemFactCollectionProperty,
    ValueRangeProvider
)
from timefold.solver.score import HardMediumSoftScore

from src.solver.enums import *


# Problem Facts
@dataclass
class ShiftDatetype:
    date: date
    type: ShiftType

    @property
    def start_datetime(self) -> datetime:
        return datetime.combine(self.date, self.type[0])

    @property
    def end_datetime(self) -> datetime:
        return datetime.combine(self.date, self.type[1])

    def __sub__(self, other) -> float:
        if self.date < other.date:
            fst_end = self.end_datetime
            snd_start = other.start_datetime
        elif other.date > self.date:
            fst_end = other.end_datetime
            snd_start = self.start_datetime
        else: return float("inf")
        return (snd_start - fst_end).total_seconds() / 3600


@dataclass
class ShiftDetails:
    id: Annotated[UUID, PlanningId] = field(
        default_factory=uuid4,
        init=False
    )
    datetype: ShiftDatetype
    department: Department
    amount: int
    qualification: Optional[Qualifications]


@dataclass
class Employee:
    name: Annotated[str, PlanningId]
    department_preference: dict[Department, float]
    shift_availability: dict[ShiftDatetype, Availability]


@dataclass
class Doctor(Employee):
    stem: Stems
    atestation: Optional[Atestations]
    qualifications: Optional[Qualifications]


# Planning Entity
@planning_entity
@dataclass
class ShiftAssignment:
    id: Annotated[UUID, PlanningId] = field(
        default_factory=uuid4,
        init=False
    )
    shift: ShiftDetails
    employee: Annotated[Employee | None, PlanningVariable] = field(default=None)


# Planning Solution
@planning_solution
@dataclass
class ShiftsSolution:
    shifts: Annotated[List[ShiftDetails], PlanningEntityCollectionProperty] = field(default_factory=list)
    employees: Annotated[List[Employee], ProblemFactCollectionProperty, ValueRangeProvider] = field(default_factory=list)
    availabilities: Annotated[List[Availability], ProblemFactCollectionProperty, ValueRangeProvider] = field(default_factory=list)
    planning_score: Annotated[HardMediumSoftScore, PlanningScore] = field(default=None)
