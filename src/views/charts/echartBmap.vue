<template>
  <div class="chart-container">
    <chart
      height="100%"
      width="100%"
    />
    <left-panel>
      <el-input v-model="temp.inputValue" :style="{width:width}" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-divider />
      <el-select v-model="temp.selectValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-divider />
      <el-button>{{ temp.buttonText }}</el-button>
      <el-divider />
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="用户管理"
          name="first"
        >用户管理</el-tab-pane>
        <el-tab-pane
          label="配置管理"
          name="second"
        >配置管理</el-tab-pane>
        <el-tab-pane
          label="角色管理"
          name="third"
        >角色管理</el-tab-pane>
        <el-tab-pane
          label="定时任务补偿"
          name="fourth"
        >定时任务补偿</el-tab-pane>
      </el-tabs>
    </left-panel>
  </div>
</template>
<script>
import Chart from '@/components/Charts/EchartBmap'
import LeftPanel from '@/components/LeftPanel'
// import Search from '@/components/searchBox'

export default {
  name: 'Bmap',
  components: {
    Chart,
    LeftPanel
  },
  props: {
    width: {
      type: String,
      default: '60%'
    }
  },
  data() {
    return {
      activeName: 'second',
      iframeurl: 'http://localhost:82/nbmap.html',
      options: [
        {
          value: 'Apple',
          label: 'Apple'
        },
        {
          value: 'Banana',
          label: 'Banana'
        },
        {
          value: 'Orange',
          label: 'Orange'
        },
        {
          value: 'Pear',
          label: 'Pear'
        },
        {
          value: 'Strawberry',
          label: 'Strawberry'
        }
      ],
      temp: {
        selectValue: undefined,
        buttonText: 'button1',
        inputValue: 'input1'
      }
    }
  },
  created() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
.radio,
.checkbox {
    min-height: 20px;
    padding-left: 20px;
}

.center {
    width: auto;
    display: table;
    margin-left: auto !important;
    margin-right: auto !important;
}
</style>
