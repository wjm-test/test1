<template>
  <body>
    <!-- <remote-js :js-url="'http://skxxy.nbmap.gov.cn/arcgis_js_api/library/3.20/init.js'" :js-load-call-back="loadInitJs" /> -->
    <remote-js
      :js-url="'http://api.tianditu.gov.cn/api?v=4.0&tk=1bdc300e0865c6e7d6404cea30a1db69'"
      :js-load-call-back="loadTJs"
    />
    <!-- <remote-js :js-url="'http://cdn.ronghub.com/RongIMLib-2.2.5.js'" :js-load-call-back="loadRongJs" /> -->
    <!-- <div v-html="content" /> -->
    <div id="mapDiv">
      <div id="floatToolbar">
        <div class="left">
          <span :style="ChartHouse.style" @click="chartHouse"><i :class="ChartHouse.class" />房屋</span><i class="line" />
          <span :style="ChartSafe.style" @click="chartSafe"><i :class="ChartSafe.class" />安全</span><i class="line" />
          <span :style="ChartTrading.style" @click="chartTrading"><i :class="ChartTrading.class" />交易</span><i class="line" />
          <span :style="ChartEnergy.style" @click="chartEnergy"><i :class="ChartEnergy.class" />能耗</span>
        </div>
        <div class="right"><i :class="Charts" @click="charts" /></div>
        <div class="box_space" :style="{display:win_show}" />
        <div class="right_win" :style="{display:win_show}">
          <img src="@/assets/images/pic_demo1.png">
        </div>
        <div class="housesafebox_space" :style="{display:safe_show}" />
        <div class="right_win housesafelv" :style="{display:safe_show}">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="一级" @change="checkinlist" />
            <el-checkbox label="二级" @change="checkinlist" />
            <el-checkbox label="三级" @change="checkinlist" />
            <el-checkbox label="四级" @change="checkinlist" />
            <el-checkbox label="C级" @change="checkinlist" />
            <el-checkbox label="D级" @change="checkinlist" />
          </el-checkbox-group>
        </div>
      </div>
      <div class="areaInfo" :style="{display: areaInfo.display,left:areaInfo.left,top:areaInfo.top}">
        <ul>
          <li>{{ areaInfo.areaname }}</li>
          <li>总房屋数量：123456幢</li>
          <li>总建筑面积：123456㎡</li>
        </ul>
        <ul>
          <li>丙类房屋</li>
          <li>房屋数量：123幢</li>
          <li>建筑面积：3456㎡</li>
        </ul>
      </div>
      <div id="floatBtm">
        <el-tooltip class="item" effect="dark" placement="left">
          <div slot="content">出行</div>
          <el-button :class="SearchTraffic" @click="searchTraffic" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="left">
          <div slot="content">餐饮</div>
          <el-button :class="SearchRestaurant" @click="searchRestaurant" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="left">
          <div slot="content">教育</div>
          <el-button :class="SearchEdu" @click="searchEdu" />
        </el-tooltip>
        <el-tooltip class="item" effect="dark" placement="left">
          <div slot="content">医疗</div>
          <el-button :class="SearchMedical" @click="searchMedical" />
        </el-tooltip>
      </div>
    </div>
    <!-- <iframe :src="iframeurl" frameborder="0" /> -->
    <tool-bar ref="toolBar" />

    <left-panel>
      <el-card style="height: calc(100vh - 100px);overflow: auto;">
        <div slot="header" class="clearfix">
          <span>区域</span>
          <el-button style="float: right; padding: 3px 0; color: #606266" type="text">
            <i class="el-icon-list" />列表
          </el-button>
        </div>
        <div v-for="name in names" :key="name" class="text item">
          {{ name }}
        </div>
      </el-card>
    </left-panel>
  </body>
