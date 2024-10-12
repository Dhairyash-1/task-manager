import { Repeat } from "lucide-react"
import React, { useState, useEffect } from "react"

const WEEKDAYS = [
  { dayNumber: 1, dayName: "Monday" },
  { dayNumber: 2, dayName: "Tuesday" },
  { dayNumber: 3, dayName: "Wednesday" },
  { dayNumber: 4, dayName: "Thursday" },
  { dayNumber: 5, dayName: "Friday" },
  { dayNumber: 6, dayName: "Saturday" },
  { dayNumber: 0, dayName: "Sunday" },
]
type RecurrenceType = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY"
interface RecurringTaskProps {
  defaultRecurrence?: RecurrenceType
  defaultDayOfWeek?: number
  defaultDateOfMonth?: number
  onChange: (recurrence: RecurrenceState) => void
}
interface RecurrenceState {
  frequency: RecurrenceType
  dayOfWeek?: number
  dateOfMonth?: number
}

const RecurringTask: React.FC<RecurringTaskProps> = ({
  defaultRecurrence = "NONE",
  defaultDayOfWeek,
  defaultDateOfMonth,
  onChange,
}) => {
  const [frequency, setFrequency] = useState<RecurrenceType>(defaultRecurrence)

  const [dayOfWeek, setDayOfWeek] = useState<number | undefined>(
    defaultDayOfWeek
  )
  const [dateOfMonth, setDateOfMonth] = useState<number | undefined>(
    defaultDateOfMonth
  )

  useEffect(() => {
    onChange({
      frequency,
      dayOfWeek: frequency === "WEEKLY" ? dayOfWeek : undefined,
      dateOfMonth: frequency === "MONTHLY" ? dateOfMonth : undefined,
    })
  }, [frequency, dayOfWeek, dateOfMonth, onChange])

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value as "DAILY" | "WEEKLY" | "MONTHLY")
  }

  const handleDayOfWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek(Number(e.target.value))
  }

  const handleDateOfMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfMonth((prev) => Number(e.target.value)) // Using the callback to ensure proper state update
  }

  return (
    <div className="space-y-4">
      {/* Frequency Selector */}
      <div className="grid grid-cols-4">
        <div className={`col-span-1 flex items-center gap-6 `}>
          <Repeat className="h-6 w-6" color="#797979" />
          <label className="text-gray-700">Recurring</label>
        </div>
        <select
          className="p-2 border rounded col-span-1"
          value={frequency}
          onChange={handleFrequencyChange}
        >
          <option value="NONE">No repeat</option>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </div>

      {/* Day of Week Selector */}
      {frequency === "WEEKLY" && (
        <div className="flex flex-col gap-2">
          <label className="text-gray-700">Repeat On</label>
          <div className="flex gap-4">
            {WEEKDAYS.map((day) => (
              <label key={day.dayNumber} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="dayOfWeek"
                  value={day.dayNumber}
                  checked={dayOfWeek === day.dayNumber}
                  onChange={handleDayOfWeekChange}
                />
                {day.dayName}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Date of Month Selector */}
      {frequency === "MONTHLY" && (
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Repeat On Date</label>
          <input
            className="p-2 border rounded"
            type="number"
            min="1"
            max="31"
            value={dateOfMonth}
            onChange={handleDateOfMonthChange}
            placeholder="1-31"
          />
        </div>
      )}
    </div>
  )
}

export default RecurringTask
