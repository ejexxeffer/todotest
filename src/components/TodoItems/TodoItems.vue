<script setup lang="ts">
import { ref } from 'vue';
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue';

// import type {  } from './TodoInputTypes'
// import { onMounted, ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    todos: TodoObj[],
    disable?: boolean,
  }>(),
  {
    disable:false,
  }
)
const emit = defineEmits<{
  (e: 'newtodo', value: TodoObj): void
}>()
const editTodo = ref<boolean>(false)
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

const addTodo = (e:KeyboardEvent) => {
  const value = (e.target as HTMLInputElement).value.trim()
  // if (value) {
  //   (e.target as HTMLInputElement).value = ''
  //   emit("newtodo", {
  //     id: Date.now(),
  //     title: value,
  //     completed: false,
  //     deadline: null,
  //     priority: null,
  //   })
  // }
}
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <input type="radio" >
      <p>{{ todo.title }}</p>
      <p>{{ todo.description }}</p>
      <button v-show="!editTodo" @click.prevent="() =>{editTodo = !editTodo}"><span>edit</span></button>
      <TodoEdit v-show="editTodo" @newtodo="() => {editTodo = !editTodo
      }" @cancel="() => {editTodo = !editTodo
      }"/>
    </li>
  </ul>
</template>
