import random
from enum import Enum, auto
from datetime import time


class Trunks(Enum):
    RTG = auto()
    CT = auto()


class Specialization(Enum):
    INTERNAL = auto()
    ORTHOPEDIC = auto()
    UROLOGY = auto()
    PEDIATRIC = auto()
    RTG = auto()


class Qualifications(Enum):
    L1 = "Asolvent"
    L2 = "Kmen"
    L3 = "Atestace"


class ShiftType(Enum):
    MORNING = (time(7, 0), time(15, 30))
    AFTERNOON = (time(10, 30), time(19, 0))
    OVERNIGHT = (time(18, 0), time(7, 0))
    WEEKEND_MORNING = (time(6, 0), time(19, 0))
    WEEKEND_EVENING = (time(18, 0), time(7, 0))

    @staticmethod
    def weekendrange():
        return iter([
            ShiftType.WEEKEND_MORNING,
            ShiftType.WEEKEND_EVENING
        ])

    @staticmethod
    def weekdayrange():
        return iter([
            ShiftType.MORNING,
            ShiftType.AFTERNOON,
            ShiftType.OVERNIGHT
        ])
    
    @classmethod
    def get(cls, typ: str) -> 'ShiftType':
        match typ:
            case "MORNING": return cls.MORNING
            case "AFTERNOON": return cls.AFTERNOON
            case "OVERNIGHT": return cls.OVERNIGHT
            case "WEEKEND_MORNING": return cls.WEEKEND_MORNING
            case "WEEKEND_EVENING": return cls.WEEKEND_EVENING
            case _: raise ValueError("Invalid ShiftType provided.")

    @property
    def is_overnight(self):
        return self == ShiftType.OVERNIGHT or self == ShiftType.WEEKEND_EVENING


class Departments(Enum):
    RTG = auto()
    CT = auto()


class Availability(Enum):
    NECESSARY = auto()
    DESIRED = auto()
    PREFERRED = auto()
    NEUTRAL = auto()
    UNDESIRED = auto()
    UNAVAILABLE = auto()
    IMPOSSIBLE = auto()

    @staticmethod
    def random():
        return random.choice(list(Availability))
