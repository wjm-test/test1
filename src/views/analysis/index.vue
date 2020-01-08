<template>
  <div class="container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="房屋信息分析" name="first">
        <keep-alive>
          <div style="background: #fff;padding: 30px 30px 60px;">
            <div style="margin-bottom: 20px;">
              <router-link to="/analysis/export">
                <el-button size="small">导出单个分析报告</el-button>
              </router-link>
              <router-link to="/analysis/export">
                <el-button size="small">导出合并分析报告</el-button>
              </router-link>
            </div>
            <analysis-desc />
            <el-row gutter="20">
              <el-col :span="8">
                <analysis-line v-if="'first' === activeName && houseBuildArea" id="zjzmj" class-name="zjzmj" height="300px" width="100%" name="建造年代与总建筑面积分析" :list="houseBuildArea" unint="平方米" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-line ref="testanaline" v-if="'first' === activeName  &&  houseQuantity" id="fwzsl" class-name="fwzsl" height="300px" width="100%" name="建造年代与房屋总数量分析" :list="houseQuantity" unint="幢" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-line v-if="'first' === activeName && houseYearsBuildArea" id="hjmj" class-name="hjmj" height="300px" width="100%" name="建造年代与户均面积分析" :list="houseYearsBuildArea" unint="平方米" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-line v-if="'first' === activeName && houseLayersYears" id="pjzcs" class-name="pjzcs" height="300px" width="100%" name="建造年代与平均总层数分析" :list="houseLayersYears" unint="层" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-bar v-if="'first' === activeName && houseStructureYears" id="jglx" class-name="jglx" height="300px" width="100%" name="建造年代与结构类型交叉分析" :list="houseStructureYears" unint="幢" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-bar v-if="'first' === activeName && houseSeismicYears" id="kzdj" class-name="kzdj" height="300px" width="100%" name="建造年代与抗震等级分析" :list="houseSeismicYears" unint="级" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-line v-if="'first' === activeName && houseDesignYears" id="sjsynx" class-name="sjsynx" height="300px" width="100%" name="建造年代与设计使用年限分析" :list="houseDesignYears" unint="年" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-bar v-if="'first' === activeName && houseAreaYears" id="xzqufwzmj" class-name="xzqufwzmj" height="300px" width="100%" name="建造年代与行政区域房屋总面积交叉分析" :list="houseAreaYears" unint="平方米" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-bar v-if="'first' === activeName && houseYearsArea" id="xzqyfwzsl" class-name="xzqyfwzsl" height="300px" width="100%" name="建造年代与行政区域房屋总数量交叉分析" :list="houseYearsArea" unint="幢" style="display: inline-block;" />
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="建筑企业分析列表" name="second">
        <keep-alive>
          <div style="background: #fff;padding: 30px 30px 60px;">
            <div style="margin-bottom: 20px;">
              <router-link to="/analysis/export">
                <el-button size="small">导出单个分析报告</el-button>
              </router-link>
              <router-link to="/analysis/export">
                <el-button size="small">导出合并分析报告</el-button>
              </router-link>
            </div>
            <analysis-desc />
            <el-row gutter="20">
              <el-col :span="24" class="subText">建设单位</el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseAreaBuilding" id="jfwzmj" class-name="jfwzmj" height="300px" width="100%" name="建设单位与房屋总面积分析" :list="houseAreaBuilding" unint="平方米" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseNumConstruction" id="jfwzsl" class-name="jfwzsl" height="300px" width="100%" name="建设单位与房屋总数量分析" :list="houseNumConstruction" unint="幢" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                  <analysis-pie v-if="'second' === activeName && houseHeightConstruction" id="jfwcg" class-name="jfwcg" height="300px" width="100%" name="建设单位与房屋层高交叉分析" :list="houseHeightConstruction" unint="层" style="display: inline-block;" />
                </el-col>
              <el-col :span="8">
                <analysis-pie v-if="'second' === activeName && houseStructConstruction" id="jjglx" class-name="jjglx" height="300px" width="100%" name="建设单位与结构类型交叉分析" :list="houseStructConstruction" unint="幢" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseConstructionYear" id="jsjsjsynx" class-name="jsjsjsynx" height="300px" width="100%" name="建设单位与实际设计使用年限分析" :list="houseConstructionYear" unint="年" style="display: inline-block;" />
              </el-col>
            </el-row>
            <el-row gutter="20">
              <el-col :span="24"  class="subText">设计单位</el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseAreaDesign" id="sfwzmj" class-name="sfwzmj" height="300px" width="100%" name="设计单位与房屋总面积分析" :list="houseAreaDesign" unint="平方米" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseNumberDesign" id="sfwzsl" class-name="sfwzsl" height="300px" width="100%" name="设计单位与房屋总数量分析" :list="houseNumberDesign" unint="幢" style="display: inline-block;" />
              </el-col>
             <el-col :span="8">
                <analysis-pie v-if="'second' === activeName && desinHeightConstruction" id="sfwcg" class-name="sfwcg" height="300px" width="100%" name="设计单位与房屋层高交叉分析" :list="desinHeightConstruction" unint="层" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <analysis-pie v-if="'second' === activeName && desinStructConstruction" id="sjglx" class-name="sjglx" height="300px" width="100%" name="设计单位与结构类型交叉分析" :list="desinStructConstruction" unint="幢" style="display: inline-block;" />
              </el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseDesingerYear" id="ssjsjsynx" class-name="ssjsjsynx" height="300px" width="100%" name="设计单位与实际设计使用年限比分析" :list="houseDesingerYear" unint="年" style="display: inline-block;" />
              </el-col>
            </el-row>
            <el-row gutter="20">
              <el-col :span="24"  class="subText">物业单位</el-col>
              <el-col :span="8">
                <stacking-bar v-if="'second' === activeName && houseNumberWuye" id="wfwzsl" class-name="wfwzsl" height="300px" width="100%" name="物业单位与房屋总数量分析" :list="houseNumberWuye" unint="幢" style="display: inline-block;" />
              </el-col>
            </el-row>
          </div>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import analysisDesc from './components/desc'
