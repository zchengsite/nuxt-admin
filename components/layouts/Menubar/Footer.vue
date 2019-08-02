<template>
  <div class="site-menubar-footer">
    <a href="javascript: void(0)" class="fold-show" @click="backToHome()" title="返回首页">
      <span class="icon wb-home" aria-hidden="true"></span>
    </a>
    <a href="javascript: void(0)" @click="switchTheme()" title="切换主题">
      <span class="icon wb-library" aria-hidden="true"></span>
    </a>
    <a href="javascript: void(0)" @click="loginOut()" title="退出登录">
      <span class="icon wb-power" aria-hidden="true"></span>
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      themeMode: 1,
    };
  },

  methods: {
    ...mapActions([
      'updateTheme',
    ]),

    backToHome() {
      this.$router.push(localStorage.getItem('homePage'));
    },

    switchTheme() {
      if (this.themeMode === 0) {
        this.themeMode = 1;
        this.updateTheme({ menuValue: false, navValue: true });
      } else {
        this.themeMode = 0;
        this.updateTheme({ menuValue: true, navValue: true });
      }
    },

    loginOut() {
      this.$confirm('是否退出登录？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning',
      }).then(() => {
        localStorage.clear();
        location.reload();
      }).catch(() => {
      });
    },
  },
};
</script>
