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

Vue.use(Router);

export default new Router({
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
        }
      ]
    }
  ]
});
