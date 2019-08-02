<template>
  <!-- Navbar Toolbar -->
  <ul class="nav navbar-toolbar">
    <li class="nav-item hidden-float" id="toggleMenubar">
      <a class="nav-link" :data-toggle="toggle" @click="leftNarrow">
        <i class="icon hamburger hamburger-arrow-left">
          <span class="sr-only">Toggle menubar</span>
          <span class="hamburger-bar"></span>
        </i>
      </a>
    </li>
    <li class="nav-item hidden-sm-down">
      <a class="nav-link icon icon-fullscreen" :class="{ 'active': fullScreenActive }" @click="full1">
        <span class="sr-only">Toggle fullscreen</span>
      </a>
    </li>
  </ul>
  <!-- End Navbar Toolbar -->
</template>

<script>
import screenfull from 'screenfull';

export default {
  data() {
    return {
      toggle: 'menubar',
      fullScreenActive: false,
      full: false,
    };
  },

  methods: {
    leftNarrow() {
      if (this.toggle === 'menubar') {
        this.toggle = '';
        document.body.classList = 'animsition site-menubar-fold';
        document.getElementsByClassName('site-menubar')[0].style.width = '90px';
        document.getElementsByClassName('page')[0].style.marginLeft = '90px';
        document.getElementsByClassName('navbar-header')[0].style.cssText = 'min-width: 90px; width: 90px; overflow: hidden;';
        document.getElementsByClassName('site-menubar-footer')[0].style.width = '90px';
        document.getElementsByClassName('nav-tabs-horizontal')[0].classList = 'nav-tabs-horizontal nav-tabs-90 bg-blue-grey-100';
        const category = document.getElementsByClassName('site-menu-category');
        for (let i = 0; i < category.length; i += 1) {
          category[i].style.visibility = 'hidden';
        }
        this.$store.commit('changeNarrow', { narrow: true });
      } else {
        this.toggle = 'menubar';
        document.body.classList = '';
        document.getElementsByClassName('site-menubar')[0].removeAttribute('style');
        document.getElementsByClassName('page')[0].removeAttribute('style');
        document.getElementsByClassName('navbar-header')[0].removeAttribute('style');
        document.getElementsByClassName('site-menubar-footer')[0].removeAttribute('style');
        document.getElementsByClassName('nav-tabs-horizontal')[0].classList = 'nav-tabs-horizontal nav-tabs-260 bg-blue-grey-100';
        const category = document.getElementsByClassName('site-menu-category');
        for (let i = 0; i < category.length; i += 1) {
          category[i].removeAttribute('style');
        }
        this.$store.commit('changeNarrow', { narrow: false });
      }
    },

    full1() {
      if (screenfull.enabled) {
        this.fullScreenActive = !this.fullScreenActive;
        screenfull.toggle();
      }
    },
  },
};
</script>
