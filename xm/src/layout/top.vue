<template>
  <el-row>
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <img src="../assets/images/logo.png" alt="">
      </div>
    </el-col>
    <el-col :span="8">
      <div class="top-title">电商后台管理系统</div>
    </el-col>
    <el-col :span="8">
      <div class="drop-out">
        <a href="#" @click.prevent="esc">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    esc() {
      this.$confirm("您确定要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 清除token
          window.localStorage.removeItem("token");
          // 跳转回登录页面
          this.$router.push("/login");
          this.$message({
            type: "success",
            message: "退出成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 0px;
}
.top-title {
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 24px;
}
.drop-out {
  float: right;
  line-height: 60px;
  padding-right: 10px;
}
.drop-out a {
  color: #fff;
  text-decoration: none;
}
</style>
