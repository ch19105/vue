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
          <el-submenu
            v-for="level1 in menus"
            :key="level1.id"
            :index="level1.path">
            <!-- 显示的是父菜单的内容 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ level1.authName }}</span>
            </template>
            <!-- 菜单项 el-menu-item -->
            <el-menu-item
              v-for="level2 in level1.children"
              :key="level2.id"
              :index="'/' + level2.path">
              <i class="el-icon-view"></i>
              {{ level2.authName }}
            </el-menu-item>
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
  data() {
    return {
      // 获取菜单数据
      menus: []
    };
  },
  created() {
    // 加载菜单数据
    this.loadMenus();
  },
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
    },
    // 加载菜单数据
    async loadMenus() {
      const response = await this.$http.get('menus');
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.menus = response.data.data;
      }
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
