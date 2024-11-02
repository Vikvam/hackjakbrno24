from enum import Enum, auto
from datetime import time


class Qualifications(Enum):
    NONE = "Asolvent"
    STEM = "Kmen"
    CERTIFIED = "Atestace"


class ShiftType(Enum):
    MORNING = (time(7, 0), time(15, 30))
    AFTERNOON = (time(10, 30), time(19, 0))
    OVERNIGHT = (time(18, 0), time(7, 0))
    WEEKEND_MORNING = (time(6, 0), time(19, 0))
    WEEKEND_EVENING = (time(18, 0), time(7, 0))


class Department(Enum):
    RTG = auto()
    CT = auto()


class Availability(Enum):
    DESIRED = auto()
    PREFERRED = auto()
    NEUTRAL = auto()
    UNDESIRED = auto()
    UNAVAILABLE = auto()
