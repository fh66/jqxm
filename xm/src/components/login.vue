<template>
  <div class="box">
    <div class="content">
      <h2>用户登录</h2>
      <el-form
        label-position="top"
        :model="loginObj"
        status-icon
        :rules="exmn"
        ref="loginObj"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="mybtn">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      loginObj: {
        username: "",
        password: ""
      },
      exmn: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "长度在不少于3个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
    methods: {
    login() {
      this.$http.post("/login", this.loginObj).then(data => {
        var { meta, data } = data.data;
        console.log(data);
        
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.$router.push("/ext");
          window.localStorage.setItem('token',data.token)
        } else{
          this.$message({
          message: meta.msg,
          type: 'error'
        });
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box {
  width: 100%;
  height: 100%;
  background: #2c3742;
  position: relative;
}
.content {
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
}
.mybtn {
  width: 100%;
}
</style>
