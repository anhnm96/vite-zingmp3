export default {
  beforeMount(el: HTMLElement, binding: any): void {
    // @ts-ignore
    el.__ClickOutsideHandler__ = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // check if event's target is the el or contained by el
      if (!(el === target || el.contains(target))) {
        binding.value(event)
      }
    }
    document.body.addEventListener('click', (<any>el).__ClickOutsideHandler__)
  },
  beforeUnmount(el: HTMLElement) {
    document.body.removeEventListener(
      'click',
      (<any>el).__ClickOutsideHandler__
    )
  },
}
