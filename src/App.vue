<template>
  <HomeView />
</template>

<script>
import HomeView from "@/components/homeView.vue";

export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap');

#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #b0d9f5;
  height: 100vh;
  margin: 0;
}
</style>
