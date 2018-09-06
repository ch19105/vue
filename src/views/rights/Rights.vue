<template>
    <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>   
    </el-breadcrumb>
        <!-- 表格 -->
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%; margin-top: 10px">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
    return {
      tableData: []
    }
  }
}
</script>

<style>
.card {
    width: 100%;
    height: 100%;
}
</style>

