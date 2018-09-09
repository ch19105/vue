<template>
  <el-card class="card">
    <!-- 面包屑引用 -->
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb> 
    <!-- 添加按钮 -->
    <el-button style="margin-top: 10px ; margin-bottom: 10px;"
    type="success"
    @click="handleOpenAddDialog"
    plain>添加分类</el-button>
    <!-- 表格 -->
    <!-- height-属性 - 固定表头 -->
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
               @click="handleOpenEditDialog(scope.row)"
               type="primary" icon="el-icon-edit" plain></el-button>
               <el-button size="mini"
               @click="handleDelete(scope.row)"
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
  
    <!-- 添加的弹出框 -->
    <el-dialog
    title="添加商品分类"
    :visible.sync="addDialogFormVisible">
      <el-form
      label-width="80px"
      :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 多级下拉框
          expand-trigger 触发展开的事件
          options 提供展示的数据 是数组 
          change-on-select 选择任一级菜单-->
          <el-cascader
           clearable
           change-on-select
           expand-trigger="hover"
           :options="options"
           :props="{label: 'cat_name', value: 'cat_id', children: 'children'}"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleAdd">确 定</el-button>
    </div>
    </el-dialog>

    <!-- 编辑弹框 -->
     <el-dialog
    title="修改商品分类"
    :visible.sync="editDialogFormVisible">
      <el-form
      label-width="80px"
      :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

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
      total: 0,

      //控制添加对话框的显示与隐藏
      addDialogFormVisible: false,
      // 编辑的对话框显示与隐藏
      editDialogFormVisible: false,
      form : {
        cat_name: ''
      },

      // 绑定多级下拉框
      options: [],
      selectedOptions: []
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
    },
  // 点击添加按钮，弹出添加对话框，加载多级下拉框数据
    async handleOpenAddDialog() {
      this.addDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      this.options = response.data.data;
    },

  //点击确定按钮,添加分类
    async handleAdd() {
      
      // cat_level  0 1 2
      // cat_level  this.selectedOptions.length === 0 -- 0  一级
      // cat_level  this.selectedOptions.length === 1 -- 1  二级
      // cat_level  this.selectedOptions.length === 2 -- 2  三级
      this.form.cat_level = this.selectedOptions.length;

      // cat_pid  一级分类 0
      // cat_pid  二级分类 this.selectedOptions[0]
      // cat_pid  三级分类 this.selectedOptions[1]
      if (this.selectedOptions.length === 0 ) {
        //添加一级分类
        this.form.cat_pid = 0
      } else if (this.selectedOptions.length === 1 ) {
        //添加二级分类
        this.form.cat_pid = this.selectedOptions[0];
      } else if (this.selectedOptions.length === 2 ) {
        // 添加三级分类
        this.form.cat_pid = this.selectedOptions[1];
      }
      //发送异步请求 ,添加商品分类
      const response = await this.$http.post('categories',this.form);
      const { meta : { msg , status }} = response.data;
      if (status === 201 ) {
        // 添加成功
        this.$message.success(msg);
        // 关闭对话框
        this.addDialogFormVisible = false;
        // 刷新
        this.loadData();
      }else {
        this.$message.error(msg);
      }

    },
    //点击删除按钮, 删除分类
    async handleDelete(cat) {
      //cat 要删除的分类对象
      //删除提示 这是promise , 所一简化代码,.then/.catch都不要
      try {
         await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        });
    //  点击完确定按钮要执行的代码
        const response = await this.$http.delete(`categories/${cat.cat_id}`);
        //解构
        const { meta : { msg , status } } = response.data;
        if ( status === 200 ) {
          this.$message.success(msg);
          // 刷新页面
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      }catch(err) {
        // 点击取消按钮执行
        alert(2)
      }
     
    },
    // 点击修改按钮 ,修改
    handleOpenEditDialog(cat) {
      this.editDialogFormVisible = true;
      this.form.cat_name = cat.cat_name;
    }
  }
};
</script>

<!-- scoped h5提供 ,指定当前作用的范围 -->
<style scoped>

</style>
