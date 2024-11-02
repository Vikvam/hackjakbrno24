from dataclasses import dataclass
from timefold.solver.domain import constraint_configuration
from timefold.solver.score import HardMediumSoftScore


@constraint_configuration
@dataclass
class ShiftConstraintConfiguration:
    # Hard constraints (weight 100, 80)
    one_shift_per_day: HardMediumSoftScore = HardMediumSoftScore.of_hard(100)
    at_least_1_day_between_shifts: HardMediumSoftScore = HardMediumSoftScore.of_hard(80)
    older_employee: HardMediumSoftScore = HardMediumSoftScore.of_hard(80)

    # Hard constraints (weight 1)
    max_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_hard(1)
    unavailable_employee: HardMediumSoftScore = HardMediumSoftScore.of_hard(1)

    # Medium constraints (weight 50, 30)
    at_least_n_days_between_shifts: HardMediumSoftScore = HardMediumSoftScore.of_medium(50)
    undesired_by_employee: HardMediumSoftScore = HardMediumSoftScore.of_medium(30)

    # Medium constraints (weight 1)
    standard_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_medium(1)
    weekend_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_medium(1)
    desired_by_employee: HardMediumSoftScore = HardMediumSoftScore.of_medium(1)

    # Soft constraints (weight 1)
    fair_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_soft(1)
    fair_shift_type: HardMediumSoftScore = HardMediumSoftScore.of_soft(1)
    preferred_by_employee: HardMediumSoftScore = HardMediumSoftScore.of_soft(1)
