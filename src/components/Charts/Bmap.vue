<template>
  <div class="app-container">
    <el-autocomplete
      v-model="mapLocation.address"
      :fetch-suggestions="querySearch"
      placeholder="请输入详细地址"
      style="width: 100%"
      :trigger-on-focus="false"
      @select="handleSelect"
    />
    <div style="margin: 5px">
      <baidu-map
        class="map"
        :center="mapCenter"
        :zoom="mapZoom"
        :min-zoom="10"
        :max-zoom="17"
        :scroll-wheel-zoom="true"
        :map-click="false"
        @zoomend="getZoom"
      >
        <div style="position: absolute;top: 80px;right: 60px;background: #ffffff;line-height: 34px;width: 120px;text-align: center;font-size: 14px;">
          显示小区数量
        </div>
        <!-- 街道区域 -->
        <bm-polygon
          :path="polygon.polygonPath"
          :name="polygon.name"
          :stroke-weight="2"
          stroke-color="blue"
          :fill-color="polygon.fillColor"
          :stroke-opacity="polygon.strokeOpacity"
          :fill-opacity="polygon.fillOpacity"
        />

        <!-- 文本标签 -->
        <!-- v-for循环输出label -->
        <bm-label
          v-for="(bMarker,index) of bMarkers"
          :key="index"
          :content="bMarker.name"
          :position="{lng: bMarker.lng, lat: bMarker.lat}"
          :label-style="labelStyle"
          :offset="{width:-15,height:0}"
          @mouseover="boundaryMap(bMarker.id,0.5)"
          @mouseout="boundaryMap('',0)"
          @click="getLabel"
        />
        <bm-info-window
          :position="{lng: polygon.lng, lat: polygon.lat}"
          :title="polygon.name"
          :show="infoWindow.show"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p v-text="infoWindow.contents" />
          <button @click="clear">Clear</button>
        </bm-info-window>
        <!-- 自定义覆盖窗口 -->
        <bm-overlay
          pane="labelPane"
          :class="{sample: true, active}"
          @draw="draw"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        >
          <div>我爱北京天安门</div>
        </bm-overlay>
        <!-- 缩略图 -->
        <bm-overview-map
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :is-open="true"
        />
      </baidu-map>
    </div>
  </div>
</template>

