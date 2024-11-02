from collections import defaultdict

from src.solver.src.domain import *


def create_shiftdatetype(
        date_obj: date = None,
        shift_type: ShiftType = ShiftType.OVERNIGHT
        ) -> ShiftDatetype:
    return ShiftDatetype(
        date=date_obj if date_obj else date(2024, 11, 1),
        type=shift_type,
    )


def create_shift(
        date_obj: date = None,
        shift_type: ShiftType = ShiftType.OVERNIGHT,
        datetype: ShiftDatetype = None,
        department: Departments = Departments.RTG,
        amount: int = 1,
        qualification: Optional[Qualifications] = Qualifications.L3
        ) -> Shift:
    if not datetype:
        datetype = create_shiftdatetype(date_obj if date_obj else date(2024, 11, 1), shift_type)
    return Shift(
        datetype=datetype,
        department=department,
        amount=amount,
        qualification=qualification
    )


def create_employee(
        name: str = "Emp",
        department_preference: dict[Departments, float] | None = None,
        shift_amounts: dict[ShiftType, int] | None = None,
        shift_availability: dict[ShiftDatetype, Availability] | None = None
        ) -> Employee:
    return Employee(
        name=name,
        department_preference=department_preference if department_preference else {department: 1 / len(Departments) for department in Departments},
        shift_amounts=defaultdict(lambda: 1, shift_amounts or {}),
        shift_availability=defaultdict(lambda: Availability.NEUTRAL, shift_availability or {})
    )
