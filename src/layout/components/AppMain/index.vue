<template>
  <section class="app-main">
    <div class="app-container">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
    export default {
      name: "appmain",

      data() {
        return {}
      }
    }

</script>

<style scoped>
  .app-main{
    min-height: 100%;
    width: 1200px;
    min-width: 1100px;
    margin: 0 auto;
  }

  .app-container {
    /*background-color: #42b983;*/

    padding: 20px;
  }
</style>
