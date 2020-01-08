<template>
  <router-link :to="{path: '/analysis/detailpie', query: {list: JSON.stringify(houseList), name: this.name, unint: this.unint}}" style="width: 100%">
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
    }
  },
  data() {
    return {
      houseList: this.list,
      name: this.name,
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
      // let arr = this.houseList;
      //   let newArr = arr.map(val => {
      //     let json = {};
      //          json.name = val.BUILDINGUNIT;
      //          json.value = val.NUMS;
      //          return json;
      //   });
      //  this.houseList = newArr;//这个是页面循环的值
      // console.log(this.houseList)
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
      this.houseList.map((item, index) => {

        if(this.houseList.length < 4){
          title.push({
            text: item.time,
            left: 23*(index+1)+ '%',
            top: '75%',
            textStyle: {
                color: '#ccc',
                fontSize: 14,
                fontWeight: 400
            }
          })
          series.push({
                  name: item.time,
                  type: 'pie',
                  radius: '38%',
                  center: [25*(index+1) + '%', '50%'],
                  color: colorListr,
                  data: item.data.sort(function(a, b) {
                      return a.value - b.value
                  }),
                  label: {
                    show: false
                  },
                  itemStyle: {
                      normal: {
                          shadowColor: 'rgba(0, 0, 0, 0.4)',
                          shadowBlur: 20,
                      }
                  }
              })
        }

        if(this.houseList.length > 3 & index < 4){
          title.push({
            text: item.time,
            left: 18*(index+1)+ '%',
            top: '70%',
            textStyle: {
                color: '#ccc',
                fontSize: 14,
                fontWeight: 400
            }
          })
          series.push({
                  name: item.time,
                  type: 'pie',
                  radius: '28%',
                  center: [21*(index+1) + '%', '50%'],
                  color: colorListr,
                  data: item.data.sort(function(a, b) {
                      return a.value - b.value
                  }),
                  label: {
                    show: false
                  },
                  itemStyle: {
                      normal: {
                          shadowColor: 'rgba(0, 0, 0, 0.4)',
                          shadowBlur: 20,
                      }
                  }
              })
        }

      })


      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        // backgroundColor: '#2c343c',
          title: title,
            // tooltip: {
            //     trigger: 'item',
            //     formatter: "{b} : {c} ({d}%)"
            // },
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
      text-align: center;
      font-size: 16px;
      font-weight: 800;
      margin-top: 10px;
    }
  }

</style>
