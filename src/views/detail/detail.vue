<template>
  <div>
    <Header/>
    <div class="app-body">
      <Sidebar :navItems="nav" @ievent="getArticleId" @nochild="notArticleId"/>
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
              <h5 class="title">{{mdForm.article.title}}</h5>
              <div class="tip">
                <div class="md-tag">作者: {{mdForm.article.author}}</div>
                <div class="md-tag">日期: {{mdForm.article.updatedAt}}</div>
                <div class="md-tag">浏览数: {{mdForm.article.pv}}次</div>
              </div>
              <div class="key-word">
                关键词:
                <div class="md-tag" v-for="(item, index) in mdForm.article.keywordTags" :key=index>
                  <i class="fa fa-tag"></i> <span>{{item.name}}</span>
                </div>
              </div>
              <div class="key-word">
                项目标签:
                <div class="md-tag" v-for="(item, index) in mdForm.article.projectTags" :key=index>
                  <i class="fa fa-tag"></i> <span>{{item.name}}</span>
                </div>
              </div>
            </div>
            <div class="md-content">
              <div v-html="mdForm.textHtml"></div>
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
                  <a v-for="(item, index) in mdForm.article.attachments" :href="item.url" download="5555" :key="index">{{item.name}}</a>
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
import { getDetailCategories, getDetailSubTitle, getDetailArticleId } from '@/api/detail-api.js'
export default {
  name: 'detail',
  components: {
    Header,
    Sidebar
  },
  data () {
    return {
      mdForm: {
        article: {
          title: '',
          author: ''
        }
      },
      reference: [],
      nav: [],
      noArticle: false,
      isShow: true,
      isRef: false,
      isAtta: false
    }
  },
  created () {
    this.initDetail()
  },
  methods: {
    initDetail () {
      getDetailCategories().then(res => {
        let cateArr = new Map(res.data.data.content.map((item, i) => [i, item]))
        for (let [key, item] of cateArr) {
          this.nav.push({
            id: item.id,
            name: item.name,
            isOpen: false,
            child: []
          })
          getDetailSubTitle(item.id).then(res => {
            for (let item of res.data.data) {
              this.nav[key].child.push({
                id: item.id,
                name: item.subtitle,
                isActive: false
              })
            }
          })
        }
      })
    },
    getArticleId (...data) {
      this.noArticle = false
      this.isShow = false
      this.reference = []
      getDetailArticleId(data[0].id).then(res => {
        this.mdForm = res.data.data
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
    notArticleId (noid) {
      this.noArticle = noid
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
</style>
