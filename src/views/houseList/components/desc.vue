<template>
  <div style="margin-top: 20px;" v-if="showOptionList">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="区域范围" v-if="showOptionList.AREANAME == 1">
        <el-col :span="5">
          <el-select v-model="form.areaName" placeholder="请选择区" @change="qychange">
            <el-option v-for="(item,index) in qy" :key="index" :label="item.AREANAME" :value="item.AREANAME" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.roadName" placeholder="请选择街道" @change="jdchange">
            <el-option v-for="(item,index) in jd" :key="index" :label="item.ROADNAME" :value="item.ROADNAME" />
          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.communityName" placeholder="请选择社区" @change="sqchange">
             <el-option v-for="(item,index) in sq" :key="index" :label="item.COMMUNITYNAME" :value="item.COMMUNITYNAME" />

          </el-select>
        </el-col>
        <el-col :span="5">
          <el-select v-model="form.projectName" placeholder="请选择项目">
            <el-option v-for="(item,index) in pro" :key="index" :label="item.PROJECTNAME" :value="item.PROJECTNAME" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="房屋状态" v-if="showOptionList.HOUSESTATUS == 1">
        <el-checkbox-group v-model="form.houseStatus">
          <el-checkbox label="1" name="type">正常使用</el-checkbox>
          <el-checkbox label="2" name="type">拆除中</el-checkbox>
          <el-checkbox label="3" name="type">完成拆除</el-checkbox>
          <el-checkbox label="4" name="type">列入棚改、征收等不信息建档</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="土地性质" v-if="showOptionList.NATURELAND == 1">
        <el-radio-group v-model="form.natureLand">
          <el-radio label="1">国有土地</el-checkbox>
          <el-radio label="2">集体土地</el-checkbox>
          <el-radio label="3">全部土地</el-checkbox>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="面砖" v-if="showOptionList.EXTERIORWALLTITLE == 1">
        <el-radio-group v-model="form.exteriorWalltitle">
          <el-radio label="1">有</el-radio>
          <el-radio label="2">无</el-radio>
          <el-radio label="3">全部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="幕墙" v-if="showOptionList.CURTAINWALL == 1">
        <el-checkbox-group v-model="form.curtainWall">
          <el-checkbox label="1" name="type">玻璃幕墙</el-checkbox>
          <el-checkbox label="2" name="type">石材幕墙</el-checkbox>
          <el-checkbox label="3" name="type">金属幕墙</el-checkbox>
          <el-checkbox label="4" name="type">组合幕墙</el-checkbox>
          <el-checkbox label="5" name="type">其他</el-checkbox>
          <el-checkbox label="6" name="type">无</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="产权性质" v-if="showOptionList.PROPERTYRIGHTS == 1 && activeName == 'HOU'">
        <el-checkbox-group v-model="form.propertyRights">
          <el-checkbox label="1" name="type">直管公房</el-checkbox>
          <el-checkbox label="2" name="type">单位自管公房</el-checkbox>
          <el-checkbox label="3" name="type">私房(商品房)</el-checkbox>
          <el-checkbox label="4" name="type">私房(房改房)</el-checkbox>
          <el-checkbox label="5" name="type">私房(拆迁安置房)</el-checkbox>
          <el-checkbox label="6" name="type">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="基础情况" v-if="showOptionList.BASEINFO == 1">
        <el-radio-group v-model="form.baseinfo">
          <el-radio label="1">浅基础</el-radio>
          <el-radio label="2">桩基础</el-radio>
          <el-radio label="3">所有</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="结构类型" v-if="showOptionList.STRUCTURETYPE == 1">
        <el-checkbox-group v-model="form.StructureType">
          <el-checkbox label="1" name="type">砖木结构
          <el-checkbox label="2" name="type">砖混结构</el-checkbox>
          <el-checkbox label="3" name="type">砖混(地框)结构</el-checkbox>
          <el-checkbox label="4" name="type">钢筋混凝土结构(框架)</el-checkbox>
          <el-checkbox label="5" name="type">钢筋混凝土结构(框剪)</el-checkbox>
          <el-checkbox label="6" name="type">钢筋混凝土结构(剪力墙)</el-checkbox>
          <el-checkbox label="7" name="type">钢、钢筋混凝土结构</el-checkbox>
          <el-checkbox label="8" name="type">钢结构</el-checkbox>
          <el-checkbox label="9" name="type">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="治理改造措施" v-if="showOptionList.GOVERNMENT == 1">
        <el-checkbox-group v-model="form.government">
          <el-checkbox label="1" name="type">腾</el-checkbox>
          <el-checkbox label="2" name="type">拆</el-checkbox>
          <el-checkbox label="3" name="type">修</el-checkbox>
          <el-checkbox label="4" name="type">控</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属行业、系统" v-if="showOptionList.INDUSTRY == 1 && activeName == 'NHOU'">
        <el-checkbox-group v-model="form.industry">
          <el-checkbox label="1" name="type">教育</el-checkbox>
          <el-checkbox label="2" name="type">卫生</el-checkbox>
          <el-checkbox label="3" name="type">文化</el-checkbox>
          <el-checkbox label="4" name="type">体育</el-checkbox>
          <el-checkbox label="5" name="type">民政</el-checkbox>
          <el-checkbox label="6" name="type">交通</el-checkbox>
          <el-checkbox label="7" name="type">民族宗教</el-checkbox>
          <el-checkbox label="8" name="type">机关事务管理</el-checkbox>
          <el-checkbox label="9" name="type">旅游</el-checkbox>
          <el-checkbox label="10" name="type">经信</el-checkbox>
          <el-checkbox label="11" name="type">商务</el-checkbox>
          <el-checkbox label="100" name="type">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="使用功能" v-if="showOptionList.USEFUNCTION == 1 && activeName == 'NHOU'">
        <el-checkbox-group v-model="form.useFunction">
          <el-checkbox label="1" name="type">工业</el-checkbox>
          <el-checkbox label="2" name="type">交通</el-checkbox>
          <el-checkbox label="3" name="type">仓储</el-checkbox>
          <el-checkbox label="4" name="type">商业</el-checkbox>
          <el-checkbox label="5" name="type">金融</el-checkbox>
          <el-checkbox label="6" name="type">信息</el-checkbox>
          <el-checkbox label="7" name="type">教育</el-checkbox>
          <el-checkbox label="8" name="type">医疗</el-checkbox>
          <el-checkbox label="9" name="type">卫生</el-checkbox>
          <el-checkbox label="a" name="type">科研</el-checkbox>
          <el-checkbox label="b" name="type">文化</el-checkbox>
          <el-checkbox label="c" name="type">娱乐</el-checkbox>
          <el-checkbox label="d" name="type">体育</el-checkbox>
          <el-checkbox label="e" name="type">办公</el-checkbox>
          <el-checkbox label="f" name="type">其他</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="图纸资料" v-if="showOptionList.DRAWINGMATERIAL == 1">
        <el-checkbox-group v-model="form.drawingMaterial">
          <el-checkbox label="1" name="type">齐全</el-checkbox>
          <el-checkbox label="2" name="type">不齐</el-checkbox>
          <el-checkbox label="3" name="type">无</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="房屋等级" v-if="showOptionList.HOUSELEVEL == 1">
        <el-checkbox-group v-model="form.houseLevel">
          <el-checkbox label="1" name="type">1</el-checkbox>
          <el-checkbox label="2" name="type">2</el-checkbox>
          <el-checkbox label="3" name="type">3</el-checkbox>
          <el-checkbox label="4" name="type">4</el-checkbox>
          <el-checkbox label="5" name="type">C</el-checkbox>
          <el-checkbox label="6" name="type">D</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="鉴定情况" v-if="showOptionList.IDENTIFICATION == 1">
        <el-checkbox-group v-model="form.identification">
          <el-checkbox label="1" name="type">未作鉴定</el-checkbox>
          <el-checkbox label="2" name="type">鉴定等级A级</el-checkbox>
          <el-checkbox label="3" name="type">鉴定等级B级</el-checkbox>
          <el-checkbox label="4" name="type">鉴定等级C级</el-checkbox>
          <el-checkbox label="5" name="type">鉴定等级D级</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="竣工日期" v-if="showOptionList.COMPLETEDDATE == 1">
        <el-date-picker
          v-model="form.completedDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="地址" style="display: inline-block; width: 49%;" v-if="showOptionList.ADDRESS == 1">
        <el-col :span="12">
          <el-input v-model="form.address" />
        </el-col>
      </el-form-item>
      <el-form-item label="建设单位" style="display: inline-block; width: 49%;" v-if="showOptionList.BUILDINGUNIT == 1">
        <el-col :span="12">
          <el-input v-model="form.buildingUnit" />
        </el-col>
      </el-form-item>
      <el-form-item label="设计单位" style="display: inline-block; width: 49%;" v-if="showOptionList.DESINGERUNIT == 1">
        <el-col :span="12">
          <el-input v-model="form.desingerUnit" />
        </el-col>
      </el-form-item>
      <el-form-item label="施工单位" style="display: inline-block; width: 49%;" v-if="showOptionList.CONSTRUCTIONUNIT == 1">
        <el-col :span="12">
          <el-input v-model="form.constructionUnit" />
        </el-col>
      </el-form-item>
      <el-form-item label="监理单位" style="display: inline-block; width: 49%;" v-if="showOptionList.MONITORUNIT == 1">
        <el-col :span="12">
          <el-input v-model="form.monitorUnit" />
        </el-col>
      </el-form-item>
      <el-form-item label="产权单位" style="display: inline-block; width: 49%;" v-if="showOptionList.PROPERTYUNIT == 1">
        <el-col :span="12">
          <el-input v-model="form.propertyUnit" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { fetchHouseArea, fetchHouseType } from '@/api/house'

