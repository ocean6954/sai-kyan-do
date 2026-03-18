import { ref, onUnmounted } from 'vue'
import type { Todo } from '../types/todo'
import { useTodos } from './useTodos'

const terrorActive = ref(false)
const flashActive = ref(false)
const notificationPermission = ref<NotificationPermission>(
  'Notification' in window ? Notification.permission : 'denied'
)
let terrorInterval: ReturnType<typeof setInterval> | null = null

async function requestNotificationPermission() {
  if (!('Notification' in window)) return
  if (Notification.permission === 'default') {
    const result = await Notification.requestPermission()
    notificationPermission.value = result
  } else {
    notificationPermission.value = Notification.permission
  }
}

function sendNotification(todo: Todo) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('まだタスクやってないやつおる？', {
      body: `【期限超過】${todo.title} をやれ！！！`,
    })
  }
}

function getOverdueTodos(todos: Todo[]): Todo[] {
  const now = new Date()
  return todos.filter((t) => !t.completed && now > t.deadline)
}

function startTerror(todos: { value: Todo[] }) {
  if (terrorInterval) return

  terrorInterval = setInterval(() => {
    const overdue = getOverdueTodos(todos.value)

    if (overdue.length === 0) {
      terrorActive.value = false
      flashActive.value = false
      return
    }

    terrorActive.value = true
    flashActive.value = true

    for (const todo of overdue) {
      sendNotification(todo)
    }
  }, 500)
}

function stopTerror() {
  if (terrorInterval) {
    clearInterval(terrorInterval)
    terrorInterval = null
  }
  terrorActive.value = false
  flashActive.value = false
}

export function useTerrorMode() {
  requestNotificationPermission()

  const { todos } = useTodos()
  startTerror(todos)

  onUnmounted(() => {
    stopTerror()
  })

  return { terrorActive, flashActive, notificationPermission, requestNotificationPermission, stopTerror }
}
