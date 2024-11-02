from dataclasses import dataclass
from timefold.solver.domain import constraint_configuration
from timefold.solver.score import HardMediumSoftScore


@constraint_configuration
@dataclass
class ShiftConstraintConfiguration:
    # Hard constraints
    each_shift_assigned: HardMediumSoftScore = HardMediumSoftScore.of_hard(10**16)
    is_illegal: HardMediumSoftScore = HardMediumSoftScore.of_hard(1000)

    availability_impossible: HardMediumSoftScore = HardMediumSoftScore.of_hard(1)
    availability_necessary: HardMediumSoftScore = HardMediumSoftScore.of_hard(1)

    # Medium constraints
    over_required_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_medium(100)
    under_required_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_medium(1)
    availability_undesired: HardMediumSoftScore = HardMediumSoftScore.of_medium(5)
    availability_desired: HardMediumSoftScore = HardMediumSoftScore.of_medium(5)

    # Soft constraints
    department_desired: HardMediumSoftScore = HardMediumSoftScore.of_soft(50)
