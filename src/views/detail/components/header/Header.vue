<template>
  <header class="app-header navbar nav-wiki">
    <div class="slogan">WIKI知识库</div>
    <div class="navbar-nav user">
      <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin">
      <span>马冬梅</span>
      <span>
        <i class="fa fa-sign-out"></i> 退出
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'md-header'
}
</script>
<style lang="scss">
.nav-wiki{
  background-color: #2294e3 !important;
  border: none !important;
  .slogan{
    padding-left: 2rem;
    font-size: 24px;
    font-weight: 900;
    color: #fff;
  }
  .user{
    padding-right: 2rem;
    color: #fff;
    img{
      width: 2.5rem;
    }
    span{
      margin-left: .3rem
    }
  }
}
</style>
