<template>
    <div class="cate-item" @mouseenter="overShow" @mouseleave="outHide">
        <div class="name">{{title}}</div>
        <div class="option" v-show=isShow>
          <div v-on:click="editClasses">
              <i class="fa fa-edit"></i> 编辑
            </div>
            <div v-on:click="removeClasses">
              <i class="fa fa-trash"></i> 删除
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      showText: false,
      hideText: true
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    overShow () {
      this.isShow = true
    },
    outHide () {
      this.isShow = false
    },
    removeClasses () {
      this.$emit('delete')
    },
    editClasses () {
      this.$emit('edit')
    }
  }
}
</script>
<style lang="scss">
.cate-item {
  font-size: 0.675rem;
  background: #fff;
  margin: 0.5rem 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  min-width: 240px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  .name{
    padding: 0.375rem 0.75rem;
  }
  .option {
    line-height: 14px;
    color: #7c7f81;
    text-align: center;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    &:hover {
      color: rgb(0, 136, 225);
    }
    div{
      border-left: 1px solid #ddd;
      cursor: pointer;
      padding: 0.375rem 0.75rem;
    }
  }
}
</style>
