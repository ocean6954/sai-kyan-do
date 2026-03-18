import { ref, computed } from 'vue'
import type { Todo } from '../types/todo'

const todos = ref<Todo[]>([])

export function useTodos() {
  const addTodo = (title: string, deadline: Date) => {
    todos.value.push({
      id: crypto.randomUUID(),
      title,
      deadline,
      completed: false,
      createdAt: new Date(),
    })
  }

  const completeTodo = (id: string) => {
    const todo = todos.value.find((t) => t.id === id)
    if (todo) todo.completed = true
  }

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter((t) => t.id !== id)
  }

  const overdueTodos = computed(() =>
    todos.value.filter((t) => !t.completed && new Date() > t.deadline)
  )

  return { todos, addTodo, completeTodo, deleteTodo, overdueTodos }
}
