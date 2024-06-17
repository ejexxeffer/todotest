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
  <div class="edit">
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
    <div>
      <Listbox v-if="priorities[0].value" v-model="priority">
        <ListboxButton class="button">
          {{ todoValue && !priority ? todoValue?.priority : priority }}
        </ListboxButton>
        <ListboxOptions class="menu">
          <ListboxOption
            v-for="priority in priorities"
            :key="priority.id"
            :value="priority.value"
          >
            {{ priority.value }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <button class="button" @click.prevent="cancelTodo">cancel</button>
    <button
      class="button"
      @click.prevent="addTodo"
      :disabled="!descriptionText && !titleText"
    >
      save
    </button>
  </div>
</template>
<style scoped>
.edit {
  display: flex;
  flex-direction: row;
  gap: 5px;
  /* display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  grid-column: auto;
  align-items: center; */
}
.menu {
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: absolute;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  margin-top: 0.25rem;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5rem;
  background-color: #ffffff;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: auto;
  max-height: 60rem;
  background-color: white;
  list-style: none;
  padding: 0.5rem 1rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.295),
    0 4px 6px -4px rgba(0, 0, 0, 0.295);
  /* width: 100%; */
  position: absolute;
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
</style>
