import { ref, computed, ComputedRef, Ref } from 'vue'
import { upperFirst } from 'lodash-es'
import { AxiosError } from 'axios'
import { ApiStatus } from './index'
import { useEventHook } from '@/composables'

interface UseApiReturn<TResult, TVariables> extends NormalisedApiStatuses {
  data: Ref<TResult | undefined>
  status: Ref<ApiStatus>
  error: Ref<AxiosError | null>
  onSuccess: (fn: (param: TResult) => void) => {
    off: () => void
  }
  onError: (fn: (param: AxiosError) => void) => {
    off: () => void
  }
  exec: (variables?: TVariables) => void
  setStatus: (nextStatus: ApiStatus) => void
}

interface NormalisedApiStatuses {
  statusIdle?: ComputedRef<boolean>
  statusPending?: ComputedRef<boolean>
  statusSuccess?: ComputedRef<boolean>
  statusError?: ComputedRef<boolean>
}

const createNormalisedApiStatuses = (status: Ref<ApiStatus>) => {
  const normalisedApiStatuses = {}

  for (const [statusKey, statusValue] of Object.entries(ApiStatus)) {
    let propertyName = `status${upperFirst(statusKey.toLowerCase())}`

    // Create a computed that returns true/false based on
    // the currently selected status
    // @ts-ignore
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    )
  }

  return normalisedApiStatuses
}

export const useApi = <TResult = any, TVariables = any>(fn: Function, config: any = {}): UseApiReturn<TResult, TVariables> => {
  const { initialData, responseAdapter, minimumWait = 500 } = config
  // Reactive values to store data and API status
  const data = ref<TResult>()
  data.value = initialData
  const status = ref<ApiStatus>(ApiStatus.IDLE)
  const error = ref<AxiosError>()
  const resultEvent = useEventHook<TResult>()
  const errorEvent = useEventHook<AxiosError>()

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
      errorEvent.trigger(error)
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
    onError: errorEvent.on,
    exec,
    setStatus,
    ...createNormalisedApiStatuses(status)
  }
}
