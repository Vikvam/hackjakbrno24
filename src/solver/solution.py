from timefold.solver import (
    SolverFactory,
    SolutionManager,
    Solver
)
from timefold.solver.config import SolverConfig, ScoreDirectorFactoryConfig, TerminationConfig, Duration
from timefold.solver.score import ScoreExplanation

from src.solver.domain import *
from src.solver.enums import *
from src.solver.constraints import define_constraints


def explain(explanation: ScoreExplanation) -> None:
    """
    Print detailed explanation of the solution score.
    """
    print("\nSolution Explanation:")
    print(f"Score: {explanation.score}")

    print("\nConstraint Matches:")
    for match in explanation.constraint_matches:
        print(f"\n{match.constraint_name}:")
        print(f"  Impact: {match.score}")
        print(f"  Justification: {match.justification}")

    print("\nIndividual Constraint Scores:")
    for constraint in explanation.constraint_matches_by_constraint_name:
        total_score = sum(
            match.score.hard() for match in
            explanation.constraint_matches_by_constraint_name[constraint]
        )
        print(f"{constraint}: {total_score}")


def solve(problem: ShiftsSolution):
    solver_config = SolverConfig(
        solution_class=ShiftsSolution,
        entity_class_list=[ShiftDetails],
        score_director_factory_config=ScoreDirectorFactoryConfig(
            constraint_provider_function=define_constraints
        ),
        termination_config=TerminationConfig(
            spent_limit=Duration(minutes=5)  # Adjust timeout as needed
        )
    )

    # Create solver factory and solution manager
    solver_factory = SolverFactory.create(solver_config)
    solution_manager = SolutionManager.create(solver_factory)

    # Build and run solver
    solver = solver_factory.build_solver()
    solution = solver.solve(problem)

    # Explain solution
    explanation = solution_manager.explain(solution)

    return solution, explanation
