<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue'
import TodoItems from '@/components/TodoItems/TodoItems.vue'
import type { TodoObj } from '@/components/TodoEdit/TodoEditTypes'
import { editInArr } from '@/utils/editInArr'
import type { Priority } from '@/utils/UtilTypes'
// const lang = ref<Locales>('en')
// const setLang = () => {
//   lang.value = lang.value === 'en' ? 'ru' : 'en'
// }
const STORAGE_KEY = 'todo_test'
const PRIOR_KEY = 'priorities'

// const filters = {
//   all: (todos) => todos,
//   active: (todos) => todos.filter((todo) => !todo.completed),
//   completed: (todos) => todos.filter((todo) => todo.completed)
// }

// state
const todos = ref<TodoObj[]>(
  JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as TodoObj[]
)
// mock data
const priorities = ref<Priority[]>(
  JSON.parse(
    localStorage.getItem(PRIOR_KEY) ||
      '[{"id":1,"value":"high"},{"id":2,"value":"medium"},{"id":3,"value":"low"},{"id":4,"value":"none"}]'
  ) as Priority[]
)
const editTodo = ref<boolean>(false)
// // derived state
const todoAdd = (value: TodoObj) => {
  todos.value.push(value)
  editTodo.value = !editTodo.value
}

onMounted(() => {
  localStorage.setItem(
    PRIOR_KEY,
    JSON.stringify([
      { id: 1, value: 'high' },
      { id: 2, value: 'medium' },
      { id: 3, value: 'low' },
      { id: 4, value: 'none' }
    ])
  )
})

// this is old declaration now i can use this functionality
// with watch and ref

// const filteredTodos = computed(() => filters[visibility.value](todos.value))
// const remaining = computed(() => filters.active(todos.value).length)

watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})
// function toggleAll(e) {
//   todos.value.forEach((todo) => (todo.completed = e.target.checked))
// }
</script>

<template>
  <section :class="app.todoapp">
    <h1>Todos</h1>
    <button
      :class="app.button"
      v-show="!editTodo"
      @click.prevent="
        () => {
          editTodo = !editTodo
        }
      "
    >
      <div :class="app.button_svg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <span>Add task</span>
    </button>
    <form v-show="editTodo">
      <TodoEdit
        :placeholder="'Write here'"
        :priorities="priorities"
        @new-todo="todoAdd"
        @cancel="
          () => {
            editTodo = !editTodo
          }
        "
      />
    </form>
    <section :class="app.main" v-show="todos.length">
      <TodoItems
        :priorities="priorities"
        :todos="todos"
        @edit-todo="
          (value) => {
            todos = editInArr(value, todos)
          }
        "
        @complete-todo="
          (value) => {
            todos = editInArr({ ...value, completed: !value.completed }, todos)
          }
        "
        @delete-todo="
          (value) => {
            todos.splice(todos.indexOf(value), 1)
          }
        "
      />
    </section>
  </section>
</template>

<style module="app">
header {
  line-height: 1.5;
}
.todoapp {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  > h1 {
    color: rgb(36, 36, 36);
  }
}
/* .form {
  display: flex;
  flex-direction: row;
} */
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 640px;
}
.button {
  display: flex;
  font-size: medium;
  flex-wrap: wrap;
  background-color: rgb(69, 150, 241);
  color: rgb(253, 252, 246);
  justify-content: space-between;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 12px 20px 10px;
  border-style: none;
  gap: 10px;
  align-items: start;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.16),
    0 8px 10px -6px rgba(0, 0, 0, 0.16);
  > .button_svg {
    margin-left: -4px;
    line-height: 1;
    display: flex;
    min-width: 20px;
    min-height: 20px;
  }
  > span {
    line-height: 1.5;
    font-size: medium;
  }
}
/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
