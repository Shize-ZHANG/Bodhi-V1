import { createApp } from 'vue'// 确保你在使用 Vue 3
import App from './renderer/App.vue'
import './renderer/assets/tailwind.css'
import contextmenu from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'
import store from './renderer/store'
import router from './router'// 引入新的 Vue 3 路由

// 使用 createApp 来初始化 Vue 3 应用
createApp(App)
  .use(contextmenu)
  .use(store)
  .use(router)// 使用路由
  .mount('#app')
