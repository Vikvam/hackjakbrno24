import calendar
from collections import defaultdict
import random
import sys
from datetime import date

from src.solver.src.mock import *
from src.solver.src.solution import *


if __name__ == "__main__":
    random.seed(42)
    YEAR = 2024
    MONTH = 11

    employees, shifts, assignments = problem_mock(2024, 11, seed=42)

    problem = ShiftsSchedule(employees, shifts, assignments)

    print(f"Solving... {datetime.now()}")
    solution, score_analysis = solve(problem)

    print(solution)
    print(score_analysis.summary)
