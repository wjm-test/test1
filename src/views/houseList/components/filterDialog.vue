<template>
  <div style="margin-top: 20px;">
    <div>
      <span class="addFilter" @click="dialogFormVisible = true">
        增加过滤字段
        <i class="el-icon-plus" />
      </span>
    </div>
    <el-dialog title :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="top">
        <el-form-item label="已选">
          <el-tag v-for="tag in checkList" :key="tag">{{ tag }}</el-tag>
        </el-form-item>
        <el-form-item label="可选字段">
          <el-checkbox-group v-model="checkList" @change="changCheckOption">
            <el-checkbox v-for="(val,valindex) in  houList" :key="valindex" :label="val.name">{{ val.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="onCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUpdateType, fetchHouseType } from "@/api/house";
export default {
  name: "FilterDialog",
  props: ["list","checkList","activeName"],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      checkList: this.checkList,
      activeName: this.activeName,
      blist: [],
      houList: this.list,
      queryList: {},
      showOptionList: null,

    };
  },
  watch: {
    activeName: function(val, oldVal) {
      this.activeName = val;
    },
    list: {
    　handler(newValue, oldValue) {
        this.houList = newValue
    　},
    　deep: true
    }
  },
  mounted() {
    // console.log(this.houList)
  },
  methods: {
    changCheckOption(value, e) {
      this.checkList = value;
    },
    handleTagClose(tag){
      this.checkList = this.checkList.splice(this.checkList.indexOf(tag), 1);
    },
    onSubmit() {
      this.dialogFormVisible = false;
      var deList = []
      var obj = {}

      deList=this.houList.filter(item=>{
        if(this.checkList.indexOf(item.name)>-1){
          return item
        }
      }).map(m=>{
        return m.paramsId
      })
      obj = {
        updateType: deList.join(","),
        userId: "admin"
      };
      this.queryList = obj
      this.$emit("changeList", this.queryList);
    },
    onCancel() {
      this.dialogFormVisible = false;
      // this.$emit("changeList", this.list);
    }
  }
};
</script>

<style scoped>
.filter {
  font-size: 14px;
  padding: 3px;
  border: 1px solid #eee;
  border-radius: 3px;
  color: #333;
  margin-left: 10px;
}
.addFilter {
  color: #1890ff;
  font-size: 14px;
  cursor: pointer;
}
.el-form-item__label {
  line-height: 10px;
  font-weight: 800;
}
.el-form-item__content {
  line-height: 25px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
