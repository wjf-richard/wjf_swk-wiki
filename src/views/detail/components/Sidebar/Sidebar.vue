<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(category, index) in categoryList" >
          <template>
            <li class="nav-item nav-dropdown" :class="{open:category.isOpen}"  disabled :key="index" >
              <div class="nav-link nav-dropdown-toggle" @click="categoryOnClick(category.id, categoryList)">{{category.name}}</div>
              <template if="this.articleList.categoryId === item.id">
                <ul class="nav-dropdown-items">
                  <li class="nav-item" v-for="(article, index) in articleList.data" :key="index">
                    <div @click="getArticleContent(article)">
                      <span class="nav-link nav-link-item fold" :class="{ on:article.isActive }">
                        {{article.name}}
                      </span>
                    </div>
                  </li>
                </ul>
              </template>
            </li>
          </template>
        </template>
      </ul>
    </nav>
  </div>
</template>
<script>
import { getDetailCategories, getDetailSubTitle } from '@/api/detail-api.js'
export default {
  name: 'sidebar',
  data () {
    return {
      categoryList: [],
      articleList: {
        categoryId: '',
        data: []
      },
      categoryId: ''
    }
  },
  created () {
    this.getCategoryList()
    this.getArticleList(localStorage.getItem('categoryId'))
  },
  methods: {
    getCategoryList () {
      let localStorageCategoryId = localStorage.getItem('categoryId')
      getDetailCategories().then(res => {
        let categoryMap = new Map(res.data.data.content.map((item, i) => [i, item]))
        for (let [key, category] of categoryMap) {
          let isOpen = false
          if (parseInt(localStorageCategoryId) === parseInt(category.id)) {
            isOpen = true
          }
          this.categoryList.push({
            id: category.id,
            name: category.name,
            isOpen: isOpen,
            key: key
          })
        }
      })
    },
    categoryOnClick (categoryId, categoryList) {
      localStorage.setItem('categoryId', categoryId)
      for (let category of categoryList) {
        if (category.id === categoryId && category.isOpen === true) {
          category.isOpen = false
          return
        }
        if (category.id === categoryId) {
          category.isOpen = true
        } else {
          category.isOpen = false
        }
      }
      this.clearArticleList()
      this.getArticleList(categoryId)
    },
    getArticleList (categoryId) {
      let localStorageArticleId = localStorage.getItem('articleId')
      getDetailSubTitle(categoryId).then(res => {
        this.articleList.categoryId = categoryId
        if (res.data.data && res.data.data.length > 0) {
          this.$emit('isArticleListEmpty', false)
          for (let article of res.data.data) {
            let isActive = false
            if (parseInt(localStorageArticleId) === parseInt(article.id)) {
              isActive = true
            }
            this.articleList.data.push({
              id: article.id,
              name: article.subtitle,
              isActive: isActive
            })
          }
        } else {
          this.$emit('isArticleListEmpty', true)
        }
      })
    },
    clearArticleList () {
      this.articleList.data = []
      this.articleList.categoryId = ''
    },
    getArticleContent (article) {
      article.isActive = true
      this.$emit('ievent', article.id)
    }
  }
}
</script>

<style lang="scss">
.sidebar{
  background: #f0f0f1 !important;
}
.nav-link{
  color: #666 !important;
  cursor:pointer;
}
.nav-dropdown-items .nav-item{
  .nav-link{
    padding-left: 2rem;
  }
  .nav-link-item{
    font-size: 90%;
    width: 196px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
}
.sidebar .nav-dropdown.open{
  border-left: 4px solid #2294e3;
  background: #e1e5e7;
  .nav-link{
    color: #333 !important;
    &.on{
      color: #20a8d8 !important;
    }
  }
}
.sidebar .nav-link:hover, .sidebar .navbar .dropdown-toggle:hover, .navbar .sidebar .dropdown-toggle:hover {
  background: #e1e5e7;
  color: #20a8d8 !important;
}
</style>
