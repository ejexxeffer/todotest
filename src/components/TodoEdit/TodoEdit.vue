<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { Priority, TodoObj } from './TodoEditTypes'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'
import { deadlineCount } from '@/utils/deadlineCount'
import { deadlineMatch } from '@/utils/deadlineMatch'
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

const date = ref<Date>(new Date())
const deadline = ref<Date | null>(null)
// const deadlineDesc = ref<string>('')
const titleText = ref<string>('')
const descriptionText = ref<string>('')
const priority = ref<Priority>({ id: 4, value: 'none' })
const reset = () => {
  if (
    (descriptionText.value || titleText.value) &&
    (props.todoValue?.completed === null ||
      props.todoValue?.completed === undefined)
  ) {
    titleText.value = ''
    descriptionText.value = ''
    deadline.value = null
    date.value = new Date()
    priority.value = { id: 4, value: 'none' }
  }
  if (
    props.todoValue?.completed !== null ||
    props.todoValue?.completed !== undefined
  ) {
    titleText.value = props.todoValue?.title ? props.todoValue?.title : ''
    descriptionText.value = props.todoValue?.description
      ? props.todoValue?.description
      : ''
    priority.value = props.todoValue?.priority
      ? props.todoValue.priority
      : { id: 4, value: 'none' }
    deadline.value = props.todoValue?.deadline ? props.todoValue.deadline : null
    date.value = props.todoValue?.deadline
      ? props.todoValue.deadline
      : new Date()
  }
}
onMounted(() => {
  reset()
})
watch(
  () => props.todoValue,
  () => {
    reset()
  }
)

const addTodo = () => {
  emit('new-todo', {
    id: props.todoValue?.id || Date.now(),
    title: titleText.value || undefined,
    description: descriptionText.value || undefined,
    completed: props.todoValue?.completed || false,
    deadline: deadline.value,
    priority: priority.value
  })
  reset()
}
const cancelTodo = () => {
  emit('cancel')
  reset()
}
</script>

<template>
  <div :class="edit.edit">
    <div>
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
    </div>
    <div>
      <Popover :class="edit.popover">
        <PopoverButton :class="[edit.popover_button]">
          <span>{{ deadlineMatch(deadlineCount(date)) }}</span>
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
        </PopoverButton>

        <transition
          :enter-active-class="edit.transition"
          :enter-from-class="edit.opacity_0"
          :enter-to-class="edit.opacity_100"
          :leave-active-class="edit.transition"
          :leave-from-class="edit.opacity_100"
          :leave-to-class="edit.opacity_0"
        >
          <PopoverPanel :class="edit.popover_panel">
            <div :class="edit.popover_panel_inside">
              <div :class="edit.datepicker">
                <DatePicker
                  :date="date"
                  @date="
                    (value) => {
                      date = value
                    }
                  "
                />
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
      <Listbox v-if="priorities[0].value" v-model="priority" by="id">
        <div :class="edit.listbox_wrapper">
          <ListboxButton :class="[edit.list_button]">
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
            :enter-active-class="edit.transition"
            :enter-from-class="edit.opacity_0"
            :enter-to-class="edit.opacity_100"
            :leave-active-class="edit.transition"
            :leave-from-class="edit.opacity_100"
            :leave-to-class="edit.opacity_0"
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

      <button :class="edit.button" @click.prevent="cancelTodo">cancel</button>
      <button
        :class="[edit.button, edit.danger]"
        @click.prevent="addTodo"
        :disabled="!descriptionText && !titleText"
      >
        save
      </button>
    </div>
  </div>
</template>
<style module="edit">
.edit {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.edit > div {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.edit > div:nth-last-child(1) {
  justify-content: space-between;
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
.list_button:hover {
  background-color: gray;
  color: wheat;
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
  color: wheat;
}
.danger {
  background-color: rgb(238, 106, 106);
}
.grey {
  background-color: rgb(206, 206, 206);
}
.opacity_100 {
  opacity: 1;
}
.opacity_0 {
  opacity: 0;
}
.transition {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.popover_button {
  display: flex;
  flex-wrap: wrap;
  min-width: 6.2rem;
  align-items: center;
  justify-self: end;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  border-style: none;
  gap: 0.9rem;
  align-items: center;
}
.popover_button:hover {
  color: wheat;
  background-color: gray;
}
.popover_button:focus {
  outline: none;
}
.popover_button:focus-visible {
  box-shadow: 0px 0px 0px 4px #90bafb;
}
.popover {
  position: relative;
}
.popover_panel {
  position: absolute;
  left: 50%;
  z-index: 10;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.75rem;
  width: 100vw;
  max-width: 24rem;
}
.popover_panel_inside {
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.datepicker {
  padding: 0.8rem;
  background-color: white;
}
</style>
