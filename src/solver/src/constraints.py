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

from src.solver.src.domain import *
from src.solver.src.constraint_config import *


@constraint_provider
def define_constraints(constraint_factory: ConstraintFactory) -> list[Constraint]:
    return [
        no_overlapping_shifts(constraint_factory),
        at_least_12h_rest(constraint_factory),
        at_least_36h_rest_weekly(constraint_factory),
        has_qualification(constraint_factory),
        over_required_shift_amount(constraint_factory),
        under_required_shift_amount(constraint_factory),
        availability_impossible(constraint_factory),
        availability_necessary(constraint_factory),
        availability_undesired(constraint_factory),
        availability_desired(constraint_factory),
        department_desired(constraint_factory)
    ]


def no_overlapping_shifts(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            # Join on overlapping time periods
            Joiners.overlapping(
                lambda a: a.shift.start_datetime,
                lambda a: a.shift.end_datetime
            )
        )
        .penalize(ShiftConstraintConfiguration.is_illegal)
        .as_constraint("no_overlapping_shifts")
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


def has_qualification(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .filter(lambda assignment: assignment.shift.qualification is not None)
        .filter(lambda assignment: isinstance(assignment.employee, Doctor) and assignment.employee.qualification < assignment.shift.qualification)
        .penalize(ShiftConstraintConfiguration.has_qualification)
        .as_constraint("has_qualification")
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
        .as_constraint("over_required_shift_amount")
    )


def under_required_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .group_by(
            lambda assignment: assignment.employee,
            lambda assignment: assignment.shift.datetype.type,
            ConstraintCollectors.count()
        )
        .filter(lambda employee, shift_type, count: count < employee.shift_amounts[shift_type])
        .penalize(
            ShiftConstraintConfiguration.over_required_shift_amount,
            lambda employee, shift_type, count: employee.shift_amounts[shift_type] - count
        )
        .as_constraint("under_required_shift_amount")
    )


def availability_impossible(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .filter(lambda assignment: assignment.employee.shift_availability[assignment.shift.datetype] == Availability.IMPOSSIBLE)
        .penalize(ShiftConstraintConfiguration.availability_impossible)
        .as_constraint("availability_impossible")
    )


def availability_necessary(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .filter(lambda assignment: assignment.employee.shift_availability[assignment.shift.datetype] == Availability.NECESSARY)
        .penalize(ShiftConstraintConfiguration.availability_necessary)
        .as_constraint("availability_necessary")
    )


def availability_undesired(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .filter(lambda assignment: assignment.employee.shift_availability[assignment.shift.datetype] == Availability.UNDESIRED)
        .penalize(ShiftConstraintConfiguration.availability_undesired)
        .as_constraint("availability_undesired")
    )


def availability_desired(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .filter(lambda assignment: assignment.employee.shift_availability[assignment.shift.datetype] == Availability.DESIRED)
        .penalize(ShiftConstraintConfiguration.availability_desired)
        .as_constraint("availability_desired")
    )


def department_desired(constraint_factory: ConstraintFactory) -> Constraint:
    def in_tolerance(employee, assignments) -> bool:
        counts = {department: 0 for department in employee.department_preference.keys()}
        for assignment in assignments:
            counts[assignment.shift.department] += 1
        for department in employee.department_preference.keys():
            diff = abs((counts[department] / len(assignments)) - employee.department_preference[department])
            diff /= len(counts)
            if diff > .1: return True
        return False

    return (
        constraint_factory
        .for_each(ShiftAssignment)
        .group_by(
            lambda assignment: assignment.employee,
            ConstraintCollectors.to_list()
        )
        .filter(in_tolerance)
        .penalize(ShiftConstraintConfiguration.department_desired)
        .as_constraint("department_desired")
    )
