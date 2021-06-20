import { ref, computed, ComputedRef, Ref } from 'vue'
import { upperFirst } from 'lodash-es'
import { ApiStatus } from './index'
import { useEventHook } from '@/composables'

const createNormalisedApiStatuses = (status: Ref<ApiStatus>, apiName: string) => {
  const normalisedApiStatuses: Record<string, ComputedRef> = {}

  for (const [statusKey, statusValue] of Object.entries(ApiStatus)) {
    let propertyName = ''
    // Create a property name for each computed status
    if (apiName) {
      propertyName = `${apiName}Status${upperFirst(statusKey.toLowerCase())}`
    } else {
      propertyName = `status${statusKey.toLowerCase()}`
    }

    // Create a computed that returns true/false based on
    // the currently selected status
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    )
  }

  return normalisedApiStatuses
}

export const useApi = (apiName: string, fn: Function, config: any = {}) => {
  const { initialData, responseAdapter, minimumWait = 500 } = config
  // Reactive values to store data and API status
  const data = ref(initialData)
  const status = ref<ApiStatus>(ApiStatus.IDLE)
  const error = ref(null)
  const resultEvent = useEventHook()

  /**
   * Initialise the api request
   */
  const exec = async (...args: any) => {
    try {
      status.value = ApiStatus.PENDING
      // const response = await fn(...args)
      // data.value =
      //   typeof responseAdapter === 'function'
      //     ? responseAdapter(response)
      //     : response
      const response = await Promise.all(
        [fn(...args), new Promise(resolve => setTimeout(resolve, minimumWait))]
      )
      data.value =
        typeof responseAdapter === 'function'
          ? responseAdapter(response[0])
          : response[0]

      status.value = ApiStatus.SUCCESS
      resultEvent.trigger(data.value)
    } catch (error) {
      error.value = error
      status.value = ApiStatus.ERROR
    }
  }

  const setStatus = (nextStatus: ApiStatus) => (status.value = nextStatus)

  return {
    data,
    status,
    error,
    onSuccess: resultEvent.on,
    exec,
    setStatus,
    ...createNormalisedApiStatuses(status, apiName)
  }
}
