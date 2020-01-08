<template>
  <div class="container">
    <right-list />
  </div>
</template>
<script>
import rightList from './components/rightList'
export default {
  name: 'HousingDesc',
  components: {
    rightList
  }
}
</script>
<style lang="scss" scoped>
  .container{
    padding: 10px;
    background: #F0F2F5;
  }
</style>
