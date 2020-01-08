
<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="静态" name="first">
        <div style="background: #fff;padding: 30px 30px 60px;">
          <top-desc/>
          <analysis-bar id="dtBar" class-name="dtBar" v-if="'first' === activeName" height="500px" width="100%" :name="name" />
          <analysis-des />
        </div>
      </el-tab-pane>
      <el-tab-pane label="动态" name="second">
        <div style="background: #fff;padding: 30px 30px 60px;">
          <top-desc/>
          <dynamic-bar id="dyBar" class-name="dyBar" v-if="'second' === activeName" height="500px" width="100%" :name="name" />
          <analysis-des />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import analysisBar from './components/barChart'
import dynamicBar from './components/dynamicBar'
import topDesc from './components/topDesc'
import analysisDes from './components/desc'
export default {
  name: 'Analysis',
  components: {
    analysisDes,
    analysisBar,
    topDesc,
    dynamicBar
  },
  data() {
    return {
      activeName: 'first',
      // list: JSON.parse(this.$route.query.list),
      name: this.$route.query.name,
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    background: #F0F2F5;
    /deep/ .el-tabs__header{
      padding: 0 24px;
      margin: 0;
      background: #fff;
      /deep/ .el-tabs__nav-wrap:after{
        height: 0;
      }
    }
    /deep/ .el-tabs__content{
      padding: 24px;
    }
  }
</style>
