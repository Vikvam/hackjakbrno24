from dataclasses import dataclass
from timefold.solver.domain import constraint_configuration
from timefold.solver.score import HardMediumSoftScore


@constraint_configuration
@dataclass
class ShiftConstraintConfiguration:
    # Hard constraints
    each_shift_assigned: HardMediumSoftScore = HardMediumSoftScore.of_hard(10**16)
    is_illegal: HardMediumSoftScore = HardMediumSoftScore.of_hard(100)

    # Medium constraints
    over_required_shift_amount: HardMediumSoftScore = HardMediumSoftScore.of_medium(10)

    # Soft constraints
