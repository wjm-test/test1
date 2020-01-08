<template>
  <router-link :to="{path: '/analysis/detail', query: {list: JSON.stringify(houseList), name: this.name, unint: this.unint}}" style="width: 100%;">
    <div class="box">
      <div :id="id" :class="className" :style="{height:height,width:width}" />
      <!-- <div><img class="img" src="@/assets/images/line.png"/></div> -->
      <div class="text">{{ name }}</div>
    </div>
  </router-link>
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
    },
    unint: {
      type: String
    },
  },
  data() {
    return {
      chart: null,
      houseList: this.list,
      name: this.name,
      unint: this.unint
    }
  },
  computed:{

  },
  mounted() {
    console.log(this.unint)
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
      const fontColor = '#30eee9'
      this.chart.setOption({
        grid: {
          left: '5%',
          right: '5%',
          top: '20%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // name : '年份',
          boundaryGap: false,
          axisLabel: {
            show: true,
            color: '#333'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#397cbc'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#195384'
            }
          },
          data: this.houseList.xAxisData
        }],
        yAxis: [{
          type: 'value',
          // name : '数量',
          axisLabel: {
            show: true,
            formatter: '{value}',
            textStyle: {
              color: '#333'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(147,192,231,0.3)'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(147,192,231,0.3)'
            }
          }
        }],
        series: [{
          // name: '数量',
          type: 'line',
          // stack: '总量',
          symbol: 'none',
          smooth: true,
          // symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#0092f6',
              lineStyle: {
                color: '#3AA1FF',
                width: 1
              },
              areaStyle: {
                color: 'rgba(58, 161, 255, .8)'
              }
            }
          },
          data: this.houseList.seriesData
        }]
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .box{
    width: 100%;
    padding: 20px;
    .img{
      width: 100%;
    }
    .text{
      text-align: center;
      font-size: 16px;
      font-weight: 800;
      margin-top: 10px;
    }
  }
</style>
