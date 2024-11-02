from timefold.solver.test import ConstraintVerifier
from datetime import date, datetime, time, timedelta
import pytest

from src.solver.domain import *
from src.solver.enums import *
from src.solver.constraints import *


@pytest.fixture
def constraint_verifier():
    return ConstraintVerifier.build(
        define_constraints,
        ShiftsSchedule,
        ShiftAssignment,
    )


def create_test_employee(name="Emp") -> Employee:
    """Helper to create a test shift."""
    return Employee(
        name=name,
        department_preference={Department.RTG: 1.0, Department.CT: .5},
        shift_availability={}
    )


def create_test_shift(date_obj: date, shift_type=ShiftType.MORNING, department=Department.RTG, amount=1, qualification=Qualifications.L3) -> Shift:
    """Helper to create a test shift."""
    return Shift(
        datetype=ShiftDatetype(date_obj, shift_type),
        department=department,
        amount=amount,
        qualification=qualification
    )


def create_test_assignment(shift: Shift, employee: Employee) -> ShiftAssignment:
    """Helper to create a test shift assignment."""
    return ShiftAssignment(shift=shift, employee=employee)


class TestRestConstraints:
    """Test rest period constraints."""

    @pytest.fixture
    def test_employee(self):
        return create_test_employee()

    def test_overlapping_shifts_violation(self, constraint_verifier, test_employee):
        """Test that shifts with less than 12 hours between them are penalized."""
        assignment1 = create_test_assignment(
            create_test_shift(date(2024, 11, 1), ShiftType.MORNING),
            test_employee
        )
        assignment2 = create_test_assignment(
            create_test_shift(date(2024, 11, 1), ShiftType.MORNING),
            test_employee
        )

        (constraint_verifier.verify_that(no_overlapping_shifts)
            .given(assignment1, assignment2)
            .penalizes(1))

    def test_overlapping_different_employees(self, constraint_verifier, test_employee):
        """Test that constraints only apply to same employee."""
        other_employee = create_test_employee(name="Emp1")

        assignments = [
            create_test_assignment(
                create_test_shift(date(2024, 11, 1), ShiftType.MORNING),
                test_employee
            ),
            create_test_assignment(
                create_test_shift(date(2024, 11, 1), ShiftType.MORNING),
                other_employee
            ),
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_12h_rest_violation(self, constraint_verifier, test_employee):
        """Test that shifts with less than 12 hours between them are penalized."""
        assignment1 = create_test_assignment(
            create_test_shift(date(2024, 11, 1), ShiftType.MORNING),  # 7:00-15:30,
            test_employee
        )
        assignment2 = create_test_assignment(
            create_test_shift(date(2024, 11, 1), ShiftType.OVERNIGHT),  # 18:00-7:00,
            test_employee
        )

        (constraint_verifier.verify_that(at_least_12h_rest)
            .given(assignment1, assignment2)
            .penalizes(1))

    def test_12h_rest_no_violation(self, constraint_verifier, test_employee):
        """Test that shifts with more than 12 hours between them are not penalized."""
        assignment1 = create_test_assignment(
            create_test_shift(date(2024, 11, 1), ShiftType.MORNING),
            test_employee
        )
        assignment2 = create_test_assignment(
            create_test_shift(date(2024, 11, 3), ShiftType.WEEKEND_EVENING),
            test_employee
        )
        (constraint_verifier.verify_that(at_least_12h_rest)
            .given(assignment1, assignment2)
            .penalizes(0))

    def test_36h_weekly_rest_violation(self, constraint_verifier, test_employee):
        """Test that weeks without 36 continuous hours of rest are penalized."""
        assignments = [
            create_test_assignment(
                create_test_shift(date(2024, 11, d), ShiftType.MORNING),
                test_employee
            )
            for d in range(4, 11)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(1))

    def test_36h_weekly_rest_no_violation(self, constraint_verifier, test_employee):
        """Test that weeks with 36 continuous hours of rest are not penalized."""
        assignments = [
            create_test_assignment(
                create_test_shift(date(2024, 11, 4), ShiftType.MORNING),
                test_employee
            ),
            create_test_assignment(
                create_test_shift(date(2024, 11, 11), ShiftType.MORNING),
                test_employee
            ),
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

    def test_36h_weekly_rest_start_of_week(self, constraint_verifier, test_employee):
        """Test that 36h rest at start of week is recognized."""
        assignments = [
            create_test_assignment(
                create_test_shift(date(2024, 11, d), ShiftType.OVERNIGHT),
                test_employee
            )
            for d in range(5, 11)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))

        constraint_verifier.verify_that(at_least_36h_rest_weekly) \
            .given(*assignments) \
            .hasNoImpact()

    def test_36h_weekly_rest_end_of_week(self, constraint_verifier, test_employee):
        """Test that 36h rest at end of week is recognized."""
        # Create shifts ending Thursday (36h rest at end of week)
        assignments = [
            create_test_assignment(
                create_test_shift(date(2024, 11, d), ShiftType.MORNING),
                test_employee
            )
            for d in range(4, 10)
        ]

        (constraint_verifier.verify_that(at_least_36h_rest_weekly)
            .given(*assignments)
            .penalizes(0))
