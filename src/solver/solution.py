from timefold.solver import (
    SolverFactory,
    SolutionManager,
)
from timefold.solver.config import SolverConfig, ScoreDirectorFactoryConfig, TerminationConfig, Duration
from timefold.solver.score import ScoreExplanation

from src.solver.domain import *
from src.solver.enums import *
from src.solver.constraints import define_constraints


def solve(problem: ShiftsSchedule):
    solver_config = SolverConfig(
        solution_class=ShiftsSchedule,
        entity_class_list=[ShiftAssignment],
        score_director_factory_config=ScoreDirectorFactoryConfig(
            constraint_provider_function=define_constraints
        ),
        termination_config=TerminationConfig(
            spent_limit=Duration(
                minutes=2,
                seconds=30,
            ),
            unimproved_spent_limit=Duration(
                seconds=10
            ),
            # best_score_limit=HardMediumSoftScore.of(0, 0, 0),
        )
    )

    # Create solver factory and solution manager
    solver_factory = SolverFactory.create(solver_config)
    solution_manager = SolutionManager.create(solver_factory)

    # Build and run solver
    solver = solver_factory.build_solver()
    solution = solver.solve(problem)

    # Explain solution
    score_analysis = solution_manager.analyze(solution)

    return solution, score_analysis
