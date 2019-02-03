<template>
  <el-aside width="200px">
    <el-menu
      :default-active="path"
      class="el-menu-vertical-demo"
      :unique-opened="true"
      :router="true"
    >
      <el-submenu v-for="item1 in rightList" :key="item1.id" :index="item1.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="item2 in item1.children" :key="item2.id" :index="'/'+item2.path">
            <i class="el-icon-tickets"></i>
            {{item2.authName}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  // 页面打开时动态得到当前页面
  data() {
    return {
      rightList: []
    };
  },
  computed: {
    path: function() {
      // 得到当前路由
      return this.$route.path;
    }
  },
  methods: {
    async getUserRight() {
      var res = await this.$http.request({
        url: "/menus",
        method: "get"
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.rightList = data;
        // console.log(this.rightList);
      } else {
        this.$message.error(meta.msg);
      }
    }
  },
  mounted() {
    this.getUserRight();
  }
};
</script>

<style>
  .el-container {
    height: 100%;
  }
  .el-menu-vertical-demo {
    background-color: #d3dce6;
  }
  .el-menu-item-group__title {
    padding: 0 0 0 20px;
  }
  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }
  .user {
    text-decoration: none;
  }
</style>
