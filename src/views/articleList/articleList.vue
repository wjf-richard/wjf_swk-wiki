<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            <span>WIKI知识库列表</span>
            <div>
              <el-select v-model="optionsSelected" @change="optionsChange(optionsSelected)" placeholder="按分类搜索">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <router-link to="../addArticle">
                <el-button type="primary" class="">新建文章</el-button>
              </router-link>
            </div>
          </div>
          <el-table :data="list" border style="width: 100%">
            <el-table-column label="分类" width="130">
              <template slot-scope="scope">
                {{scope.row.category.name}}
              </template>
            </el-table-column>
            <el-table-column label="标题" min-width="240">
              <template slot-scope="scope">
                <router-link :to="{
                  path: '../articleDetail',
                  params: {
                    articleId: scope.row.id
                  },
                  query: {
                    articleId: scope.row.id
                  }
                }">
                  {{scope.row.title}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="项目标签" width="170">
              <template slot-scope="scope">
                <span class="el-tag el-tag--info el-tag--small item-box" v-for="(item,index) in scope.row.projectTags" :key="index">
                  <span>{{item.name}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="关键词标签" width="170">
              <template slot-scope="scope">
                <span class="el-tag el-tag--info el-tag--small item-box" v-for="(item,index) in scope.row.keywordTags" :key="index">
                  <span>{{item.name}}</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column label="作者" width="100">
              <template slot-scope="scope">
                {{scope.row.author}}
              </template>
            </el-table-column>
            <el-table-column label="最新更新时间" width="180">
              <template slot-scope="scope">
                {{scope.row.updatedAt}}
              </template>
            </el-table-column>
            <el-table-column label="浏览数" width="90">
              <template slot-scope="scope">
                  {{scope.row.pv}}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <router-link :to="{
                  path: '../editArticle',
                  params: {
                    articleId: scope.row.id
                  },
                  query: {
                    articleId: scope.row.id
                  }
                }">
                  <el-button size="mini">编辑
                  </el-button>
                </router-link>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top: 10px; text-align: right;">
            <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="size" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { getAllArticleList, deteleArticle, getArticleListById } from '@/api/articleList'
import { getArticelClasses } from '@/api/category'
export default {
  data () {
    return {
      currentPage: 1,
      total: 10,
      size: 10,
      list: [],
      options: [],
      optionsSelected: ''
    }
  },
  created () {
    this.initGetArticelAllList()
  },
  methods: {
    initGetArticelAllList () {
      getAllArticleList(1, 10).then(res => {
        this.list = res.data.data.content
        this.total = res.data.data.totalElements
        this.size = res.data.data.size
      })
      getArticelClasses().then(res => {
        this.options = res.data.data.content
      })
    },
    optionsChange (id) {
      getArticleListById(id, 1, 10).then(res => {
        this.list = res.data.data.content
        this.total = res.data.data.totalElements
        this.size = res.data.data.size
      })
    },
    handleDelete (index, row) {
      // console.log(row.id)
      this.$confirm(`确定删除 ${row.title} ？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deteleArticle(row.id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initGetArticelAllList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleCurrentChange (val) {
      getAllArticleList(val, 10).then(res => {
        this.list = res.data.data.content
        this.total = res.data.data.totalElements
        this.size = res.data.data.size
      })
    }
  }
}
</script>

<style scoped>
.card-header div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-header div button {
  font-size: 0.675rem;
  padding: 0.35rem 0.75rem;
  height: 40px;
  border-radius: 4px;
}
.card-header div .el-select{
  margin-right: 1rem;
}
.el-table .cell .item-box {
  margin: 2px 0 2px 6px;
}
</style>
