<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue'
import type { Priority, PriorityClassT, TodoObj } from './TodoElementTypes'
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
const priorityClass = ref<PriorityClassT>('no-priority')
const priorityMap = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
  none: 'priority-none'
}
onMounted(() => {
  completed.value = props.todoValue.completed
  priorityClass.value = priorityMap[
    props.todoValue.priority.value
  ] as PriorityClassT
})
watch(
  () => props.todoValue.priority,
  () => {
    priorityClass.value = priorityMap[
      props.todoValue.priority.value
    ] as PriorityClassT
  }
)
watch(
  () => props.todoValue,
  () => {
    completed.value = props.todoValue.completed
  }
)
</script>
<template>
  <div class="main">
    <div v-show="!editTodo" class="item">
      <div :class="[priorityClass]" class="todo-priority"></div>
      <div class="element">
        <input
          class="toggle"
          type="checkbox"
          v-model="completed"
          @click="emit('complete-todo', props.todoValue)"
        />
        <p style="font-size: large; font-weight: bold">{{ todoValue.title }}</p>
        <p>{{ todoValue.description }}</p>
        <button
          class="button"
          @click.prevent="
            () => {
              editTodo = !editTodo
            }
          "
        >
          <span>edit</span>
        </button>
        <button
          class="button"
          @click.prevent="emit('delete-todo', props.todoValue)"
        >
          <span>delete</span>
        </button>
      </div>
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
<style scoped>
.main {
  width: 100%;
  display: flex;
}
.item {
  width: 100%;
}
.button {
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(206, 206, 206);
  justify-content: space-between;
  justify-self: end;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 6px 15px;
  border-style: none;
  gap: 10px;
  align-items: center;
  > .button_svg {
    margin: -4px;
    display: flex;
    min-width: 20px;
    min-height: 20px;
  }
}

.element {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  grid-column: auto;
  align-items: center;
}
.todo-priority {
  min-width: 70%;
  min-height: 10%;
  border-radius: 6px;
  position: inherit;
}
.priority-high {
  background-color: rgb(248, 28, 28);
}

.priority-medium {
  background-color: rgb(255, 185, 54);
}

.priority-low {
  background-color: rgb(43, 247, 43);
}

.priority-none {
  background-color: grey;
}
</style>
