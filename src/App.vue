<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue'
import TodoItems from '@/components/TodoItems/TodoItems.vue'
import type { TodoObj } from '@/components/TodoEdit/TodoEditTypes'
import { editInArr } from '@/utils/editInArr'
import type { Priority } from '@/utils/UtilTypes'
const day = ref<number>(0)
const start = ref<boolean>(false)
const setStart = () => {
  start.value = !start.value
}
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
const priorities = ref<Priority[]>(
  JSON.parse(localStorage.getItem(PRIOR_KEY) || '[]') as Priority[]
)
const editTodo = ref<boolean>(false)
// // derived state
const todoAdd = (value: TodoObj) => {
  todos.value.push(value)
  editTodo.value = !editTodo.value
}
// this is old declaration now i can use this functionality
// with watch and ref

// const filteredTodos = computed(() => filters[visibility.value](todos.value))
// const remaining = computed(() => filters.active(todos.value).length)

// // handle routing
// window.addEventListener('hashchange', onHashChange)
// onHashChange()

// // persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})
// function toggleAll(e) {
//   todos.value.forEach((todo) => (todo.completed = e.target.checked))
// }

// function addTodo(e) {
//   const value = e.target.value.trim()
//   if (value) {
//     todos.value.push({
//       id: Date.now(),
//       title: value,
//       completed: false
//     })
//     e.target.value = ''
//   }
// }

// function removeTodo(todo) {
//   todos.value.splice(todos.value.indexOf(todo), 1)
// }

// let beforeEditCache = ''
// function editTodo(todo) {
//   beforeEditCache = todo.title
//   editedTodo.value = todo
// }

// function cancelEdit(todo) {
//   editedTodo.value = null
//   todo.title = beforeEditCache
// }

// function doneEdit(todo) {
//   if (editedTodo.value) {
//     editedTodo.value = null
//     todo.title = todo.title.trim()
//     if (!todo.title) removeTodo(todo)
//   }
// }

// function removeCompleted() {
//   todos.value = filters.active(todos.value)
// }

// function onHashChange() {
//   const route = window.location.hash.replace(/#\/?/, '')
//   if (filters[route]) {
//     visibility.value = route
//   } else {
//     window.location.hash = ''
//     visibility.value = 'all'
//   }
// }
// const editInArr = (value: TodoObj, values: TodoObj[]) => {
//   return values[values.indexOf(value)] = {...value}
// }
// const completeInArr = (value: TodoObj) => {
//   value.completed = !value.completed
//   todos.value[todos.value.indexOf(value)] = { ...value }
// }
</script>

<template>
  <section class="todoapp">
    <h1>Todos</h1>
    <button
      class="add-task"
      v-show="!editTodo"
      @click.prevent="
        () => {
          editTodo = !editTodo
        }
      "
    >
      <div class="add-task_svg">
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
    <section class="main" v-show="todos.length">
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

<style scoped>
header {
  line-height: 1.5;
}
.todoapp {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* > h1 {
    display: flex;
    align-items: center;
  } */
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 90%;
}
.add-task {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 6px 15px;
  border-style: none;
  gap: 10px;
  align-items: center;
  > .add-task_svg {
    margin: -4px;
    display: flex;
    min-width: 20px;
    min-height: 20px;
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
