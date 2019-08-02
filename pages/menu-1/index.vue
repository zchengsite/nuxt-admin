<template>
  <div class="page">
    <div class="page-header">
      <h3>{{ herder }}</h3>
    </div>
    <div class="page-content">
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-body">
              <table class="table table-hover table-custom">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>标题</th>
                    <th>摘要</th>
                    <th>标签</th>
                    <th>浏览数</th>
                    <th>时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in news.list" :key="index">
                    <td>{{ index + 1 + (currentPage - 1) * length }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.abstract }}</td>
                    <td>
                      <a href="javascript: void(0)" v-for="(tag, index) in item.tags.split(',')">
                        <span class="badge badge-round badge-primary badge-outline">{{ tag }}</span>
                      </a>
                    </td>
                    <td>{{ item.views }}</td>
                    <td>{{ item.pubtime }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="panel-footer">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                background
                :current-page="currentPage"
                :page-sizes="[15, 30, 45, 60]"
                :page-size="length"
                layout="total, sizes, prev, pager, next"
                :total="news.total">
              </el-pagination>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  // import { getData } from '@/api/api';

  export default {
    components: {

    },
    data() {
      return {
        currentPage: 1,
        length: 15,
        fetchLoading: false,
        herder: 'hello world!',
        page: 1,
        news: {
          list: [{
            title: 'menu-1 title',
            abstract: 'menu-1 abstract',
            tags: '科技, 生活, 美食',
            views: '156',
            pubtime: '2019-07-29',
          }],
          total: 100,
        },
      };
    },
    methods: {
      // async getDataList() {
      //   const result = await getData({
      //     page: this.currentPage,
      //   });
      //   this.herder = result.data;
      // },

      handleSizeChange(val) {
        this.length = val;
      },

      handleCurrentChange(val) {
        this.currentPage = val;
      },
    },
    mounted() {
      // this.getDataList();
    },
  };
</script>