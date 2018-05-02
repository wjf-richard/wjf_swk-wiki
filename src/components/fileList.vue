<template>
 <div class="file-list">
    <div class="file-icon"><i class="fa fa-file-archive-o"></i></div>
    <div class="file-content">
      <span class="file-name">{{fileName}}</span>
      <span class="file-delete" @click="deleteFile"><i class="fa fa-trash"></i> 删除</span>
    </div>
  </div>
</template>
<script>
export default{
  props: {
    fileName: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteFile () {
      this.$emit('delete')
    }
  }
}
</script>
