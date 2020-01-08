<template>
  <el-row class="toolbar-style">
    <el-col :span="5" style="padding-left: 15px;">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        clearable
        style="width: 75%;"
      />
      <el-button type="primary" icon="el-icon-search" @click="search" />
    </el-col>
    <el-col :span="5">
      <el-select v-model="temp1.selectValue" class="w-30" @change="selectGetRoad">
        <el-option
          v-for="item in optionsArea"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="temp2.selectValue" class="w-30" @change="selectGetPro">
        <el-option
          v-for="item in optionsRoad"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="temp3.selectValue" class="w-30">
        <el-option
          v-for="item in optionsPro"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="5" style="line-height:36px;">
      <el-checkbox v-model="checked1" name="1" @change="checkboxv">移动地图时搜索</el-checkbox>
      <el-checkbox v-model="checked2" name="2" @change="checkboxv">画圈查看</el-checkbox>
      <el-checkbox v-model="checked3" name="3" @change="checkboxv">显示数量</el-checkbox>
    </el-col>
    <el-col :span="4">&nbsp;</el-col>
    <el-col :span="5" style="text-align: right;padding-right: 15px;">
      <i class="el-icon-list" />列表
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 30,
      type: Number
    }
  },
  data() {
    return {
      show: false,
      input: '',
      optionsArea: [
        {
          value: '区县',
          label: '区县'
        }
      ],
      optionsRoad: [
        {
          value: '街道',
          label: '街道'
        }
      ],
      optionsPro: [
        {
          value: '项目',
          label: '项目'
        }
      ],
      options4: [
        {
          value: '统计信息',
          label: '统计信息'
        },
        {
          value: '信息2',
          label: '信息2'
        }
      ],
      temp1: {
        selectValue: undefined,
        buttonText: 'button1',
        inputValue: 'input1'
      },
      temp2: {
        selectValue: undefined,
        buttonText: 'button1',
        inputValue: 'input1'
      },
      temp3: {
        selectValue: undefined,
        buttonText: 'button1',
        inputValue: 'input1'
      },
      select4: {
        selectValue: undefined,
        buttonText: 'button1',
        inputValue: 'input1'
      },
      checked1: true,
      checked2: false,
      checked3: false
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
    }
  },
  mounted() {
    this.insertToBody()
  },
  beforeDestroy() {
    const elx = this.$refs.ToolBar
    elx.remove()
  },
  methods: {
    search() {
      console.log(this.input)
    },
    checkboxv(val, e) {
      if (val) {
        switch (Number(e.target.name)) {
          case 1:
            alert('开启移动地图时搜索')
            break
          case 2:
            // alert('开启画圈查看')checked2
            this.$parent.openPolygonTool(this.checked2)

            break
          case 3:
            alert('开启显示数量')
            break
          default:
            break
        }
      } else {
        switch (Number(e.target.name)) {
          case 1:
            alert('关闭移动地图时搜索')
            break
          case 2:
            // alert('关闭画圈查看')
            break
          case 3:
            alert('关闭显示数量')
            break
          default:
            break
        }
      }
    },
    // 下拉框选中事件
    selectGetRoad(vId) { // 这个vId也就是value值
      this.optionsRoad = []
      this.getOption(2, vId, '')
      this.RoadVal = vId
    },
    selectGetPro(vId) { // 这个vId也就是value值
      this.getOption(3, this.RoadVal, vId)
    },
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      const parent = evt.target.closest('.ToolBar')
      if (!parent) {
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
    },
    insertToBody() {
      const elx = this.$refs.ToolBar
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    },
    getOption(lv, areaName, roadName) {
      this.$http
        .get(
          'http://saturn.51vip.biz:81/data-system/api/houseMap/houseAreaPro',
          {
            params: {
              // 参数
              areaName: areaName,
              roadName: roadName
            }
          }
        )
        .then(str => {
          // 请求成功后的处理函数
          const res = str.data.data
          console.log(res)
          const options = []
          res.map(function(item) {
            switch (lv) {
              case 1:
                options.push({
                  value: item['AREANAME'],
                  label: item['AREANAME']
                })
                break
              case 2:
                options.push({
                  value: item['ROADNAME'],
                  label: item['ROADNAME']
                })
                break
              case 3:
                options.push({
                  value: item['PROJECTNAME'],
                  label: item['PROJECTNAME']
                })
                break
              default:
                break
            }
          })
          if (lv === 1) { this.optionsArea = options }
          if (lv === 2) { this.optionsRoad = options }
          if (lv === 3) { this.optionsPro = options }
          console.log(options)
        })
        .catch(err => {
          // 请求失败后的处理函数
          console.log('*****get*****')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .toolbar-style {
    position: fixed;
    top: 55px;
    width: calc(100% - 210px);
    height: 50px;
    padding-top: 2px;
    background:#ffffff;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .w-30 {
    width: 30%;
  }
</style>
