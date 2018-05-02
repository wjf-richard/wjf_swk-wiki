<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav">
        <template v-for="(item, index) in navItems" >
          <template v-if="item.child.length > 0">
            <li class="nav-item nav-dropdown" :class="{open:item.isOpen}"  disabled :key="index" >
              <div class="nav-link nav-dropdown-toggle" @click="handleClick(index, navItems)">{{item.name}}</div>
              <ul class="nav-dropdown-items">
                <li class="nav-item" v-for="(tem, idx) in item.child" :key="idx">
                  <div @click="subID(index, tem, navItems)">
                    <span class="nav-link" :class="{on:tem.isActive}">
                      {{tem.name}}
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
          <li class="nav-item" :key="index">
            <div @click="subNull()">
              <span class="nav-link">{{item.name}}</span>
            </div>
          </li>
        </template>
        </template>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    handleClick (index, navItems) {
      if (navItems[index].isOpen === true) {
        navItems[index].isOpen = false
        return
      }
      for (let item of navItems) {
        item.isOpen = false
      }
      navItems[index].isOpen = true
    },
    subID (index, item, navItems) {
      for (let parentItem of navItems) {
        parentItem.isOpen = false
        navItems[index].isOpen = true
        for (let childItem of parentItem.child) {
          childItem.isActive = false
        }
      }
      this.$emit('ievent', item)
      item.isActive = true
    },
    subNull () {
      let noId = true
      this.$emit('nochild', noId)
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
.nav-dropdown-items .nav-item .nav-link{
  padding-left: 2rem;
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
