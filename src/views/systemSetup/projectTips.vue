<template>
<b-col lg="4" md="6" sm="12">
  <div class="animated fadeIn">
    <div class="tagBox">
      <p>项目标签设置</p>
      <div class="itemBox">
        <key-tag v-for="(item,index) in projectTags" :key="index" @edit="dialogEid(index)" @delete="removeProjectTag(index)" :title=item.name>
        </key-tag>
        <div class="items addBtn" @click="dialogFormAddSet = true">
          <i class="fa fa-plus"></i> 添加项目标签</div>
      </div>
    </div>
    <!-- 添加项目标签 -->
    <el-dialog title="添加项目标签" :visible.sync="dialogFormAddSet">
      <el-form :model="projectTagsList">
        <el-form-item label="项目标签名称" :label-width="formLabelWidth">
          <el-input v-model="projectTagsList.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddSet = false">取 消</el-button>
        <el-button type="primary" @click="initAddProjectTag">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑项目标签 -->
    <el-dialog title="编辑项目标签" :visible.sync="dialogFormEditSet">
      <el-form :model="updateProjectTag">
        <el-form-item label="项目标签名称" :label-width="formLabelWidth">
          <el-input v-model="updateProjectTag.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditSet = false">取 消</el-button>
        <el-button type="primary" @click="initUpdateProjectTag">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</b-col>
</template>

<script>
import {
  getAllProjectTag,
  addProjectTag,
  updateProjectTag,
  deteleProjectTag
} from '@/api/projectTips'
import keyTag from '@/components/keytag'
export default {
  components: {
    keyTag
  },
  name: 'systemSetup',
  data () {
    return {
      isShow: false,
      dialogFormAddSet: false,
      dialogFormEditSet: false,
      projectTagIndex: '',
      projectTagsList: {
        id: '',
        name: ''
      },
      updateProjectTag: '',
      projectTags: '',
      formLabelWidth: '100px'
    }
  },
  created () {
    this.initGetProjectTag()
  },
  methods: {
    initGetProjectTag () {
      getAllProjectTag().then(res => {
        this.projectTags = res.data.data.content
      })
    },
    initAddProjectTag () {
      addProjectTag(this.projectTagsList).then(res => {
        this.dialogFormAddSet = false
        this.initGetProjectTag()
      })
    },
    removeProjectTag (index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleProjectTag(this.projectTags[index].id).then(res => {
            this.initGetProjectTag()
          })
        })
        .catch(() => {})
    },
    dialogEid (index) {
      this.dialogFormEditSet = true
      this.projectTagIndex = this.projectTags[index].id
      this.updateProjectTag = Object.assign({}, this.projectTags[index])
    },
    initUpdateProjectTag () {
      updateProjectTag(this.projectTagIndex, this.updateProjectTag).then(res => {
        this.dialogFormEditSet = false
        this.initGetProjectTag()
      })
    }
  }
}
</script>
<style lang="scss">
.tagBox{
   width: 100%;
   min-height: 360px;
   padding: 1rem;
   background: rgb(247, 247, 247);
   color: rgb(124, 127, 129);
   margin: 1.25rem 0;
   position: relative;
  p{
    margin: 0 !important;
  }
  .itemBox{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-bottom: 35px;
    .items:hover{
    border: 1px solid rgb(0, 136, 225);
    cursor: pointer;
    }
  }
  .addBtn{
    font-size: 0.675rem;
    height: auto;
    text-align: center;
    padding: 0.375rem 0.75rem;
    background: #fff;
    margin: 0.8rem;
    border: 1px solid #ddd;
    min-width: 80px;
    background: rgb(34, 148, 227) !important;
    color: #fff;
    cursor: pointer;
    position: absolute !important;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
}

</style>
