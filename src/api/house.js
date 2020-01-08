import request from '@/utils/request'
// 房屋信息分析
// 建造年代与房屋总数量
export function fetchHouseQuantity() {
  return request({
    url: '/bigScreen/house/HouseNumberYears',
    method: 'get'
  })
}

// 建造年代与总建筑面积
export function fetchHouseBuildArea() {
  return request({
    url: '/bigScreen/house/HouseYearsBuildArea',
    method: 'get'
  })
}

// 建造年代与户均面积
export function fetchHouseYearsBuildArea() {
  return request({
    url: '/bigScreen/house/HouseholdYearsArea',
    method: 'get'
  })
}

// 建造年代与平均总层数
export function fetchHouseLayersYears() {
  return request({
    url: '/bigScreen/house/HouseLayersYears',
    method: 'get'
  })
}

// 建造年代与抗震等级
export function fetchHouseSeismicYears() {
  return request({
    url: '/bigScreen/house/HouseSeismicYears',
    method: 'get'
  })
}

// 建造年代与结构类型交叉分析
export function fetchHouseStructureYears() {
  return request({
    url: '/bigScreen/house/HouseStructureYears',
    method: 'get'
  })
}

// 建造年代与设计使用年限
export function fetchHouseDesignYears() {
  return request({
    url: '/bigScreen/house/HouseDesignYears',
    method: 'get'
  })
}

// 建造年代与各区域房屋总面积交叉分析
export function fetchHouseAreaYears() {
  return request({
    url: '/bigScreen/house/HouseAreaYears',
    method: 'get'
  })
}

// 建造年代与各区域房屋总数量交叉分析
export function fetchHouseYearsArea() {
  return request({
    url: '/bigScreen/house/HouseYearsArea',
    method: 'get'
  })
}

// 建筑企业分析
// 建设单位与房屋数量
export function fetchHouseNumConstruction() {
  return request({
    url: '/bigScreen/house/HouseNumConstruction',
    method: 'get'
  })
}

// 建设单位的使用年限
export function fetchHouseConstructionYear() {
  return request({
    url: '/bigScreen/house/HouseConstructionYear',
    method: 'get'
  })
}

// 建设单位与房屋总面积
export function fetchHouseAreaBuilding() {
  return request({
    url: '/bigScreen/house/HouseAreaBuilding',
    method: 'get'
  })
}

// 建设单位与结构类型
export function fetchHouseStructConstruction() {
  return request({
    url: '/bigScreen/house/HouseStructConstruction',
    method: 'get'
  })
}

// 建设单位与房屋层高
export function fetchHouseHeightConstruction() {
  return request({
    url: '/bigScreen/house/HouseHeightConstruction',
    method: 'get'
  })
}

// 设计单位与房屋数量
export function fetchHouseNumberDesign() {
  return request({
    url: '/bigScreen/house/HouseNumberDesign',
    method: 'get'
  })
}

// 设计单位与房屋总面积
export function fetchHouseAreaDesign() {
  return request({
    url: '/bigScreen/house/HouseAreaDesign',
    method: 'get'
  })
}

// 设计单位的使用年限
export function fetchHouseDesingerYear() {
  return request({
    url: '/bigScreen/house/HouseDesingerYear',
    method: 'get'
  })
}

// 设计单位与房屋层高交叉分析
export function fetchDesinHeightConstruction() {
  return request({
    url: '/bigScreen/house/DesinHeightConstruction',
    method: 'get'
  })
}

// 设计单位与结构类型交叉分析
export function fetchDesinStructConstruction() {
  return request({
    url: '/bigScreen/house/DesinStructConstruction',
    method: 'get'
  })
}

// 物业单位与房屋数量
export function fetchHouseNumberWuye() {
  return request({
    url: '/bigScreen/house/HouseNumberWuye',
    method: 'get'
  })
}


// 房屋管理列表
export function fetchHouseListSearch(query) {
  return request({
    url: '/bigScreen/house/HouseListSearch',
    method: 'get',
    params: query
  })
}

// 获取区域、街道、社区、项目
export function fetchHouseArea(query) {
  return request({
    url: '/houseMap/houseArea',
    method: 'get',
    params: query
  })
}

// 查询房屋列表
export function fetchHouseSearch(query) {
  return request({
    url: '/houseMap/houseSearch',
    method: 'get',
    params: query
  })
}

// 房屋管理过滤显示隐藏
export function fetchHouseType(query) {
  return request({
    url: '/houseMap/houseType',
    method: 'get',
    params: query
  })
}

// 房屋管理过滤显示隐藏
export function fetchUpdateType(query) {
  return request({
    url: '/houseMap/updateType',
    method: 'get',
    params: query
  })
}

// 房屋管理住宅详情
export function fetchHouseLiveDetails(query) {
  return request({
    url: '/bigScreen/house/HouseLiveDetails',
    method: 'get',
    params: query
  })
}

// 房屋管理非住宅详情
export function fetchHouseNoLiveDetails(query) {
  return request({
    url: '/bigScreen/house/HouseNoLiveDetails',
    method: 'get',
    params: query
  })
}
