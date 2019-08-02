<template>
  <div id="container">
    <nav-bar></nav-bar>
    <menu-bar></menu-bar>
    <new-tab-bar></new-tab-bar>
      <keep-alive>
        <nuxt />
      </keep-alive>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from '@/components/layouts/Navbar/Navbar';
import MenuBar from '@/components/layouts/Menubar/Menubar';
// import TabBar from '@/components/layouts/Tabbar/Tabbar';
import NewTabBar from '@/components/layouts/Tabbar/NewTabBar';
import FooterBar from '@/components/layouts/Footer';

export default {
  name: 'app',
  components: {
    NavBar,
    MenuBar,
    NewTabBar,
    FooterBar,
  },
  methods: {
    ...mapActions([
      'updateSite',
    ]),
  },
  mounted() {
    if (document.getElementById('nb-global-spinner')) {
      document.body.removeChild(document.getElementById('nb-global-spinner'));
    }
    this.updateSite({
      site: {
        name: localStorage.getItem('userLogo'),
      },
    });
  },
};
</script>

<style>
@import './base.css';
</style>

<style lang="sass">
@import "./nprogress.css";
</style>
