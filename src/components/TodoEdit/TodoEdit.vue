<script setup lang="ts">
import { ref } from 'vue'

// import type {  } from './TodoInputTypes'
// import { onMounted, ref, watch } from 'vue'
const props = withDefaults(
  defineProps<{
    placeholder?: string
    disable?: boolean
  }>(),
  {
    placeholder: 'Write new todo here',
    disable: false,
    lang: 'en'
  }
)
const emit = defineEmits<{
  (e: 'newtodo', value: TodoObj): void
  (e: 'cancel'): void
}>()

const titleText = ref<string>('')
const descriptionText = ref<string>('')

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

const addTodo = () => {
  if (descriptionText.value) {
    emit('newtodo', {
      id: Date.now(),
      title: titleText.value || undefined,
      description: descriptionText.value,
      completed: false,
      deadline: null,
      priority: null
    })
    titleText.value = ''
    descriptionText.value = ''
  }
}
const cancelTodo = () => {
  emit('cancel')
  titleText.value = ''
  descriptionText.value = ''
}
</script>

<template>
  <div>
    <input
      :placeholder="placeholder + ' title'"
      v-model="titleText"
      @keyup.enter="addTodo"
    />
    <input
      autofocus
      :placeholder="placeholder + ' description'"
      v-model="descriptionText"
      @keyup.enter="addTodo"
    />
    <button @click.prevent="cancelTodo">cancel</button>
    <button @click.prevent="addTodo" :disabled="!descriptionText">save</button>
  </div>
</template>
