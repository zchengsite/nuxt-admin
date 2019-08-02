<template>
  <div class="site-menubar-body">
    <site-menu></site-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import Menu from './Menu';
import NewMenu from './NewMenu';

export default {
  components: {
    'site-menu': NewMenu,
  },
  computed: {
    ...mapState({
      narrow: state => state.site.narrow,
    }),
  },
  methods: {
    change() {
      this.narrow = true;
    },
  },
};
</script>
