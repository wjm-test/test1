<template>
  <div>
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Breadcrumb',
  components: {
    Breadcrumb
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb-container {
  float: left;
}
</style>
