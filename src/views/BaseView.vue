<template>
  <div>
    <app-navbar />
    <div class="router-view">
        <router-view></router-view>
    </div>
    
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';

export default {
  name: 'BaseView',
  components:{
    AppNavbar: Navbar
  }
}
</script>

<style >
.router-view{
    height:100vh;
    background-color: black;
}
</style>
