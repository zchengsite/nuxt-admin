<template>
  <div class="site-menubar" :class="{ 'site-menubar-light': theme['site-menubar-light'] }">
    <el-scrollbar style="max-height: calc(100% - 76px); height: 100%;" ref="scrollbar">
      <site-menubar-body></site-menubar-body>
    </el-scrollbar>
    <site-menubar-footer></site-menubar-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Body from './Body';
import Footer from './Footer';

export default {
  components: {
    'site-menubar-body': Body,
    'site-menubar-footer': Footer,
  },

  data() {
    return {
      screenHeight: 0,
    };
  },

  watch: {
    screenHeight: {
      handler() {
        this.$refs.scrollbar.update();
      },
    },
  },

  computed: {
    ...mapGetters([
      'theme',
    ]),
  },

  methods: {
    getWindowHeight() {
      this.screenHeight = document.documentElement.clientHeight;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.getWindowHeight);
      this.getWindowHeight();
    });
  },
};
</script>

<style scoped>
  >>>.el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
