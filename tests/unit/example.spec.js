import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import DialogPromiseDemo from '@/demo/components/DialogPromiseDemo.vue'

describe('DialogPromiseDemo.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(DialogPromiseDemo, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
