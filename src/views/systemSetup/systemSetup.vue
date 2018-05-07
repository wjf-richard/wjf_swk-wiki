<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12">
        <b-card>
          <div slot="header">
            系统设置
          </div>
          <b-row>
            <category></category>
            <key-words></key-words>
            <project-tips></project-tips>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import category from './category'
import keyWords from './keyWords'
import projectTips from './projectTips'
export default {
  components: {
    category,
    keyWords,
    projectTips
  },
  name: 'systemSetup'
}
</script>
