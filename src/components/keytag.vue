<template>
    <div class="items" @mouseenter="overShow" @mouseleave="outHide">
        {{title}}
        <div class="option" v-show=isShow>
            <div class="btns edit" v-on:click="editClasses">编辑</div>
            <div class="btns delete" v-on:click="removeClasses">删除</div>
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
.items {
  font-size: 0.675rem;
  height: auto;
  text-align: center;
  padding: 0.375rem 0.75rem;
  background: #fff;
  margin: 0.8rem;
  border: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  min-width: 100px;
    .option {
      position: absolute;
      line-height: 14px;
      color: #7c7f81;
      text-align: center;
      top: 2rem;
      left: 18%;
      background: #fff;
      display: flex;
      justify-content: flex-start;
      flex-wrap: nowrap;
      .btns{
        border: 1px solid #e7eaec;
        cursor: pointer;
        box-sizing: border-box;
        padding: 1px 5px;
        &:hover{
          color: rgb(0, 136, 225);
        }
        &.delete{
          border-left: 0;
        }
      }
    }
}
</style>
