from timefold.solver import (
    SolverFactory,
    SolutionManager,
    heuristic
)
from timefold.solver.config import SolverConfig, ScoreDirectorFactoryConfig, TerminationConfig, Duration
from timefold.solver.score import ScoreExplanation, ScoreAnalysis
import json

from src.solver.src.domain import *
from src.solver.src.enums import *
from src.solver.src.constraints import define_constraints


def solve(problem: ShiftsSchedule, spent_limit=Duration(minutes=1, seconds=30)):
    solver_config = SolverConfig(
        solution_class=ShiftsSchedule,
        entity_class_list=[ShiftAssignment],
        score_director_factory_config=ScoreDirectorFactoryConfig(
            constraint_provider_function=define_constraints
        ),
        termination_config=TerminationConfig(
            spent_limit=spent_limit,
            unimproved_spent_limit=Duration(
                minutes=5
            ),
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
