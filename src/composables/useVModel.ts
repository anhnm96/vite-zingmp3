import { computed, getCurrentInstance, WritableComputedRef } from 'vue'

export const useVModel = (props: any, propName: string) => {
  const vm = getCurrentInstance().proxy

  return computed({
    get() {
      return props[propName]
    },
    set(value) {
      vm.$emit(`update:${propName}`, value)
    }
  })
}