</template>
<script>
var map, control, this_com, areacodename, polygon, handler, localsearch, bounds
var polygonAll = []
var label = []
var click = false
import ToolBar from '@/components/ToolBar'
import LeftPanel from '@/components/LeftPanel'
import RemoteJs from '@/components/RemoteJs' // 导入组件
// import * as esriLoader from 'esri-loader'
// import * as initarcgis from 'http://skxxy.nbmap.gov.cn/arcgis_js_api/library/3.20/init.js'
export default {
  name: 'Nbmap',
  components: {
    RemoteJs,
    ToolBar,
    LeftPanel
  },
  //  metaInfo: {
  //     // title: 'This is the test',
  //     meta: [
  //       { 'charset': 'utf-8' },{  'http-equiv': 'Content-Type' },{ 'content': 'text/html; charset=utf-8' },
  //       { 'name': 'viewport', 'content': 'initial-scale=1, maximum-scale=1,user-scalable=no' }
  //     ]
  //   },
  data() {
    return {
      content: '',
      zoom: 10,
      polygon: [],
      label: [],
      areaname: '宁波市',
      parentname: '宁波市',
      HouseCoord: [],
      count: 0,
      level: 2,
      names: [],
      ChartHouse: {
        style: '',
        class: 'icon-house'
      },
      ChartSafe: {
        style: '',
        class: 'icon-safe'
      },
      ChartTrading: {
        style: '',
        class: 'icon-trading'
      },
      ChartEnergy: {
        style: '',
        class: 'icon-energy'
      },
      Charts: 'icon-charts1',
      SearchTraffic: 'icon-traffic',
      SearchRestaurant: 'icon-restaurant',
      SearchEdu: 'icon-edu',
      SearchMedical: 'icon-medical',
      win_show: 'block',
      safe_show: 'none',
      checkList: [],
      areaInfo: {
        areaname: '宁波市',
        display: 'none',
        left: 0,
        top: 0
      },
      xmin: '',
      ymin: '',
      xmax: '',
      ymax: '',

      activeName: 'second',
      iframeurl: 'http://www.baidu.com',
      options: [
        {
          value: 'Apple',
          label: 'Apple'
        },
        {
          value: 'Banana',
          label: 'Banana'
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
  mounted() {
    // this.addAPointText()
    // this.onLoad()
    this_com = this
    this.loadTJs()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    loadTJs() {
      // 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
      this.$nextTick(function() {
        console.log('T')
        console.log(T) //eslint-disable-line
        this.init()
        this.$refs.toolBar.getOption(1, '', '')
      })
      // document.getElementById('mapDIV').click = function() { console.log(2222221) }
    },
    init() {
      this_com = this
      console.log('******初始化地图******')
      map = new T.Map('mapDiv')//eslint-disable-line
      map.centerAndZoom(
        new T.LngLat(121.80199, 29.68865),//eslint-disable-line
        this.zoom
      )
      map.setMinZoom(10)
      map.disableDoubleClickZoom()
      var config = {
        pageCapacity: 99,	// 每页显示的数量
        onSearchComplete: this.localSearchResult	// 接收数据的回调函数
      }
      // 创建搜索对象
      // eslint-disable-next-line no-undef
      localsearch = new T.LocalSearch(map, config)

      // 创建缩放平移控件对象
      control = new T.Control.Zoom()//eslint-disable-line
      // 添加缩放平移控件
      map.addControl(control)
      // //创建标注对象
      // var marker = new T.Marker(
      //   new T.LngLat(map.getCenter().getLng(), map.getCenter().getLat())
      // )
      // // //向地图上添加标注
      // map.addOverLay(marker)
      this_com.getPoint()
      // 地图移动时刷新点位
      map.addEventListener('moveend', function(e) {
        this_com.getPoint()
      })
    },
    // 获取点位数据
    getPoint() {
      console.log('level=' + this_com.level)
      // 清除覆盖物
      map.clearOverLays()
      // alert("当前地图缩放级别：" + map.getZoom());
      const nowZoom = map.getZoom()
      console.log('zoom=' + nowZoom)
      console.log(map.getCenter().getLng(), map.getCenter().getLat())
      if (nowZoom > 17) {
        this_com.level = 5
      } else if (nowZoom > 14 && nowZoom <= 17) {
        this_com.level = 4
      } else if (nowZoom > 11 && nowZoom <= 14) {
        this_com.level = 3
      } else if (nowZoom > 8 && nowZoom <= 11) {
        this_com.level = 2
      } else {
        this_com.level = 1
      }
      this_com.areaname = ''
      // 获取当前范围数据点位
      var bs = map.getBounds() // 获取可视区域
      var bssw = bs.getSouthWest() // 可视区域左下角
      var bsne = bs.getNorthEast() // 可视区域右上角

      this_com.xmin = bssw.getLng()
      this_com.ymin = bssw.getLat()
      this_com.xmax = bsne.getLng()
      this_com.ymax = bsne.getLat()
      // eslint-disable-next-line no-undef
      bounds = new T.LngLatBounds(new T.LngLat(this_com.xmin, this_com.ymin), new T.LngLat(this_com.xmax, this_com.ymax))
      this_com.$http
        .get(
          'http://saturn.51vip.biz:81/data-system/api/bigScreen/house/HousingCoordinates',
          {
            params: {
              // 参数
              lv: this_com.level,
              xmax: this_com.xmin,
              xmin: this_com.xmax,
              ymax: this_com.ymin,
              ymin: this_com.ymax
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          const res = str.data.data
          this_com.names = []
          console.log('********res')
          console.log(res)
          // if (res.length > 0) {
          map.clearOverLays()
          res.map(function(item) {
            const x = item['CENTER_X']
            const y = item['CENTER_Y']
            const name = item['NAME']
            this_com.names.push(name)
            var latlng = new T.LngLat(Number(x), Number(y))//eslint-disable-line
            if (this_com.level > 1 && this_com.level < 3) {
              this_com.content = "<style>.tdt-label {box-shadow: initial;border: 0;padding: 0;}</style><div class='labelStyle circle'>" + name + '</div>'
            } else if (this_com.level >= 3 && this_com.level < 5) {
              this_com.content = "<style>.tdt-label {box-shadow: initial;border: 0;padding: 0;}</style><div class='labelStyle'>" + name + '</div>'
            }

            if (this_com.level === 5) {
              var marker = new T.Marker(//eslint-disable-line
                new T.LngLat(x, y)//eslint-disable-line
              )
              // 向地图上添加标注
              map.addOverLay(marker)
              // 创建信息窗口对象
              var infoWin1 = new T.InfoWindow()//eslint-disable-line
              var sContent = name
              infoWin1.setContent(sContent)
              marker.addEventListener('mouseover', function() {
                marker.openInfoWindow(infoWin1)
              })// 将标注添加到地图中
            } else {
              label = new T.Label({//eslint-disable-line
                text: this_com.content,
                position: latlng
              // offset: new T.Point(-9, 0)
              })
              // console.log(label)
              map.addOverLay(label)
              label.setBackgroundColor('rgba(0,0,0,0)')
              label.addEventListener('mouseover', function(e) {
                // label.setBackgroundColor('rgba(231, 93, 1, 1)')
                this_com.showMouseEnter(e.target.ET, e.containerPoint)
              })
              label.addEventListener('mouseout', function(e) {
                this_com.showMouseOut()
              })
            }
          })
          // } else {
          //   this_com.getHouseCoord('宁波市')
          // }
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('*****getPoint*****')
          console.log(err)
        })
    },
    showMouseEnter(event, xy) {
      console.log('IN')
      // 取出区域名称areacodename
      if (this_com.level > 1 && this_com.level < 3) {
        areacodename = event.split("<div class='labelStyle circle'>")[1].split('</div>')[0]
        console.log(areacodename)
      } else {
        areacodename = event.split("<div class='labelStyle'>")[1].split('</div>')[0]
        console.log(areacodename)
      }
      this_com.getAreaInfo(areacodename, xy)

      const pageIndex = 1
      const pageRow = 99
      var point = []
      var data = []
      // 获取指定区域区划范围
      this_com.$http
        .get(
          'http://saturn.51vip.biz:81/data-system/api/bigScreen/house/HouseCoordinateRange',
          {
            params: {
              // 参数
              parentname: areacodename,
              pageNo: pageIndex,
              pageSize: pageRow
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          const res = str.data.data
          // if (res.length > 0) {

          // ii = 0
          res.map(function(str) {
            /** ***行政区划数据*****/
            var shape = JSON.parse(str.SHAPE)
            data = []
            for (var i = 0; i < shape.length; i++) {
              data.push(shape[i].shapedata)
            }
            console.log('开始添加' + areacodename + '覆盖物')
            data.map(function(items) {
              point = []
              for (var i = 0; i < items.length; i++) {
                point.push({
                  x: items[i]['x'],
                  y: items[i]['y']
                })
              }
              this_com.showPolygon(point)
            })
            /** **************/
          })
          console.log('添加' + areacodename + '覆盖物完成')
          // } else {
          //   this_com.getHouseCoord('宁波市')
          // }
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('*****getPoint*****')
          console.log(err)
        })
    },
    showPolygon(point) {
      var points = []
      for (var i = 0; i < point.length; i++) {
        points.push(new T.LngLat(point[i].x, point[i].y))//eslint-disable-line
      }
      // 创建面对象
      polygon = new T.Polygon(points, {//eslint-disable-line
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        fillColor: 'rgb(161, 216, 249)',
        // fillColor: "#ff0000",
        fillOpacity: 0.5
      })
      polygonAll.push(polygon)
      // 向地图上添加面
      map.addOverLay(polygon)
      // console.log('正在添加第' + (ii++) + '个')
    },
    showMouseOut(event) {
      console.log('OUT')
      // this.areaInfo.display = 'none'
      // console.log('polygonAll')
      // console.log(polygonAll)
      // const i = 0
      polygonAll.map(function(res) {
        map.removeOverLay(res)
        // console.log('正在删除第' + (i++) + '个')
      })
      console.log('删除' + areacodename + '覆盖物完成')
      polygonAll = []
      // this_com.getPoint()
      // label.setBackgroundColor('rgba(0, 0, 0, 0)')
    },
    openPolygonTool(checked2) {
      if (handler) handler.close()
      console.log('handler')
      handler = new T.PolygonTool(map)//eslint-disable-line
      handler.open()

      handler.addEventListener('draw', function(e) {
        console.log('多边形点数组')
        console.log(e.currentLnglats)
        console.log(e.currentArea + '平方米')
        this_com.$refs.toolBar.checked2 = !checked2
      })
    },
    getAreaInfo(areaname, xy) {
      this.areaInfo = {
        display: 'block',
        left: xy.x + 'px',
        top: xy.y + 'px'
      }
      this.areaInfo.areaname = areaname
    },
    // getHouseCoord(areaname) {
    //   console.log(areaname)
    //   var this_com = this
    //   const pageIndex = 1
    //   const pageRow = 99
    //   this_com.$http
    //     .get(
    //       'http://saturn.51vip.biz:81/data-system/api/bigScreen/house/HousingCoordinates',
    //       {
    //         params: {
    //           // 参数
    //           areaname: areaname,
    //           pageNo: pageIndex,
    //           pageSize: pageRow
    //         }
    //       }
    //     )
    //     .then(str => {
    //       // 请求成功后的处理函数
    //       const res = str.data.pageData
    //       console.log('********getHouseCoord res')
    //       console.log(res)
    //       if (res.length > 0) {
    //         res.map(function(item) {
    //           const x = item['BUILDINGGISX']
    //           const y = item['BUILDINGGISY']
    //           const name = item['FLOORBUBUILDINGNAME']
    //           var latlng = new T.LngLat(x, y)//eslint-disable-line
    //           label = new T.Label({//eslint-disable-line
    //             text: "<div class='labelStyle'>" + name + '</div>',
    //             position: latlng
    //             // offset: new T.Point(-9, 0)
    //           })
    //           // 创建地图文本对象
    //           map.addOverLay(label)
    //           label.setBackgroundColor('rgba(0,0,0,0)')
    //         })
    //       } else {
    //         // getHouseCoord("宁波市");
    //         console.log('当前区域暂时无数据')
    //       }
    //       console.log(this_com.level)
    //     })
    //     .catch(err => {
    //       // 请求失败后的处理函数
    //       console.log('*****getHouseCoord*****')
    //       console.log(err)
    //     })
    // },
    chartInit() {
      this.ChartHouse.style = this.ChartSafe.style = this.ChartTrading.style = this.ChartEnergy.style = ''
      this.ChartHouse.class = 'icon-house'
      this.ChartSafe.class = 'icon-safe'
      this.safe_show = 'none'
      this.ChartTrading.class = 'icon-trading'
      this.ChartEnergy.class = 'icon-energy'
    },
    searchInit() {
      this.SearchTraffic = 'icon-traffic'
      this.SearchRestaurant = 'icon-restaurant'
      this.SearchEdu = 'icon-edu'
      this.SearchMedical = 'icon-medical'
    },
    chartHouse() {
      this.chartInit()
      this.ChartHouse.style = 'color:#1890FF'
      this.ChartHouse.class = 'icon-house1'
    },
    chartSafe() {
      this.chartInit()
      this.ChartSafe.style = 'color:#1890FF'
      this.ChartSafe.class = 'icon-safe1'
      this.safe_show = 'block'
    },
    chartTrading() {
      this.chartInit()
      this.ChartTrading.style = 'color:#1890FF'
      this.ChartTrading.class = 'icon-trading1'
    },
    chartEnergy() {
      this.chartInit()
      this.ChartEnergy.style = 'color:#1890FF'
      this.ChartEnergy.class = 'icon-energy1'
    },
    charts() {
      click = !click
      console.log(click)
      if (!click) {
        this.Charts = 'icon-charts1'
        this.win_show = 'block'
      } else {
        this.Charts = 'icon-charts'
        this.win_show = 'none'
      }
    },
    checkinlist() {
      var houselevel = ''
      console.log(this.checkList.length)
      this.checkList.map(function(item) {
        if (item === '一级') {
          houselevel += 1 + ','
        } else if (item === '二级') {
          houselevel += 2 + ','
        } else if (item === '三级') {
          houselevel += 3 + ','
        } else if (item === '四级') {
          houselevel += 4 + ','
        } else if (item === 'C级') {
          houselevel += 5 + ','
        } else if (item === 'D级') {
          houselevel += 6 + ','
        }
      })
      console.log(this_com.xmax)
      this.$http
        .get(
          'http://saturn.51vip.biz:81/data-system/api/houseMap/HousingCoordinates',
          {
            params: {
              // 参数
              xmax: this_com.xmin,
              xmin: this_com.xmax,
              ymax: this_com.ymin,
              ymin: this_com.ymax,
              pageSize: 999,
              pageNo: 1,
              lv: 5,
              houselevel: houselevel
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          const res = str.data.data.pageData
          console.log(res)
          map.clearOverLays()
          res.map(function(item) {
            const x = item['CENTER_X']
            const y = item['CENTER_Y']
            const name = item['NAME']
            this_com.names.push(name)
            var latlng = new T.LngLat(Number(x), Number(y))//eslint-disable-line

            var marker = new T.Marker(//eslint-disable-line
                new T.LngLat(x, y)//eslint-disable-line
            )
            // 向地图上添加标注
            map.addOverLay(marker)
            // 创建信息窗口对象
              var infoWin1 = new T.InfoWindow()//eslint-disable-line
            var sContent = name
            infoWin1.setContent(sContent)
            marker.addEventListener('mouseover', function() {
              marker.openInfoWindow(infoWin1)
            })// 将标注添加到地图中
          })
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('*****getHouseSafeList*****')
          console.log(err)
        })
    },
    searchTraffic() {
      this.searchInit()
      this.SearchTraffic = 'icon-traffic1'
      this.searchPoint('公交')
    },
    searchRestaurant() {
      this.searchInit()
      this.SearchRestaurant = 'icon-restaurant1'
      this.searchPoint('餐饮')
    },
    searchEdu() {
      this.searchInit()
      this.SearchEdu = 'icon-edu1'
      this.searchPoint('教育')
    },
    searchMedical() {
      this.searchInit()
      this.SearchMedical = 'icon-medical1'
      this.searchPoint('医疗')
    },
    searchPoint(keyword) {
      console.log(keyword)
      localsearch.searchInBounds(keyword, bounds)
    },
    localSearchResult(result) {
      console.log(result)
      // 清空点位
      map.clearOverLays()
      let type
      // 添加提示词
      // prompt(result);

      // 根据返回类型解析搜索结果
      switch (parseInt(result.getResultType())) {
        case 1:
          // 解析点数据结果
          type = result.keyWord
          this.pois(result.getPois(), type)
          break
      }
    },
    // 解析点数据结果
    pois(obj, type) {
      if (obj) {
        // 显示搜索列表
        // var divMarker = document.createElement("div");
        // 坐标数组，设置最佳比例尺时会用到
        // var zoomArr = []
        for (var i = 0; i < obj.length; i++) {
          // 闭包
          (function(i) {
            // 名称
            var name = obj[i].name
            // 地址
            var address = obj[i].address
            // 坐标
            var lnglatArr = obj[i].lonlat.split(' ')
            // eslint-disable-next-line no-undef
            var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1])

            var winHtml = '名称:' + name + '<br/>地址:' + address
            var iconurl = ''
            if (type === '公交') {
              iconurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAVFBMVEVHcEzOzs709PT29vYlJSX7+/v+/v4qKioAAAD////o6OiXl5f+/v7u7u74+Pi+vr7///9otv+f0P/G4//s9v/Z7f+Kx//2+/90vP/S6f+83v+v2f+qSrPdAAAAEHRSTlMAG5OfF9DrBQr0TDDfhr5LBMVchgAAAWxJREFUOMudlNm2gyAMRSuDBHEArKD2///zWgMWK7R39Typa5tDBnK7/SohvhIN5a2ULadNma2I1IckqfKRugTawS4Tser1Rf0lYFPrjNrmbFhlKa3rUzzBdUE84QTRRSV5VLKMySOcoPhlmU2iecGvNIYTIZizYyLnQjgRO4Tv3iyp22g8PoS+Rc/J3FPsbiZ8IIhBqMZjPh9+XkNNALEWPZ2bTnIOXduAYQbOXIRJyB0TATPr/U2rCZjYMTQ1o3ZJqovbcg2mew7QR2zyL8xPEevD2bCjxo3a20Nejw5TJ5CWd5ntViuHkNtqaEO7YnmZDHVbbay8N3adH5gBCxhgG7w92r2PgcVfKISmgvo0SArihED3YSzhmEtg5SFn8BpyUKUroyC5rAKGLFcPcLrSACrjyxW8XXwARt+XA2VwWQ8CmCKJc01UhnpywNjQ9byued8NjAHkl9cGbiQKShAuyif61D9Wpvh5H/8Brok3Nw/NfkYAAAAASUVORK5CYII='
            } else if (type === '餐饮') {
              iconurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAbFBMVEVHcEz29va2trb9/v////8ICAj+/v4AAAAAAAAAAACpqalcXFzt7e37+/v7+/vs7Oz5+fnY2Nj6+vr9/f329vb+/v7s7OzCwsL///9qt/+g0f+NyP/E4v+x2f/S6f/m8//c7v+Ew//t9/+m1P+ArGG9AAAAGHRSTlMApDL99xXsAwwIDh02kM6YwWLX41LTX0hBbYLaAAABeklEQVQ4y52U25aCMAxFpRSagICoo+EO+v//OCBNKVCcteY8wu7Jrc3p9D+pj74j0T253KS8XZJ7dISqsyfJSHpnJxglPq3kJ5HD6od2um4N1Tkkh8INJ2aq76lr6VUvnLC5KJ2/liU1FdXF4pda+amEjjBKjJ0S/jEmTVjl0TFGHmOR6WrTUF1SO9iY1NmpB33VQ61jdu+S1e6jYsqZFZXWULR9xzNL8WOGPICqZINXMarhFuNkp0A6sKavKq4BjrGayi0WfsdCjaU7rCvK2gRNZwy9HdZbJfjep4QT5vrnm8+P41oaQjnO7Y11DW3Bv0zAqYJYTwF0VH8YfDazhgB69igkZz60Pr3eprPTWYF8kSDjCocp96K2JpqBuW8YX02NddPaDzGNcbm+IEL3JQoFWG8G4el+gE+bGsOCuDqeswBcPdSRi7PtcsiCDTXtKwjEetWIABwbbDQM4jybF1eWx3srNkSAgDVC6nhT4ogCIP65Mf9eqsf6BcjETvUeYRDbAAAAAElFTkSuQmCC'
            } else if (type === '教育') {
              iconurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAWlBMVEVHcEz29vb7+/vo6OglJSX7/f/w8PAZGRkFBQX+/v7+/v6Xl5fGxsbR0dH6+vr4+Pi+vr75+fn////t9/96v/9ot/+k0/9vuv+z2v+Lx/+73v/J5f+VzP/b7v+Q8r26AAAAEnRSTlMAntJMF/yRAwrw4TAVIci6S3WJ5nPQAAABf0lEQVQ4y52U2ZKDIBBFA7K0S9QgiKL+/28OIWwGrVTNfVI8dXvDfjz+J+70g6kQbihtMKruyY7VIqpm3bXTK4Mc+Lpw7AZRaOiKpBpxoeacIn/W4lL1M+c6HD9MmzHbFF9xFpezCM1Kaa3UHEHGU0jqzw4pjQUmI+VRhOUoeOnVu0yrDn4oYBDy32WwFVTuwQ5CM4KZ2lKNmwp2vikxplE0YVSZc1To/fsi85bJxT/0LiqHMIBF55gOWAPcYbRI55Qo9VgolOo5YbOmsVR+CioWFZoqDrWIr6B9tFi1j7TpNR72HmOpC7tycWe1p94whz2gyupbP9iaHVWfMXCSXbZdzlZxUu8KiJ8CoHR47KvVfqQTBH720N7cXWfWQrhIWRGFGMT7BiRe8kk6xXFgAun6prDULFaGppDZPwMwXqZXjzll9wu0uKSw9Tr/qAAE0TNEEQHg3/sKSHteNS2BcoPxtyEZ2YDrGg9sJKVVAi3pBXC/DB3p9HNh/t6p9/oDJqM8zHqNwlMAAAAASUVORK5CYII='
            } else if (type === '医疗') {
              iconurl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAWlBMVEVHcEz////Ozs709PT////7+/v+/v4SEhIQEBAhISH29vbo6OiXl5f4+Pj+/v7p6em+vr75+fn///9otv+z2v/t9/96v//H5P+OyP+93//Y7P/m8/+Hxf+d0P8MnkUTAAAAEnRSTlMA9xuT8tDrAwoVn0wwvt+PS3XFhWa6AAABWElEQVQ4y52U25aDIAxFi0AJiJeKeKvz/785DgYKFaaz5jx14W5OSEJut/9JOH1gasVbQlqu6jJZUTYEMVrlIz0iyIGPTMSqGS5qqktS9yGje5qiqLLUwVUxB3woiEe+gg5FUfGyJHi2jUGbv2+wFQqPnmZfULt54qHyGPiCbcZ6L2tCOPDFwC92NptFbWa2+B8sCnou5qIlvgRWw6z2Tas5a+JcBbQnNmMy64o/5hNrQTiMpNiypBhBjMXYOk7TuMYYQyw2tftkzLTnTJvfTRvEaIp9faUYddgN6hQLQqw+2yCku8OUkbuBxC6Aa8NzvMh1XwH2HjQrzxvT4AcJujLWQZg3kOUhl/AaX9ClJ6MhejMAff4B9jF17BepM75cy7etA1IqkkJESQDxvq9Aaho536k+sr9uEQFHxL5rOGO86Xp5DRUCHqAXQHkZ/pCnPi7MPyzVor4BnB89tx1hKeQAAAAASUVORK5CYII='
            }

            // 创建图片对象
            // eslint-disable-next-line no-undef
            var icon = new T.Icon({
            // eslint-disable-next-line no-undef
              iconUrl: iconurl,
              // eslint-disable-next-line no-undef
              // iconSize: new T.Point(19, 27),
              // eslint-disable-next-line no-undef
              iconAnchor: new T.Point(19, 19)
            })
            // 创建标注对象
            // eslint-disable-next-line no-undef
            var marker = new T.Marker(lnglat, { icon: icon })
            // 地图上添加标注点
            map.addOverLay(marker)
            // 注册标注点的点击事件
            // eslint-disable-next-line no-undef
            var markerInfoWin = new T.InfoWindow(winHtml, { autoPan: true })
            marker.addEventListener('mouseover', function() {
              marker.openInfoWindow(markerInfoWin)
            })

            // zoomArr.push(lnglat);

            // 在页面上显示搜索的列表
          })(i)
        }
        // 显示地图的最佳级别
        // map.setViewport(zoomArr);
        // 显示搜索结果
        // divMarker.appendChild(document.createTextNode('共' + localsearch.getCountNumber() + '条记录，分' + localsearch.getCountPage() + '页,当前第' + localsearch.getPageIndex() + '页'));
        // document.getElementById("searchDiv").appendChild(divMarker);
        // document.getElementById("resultDiv").style.display = "block";
      }
    }
  }
}
</script>
<style scope>
/* @import url("http://skxxy.nbmap.gov.cn/arcgis_js_api/library/3.20/dijit/themes/tundra/tundra.css"); */
/* @import url("http://skxxy.nbmap.gov.cn/arcgis_js_api/library/3.20/esri/css/esri.css"); */

body {
  background-color: #fff;
  /* overflow: hidden; */
  font-family: "Trebuchet MS";
}
/* #app {overflow: hidden;} */
#mapDiv {
  height: calc(100vh - 84px);
  width: 100%;
  margin: 0;
  padding: 0;
}
#floatToolbar {
  position:fixed;
  top: 120px;
  right: 40px;
  z-index: 1990;
  width: 431px;
}
#floatToolbar .left {
  float: left;
  width:350px;
  height:48px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 8px rgba(0,0,0,0.15);
  opacity:1;
  border-radius:2px;
}
  #floatToolbar .left span {
    display: inline-block;
    width: 24%;
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
  #floatToolbar .line {
    display: inline-block;
    width:0px;
    height:19px;
    vertical-align: middle;
    border-left:1px solid rgba(232,232,232,1);
    opacity:1;
  }
#floatToolbar .right, #floatToolbar .right_win, #floatToolbar .right_space {
  float:right;
  width:64px;
  height:48px;
  text-align: center;
  vertical-align: middle;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 8px rgba(0,0,0,0.15);
  opacity:1;
  border-radius:2px;
}
#floatBtm {
  position:fixed;
  bottom: 50px;
  right: 40px;
  z-index: 1990;
  width: 40px;
}
#floatBtm span {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    cursor: pointer;
  }
