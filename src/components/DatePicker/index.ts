import type { App } from 'vue'
import DatePicker from './DatePicker.vue'
import '@/assets/main.css'

const useDatePicker = {
  install: (app: App) => {
    app.component('Datepicker', DatePicker)
  }
}
export * from '@/components/DatePicker'
export { DatePicker, useDatePicker }
