<template>
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
</template>

<script>
</script>

<style>
</style>
