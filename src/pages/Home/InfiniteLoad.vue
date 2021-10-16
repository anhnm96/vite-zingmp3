<script lang="ts">
import { defineComponent, ref, watch, h } from 'vue'
import { useIntersectionObserver } from '@/composables'

export default defineComponent({
  name: 'InfiniteLoad',
  emits: ['infinite-load'],
  setup(_props, { emit }) {
    const containerRef = ref()
    const { isIntersecting } = useIntersectionObserver(containerRef)
    watch(isIntersecting, (val) => {
      if (val) emit('infinite-load')
    })

    return () => h('div', { ref: containerRef })
  },
})
</script>
