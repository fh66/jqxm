<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/ext' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col :span="8">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="kp-btn">
          <el-button type="success" plain @click="addSibleBtn=true">添加</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" prop="id">
        <!-- {{item.id}} -->
      </el-table-column>
      <el-table-column prop="username" label="姓名">
        <!-- {{item.role_name}} -->
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
        <!-- {{item.email}} -->
      </el-table-column>
      <el-table-column prop="mobile" label="电话">
        <!-- {{item.mobile}} -->
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch
            @change="activating(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editBtn(scope.row.id)" icon="el-icon-edit" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" plain @click="del(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" plain @click="xiugai(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" :visible.sync="addSibleBtn">
      <el-form :model="addObj">
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="addObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="addObj.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="addObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ext">取 消</el-button>
        <el-button type="primary" @click="queDing">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改弹框 -->
    <el-dialog title="修改用户" :visible.sync="edit">
      <el-form :model="editObj">
        <el-form-item label="姓名" label-width="120px">
          <el-input :disabled="true" v-model="editObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editObj.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="editObj.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx1">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户管理 -->
    <el-dialog title="分配角色" :visible.sync="management">
      <el-form :model="managObj">
        <el-form-item label="姓名" label-width="120px">
          <el-input :disabled="true" v-model="managObj.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px">
          <template>
            <el-select v-model="managObj.rid" placeholder="请选择">
              <el-option :disabled="true" :value="-1" label="请选择职位"></el-option>
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="xiuGai1">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 搜索信息
      input5: "",
      // 数据总条数
      total: 0,
      // 数据源
      tableData: [],
      // 新增弹框
      addSibleBtn: false,
      // 页容量
      pagesize: 5,
      // 当前页
      pagenum: 1,
      // 修改信息
      edit: false,
      // 分配角色
      management: false,
      value: "",
      // 下拉框中的数据源
      options: [],
      managObj: {},
      addObj: {
        username: "",
        mobile: "",
        email: "",
        password: ""
      },
      editObj: {
        username: "",
        mobile: "",
        email: ""
      }
    };
  },
  methods: {
    getAlllist() {
      this.$http
        .get(`/users?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        .then(data => {
          // console.log(data);

          var { meta, data } = data.data;
          if (meta.status === 200) {
            this.tableData = data.users;
            this.total = data.total;
          }
        });
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        var res = await this.$http.request({
          url: `users/${id}`,
          method: "delete"
        });
        var { meta } = res.data;
        if ((meta.status = 200)) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.getAlllist();
        } else {
          this.$message.error(meta.msg);
        }
        console.log(id + "删除成功");
      });
    },
    addSible() {},
    //添加
    async queDing() {
      var res = await this.$http.post("/users", this.addObj);
      var { meta, data } = res.data;
      if (meta.status === 201) {
        this.getAlllist();
        this.$message({
          message: meta.msg,
          type: "success"
        });
      }
      this.addSibleBtn = false;
    },
    ext() {
      this.addSibleBtn = false;
    },
    // 修改信息
    async editBtn(id) {
      this.edit = true;
      var res = await this.$http.request({
        url: `/users/${id}`,
        methods: "get"
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.editObj = data;
      }
    },
    // 确定修改
    async determine() {
      var res = await this.$http.request({
        url: `/users/${this.editObj.id}`,
        method: "put",
        data: {
          email: this.editObj.email,
          mobile: this.editObj.mobile
        }
      });
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
      } else {
      }
      this.edit = false;
      this.editObj = {};
      this.getAlllist();
    },
    // 取消
    qx1() {
      this.edit = false;
    },
    // 当页容器改变时触发
    sizeChange(size) {
      // alert(size)
      this.pagesize = size;
      this.getAlllist();
    },
    // 当从一页跳转到另一页时触发
    currentChange(size) {
      this.pagenum = size;
      this.getAlllist();
    },
    // 激活按钮
    async activating(id, state) {
      // console.log(id,state);
      var res = await this.$http.put(`/users/${id}/state/${state}`);
      var { meta } = res.data;
      if (meta.status === 200) {
        this.$message = {
          message: meta.msg,
          type: "success"
        };
      } else {
        this.$message.error(meta.msg);
      }
    },
    // 根据ID获取角色信息
    async xiugai(id) {
      this.getRoleList();
      this.management = true;
      var res = await this.$http.request({
        url: `users/${id}`,
        method: "get"
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.managObj = data;
      }
    },
    // 动态获取下拉框的数据
    async getRoleList() {
      var res = await this.$http.request({
        url: `/roles`,
        method: "get"
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.options = data;
      } else {
        this.$message.error("数据查询失败");
      }
    },
    // 点击修改完成修改角色信息
    async xiuGai1() {
      var res = await this.$http.request({
        url: `users/${this.managObj.id}/role`,
        method: "put",
        data: {
          rid: this.managObj.rid
        }
      });
      var { meta, data } = res.data;
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: "success"
        });
        this.options = data;
        this.management = false;
        this.getAlllist();
      } else {
        this.$message.error(meta.msg);
      }
    },
    qx() {
      this.management = false;
    }
  },
  mounted(id) {
    this.getAlllist();
  }
};
</script>

<style>
.box-card {
  width: 100%;
}
.kp-btn {
  margin-top: 15px;
}
.el-button + .el-button {
  margin-left: 0;
}
.kp-btn {
  margin-left: 10px;
}
.el-row {
  margin-bottom: 15px;
}
</style>
