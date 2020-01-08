<--<template>
  <div class="container">
    <a-anchor class="anchor-box" @click="handleClick">
      <a-anchor-link href="#jzjk" title="建筑情况" />
      <a-anchor-link href="#qsqk" title="权属情况" />
      <a-anchor-link href="#glqk" title="管理情况" />
      <a-anchor-link href="#dcqk" title="调查情况" />
      <a-anchor-link href="#jdzl" title="鉴定治理" />
      <a-anchor-link href="#tzzl" title="图纸资料" />
      <a-anchor-link href="#wywxzj" title="物业维修资金" />
      <a-anchor-link href="#jzgm" title="建筑概貌" />
      <a-anchor-link href="#dcdw" title="调查单位" />
    </a-anchor>

    <div class="detail" id="detail" v-if="list">
      <div class="dt-box">
        <div id="jzjk" style="color: #303133;font-size: 30px; font-weight: 800;">{{list.AREANAME}} - {{list.ROADNAME}} - {{list.BUILDINGNAME}}</div>
        <div class="dt-item">
          <div style="color: #303133;font-size: 14px; position: absolute; top: -18px; right: 30px;">房屋编号: {{list.FULLNUMBER}}</div>
          <div class="dt-row">
            <span class="dt-subText">坐标x(经度):  {{list.AXISX}}</span>
            <span class="dt-subText">坐标y(纬度):  {{list.AXISY}}</span>
          </div>
          <remote-js
            :js-url="'http://api.tianditu.gov.cn/api?v=4.0&tk=1bdc300e0865c6e7d6404cea30a1db69'"
            :js-load-call-back="loadTJs"
          />
          <div id="mapDiv"  style=" height: 300px; border: 1px solid #ccc; border-radius: 5px;"></div>
        </div>
      </div>
      <div class="dt-box">
        <div id="qsqk" class="dt-title">权属情况</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="6">产权性质: <span class="textColor">{{list.PROPERTYRIGHTS}}</span></el-col>
            <el-col :span="6">产权单位: <span class="textColor">{{list.PROPERTYUNIT}}</span></el-col>
            <el-col :span="6">产权单位负责人: <span class="textColor">{{list.PROPERTYUNITUSER}}</span></el-col>
            <el-col :span="6">产权单位负责人电话: <span class="textColor">{{list.PROPERTYUNITUSERTEL}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">产权单位联系人: <span class="textColor">{{list.PROPERTYUNITCONENT}}</span></el-col>
            <el-col :span="6">产权单位联系人电话: <span class="textColor">{{list.PROPERTYUNITCONENTTEL}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="8">房屋包含的住宅总套数: <span class="textColor">总共{{list.HOUSECOUNT}}套</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="18">按产权性质分: <span class="textColor"> 1.直管公房套数 {{list.STRAIGHTHOUSECOUNT}}套 2.自管公房套数 {{list.SELFHOUSECOUNT}}套 3.私房套数 {{list.PRIVATEHOUSECOUNT}}套 其中：(①商品房 {{list.BUSINESSCOUNT}}套 ②房改房 {{list.CHANGEHOUSECOUNT}}套 ③拆迁安置房 {{list.RESETTLEMENTHOUSECOUNT}}套 ④其他 {{list.OTHERCOUNT}}套</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="glqk" class="dt-title">管理情况</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="6">物业单位: <span class="textColor">{{list.WUYEUNIT}}</span></el-col>
            <el-col :span="6">物业单位负责人: <span class="textColor">{{list.WUYEUNITUSER}}</span></el-col>
            <el-col :span="6">物业单位负责人电话: <span class="textColor">{{list.WUYEUNITUSERTEL}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="dcqk" class="dt-title">调查情况</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="6">房屋场地: <span class="textColor">{{list.HOUSESITE}}</span></el-col>
            <el-col :span="6">相邻施工: <span class="textColor">{{list.ADJACENTCONSTRUCTION}}</span></el-col>
            <el-col :span="6">化学侵蚀: <span class="textColor">{{list.CHEMICALEROSION}}</span></el-col>
            <el-col :span="6">结构拆改: <span class="textColor">{{list.STRUCTURALDISMANTLING}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">加层改造: <span class="textColor">{{list.ADDINGLAYER}}</span></el-col>
            <el-col :span="6">修缮加固: <span class="textColor">{{list.REPAIRANDREINFORCE}}</span></el-col>
            <el-col :span="6">历史灾害: <span class="textColor">{{list.HISTORICALCALAMITY}}</span></el-col>
            <el-col :span="6">使用功能变更: <span class="textColor">{{list.FUNCTIONALCHANGE}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="6">其他调查内容: <span class="textColor">{{list.OTHERCONTENTS}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="jdzl" class="dt-title">鉴定治理</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="24">鉴定情况: <span class="textColor">{{list.IDENTIFICATION}}</span></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">治理改造措施: <span class="textColor">{{list.GOVERNMENT}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="tzzl" class="dt-title">图纸资料</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="8">图纸资料存放处: <span class="textColor">{{list.DRAWINGMATERIALTEXT}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="wywxzj" class="dt-title">物业维修资金</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="6">物业保证金: <span class="textColor">{{list.PROPERTYSECURITY}}</span></el-col>
            <el-col :span="6">余额: <span class="textColor">{{list.PROPERTYSECURITY1}}元</span></el-col>
          </el-row>
          <el-row>
            <!-- <el-col :span="6">物业专项维修资金: <span class="textColor">有</span></el-col> -->
            <el-col :span="6">物业管理专项资金余额: <span class="textColor">{{list.MAINTENANCEFUNDS1}}元</span></el-col>
            <el-col :span="6">房改房维修资金余额: <span class="textColor">{{list.MAINTENANCEFUNDS2}}元</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="jzgm" class="dt-title">建筑概貌</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="24">外立面照片: <span class="textColor textOver">{{list.FACADEPHOTO}}</span></el-col>
          </el-row>
        </div>
      </div>
      <div class="dt-box">
        <div id="dcdw" class="dt-title">调查单位</div>
        <div class="dt-item">
          <el-row>
            <el-col :span="6">调查登记机构: <span class="textColor">{{list.AEGISTRATIONAGENCY}}</span></el-col>
            <el-col :span="6">调查人员: <span class="textColor">{{list.AEGISTRATIONUSER}}</span></el-col>
          </el-row>
        </div>
      </div>
  </div>

</template>

<script>
import  RemoteJs  from  '@/components/RemoteJs'  //  导入外部引用组件
import { fetchHouseLiveDetails, fetchHouseNoLiveDetails } from '@/api/house'
export default {
  name: 'HousingRightList',
  data() {
    return {
      zoom: 15,
      input: '',
      id: this.$route.query.id,
      activeName: this.$route.query.activeName,
      queryList: {
        fullnumber: ''
      },
      list: null
    }
  },
  components:{
    RemoteJs
  },
  created() {
    if(this.activeName == 'HOU'){
      this.getDetail()
    }else{
      this.getDetailNo()
    }
  },
  mounted() {

  },
  methods:{
    handleClick(e, link) {
      // 阻止路由跳转
      e.preventDefault();
      // console.log(link);
    },
    getDetail(){
      this.queryList.fullnumber = this.id
      fetchHouseLiveDetails(this.queryList).then(response => {
        this.list = response.data[0]
      })
    },
    getDetailNo(){
      this.queryList.fullnumber = this.id
      fetchHouseNoLiveDetails(this.queryList).then(response => {
        this.list = response.data[0]
      })
    },
    loadTJs()  {
      //  当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
      this.$nextTick(function()  {
          this.init()
      })
    },
    init()  {
      // console.log('******初始化地图******')
      let map  =  new T.Map('mapDiv')
      map.centerAndZoom(
        new  T.LngLat(this.list.AXISX, this.list.AXISY),
        this.zoom
      )
      // map.setMinZoom(10)	//设置最小缩放级别
        //创建标注对象
      var  marker  =  new T.Marker(
        new  T.LngLat(this.list.AXISX, this.list.AXISY)
      )
      //向地图上添加标注
      map.addOverLay(marker)
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    box-sizing: border-box;
    .anchor-box{
      width: 12%;
      position: fixed;
      top: 121px;
      right:24px;
      background: #fff;
      padding: 25px;
    }
    .detail{
      width: 85%;
      padding: 32px;
      background: #fff;
      .dt-box{
        // border-right: 1px solid #ccc;
        border-bottom: 1px solid #EBEEF5;
        // border-radius: 3px;
        margin-bottom: 18px;
        .dt-title{
          font-size: 20px;
          color: #303133;
          font-weight: 900;
          // border-bottom: 2px solid #AACCEE;
          // margin-right: 10px;
          // padding: 10px;
        }
        .dt-item{
          position: relative;
          padding-bottom: 24px;
          .el-row{
            margin-top: 24px;
            color: #909399;
            font-size: 14px;
            .textColor{
              color: #303133;
            }
            .textOver{
              display: inline-block;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .dt-row{
            padding: 10px 0;
            .dt-subText{
              font-size: 12px;
              color: #909399;
              margin-right: 24px;
              margin-top: 16px;
              margin-bottom: 24px;
            }
            .el-input{
              width: 200px;
            }
          }
        }
      }
    }
  }
</style>
