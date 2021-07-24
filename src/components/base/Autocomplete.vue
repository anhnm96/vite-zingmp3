<template>
  <button
    v-if="shown"
    type="button"
    class="fixed inset-0 w-full cursor-default"
    arial-label="close"
    @mousedown="close"
  />
  <div
    role="combobox"
    :aria-expanded="shown"
    :aria-owns="`VAutocomplete__${timeId}--listbox`"
    aria-haspopup="listbox"
    class="autocomplete__container"
    v-bind="$attrs"
  >
    <input
      ref="input"
      v-model="inputValue"
      type="text"
      aria-autocomplete="list"
      :aria-controls="`VAutocomplete__${timeId}--listbox`"
      :aria-activedescendant="`VAutocomplete__${timeId}--opt${arrowCounter}`"
      :aria-label="arialLabel"
      v-bind="inputBind"
      @keyup.esc.prevent="shown = false"
      @keydown.down.prevent="keyArrows('down')"
      @keydown.up.prevent="keyArrows('up')"
      @keydown.enter="safeSalect(adaptedOptions[arrowCounter])"
      @keydown.tab.prevent="safeSalect(adaptedOptions[arrowCounter])"
      @click="shown = true"
    >
    <div
      v-if="shown"
      ref="dropdown"
      :class="['dropdown-menu', menuClass]"
      :style="{ bottom: !isListInViewportVertically ? '100%' : '' }"
    >
      <ul
        :id="`VAutocomplete__${timeId}--listbox`"
        role="listbox"
        class="dropdown-content"
        :aria-label="arialLabel"
      >
        <li
          v-for="(item, index) in adaptedOptions"
          :id="`VAutocomplete__${timeId}--opt${index}`"
          :key="index"
          role="option"
          :aria-selected="index === arrowCounter"
          @click="select(item)"
          @mouseenter="arrowCounter = index"
        >
          <slot
            name="option"
            :item="item"
            :isActive="index === arrowCounter"
          >
            <div
              class="dropdown-item"
              :class="{ 'is-active': index === arrowCounter }"
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
import { defineComponent, nextTick } from 'vue'
export default defineComponent({
  name: 'Autocomplete',
  props: {
    /**
     * (optional) input value. Use when we want to pass input from parent.
     * Otherwise we use localInput
     */
    input: {
      type: String,
      default: undefined,
    },
    /** `array` let select multiplt value */
    selected: {
      type: [String, Number, Object, Array],
      default: undefined,
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
    filter: {
      type: Function,
      default: (arr: any[]) => arr,
    },
    /** aria-label for input */
    arialLabel: String,
    inputBind: {
      type: Object,
      default: () => ({
        class:
          'block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm',
      }),
    },
    menuClass: {
      type: String,
      default: '',
    },
  },
  emits: ['update:input', 'update:selected'],
  data() {
    return {
      localInput: '',
      shown: false,
      arrowCounter: 0,
      isListInViewportVertically: true,
      timeId: Date.now(),
    }
  },
  computed: {
    filteredOptions(): any[] {
      // @ts-ignore
      return this.filter(this.options, this.inputValue)
    },
    useLocal(): boolean {
      return this.input === undefined
    },
    inputValue: {
      get: function (): string {
        return this.useLocal ? this.localInput : this.input
      },
      set: function (value: string) {
        this.useLocal
          ? (this.localInput = value)
          : this.$emit('update:input', value)
      },
    },
    adaptedOptions(): Array<any> {
      return this.filteredOptions.map((x) => this.optionAdapter(x))
    },
    multiple(): boolean {
      return Array.isArray(this.selected)
    },
    placeholder(): string {
      if (!this.multiple) return this.inputValue
      const arr = this.selected as any[]
      return `${arr.length} options selected`
    },
  },
  watch: {
    shown(val) {
      if (val) {
        // reset to inital state
        this.isListInViewportVertically = true
        this.calcDropdownInViewportVertical()
      }
    },
  },
  mounted() {
    nextTick(() => {
      if (document.activeElement === this.$refs.input) this.shown = true
    })
  },
  methods: {
    close() {
      this.shown = false
      this.arrowCounter = 0
    },
    /**
     * Enter key listener.
     * Select the hovered option.
     */
    safeSalect(item: any) {
      if (this.shown) {
        this.select(item)
      }
    },
    select(item: any) {
      // @ts-ignore
      let newValue = this.multiple
        ? (this.selected as Array<any>)?.concat(item.value)
        : item.value

      if (this.multiple) {
        const selectedArr = this.selected as Array<any>
        if (selectedArr.some((opt) => opt._id === item.id)) return
        newValue = selectedArr.concat(item.value)
        this.inputValue = ''
      } else {
        newValue = item.value
        this.inputValue = newValue
      }

      this.$emit('update:selected', newValue)
      // @ts-ignore
      this.$refs.input?.focus()
      this.close()
    },
    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction: string) {
      const sum = direction === 'down' ? 1 : -1
      if (this.shown) {
        let index = this.arrowCounter + sum
        index = index >= this.options.length ? this.options.length - 1 : index
        index = index < 0 ? 0 : index
        this.arrowCounter = index
        // @ts-ignore
        const list = this.$refs.dropdown.querySelector('.dropdown-content')
        const element = list.querySelectorAll(
          '.dropdown-item:not(.is-disabled)'
        )[index]
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
        this.shown = true
      }
    },
    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      nextTick(() => {
        /**
         * this.$refs.dropdown may be undefined
         * when Autocomplete is conditional rendered
         */
        if (this.$refs.dropdown === undefined) return
        // @ts-ignore
        const rect = this.$refs.dropdown.getBoundingClientRect()
        this.isListInViewportVertically =
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
      })
    },
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
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
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
