
<script lang="tsx">
// @ts-nocheck
import { defineComponent } from 'vue'
import { notifications } from './index'

export default defineComponent({
  name: 'NotificationContainer',
  render() {
    return (
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end pointer-events-none sm:items-start z-50"
      >
        {notifications.value['top-right'].length > 0 && (
          <div className="items-end right-0 top-0 flex flex-col space-y-2 sm:p-6 px-4 py-6 absolute">
            {...notifications.value['top-right']}
          </div>
        )}
        {notifications.value['top-left'].length > 0 && (
          <div className="items-start left-0 top-0 flex flex-col space-y-2 sm:p-6 px-4 py-6 absolute">
            {...notifications.value['top-left']}
          </div>
        )}
        {notifications.value['bottom-right'].length > 0 && (
          <div className="items-end right-0 bottom-0 flex flex-col space-y-2 sm:p-6 px-4 py-6 absolute">
            {...notifications.value['bottom-right']}
          </div>
        )}
        {notifications.value['bottom-left'].length > 0 && (
          <div className="items-start left-0 bottom-0 flex flex-col space-y-2 sm:p-6 px-4 py-6 absolute">
            {...notifications.value['bottom-left']}
          </div>
        )}
      </div>
    )
  },
})
</script>

<style>
</style>