export default {
  props: ['list', 'activeName', 'showOptionList'],
  data() {
    return {
      form: {
        areaName: '',
        roadName: '',
        communityName: '',
        projectName: '',
        houseStatus: [],
        natureLand: '',
        exteriorWalltitle: '',
        curtainWall: [],
        propertyRights: [],
        baseinfo: '',
        StructureType: [],
        government: [],
        industry: [],
        useFunction: [],
        drawingMaterial: [],
        houseLevel: [],
        identification: [],
        completedDate: '',
        address: '',
        buildingUnit: '',
        desingerUnit: '',
        constructionUnit: '',
        monitorUnit: '',
        propertyUnit: ''
      },
      activeName: this.activeName,
      qy: null,
      jd: null,
      sq: null,
      pro: null,
      query: {
        areaName: '',
        roadName: '',
        communityName: '',
      },
      showOptionList: this.showOptionList
    }
  },
  watch: {
    activeName: function (val, oldVal) {
      this.activeName = val
    },
  },
  created() {
  	this.getData()
  },
  methods: {
    getData(){
      fetchHouseArea().then(response => {
          this.qy = response.data
        })
    },
    qychange(value){
        this.query.areaName = value
        fetchHouseArea(this.query).then(response => {
            this.jd = response.data
          })
    },
    jdchange(value){
        this.query.roadName = value
        fetchHouseArea(this.query).then(response => {
            this.sq = response.data
          })
    },
    sqchange(value){
        this.query.communityName = value
        fetchHouseArea(this.query).then(response => {
            this.pro = response.data
          })
    },
    onSubmit() {
      this.$emit('onsubmitQuery', this.form)
      // console.log(333)
    },
    onCancel() {
      console.log(this.list)
    }
  }
}
</script>

<style scoped lang="scss">
  .el-select{
    width: 85%;
  }
  /deep/ .el-form-item__label{
    width: 120px!important;
  }
</style>
