<template>
<b-col lg="4" md="6" sm="12">
  <div class="animated fadeIn">
    <div class="tagBox">
      <p>关键词设置</p>
      <div class="itemBox">
        <key-tag v-for="(item,index) in keyWords" :key="index" @edit="dialogEid(index)" @delete="removeKeyWord(index)" :title=item.name>
        </key-tag>
        <div class="items addBtn" @click="dialogFormAddSet = true">
          <i class="fa fa-plus"></i> 添加关键词</div>
      </div>
    </div>
    <!-- 添加关键词 -->
    <el-dialog title="添加关键词" :visible.sync="dialogFormAddSet">
      <el-form :model="keyWordList">
        <el-form-item label="关键词名称" :label-width="formLabelWidth">
          <el-input v-model="keyWordList.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormAddSet = false">取 消</el-button>
        <el-button type="primary" @click="initAddKeyWord">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑关键词 -->
    <el-dialog title="编辑关键词" :visible.sync="dialogFormEditSet">
      <el-form :model="updatekeyWord">
        <el-form-item label="关键词名称" :label-width="formLabelWidth">
          <el-input v-model="updatekeyWord.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormEditSet = false">取 消</el-button>
        <el-button type="primary" @click="initUpdateKeyWord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
  </b-col>
</template>

<script>
import {
  getAllKeyWords,
  addKeyWords,
  updateKeyWords,
  deteleKeyWords
} from '@/api/keyWords'
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
      keyWordIndex: '',
      keyWordList: {
        id: '',
        name: ''
      },
      updatekeyWord: '',
      keyWords: '',
      formLabelWidth: '100px'
    }
  },
  created () {
    this.initGetKeyWords()
  },
  methods: {
    initGetKeyWords () {
      getAllKeyWords().then(res => {
        this.keyWords = res.data.data.content
      })
    },
    initAddKeyWord () {
      addKeyWords(this.keyWordList).then(res => {
        this.dialogFormAddSet = false
        this.initGetKeyWords()
      })
    },
    removeKeyWord (index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleKeyWords(this.keyWords[index].id).then(res => {
            this.initGetKeyWords()
          })
        })
        .catch(() => {})
    },
    dialogEid (index) {
      this.dialogFormEditSet = true
      this.classesIndex = this.keyWords[index].id
      this.updatekeyWord = Object.assign({}, this.keyWords[index])
    },
    initUpdateKeyWord () {
      updateKeyWords(this.classesIndex, this.updatekeyWord).then(res => {
        this.dialogFormEditSet = false
        this.initGetKeyWords()
      })
    }
  }
}
</script>