.areaInfo {
  position: absolute;
  padding:11px 16px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 8px rgba(0,0,0,0.15);
  opacity:1;
  border-radius:4px;
  z-index: 1000;
}
.box_space {
  float: right;
  margin:6px 15px 0 0;
  width: 19px;
  height: 7px;
  background: url(../../icons/svg/rectangle.png) top no-repeat;
}
.housesafebox_space {
  position: absolute;
  top: 55px;
  left: 130px;
  z-index: 1;
  width: 19px;
  height: 7px;
  background: url(../../icons/svg/rectangle.png) top no-repeat;
}
#floatToolbar .right_win {
  float: left;
  width: 100%;
  height:449px;
  border-radius: 8px;
  box-shadow:0px 2px 8px rgba(0,0,0,0.15);
  opacity:1;
  padding-top: 20px;
}
#floatToolbar .housesafelv {
    position: absolute;
    top: 62px;
    width: 350px;
    height: 40px;
    line-height: 40px;
    padding-top: 0;
}
.tdt-bottom {display: none;}
.tdt-bottom, .tdt-top {z-index: 998;}
.text {
    font-size: 14px;
    color: #606266;
  }

  .item {
    margin-bottom: 18px;
    border-bottom: 1px #F2F6FC solid;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
.tdt-label {
  box-shadow: initial;
  border: 0;
}
.labelStyle {
  color: rgb(255, 255, 255);
  font-size: 14px;
  text-align: center;
  padding: 0 8px;
  background: rgba(89, 155, 1, 0.8);
  border: 0;
}

.circle {
	width: 80px;
	height: 80px;
	line-height: 80px;
	border-radius: 100%;
}
.onMouseover {
	background: rgba(231, 93, 1, 1);
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

.el-button+.el-button {margin-left:0;}
.el-icon-list, .icon-house,.icon-house1, .icon-safe, .icon-safe1, .icon-trading, .icon-trading1, .icon-energy, .icon-energy1 {
    background-size: cover;
    margin-right: 4px;
}
.el-icon-list:before, .icon-house:before,.icon-house1:before, .icon-safe:before, .icon-safe1:before, .icon-trading:before, .icon-trading1:before, .icon-energy:before, .icon-energy1:before, .icon-charts:before {
    content: "替";
    font-size: 16px;
    visibility: hidden;
}
.el-checkbox {
  font-size: 12px;
  margin-right: 10px;
}
.el-checkbox__label {
  font-size: 12px;
}
.icon-charts:before {
  font-size: 24px;
}
.el-icon-list {
    background: url(../../icons/svg/list.png) center no-repeat;
}
.icon-house{
    background: url(../../icons/svg/house.png) center no-repeat;
}
.icon-house1{
    background: url(../../icons/svg/house1.png) center no-repeat;
}
.icon-safe{
    background: url(../../icons/svg/safe.png) center no-repeat;
}
.icon-safe1{
    background: url(../../icons/svg/safe1.png) center no-repeat;
}
.icon-trading{
    background: url(../../icons/svg/trading.png) center no-repeat;
}
.icon-trading1{
    background: url(../../icons/svg/trading1.png) center no-repeat;
}
.icon-energy{
    background: url(../../icons/svg/energy.png) center no-repeat;
}
.icon-energy1{
    background: url(../../icons/svg/energy1.png) center no-repeat;
}
.icon-charts{
    display: block;
    height: 48px;
    cursor: pointer;
    background: url(../../icons/svg/charts.png) center no-repeat;
}
.icon-charts1{
    display: block;
    height: 48px;
    cursor: pointer;
    background: url(../../icons/svg/charts1.png) center no-repeat;
}
.icon-traffic{
    display: block;
    height: 40px;
    background: url(../../icons/svg/traffic.png) center no-repeat;
}
.icon-traffic:hover, .icon-traffic1{
    display: block;
    height: 40px;
    background: url(../../icons/svg/traffic1.png) center no-repeat;
}
.icon-restaurant{
    display: block;
    height: 40px;
    background: url(../../icons/svg/restaurant.png) center no-repeat;
}
.icon-restaurant:hover, .icon-restaurant1{
    display: block;
    height: 40px;
    background: url(../../icons/svg/restaurant1.png) center no-repeat;
}
.icon-edu{
    display: block;
    height: 40px;
    background: url(../../icons/svg/edu.png) center no-repeat;
}
.icon-edu:hover, .icon-edu1{
    display: block;
    height: 40px;
    background: url(../../icons/svg/edu1.png) center no-repeat;
}
.icon-medical{
    display: block;
    height: 40px;
    background: url(../../icons/svg/medical.png) center no-repeat;
}
.icon-medical:hover, .icon-medical1{
    display: block;
    height: 40px;
    background: url(../../icons/svg/medical1.png) center no-repeat;
}
</style>
