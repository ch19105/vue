import Vue from 'vue';
import Router from 'vue-router';
// 1 @是src目录，在build的配置文件中配置的
//   @  webpack.base.conf 的第38行配置的

// 2 为什么可以省略掉.vue
// 加载一个模块的时候，如果省略后缀名，默认情况 先加载login.js，如果找不到再加载 login.json
// 默认的情况可以修改，在webpack.base.conf的35行配置
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/List';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';
import { Message } from 'element-ui';
import Categories from '@/views/goods/Categories';

Vue.use(Router);

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },{
          name: 'rights',
          path: '/rights',
          component: Rights
        },{
          name: 'roles',
          path: '/roles',
          component: Roles
        },{
          name: 'categories',
          path: '/categories',
          component: Categories
        }
      ]
    }
  ]
});


// / 设置路由的前置守卫（路由跳转之前）
router.beforeEach((to, from, next) => {
  // 判断有没有token
  if (to.name === 'login') {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      // 没有token，跳转到登录
      // this不是vue的实例
      // this.$router.push('/login');
      router.push('/login');
      // 提示
      // this不是vue的实例
      // this.$message.warning('请先登录');
      Message.warning('请先登录');
    }
  }
});

export default router;