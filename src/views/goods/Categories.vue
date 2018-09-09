<template>
  <el-card class="card">
    <!-- 面包屑引用 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb> 
    <!-- 添加按钮 -->
    <el-button style="margin-top: 10px ; margin-bottom: 10px;"
    type="success" plain>添加分类</el-button>
    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
      </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
             <el-button size="mini"
               type="primary" icon="el-icon-edit" plain></el-button>
               <el-button size="mini"
               type="danger" icon="el-icon-delete" plain></el-button>
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
    }
  }
}
</script>

<!-- scoped h5提供 ,指定当前作用的范围 -->
<style scoped>

</style>
