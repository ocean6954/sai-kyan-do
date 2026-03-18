<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  add: [title: string, deadline: Date]
}>()

const title = ref('')
const deadlineStr = ref('')

function handleSubmit() {
  if (!title.value.trim() || !deadlineStr.value) return
  emit('add', title.value.trim(), new Date(deadlineStr.value))
  title.value = ''
  deadlineStr.value = ''
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <input
      v-model="title"
      type="text"
      placeholder="タスクを入力..."
      class="input"
    />
    <input
      v-model="deadlineStr"
      type="datetime-local"
      class="input input-date"
    />
    <button type="submit" class="btn">追加</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-h);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.input::placeholder {
  color: var(--text);
}

.input:focus {
  border-color: var(--accent);
}

.input-date {
  color-scheme: light dark;
}

.btn {
  padding: 10px;
  border: 1px solid var(--accent);
  border-radius: 6px;
  background: var(--accent);
  color: var(--bg);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover {
  opacity: 0.8;
}
</style>
