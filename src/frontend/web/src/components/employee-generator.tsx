import { useState } from "react"
import { Button } from "src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "src/components/ui/card"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select"
import { Skeleton } from "src/components/ui/skeleton"

// Mock employee data
const employees = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
]

// Mock API call to generate employee properties
const generateEmployeeProperties = async (employeeId: string) => {
  // Simulating API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    department: ["HR", "IT", "Finance", "Marketing"][Math.floor(Math.random() * 4)],
    position: ["Manager", "Senior Specialist", "Coordinator", "Analyst"][Math.floor(Math.random() * 4)],
    salary: Math.floor(Math.random() * 50000) + 50000,
    hireDate: new Date(Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
  }
}

export function EmployeeGeneratorComponent() {
  const [selectedEmployee, setSelectedEmployee] = useState<string | undefined>()
  const [employeeProperties, setEmployeeProperties] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateProperties = async () => {
    if (!selectedEmployee) return

    setIsLoading(true)
    try {
      const properties = await generateEmployeeProperties(selectedEmployee)
      setEmployeeProperties(properties)
    } catch (error) {
      console.error("Error generating employee properties:", error)
      // In a real application, you'd want to show an error message to the user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Employee Property Generator</CardTitle>
        <CardDescription>Select an employee and generate their properties.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-select">Select Employee</Label>
            <Select onValueChange={setSelectedEmployee} value={selectedEmployee}>
              <SelectTrigger id="employee-select">
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {employeeProperties && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={employeeProperties.department} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" value={employeeProperties.position} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" value={`$${employeeProperties.salary.toLocaleString()}`} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">Hire Date</Label>
                <Input id="hireDate" value={employeeProperties.hireDate} readOnly />
              </div>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGenerateProperties}
          disabled={!selectedEmployee || isLoading}
          className="w-full"
        >
          {isLoading ? "Generating..." : "Generate Properties"}
        </Button>
      </CardFooter>
    </Card>
  )
}
