from pydantic import BaseModel

from src.solver.src.domain import *


class ShiftModel(BaseModel):
    datetype: tuple[date, str]
    department: str
    amount: int
    qualification: Optional[str]

    def to_dataclass(self) -> Shift:
        return Shift(
            datetype=ShiftDatetype(self.datetype[0], ShiftType.get(self.datetype[1])),
            department=self.department,
            amount=self.amount,
            qualification=self.qualification,
        )


class DoctorModel(BaseModel):
    name: str
    department_preference: list[tuple[str, float]]  # ex. [("RTG", 0.7), ("CT", 0.3)]
    shift_availability: list[tuple[date, str, str]]  # ex. ("2024-11-11", "MORNING", "AVAILABLE")
    stem: Optional[str]
    atestation: Optional[str]
    qualifications: Optional[str]

    def to_dataclass(self) -> Doctor:
        return Doctor(
            name=self.name,
            department_preference={dep: prob for (dep, prob) in self.department_preference},
            shift_availability={ShiftDatetype(t[0], t[1]): t[2] for t in self.shift_availability},
            stem=self.stem,
            atestation=self.atestation,
            qualifications=self.qualifications,
        )


class ShiftsScheduleModel(BaseModel):
    employees: List[DoctorModel]
    shifts: List[ShiftModel]

    def to_dataclass(self) -> ShiftsSchedule:
        return ShiftsSchedule(
            employees=[emp.to_dataclass() for emp in self.employees],
            shifts=[shift.to_dataclass() for shift in self.shifts],
            shift_assignments=[ShiftAssignment(shift) for shift in self.shifts for _ in range(shift.amount)],
        )
