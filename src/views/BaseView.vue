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

<style>
.container{
    height:100vh;
    margin: 120px 2em; 
    padding-bottom: 120px;
}

hr {
  background-color: #b7bcbd; 
  height: 1px; 
  border: 0; 
  margin : 2px 0;
}

h3 {
  font-size: 1.3em;
}

.overflow-y-disable {
  overflow-y: hidden;
}

@media (min-width: 768px) {
  .container{
    margin: 100px 3em;
    padding-bottom: 100px;
  }
}
</style>
