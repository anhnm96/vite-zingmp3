import { onUnmounted, ref, Ref } from 'vue'

const useTimer = (
  callback: () => any = () => {},
  delay: number
): {
  start: () => void
  stop: () => void
  clear: () => void
  progress: Ref<number>
} => {
  let timeoutId: number
  let intervalId: number
  let startTime: number
  let endTime: number
  let remainingTime = delay

  const progress = ref(100)

  const stop = () => {
    clearInterval(intervalId)
    clearTimeout(timeoutId)
    remainingTime -= Date.now() - startTime
  }

  const start = () => {
    startTime = Date.now()
    endTime = Date.now() + remainingTime
    intervalId = setInterval(() => {
      progress.value = ((endTime - Date.now()) / delay) * 100
    }, 20)
    timeoutId = setTimeout(() => {
      callback()
      clear()
    }, remainingTime)
  }

  const clear = () => {
    clearInterval(intervalId)
    clearTimeout(timeoutId)
  }

  onUnmounted(() => {
    clear()
  })

  return { start, stop, clear, progress }
}

export default useTimer
