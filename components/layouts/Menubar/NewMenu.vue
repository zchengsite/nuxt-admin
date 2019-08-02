<template>
  <ul class="site-menu only-one">
    <li
      v-for="(item, aindex) in menus"
      :key="aindex"
      :class="[
        { 'has-sub': item.children },
        { 'open': isOpen === aindex },
        { 'active': $route.path === `/${item.href}` },
        item.category ? 'site-menu-category' : 'site-menu-item',
      ]">
      <span v-if="item.category">{{ item.category }}</span>
      <router-link v-else
        :to="parentPath(item.href)"
        @click.native="clickMenu($event, aindex, item.title, item.href)">
        <i :class="'site-menu-icon wb-' + item.icon"></i>
        <span class="site-menu-title">{{ item.title }}</span>
        <span class="site-menu-arrow" v-if="item.children"></span>
      </router-link>
      <collapse-transition>
        <ul
          class="site-menu-sub"
          v-show="item.children && isOpen === aindex">
          <li
            v-for="(child, index) in item.children"
            :key="index"
            class="site-menu-item"
            :class="[
              { 'has-sub': child.children },
              // { 'open': child.title === side.desActive },
              { 'active': $route.path === `/${child.href}` },
            ]">
            <router-link
              class="animsition-link"
              :to="`/${child.href}`"
              :title="child.title"
              @click.native="clickMenu($event, aindex, child.title, child.href)">
              <span class="site-menu-title">{{ child.title }}</span>
              <span class="site-menu-arrow" v-if="child.children"></span>
            </router-link>
          </li>
        </ul>
      </collapse-transition>
    </li>
  </ul>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import CollapseTransition from '@/utils/collapse-transition';

export default {
  components: {
    'collapse-transition': CollapseTransition,
  },

  data() {
    return {
      isOpen: -1,
    };
  },

  watch: {
    $route() {
      this.openMenu();
    },
  },

  computed: {
    ...mapGetters([
      'menus',
      'tab',
    ]),
  },

  methods: {
    ...mapActions([
      'pushTab',
      'updateMenu',
    ]),

    // activeMenu(path, type) {
    //   let result = '';
    //   if (path && type === 1) {
    //     const last = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
    //     const parent = this.$route.path.replace(last, '');
    //     const pattern = new RegExp(`^${parent}([^]*)$`);
    //     result = `/${path}`.match(pattern);
    //   }
    //   return `/${path}` === this.$route.path || result;
    // },

    parentPath(href) {
      if (href === '') {
        return '';
      }
      return `/${href}`;
    },

    clickMenu(e, aindex, title, href) {
      const target = e.currentTarget;
      if (target.parentNode.className.includes('has-sub')) {
        if (this.isOpen === aindex) {
          this.isOpen = -1;
        } else {
          this.isOpen = aindex;
        }
      } else {
        const tab = {
          href: `/${href}`,
          title,
        };
        if (this.tab.items.find(element => element.href === tab.href)) {
          return;
        }
        this.pushTab({ tab });
      }
    },

    openMenu() {
      this.menus.forEach((item, index) => {
        if (item.children !== '' && item.children !== undefined) {
          item.children.forEach((child) => {
            if (this.$route.path === `/${child.href}`) {
              this.isOpen = index;
            }
          });
        } else if (item.children === '') {
          if (this.$route.path === `/${item.href}`) {
            this.isOpen = -1;
          }
        }
      });
    },
  },

  async mounted() {
    // if (this.menus.length === 0) {
    //   this.menu = JSON.parse(localStorage.getItem('navbar'));
    //   this.updateMenu({ menus: this.menu });
    // }
    const menu = [{
      category: '功能',
    }, {
      title: 'menu-1',
      href: 'menu-1',
      icon: 'dashboard',
    }, {
      title: 'menu-2',
      href: '',
      icon: 'dashboard',
      children: [{
        title: 'menu-2-1',
        href: 'menu-2/menu-2-1',
      }, {
        title: 'menu-2-2',
        href: 'menu-2/menu-2-2',
      }],
    }, {
      title: 'menu-3',
      href: '',
      icon: 'dashboard',
      children: [{
        title: 'menu-3-1',
        href: 'menu-3/menu-3-1',
      },{
        title: 'menu-3-2',
        href: 'menu-3/menu-3-2',
      },{
        title: 'menu-3-3',
        href: 'menu-3/menu-3-3',
      },{
        title: 'menu-3-4',
        href: 'menu-3/menu-3-4',
      },{
        title: 'menu-3-5',
        href: 'menu-3/menu-3-5',
      },{
        title: 'menu-3-6',
        href: 'menu-3/menu-3-6',
      }],
    }, {
      title: 'menu-4',
      href: 'menu-4',
      icon: 'dashboard',
    }, {
      title: 'menu-5',
      href: '',
      icon: 'dashboard',
      children: [{
        title: 'menu-5-1',
        href: 'menu-5/menu-5-1',
      }, {
        title: 'menu-5-2',
        href: 'menu-5/menu-5-2',
      }, {
        title: 'menu-5-3',
        href: 'menu-5/menu-5-3',
      }, {
        title: 'menu-5-4',
        href: 'menu-5/menu-5-4',
      }, {
        title: 'menu-5-5',
        href: 'menu-5/menu-5-5',
      }, {
        title: 'menu-5-6',
        href: 'menu-5/menu-5-6',
      }],
    }];
    this.updateMenu({ menus: menu });
    localStorage.setItem('navbar', JSON.stringify(menu));
    this.openMenu();
  },

};
</script>

<style scoped>
.site-menu-sub {
  padding: 0;
  overflow: hidden;
}

@media (min-width: 767px) and (max-width: 1199px) {
  .css-menubar .site-menu > .site-menu-item > .site-menu-sub {
    position: fixed;
    top: 112px;
    left: 90px;
    width: 240px;
    overflow-y: auto;
    visibility: visible;
    opacity: 1;
    transition: visibility .25s, opacity .25s;
  }
}

@media (min-width: 1199px) {
  .site-menubar-fold .site-menu > .site-menu-item > .site-menu-sub {
    position: fixed;
    top: 112px;
    left: 90px;
    width: 240px;
    overflow-y: auto;
    visibility: visible;
    opacity: 1;
    transition: visibility .25s, opacity .25s;
  }
}
</style>