<script>
// import MyOverlay from './MyOverlay'
export default {
  components: {
    // MyOverlay
  },
  data() {
    // 插入 10 个随机点
    const markers = []
    for (let i = 0; i < 100; i++) {
      const position = {
        lng: Math.random() * 35 + 95,
        lat: Math.random() * 10 + 20
      }
      markers.push(position)
    }
    const area = ''
    return {
      boundary: {
        name: area,
        strokeOpacity: 0,
        fillOpacity: 0
      },
      markers: markers,
      bMarkers: [],
      mapCenter: { lng: 121.573478, lat: 29.90162 },
      mapZoom: 11,
      mapLocation: {
        address: undefined,
        coordinate: undefined
      },
      active: false,
      label: { title: '宁波市' },
      labelStyle: {
        width: '100px',
        height: '100px',
        lineHeight: '100px',
        color: 'rgb(255, 255, 255)',
        fontSize: '14px',
        textAlign: 'center',
        background: 'rgba(89, 155, 1, 0.8)',
        border: '0',
        borderRadius: '100%',
        zIndex: '999'
      },
      addStyle: {
        background: 'rgba(231, 93, 1, 1)'
      },
      polygon: {
        name: '',
        lng: 0,
        lat: 0,
        fillColor: 'rgba(161, 216, 249, 0.8)',
        strokeOpacity: 0,
        fillOpacity: 0,
        polygonPath: []
      },
      infoWindow: {
        show: false,
        contents: ''
      }
    }
  },
  mounted() {
    // this.getArea()
  },
  methods: {
    // handler({ BMap, map }) {
    //   console.log(BMap, map)
    //   this.center.lng = 116.404
    //   this.center.lat = 39.915
    //   this.zoom = 15
    // },
    // 获取区域点位
    getArea(level) {
      this.bMarkers = []
      this.$http
        .get(
          'http://192.168.0.202:81/data-system/api/bigScreen/house/area_street_center',
          {
            params: {
              // 参数
              levels: level
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          const sdata = str.data.data
          const res = sdata.map(data => ({
            id: data.ID,
            name: data.NAME,
            // midPrice: data.MID_PRICE,
            lng: data.LNG,
            lat: data.LAT
          }))
          this.bMarkers = res
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('*****getArea*****')
          console.log(err)
        })
    },
    // 获取选中区域的区划
    getPath(id, s) {
      this.$http
        .get(
          'http://192.168.0.202:81/data-system/api/bigScreen/house/county_latitude_scope',
          {
            params: {
              // 参数
              id: id
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          this.polygon.polygonPath = []
          if (str.data.data.length === 0) {
            this.polygon.strokeOpacity = s
            this.polygon.fillOpacity = s
          } else {
            const sdata = str.data.data[0]
            let STREETSCOPE = JSON.parse(sdata.STREETSCOPE)
            STREETSCOPE = STREETSCOPE[id][0]
            for (let i = 0; i < STREETSCOPE.length; i++) {
              this.polygon.polygonPath.push({
                lng: STREETSCOPE[i][1],
                lat: STREETSCOPE[i][0]
              })
            }

            // this.polygon.name = sdata.NAME
            // this.polygon.lng = sdata.LNG
            // this.polygon.lat = sdata.LAT
            // this.polygon.midPrice = sdata.MID_PRICE
            this.polygon.strokeOpacity = s
            this.polygon.fillOpacity = s
          }
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('+++++++getPath+++++++')
          console.log(err)
        })
    },
    handlerBMap({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      if (this.mapLocation.coordinate && this.mapLocation.coordinate.lng) {
        this.mapCenter.lng = this.mapLocation.coordinate.lng
        this.mapCenter.lat = this.mapLocation.coordinate.lat
        this.mapZoom = 15
        map.addOverlay(new this.BMap.Marker(this.mapLocation.coordinate))
      } else {
        this.mapCenter.lng = 113.271429
        this.mapCenter.lat = 23.135336
        this.mapZoom = 10
      }
    },
    querySearch(queryString, cb) {
      var that = this
      var myGeo = new this.BMap.Geocoder()
      myGeo.getPoint(
        queryString,
        function(point) {
          if (point) {
            that.mapLocation.coordinate = point
            that.makerCenter(point)
          } else {
            that.mapLocation.coordinate = null
          }
        },
        this.locationCity
      )
      var options = {
        onSearchComplete: function(results) {
          if (local.getStatus() === 0) {
            // 判断状态是否正确
            var s = []
            for (var i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { value: x.address + x.title, point: x.point }
              s.push(item)
              cb(s)
            }
          } else {
            cb()
          }
        }
      }
      var local = new this.BMap.LocalSearch(this.map, options)
      local.search(queryString)
    },
    handleSelect(item) {
      var { point } = item
      this.mapLocation.coordinate = point
      this.makerCenter(point)
    },
    makerCenter(point) {
      if (this.map) {
        this.map.clearOverlays()
        this.map.addOverlay(new this.BMap.Marker(point))
        this.mapCenter.lng = point.lng
        this.mapCenter.lat = point.lat
        this.mapZoom = 15
      }
    },
    boundaryMap(name, s) {
      this.getPath(name, 0.5)
      this.polygon.strokeOpacity = s
      this.polygon.fillOpacity = s
    },
    getZoom(e) {
      const nowZoom = e.currentTarget.Oa
      let labelWidth
      let labelHeight
      // let labelColor
      // let boundaryName
      if (nowZoom > 14) {
        this.getArea(2)
        labelWidth = '80px'
        labelHeight = '20px'
        this.labelStyle.borderRadius = '5px'
        // this.labelStyle.fontSize = '14px'
        // 显示小区级点
      } else if (nowZoom > 12 && nowZoom <= 14) {
        this.getArea(2)
        labelWidth = labelHeight = '50px'
        this.labelStyle.borderRadius = '50%'
        // this.labelStyle.fontSize = '16px'
      } else if (nowZoom <= 12) {
        this.getArea(1)
        labelWidth = labelHeight = '50px'
        this.labelStyle.borderRadius = '50%'
        // this.labelStyle.fontSize = '16px'
      }
      this.labelStyle.width = labelWidth
      this.labelStyle.height = labelHeight
      this.labelStyle.lineHeight = labelHeight
      console.log(nowZoom)
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
      this.infoWindow.contents = this.polygon.name
    },
    clear() {
      this.infoWindow.contents = ''
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(
        new BMap.Point(this.polygon.lng, this.polygon.lat)
      )
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    },
    getLabel(e) {
      console.log('===========================')
      console.log(e)
      this.addStyle.background = 'rgba(231, 93, 1, 1)'
      // this.mapCenter = { lng: e.point.lng, lat: e.point.lat }
      // this.mapZoom = 15
    }
  }
}
</script>
<style>
.map {
  width: 100%;
  height: calc(100vh - 84px);
}
.BMapLabel {
  background: rgba(89, 155, 1, 0.8);
}
.BMapLabel:hover {
  background: rgba(231, 93, 1, 1);
}
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}

/*去除百度地图版权*/
.anchorBL {
  display: none;
}
</style>
