<template>
  <el-container class="app-container">
    <router-view />
  </el-container>
</template>

<style lang="scss">
body {
  margin: 0;
}

.app-container {
  min-height: 100vh;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  background: #d3dce6;
}
</style>
