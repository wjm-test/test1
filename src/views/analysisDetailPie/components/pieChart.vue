<template>
    <div class="box" style="width: 100%;">
      <div class="text">{{ name }}</div>
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

      let series = []
      let title = []
      this.list.map((item, index) => {
        if(this.list.length < 4){
          if(index < 2){
            title.push({
              text: item.time + '('+ this.unint +')',
              left: 34*(index+1)+ '%',
              top: '50%',
              textStyle: {
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 400
              }
            })
            series.push({
                    name: item.time,
                    type: 'pie',
                    radius: '26%',
                    center: [36*(index+1) + '%', '30%'],
                    color: colorListr,
                    data: item.data.sort(function(a, b) {
                        return a.value - b.value
                    }),
                    label: {
                        normal: {
                          show: true,
                          formatter: '{b}:{c}',
                          align: 'left'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20,
                        }
                    }
                })
          }else{
            title.push({
              text: item.time + '('+ this.unint +')',
              left: '48%',
              top: '95%',
              textStyle: {
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 400
              }
            })
            series.push({
                    name: item.time,
                    type: 'pie',
                    radius: '26%',
                    center: ['50%', '75%'],
                    color: colorListr,
                    data: item.data.sort(function(a, b) {
                        return a.value - b.value
                    }),
                    label: {
                        normal: {
                          show: true,
                          formatter: '{b}:{c}',
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(0, 0, 0, 0.4)',
                            shadowBlur: 20,
                        }
                    }
                })
          }

        }

        if(this.list.length > 3){
          if(index < 2){
            title.push({
              text: item.time + '('+ this.unint +')',
              left: 34*(index+1)+ '%',
              top: '24%',
              textStyle: {
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 400
              }
            })
            series.push({
              name: item.time,
              type: 'pie',
              radius: '18%',
              center: [35*(index+1) + '%', '14%'],
              color: colorListr,
              data: item.data.sort(function(a, b) {
                  return a.value - b.value
              }),
              label: {
                  normal: {
                    show: true,
                    formatter: '{b}:{c}',
                  }
              },
              itemStyle: {
                  normal: {
                      shadowColor: 'rgba(0, 0, 0, 0.4)',
                      shadowBlur: 20,
                  }
              }
            })
          }else if(index < 4){
            title.push({
              text: item.time + '('+ this.unint +')',
              left: 34*(index - 1)+ '%',
              top: '47%',
              textStyle: {
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 400
              }
            })
            series.push({
              name: item.time,
              type: 'pie',
              radius: '18%',
              center: [35*(index - 1) + '%', '37%'],
              color: colorListr,
              data: item.data.sort(function(a, b) {
                  return a.value - b.value
              }),
              label: {
                  normal: {
                    show: true,
                    formatter: '{b}:{c}',
                  }
              },
              itemStyle: {
                  normal: {
                      shadowColor: 'rgba(0, 0, 0, 0.4)',
                      shadowBlur: 20,
                  }
              }
            })
          }else if(index < 6){
            title.push({
              text: item.time + '('+ this.unint +')',
              left: 34*(index - 3)+ '%',
              top: '70%',
              textStyle: {
                  color: '#333',
                  fontSize: 15,
                  fontWeight: 400
              }
            })
            series.push({
              name: item.time,
              type: 'pie',
              radius: '18%',
              center: [35*(index - 3) + '%', '60%'],
              color: colorListr,
              data: item.data.sort(function(a, b) {
                  return a.value - b.value
              }),
              label: {
                  normal: {
                    show: true,
                    formatter: '{b}:{c}',
                  }
              },
              itemStyle: {
                  normal: {
                      shadowColor: 'rgba(0, 0, 0, 0.4)',
                      shadowBlur: 20,
                  }
              }
            })
          }else{
            {
              title.push({
                text: item.time + ' ('+ this.unint +')',
                left: 25*(index -5)+ '%',
                top: '94%',
                textStyle: {
                    color: '#333',
                    fontSize: 15,
                    fontWeight: 400
                }
              })
              series.push({
                name: item.time,
                type: 'pie',
                radius: '18%',
                center: [25*(index-5) + '%', '84%'],
                color: colorListr,
                data: item.data.sort(function(a, b) {
                    return a.value - b.value
                }),
                label: {
                    normal: {
                      show: true,
                      formatter: '{b}:{c}',
                    }
                },
                itemStyle: {
                    normal: {
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 20,
                    }
                }
              })
            }
          }

        }

      })


      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: title,
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        series: series
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
      // text-align: center;
      font-size: 19px;
      font-weight: 800;
      margin-top: 10px;
    }
  }

</style>
