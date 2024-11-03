// import { Link, routes } from '@redwoodjs/router'
import {Metadata, useQuery} from '@redwoodjs/web'
import {useEffect, useState} from 'react'
import {Button} from "src/components/ui/button"
import {Input} from "src/components/ui/input"
import {Label} from "src/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "src/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "src/components/ui/table"
import {Plus, Trash2, Edit2} from 'lucide-react'
import {useMutation} from '@redwoodjs/web'

type Department = 'RTG' | 'CT'
type EmployeeType = 'Doctor' | 'Nurse' | 'Assistant'

interface ShiftSlot {
  id: number
  type: string
  amounts: Record<string, number>
}

interface ShiftDefinition {
  id: number
  department: Department
  employeeType: EmployeeType
  skillLevels: string[]
  slots: ShiftSlot[]
}

const departments: Department[] = ['RTG', 'CT']
const employeeTypes = ['Doctor', 'Nurse', 'Assistant']

const CREATE_SHIFT_MUTATION_PAGE = gql`
  mutation CreateShiftMutationProper($input: CreateShiftInput!) {
    createShift(input: $input) {
      id
      type
      employeeType
      department
      amount
      qualification
    }
  }
`

const DELETE_SHIFTS_MUTATION_PAGE = gql`
  mutation DeleteShiftsMutationPage($department: String!, $employeeType: String!) {
    deleteShifts(department: $department, employeeType: $employeeType)
  }
`

const GET_SHIFT_DEFINITION = gql`
  query shiftsByDepartmentAndEmployeeType($department: String!, $employeeType: String!) {
    shiftsByDepartmentAndEmployeeType(department: $department, employeeType: $employeeType) {
      id
      type
      employeeType
      department
      amount
      qualification
    }
  }
`

