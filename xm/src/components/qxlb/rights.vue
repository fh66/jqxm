<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ext' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level ==='0'">一级</span>
          <span v-else-if="scope.row.level ==='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async getAllList() {
      var res = await this.$http.request({
        url: `rights/list`,
        method: "get"
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.tableData = data;
      }
    }
  },
  mounted() {
    this.getAllList();
  }
};
</script>

<style>
.mbx {
  margin-bottom: 10px;
}
</style>
