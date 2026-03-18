<script setup lang="ts">
import type { Todo } from '../types/todo'
import TodoItem from './TodoItem.vue'

defineProps<{
  todos: Todo[]
}>()

const emit = defineEmits<{
  complete: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <div class="list">
    <TransitionGroup name="list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @complete="emit('complete', $event)"
        @delete="emit('delete', $event)"
      />
    </TransitionGroup>
    <p v-if="todos.length === 0" class="empty">タスクなし</p>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.empty {
  color: var(--text);
  font-size: 13px;
  text-align: center;
  padding: 24px 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
