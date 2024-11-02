from enum import Enum
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from timefold.solver.score import (
    Constraint,
    ConstraintFactory,
    constraint_provider,
    Joiners
)
from timefold.solver.score import ConstraintCollectors

from src.solver.domain import *
from src.solver.constraint_config import *


@constraint_provider
def define_constraints(constraint_factory: ConstraintFactory) -> list[Constraint]:
    return [
        no_overlapping_shifts(constraint_factory),
        at_least_12h_rest(constraint_factory),
        at_least_36h_rest_weekly(constraint_factory),
        # over_required_shift_amount(constraint_factory),
        # under_required_shift_amount(constraint_factory),
        # standard_shift_amount(constraint_factory),
        # weekend_shift_amount(constraint_factory),
        # fair_shift_amount(constraint_factory),
        # fair_shift_type(constraint_factory),
        # unavailable_employee(constraint_factory),
        # undesired_by_employee(constraint_factory),
        # preferred_by_employee(constraint_factory),
        # desired_by_employee(constraint_factory)
    ]


def no_overlapping_shifts(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda assignment: assignment.employee),
            Joiners.overlapping(
                lambda assignment: assignment.shift.start_datetime,
                lambda assignment: assignment.shift.end_datetime
            )
        )
        .penalize(ShiftConstraintConfiguration.is_illegal)
        .as_constraint("no_overlaping_shifts")
    )


def at_least_12h_rest(constraint_factory: ConstraintFactory) -> Constraint:
    def has_not_12h_rest(assignment1, assignment2) -> bool:
        return (assignment1.shift - assignment2.shift) < timedelta(hours=12)

    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .join(ShiftAssignment,
            Joiners.equal(lambda assignment: assignment.employee),
            Joiners.greater_than(lambda assignment: assignment.shift.start_datetime.timestamp()))
        .filter(has_not_12h_rest)
        .penalize(ShiftConstraintConfiguration.is_illegal)
        .as_constraint("at_least_12h_rest")
    )


def at_least_36h_rest_weekly(constraint_factory: ConstraintFactory) -> Constraint:
    def has_36h_continuous_rest(assignments) -> bool:
        if len(assignments) == 0:
            return True

        shifts = sorted(map(lambda assignment: assignment.shift, assignments), key=lambda shift: (shift.start_datetime, shift.end_datetime))

        start_of_week = shifts[0].start_datetime - timedelta(
            days=shifts[0].start_datetime.weekday(),
            hours=shifts[0].start_datetime.hour,
            minutes=shifts[0].start_datetime.minute
        )
        if shifts[0].start_datetime - start_of_week >= timedelta(hours=36):
            return True

        end_of_week = start_of_week + timedelta(days=7)
        if end_of_week - shifts[-1].start_datetime >= timedelta(hours=36):
            return True

        for i in range(len(shifts) - 1):
            if shifts[i] - shifts[i+1] >= timedelta(36):
                return True

        return False

    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .group_by(
            lambda assignment: assignment.employee,
            lambda assignment: assignment.shift.datetype.date.isocalendar()[1],
            ConstraintCollectors.to_list()
        )
        .filter(lambda employee, week, assignments: not has_36h_continuous_rest(assignments))
        .penalize(ShiftConstraintConfiguration.is_illegal)
        .as_constraint("at_least_36h_rest_weekly")
    )


def over_required_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .group_by(
            lambda assignment: assignment.employee,
            lambda assignment: assignment.shift.datetype.type,
            ConstraintCollectors.count()
        )
        .filter(lambda employee, shift_type, count: count > employee.shift_amounts[shift_type])
        .penalize(
            ShiftConstraintConfiguration.over_required_shift_amount,
            lambda employee, shift_type, count: count
        )
        .as_constraint("at_least_36h_rest_weekly")
    )


def under_required_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    ...
