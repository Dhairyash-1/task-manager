import axios from "axios"

export async function fetchTodos() {
  const res = await axios.get("/api/todo/all")
  console.log("alltodo", res)
  return res.data.todo
}

export async function createTodo(todo: any) {
  const res = await axios.post("/api/todo/create", JSON.stringify(todo))
  return res
}
