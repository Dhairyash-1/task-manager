import { Repeat } from "lucide-react"
import React, { useState, useEffect } from "react"

interface RecurringTaskProps {
  defaultRecurrence?: "daily" | "weekly" | "monthly"
  defaultDayOfWeek?: string
  defaultDateOfMonth?: number
  onChange: (recurrence: RecurrenceState) => void
}

interface RecurrenceState {
  frequency: "daily" | "weekly" | "monthly"
  dayOfWeek?: string
  dateOfMonth?: number
}

const RecurringTask: React.FC<RecurringTaskProps> = ({
  defaultRecurrence = "off",
  defaultDayOfWeek,
  defaultDateOfMonth,
  onChange,
}) => {
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    defaultRecurrence
  )
  const [dayOfWeek, setDayOfWeek] = useState<string | undefined>(
    defaultDayOfWeek
  )
  const [dateOfMonth, setDateOfMonth] = useState<number | undefined>(
    defaultDateOfMonth
  )

  useEffect(() => {
    onChange({
      frequency,
      dayOfWeek: frequency === "weekly" ? dayOfWeek : undefined,
      dateOfMonth: frequency === "monthly" ? dateOfMonth : undefined,
    })
  }, [frequency, dayOfWeek, dateOfMonth])

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(e.target.value as "daily" | "weekly" | "monthly")
  }

  const handleDayOfWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek(e.target.value)
  }

  const handleDateOfMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfMonth(Number(e.target.value))
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
          <option value="off">No repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Day of Week Selector */}
      {frequency === "weekly" && (
        <div className="flex flex-col gap-2">
          <label className="text-gray-700">Repeat On</label>
          <div className="flex gap-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label key={day} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="dayOfWeek"
                  value={day}
                  checked={dayOfWeek === day}
                  onChange={handleDayOfWeekChange}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Date of Month Selector */}
      {frequency === "monthly" && (
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Repeat On Date</label>
          <input
            className="p-2 border rounded"
            type="number"
            min="1"
            max="31"
            value={dateOfMonth || ""}
            onChange={handleDateOfMonthChange}
            placeholder="1-31"
          />
        </div>
      )}
    </div>
  )
}

export default RecurringTask
