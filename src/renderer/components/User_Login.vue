<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="header">
        <h1>Welcome to Bodhi Note</h1>
      </div>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
          <button type="submit" class="login-button" @click="submitLogin">Login</button>
        </div>

      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <!-- 注册按钮 -->
      <button class="register-button" @click="goToRegister">Register</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/renderer/store'
export default {
  name: 'UserLogin',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitLogin () {
      try {
        // 发送登录请求到后端 API
        const authUrl = process.env.VUE_APP_URL_AUTHENTICATION
        const response = await axios.post(`${authUrl}/login`, {
          username: String(this.username),
          password: String(this.password)
        })
        // 处理响应
        if (!response.data.error) {
          this.$store.dispatch('updateUid', response.data.uid)
          console.log('uid is: ', store.getters.getuid)
          // 登录成功，跳转到主页面
          this.$router.push('/main')
        } else {
          // 登录失败，显示错误信息
          console.log('debug')
          this.errorMessage = response.data.error || 'Login failed. Please try again.'
        }
      } catch (error) {
        // 捕获错误并处理
        this.errorMessage = 'An error occurred while logging in. Please try again.'
        console.log('12345')
        console.error('Login error:', error)
      }
    },
    goToRegister () {
      // 跳转到注册页面的逻辑
      this.$router.push('/register')// 假设你使用 Vue Router 进行页面导航
    }
  }
}
</script>

<style scoped>
/* 背景和容器居中 */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 登录容器样式 */
.login-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
}

/* 表单组样式 */
.form-group {
  margin-bottom: 25px;
  text-align: left;
}
/* 输入框样式 */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #78ffd6;
  outline: none;
}
/* 登录按钮样式 */
.login-button {
  width: 100%;
  padding: 12px;
  background-color: #78ffd6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

/* 登录按钮悬停效果 */
.login-button:hover {
  background-color: #45ccb4;
  transform: scale(1.05);
}
/* 注册按钮样式 */
.register-button {
  width: 100%;
  padding: 12px;
  background-color: #fff;
  color: #45ccb4;
  border: 2px solid #45ccb4;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

/* 注册按钮悬停效果 */
.register-button:hover {
  background-color: #45ccb4;
  color: white;
  transform: scale(1.05);
}

/* 标题样式 */
h1 {
  margin-bottom: 30px;
  color: #333;
  font-size: 24px;
  font-weight: bold;
}
.header {
  margin-bottom: 20px;
}
</style>
