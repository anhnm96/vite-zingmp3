import NProgress from 'nprogress'
import { Router } from 'vue-router'

NProgress.configure({
  easing: 'ease',
  speed: 400,
  showSpinner: false,
})

export default (router: Router) => {
  router.beforeEach(() => { NProgress.start(); NProgress.inc() })
  router.afterEach(() => { NProgress.done() })
}
