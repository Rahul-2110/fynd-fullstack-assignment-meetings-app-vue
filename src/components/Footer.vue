<template>
  <div class="footer">
      <p>Developed By, Rahul <a href="https://github.com/BoredUser/fynd-fullstack-assignment-meetings-app-vue.git" target="_blank"><i class="fab fa-github"></i></a></p>
  </div>
</template>

<script>
export default {
    name: "Footer"

}
</script>

<style scoped>
.footer{
    position: fixed;
    bottom: 0; 
    display: flex;
    background-color: #eeeeee;
    width: 100vw;
    height: 50px;
    color: #a3a4a5;
    text-align: center;
    flex-direction: column;
    align-items: center;
    
    p{
      margin: auto;
    }
}

.fab{
    color: #000;
}

</style>
