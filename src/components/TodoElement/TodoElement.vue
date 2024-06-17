<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue'
import type { Priority, TodoObj } from './TodoElementTypes'
const props = defineProps<{
  todoValue: TodoObj
  priorities: Priority[]
}>()
const emit = defineEmits<{
  (e: 'edit-todo', value: TodoObj): void
  (e: 'delete-todo', value: TodoObj): void
  (e: 'complete-todo', value: TodoObj): void
}>()
const editTodo = ref<boolean>(false)
const completed = ref<boolean>(false)
onMounted(() => {
  completed.value = props.todoValue.completed
})
watch(
  () => props.todoValue,
  () => {
    completed.value = props.todoValue.completed
  }
)
</script>
<template>
  <div>
    <div v-show="!editTodo">
      <input
        class="toggle"
        type="checkbox"
        v-model="completed"
        @click="emit('complete-todo', props.todoValue)"
      />
      <p style="font-size: large; font-weight: bold">{{ todoValue.title }}</p>
      <p>{{ todoValue.description }}</p>
      <button
        @click.prevent="
          () => {
            editTodo = !editTodo
          }
        "
      >
        <span>edit</span>
      </button>
      <button @click.prevent="emit('delete-todo', props.todoValue)">
        <span>delete</span>
      </button>
    </div>
    <TodoEdit
      v-show="editTodo"
      :priorities="priorities"
      :todo-value="todoValue"
      @new-todo="
        (value: TodoObj) => {
          editTodo = !editTodo
          emit('edit-todo', value)
        }
      "
      @cancel="
        () => {
          editTodo = !editTodo
        }
      "
    />
  </div>
</template>
