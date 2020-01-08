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
      this.chart = echarts.init(document.getElementById(this.id))
      var option = {
          baseOption: {
              timeline: {
                  left: '20',
                  right: '20',
                  axisType: 'category',
                  autoPlay: true,
                  playInterval: 500,
                  label: {
                      normal: {
                          textStyle: {
                              color: '#333'
                          }
                      },
                      emphasis: {
                          textStyle: {
                              color: '#333'
                          }
                      }
                  },
                  lineStyle: {
                      color: '#555'
                  },
                  checkpointStyle: {
                      color: '#bbb',
                      borderColor: '#777',
                      borderWidth: 1
                  },
                  controlStyle: {
                      showNextBtn: true,
                      showPrevBtn: true,
                      normal: {
                          color: '#666',
                          borderColor: '#666'
                      },
                      emphasis: {
                          color: '#aaa',
                          borderColor: '#aaa'
                      }
                  },
                  data: this.list.map(function(ele) {
                      return ele.time
                  })
              },
              // backgroundColor: '#404a59',
              title: {
                  text: this.name,
                  left: '0',
                  textStyle: {
                      color: '#333'
                  }
              },
              tooltip: {
                  formatter: function(params) {
                    // console.log(params)
                      // if ('value' in params.data) {
                          return params.name;
                      // }
                  }
              },
              grid: {
                  left: '10%',
                  right: '6%',
                  bottom: '20%',
                  top: '20%',
              },
              xAxis: {},
              yAxis: {
                name: '单位: ' + this.unint,
                nameTextStyle: {
                  color: '#333',
                  fontWeight: 'bold'
                },
              },
              series: [ {
                  id: 'bar',
                  type: 'bar',
                  barMaxWidth: '30',
                  tooltip: {
                      show: false
                  },
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          textStyle: {
                              color: '#ddd'
                          }
                      }
                  },
                  data: []
              }]
          },
          options: []
      }

      for (var i = 0; i < this.list.length; i++) {
          option.options.push({
              xAxis: {
                  show: false,
                  type: 'value',
                  boundaryGap: [0, 0.1],
                  axisLabel: {
                      show: false,
                      textStyle: {
                          color: '#333'
                      }
                  }
              },
              yAxis: {
                name: '单位: ' + this.unint,
                nameTextStyle: {
                  color: '#333',
                  fontWeight: 'bold'
                },
                type: 'category',
                axisLabel: {
                    textStyle: {
                        color: '#333'
                    }
                },
                data: this.list[i].data.map(function(ele) {
                    return ele.name
                })
                  // .reverse()
              },
              series: [ {
                  id: 'bar',
                  itemStyle: {
                      normal: {
                          color: function(params) {
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
                              ];
                              return colorListr[params.dataIndex]
                          },
                          label: {
                              show: true,
                              // position: 'top',
                              // formatter: '{c}',
                              formatter: function(p) {
                                return p.name + ": " + p.value;
                              },
                              color: '#333'
                          },
                          // shadowBlur: 20,
                          // shadowColor: 'rgba(40, 40, 40, 0.5)',
                      }
                  },
                  data: this.list[i].data.map(function(ele) {
                      return ele.value
                  })
                  .sort(function(a, b) {
                      return b > a
                  })
              }]
          })
      }
      this.chart.setOption(option)
    }
  }
}
</script>
<style scoped>
  .text{
    text-align: center;
    font-size: 16px;
    font-weight: 800;
    padding: 30px;
  }
</style>
