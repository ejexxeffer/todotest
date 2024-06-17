<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Priority, PriorityT, TodoObj } from './TodoEditTypes'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
const props = withDefaults(
  defineProps<{
    priorities: Priority[]
    todoValue?: TodoObj | null
    placeholder?: string
    disable?: boolean
  }>(),
  {
    todoVlaue: null,
    placeholder: 'Write new todo here',
    disable: false,
    lang: 'en'
  }
)
const emit = defineEmits<{
  (e: 'new-todo', value: TodoObj): void
  (e: 'cancel'): void
}>()

const titleText = ref<string>('')
const descriptionText = ref<string>('')
const priority = ref<PriorityT>('none')
onMounted(() => {
  titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
  descriptionText.value = props.todoValue?.description
    ? props.todoValue?.description
    : ''
  priority.value = props.todoValue?.priority ? props.todoValue.priority : 'none'
})
watch(
  () => props.todoValue,
  () => {
    titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
    descriptionText.value = props.todoValue?.description
      ? props.todoValue?.description
      : ''
    priority.value = props.todoValue?.priority
      ? props.todoValue.priority
      : 'none'
  }
)

const addTodo = () => {
  if (descriptionText.value || titleText.value) {
    console.log('fired one addTodo')
    emit('new-todo', {
      id: props.todoValue?.id || Date.now(),
      title: titleText.value || undefined,
      description: descriptionText.value || undefined,
      completed: false,
      deadline: null,
      priority: priority.value
    })
    titleText.value = ''
    descriptionText.value = ''
  }
  // if (
  //   descriptionText.value !== props.todoValue?.description ||
  //   titleText.value !== props.todoValue?.title ||
  //   (priority.value !== props.todoValue?.priority && props.todoValue.id)
  // ) {
  //   console.log('fired TWO addTodo')
  //   emit('new-todo', {
  //     id: props.todoValue?.id || Date.now(),
  //     title: titleText.value || undefined,
  //     description: descriptionText.value || undefined,
  //     completed: false,
  //     deadline: null,
  //     priority: priority.value
  //   })
  //   titleText.value = ''
  //   descriptionText.value = ''
  // }
}
const cancelTodo = () => {
  emit('cancel')
  titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
  descriptionText.value = props.todoValue?.description
    ? props.todoValue?.description
    : ''
}
</script>

<template>
  <div>
    <input
      :placeholder="placeholder + ' title'"
      v-model="titleText"
      @keydown.enter="addTodo"
    />
    <input
      autofocus
      :placeholder="placeholder + ' description'"
      v-model="descriptionText"
      @keydown.enter="addTodo"
    />
    <Listbox v-if="priorities[0].value" v-model="priority">
      <ListboxButton>
        {{ todoValue && !priority ? todoValue?.priority : priority }}
      </ListboxButton>
      <ListboxOptions>
        <ListboxOption
          v-for="priority in priorities"
          :key="priority.id"
          :value="priority.value"
        >
          {{ priority.value }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <button @click.prevent="cancelTodo">cancel</button>
    <button @click.prevent="addTodo" :disabled="!descriptionText && !titleText">
      save
    </button>
  </div>
</template>
