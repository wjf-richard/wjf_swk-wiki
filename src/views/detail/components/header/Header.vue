<template>
  <header class="app-header navbar nav-wiki">
    <div class="slogan">WIKI知识库</div>
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
}
</style>
