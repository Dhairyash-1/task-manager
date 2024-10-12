export const ItemTypes = {
  TASK: "task",
}
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value))

export function formatDate(dateString: Date | string | null) {
  if (dateString === null) return ""
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // getMonth() returns 0-11
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}
export function timeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diffInSeconds < minute) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day)
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week)
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month)
    return `${months} month${months > 1 ? "s" : ""} ago`
  } else {
    const years = Math.floor(diffInSeconds / year)
    return `${years} year${years > 1 ? "s" : ""} ago`
  }
}
export const validPriorities: Array<"low" | "high" | "urgent"> = [
  "low",
  "high",
  "urgent",
]

type TdayofWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

// timezone
export function convertDayOfWeekToUTC(localDayOfWeek: number): number {
  const currentDate = new Date()

  // Clone current date to avoid side-effects
  const adjustedDate = new Date(currentDate)

  // Set the date to match the local day of the week
  adjustedDate.setDate(
    currentDate.getDate() + (localDayOfWeek - currentDate.getDay())
  )

  // Convert adjusted date to UTC by applying timezone offset
  const utcEquivalentDate = new Date(
    adjustedDate.getTime() + adjustedDate.getTimezoneOffset() * 60000
  )

  // Return the day of the week in UTC (0-6 where 0 is Sunday)
  return utcEquivalentDate.getUTCDay()
}
