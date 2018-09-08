<template>
    <el-card class="card">
        <!-- 面包屑引用 -->
       <my-breadcrumb level1="权限管理" level2="角色管理"></my-breadcrumb>
       <!-- 按钮 -->
        <el-button style="margin-top: 10px; margin-bottom: 10px">添加角色</el-button>
        <!-- 表格 -->
        <!-- 边框 stripe斑马纹 隔行 -->
        <el-table
          border
          stripe
          :data="tableData"
          style="width: 100%">
          <!-- 展开行  expand-->
          <el-table-column type="expand">
            <template slot-scope="scope">
              hello
            </template>
          </el-table-column>
          <el-table-column
              type="index"
              width="60">
          </el-table-column>
          <el-table-column
              prop="roleName"
              label="角色名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="roleDesc"
              label="角色描述"
              width="180">
          </el-table-column>
          <el-table-column
             label="操作">
             <template slot-scope="scope"> 
               <el-button size="mini"
               type="primary" icon="el-icon-edit" plain></el-button>
               <el-button size="mini"
               type="danger" icon="el-icon-delete" plain></el-button>
               <el-button size="mini"
               type="success" icon="el-icon-check" plain></el-button>
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
    }
};
</script>

<style>
.card {
    height: 100%;
    overflow: auto;
}
</style>