import analysisLine from './components/analysisLine'
import analysisBar from './components/analysisBar'
import stackingBar from './components/analysisStackingBar'
import analysisPie from './components/analysisPie'
import { fetchHouseQuantity, fetchHouseBuildArea, fetchHouseYearsBuildArea, fetchHouseLayersYears, fetchHouseSeismicYears, fetchHouseStructureYears, fetchHouseDesignYears, fetchHouseAreaYears, fetchHouseYearsArea, fetchHouseNumConstruction, fetchHouseConstructionYear, fetchHouseNumberWuye, fetchHouseNumberDesign, fetchHouseAreaDesign, fetchHouseDesingerYear, fetchHouseAreaBuilding, fetchHouseStructConstruction, fetchHouseHeightConstruction, fetchDesinStructConstruction, fetchDesinHeightConstruction } from '@/api/house'
export default {
  name: 'Analysis',
  components: {
    analysisDesc,
    analysisLine,
    analysisBar,
    stackingBar,
    analysisPie
  },
  data() {
    return {
      activeName: 'first',
      houseQuantity: null,
      houseBuildArea: null,
      houseYearsBuildArea: null,
      houseLayersYears: null,
      houseDesignYears: null,
      houseSeismicYears: null,
      houseStructureYears: null,
      houseAreaYears: null,
      houseYearsArea: null,
      houseNumConstruction: null,
      houseConstructionYear: null,
      houseNumberWuye: null,
      houseNumberDesign: null,
      houseAreaDesign: null,
      houseDesingerYear: null,
      houseAreaBuilding: null,
      houseHeightConstruction: null,
      houseStructConstruction: null,
      desinStructConstruction: null,
      desinHeightConstruction: null,

      fetchHouseHeightDemo: null,
      heightList: null
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    const tab = this.$route.query.tab
    // console.log(tab)
    if (tab) {
      this.activeName = tab
    }else{
      this.activeName = 'first'
    }
    this.fetchData()
    this.fetchBuildData()
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    fetchBuildData(){
      // 建设单位与房屋数量
      fetchHouseNumConstruction().then(response => {
        // console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.BUILDINGUNIT);
               sD.push(odd.NUMS)
             }
             this.houseNumConstruction={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseNumConstruction', JSON.stringify(this.houseNumConstruction))
             console.log(this.houseNumConstruction)
          }).catch(err => {
            console.log(err)
          })

          // 建设单位使用年限
          fetchHouseConstructionYear().then(response => {
              // console.log(response.data)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.BUILDINGUNIT);
               sD.push(odd.USEDYEAR)
             }
             this.houseConstructionYear={
               xAxisData: xD,
               seriesData: sD
             }
             console.log(this.houseConstructionYear)
             sessionStorage.setItem('houseConstructionYear', JSON.stringify(this.houseConstructionYear))
          }).catch(err => {
            console.log(err)
          })

          // 建设单位与房屋总面积
          fetchHouseAreaBuilding().then(response => {
              console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.BUILDINGUNIT);
               sD.push(odd.AREA)
             }
             this.houseAreaBuilding={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseAreaBuilding', JSON.stringify(this.houseAreaBuilding))
             console.log(this.houseAreaBuilding)
          }).catch(err => {
            console.log(err)
          })

          // 建设单位与结构类型
          fetchHouseStructConstruction().then(response => {
            // console.log(response.data)
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.TITLE]){
                    dest.push({
                        time: ai.TITLE,
                        data: [{
                          'name': ai.BUILDINGUNIT,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.TITLE] = {
                          'name': ai.BUILDINGUNIT,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.TITLE){
                            dj.data.push({
                              'name': ai.BUILDINGUNIT,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.houseStructConstruction = dest
            // console.log(this.houseStructConstruction)
            sessionStorage.setItem('houseStructConstruction', JSON.stringify(this.houseStructConstruction))
          }).catch(err => {
            console.log(err)
          })

          // 建设单位与房屋层高
          fetchHouseHeightConstruction().then(response => {
            // console.log(333)
            // console.log(response.data)
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.FLOORS]){
                    dest.push({
                        time: ai.FLOORS,
                        data: [{
                          'name': ai.BUILDINGUNIT,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.FLOORS] = {
                          'name': ai.BUILDINGUNIT,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.FLOORS){
                            dj.data.push({
                              'name': ai.BUILDINGUNIT,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }

            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.houseHeightConstruction = dest
            // console.log(111)
            // console.log(this.houseHeightConstruction)
            sessionStorage.setItem('houseHeightConstruction', JSON.stringify(this.houseHeightConstruction))
          }).catch(err => {
            console.log(err)
          })

          // 物业单位与房屋数量
          fetchHouseNumberWuye().then(response => {
              // console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.WUYEUNIT);
               sD.push(odd.NUMS)
             }
             this.houseNumberWuye={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseNumberWuye', JSON.stringify(this.houseNumberWuye))
             // console.log(this.houseNumberWuye)
          }).catch(err => {
            console.log(err)
          })

          // 设计单位与房屋数量
          fetchHouseNumberDesign().then(response => {
              // console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.DESINGERUNIT);
               sD.push(odd.NUMS)
             }
             this.houseNumberDesign={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseNumberDesign', JSON.stringify(this.houseNumberDesign))
             // console.log(this.houseNumberDesign)
          }).catch(err => {
            console.log(err)
          })

          // 设计单位与房屋总面积
          fetchHouseAreaDesign().then(response => {
              // console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.DESINGERUNIT);
               sD.push(odd.AREA)
             }
             this.houseAreaDesign={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseAreaDesign', JSON.stringify(this.houseAreaDesign))
             // console.log(this.houseAreaDesign)
          }).catch(err => {
            console.log(err)
          })

          // 设计单位的使用年限
          fetchHouseDesingerYear().then(response => {
              // console.log(response)
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.DESINGERUNIT);
               sD.push(odd.USEDYEARS)
             }
             this.houseDesingerYear={
               xAxisData: xD,
               seriesData: sD
             }
             // console.log(this.houseDesingerYear)
             sessionStorage.setItem('houseDesingerYear', JSON.stringify(this.houseDesingerYear))
          }).catch(err => {
            console.log(err)
          })

          // 设计单位与结构类型
          fetchDesinStructConstruction().then(response => {
            // console.log(response.data)
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.TITLE]){
                    dest.push({
                        time: ai.TITLE,
                        data: [{
                          'name': ai.DESINGERUNIT,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.TITLE] = {
                          'name': ai.DESINGERUNIT,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.TITLE){
                            dj.data.push({
                              'name': ai.DESINGERUNIT,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.desinStructConstruction = dest
            // console.log(this.desinStructConstruction)
            sessionStorage.setItem('desinStructConstruction', JSON.stringify(this.desinStructConstruction))
          }).catch(err => {
            console.log(err)
          })

          // 设计单位与房屋层高交叉分析
          fetchDesinHeightConstruction().then(response => {
            // console.log(111)
            // console.log(response.data)
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.FLOORS]){
                    dest.push({
                        time: ai.FLOORS,
                        data: [{
                          'name': ai.DESINGERUNIT,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.FLOORS] = {
                          'name': ai.DESINGERUNIT,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.FLOORS){
                            dj.data.push({
                              'name': ai.DESINGERUNIT,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.desinHeightConstruction = dest
            // console.log(222)
            // console.log(this.desinHeightConstruction)
            sessionStorage.setItem('desinHeightConstruction', JSON.stringify(this.desinHeightConstruction))
          }).catch(err => {
            console.log(err)
          })
    },
    fetchData() {
          // 房屋总数量
          fetchHouseQuantity().then(response => {
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.YEARS);
               sD.push(odd.NUMS)
             }
             this.houseQuantity={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseQuantity', JSON.stringify(this.houseQuantity))
          }).catch(err => {
            console.log(err)
          })
          // 总建筑面积
          fetchHouseBuildArea().then(response => {
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.YEARS);
               sD.push(odd.BUILDINGAREA)
             }
             this.houseBuildArea={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseBuildArea', JSON.stringify(this.houseBuildArea))
          }).catch(err => {
            console.log(err)
          })
          // 户均面积
          fetchHouseYearsBuildArea().then(response => {
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.YEAR);
               sD.push(odd.AREAHOLDS)
             }
             this.houseYearsBuildArea={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseYearsBuildArea', JSON.stringify(this.houseYearsBuildArea))
          }).catch(err => {
            console.log(err)
          })
          //平均总层数
          fetchHouseLayersYears().then(response => {
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.YEAR);
               sD.push(odd.FLOORS)
             }
             this.houseLayersYears={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseLayersYears', JSON.stringify(this.houseLayersYears))
          }).catch(err => {
            console.log(err)
          })
          // 抗震等级
          fetchHouseSeismicYears().then(response => {
            // console.log(response.data)
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.YEARS]){
                    dest.push({
                        time: ai.YEARS,
                        data: [{
                          'name': ai.ASEISMICGRADE,
                          'value': ai.SUMS
                        }]
                    });
                    map[ai.YEARS] = {
                          'name': ai.ASEISMICGRADE,
                          'value': ai.SUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.YEARS){
                            dj.data.push({
                              'name': ai.ASEISMICGRADE,
                              'value': ai.SUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.houseSeismicYears = dest
            sessionStorage.setItem('houseSeismicYears', JSON.stringify(this.houseSeismicYears))
          }).catch(err => {
            console.log(err)
          })

          // 结构类型交叉分析
          fetchHouseStructureYears().then(response => {
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.YEARS]){
                    dest.push({
                        time: ai.YEARS,
                        data: [{
                          'name': ai.STRUCTURE,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.YEARS] = {
                          'name': ai.STRUCTURE,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.YEARS){
                            dj.data.push({
                              'name': ai.STRUCTURE,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            this.houseStructureYears = dest
            sessionStorage.setItem('houseStructureYears', JSON.stringify(this.houseStructureYears))
          }).catch(err => {
            console.log(err)
          })

          //设计使用年限
          fetchHouseDesignYears().then(response => {
             var xD = []
             var sD = []
             for(var i = 0; i < response.data.length; i++){
               var odd = response.data[i]
               xD.push(odd.YEARS);
               sD.push(odd.USEYEAR)
             }
             this.houseDesignYears={
               xAxisData: xD,
               seriesData: sD
             }
             sessionStorage.setItem('houseDesignYears', JSON.stringify(this.houseDesignYears))
          }).catch(err => {
            console.log(err)
          })

          //各区域房屋总面积交叉
          fetchHouseAreaYears().then(response => {
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.YEAR]){
                    dest.push({
                        time: ai.YEAR,
                        data: [{
                          name: ai.AREANAME,
                          value: ai.AREA
                        }]
                    });
                    map[ai.YEAR] = {
                          name: ai.AREANAME,
                          value: ai.AREA
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.YEAR){
                            dj.data.push({
                          name: ai.AREANAME,
                          value: ai.AREA
                        });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            // console.log(dest)
            this.houseAreaYears = dest
            sessionStorage.setItem('houseAreaYears', JSON.stringify(this.houseAreaYears))
          }).catch(err => {
            console.log(err)
          })

          // 各区域房屋总数量交叉
          fetchHouseYearsArea().then(response => {
            var map = {},
                dest = [];
            for(var i = 0; i < response.data.length; i++){
                var ai = response.data[i];
                if(!map[ai.YEAR]){
                    dest.push({
                        time: ai.YEAR,
                        data: [{
                          'name': ai.AREANAME,
                          'value': ai.NUMS
                        }]
                    });
                    map[ai.YEAR] = {
                          'name': ai.AREANAME,
                          'value': ai.NUMS
                        };
                }else{
                    for(var j = 0; j < dest.length; j++){
                        var dj = dest[j];
                        if(dj.time == ai.YEAR){
                            dj.data.push({
                              'name': ai.AREANAME,
                              'value': ai.NUMS
                            });
                            break;
                        }
                    }
                }
            }
            for(var k = 0; k < dest.length; k++){
              dest[k].data = dest[k].data.sort(function(a, b) {
                  return a['value'] - b['value'];
              })

            }
            dest = dest.sort(function(a, b) {
                return a['time'] - b['time'];
            });
            // console.log(dest)
            this.houseYearsArea = dest
            sessionStorage.setItem('houseYearsArea', JSON.stringify(this.houseYearsArea))
          }).catch(err => {
            console.log(err)
          })
        },
  }
}
</script>
<style lang="scss" scoped>
  .container{
    background: #F0F2F5;
    /deep/ .el-tabs__header{
      padding: 0 24px;
      margin: 0;
      background: #fff;
      /deep/ .el-tabs__nav-wrap:after{
        height: 0;
      }
    }
    /deep/ .el-tabs__content{
      padding: 24px;
    }
    .subText{
      font-size: 18px;
      font-weight: 900;
    }
  }
</style>
