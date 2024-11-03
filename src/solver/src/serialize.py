from datetime import datetime, date
from uuid import UUID
from enum import Enum
from dataclasses import asdict
import json

from src.solver.src.domain import *


class CustomJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder to handle special types."""
    def default(self, obj):
        if isinstance(obj, Employee):
            return obj.name
        if isinstance(obj, (date, datetime)):
            return obj.isoformat()
        if isinstance(obj, UUID):
            return str(obj)
        if isinstance(obj, Enum):
            return obj.name
        if hasattr(obj, '__dict__'):
            return asdict(obj)
        return super().default(obj)


def serialize_score_analysis(score_analysis) -> str:
    """
    Serialize score analysis into a dictionary format.

    Args:
        score_analysis: ScoreAnalysis object from Timefold
    Returns:
        Dictionary containing constraint analysis
    """
    constraint_analysis = {}

    # Iterate through constraints and their matches
    for constraint_ref, analysis in score_analysis.constraint_map.items():
        constraint_id = constraint_ref.constraint_id
        matches = analysis.matches
        constraint_analysis[constraint_id] = {
            'score': str(analysis.score),
            'matches_count': analysis.match_count,
            'details': [str(match.justification.facts) for match in matches]
        }

    return json.dumps({
        'total_score': str(score_analysis.score),
        'constraint_analysis': constraint_analysis,
    }, cls=CustomJSONEncoder)


def serialize_solution(solution) -> dict:
    assignments = []
    for assignment in solution.shift_assignments:
        assignment_str = {
            "shift": assignment.shift,
            "employee": assignment.employee,
            "preference": assignment.employee.shift_availability[assignment.shift.datetype]
        }
        assignments.append(assignment_str)

    return json.dumps(assignments, cls=CustomJSONEncoder)


def serialize_result(solution, score_analysis):
    return json.dumps({
      "solution": serialize_solution(solution),
      "score_analysis": serialize_score_analysis(score_analysis),
   })
