<template>
  <div class="register-wrapper">
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="submitRegister">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
      <button @click="goToLogin">Back to Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submitRegister () {
      // 处理注册逻辑
      console.log('Username:', this.username)
      console.log('Email:', this.email)
      console.log('Password:', this.password)
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
  background: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%);
  font-family: Arial, sans-serif;
}

.register-container {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
}

.register-button {
  width: 100%;
  padding: 10px;
  background-color: #ff6a00;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-button:hover {
  background-color: #ee0979;
}

h1 {
  margin-bottom: 20px;
  color: #333;
}
</style>
