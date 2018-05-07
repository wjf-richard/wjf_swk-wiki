<template>
  <b-nav-item-dropdown right no-caret>
    <template slot="button-content">
      <span>{{user_name}}</span>
      <img src="static/img/avatars/1.jpg" class="img-avatar" alt="admin">
    </template>
    <b-dropdown-header tag="div" class="text-center">
      <strong>设置</strong>
    </b-dropdown-header>
    <!-- <b-dropdown-item><i class="fa fa-user"></i> 个人设置</b-dropdown-item> -->
    <b-dropdown-item @click="siginout">
      <i class="fa fa-sign-out"></i> 退出登录</b-dropdown-item>
  </b-nav-item-dropdown>
</template>
<script>
export default {
  name: 'header-dropdown',
  data: () => {
    return {
      itemsCount: 0,
      user_name: '系统管理员'
    }
  },
  methods: {
    siginout () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {})
        .catch(() => {})
    }
  }
}
</script>
