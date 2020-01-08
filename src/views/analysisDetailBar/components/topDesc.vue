<template>
  <div class="box">
    <aside>
      <el-row>
		  <el-col :span="12">
			  采用大数据辅助房地产分析是大势所趋，提通过对海量数据的分析研究，可以精准地了解政策、城市、市场、土地、住房、价格、用户等各方面因素，并给出智能决策辅助，从而做到“知己知彼，百战不殆”，清醒智慧地开展决策研究等工作，高效率地创造更好的效益
		  </el-col>
		  <el-col :span="12">
        <img class="img" src="@/assets/images/bgicon.png" />
		  </el-col>
	  </el-row>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'topDes'
}
</script>

<style scoped lang="scss">
  .box{
    padding-bottom: 40px;
    .el-col{
      position: relative;
      .img{
        width: 158px;
        height: 105px;
        position: absolute;
        // top: 4px;
        right: 122px;
      }
    }
  }
  
</style>
