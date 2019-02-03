<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ext' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 角色列表 -->
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="6">
              <!-- 一级权限 -->
              <el-form label-position="left" inline class="demo-table-expand">
                <el-tag
                  :closable="true"
                  @close="del(scope.row.id,item1.id,scope.row)"
                >{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-form>
            </el-col>
            <el-col :span="18">
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="6">
                  <!-- 二级权限 -->
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-tag
                      :closable="true"
                      type="success"
                      @close="del(scope.row.id,item2.id,scope.row)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-form>
                </el-col>
                <el-col :span="18">
                  <!-- 三级权限 -->
                  <el-tag
                    :closable="true"
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    @close="del(scope.row.id,item3.id,scope.row)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">没有分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            @click="szT(scope.row.children,scope.row.id)"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData5: [],
      tags: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      treeLike: false,
      // 设置默认选中
      defaultCheck: [],
      // 要设置权限角色的ID
      roleID: ""
    };
  },
  methods: {
    // 角色列表
    async getAllList() {
      var res = await this.$http.request({
        url: `roles`,
        method: "get"
      });
      // console.log(res);
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.tableData5 = data;
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
.el-tag {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
