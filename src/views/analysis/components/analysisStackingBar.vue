<template>
  <router-link :to="{path: '/analysis/detailstack', query: {list: JSON.stringify(houseList), name: this.name, unint: this.unint}}" style="width: 100%">
    <div class="box" style="width: 100%;">
      <div :id="id" :class="className" :style="{height:height,width:width}" />
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
      default: 'stackingChart'
    },
    id: {
      type: String,
      default: 'stackingChart'
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
      houseList: this.list,
      name: this.name,
      chart: null
    }
  },
  mounted() {
    // console.log(this.list)
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
        // tooltip: {
        //         // trigger: 'axis',
        //         backgroundColor: 'rgba(255,255,255,0.8)',
        //         extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        //         textStyle: {
        //             color: '#6a717b',
        //         },
        //     },
            grid: {
                left: '5%',
                right: '5%',
                top: '20%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: this.houseList.xAxisData,
                splitLine: {
                    show: false
                },
                axisTick: {
                  show: false,
                  alignWithLabel: true
                },
                axisLabel: {
                    // rotate: 45
                }
            }],
            yAxis: [{
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
                        show: false,
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
                data: this.houseList.seriesData,
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
