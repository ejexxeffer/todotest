<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoEdit from '@/components/TodoEdit/TodoEdit.vue'
import type { Priority, PriorityClassT, TodoObj } from './TodoElementTypes'
const props = defineProps<{
  todoValue: TodoObj
  priorities: Priority[]
}>()
const emit = defineEmits<{
  (e: 'edit-todo', value: TodoObj): void
  (e: 'delete-todo', value: TodoObj): void
  (e: 'complete-todo', value: TodoObj): void
}>()
const editTodo = ref<boolean>(false)
const completed = ref<boolean>(false)
const priorityColor = ref<string>('#808080')
const priorityMap = {
  high: '#f81c1c',
  medium: '#ffb936',
  low: '#2bf72b',
  none: '#808080'
}
onMounted(() => {
  completed.value = props.todoValue.completed
  priorityColor.value = priorityMap[
    props.todoValue.priority.value
  ] as PriorityClassT
})
watch(
  () => props.todoValue.priority,
  () => {
    priorityColor.value = priorityMap[
      props.todoValue.priority.value
    ] as PriorityClassT
  }
)
watch(
  () => props.todoValue,
  () => {
    completed.value = props.todoValue.completed
  }
)
</script>
<template>
  <div :class="element.main">
    <div v-show="!editTodo" :class="element.item">
      <div :class="[element.priority, priorityColor]"></div>
      <div :class="element.element">
        <div :class="element.checkbox_wrapper">
          <div :class="element.round">
            <input
              type="checkbox"
              :id="$props.todoValue.id.toString()"
              v-model="completed"
            />
            <label
              for="checkbox-1"
              @click="emit('complete-todo', props.todoValue)"
            ></label>
          </div>
        </div>
        <!-- <div :class="element.input_wrap">
          <label for="" :class="element.input_label_wrap">
            <input
              :class="element.input"
              type="checkbox"
              v-model="completed"
              @click="emit('complete-todo', props.todoValue)"
            />
            <span
              class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
              :class="element.input_inside"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                :class="element.input_svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div> -->

        <p style="font-size: large; font-weight: bold">{{ todoValue.title }}</p>
        <p>{{ todoValue.description }}</p>
        <button
          :class="element.button"
          @click.prevent="
            () => {
              editTodo = !editTodo
            }
          "
          alt="edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="element.button_svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <button
          :class="element.button"
          @click.prevent="emit('delete-todo', props.todoValue)"
          alt="delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="element.button_svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
    <TodoEdit
      v-show="editTodo"
      :priorities="priorities"
      :todo-value="todoValue"
      @new-todo="
        (value: TodoObj) => {
          editTodo = !editTodo
          emit('edit-todo', value)
        }
      "
      @cancel="
        () => {
          editTodo = !editTodo
        }
      "
    />
  </div>
</template>
<style module="element">
.main {
  width: 100%;
  display: flex;
  justify-content: center;
}
.item {
  width: 100%;
}
/* .input {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  height: 1.25rem;
  width: 1.25rem;
  position: relative;
  border-radius: 0.375rem;
  border-width: 1px;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  appearance: none;
  cursor: pointer;
  border: rgba(0, 0, 0, 0.5) solid 1px;
}
.input:hover {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border-color: #3863c0;
  background-color: #1744a5;
  border: rgba(0, 0, 0, 0.5) solid 2px;
}
.input:hover::before {
  opacity: 0.1;
}
.input:focus {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(124, 255, 98, 0.815) solid 2px;
}
.input::before {
  content: ' ';
  height: 3rem;
  width: 3rem;
  display: block;
  border-radius: 9999px;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translateY(50%);
  transform: translateX(50%);
}
.input:checked {
  border-color: #111827;
  background-color: #111827;
}
.input:checked::before {
  background-color: #111827;
}
.input:checked::hover {
  border-color: #3863c0;
  background-color: #1744a5;
}
.input:hover:checked {
  border-color: #3863c0;
  background-color: #1744a5;
}
.input:active {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(124, 255, 98, 0.815) solid 2px;
}
.input_inside {
  position: absolute;
  color: #ff0000;
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translateY(50%);
  transform: translateX(50%);
  opacity: 0;
}
.input_wrap {
  display: inline-flex;
  align-items: center;
}
.input_label_wrap {
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 9999px;
}
.input_svg {
  height: 0.875rem;
  width: 0.875rem;
} */
.checkbox_wrapper .round {
  position: relative;
  margin-left: 1rem;
}

.checkbox_wrapper .round label {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  cursor: pointer;
  height: 28px;
  width: 28px;
  display: block;
}

.checkbox_wrapper .round label:after {
  border: 2px solid #fff;
  border-top: none;
  border-right: none;
  content: '';
  height: 6px;
  left: 8px;
  opacity: 0;
  position: absolute;
  top: 9px;
  transform: rotate(-45deg);
  width: 12px;
}

.checkbox_wrapper .round input[type='checkbox'] {
  visibility: hidden;
  display: none;
  opacity: 0;
}

.checkbox_wrapper .round input[type='checkbox']:checked + label {
  background-color: #66bb6a;
  border-color: #66bb6a;
}

.checkbox_wrapper .round input[type='checkbox']:checked + label:after {
  opacity: 1;
}
.button {
  display: flex;
  flex-wrap: wrap;
  min-width: 1.2rem;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  justify-self: end;
  border-radius: 0.2rem;
  box-sizing: border-box;
  padding: 0.4rem;
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
.button:hover {
  background-color: rgb(206, 206, 206);
}
.button:focus {
  border-style: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  outline: rgba(0, 0, 0, 0.5) solid 2px;
}
.element {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  grid-column: auto;
  align-items: center;
}
.priority {
  min-width: 70%;
  height: 0.4rem;
  border-radius: 6px;
  position: inherit;
  background-color: v-bind(priorityColor);
}
.priority_high {
  background-color: #f81c1c;
}

.priority_medium {
  background-color: #ffb936;
}

.priority_low {
  background-color: #2bf72b;
}

.priority_none {
  background-color: #808080;
}
</style>
