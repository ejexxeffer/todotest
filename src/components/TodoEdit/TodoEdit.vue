<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Priority, TodoObj } from './TodoEditTypes'
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
const priority = ref<Priority>({ id: 4, value: 'none' })
onMounted(() => {
  titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
  descriptionText.value = props.todoValue?.description
    ? props.todoValue?.description
    : ''
  priority.value = props.todoValue?.priority
    ? props.todoValue.priority
    : { id: 4, value: 'none' }
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
      : { id: 4, value: 'none' }
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
    priority.value = { id: 4, value: 'none' }
  }
}
const cancelTodo = () => {
  emit('cancel')
  titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
  descriptionText.value = props.todoValue?.description
    ? props.todoValue?.description
    : ''
  priority.value = props.todoValue?.priority
    ? props.todoValue?.priority
    : { id: 4, value: 'none' }
}
</script>

<template>
  <div :class="edit.edit">
    <input
      :class="edit.input"
      :placeholder="placeholder + ' title'"
      v-model="titleText"
      @keydown.enter="addTodo"
    />
    <input
      autofocus
      :class="edit.input"
      :placeholder="placeholder + ' description'"
      v-model="descriptionText"
      @keydown.enter="addTodo"
    />
    <div>
      <Listbox v-if="priorities[0].value" v-model="priority" by="id">
        <div :class="edit.listbox_wrapper">
          <ListboxButton :class="[edit.list_button, edit.grey]">
            <span :class="edit.listtext">
              {{
                todoValue && !priority ? todoValue?.priority : priority.value
              }}
            </span>
            <span :class="edit.list_button_icon">
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
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </span>
          </ListboxButton>
          <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions :class="edit.menu">
              <ListboxOption
                v-slot="{ active, selected }"
                v-for="priority in priorities"
                :key="priority.id"
                :value="priority"
                as="template"
              >
                <li :class="[active ? edit.elementactive : '', edit.element]">
                  <span :class="edit.listtext">{{ priority.value }}</span>
                  <span :class="edit.listicon">
                    <svg
                      v-show="selected"
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
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <button :class="edit.button" @click.prevent="cancelTodo">cancel</button>
    <button
      :class="[edit.button, edit.danger]"
      @click.prevent="addTodo"
      :disabled="!descriptionText && !titleText"
    >
      save
    </button>
  </div>
</template>
<style module="edit">
.edit {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.menu {
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: absolute;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 9rem;
  max-height: 80rem;
  background-color: white;
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.295),
    0 4px 6px -4px rgba(0, 0, 0, 0.295);
}
.elementactive {
  background-color: rgb(184, 184, 184);
}
.element {
  box-sizing: border-box;
  position: relative;
  user-select: none;
  width: 100%;
  overflow: hidden;
  padding: 0.35rem 2.5rem;
  gap: 10rem;
}
.list_wrapper {
  position: relative;
}
.listtext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list_button {
  display: flex;
  min-width: 5rem;
  position: relative;
  align-items: center;
  justify-self: end;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-style: none;
  /* gap: 0.9rem; */
  align-items: center;
}
.list_button_icon {
  top: 0px;
  bottom: 0px;
  right: 0px;
  display: flex;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  align-items: center;
  position: absolute;
  > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
.listicon {
  top: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  align-items: center;
  position: absolute;
  > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
.input {
  padding: 6px 15px;
  border-radius: 6px;
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(0, 0, 0, 0.295) solid 1px;
}

.input:focus {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(0, 0, 0, 0.5) solid 2px;
}
.input:focus-visible {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(0, 0, 0, 0.5) solid 2px;
}
.button {
  display: flex;
  flex-wrap: wrap;
  min-width: 5rem;
  align-items: center;
  justify-content: center;
  justify-self: end;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-style: none;
  gap: 0.9rem;
  align-items: center;
  > .button_svg {
    margin: -4px;
    display: flex;
    min-width: 20px;
    min-height: 20px;
  }
}
.button:focus {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(0, 0, 0, 0.5) solid 2px;
}
.button:hover {
  background-color: gray;
}
.danger {
  background-color: rgb(238, 106, 106);
}
.grey {
  background-color: rgb(206, 206, 206);
}
</style>
