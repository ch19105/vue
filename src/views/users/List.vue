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
        <el-input
          style="width: 300px"
          placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <!-- 序列化 -->
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <!-- 绑定对象的属性 -->
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
        label="日期">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态"
        width="80">
        <template slot-scope="scope">
          <!-- 绑定到当前用户的mg_state属性 -->
          <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        label="操作"
        width="190">
        <template slot-scope="scope">
        <!-- 通过scope.$index可以获去当前行的索引 -->
        <!-- scope.row 当前行所绑定的数据对象 -->
      <el-button size="mini" type="primary" icon="el-icon-edit" plain></el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
      <el-button size="mini" type="success" icon="el-icon-check" plain></el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true
    };
  },
  created() {
    // 组件创建完毕,加载数据
    this.loadData();
  },
  methods: {
    // 异步请求用用户列表数据
    async loadData(){
      // 设置token
      const token = sessionStorage.getItem('token');
    // 设置请求头
      this.$http.defaults.headers.common['Authorization'] = token;    
     
     const response = await this.$http.get('users?pagenum=1&pagesize=10');
      // 请求结束
      this.loading = false;
      const {meta:{msg,status}} = response.data;
          if(status === 200 ) {
            //注意两个dta
            this.tableData = response.data.data.users;
          }else {
            this.$message.error(msg);
          }

      this.$http
        .get('users?pagenum=1&pagesize=10')
        .then((response) => {
        })
        .catch((err) => {
          console.log(err);
        })
    }
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
