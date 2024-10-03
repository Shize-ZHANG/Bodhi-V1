<template>
  <HelloWorld msg="Welcome to Your Bodhi Note App"/>
  <router-view></router-view>
  <router-link to="/welcome">Go to Welcom Page</router-link>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import HomePage from './components/HomePage.vue';

export default {
  name: 'App',
  // components: {
  //   HomePage
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
