<template>
  <div>
    <div class="vue-dropdown default-theme">
      <div class="search-module clearfix">
        项目名称:
        <input
          v-model="inputText"
          class="search-text"
          :placeholder="placeholder"
          @keyup="search($event)"
        >
        <!-- <span class="glyphicon glyphicon-search search-icon"></span> -->
        <el-button
          type="primary"
          icon="el-icon-search"
        >搜索</el-button>
        <!-- <el-button type="primary">排序</el-button> -->
      </div>
      <ul
        v-show="isShowData"
        class="list-module"
      >
        <li
          v-for="(item,index) in datalist"
          :key="index"
          @click="appClick(item)"
        >
          <span class="list-item-text">{{ item }}</span>
        </li>
      </ul>
      <div
        v-show="isShowNone"
        class="tip__nodata"
      >{{ nodatatext }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemlist: Array,
    placeholder: String,
    nodatatext: String
  },
  data() {
    return {
      datalist: [],
      inputText: '',
      isShowData: false,
      isShowNone: false
    }
  },
  mounted() {
    this.datalist = this.itemlist
  },
  methods: {
    appClick: function(data) {
      this.$emit('item-click', data)
      this.inputText = data
      this.isShowData = false
    },
    search: function(e) {
      const searchvalue = e.currentTarget.value
      this.$emit('inputValue', searchvalue)
      if (this.datalist.length === 0) {
        this.isShowNone = true
        this.isShowData = false
      } else {
        this.isShowData = true
        this.isShowNone = false
      }
    },
    inputBlur() {
      this.isShowData = false
      this.isShowNone = false
      this.inputText = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-dropdown.default-theme {
  // position: absolute;
  // left:15%;
  // width: 70%;
  // margin: 0 auto;
  margin-top: 1em;
  padding: 1em;
  z-index: 10;
  // box-shadow: 0px 0px 10px #ccc;
  &._self-show {
    display: block !important;
  }

  .search-module {
    position: relative;
    .search-text {
      // width: 100%;
      height: 36px;
      padding-right: 2em;
      padding-left: 0.5em;
      border-radius: 0.5em;
      box-shadow: none;
      border: 1px solid #ccc;

      &:focus {
        border-color: #2198f2;
      }
    }

    .search-icon {
      position: absolute;
      top: 24%;
      right: 0.5em;
      color: #aaa;
    }
  }

  .list-module {
    max-height: 200px;
    overflow-y: auto;
    li {
      &._self-hide {
        display: none;
      }
      margin-top: 0.5em;
      padding: 0.5em;
      &:hover {
        cursor: pointer;
        color: #fff;
        background: #00a0e9;
      }
    }
  }
}
.tip__nodata {
  font-size: 12px;
  margin-top: 1em;
}
</style>
