import { VNodeProps } from 'vue'
export type ToastType = 'info' | 'danger' | 'warn' | 'success'

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'

export interface ToastOptions extends VNodeProps {
  id?: string | number
  type?: ToastType
  timeout?: number
  position?: Position
  showProgressbar?: boolean
  swipeClose?: boolean
  onClose?: (payload?: any) => void
  title?: string
  description?: string
}
