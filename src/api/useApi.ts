import { ref, computed, ComputedRef, Ref } from 'vue'
import { upperFirst } from 'lodash-es'
import { AxiosPromise, AxiosResponse } from 'axios'
import { ApiStatus } from './index'
import { useEventHook } from '@/composables'

interface UseApiReturn<TResult, TVariables extends [...any[]]>
  extends NormalisedApiStatuses {
  data: Ref<TResult | undefined>
  status: Ref<ApiStatus>
  error: Ref<AxiosResponse | null>
  onSuccess: (fn: (param: TResult) => void) => {
    off: () => void
  }
  onError: (fn: (param: AxiosResponse) => void) => {
    off: () => void
  }
  exec: (...variables: TVariables) => Promise<void>
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
    const propertyName = `status${upperFirst(statusKey.toLowerCase())}`

    // Create a computed that returns true/false based on
    // the currently selected status
    // @ts-ignore
    normalisedApiStatuses[propertyName] = computed(
      () => statusValue === status.value
    )
  }

  return normalisedApiStatuses
}

export const useApi = <
  TResult = any,
  TVariables extends [...any[]] = [...any[]]
>(
  fn: (...args: TVariables) => AxiosPromise<TResult>,
  config: any = {}
): UseApiReturn<TResult, TVariables> => {
  const { initialData, responseAdapter, retry = 3 } = config
  let tried = 0
  // Reactive values to store data and API status
  const data = ref<TResult>()
  data.value = initialData
  const status = ref<ApiStatus>(ApiStatus.IDLE)
  const error = ref<AxiosResponse>()
  const resultEvent = useEventHook<TResult>()
  const errorEvent = useEventHook<AxiosResponse>()

  /**
   * Initialise the api request
   */
  const exec = async (...args: TVariables) => {
    try {
      status.value = ApiStatus.PENDING
      const response = await fn(...args)
      const result = response.data ? response.data : response
      // console.log('response', response)
      data.value =
        typeof responseAdapter === 'function'
          ? responseAdapter(result)
          : result

      status.value = ApiStatus.SUCCESS
      resultEvent.trigger(data.value)
      tried = 0
    } catch (error) {
      console.log(error)
      if (tried < retry) {
        setTimeout(() => {
          exec(...args)
          tried++
        }, 500)
      } else {
        errorEvent.trigger(error)
        error.value = error.response
        status.value = ApiStatus.ERROR
        tried = 0
      }
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
    ...createNormalisedApiStatuses(status),
  }
}
