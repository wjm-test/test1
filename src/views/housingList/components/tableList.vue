<template>
  <div>
    <!-- <el-table
      :data="list"
      border
      style="width: 100%;margin-top: 15px;"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="房屋编号" width="150">
        <template slot-scope="scope">
          {{ scope.row.fwbh | '' }}
        </template>
      </el-table-column>
      <el-table-column label="区域" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.qy | '' }}
        </template>
      </el-table-column>
      <el-table-column label="街道" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.jd | '' }}
        </template>
      </el-table-column>
      <el-table-column label="小区名称" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.xqmc | '' }}
        </template>
      </el-table-column>
      <el-table-column label="楼幢名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.lzmc | '' }}
        </template>
      </el-table-column>
      <el-table-column label="层数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.cs | '' }}
        </template>
      </el-table-column>
      <el-table-column label="建筑面积" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.jzmj + '㎡' | '' }}
        </template>
      </el-table-column>
      <el-table-column label="土地性质" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.tdxz | '' }}
        </template>
      </el-table-column>
    </el-table> -->

     <el-table
       :data="list"
       border
       style="width: 100%;margin-top: 15px;"
       @current-change="handleCurrentChange"
     >
       <!-- <el-table-column type="selection" width="45px"></el-table-column> -->
       <!-- <el-table-column label="序号" width="62px" type="index"> -->
       <!-- </el-table-column> -->
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

    <!-- <el-pagination
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      style="float: right;margin-top: 10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
    /> -->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNo" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>

</template>

<script>
import { transactionList } from '@/api/remote-search'
import { fetchHouseSearch } from '@/api/house'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  props:{
    queryList: {
      type: null
    },
    activeName: {
      type: String
    }
  },
  data() {
    return {
      // currentPage: 1,
      // houselist: this.houselist,

      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        nature: '',//（房屋性质，1为住宅，2为非住宅）
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
      // list: [],
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
      ]
    }
  },
  created() {
    if(this.activeName == 'first'){
      this.listQuery.nature = 1
    }else{
      this.listQuery.nature = 2
    }

    console.log(this.listQuery.nature)
    this.getList()
  },
  mounted() {
    // console.log(1)
    // // console.log(this.queryList)
  },
  watch:{
    activeName(val) {
        this.activeName = this.val;
      },
    queryList: {
    　handler(val, oldVal) {
        // console.log(1111)
      // 　console.log(val)
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
    　deep: true
    }

  },
  methods: {
    getList() {
      this.listLoading = true
      fetchHouseSearch(this.listQuery).then(response => {
        console.log(response)
        this.list = response.data.pageData
        this.total = response.data.count
      })
    },
    handleCurrentChange(val) {
      // console.log(val)
      // this.$emit('currentRowData', val)
      this.$router.push({ path: '/housing/desc', query: { id: val.FULLNUMBER, activeName: this.activeName}})
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentPageChange(val) {
      // console.log(`当前页: ${val}`)
    }
  }
}
</script>
