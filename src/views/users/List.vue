<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="row">
      <el-col :span="24">
        <!-- 搜索文本框 -->
        <el-input
          clearable
          v-model="searchValue"
          style="width: 300px"
          placeholder="请输入内容">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <!-- 序号列 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <!-- prop绑定对象的属性，当前列的数据 -->
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        label="用户状态">
        <template slot-scope="scope">
          <!-- 让开关绑定当前用户的 mg_state属性 -->
          <el-switch
            @change="handleChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <!-- 通过scope.$index可以获取到当前行的索引 -->
          <!-- scope.row 当前这一行所绑定的数据对象 -->
          <!-- {{ scope.row.id }} -->
          <el-button @click="handleOpenEditDialog(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button @click="handleDelete(scope.row.id)" size="mini" type="danger" icon="el-icon-delete" plain></el-button>
          <el-button size="mini" type="success" icon="el-icon-check" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!--
      事件
      size-change 页容量发生改变的时候执行
      current-change 页码改变的时候执行

      属性
      current-page 当前页码
      page-sizes 分页选择器 里显示的内容
      page-size 默认当前的页容量
      layout 布局
      total 总条数
     -->
    <el-pagination
      style="margin-top: 15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addUserDialogFormVisible"
      @close="handleClose">
      <el-form
        ref="form"
        :rules="rules"
        label-width="80px"
        :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 加载提示
      loading: true,
      // 分页数据
      // 页码
      pagenum: 1,
      // 页容量
      pagesize: 2,
      // 总数据量
      total: 0,
      // 绑定搜索文本框
      searchValue: '',
      // 控制添加用户对话框的显示或隐藏
      addUserDialogFormVisible: false,
      // 控制修改用户对话框的显示或隐藏
      editUserDialogFormVisible: false,
      // 绑定的表单对象
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      //表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
   
    };
  },
  created() {
    // 组件创建完毕，加载数据
    this.loadData();
  },
  methods: {
    // 异步请求用户列表数据
    async loadData() {
      // 请求开始
      this.loading = true;
      // 设置token
      const token = sessionStorage.getItem('token');
      // 设置请求头
      this.$http.defaults.headers.common['Authorization'] = token;

      const response = await this.$http.get(`users?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.searchValue}`);
      // 请求结束
      this.loading = false;

      const { meta: { msg, status } } = response.data;
      // 判断获取数据是否ok
      if (status === 200) {
        this.tableData = response.data.data.users;
        // 设置总条数
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页相关方法
    handleSizeChange(val) {
      // 页容量发送变化 val 页容量
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 当页码发送改变执行  val就是当前页码
      this.pagenum = val;
      this.loadData();

      console.log(`当前页: ${val}`);
    },
    // 搜索功能
    handleSearch() {
      this.loadData();
    },
    // 删除用户
    handleDelete(id) {
      // 删除提示
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定按钮执行
        // 在postman中测试接口
        const response = await this.$http.delete(`users/${id}`);

        // 获取返回的数据，判断删除是否成功
        const { meta: { status, msg } } = response.data;
        if (status === 200) {
          // 成功
          this.$message.success(msg);

          // 如果是最后一页，并且只有一条数据，此时删除数据会有问题
          if (this.pagenum > 1 && this.tableData.length === 1) {
            this.pagenum--;
          }
          // 刷新表格
          this.loadData();
        } else {
          // 失败
          this.$message.error(msg);
        }
      }).catch(() => {
        // 点击取消按钮执行
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 修改用户状态
    async handleChange(user) {
      // console.log(user);
      // 在postman中测试接口
      const response = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);

      const { meta: { status, msg } } = response.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    // 添加用户
    handleAdd() {
      //表单验证
      this.$refs.form.validate(async(valid) => {
          if (!valid) {
            this.$message.warning('验证失败');
            return;
          } 
           // 验证成功，发送异步请求
        const response = await this.$http.post('users', this.formData);
        // 获取数据，判断添加是否成功
        const { meta: { status, msg } } = response.data;
        if (status === 201) {
          // 成功
          // 提示
          this.$message.success(msg);
          // 刷新表格
          this.loadData();
          // 关闭对话框
          this.addUserDialogFormVisible = false;
        } else {
          // 失败
          this.$message.error(msg);
        }
        }); 
    },
    // 关闭对话框的时候，清空文本框
    handleClose() {
      // 遍历对象的所有属性，把属性对应的值设置为空
      for (let key in this.formData) {
        this.formData[key] = '';
      }
    },
   
  }
};
</script>

<style>
.card {
  height: 100%;
}
.row {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