const DefineShiftsPage = ({initialData = []}) => {
  const [shiftDefinitions, setShiftDefinitions] = useState<ShiftDefinition[]>(initialData)
  const [selectedDepartment, setSelectedDepartment] = useState<Department>('RTG')
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<EmployeeType>('Doctor')
  const [editingColumn, setEditingColumn] = useState<{ index: number, name: string } | null>(null)
  const [createShift] = useMutation(CREATE_SHIFT_MUTATION_PAGE)
  const [deleteShifts] = useMutation(DELETE_SHIFTS_MUTATION_PAGE)

  const {data, loading, error} = useQuery(GET_SHIFT_DEFINITION, {
    variables: {department: selectedDepartment, employeeType: selectedEmployeeType},
  })

  useEffect(() => {
    if (data && data.shiftsByDepartmentAndEmployeeType) {

      console.log("Loading data: ", data.shiftsByDepartmentAndEmployeeType)
      const skillLevelsSet = new Set<string>()
      const shiftsByType = new Map<string, { id: number, type: string, amounts: Record<string, number> }>()

      data.shiftsByDepartmentAndEmployeeType.forEach(shift => {
        skillLevelsSet.add(shift.qualification)
        if (!shiftsByType.has(shift.type)) {
          shiftsByType.set(shift.type, {
            id: shift.id,
            type: shift.type,
            amounts: {}
          })
        }
        const currentShift = shiftsByType.get(shift.type)!
        currentShift.id = Math.min(currentShift.id, shift.id)
        currentShift.amounts[shift.qualification] = (currentShift.amounts[shift.qualification] || 0) + shift.amount
      })

      const skillLevels = Array.from(skillLevelsSet)
      const slots = Array.from(shiftsByType.values()).map(slot => {
        skillLevels.forEach(level => {
          if (!(level in slot.amounts)) {
            slot.amounts[level] = 0
          }
        })
        return slot
      })

      const shiftData = [{
        id: Date.now(),
        department: selectedDepartment,
        employeeType: selectedEmployeeType,
        skillLevels,
        slots
      }]

      setShiftDefinitions(shiftData)
    }
  }, [data])

  const getCurrentDefinition = () => {

    const def = shiftDefinitions.find(def => def.department === selectedDepartment && def.employeeType === selectedEmployeeType) || {
      id: Date.now(),
      department: selectedDepartment,
      employeeType: selectedEmployeeType,
      skillLevels: [],
      slots: []
    }
    return def
  }

  const handleInputChange = (slotId: number, field: 'type' | string, value: string) => {
    setShiftDefinitions(prevDefs => {
      const currentDef = getCurrentDefinition()
      const updatedSlots = currentDef.slots.map(slot =>
        slot.id === slotId
          ? {
            ...slot,
            ...(field === 'type'
                ? {type: value}
                : {amounts: {...slot.amounts, [field]: parseInt(value) || 0}}
            )
          }
          : slot
      )

      const updatedDef = {...currentDef, slots: updatedSlots}
      return prevDefs.some(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType)
        ? prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
        : [...prevDefs, updatedDef]
    })
  }

  const addShift = () => {
    setShiftDefinitions(prevDefs => {
      const currentDef = getCurrentDefinition()
      const updatedDef = {
        ...currentDef,
        slots: [
          ...currentDef.slots,
          {
            id: Date.now(),
            type: 'New Shift',
            amounts: Object.fromEntries(currentDef.skillLevels.map(level => [level, 0]))
          }
        ]
      }

      return prevDefs.some(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType)
        ? prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
        : [...prevDefs, updatedDef]
    })
  }

  const removeShift = (slotId: number) => {
    setShiftDefinitions(prevDefs => {
      const currentDef = getCurrentDefinition()
      if (currentDef.slots.length <= 1) return prevDefs // Ensure at least one shift remains

      const updatedDef = {
        ...currentDef,
        slots: currentDef.slots.filter(slot => slot.id !== slotId)
      }

      return prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
    })
  }

  const addColumn = () => {
    setShiftDefinitions(prevDefs => {
      const currentDef = getCurrentDefinition()
      const newColumnName = `L${currentDef.skillLevels.length + 1}`
      const updatedDef = {
        ...currentDef,
        skillLevels: [...currentDef.skillLevels, newColumnName],
        slots: currentDef.slots.map(slot => ({
          ...slot,
          amounts: {...slot.amounts, [newColumnName]: 0}
        }))
      }

      return prevDefs.some(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType)
        ? prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
        : [...prevDefs, updatedDef]
    })
  }

  const removeColumn = (columnName: string) => {
    setShiftDefinitions(prevDefs => {
      const currentDef = getCurrentDefinition()
      if (currentDef.skillLevels.length <= 1) return prevDefs // Ensure at least one column remains

      const updatedDef = {
        ...currentDef,
        skillLevels: currentDef.skillLevels.filter(level => level !== columnName),
        slots: currentDef.slots.map(slot => {
          const {[columnName]: _, ...rest} = slot.amounts
          return {...slot, amounts: rest}
        })
      }

      return prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
    })
  }

  const startEditingColumn = (index: number, name: string) => {
    setEditingColumn({index, name})
  }

  const finishEditingColumn = () => {
    if (editingColumn) {
      setShiftDefinitions(prevDefs => {
        const currentDef = getCurrentDefinition()
        const oldName = currentDef.skillLevels[editingColumn.index]
        const updatedDef = {
          ...currentDef,
          skillLevels: currentDef.skillLevels.map((level, index) =>
            index === editingColumn.index ? editingColumn.name : level
          ),
          slots: currentDef.slots.map(slot => {
            const {[oldName]: oldValue, ...rest} = slot.amounts
            return {
              ...slot,
              amounts: {...rest, [editingColumn.name]: oldValue}
            }
          })
        }

        return prevDefs.map(def => def.department === selectedDepartment && def.employeeType == selectedEmployeeType ? updatedDef : def)
      })
      setEditingColumn(null)
    }
  }

  const saveChanges = async () => {
    console.log('Saving changes:', shiftDefinitions)

    const currentDefinition = getCurrentDefinition()

    const deleteResult = await deleteShifts({
      variables: {
        department: currentDefinition.department,
        employeeType: currentDefinition.employeeType,
      },
    })

    for (const definition of shiftDefinitions) {
      for (const slot of definition.slots) {
        for (const [skillLevel, amount] of Object.entries(slot.amounts)) {
          await createShift({
            variables: {
              input: {
                type: slot.type,
                employeeType: definition.employeeType,
                department: definition.department,
                amount: amount,
                qualification: skillLevel,
              },
            },
          })
        }
      }
    }
  }

  const currentDefinition = getCurrentDefinition()

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={(value: Department) => setSelectedDepartment(value)} value={selectedDepartment}>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select department"/>
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="employeeType">Employee Type</Label>
          <Select onValueChange={(value: EmployeeType) => setSelectedEmployeeType(value)} value={selectedEmployeeType}>
            <SelectTrigger id="employeeType">
              <SelectValue placeholder="Select Employee Type"/>
            </SelectTrigger>
            <SelectContent>
              {employeeTypes.map(typ => (
                <SelectItem key={typ} value={typ}>{typ}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg p-4 flex flex-col">
        <div className="flex flex-row justify-end">
          <Button onClick={addColumn} size="sm" className="relative top-0 right-0 m-2">
            <Plus className="mr-2 h-4 w-4"/>Add Column
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] min-w-[250px]">Shift Type</TableHead>
              {currentDefinition.skillLevels.map((level, index) => (
                <TableHead key={level} className="min-w-[120px]">
                  {editingColumn && editingColumn.index === index ? (
                    <Input
                      value={editingColumn.name}
                      onChange={(e) => setEditingColumn({...editingColumn, name: e.target.value})}
                      onBlur={finishEditingColumn}
                      onKeyPress={(e) => e.key === 'Enter' && finishEditingColumn()}
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center">
                      {level}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditingColumn(index, level)}
                        className="ml-2"
                        aria-label={`Edit ${level}`}
                      >
                        <Edit2 className="h-4 w-4"/>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeColumn(level)}
                        disabled={currentDefinition.skillLevels.length <= 1}
                        className="ml-2"
                        aria-label={`Remove ${level}`}
                      >
                        <Trash2 className="h-4 w-4"/>
                      </Button>
                    </div>
                  )}
                </TableHead>
              ))}
              <TableHead className="w-[50px] min-w-[50px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDefinition.slots.map(slot => (
              <TableRow key={slot.id}>
                <TableCell className="font-medium">
                  <Input
                    value={slot.type}
                    onChange={(e) => handleInputChange(slot.id, 'type', e.target.value)}
                    aria-label="Shift type"
                  />
                </TableCell>
                {currentDefinition.skillLevels.map(level => (
                  <TableCell key={level}>
                    <Input
                      type="number"
                      min="0"
                      value={slot.amounts[level] || 0}
                      onChange={(e) => handleInputChange(slot.id, level, e.target.value)}
                      aria-label={`${slot.type} ${level} count`}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeShift(slot.id)}
                    disabled={currentDefinition.slots.length <= 1}
                    aria-label="Remove shift"
                  >
                    <Trash2 className="h-4 w-4"/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={currentDefinition.skillLevels.length + 2}>
                <Button onClick={addShift} className="w-full">
                  <Plus className="mr-2 h-4 w-4"/> Add Shift
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button onClick={saveChanges}>Save Changes</Button>
      </div>
    </div>
  )
}

export default DefineShiftsPage
