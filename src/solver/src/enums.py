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

    def __ge__(self, other):
        if not isinstance(other, Qualifications): return NotImplemented
        return self._name_ >= other._name_

    def __gt__(self, other):
        if not isinstance(other, Qualifications): return NotImplemented
        return self._name_ > other._name_

    def __le__(self, other):
        if not isinstance(other, Qualifications): return NotImplemented
        return self._name_ <= other._name_

    def __lt__(self, other):
        if not isinstance(other, Qualifications): return NotImplemented
        return self._name_ < other._name_


class ShiftType(Enum):
    MORNING = (time(7, 0), time(15, 30))
    AFTERNOON = (time(10, 30), time(19, 0))
    OVERNIGHT = (time(18, 0), time(7, 0))
    MORNING_12 = (time(6, 0), time(19, 0))
    EVENING_12 = (time(18, 0), time(7, 0))

    @staticmethod
    def weekendrange():
        return iter([
            ShiftType.MORNING_12,
            ShiftType.EVENING_12
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
            case "WEEKEND_MORNING": return cls.MORNING_12
            case "WEEKEND_EVENING": return cls.EVENING_12
            case _: raise ValueError("Invalid ShiftType provided.")

    @property
    def is_overnight(self):
        return self == ShiftType.OVERNIGHT or self == ShiftType.EVENING_12


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
