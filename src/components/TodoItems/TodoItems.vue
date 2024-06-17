<script setup lang="ts">
// import { ref } from 'vue'
import type { Priority, TodoObj } from './TodoItemsTypes'
import TodoElement from '@/components/TodoElement/TodoElement.vue'
const props = withDefaults(
  defineProps<{
    todos: TodoObj[]
    priorities: Priority[]
    disable?: boolean
  }>(),
  {
    disable: false
  }
)
const emit = defineEmits<{
  (e: 'edit-todo', value: TodoObj): void
  (e: 'delete-todo', value: TodoObj): void
  (e: 'complete-todo', value: TodoObj): void
}>()
// onMounted(() => {
//   savedDate.value = props.date
//   day.value = props.date.getDate()
//   month.value = props.date.getMonth()
//   year.value = props.date.getFullYear()
//   savedLang.value = props.lang
// })
// watch(
//   () => props.isoWeek,
//   () => {
//     emptySlots.value = calcEmptySlots(
//       daysInMonth(year.value, month.value),
//       year.value,
//       month.value,
//       props.isoWeek,
//       props.before,
//       props.after
//     )
//   }
// )
</script>
<template>
  <ul class="main">
    <li v-for="todo in todos" :key="todo.id" class="items">
      <TodoElement
        :priorities="priorities"
        :todoValue="todo"
        @edit-todo="
          (value: TodoObj) => {
            emit('edit-todo', value)
          }
        "
        @complete-todo="
          (value: TodoObj) => {
            emit('complete-todo', value)
          }
        "
        @delete-todo="
          (value: TodoObj) => {
            emit('delete-todo', value)
          }
        "
      />
    </li>
  </ul>
</template>
<style scoped>
header {
  line-height: 1.5;
}
.items {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.main {
  display: flex;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
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
