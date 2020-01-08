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
      // console.log(this.$route.query)
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: '0',
          text: this.name
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.list.xAxisData
        },
        yAxis: {
          name: '单位: ' + this.unint,
          nameTextStyle: {
            color: '#333',
            fontWeight: 'bold'
          },
          type: 'value',
        },
        series: [
          {
            // name: '数量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            // symbolSize: '40',
            // showSymbol: true,
            label: {
              normal: {
                show: 'false',
                position: 'inside',
                formatter: (params) => {
                  return params.value
                }
              }
            },
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#93c0e7',
                lineStyle: {
                  color: '#3AA1FF',
                  width: 1
                }
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(58, 161, 255, .6)'
              }
            },
            data: this.list.seriesData
          }
        ]
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
