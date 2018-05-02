# SWK_WIKI

> SWK知识库

## 项目结构
```JavaScript
  src
├─App.vue
├─_nav.js
├─main.js
├─views
|   ├─Dashboard.vue
|   ├─systemSetup
|   |      ├─classes.vue
|   |      ├─keyWords.vue
|   |      ├─projectTips.vue
|   |      └systemSetup.vue
|   ├─detail
|   |   ├─detail.scss
|   |   ├─detail.vue
|   |   ├─components
|   |   |     ├─index.js
|   |   |     ├─header
|   |   |     |   ├─Header.vue
|   |   |     |   └HeaderDropdown.vue
|   |   |     ├─Sidebar
|   |   |     |    └Sidebar.vue
|   ├─articleList
|   |      ├─articleDetail.vue
|   |      ├─articleList.vue
|   |      └editArticle.vue
|   ├─addArticle
|   |     └addArticle.vue
├─utils
|   └request.js
├─router
|   ├─index.js  //开发模式
|   ├─back.js // 打包后台
|   ├─front.js // 打包前台
├─containers
|     └Full.vue
├─components
|     ├─Aside.vue
|     ├─Breadcrumb.vue
|     ├─Callout.vue
|     ├─Footer.vue
|     ├─Header.vue
|     ├─Switch.vue
|     ├─fileList.vue
|     ├─index.js
|     ├─statusChange.vue
|     ├─Sidebar
|     |    ├─Sidebar.vue
|     |    ├─SidebarFooter.vue
|     |    ├─SidebarForm.vue
|     |    ├─SidebarHeader.vue
|     |    ├─SidebarMinimizer.vue
|     |    ├─SidebarNavDivider.vue
|     |    ├─SidebarNavDropdown.vue
|     |    ├─SidebarNavItem.vue
|     |    ├─SidebarNavLabel.vue
|     |    ├─SidebarNavLink.vue
|     |    └SidebarNavTitle.vue
├─assets
|   ├─logo.png
|   ├─scss
|   |  ├─_bootstrap-variables.scss
|   |  ├─_core-variables.scss
|   |  ├─_custom.scss
|   |  ├─style.scss
├─api
|  ├─articleContent.js
|  ├─articleList.js
|  ├─attachments.js
|  ├─classes.js
|  ├─detail-api.js
|  ├─keyWords.js
|  ├─projectTips.js
|  └uploadFile.js

```

## 项目启动
### 使用npm install 注意事项(如果使用cnpm不需要这一步)
```
一定要先删除package.json的chromedriver 等待install完毕
npm install --save-dev chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
```

``` bash
# 安装依赖
npm install or cnpm install

# 启动服务 项目地址为localhost:8080
npm run dev

# 打包项目
npm run build
```
### 前、后台页面打包注意事项

#### 打包后台管理页面
1、src/main.js修改：
```
import router from './router/back' // 打包后台
```
 2、然后在找到config/index.js的文件，在找到build的字段修改代码如下
```
	// Template for index.html
    index: path.resolve(__dirname, '../dist/back/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/back'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './'
    
3、保存后运行npm run build，打包完成。在dist/back目录下就可以看到打包后的相关页面
```

#### 打包前台页面 
1、src/main.js修改：
```
import router from './router/front' // 打包前台
```
2、然后在找到config/index.js的文件，在找到build的字段修改代码如下   
```
	// Template for index.html
    index: path.resolve(__dirname, '../dist/front/index.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/front'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './'
    
3、保存后运行npm run build，打包完成。在dist/front目录下就可以看到打包后的相关页面。
