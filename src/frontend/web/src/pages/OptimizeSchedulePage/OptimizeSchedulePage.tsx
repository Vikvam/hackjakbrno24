import {Form, TextField, Submit, Label} from '@redwoodjs/forms'
import {useEffect, useState} from 'react'

const OptimizeSchedulePage = () => {
  const [scheduleSolution, setScheduleData] = useState<Object>(null)

  useEffect(() => {
    const loadScheduleData = async () => {
      try {
        const response = await fetch('42.solution.json')
        const data = await response.json()
        setScheduleData(data)
      } catch (error) {
        console.error('Error loading schedule data:', error)
      }
    }
    loadScheduleData()
  }, [])

  const [selectedPeriod, setSelectedPeriod] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    week: null
  })

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }

  const onSubmit = (data) => {
    setSelectedPeriod({
      year: parseInt(data.year),
      month: parseInt(data.month),
      week: data.week ? parseInt(data.week) : null
    })
    // Add your optimization logic here
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Schedule Optimization
          </h2>
        </header>

        <div className="rw-segment-main">
          <Form onSubmit={onSubmit} className="rw-form-wrapper">
            <div className="rw-input-row">
              <Label
                name="year"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Year
              </Label>
              <TextField
                name="year"
                defaultValue={selectedPeriod.year}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: true,
                  pattern: {
                    value: /^20\d{2}$/,
                    message: 'Please enter a valid year (2000-2099)'
                  }
                }}
              />
            </div>

            <div className="rw-input-row">
              <Label
                name="month"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Month
              </Label>
              <TextField
                name="month"
                defaultValue={selectedPeriod.month}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  required: true,
                  min: 1,
                  max: 12,
                  pattern: {
                    value: /^[1-9]|1[0-2]$/,
                    message: 'Please enter a valid month (1-12)'
                  }
                }}
              />
            </div>

            <div className="rw-input-row">
              <Label
                name="week"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Week (Optional)
              </Label>
              <TextField
                name="week"
                defaultValue={selectedPeriod.week}
                className="rw-input"
                errorClassName="rw-input rw-input-error"
                validation={{
                  pattern: {
                    value: /^[1-5]$/,
                    message: 'Please enter a valid week (1-5)'
                  }
                }}
              />
            </div>

            <div className="rw-button-group">
              <Submit className="rw-button rw-button-blue">
                Optimize Schedule
              </Submit>
            </div>
          </Form>
        </div>

        {/* Display optimization results here */}
        {selectedPeriod && (
          <div className="rw-segment-main">
            <h3>Selected Period:</h3>
            <p>Year: {selectedPeriod.year}</p>
            <p>Month: {selectedPeriod.month}</p>
            {selectedPeriod.week && <p>Week: {selectedPeriod.week}</p>}
          </div>
        )}
      </div>
    </>
  )
}

export default OptimizeSchedulePage
