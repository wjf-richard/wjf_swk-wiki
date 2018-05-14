<template>
  <div>
    <Header/>
    <div class="app-body">
      <Sidebar @ievent="getArticleContent" @isArticleListEmpty="articleListEmpty"/>
      <main class="main">
        <template v-if=" isShow ">
          <div class="container-fluid welcome">
            <div class="animated fadeIn">
              <p class="text-info">欢迎来到WIKI知识库</p>
            </div>
          </div>
        </template>
        <template v-else-if=" noArticle ">
          <div class="container-fluid welcome">
            <div class="animated fadeIn">
              <p class="text-info">该分类没有相关文章</p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="container-fluid">
            <div class="md-header">
              <h5 class="title">{{articleContent.article.title}}</h5>
              <div class="tip">
                <div class="md-tag">作者: {{articleContent.article.author}}</div>
                <div class="md-tag">日期: {{articleContent.article.updatedAt}}</div>
                <div class="md-tag">浏览数: {{articleContent.article.pv}}次</div>
              </div>
              <div class="key-word">
                关键词:
                <div class="md-tag" v-for="(item, index) in articleContent.article.keywordTags" :key=index>
                  <i class="fa fa-tag"></i> <span>{{item.name}}</span>
                </div>
              </div>
              <div class="key-word">
                项目标签:
                <div class="md-tag" v-for="(item, index) in articleContent.article.projectTags" :key=index>
                  <i class="fa fa-tag"></i> <span>{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="md-content">
              <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="articleContent.textHtml"/>
            </div>
            <div class="md-footer">
              <div class="refen" v-show="isRef">
                <div class="text">参考:</div>
                <div class="href">
                  <a v-for="(item, index) in reference" :href="item.name" target="_blank" :key="index">{{item.name}}</a>
                </div>
              </div>
              <div class="refen" v-show="isAtta">
                <div class="text">附件:</div>
                <div class="href">
                  <a v-for="(item, index) in articleContent.article.attachments" :href="item.url" download="5555" :key="index">{{item.name}}</a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </main>
    </div>
  </div>
</template>

<script>
import { Header, Sidebar } from './components/'
import { getDetailArticleId } from '@/api/detail-api.js'
export default {
  name: 'detail',
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      articleContent: {},
      reference: [],
      nav: [],
      noArticle: false,
      isShow: true,
      isRef: false,
      isAtta: false,
      isOpenData: '',
      articleId: ''
    }
  },
  created () {
    if (localStorage.getItem('articleId')) {
      this.initArticleContent()
    }
  },
  methods: {
    initArticleContent () {
      this.noArticle = false
      this.isShow = false
      this.reference = []
      this.articleId = JSON.parse(localStorage.getItem('articleId'))
      this.getArticleContent(this.articleId)
    },
    deepCopy (obj) {
      var newObj = obj.constructor === Array ? [] : {}
      newObj.constructor = obj.constructor
      if (typeof obj !== 'object') {
        return
      } else if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
      } else {
        for (var prop in obj) {
          if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
            newObj[prop] = obj[prop]
          } else if (typeof obj[prop] === 'object') {
            newObj[prop] = this.deepCopy(obj[prop])
          } else {
            newObj[prop] = obj[prop]
          }
        }
      }
      return newObj
    },
    getArticleContent (articleId) {
      this.noArticle = false
      this.isShow = false
      this.reference = []
      this.articleId = articleId
      localStorage.setItem('articleId', JSON.stringify(this.articleId))
      getDetailArticleId(this.articleId).then(res => {
        this.articleContent = res.data.data
        if (res.data.data.article.attachments.length === 0) {
          this.isAtta = false
        } else {
          this.isAtta = true
        }
        let refer = res.data.data.article.reference
        if (refer) {
          this.isRef = true
          let arr = []
          let arr0 = res.data.data.article.reference.split('<p>')
          for (let item of arr0) {
            let arr1 = item.replace('</p>', '')
            arr.push(arr1)
          }
          for (let item of arr) {
            this.reference.push({
              name: item
            })
          }
        } else {
          this.isRef = false
        }
      })
    },
    articleListEmpty (value) {
      this.noArticle = value
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scope>
@import "./detail.scss";
.welcome{
  margin-top: 1.5rem
}
.v-note-wrapper{
    position: initial !important;
}
</style>
