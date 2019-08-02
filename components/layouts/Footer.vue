<template>
  <!-- Footer -->
  <footer class="site-footer">
    <div class="site-footer-legal">© {{ year }} <a target="_blank" href="javascript: void(0)">{{ logo }}</a></div>
    <div class="site-footer-right">
      <i class="wb wb-hammer"></i> <a target="_blank" href=""></a>
    </div>
  </footer>
</template>

<script>
import { getYear } from '@/utils/getYear';

export default {

  data() {
    return {
      year: '',
      logo: '',
    };
  },

  methods: {
    logoUrl() {
      this.logo = localStorage.getItem('userLogo');
    },
  },

  mounted() {
    this.logoUrl();
    this.year = getYear();
  },
};
</script>
