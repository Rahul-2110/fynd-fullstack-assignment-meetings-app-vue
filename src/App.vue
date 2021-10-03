<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}

*::-webkit-scrollbar {
  display: none;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}


</style>
