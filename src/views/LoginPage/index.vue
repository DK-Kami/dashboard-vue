<template>
  <div class="container login login_theme_dark">
    <el-row class="login__card">
      <el-col :span="8" class="login__selector">
        <div class="selector">
          <div class="selector__item active__item">Login <div class="triangle" /></div>
          <div class="selector__item active__item">Register <div class="triangle" /></div>
        </div>
      </el-col>
      <el-col :span="16">2</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;
}
.login__card {
  background-color: #fff;
  height: 600px;
  width: 850px;
  overflow: hidden;
  -webkit-box-shadow: 0px 0px 30px -3px rgba(0,0,0,0.96) !important;
  box-shadow: 0px 0px 15px 5px rgba(0, 0, 0, 0.2) !important;
}
.login_theme_dark {
  background: rgb(255,255,255);
  background: linear-gradient(145deg, white 0%, white 50%, $secondary-color 50.1%, $secondary-color 100%);
}

.login__selector {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $primary-color;

  .selector {
    text-align: left;

    .selector__item {
      display: flex;
      color: #fff;
      font-size: 40px;
      padding: 20px 0;
      width: 200px;
    }
  }

  .active__item>.triangle::before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 30px 52.0px 30px 0;
    border-color: transparent white transparent transparent;
    display: inline-block;
    position: relative;
    left: 70px;
    top: -5px;
  }
}
</style>