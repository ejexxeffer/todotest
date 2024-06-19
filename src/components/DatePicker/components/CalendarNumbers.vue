<script setup lang="ts">
import type { TCalendarArr } from '@/components/DatePicker/DatePickerTypes'
interface IDate {
  id: number
  value: Date
}
interface IDay {
  id: number
  value: number | null
}
const props = withDefaults(
  defineProps<{
    arrays: TCalendarArr
    dateChosen: IDate
    emptySlots: number[]
    daysAct: number
    isEnabled?: boolean
    isShow?: boolean
    lang?: string
  }>(),
  {
    isEnabled: true,
    isShow: true,
    lang: 'en'
  }
)
const newDate = (value: IDay): Date => {
  if (value.id < 8 && Number(value.value) > 20 && value.value !== null) {
    let d = new Date(
      props.dateChosen.value.getFullYear(),
      props.dateChosen.value.getMonth(),
      0
    )
    d.setDate(Number(value.value))
    return d
  }
  if (value.id > 28 && Number(value.value) < 20 && value.value !== null) {
    return new Date(
      props.dateChosen.value.getFullYear(),
      props.dateChosen.value.getMonth() + 1,
      Number(value.value)
    )
  }
  return new Date(
    props.dateChosen.value.getFullYear(),
    props.dateChosen.value.getMonth(),
    Number(value.value)
  )
}
defineEmits<{
  (e: 'date', value: IDate): void
}>()
</script>

<template>
  <div class="flex justify-between" data-test="day">
    <div
      v-for="(array, i) in arrays"
      :key="i"
      class="flex flex-col items-center"
    >
      <div
        v-for="value in array"
        class="flex value_in_array"
        :class="[
          value.id === dateChosen.id ? `choosen` : '',
          value.id <= emptySlots[0] ? 'text-slate-400' : '',
          emptySlots[0] + daysAct + emptySlots[1] - value.id < emptySlots[1]
            ? 'text-slate-400'
            : ''
        ]"
        :key="value.id"
        @click="
          () => {
            if (value.value) {
              let d = newDate(value)
              $emit('date', { id: value.id, value: d })
            }
          }
        "
      >
        {{ value.value }}
      </div>
    </div>
  </div>
</template>
<style>
.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.value_in_array {
  box-sizing: border-box;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
}
.value_in_array:active {
  border: 0.2rem solid rgb(96 165 250);
}
.choosen {
  border: 0.2rem solid rgb(96 165 250);
}
.text-slate-400 {
  color: rgb(148 163 184);
}
</style>
