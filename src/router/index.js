import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../renderer/components/User_Login.vue'
import UserRegister from '../renderer/components/User_Register.vue' // 修改路径
import UserMain from '../renderer/components/User_Main.vue'
// 路由配置
const routes = [
  {
    path: '/',
    component: UserLogin
  },
  {
    path: '/register',
    component: UserRegister
  },
  {
    path: '/main', // 为新页面添加路径
    component: UserMain// 新页面组件
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
