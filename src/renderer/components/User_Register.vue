<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="header">
        <h1>Create Your Account</h1>
      </div>
      <form @submit.prevent="submitRegister">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button  class="back-button" @click="goToLogin">Back to Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserRegister',
  data () {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitRegister () {
      try {
        // 发送注册请求到后端 API
        // console.log(this.username, this.password)
        const response = await axios.post('http://localhost:8082/register', {
          username: String(this.username),
          password: String(this.password)
        })
        console.log(response.data)
        // 处理响应
        if (response.data.message === 'User registered successfully') {
          // 注册成功，显示成功消息并跳转到登录页面
          this.successMessage = 'Registration successful. Redirecting to login...'
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        } else {
          // 注册失败，显示错误信息
          this.errorMessage = response.data.message || 'Registration failed. Please try again.'
        }
      } catch (error) {
        // 捕获错误并处理
        this.errorMessage = 'An error occurred during registration. Please try again.'
        console.error('Registration error:', error)
      }
    },
    goToLogin () {
      // 跳转到登录页面
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
/* 注册页面的样式 */
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0f7fa 0%, #c8e6c9 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-container {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}
h1 {
  margin-bottom: 30px;
  color: #2e7d32;
  font-size: 24px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  transition: border-color 0.3s ease;
}
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #4caf50;
  outline: none;
}
.register-button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.register-button:hover {
  background-color: #388e3c;
  transform: scale(1.05);
}
/* 返回按钮样式 */
.back-button {
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #4caf50;
  border: 2px solid #4caf50;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.back-button:hover {
  background-color: #4caf50;
  color: white;
  transform: scale(1.05);
}
h1 {
  margin-bottom: 20px;
  color: #333;
}
</style>
