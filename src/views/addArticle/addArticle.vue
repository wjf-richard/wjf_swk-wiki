<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            新建文章
          </div>
          <el-form ref="articleForm" :model="articleForm" :rules="rules" label-width="120px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="articleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="短标题" prop="subtitle">
              <el-input v-model="articleForm.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="articleForm.author" disabled></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="className">
              <el-select v-model="articleForm.className" placeholder="请选择类别" value-key="id" @change="classChange">
                <el-option v-for="item in classSelete" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关键词" >
              <el-select v-model="articleForm.keywordTags" multiple default-first-option value-key="id" @change="keyWordChange" placeholder="请选择文章关键词">
                <el-option v-for="item in keyWordsSelete" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目标签">
              <el-select v-model="articleForm.projectTags" multiple default-first-option value-key="id" @change="projectTagChange" placeholder="请选择项目标签">
                <el-option v-for="item in projectTagsSelete" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="正文内容" >
              <mavon-editor @save="saveContent" v-model="articleForm.content.text" prop="content" ref=md @imgAdd="$imgAdd"/>
            </el-form-item>
            <el-form-item label="参考">
              <div class="quill-editor-example">
                <quill-editor class="editor-example bubble"
                  ref="myTextEditor"
                  :options="editorOption"
                  :content="articleForm.reference"
                  v-model="articleForm.reference">
                </quill-editor>
              </div>
              <span style="font-size:13px;"><span style="color:#f00;">提示：</span>多个参考请用换行隔开；</span>
            </el-form-item>
            <el-form-item label="附件">
              <label for="upload" class="file-label">上传附件<i class="fa fa-upload"></i>
                <input type="file" id="upload" @change='selectFile' hidden="">
              </label>
              <div v-for="(item, index) in articleForm.attachments" :key="index">
                <file-list :fileName.sync=item.name @delete="deleteFile(index)"></file-list>
              </div>
            </el-form-item>
            <div class="form-actions">
              <b-button type="button" class="submit" @click="submit">保存</b-button>
              <b-button type="button" variant="outline-secondary" @click="cancle">取消</b-button>
            </div>
          </el-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getArticelClasses } from '@/api/category'
import { getAllKeyWords } from '@/api/keyWords'
import { getAllProjectTag } from '@/api/projectTips'
import { addArticelContent } from '@/api/articleContent'
import { addArticle } from '@/api/articleList'
import { uploadAttachment } from '@/api/uploadFile'
import fileList from '@/components/fileList'
export default {
  name: 'addArticle',
  components: { fileList },
  data () {
    return {
      editorOption: {
        theme: 'bubble',
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        }
      },
      contentForm: {
        text: '',
        textHtml: ''
      },
      categoryId: '',
      articleForm: {
        attachments: [],
        author: '太空漫步',
        content: {
          text: ''
        },
        keywordTags: '',
        projectTags: '',
        className: '',
        reference: '',
        title: '',
        subtitle: '',
        unionId: 'user007'
      },
      classSelete: [],
      keyWordsSelete: [],
      projectTagsSelete: [],
      rules: {
        title: [
          { required: true, message: '文章标题不能为空，请输入文章标题', trigger: 'blur' }
        ],
        subtitle: [
          { required: true, message: '文章短标题不能为空，请输入文章短标题', trigger: 'blur' },
          { min: 3, message: '建议长度在 3 到 10 个中文字符左右', trigger: 'change' }
        ],
        className: [
          { required: true, message: '请选择文章分类', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  created () {
    this.initGetClasses()
    this.initGetKeyWords()
    this.initGetProjectTag()
  },
  methods: {
    initGetClasses () {
      getArticelClasses().then(res => {
        this.classSelete = res.data.data.content
      })
    },
    initGetKeyWords () {
      getAllKeyWords().then(res => {
        this.keyWordsSelete = res.data.data.content
      })
    },
    initGetProjectTag () {
      getAllProjectTag().then(res => {
        this.projectTagsSelete = res.data.data.content
      })
    },
    classChange (index) {
      this.categoryId = index.id
    },
    keyWordChange (index) {
      this.articleForm.keywordTags = index
    },
    projectTagChange (index) {
      this.articleForm.projectTags = index
    },
    $imgAdd (pos, file) { // markdowm 上传图片
      let $vm = this.$refs.md
      var formdata = new FormData()
      formdata.append('file', file)
      uploadAttachment(formdata).then((res) => {
        $vm.$img2Url(pos, res.data.data.url)
      })
    },
    saveContent (value, render) {
      this.contentForm.text = value
      this.contentForm.textHtml = render
    },
    selectFile (event) {
      let file = event.target.files[0]
      var formdata = new FormData()
      formdata.append('file', file)
      uploadAttachment(formdata).then((res) => {
        this.articleForm.attachments.push({
          name: event.target.files[0].name,
          url: res.data.data.url
        })
      })
    },
    deleteFile (index) {
      this.articleForm.attachments.splice(index, 1)
    },
    submit () {
      this.contentForm.text = this.$refs.md.d_value
      this.contentForm.textHtml = this.$refs.md.d_render
      if (this.articleForm.content.text.length <= 0) {
        alert('正文内容不能为空，请填写正文内容')
      } else {
        this.$refs.articleForm.validate((valid) => {
          if (valid) {
            addArticle(this.categoryId, this.articleForm).then(res => {
              let articelId = res.data.data.id
              addArticelContent(articelId, this.contentForm).then(res => {
                let status = res.status
                if (status === 200) {
                  alert('添加成功')
                  this.$router.push({path: 'articleList'})
                } else {
                  alert('服务器出错，修改失败')
                }
              })
            })
          } else {
            alert('提交失败!!')
            return false
          }
        })
      }
    },
    cancle () {
      this.$router.push({path: 'articleList'})
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
.quill-editor,.quill-code {
  height: 3rem;
}
.quill-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.quill-code {
  border: none;
  height: auto;
}

</style>
