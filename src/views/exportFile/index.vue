<template>
  <div class="container">
    <div class="row" id="pdfDom">
	  <el-row>
		  <el-col :span="24">
			  <export-chart id="eline" class-name="eline" height="500px" width="100%" name="建造年代与总建筑面积分析" :list="houseBuildArea" ></export-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <export-chart id="eline1" :list="houseQuantity" class-name="eline" height="500px" width="100%" name="建造年代与房屋总数量分析" ></export-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <export-chart id="eline2" :list="houseYearsBuildArea" class-name="eline" height="500px" width="100%" name="建造年代与户均面积分析" ></export-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <export-chart id="eline3" :list="houseLayersYears" class-name="eline" height="500px" width="100%" name="建造年代与平均总层数分析" ></export-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <bar-chart id="eline4" :list="houseStructureYears" class-name="eline" height="500px" width="100%" name="建造年代与结构类型交叉分析" ></bar-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <bar-chart id="eline5" :list="houseSeismicYears" class-name="eline" height="500px" width="100%" name="建造年代与抗震等级分析" ></bar-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <export-chart id="eline6" class-name="eline" :list="houseDesignYears" height="500px" width="100%" name="建造年代与设计使用年限分析" ></export-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <bar-chart id="eline7" :list="houseAreaYears" class-name="eline" height="500px" width="100%" name="建造年代与行政区域房屋总面积交叉分析" ></bar-chart>
			  <export-desc></export-desc>
		  </el-col>
		  <el-col :span="24">
			  <bar-chart id="eline8" :list="houseYearsArea" class-name="eline" height="500px" width="100%" name="建造年代与行政区域房屋总数量交叉分析" ></bar-chart>
			  <export-desc></export-desc>
		  </el-col>
	  </el-row>
    </div>
    <el-button @click="getPdf()" size="small" class="btn">导出PDF</el-button>
  </div>
</template>

<script>
  import exportChart from './components/exportChart'
  import barChart from './components/exportBarChart'
  import exportDesc from './components/exportDesc'
  import { mapState, mapGetters } from 'vuex'
  export default{
    data () {
      return {
        htmlTitle: '页面导出PDF文件名'
      }
    },
    components:{
      exportChart,
      exportDesc,
      barChart
    },
    computed:{
      ...mapGetters([
        'houseBuildArea',
        'houseQuantity',
        'houseYearsBuildArea',
        'houseLayersYears',
        'houseDesignYears',
        'houseStructureYears',
        'houseSeismicYears',
        'houseAreaYears',
        'houseYearsArea'

      ])
    }
  }
</script>

<style scoped lang="scss">
  .container{
    background: #F0F2F5;
    padding: 24px;
    #pdfDom{
      background: #fff;
      padding: 24px;
    }
    .btn{
      position: absolute;
      top: 44px;
      right: 50px;

    }
  }
</style>
