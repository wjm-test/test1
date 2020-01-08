<template>
  <div class="container">
    <div class="container-item">
      <analysis-line id="dtline" class-name="dtline" height="500px" width="100%" name="建造年代与总建筑面积分析" />
      <analysis-des />
    </div>
  </div>
</template>

<script>
import analysisLine from './components/lineChart'
import analysisDes from './components/desc'
export default {
  name: 'AnalysisDetail',
  data(){
	return {
		list: JSON.parse(this.$route.query.list),
		name: this.$route.query.name,
	}
  },
  mounted() {
  	// console.log(this.list)
  },
  components: {
    analysisDes,
    analysisLine
  }
}
</script>

<style scoped lang="scss">
  .container{
    background: #F0F2F5;
    padding: 24px;
    .container-item{
      background: #fff;
      padding: 24px;
    }
  }
</style>
