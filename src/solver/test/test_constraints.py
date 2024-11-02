from timefold.solver.test import ConstraintVerifier
from datetime import date, datetime, time, timedelta
import pytest


from src.solver.constraints import *
from src.solver.mock import *


@pytest.fixture
def constraint_verifier():
    return ConstraintVerifier.build(
        define_constraints,
        ShiftsSchedule,
        ShiftAssignment,
    )


class TestConstraints:
    """Test constraints."""

    @pytest.fixture
    def basic_test_employee(self):
        return create_employee()

    def test_overlapping_shifts_violation(self, constraint_verifier, basic_test_employee):
        """Test that shifts with less than 12 hours between them are penalized."""
        assignment1 = ShiftAssignment(
            create_shift(date(2024, 11, 1), ShiftType.MORNING),
            basic_test_employee
        )
        assignment2 = ShiftAssignment(
            create_shift(date(2024, 11, 1), ShiftType.MORNING),
            basic_test_employee
        )

        (constraint_verifier.verify_that(no_overlapping_shifts)
            .given(assignment1, assignment2)
            .penalizes(1))

    def test_overlapping_different_employees(self, constraint_verifier, basic_test_employee):
        """Test that constraints only apply to same employee."""
        other_employee = create_employee(name="Emp1")

        assignments = [
            ShiftAssignment(
                create_shift(date(2024, 11, 1), ShiftType.MORNING),
                basic_test_employee
            ),
            ShiftAssignment(
                create_shift(date(2024, 11, 1), ShiftType.MORNING),
                other_employee
            ),
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_12h_rest_violation(self, constraint_verifier, basic_test_employee):
        """Test that shifts with less than 12 hours between them are penalized."""
        assignment1 = ShiftAssignment(
            create_shift(date(2024, 11, 1), ShiftType.MORNING),  # 7:00-15:30,
            basic_test_employee
        )
        assignment2 = ShiftAssignment(
            create_shift(date(2024, 11, 1), ShiftType.OVERNIGHT),  # 18:00-7:00,
            basic_test_employee
        )

        (constraint_verifier.verify_that(at_least_12h_rest)
            .given(assignment1, assignment2)
            .penalizes(1))

    def test_12h_rest_no_violation(self, constraint_verifier, basic_test_employee):
        """Test that shifts with more than 12 hours between them are not penalized."""
        assignment1 = ShiftAssignment(
            create_shift(date(2024, 11, 1), ShiftType.MORNING),
            basic_test_employee
        )
        assignment2 = ShiftAssignment(
            create_shift(date(2024, 11, 3), ShiftType.WEEKEND_EVENING),
            basic_test_employee
        )
        (constraint_verifier.verify_that(at_least_12h_rest)
            .given(assignment1, assignment2)
            .penalizes(0))

    def test_36h_weekly_rest_violation(self, constraint_verifier, basic_test_employee):
        """Test that weeks without 36 continuous hours of rest are penalized."""
        assignments = [
            ShiftAssignment(
                create_shift(date(2024, 11, d), ShiftType.MORNING),
                basic_test_employee
            )
            for d in range(4, 11)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(1))

    def test_36h_weekly_rest_no_violation(self, constraint_verifier, basic_test_employee):
        """Test that weeks with 36 continuous hours of rest are not penalized."""
        assignments = [
            ShiftAssignment(
                create_shift(date(2024, 11, 4), ShiftType.MORNING),
                basic_test_employee
            ),
            ShiftAssignment(
                create_shift(date(2024, 11, 11), ShiftType.MORNING),
                basic_test_employee
            ),
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_36h_weekly_rest_start_of_week(self, constraint_verifier, basic_test_employee):
        """Test that 36h rest at start of week is recognized."""
        assignments = [
            ShiftAssignment(
                create_shift(date(2024, 11, d), ShiftType.OVERNIGHT),
                basic_test_employee
            )
            for d in range(5, 11)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_36h_weekly_rest_end_of_week(self, constraint_verifier, basic_test_employee):
        """Test that 36h rest at end of week is recognized."""
        # Create shifts ending Thursday (36h rest at end of week)
        assignments = [
            ShiftAssignment(
                create_shift(date(2024, 11, d), ShiftType.MORNING),
                basic_test_employee
            )
            for d in range(4, 10)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_over_required_shift_amount_violation(self, constraint_verifier):
        test_employee = create_employee(shift_amounts={ShiftType.OVERNIGHT: 0})
        other_employee = create_employee(shift_amounts={ShiftType.OVERNIGHT: 2})

        assignments = [
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), test_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), test_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), other_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), other_employee)
        ]

        (constraint_verifier.verify_that(over_required_shift_amount)
            .given(*assignments)
            .penalizes(1))

    def test_under_required_shift_amount_violation(self, constraint_verifier):
        test_employee = create_employee(shift_amounts={ShiftType.OVERNIGHT: 2})
        other_employee = create_employee(shift_amounts={ShiftType.OVERNIGHT: 0})

        assignments = [
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), test_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), test_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), other_employee),
            ShiftAssignment(create_shift(shift_type=ShiftType.OVERNIGHT), other_employee),
        ]

        (constraint_verifier.verify_that(over_required_shift_amount)
            .given(*assignments)
            .penalizes(1))

    def test_availability_impossible(self, constraint_verifier):
        datetype = create_shiftdatetype()
        test_employee = create_employee(shift_availability={datetype: Availability.IMPOSSIBLE})

        assignments = [
            ShiftAssignment(create_shift(datetype=datetype), test_employee),
        ]

        (constraint_verifier.verify_that(availability_impossible)
            .given(*assignments)
            .penalizes(1))
