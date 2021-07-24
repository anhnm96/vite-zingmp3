import { customRef } from 'vue'

export function useDebounceRef<T>(value: any, delay = 200) {
  let timeout: number
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
