<template>
  <div class="container-item">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="住宅" name="first">
        <div style="background: #fff;padding: 30px 30px 60px;">
          <house-desc :list="checkList" :showOptionList="showOptionList"  :activeName="activeName" @onsubmitQuery="getQuery"/>
          <filter-dialog :list="houList" :checkList="checkList" @changeList="handleChangeList" :activeName="activeName"/>
          <table-list @currentRowData="handleCurrentRowData" :queryList="queryList" :activeName="activeName"/>
        </div>
      </el-tab-pane>
      <el-tab-pane label="非住宅" name="second">
        <div style="background: #fff;padding: 30px 30px 60px;">
          <house-desc :list="checkList" :showOptionList="showOptionList" :activeName="activeName"/>
          <filter-dialog :list="houList" :checkList="checkList" @changeList="handleChangeList" :activeName="activeName" />
          <table-list @currentRowData="handleCurrentRowData" :queryList="queryList" :activeName="activeName" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import houseDesc from './components/desc'
import tableList from './components/tableList'
import filterDialog from './components/filterDialog'
import { fetchHouseSearch, fetchHouseType, fetchUpdateType } from '@/api/house'
export default {
  name: 'HousingList',
  components: {
    houseDesc,
    tableList,
    filterDialog
  },
  data() {
    return {
      activeName: 'first',
      checkList: [],
      queryList: null,
      screeningList: {},
      list: null,
      showOptionList: null,
      houseVal: [
        { id: 'AREANAME', name: "区域范围", paramsId: 'areaName' },
        { id: 'NATURELAND', name: "土地性质", paramsId: 'natureLand' },
        { id: 'HOUSESTATUS', name: "房屋状态", paramsId: 'houseStatus' },
        { id: 'EXTERIORWALLTITLE', name: "面砖", paramsId: 'exteriorWalltitle' },
        { id: 'CURTAINWALL', name: "幕墙", paramsId: 'curtainWall' },
        { id: 'ADDRESS', name: "地址", paramsId: 'address' },
        { id: 'PROPERTYRIGHTS', name: "产权性质", paramsId: 'propertyRights' }, // 住宅
        { id: 'BASEINFO', name: "基础情况", paramsId: 'baseinfo' },
        { id: 'STRUCTURETYPE', name: "结构类型", paramsId: 'StructureType' },
        { id: 'GOVERNMENT', name: "治理改造措施", paramsId: 'government' },
        { id: 'DRAWINGMATERIAL', name: "图纸资料", paramsId: 'drawingMaterial' },
        { id: 'COMPLETEDDATE', name: "竣工日期", paramsId: 'completedDate' },
        { id: 'BUILDINGUNIT', name: "建设单位", paramsId: 'buildingUnit' },
        { id: 'DESINGERUNIT', name: "设计单位", paramsId: 'desingerUnit' },
        { id: 'CONSTRUCTIONUNIT', name: "施工单位", paramsId: 'constructionUnit' },
        { id: 'MONITORUNIT', name: "监理单位", paramsId: 'monitorUnit' },
        { id: 'PROPERTYUNIT', name: "产权单位", paramsId: 'propertyUnit' },
        { id: 'HOUSELEVEL', name: "房屋等级", paramsId: 'houseLevel' },
        { id: 'IDENTIFICATION', name: "鉴定情况", paramsId: 'identification' }
      ],
      nonHouseVal: [
        { id: 'AREANAME', name: "区域范围", paramsId: 'areaName' },
        { id: 'NATURELAND', name: "土地性质", paramsId: 'natureLand' },
        { id: 'HOUSESTATUS', name: "房屋状态", paramsId: 'houseStatus' },
        { id: 'EXTERIORWALLTITLE', name: "面砖", paramsId: 'exteriorWalltitle' },
        { id: 'CURTAINWALL', name: "幕墙", paramsId: 'curtainWall' },
        { id: 'ADDRESS', name: "地址", paramsId: 'address' },
        { id: 'BASEINFO', name: "基础情况", paramsId: 'baseinfo' },
        { id: 'STRUCTURETYPE', name: "结构类型", paramsId: 'StructureType' },
        { id: 'GOVERNMENT', name: "治理改造措施", paramsId: 'government' },
        { id: 'INDUSTRY', name: "所属行业、系统", paramsId: 'industry' }, // 非住宅
        { id: 'USEFUNCTION', name: "使用功能", paramsId: 'useFunction' }, // 非住宅
        { id: 'DRAWINGMATERIAL', name: "图纸资料", paramsId: 'drawingMaterial' },
        { id: 'COMPLETEDDATE', name: "竣工日期", paramsId: 'completedDate' },
        { id: 'BUILDINGUNIT', name: "建设单位", paramsId: 'buildingUnit' },
        { id: 'DESINGERUNIT', name: "设计单位", paramsId: 'desingerUnit' },
        { id: 'CONSTRUCTIONUNIT', name: "施工单位", paramsId: 'constructionUnit' },
        { id: 'MONITORUNIT', name: "监理单位", paramsId: 'monitorUnit' },
        { id: 'PROPERTYUNIT', name: "产权单位", paramsId: 'propertyUnit' },
        { id: 'HOUSELEVEL', name: "房屋等级", paramsId: 'houseLevel' },
        { id: 'IDENTIFICATION', name: "鉴定情况", paramsId: 'identification' }
      ],
      houList: null,

    }
  },
  created() {
    // this.getList(),
    if(this.activeName == 'first'){
      this.houList = this.houseVal
    }else{
      this.houList = this.nonHouseVal
    }
    // console.log(this.houList)
    this.showOrHideOptionList()

  },
  mounted() {

  },
  methods: {
    getList(){
      fetchHouseSearch(this.queryList).then(response => {
          this.list = response.data

        })
    },
    showOrHideOptionList(){
      fetchHouseType().then(response => {
        var list = []
        var deList = []
         this.showOptionList = response.data[0]

          for(var k in response.data[0]){
             if(response.data[0][k] == 1){
               list.push(k)
             }

          }

          deList=this.houList.filter(item=>{
            if(list.indexOf(item.id)>-1){
              return item
            }
          }).map(m=>{
            return m.name
          })
          this. checkList = deList
        })
    },
    getQuery(value){
      this.queryList = value
    },
    handleClick(tab, event) {
      this.activeName = tab.paneName
      if(tab.paneName == 'first'){
        this.houList = this.houseVal
      }else{
        this.houList = this.nonHouseVal
      }
    },
    // handleCurrentRowData(data) {
    //   this.$router.push({ path: '/housing/desc', params: { id: '123' }})
    // },
    handleChangeList(data) {
      this.screeningList = data
      fetchUpdateType(this.screeningList).then(response => {
        if(response.success == true){
          this.showOrHideOptionList()
        }else{
          this.$message(response.message);
        }
      })

    }
  }
}
</script>
<style lang="scss" scoped>
  .container-item{
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
  }
</style>
