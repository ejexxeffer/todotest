<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue';
import TodoItems from '@/components/TodoItems/TodoItems.vue';
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

// const filters = {
//   all: (todos) => todos,
//   active: (todos) => todos.filter((todo) => !todo.completed),
//   completed: (todos) => todos.filter((todo) => todo.completed)
// }

// state
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))
const editTodo = ref<boolean>(false)
// // derived state
const todoAdd = (value: TodoObj) => {
  todos.value.push(value)
  editTodo.value = !editTodo.value
  console.log(value)
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
</script>

<template>
  <section class="todoapp">
      <h1>Todos</h1>
      <!-- <input
        class="new-todo"
        autofocus
        placeholder="What needs to be done?"
        @keyup.enter="addTodo"
      > -->
      <button v-show="!editTodo" @click.prevent="()=>{editTodo = !editTodo}"><div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</div><span>Add task</span></button>
      <form v-show="editTodo"><TodoEdit :placeholder="'Write here'" @newtodo="todoAdd" @cancel="() => {editTodo = !editTodo}"/></form>
    <section class="main" v-show="todos.length">
      <TodoItems :todos="todos"/>
      <!-- <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vue:mounted="({ el }) => el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          >
        </li>
      </ul> -->
    </section>
    <!-- <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? ' item' : ' items' }} left</span>
      </span>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }">Active</a>
        </li>
        <li>
          <a href="#/completed" :class="{ selected: visibility === 'completed' }">Completed</a>
        </li>
      </ul>
      <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
        Clear completed
      </button>
    </footer> -->
  </section>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
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
}
</style>
