<template>
  <b-col lg="4" md="6" sm="12">
  <div class="animated fadeIn">
    <div class="setBox">
      <p>分类设置</p>
      <div class="itemBox">
        <!-- <cate-gory
          v-for="(item,index) in classes" :key="index"
          @edit="dialogEid(index)"
          @delete="removeClasses(index)"
          :title=item.name>
        </cate-gory> -->
        <drag-gable v-model="classes" :options="{draggable:'.cate-item'}" @end="onEndCallback">
            <cate-gory
              v-for="(item,index) in classes" :key="index"
              @edit="dialogEid(index)"
              @delete="removeClasses(index)"
              :title="item.name">
            </cate-gory>
        </drag-gable>
      </div>
      <div class="addBtn" @click="dialogFormAddSet = true"> <i class="fa fa-plus"></i> 添加分类</div>
    </div>
    <!-- 添加设置 -->
    <el-dialog title="添加分类" :visible.sync="dialogFormAddSet">
      <el-form :model="classList">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="classList.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类说明" :label-width="formLabelWidth">
          <el-input v-model="classList.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddSet = false">取 消</el-button>
        <el-button type="primary" @click="initAddClasses" >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑设置 -->
    <el-dialog title="编辑设置" :visible.sync="dialogFormEditSet">
      <el-form :model="updateClass">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="updateClass.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类说明" :label-width="formLabelWidth">
          <el-input v-model="updateClass.description" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditSet = false">取 消</el-button>
        <el-button type="primary" @click="initUpdateClasses">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </b-col>
</template>

<script>
import dragGable from 'vuedraggable'
import { getArticelClasses, addArticelClasses, updateArticelClasses, deteleArticelClasses, dragArticelClasses } from '@/api/category'
import cateGory from '@/components/category'
export default {
  components: {
    cateGory,
    dragGable
  },
  data () {
    return {
      isShow: false,
      dialogFormAddSet: false,
      dialogFormEditSet: false,
      classesIndex: '',
      classList: {
        createdAt: '',
        description: '',
        fatherId: 94,
        id: 96,
        level: 74,
        name: '',
        sort: '',
        updatedAt: ''
      },
      updateClass: [],
      classes: [],
      formLabelWidth: '100px'
    }
  },
  created () {
    this.initGetClasses()
  },
  methods: {
    initGetClasses () {
      getArticelClasses().then(res => {
        this.classes = res.data.data.content
      })
    },
    initAddClasses () {
      addArticelClasses(this.classList).then(res => {
        this.dialogFormAddSet = false
        this.initGetClasses()
      })
    },
    removeClasses (index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleArticelClasses(this.classes[index].id).then(res => {
            this.initGetClasses()
          })
        })
        .catch(() => {})
    },
    dialogEid (index) {
      this.dialogFormEditSet = true
      this.classesIndex = this.classes[index].id
      this.updateClass = Object.assign({}, this.classes[index])
    },
    onEndCallback (evt) {
      console.log(this.classes[evt.newIndex].id, this.classes)
      let sortForm = []
      for (let item of this.classes) {
        sortForm.push(item.id)
      }
      // console.log(sortForm.join(','))
      dragArticelClasses(sortForm).then(res => {
        this.initGetClasses()
      })
    },
    initUpdateClasses () {
      updateArticelClasses(this.classesIndex, this.updateClass).then(res => {
        this.dialogFormEditSet = false
        this.initGetClasses()
      })
    }
  }
}
</script>
<style lang="scss">
.setBox{
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
    padding-bottom: 40px;
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
