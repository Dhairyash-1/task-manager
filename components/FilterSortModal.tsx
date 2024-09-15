import { useState } from "react"
import { X, ChevronDown, ChevronUp, Lightbulb, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker" // Assuming you have this component
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Section = "status" | "priority" | "dueDate" | "tags" | "assignee"
interface ExpandedSections {
  status: boolean
  priority: boolean
  dueDate: boolean
  tags: boolean
  assignee: boolean
}

export default function FilterSortModal({
  isOpen = true,
  onClose = () => (isOpen = false),
}) {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    status: true,
    priority: false,
    dueDate: false,
    tags: false,
    assignee: false,
  })

  const toggleSection = (section: Section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] h-[90%] bg-white overflow-y-scroll custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Filter and Sort Tasks
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button> */}
          <p className="text-sm text-gray-500 mt-2">
            Refine your tasks by applying multiple filters and sorting options.
          </p>
        </DialogHeader>

        <div className="space-y-6 my-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Filter Tasks
            </h3>

            {/* Status Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("status")}
              >
                <h4 className="font-medium text-gray-700">Status</h4>
                {expandedSections.status ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedSections.status && (
                <div className="mt-2 space-y-2">
                  {[
                    { label: "To Do", color: "bg-gray-200 text-gray-800" },
                    {
                      label: "In Progress",
                      color: "bg-blue-200 text-blue-800",
                    },
                    {
                      label: "In Review",
                      color: "bg-yellow-200 text-yellow-800",
                    },
                    { label: "Finished", color: "bg-green-200 text-green-800" },
                  ].map((status) => (
                    <div
                      key={status.label}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox id={`status-${status.label}`} />
                      <Label
                        htmlFor={`status-${status.label}`}
                        className="flex items-center space-x-2"
                      >
                        <Badge className={`${status.color} font-normal`}>
                          {status.label}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Priority Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("priority")}
              >
                <h4 className="font-medium text-gray-700">Priority</h4>
                {expandedSections.priority ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedSections.priority && (
                <div className="mt-2 space-y-2">
                  {[
                    { label: "Urgent", color: "bg-red-200 text-red-800" },
                    { label: "Medium", color: "bg-orange-200 text-orange-800" },
                    { label: "Low", color: "bg-green-200 text-green-800" },
                  ].map((priority) => (
                    <div
                      key={priority.label}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox id={`priority-${priority.label}`} />
                      <Label
                        htmlFor={`priority-${priority.label}`}
                        className="flex items-center space-x-2"
                      >
                        <Badge className={`${priority.color} font-normal`}>
                          {priority.label}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Due Date Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("dueDate")}
              >
                <h4 className="font-medium text-gray-700">Due Date</h4>
                {expandedSections.dueDate ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedSections.dueDate && (
                <div className="mt-2 space-y-2">
                  {/* <div className="flex space-x-2">
                    <DatePicker />
                  </div> */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Today",
                      "Tomorrow",
                      "This Week",
                      "This Month",
                      "Overdue",
                    ].map((range) => (
                      <Badge
                        key={range}
                        variant="outline"
                        className="cursor-pointer hover:bg-purple-100 hover:text-purple-800"
                      >
                        {range}
                      </Badge>
                    ))}
                    <DatePicker />
                  </div>
                </div>
              )}
            </div>

            {/* Tags Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("tags")}
              >
                <h4 className="font-medium text-gray-700">Tags</h4>
                {expandedSections.tags ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedSections.tags && (
                <div className="mt-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tag1">Tag 1</SelectItem>
                      <SelectItem value="tag2">Tag 2</SelectItem>
                      <SelectItem value="tag3">Tag 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Assignee Filter */}
            <div className="mb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("assignee")}
              >
                <h4 className="font-medium text-gray-700">Assignee</h4>
                {expandedSections.assignee ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
              {expandedSections.assignee && (
                <div className="mt-2">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select assignees" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user1">User 1</SelectItem>
                      <SelectItem value="user2">User 2</SelectItem>
                      <SelectItem value="user3">User 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Sort Tasks
            </h3>
            <RadioGroup defaultValue="due-date-asc">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="due-date-asc" id="due-date-asc" />
                <Label htmlFor="due-date-asc" className="text-gray-700">
                  Due Date: Ascending
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="due-date-desc" id="due-date-desc" />
                <Label htmlFor="due-date-desc" className="text-gray-700">
                  Due Date: Descending
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="priority-high-low"
                  id="priority-high-low"
                />
                <Label htmlFor="priority-high-low" className="text-gray-700">
                  Priority: High to Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="priority-low-high"
                  id="priority-low-high"
                />
                <Label htmlFor="priority-low-high" className="text-gray-700">
                  Priority: Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="created-newest" id="created-newest" />
                <Label htmlFor="created-newest" className="text-gray-700">
                  Date Created: Newest First
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="created-oldest" id="created-oldest" />
                <Label htmlFor="created-oldest" className="text-gray-700">
                  Date Created: Oldest First
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-asc" id="name-asc" />
                <Label htmlFor="name-asc" className="text-gray-700">
                  Task Name: A-Z
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name-desc" id="name-desc" />
                <Label htmlFor="name-desc" className="text-gray-700">
                  Task Name: Z-A
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <DialogFooter className="flex  sm:justify-between">
          <Button variant="outline" onClick={onClose} className="text-gray-700">
            Cancel
          </Button>
          <Button variant="outline" className="text-gray-700">
            Clear Filters
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 justify-self-end">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
