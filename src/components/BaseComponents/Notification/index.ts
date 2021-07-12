import { createVNode, createApp, ref, Component, VNode } from 'vue'
import DefaultNotification from './DefaultNotification.vue'
import NotificationContainer from './NotificationContainer.vue'
import { ToastOptions } from './types'

export const notifications = ref({
  'top-left': [] as VNode[],
  'top-right': [] as VNode[],
  'bottom-left': [] as VNode[],
  'bottom-right': [] as VNode[],
  'top-center': [] as VNode[],
  'bottom-center': [] as VNode[],
})

const defaultOptions: ToastOptions = {
  type: 'info',
  position: 'top-right',
  timeout: 5000,
  showProgressbar: true,
}

let newId = 0
let parentEl: HTMLDivElement

function mergeOptions(options = {}): ToastOptions {
  let mergedOptions: ToastOptions = { ...defaultOptions, ...options, id: newId, key: newId }

  mergedOptions.onClose = (payload) => {
    const removeIndex = notifications.value[mergedOptions.position].findIndex(
      n => n.props.id === mergedOptions.id
    )

    // @ts-ignore
    notifications.value[mergedOptions.position][removeIndex].result(payload)
    notifications.value[mergedOptions.position].splice(removeIndex, 1)
    // release from memory
    mergedOptions = null
  }

  return mergedOptions
}


export function show(options: ToastOptions, component: Component = DefaultNotification) {
  const mergedOptions = mergeOptions(options)
  // @ts-ignore
  const toastVNode = createVNode(component, mergedOptions)
  notifications.value[mergedOptions.position].push(toastVNode)

  if (!parentEl) {
    parentEl = document.createElement('div')
    document.body.appendChild(parentEl)
    createApp(NotificationContainer).mount(parentEl)
  }
  newId++

  return new Promise(resolve => {
    // @ts-ignore
    toastVNode.result = resolve // we'll call resolve in onClose function
  })
}
