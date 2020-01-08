<template>
  <div class="container-item">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <!-- <keep-alive> -->
          <div style="background: #fff;padding: 30px 30px 60px;">
            <house-desc v-if="activeName==item.key" :activeName="item.key" :list="checkList" :showOptionList="showOptionList" @onsubmitQuery="getQuery" />
            <filter-dialog :list="houList" :checkList="checkList" @changeList="handleChangeList" :activeName="activeName" />
            <!-- <table-list @currentRowData="handleCurrentRowData" :queryList="queryList" :activeName="activeName"/> -->
            <!-- <div> -->
               <el-table
                 :data="list"
                 border
                 style="width: 100%;margin-top: 15px;"
                 @current-change="handleCurrentChange"
               >
                 <el-table-column
                    label="序号"
                    align="center"
                    width="60"
                 >
                  <template slot-scope="scope">
                    <span>{{ scope.$index+1+listQuery.pageSize*(listQuery.pageNo-1) }}</span>
                  </template>
                 </el-table-column>
                  <template v-for='(col) in tableData'>
                    <el-table-column
                      width="150"
                     :show-overflow-tooltip="true"
                     :prop="col.dataItem"
                     :label="col.dataName"
                     :key="col.dataItem"
                  >
                  </el-table-column>
                 </template>
                 </el-table-column>
               </el-table>
              <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
            <!-- </div> -->
          </div>
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import houseDesc from './components/desc'
import filterDialog from './components/filterDialog'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { fetchHouseSearch, fetchHouseType, fetchUpdateType } from '@/api/house'
export default {
  name: 'HousingList',
  components: {
    houseDesc,
    filterDialog,
    Pagination
  },
  data() {
    return {
	  tabMapOptions: [
	    { label: '住宅', key: 'HOU' },
	    { label: '非住宅', key: 'NHOU' }
	  ],
	  activeName: 'HOU',
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
      showQuery: {
        userId: 'admin',
        nature: 1
      },
      tableData: [
        {
          dataItem: 'ADDRESS',
          dataName: '地址'
        },
        // {
        //   dataItem: 'AREACOUNT',
        //   dataName: '总面积'
        // },
        {
          dataItem: 'AREANAME',
          dataName: '行政区'
        },
        {
          dataItem: 'BASEINFO',
          dataName: '基础情况'
        },
        {
          dataItem: 'BUILDINGNAME',
          dataName: '	幢名称'
        },
        {
          dataItem: 'BUILDINGUNIT',
          dataName: '建设单位'
        },
        {
          dataItem: 'COMPLETEDDATE',
          dataName: '竣工日期'
        },
        {
          dataItem: 'CONSTRUCTIONUNIT',
          dataName: '施工单位'
        },
        {
          dataItem: 'CURTAINWALL',
          dataName: '幕墙'
        },
        {
          dataItem: 'DESINGERUNIT',
          dataName: '	设计单位'
        },
        {
          dataItem: 'DRAWINGMATERIAL',
          dataName: '图纸存档处'
        },
        {
          dataItem: 'EXTERIORWALLTILE',
          dataName: '面砖'
        },
        {
          dataItem: 'FULLNUMBER',
          dataName: '房屋编码'
        },
        {
          dataItem: 'GOVERNMENT',
          dataName: '治理改造措施'
        },
        {
          dataItem: 'HOUSELEVEL',
          dataName: '房屋综合等级'
        },
        {
          dataItem: 'HOUSESTATUS',
          dataName: '房屋状态'
        },
        {
          dataItem: 'IDENTIFICATION',
          dataName: '鉴定情况'
        },
        {
          dataItem: 'INDUSTRY',
          dataName: '所属行业'
        },
        {
          dataItem: 'LEVELCOUNT',
          dataName: '	层数'
        },
        {
          dataItem: 'MONITORUNIT',
          dataName: '监理单位'
        },
        {
          dataItem: 'NATURE',
          dataName: '房屋性质'
        },
        {
          dataItem: 'NATURELAND',
          dataName: '土地类型'
        },
        {
          dataItem: 'PROJECTNAME',
          dataName: '项目（小区）'
        },
        {
          dataItem: 'PROPERTYRIGHTS',
          dataName: '	产权性质'
        },
        {
          dataItem: 'PROPERTYUNIT',
          dataName: '	产权单位'
        },
        {
          dataItem: 'ROADNAME',
          dataName: '	街道'
        },
        {
          dataItem: 'STRUCTURETYPE',
          dataName: '	结构类型'
        },
        {
          dataItem: 'USEFUNCTION',
          dataName: '	使用功能'
        }
      ],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        nature: 1,//（房屋性质，1为住宅，2为非住宅）
        pageNo: 1,
        pageSize: 20,
        areaName: '',
        roadName: '',
        communityName: '',
        projectName: '',
        natureLand: '',
        houseStatus: '',//（数组）
        exteriorWalltitle: '',
        curtainWall: '',//（数组）
        address: '',
        propertyRights: '',//（数组）
        baseinfo: '',
        StructureType: '',//（数组）
        government: '',//（数组）
        industry: '',//（数组）
        useFunction: '',//（数组）
        drawingMaterial: '',//（数组）
        timeMax: '',
        timeMin: '',
        buildingUnit: '',
        desingerUnit: '',
        constructionUnit: '',
        monitorUnit: '',
        propertyUnit: '',
        houseLevel: '',//（数组）
        identification: '',//（数组）
      },
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
      this.activeName = 'HOU'
    }
    if(this.activeName == 'HOU'){
      this.houList = this.houseVal
    }else{
      this.houList = this.nonHouseVal
    }
    this.listQuery.nature = this.activeName == "HOU" ? 1 : 2
    this.showOrHideOptionList()
    this.getList()
  },
  mounted() {

  },
  methods: {
    showOrHideOptionList(){
      this.showQuery.nature = this.activeName == 'HOU' ? 1 : 2
      fetchHouseType(this.showQuery).then(response => {
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
    getQuery(val){
      // console.log(this.activeName)
      // this.queryList = value
      this.listQuery.nature = this.activeName == "HOU" ? 1 : 2
      this.listQuery.areaName = val.areaName
      this.listQuery.roadName = val.roadName
      this.listQuery.communityName = val.communityName
      this.listQuery.projectName = val.projectName
      this.listQuery.natureLand = val.natureLand
      this.listQuery.houseStatus = val.houseStatus.length == 0 ? "" : val.houseStatus.join(',')
      this.listQuery.exteriorWalltitle = val.exteriorWalltitle
      this.listQuery.curtainWall = val.curtainWall.length == 0 ? "" : val.curtainWall.join(',')
      this.listQuery.address = val.address
      this.listQuery.propertyRights = val.propertyRights.length == 0 ? "" : val.propertyRights.join(',')
      this.listQuery.baseinfo = val.baseinfo
      this.listQuery.StructureType = val.StructureType.length == 0 ? "" : val.StructureType.join(',')
      this.listQuery.government = val.government.length == 0 ? "" : val.government.join(',')
      this.listQuery.industry = val.industry.length == 0 ? "" : val.industry.join(',')
      this.listQuery.useFunction = val.useFunction.length ? "" : val.useFunction.join(',')
      this.listQuery.drawingMaterial = val.drawingMaterial.length == 0 ? "" : val.drawingMaterial.join(',')
      this.listQuery.timeMax = val.completedDate ? val.completedDate[1] : ''
      this.listQuery.timeMin = val.completedDate ? val.completedDate[0] : ''
      this.listQuery.buildingUnit = val.buildingUnit
      this.listQuery.desingerUnit = val.desingerUnit
      this.listQuery.constructionUnit = val.constructionUnit
      this.listQuery.monitorUnit = val.monitorUnit
      this.listQuery.propertyUnit = val.propertyUnit
      this.listQuery.houseLevel = val.houseLevel.length == 0 ? "" : val.houseLevel.join(',')
      this.listQuery.identification = val.identification.length == 0 ? "" : val.identification.join(',')
      console.log(this.listQuery)
      this.getList()
    },
    handleClick(tab, event) {
      this.listQuery.nature = this.activeName == "HOU" ? 1 : 2
      this.showOrHideOptionList()
      this.getList()
      if(tab.paneName == 'HOU'){
        this.houList = this.houseVal
      }else{
        this.houList = this.nonHouseVal
      }


    },
    handleChangeList(data) {
      this.screeningList = data
      fetchUpdateType(this.screeningList).then(response => {
        if(response.success == true){
          this.showOrHideOptionList()
        }else{
          this.$message(response.message);
        }
      })

    },
    getList() {
      this.listLoading = true
      fetchHouseSearch(this.listQuery).then(response => {
        this.list = response.data.pageData
        this.total = response.data.count
      })
    },
    handleCurrentChange(val) {
      this.$router.push({ path: '/housing/desc', query: { id: val.FULLNUMBER, activeName: this.activeName}})
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
