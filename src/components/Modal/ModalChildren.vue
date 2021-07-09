<script lang="ts">
import { defineComponent, h } from 'vue'
import { getRandomUUID } from '@/helpers/getnRandomUUID'
import { useModal } from './Modal.vue'

export const ModalTitle = defineComponent({
  name: 'ModalTitle',
  props: {
    as: {
      type: String,
      default: 'h2',
    },
  },
  setup(props, { slots }) {
    const id = 'ModalTitle-' + getRandomUUID()
    const { labelledBy } = useModal()
    labelledBy.value = id

    return () =>
      h(
        props.as,
        {
          id,
        },
        slots.default()
      )
  },
})

export const ModalContent = defineComponent({
  name: 'ModalContent',
  setup(_, { slots }) {
    const id = 'ModalContent-' + getRandomUUID()
    const { describedBy } = useModal()
    describedBy.value = id

    return () => h('div', { id }, slots.default())
  },
})
</script>
