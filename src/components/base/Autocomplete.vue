<template>
  <div
    role="combobox"
    :aria-expanded="show"
    :aria-owns="`VAutocomplete__${timeId}--listbox`"
    aria-haspopup="listbox"
    class="relative"
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
      @keydown.enter="safeSalect(filteredOptions[hoverIndex])"
      @keydown.tab.prevent="safeSalect(filteredOptions[hoverIndex])"
      @focus="show = true"
      @click="show = true"
    >
    <div
      v-if="show"
      ref="dropdownEl"
      v-click-outside:parent="close"
      :class="['absolute w-full z-50', menuClass]"
      :style="{ bottom: !isListInViewportVertically ? '100%' : '' }"
    >
      <ul
        :id="`VAutocomplete__${timeId}--listbox`"
        role="listbox"
        class="dropdown-content"
      >
        <li
          v-for="(item, index) in filteredOptions"
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
              class="block px-4 py-2 text-sm text-left truncate cursor-pointer select-none"
              :class="[index === hoverIndex && 'opacity-50 bg-gray-200', item.selected && 'bg-blue-300 text-blue-500']"
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
import { defineComponent, ref, computed, watch, nextTick, PropType } from 'vue'

interface AdaptedOption {
  id: string | number
  label: string
  value: any
  selected?: boolean
}

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
      default: 'shadow mt-2 bg-white',
    },
    options: {
      type: Array,
      default: (): any[] => [],
    },
    optionAdapter: {
      type: Function as PropType<(value: any) => AdaptedOption>,
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
    useFilter: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Function,
      default: (keyword: string, item: AdaptedOption) =>
        item.label.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
    },
  },
  emits: ['update:input', 'update:selected', 'select'],
  setup(props, { emit }) {
    const timeId = Date.now()
    const show = ref(false)
    const inputEl = ref()
    const isDirty = ref(false)
    const hoverIndex = ref<number>(0)

    // input value logic
    const localInput = ref('')
    const useLocalValue = props.input === undefined
    const inputValue = computed<string>({
      set: (value: string) => {
        isDirty.value = true
        if (props.useFilter) hoverIndex.value = 0
        useLocalValue ? (localInput.value = value) : emit('update:input', value)
      },
      get: () => {
        return useLocalValue ? localInput.value : (props.input as string)
      },
    })

    //
    function close() {
      show.value = false
      isDirty.value = false
      // refocus selected item
    }

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
        const element = list.querySelectorAll('li:not(.is-disabled)')[nextIndex]
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

    const adaptedSelects = computed<AdaptedOption[]>(() => {
      return props.selected.map((selectedOpt) =>
        props.optionAdapter(selectedOpt)
      )
    })

    const adaptedOptions = computed<AdaptedOption[]>(() => {
      if (!props.multiple)
        return props.options.map((option) => props.optionAdapter(option))
      return props.options.map((option) => {
        const adaptedOption = props.optionAdapter(option)
        adaptedOption.selected = adaptedSelects.value.some(
          (i) => i.id === adaptedOption.id
        )
        return adaptedOption
      })
    })

    const filteredOptions = computed<AdaptedOption[]>(() => {
      if (!props.useFilter || !isDirty.value) return adaptedOptions.value
      return adaptedOptions.value.filter((i) =>
        props.filter(inputValue.value, i)
      )
    })

    function select(item: AdaptedOption) {
      let payload
      if (props.multiple) {
        payload = [...props.selected]
        const foundIndex =
          adaptedSelects.value.length > 0
            ? adaptedSelects.value.findIndex((i) => i.id === item.id)
            : -1

        if (foundIndex > -1) {
          payload.splice(foundIndex, 1)
        } else {
          payload.push(item.value)
        }
      } else {
        inputValue.value = item.label
        payload = item.value
        if (props.blurOnSelect) inputEl.value.blur()
        else inputEl.value.focus()
        close()
      }

      emit('update:selected', payload)
      emit('select', item.value)
    }

    function safeSalect(item: AdaptedOption) {
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
      filteredOptions,
      select,
      safeSalect,
    }
  },
})
</script>

<style>
.dropdown-content {
  overflow: auto;
  max-height: 200px;
}
</style>
