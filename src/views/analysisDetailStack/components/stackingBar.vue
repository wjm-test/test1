<template>
  <div style="width: 100%;">
    <div :id="id" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/utils/mixins/resize'

export default {
  mixins: [resize],
  props: {
    dataHostid: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: 'lineChart'
    },
    id: {
      type: String,
      default: 'lineChart'
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '150px'
    },
    // name: {
    //   type: String,
    //   default: '建造年代'
    // }
  },
  data() {
    return {
      list: JSON.parse(this.$route.query.list),
      name: this.$route.query.name,
      unint: this.$route.query.unint,
      chart: null
    }
  },
  mounted() {

    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      let myColor = ['#229aff', '#fdb94e', '#FFCAD4', '#30d6a9', '#F87B5F', '#D8D7A9', '#ADD1FC', '#FFA500', '#698DDD', '#FFE86B', '#69D2FF', '#D988BC', '#f9d00f', '#4ed99c', '#22b2da', '#7dace4', '#F59292', '#8FECC8', '#E78775', '#09A8FA', '#ED93CB', '#A1D9FF', '#F2BBBB', '#5EA3A6', '#ACBDC5', '#FFAAA6', '#7D8DF6', '#FF8C94', '#89D0D5', '#5CBDF2']
      this.chart.setOption({
        title: {
          left: '0',
          text: this.name
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.8)',
          extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
          textStyle: {
              color: '#6a717b',
          },
        },
        // legend: {
        //   data: this.list.xAxisData
        // },
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.list.xAxisData,
          splitLine: {
            show: false
          },
          axisTick: {
            // show: false,
            alignWithLabel: true
          },
          axisLabel: {
            rotate: 45
          }
        }],
        yAxis: [{
          name: '单位: ' + this.unint,
          nameTextStyle: {
            color: '#333',
            fontWeight: 'bold'
          },
          type: 'value',
          splitLine: {
            show: false
          },
          splitArea: {
            show: false,
          },
        }],
        series: [{
          // name: '完成量',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          // barWidth: 8,
          itemStyle: {
            normal: {
              color: function(params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          data: this.list.seriesData,
        }]
      })
    }
  }
}
</script>
<style scoped>
  .text{
    text-align: center;
    font-size: 16px;
    font-weight: 800;
  }
</style>
