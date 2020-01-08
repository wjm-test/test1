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
      }
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
        var originData = this.list
        // console.log(5555)
        // console.log(originData)
        var date = []
        var colorListr = [
            'rgba(86, 188, 116, .85)',
            'rgba(150, 212, 175, .85)',
            'rgba(69, 190, 155, .85)',
            'rgba(143, 216, 195, .85)',
            'rgba(160, 188, 52, .85)',
            'rgba(201, 220, 128, .85)',
            'rgba(244, 145, 0, .85)',
            'rgba(255, 190, 95, .85)',
            'rgba(212, 64, 36, .85)',
            'rgba(232, 138, 121, .85)',
            'rgba(0, 135, 177, .85)',
            'rgba(55, 208, 255, .85)',
            'rgba(0, 80, 179, .85)',
            'rgba(24, 144, 255, .85)'
        ]
        let endData = []
        var legendData = []
        let namelist = ['低层', '多层', '高层']
        console.log(originData)

   

        originData[0].data.forEach( item => {
          endData.push({
            name: item.name,
            data: []
          })
        })


        console.log(endData)
        originData.forEach( item => {
          // console.log(item.data)
          date.push(item.time)
          item.data.forEach(item2 => {
            endData.forEach( item3 => {
              if(item2.name === item3.name){
                item3.data.push(item2.value)
              }
            })
          })
        })

        var series = []
        for(var i = 0; i < endData.length; i++){
          // console.log(endData[i].data)
          legendData.push(endData[i].name)
          series.push( {
            name: endData[i].name,
            type: 'bar',
            data: endData[i].data,
            barWidth: 14,
            // barGap: 1,
            itemStyle: {
              normal: {
                color: colorListr[i]
              }
            }
          })
        }

        this.chart = echarts.init(document.getElementById(this.id))
        this.chart.setOption({
          title: {
            text: this.name
          },
          dataZoom: {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'filter',
            start: '0',
            end: '10',
            // zoomLock: 'true',
            bottom: '24'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            backgroundColor: 'rgba(255,255,255,1)', // 背景
            padding: [8, 10], //内边距
            textStyle: {
              color: '#000000'
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);', //添加阴影
          },
          // legend: {
          //   data: legendData,
          //   top: '50',
          //   textStyle: {
          //     color: "#333"
          //   },
          //   itemWidth: 10,
          //   itemHeight: 10,
          //   itemGap: 35
          // },
          grid: {
            left: '8%',
            right: '4%',
            bottom: '20%',
            top: '20%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: date, //date,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#D9D9D9",
                width: 1,
                type: "solid"
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#333",
              }
            },
          }],
          yAxis: [{
            name: '单位: ' + this.unint,
            nameTextStyle: {
              color: '#333',
              fontWeight: 'bold'
            },
            type: 'value',
            axisLabel: {
              formatter: '{value} ',
              textStyle: {
                color: '#333'
              }
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#00c7ff",
                width: 1,
                type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "#E8E8E8",
              }
            }
          }],
          series: series
        })
      }
    }
  }
</script>
<style scoped>
  .text {
    text-align: center;
    font-size: 16px;
    font-weight: 800;
  }
</style>
