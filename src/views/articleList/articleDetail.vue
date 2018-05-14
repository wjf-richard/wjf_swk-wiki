<template>
  <div>
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
        <mavon-editor defaultOpen="preview" :toolbarsFlag="false" :subfield="false" :preview="true" v-model="mdForm.textHtml"/>
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
          <a v-for="(item, index) in mdForm.article.attachments" :href="item.url" download="" :key="index">{{item.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticleDetailById } from '@/api/detail-api.js'
export default{
  data () {
    return {
      mdForm: {
        article: {
          title: '',
          author: ''
        }
      },
      reference: [],
      isRef: false,
      isAtta: false
    }
  },
  created () {
    this.initPreview()
  },
  methods: {
    initPreview () {
      getArticleDetailById(this.$route.query.articleId).then(res => {
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
        }
      })
    }
  }
}
</script>
<style lang="scss">
.md-header{
  color: #606266;
  padding-bottom: 20px;
  border-bottom: 1px solid #a4b7c1;
  .title{
    font-size: 20px;
    color: #676A6C;
  }
  .tip .md-tag{
    display: inline-block;
    font-size: 13px;
    color: #999999;
  }
  .key-word{
    color: #676A6C;
    font-size: 13px;
    margin-top: 8px;
    .md-tag {
      margin: 2px 0 2px 6px;
      display: inline-block;
      box-sizing: border-box;
      border: 1px solid #e5e7ea;
      background: #fff;
      font-size: 12px;
      border-radius: 4px;
      box-sizing: border-box;
      white-space: nowrap;
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
    }
  }
}
.md-content{
  padding: 10px 0;
}
.md-footer{
  padding: 15px 0;
  .refen{
    padding: 10px 0;
    border-top: 1px solid #a4b7c1;
    display: flex;
    justify-content: flex-start;
    .text{
      font-size: 13px;
    }
    .href{
      font-size: 13px;
      margin-left: 5px;
      a,a:hover,a:focus,a:active,a:visited{
        display: block;
        color: #20a8d8;
      }
    }
  }
}
.v-note-wrapper{
    position: initial !important;
}
</style>
