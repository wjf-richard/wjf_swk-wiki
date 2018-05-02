<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#">WIKI知识库后台</b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav user">
      <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin">
      <span>马冬梅</span>
      <span class="out">
        <i class="fa fa-sign-out"></i> 退出
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'c-header',
  methods: {
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-nav{
  margin-right:1rem
}
.user span{
  margin-left: .2rem
}
.user img{
  width: 2.5rem;
}
.out{
  cursor: pointer;
}
</style>
