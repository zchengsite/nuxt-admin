const elTransition = '0.3s height ease-in-out';
const Transition = {
  beforeEnter(el) {
    el.style.transition = elTransition;
    if (!el.dataset) el.dataset = {};

    el.style.height = 0;
  },

  enter(el) {
    if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = '';
    }
    el.style.overflow = 'hidden';
  },

  afterEnter(el) {
    el.style.transition = '';
    el.style.height = '';
  },

  beforeLeave(el) {
    if (!el.dataset) el.dataset = {};
    el.style.display = 'block';
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition;
      el.style.height = 0;
    }
  },

  afterLeave(el) {
    el.style.transition = '';
    el.style.height = '';
  },
};

export default {
  name: 'CollapseTransition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition,
    };
    return h('transition', data, children);
  },
};
