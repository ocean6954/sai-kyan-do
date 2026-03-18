<script setup lang="ts">
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'
import { useTerrorMode } from './composables/useTerrorMode'

const { todos, addTodo, completeTodo, deleteTodo } = useTodos()
const { flashActive } = useTerrorMode()
</script>

<template>
  <div class="app-root" :class="{ 'terror-flash': flashActive }">
    <main>
      <h1>1番ウザいTodoアプリ</h1>
      <TodoForm @add="addTodo" />
      <TodoList
        :todos="todos"
        @complete="completeTodo"
        @delete="deleteTodo"
      />
    </main>
  </div>
</template>

<style scoped>
main {
  max-width: 480px;
  margin: 0 auto;
  padding: 64px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-h);
  letter-spacing: -0.5px;
}
</style>

<style>
.terror-flash {
  animation: terror-bg 0.5s infinite alternate;
}

@keyframes terror-bg {
  from { background: var(--bg); }
  to { background: rgba(239, 68, 68, 0.25); }
}
</style>
