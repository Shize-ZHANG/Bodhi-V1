<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="submitLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>

      </form>
      <button class="login-button" @click="goToMain">Login</button>
      <!-- 注册按钮 -->
      <button class="register-button" @click="goToRegister">Register</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitLogin () {
      // 登录逻辑
      console.log('Username:', this.username)
      console.log('Password:', this.password)
    },
    goToRegister () {
      // 跳转到注册页面的逻辑
      this.$router.push('/register')// 假设你使用 Vue Router 进行页面导航
    },
    goToMain () {
      this.$router.push('/main')
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
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  font-family: Arial, sans-serif;
}

/* 登录容器样式 */
.login-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}




/* 表单组样式 */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

/* 输入框样式 */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

/* 登录按钮样式 */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #2575fc;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 登录按钮悬停效果 */
.login-button:hover {
  background-color: #6a11cb;
}

/* 注册按钮样式 */
.register-button {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  color: #2575fc;
  border: 1px solid #2575fc;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 注册按钮悬停效果 */
.register-button:hover {
  background-color: #2575fc;
  color: white;
}

/* 标题样式 */
h1 {
  margin-bottom: 20px;
  color: #333;
}
</style>
