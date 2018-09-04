<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="4">
          <img src="@/assets/logo.png" alt="">
        </el-col>
        <el-col class="middle" :span="19">
          <span>电商后台管理系统</span>
        </el-col>
        <el-col :span="1">
          <a class="logout" href="#" @click.prevent="handleLogout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <el-menu
          :unique-opened="true"
          :router="true"
          style="height: 100%"
          default-active="0">
          <el-submenu index="1">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="/users">
              <i class="el-icon-view"></i>
              用户列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="/roles">
              <i class="el-icon-view"></i>
              角色列表
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-view"></i>
              权限列表
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item index="3-1">商品列表</el-menu-item>
            <el-menu-item index="3-2">分类参数</el-menu-item>
            <el-menu-item index="3-3">商品分类</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 判断是否登录
  beforeCreate() {
    const token = sessionStorage.getItem('token');
    // 判断是否获取到token
    if (!token) {
      // 如果token不存在，认为没有登录
      this.$message.warning('请先登录');
      this.$router.push('/login');
    }
  },
  methods: {
    // 退出
    handleLogout() {
      // 清除sessionStorage中的token
      sessionStorage.clear();
      //
      this.$message.success('退出成功');
      //
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.logout {
  text-decoration: none;
  color: orange;
}

.middle {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  color: #fff;
}

.el-container {
  height: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
  padding: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  /* text-align: center; */
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /* text-align: center; */
}
</style>
