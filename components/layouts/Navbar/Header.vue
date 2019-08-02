<template>
  <div class="navbar-header">
    <button type="button" class="navbar-toggler hamburger hamburger-close navbar-toggler-left" :class="{ 'hided': showMenu }"  data-toggle="menubar" @click="showMenu = !showMenu;">
      <span class="sr-only">Toggle navigation</span>
      <span class="hamburger-bar"></span>
    </button>
    <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-collapse" @blur="showUser = false"  @click="showUser = !showUser;"data-toggle="collapse">
      <i class="icon wb-more-horizontal" aria-hidden="true"></i>
    </button>
    <div class="deopUser animation-scale-up animation-duration-100" role="menu" v-show="showUser" @mousedown="peventBlur($event)">
      <router-link class="dropdown-item" to="users" role="menuitem">
        <i class="icon wb-user" aria-hidden="true"></i> 用户管理
      </router-link>
      <div class="dropdown-divider" role="presentation"></div>
      <a class="dropdown-item" href="javascript:;"  @click="loginOut()" role="menuitem">
        <i class="icon wb-power" aria-hidden="true"></i> 退出登录
      </a>
    </div>
    <div class="navbar-brand navbar-brand-center" @click="backToHome()">
      <!-- <img class="navbar-brand-logo" src="@/assets/images/shared/logo.png"> -->
      <span class="navbar-brand-text" style="font-size:16px!important;">
        {{ logo }}
      </span>
    </div>
<!--     <button type="button" class="navbar-toggler collapsed" data-target="#site-navbar-search" data-toggle="collapse">
      <span class="sr-only">Toggle Search</span>
      <i class="icon wb-search" aria-hidden="true"></i>
    </button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showMenu: true,
      showUser: false,
      logo: '',
    };
  },

  computed: {
    ...mapGetters([
      'site',
    ]),
  },

  watch: {
    showMenu: {
      handler() {
        if (this.showMenu) {
          document.body.classList = 'animsition site-menubar-changing site-menubar-hide';
        } else {
          document.body.classList = 'animsition site-menubar-changing site-menubar-open';
        }
      },
    },
    $route() {
      this.showMenu = true;
    },
  },

  methods: {
    logoUrl() {
      this.logo = localStorage.getItem('userLogo');
    },

    backToHome() {
      this.$router.push(localStorage.getItem('homePage'));
    },

    peventBlur($event) {
      $event.preventDefault();
    },

    loginOut() {
      localStorage.clear();
      location.reload();
    },
  },

  mounted() {
    this.logoUrl();
  },
};
</script>

<style scoped>
.deopUser {
  position: absolute;
  top: 100%;
  right: 0%;
  z-index: 9999999;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 5px 0 0;
  font-size: 1rem;
  color: #76838f;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #e4eaec;
  border-radius: .215rem;
  -webkit-box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
  box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
}
.dropdown {
  position: relative;
}
</style>
