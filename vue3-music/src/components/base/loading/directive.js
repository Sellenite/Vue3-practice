import { createApp } from 'vue';
import Loading from './loading';
import { addClass } from '@/assets/js/dom.js'

const RELATIVE_CLASS = 'g-relative';

function append(el) {
  const style = getComputedStyle(el);
  if (!['fixed', 'absolute', 'relative'].includes(style.position)) {
    addClass(el, RELATIVE_CLASS);
  }
  el.appendChild(el.instance.$el);
}

function remove(el) {
  el.removeChild(el.instance.$el);
}

const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement('div'));
    // 3.0的arg可以是动态参数了，如使用v-loading:[loadingTitle]="loading"，此时loadingTitle是一个可变量
    const title = binding.arg;
    if (title != undefined) {
      instance.setTitle(title);
    }
    if (binding.value) {
      el.instance = instance;
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    if (title != undefined) {
      el.instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        append(el);
      } else {
        remove(el);
      }
    }
  }
}

export default loadingDirective
