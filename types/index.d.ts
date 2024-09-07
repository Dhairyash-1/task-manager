interface CreateTodoParams {
  title: string
  description?: string
  status: "todo" | "inprogress" | "inreview" | "finished"
  priority?: "low" | "high" | "urgent"
  deadline?: string
  content?: string
  path: string
  owner: string
}
interface GetTodoByIdParams {
  id: string
}
interface GetAllUserTodoParams {
  userId: string
}
interface UpdateTodoParams {
  id: string
  updateData: {
    title?: string
    description?: string
    status: "todo" | "inprogress" | "inreview" | "finished"
    status?: string
    priority?: "low" | "high" | "urgent"
    deadline?: string
    owner: string
  }
  path: string
}
interface DeleteTodoParams {
  id: string
  path: string
}
type TStatus = "todo" | "inprogress" | "inreview" | "finished"
type TPriority = "low" | "high" | "urgent"
