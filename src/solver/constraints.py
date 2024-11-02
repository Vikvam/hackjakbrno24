from enum import Enum
from dataclasses import dataclass
from datetime import date
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
        at_least_36h_weekly(constraint_factory, 3),
        older_employee(constraint_factory),
        max_shift_amount(constraint_factory),
        standard_shift_amount(constraint_factory),
        weekend_shift_amount(constraint_factory),
        fair_shift_amount(constraint_factory),
        fair_shift_type(constraint_factory),
        unavailable_employee(constraint_factory),
        undesired_by_employee(constraint_factory),
        preferred_by_employee(constraint_factory),
        desired_by_employee(constraint_factory)
    ]


def one_shift_per_day(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.equal(lambda a: a.date))
        .penalize(ShiftConstraintConfiguration.one_shift_per_day)
        .as_constraint("one_shift_per_day")
    )


def at_least_12h_rest(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.less_than_or_equal(lambda a: a.date))
        .filter(lambda a1, a2: (a1.shift - a2.shift) < 12)
        .penalize(ShiftConstraintConfiguration.at_least_1_day_between_shifts)
        .as_constraint("at_least_12h_rest")
    )


def at_least_36h_weekly(constraint_factory: ConstraintFactory) -> Constraint:
    def has_36h_continuous_rest(shifts: List[ShiftDetails]) -> bool:
        if not shifts: return True

        shifts = sorted(shifts, key=lambda x: datetime.combine(x.date, x.type.start_time))

        # TODO: adjust for interval edges

        for i in range(len(shifts) - 1):
            if shifts[i] - shifts[i+1] >= 36:
                return True

        return False

    return (
        constraint_factory
        .for_each_unique_pair(ShiftAssignment,
            Joiners.equal(lambda a: a.employee),
            Joiners.less_than_or_equal(lambda a: a.date))
        .filter(lambda a1, a2: (a1.shift - a2.shift) < 12)
        .penalize(ShiftConstraintConfiguration.at_least_1_day_between_shifts)
        .as_constraint("at_least_12h_rest")
    )


def older_employee(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .filter(lambda a: a.needs_older and not shift.employee.is_older)
        .penalize(ShiftConstraintConfiguration.older_employee)
        .as_constraint("olderEmployee")
    )


def max_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .group_by(lambda a: a.employee, ConstraintCollectors.count())
        .filter(lambda employee, count:
            count > (employee.max_standard_shift_amount + employee.max_weekend_shift_amount))
        .penalize(ShiftConstraintConfiguration.max_shift_amount,
            lambda employee, count:
                count - employee.max_standard_shift_amount - employee.max_weekend_shift_amount)
        .as_constraint("maxShiftAmount")
    )


def standard_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .filter(lambda a: a.type == ShiftType.STANDARD)
        .group_by(lambda a: a.employee, ConstraintCollectors.count())
        .penalize(ShiftConstraintConfiguration.standard_shift_amount,
            lambda employee, count: abs(count - employee.max_standard_shift_amount))
        .as_constraint("standardShiftAmount")
    )


def weekend_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .filter(lambda a: a.type == ShiftType.WEEKEND)
        .group_by(lambda a: a.employee, ConstraintCollectors.count())
        .penalize(ShiftConstraintConfiguration.weekend_shift_amount,
            lambda employee, count: abs(count - employee.max_weekend_shift_amount))
        .as_constraint("weekendShiftAmount")
    )


def fair_shift_amount(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .group_by(lambda a: a.employee, ConstraintCollectors.count())
        .penalize(ShiftConstraintConfiguration.fair_shift_amount,
            lambda employee, count: count * count)
        .as_constraint("fairShiftAmount")
    )


def fair_shift_type(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .group_by(
            lambda shift: shift.employee,
            lambda shift: shift.type,
            ConstraintCollectors.count())
        .penalize(ShiftConstraintConfiguration.fair_shift_type,
            lambda employee, shift_type, count: shift_type.value * count * count)
        .as_constraint("fairShiftType")
    )


def unavailable_employee(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .join(Availability,
            Joiners.equal(lambda a: a.date, lambda availability: availability.date),
            Joiners.equal(lambda a: a.employee, lambda availability: availability.employee))
        .filter(lambda shift, availability:
            availability.availability == Availability.UNAVAILABLE)
        .penalize(ShiftConstraintConfiguration.unavailable_employee)
        .as_constraint("unavailableEmployee")
    )


def undesired_by_employee(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .join(Availability,
            Joiners.equal(lambda a: a.date, lambda availability: availability.date),
            Joiners.equal(lambda a: a.employee, lambda availability: availability.employee))
        .filter(lambda shift, availability:
            availability.availability == Availability.UNDESIRED)
        .penalize(ShiftConstraintConfiguration.undesired_by_employee)
        .as_constraint("undesiredByEmployee")
    )


def preferred_by_employee(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .join(Availability,
            Joiners.equal(lambda a: a.date, lambda availability: availability.date),
            Joiners.equal(lambda a: a.employee, lambda availability: availability.employee))
        .filter(lambda shift, availability:
            availability.availability == Availability.PREFERRED)
        .reward(ShiftConstraintConfiguration.preferred_by_employee)
        .as_constraint("preferredByEmployee")
    )


def desired_by_employee(constraint_factory: ConstraintFactory) -> Constraint:
    return (
        constraint_factory
        .for_each(ShiftDetails)
        .join(Availability,
            Joiners.equal(lambda a: a.date, lambda availability: availability.date),
            Joiners.equal(lambda a: a.employee, lambda availability: availability.employee))
        .filter(lambda shift, availability:
            availability.availability == Availability.DESIRED)
        .reward(ShiftConstraintConfiguration.desired_by_employee)
        .as_constraint("desiredByEmployee")
    )
