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
      :height="578"
      :data="tableData"
      style="width: 100%">
      <!-- treeKey 设置每一项的唯一标识
      parentKey 绑定到父id的属性
      levelKey  绑定到不同级别的属性
      indentSize 设置不同级别之间的缩进
      childKey  展开子元素,,默认值,children -->
      <el-table-tree-column
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        :indentSize="25"
        prop="cat_name"
        label="分类名称"
        width="300">
      </el-table-tree-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级 </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>

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

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 5px">
    </el-pagination>

  </el-card>
</template>

<script>

// 配置tree grid的局部组件
import ElTreeGrid from 'element-tree-grid';

export default {
  // 注册局部组件
  components: {
    'el-table-tree-column' : ElTreeGrid
  },
  data() {
    return {
      tableData: [],
      // 分页数据
      pagenum: 1,
      pagesize: 10,
      total: 0

    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载商品分类数据
    async loadData() {
      const response = await this.$http.get(`categories?type
      =3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);

      const { meta: { msg ,status }} = response.data;
      if (status === 200) {
        this.tableData = response.data.data.result;
        // 获取响应之后,设置total的值
        this.total = response.data.data.total;
      }else {
        this.$message.error(msg);
      }
    
    },
    // 分页方法
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pagenum = val;
        this.loadData();
        console.log(`当前页: ${val}`);
      }
  }
}
</script>

<!-- scoped h5提供 ,指定当前作用的范围 -->
<style scoped>

</style>
