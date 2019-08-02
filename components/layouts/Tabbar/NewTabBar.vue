<template>
  <div class="nav-tabs-horizontal nav-tabs-260 bg-blue-grey-100" data-plugin="tabs" id="tabs">
<!--     <button type="button" class="btn btn-block btn-default prev" @click="prev($event)">
      <i class="icons wb-chevron-left-mini"></i><i class="icons wb-chevron-left-mini"></i>
    </button> -->
  <el-scrollbar ref="scrollbar" @wheel.native.prevent="handleScroll">
    <ul class="nav nav-tabs nav-tabs-line">
      <li class="nav-item" role="presentation" v-for="(item, index) in tab.items" :key="index">
        <router-link
          class="nav-link tab-a"
          :to="item.href"
          :class="{
            'active': $route.path === item.href
          }">
          <span
            :class="{ on : $route.path === item.href &&  index > 0}"
            class="close animation-scale-up animation-duration-100"
            v-show="tab.items.length > 1"
            @click.stop.prevent="clickClose(index, item.href)">
              ×
          </span>
          <strong>{{ item.title }}</strong>
        </router-link>
      </li>
    </ul>
  </el-scrollbar>
<!--     <button type="button" class="btn btn-block btn-default next" @click="next($event)">
      <i class="icons wb-chevron-right-mini"></i><i class="icons wb-chevron-right-mini"></i>
    </button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getHomeRoute } from '@/utils/getHomePageRoute';

export default {
  data() {
    return {
      tabBarWidth: 0,
    };
  },

  computed: {
    tab() {
      return this.$store.state.site.tab;
    },
    scrollWrapper() {
      return this.$refs.scrollbar.$refs.wrap
    },
  },

  watch: {
    tab: {
      handler() {
        this.$refs.scrollbar.update();
      },
      deep: true,
    },
    tabBarWidth: {
      handler() {
        this.$refs.scrollbar.update();
      },
    },
  },

  methods: {
    ...mapActions([
      'pushTab',
      'closeTab',
      'sliceTab',
    ]),

    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    },

    getTabBarWidth() {
      this.tabBarWidth = document.getElementById('tabs').clientWidth;
    },

    clickClose(index, href) {
      if (href === this.$route.path && index + 1 === this.tab.items.length) {
        const curPath = this.tab.items[index - 1].href;
        this.$router.push(curPath);
        this.closeTab({ index });
      } else if (href === this.$route.path && index + 1 !== this.tab.items.length) {
        const curPath = this.tab.items[index + 1].href;
        this.$router.push(curPath);
        this.closeTab({ index });
      } else {
        this.closeTab({ index });
      }
    },
  },

  mounted() {
    if (this.tab.items.length !== 0) {
      return;
    }
    const homePage = getHomeRoute();
    const tab = {
      href: `/${homePage.href}`,
      title: homePage.title,
    };
    this.pushTab({ tab });

    if (this.$route.path === `/${homePage.href}`) {
      return;
    }
    const newTab = {
      href: this.$route.path,
      title: this.$route.name,
    };
    this.pushTab({ tab: newTab });

    this.$nextTick(() => {
      window.addEventListener('resize', this.getTabBarWidth);
      this.getTabBarWidth();
    });
  },

};
</script>

<style scoped>
  .nav-tabs-horizontal {
    position: fixed;
    top: 66px;
    z-index: 1000;
    height: 45px;
    box-shadow: 0 2px 4px rgba(0,0,0,.08);
  }
  .nav-tabs-260 {
    margin-left: 260px;
    width: calc(100% - 260px);
  }
  .nav-tabs-90 {
    margin-left: 90px;
    width: calc(100% - 90px);
  }
  @media (max-width: 1199px) and (min-width: 768px) {
    .nav-tabs-horizontal {
      margin-left: 90px;
      width: calc(100% - 90px);
    }
  }
  @media (max-width: 768px) {
    .nav-tabs-horizontal {
      display: none;
    }
  }
  .nav-item {
    position: relative;
    display: inline-block;
  }

  .nav-tabs {
    display: inline;
    white-space: nowrap;
  }

</style>
