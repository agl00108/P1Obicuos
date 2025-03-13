<template>
  <router-view></router-view>
</template>

<script>
import HomeView from "./components/HomeView.vue";

export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600&display=swap');
</style>
