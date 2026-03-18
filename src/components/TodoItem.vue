<script setup lang="ts">
import { computed } from 'vue'
import type { Todo } from '../types/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  complete: [id: string]
  delete: [id: string]
}>()

const isOverdue = computed(
  () => !props.todo.completed && new Date() > props.todo.deadline
)

const deadlineText = computed(() => {
  return props.todo.deadline.toLocaleString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <div
    class="item"
    :class="{ overdue: isOverdue, completed: todo.completed }"
  >
    <div class="content">
      <span class="title">{{ todo.title }}</span>
      <span class="deadline">{{ deadlineText }}</span>
    </div>
    <div class="actions">
      <button
        v-if="!todo.completed"
        class="btn-done"
        @click="emit('complete', todo.id)"
      >
        完了
      </button>
      <button class="btn-del" @click="emit('delete', todo.id)">×</button>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all 0.15s;
}

.overdue {
  border-color: var(--danger);
  background: rgba(239, 68, 68, 0.06);
}

.completed {
  opacity: 0.4;
}

.completed .title {
  text-decoration: line-through;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.title {
  font-size: 15px;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.deadline {
  font-size: 12px;
  color: var(--text);
}

.overdue .deadline {
  color: var(--danger);
}

.actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.btn-done,
.btn-del {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn-done {
  background: var(--accent);
  color: var(--bg);
}

.btn-del {
  background: transparent;
  color: var(--text);
}

.btn-done:hover,
.btn-del:hover {
  opacity: 0.7;
}
</style>
