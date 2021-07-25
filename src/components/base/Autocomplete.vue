<template>
  <div
    v-click-outside="close"
    role="combobox"
    :aria-expanded="show"
    :aria-owns="`VAutocomplete__${timeId}--listbox`"
    aria-haspopup="listbox"
    class="autocomplete__container"
    :class="containerClass"
  >
    <input
      ref="inputEl"
      v-model="inputValue"
      type="text"
      autocomplete="off"
      aria-autocomplete="list"
      :aria-controls="`VAutocomplete__${timeId}--listbox`"
      :aria-activedescendant="`VAutocomplete__${timeId}--opt${hoverIndex}`"
      v-bind="$attrs"
      @keyup.esc.prevent="show = false"
      @keydown.down.prevent="keyboardNavigate('down')"
      @keydown.up.prevent="keyboardNavigate('up')"
      @keydown.enter="safeSalect(adaptedOptions[hoverIndex])"
      @keydown.tab.prevent="safeSalect(adaptedOptions[hoverIndex])"
      @click="show = true"
    >
    <div
      v-if="show"
      ref="dropdownEl"
      :class="[menuClass, 'dropdown-menu']"
      :style="{ bottom: !isListInViewportVertically ? '100%' : '' }"
    >
      <ul
        :id="`VAutocomplete__${timeId}--listbox`"
        role="listbox"
        class="dropdown-content"
      >
        <li
          v-for="(item, index) in adaptedOptions"
          :id="`VAutocomplete__${timeId}--opt${index}`"
          :key="index"
          role="option"
          :aria-selected="index === hoverIndex"
          @mouseenter="hoverIndex = index"
        >
          <slot
            name="option"
            :item="item"
            :isActive="index === hoverIndex"
            :select="select"
            :close="close"
          >
            <div
              class="dropdown-item"
              :class="{ 'is-active': index === hoverIndex }"
              @click="select(item)"
            >
              {{ item.label }}
            </div>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick } from 'vue'

export default defineComponent({
  name: 'Autocomplete',
  inheritAttrs: false,
  props: {
    containerClass: {
      type: String,
      default: '',
    },
    menuClass: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: (): any[] => [],
    },
    optionAdapter: {
      type: Function,
      default: (value: any) => ({
        id: value,
        label: value,
        value,
      }),
    },
    input: {
      type: String,
      default: undefined,
    },
    selected: {
      type: [Array, String, Number, Object],
      default: (): any[] => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    blurOnSelect: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:input', 'update:selected', 'select'],
  setup(props, { emit }) {
    const timeId = Date.now()
    const show = ref(false)
    const inputEl = ref()

    // input value logic
    const localInput = ref('')
    const useLocalValue = props.input === undefined
    const inputValue = computed<string>({
      set: (value: string) => {
        useLocalValue ? (localInput.value = value) : emit('update:input', value)
      },
      get: () => {
        return useLocalValue ? localInput.value : (props.input as string)
      },
    })

    //
    function close() {
      show.value = false
      // refocus selected item
    }

    const hoverIndex = ref<number>(0)
    const dropdownEl = ref()
    function keyboardNavigate(direction: string) {
      if (show.value) {
        // update hoverIndex
        const step = direction === 'down' ? 1 : -1
        let nextIndex = hoverIndex.value + step
        if (nextIndex >= props.options.length)
          nextIndex = props.options.length - 1
        else if (nextIndex < 0) nextIndex = 0
        hoverIndex.value = nextIndex
        // scroll to hoverIndex
        const list = dropdownEl.value.querySelector('.dropdown-content')
        const element = list.querySelectorAll(
          '.dropdown-item:not(.is-disabled)'
        )[nextIndex]
        if (!element) return
        const visMin = list.scrollTop
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight
        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop
        } else if (element.offsetTop >= visMax) {
          list.scrollTop =
            element.offsetTop - list.clientHeight + element.clientHeight
        }
      } else {
        // if dropdown is not showing, show it.
        show.value = true
      }
    }

    const isListInViewportVertically = ref(true)
    function calcDropdownInViewportVertical() {
      nextTick(() => {
        /**
         * this.$refs.dropdown may be undefined
         * when Autocomplete is conditional rendered
         */
        if (dropdownEl.value === undefined) return
        // @ts-ignore
        const rect = dropdownEl.value.getBoundingClientRect()
        isListInViewportVertically.value =
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
      })
    }
    watch(show, (newVal) => {
      if (newVal) {
        calcDropdownInViewportVertical()
      }
    })

    const adaptedOptions = computed(() => {
      return props.options.map((option) => props.optionAdapter(option))
    })

    function select(item: any) {
      let payload
      if (props.multiple) {
        payload = [...props.selected, item.value]
      } else {
        inputValue.value = item.label
        payload = item.value
      }
      emit('update:selected', payload)
      emit('select', item.value)
      if (props.blurOnSelect) inputEl.value.blur()
      else inputEl.value.focus()
      close()
    }

    function safeSalect(item: any) {
      if (show.value) {
        select(item)
      }
    }

    return {
      timeId,
      show,
      inputEl,
      inputValue,
      close,
      hoverIndex,
      dropdownEl,
      keyboardNavigate,
      calcDropdownInViewportVertical,
      isListInViewportVertically,
      adaptedOptions,
      select,
      safeSalect,
    }
  },
})
</script>

<style>
.autocomplete__container {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  width: 100%;
  z-index: 1;
  display: block;
  background-color: white;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.dropdown-content {
  overflow: auto;
  max-height: 600px;
}
.dropdown-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  color: #374151;
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  user-select: none;
  text-align: left;
}
.dropdown-item:hover,
.dropdown-item.is-active {
  color: #161e2e;
  background-color: #f4f5f7;
}
</style>
