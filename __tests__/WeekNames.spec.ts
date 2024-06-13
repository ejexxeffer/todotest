import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import WeekNames from '@/components/DatePicker/components/WeekNames.vue'

describe('Datepicker', () => {
  it('renders properly week started 1', async () => {
    const wrapper = mount(WeekNames, { props: { isoWeek: true, lang: 'en' } })
    await flushPromises()
    expect(wrapper.vm.isoWeek).toEqual(true)
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Mon')
    wrapper.unmount()
  })
  it('renders properly week started 0', async () => {
    const wrapper = mount(WeekNames, { props: { isoWeek: false, lang: 'en' } })
    await flushPromises()
    expect(wrapper.vm.isoWeek).toEqual(false)
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Sun')
    wrapper.unmount()
  })
  it('week is changed', async () => {
    const wrapper = mount(WeekNames, { props: { isoWeek: false, lang: 'en' } })
    await flushPromises()
    expect(wrapper.vm.isoWeek).toEqual(false)
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Sun')
    await wrapper.setProps({ isoWeek: true, lang: 'en' })
    await flushPromises()
    expect(wrapper.vm.isoWeek).toEqual(true)
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Mon')
    await wrapper.setProps({ isoWeek: false, lang: 'en' })
    await flushPromises()
    expect(wrapper.vm.isoWeek).toEqual(false)
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Sun')
    wrapper.unmount()
  })
  it('lang is changed', async () => {
    const wrapper = mount(WeekNames, { props: { isoWeek: true, lang: 'en' } })
    await flushPromises()
    expect(wrapper.vm.lang).toEqual('en')
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Mon')
    await wrapper.setProps({ isoWeek: true, lang: 'ru' })
    await flushPromises()
    expect(wrapper.vm.lang).toEqual('ru')
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('пн')
    await wrapper.setProps({ isoWeek: true, lang: 'en' })
    await flushPromises()
    expect(wrapper.vm.lang).toEqual('en')
    expect(wrapper.get('[data-test="week"]').find('p').text()).toMatch('Mon')
    wrapper.unmount()
  })
})
