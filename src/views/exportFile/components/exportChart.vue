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
    name: {
      type: String,
      default: '建造年代'
    },
    list: {
      type: null,
    }
  },
  data() {
    return {
      chart: null,
      houseList: this.list
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
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 50,
          text: this.name
        },
        // legend: {
        //     top: 'bottom',
        //     data:['意向']
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.houseList.xAxisData
        },
        yAxis: {
          type: 'value',
          // boundaryGap: [0, '100%']
        },
        // dataZoom: [{
        //     type: 'inside',
        //     start: 0,
        //     end: 10
        // }, {
        //     start: 0,
        //     end: 10,
        //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //     handleSize: '80%',
        //     handleStyle: {
        //         color: '#fff',
        //         shadowBlur: 3,
        //         shadowColor: 'rgba(0, 0, 0, 0.6)',
        //         shadowOffsetX: 2,
        //         shadowOffsetY: 2
        //     }
        // }],
        series: [
          {
            name: '模拟数据',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: '40',
            showSymbol: false,
            label: {
              normal: {
                show: 'true',
                position: 'inside',
                formatter: (params) => {
                  return params.value
                }
              }
            },
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#93c0e7'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1,
                  color: 'rgba(147,192,231,0.1)'
                }, {
                  offset: 0,
                  color: 'rgba(147,192,231,0.9)'
                }])
              }
            },
            data: this.houseList.seriesData
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
