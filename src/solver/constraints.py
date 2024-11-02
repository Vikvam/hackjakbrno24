from enum import Enum
from dataclasses import dataclass
from datetime import date, timedelta
from timefold.solver.score import (
    Constraint,
    ConstraintFactory,
    constraint_provider,
    Joiners
)
from timefold.solver.score import ConstraintCollectors

from src.solver.domain import *
from src.solver.constraint_config import *
from src.solver.enums import *


@constraint_provider
def define_constraints(constraint_factory: ConstraintFactory) -> list[Constraint]:
    return [
        one_shift_per_day(constraint_factory),
        at_least_12h_rest(constraint_factory),
        # at_least_36h_weekly(constraint_factory),
        # older_employee(constraint_factory),
        # max_shift_amount(constraint_factory),
        # standard_shift_amount(constraint_factory),
        # weekend_shift_amount(constraint_factory),
        # fair_shift_amount(constraint_factory),
        # fair_shift_type(constraint_factory),
        # unavailable_employee(constraint_factory),
        # undesired_by_employee(constraint_factory),
        # preferred_by_employee(constraint_factory),
        # desired_by_employee(constraint_factory)
    ]


def all_shifts_assigned(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.equal(lambda a: a.shift.date))
        .penalize(ShiftConstraintConfiguration.one_shift_per_day)
        .as_constraint("one_shift_per_day")
    )


def one_shift_per_day(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.equal(lambda a: a.shift.date))
        .penalize(ShiftConstraintConfiguration.one_shift_per_day)
        .as_constraint("one_shift_per_day")
    )


def at_least_12h_rest(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.less_than_or_equal(lambda a: a.shift.date))
        .filter(lambda a1, a2: (a1.shift - a2.shift) < timedelta(hours=12))
        .penalize(ShiftConstraintConfiguration.at_least_1_day_between_shifts)
        .as_constraint("at_least_12h_rest")
    )


# def at_least_36h_weekly(constraint_factory: ConstraintFactory) -> Constraint:
#     def has_36h_continuous_rest(shifts: List[Shift]) -> bool:
#         if not shifts: return True
#
#         shifts = sorted(shifts, key=lambda x: datetime.combine(x.date, x.type.start_time))
#
#         # TODO: adjust for interval edges
#
#         for i in range(len(shifts) - 1):
#             if shifts[i] - shifts[i+1] >= 36:
#                 return True
#
#         return False
#
#     return (
#         constraint_factory
#         .for_each(ShiftAssignment)
#         .group_by(
#             lambda employee, _: employee,
#             lambda _, shift: shift.date.isocalendar()[1],
#             ConstraintCollectors.to_list(lambda _, shift: shift)
#         )
#         .filter(lambda employee, week, shifts: not has_36h_continuous_rest(shifts))
#         .penalize(ShiftConstraintConfiguration.at_least_1_day_between_shifts)
#         .as_constraint("at_least_12h_rest")
#     )
