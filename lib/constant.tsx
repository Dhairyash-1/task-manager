import LogoutButton from "@/components/LogoutButton"
import { PlusIcon } from "lucide-react"

const sideBarLinks = [
  {
    name: "Home",
    value: "home",
    src: "/home.png",
    url: "/",
  },
  {
    name: "Boards",
    value: "boards",
    src: "/boards.png",
    url: "/boards",
  },
  {
    name: "Settings",
    value: "settings",
    src: "/settings.png",
    url: "/settings",
  },
  {
    name: "Teams",
    value: "teams",
    src: "/teams.png",
    url: "/teams",
  },
  {
    name: "Analytics",
    value: "analytics",
    src: "/analytics.png",
    url: "/analytics",
  },
]

const cardData = [
  {
    icon: "/illust1.png",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    icon: "/illust2.png",
    title: "Share Notes Instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    icon: "/illust3.png",
    title: "Access Anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
]

const taskBarActionBtn = [
  {
    id: 1,
    label: "Calander View",
    icon: "/calander.png",
  },
  // {
  //   id: 2,
  //   label: "Automation",
  //   icon: "/automation.png",
  // },
  {
    id: 3,
    label: "Filter",
    icon: "/filter.png",
  },
  // {
  //   id: 4,
  //   label: "Share",
  //   icon: "/share.png",
  // },
]

const Tasks = [
  {
    title: "Implement User Authentication",
    description:
      "Develop and integrate user authentication using email and password.",
    priority: "Urgent",
    date: "2024-07-15",
    time: "5 days",
    status: "todo",
    label: "To do",
  },
  {
    title: "Design Landing Page",
    description: "Create a responsive design for the landing page.",
    priority: "Medium",
    date: "2024-07-12",
    time: "3 days",
    status: "inprogress",
    label: "In progress",
  },
  {
    title: "Set Up Database",
    description: "Set up the database schema and relationships.",
    priority: "Low",
    date: "2024-07-10",
    time: "7 days",
    status: "inprogress",
    label: "In progress",
  },
  {
    title: "Code Review for Payment Module",
    description: "Review the code for the payment module and provide feedback.",
    priority: "Medium",
    date: "2024-07-18",
    time: "2 days",
    status: "inreview",
    label: "In review",
  },
  {
    title: "Deploy Application",
    description: "Deploy the application to the production environment.",
    priority: "Urgent",
    date: "2024-07-20",
    time: "1 day",
    status: "finished",
    label: "Finished",
  },
]
const sideBarDropdownOptions = [
  {
    label: "Notification",
  },
  { label: "Theme" },
  {
    label: "Logout",
    customContent: <LogoutButton type="div" variant="dropdown" />,
  },
]

export {
  sideBarLinks,
  cardData,
  taskBarActionBtn,
  Tasks,
  sideBarDropdownOptions,
}
