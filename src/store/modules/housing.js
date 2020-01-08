const state = {
  houseQuantity: sessionStorage.getItem('houseQuantity')?JSON.parse(sessionStorage.getItem('houseQuantity')):null,
  houseBuildArea: sessionStorage.getItem('houseBuildArea')?JSON.parse(sessionStorage.getItem('houseBuildArea')):null,
  houseYearsBuildArea: sessionStorage.getItem('houseYearsBuildArea')?JSON.parse(sessionStorage.getItem('houseYearsBuildArea')):null,
  houseLayersYears: sessionStorage.getItem('houseLayersYears')?JSON.parse(sessionStorage.getItem('houseLayersYears')):null,
  houseDesignYears: sessionStorage.getItem('houseDesignYears')?JSON.parse(sessionStorage.getItem('houseDesignYears')):null,
  houseSeismicYears: sessionStorage.getItem('houseSeismicYears')?JSON.parse(sessionStorage.getItem('houseSeismicYears')):null,
  houseStructureYears: sessionStorage.getItem('houseStructureYears')?JSON.parse(sessionStorage.getItem('houseStructureYears')):null,
  houseAreaYears: sessionStorage.getItem('houseAreaYears')?JSON.parse(sessionStorage.getItem('houseAreaYears')):null,
  houseYearsArea: sessionStorage.getItem('houseYearsArea')?JSON.parse(sessionStorage.getItem('houseYearsArea')):null,
  houseNumConstruction: sessionStorage.getItem('houseNumConstruction') ? JSON.parse(sessionStorage.getItem('houseNumConstruction')) : null,
  houseConstructionYear: sessionStorage.getItem('houseConstructionYear')?JSON.parse(sessionStorage.getItem('houseConstructionYear')):null,
  houseNumberWuye: sessionStorage.getItem('houseNumberWuye')?JSON.parse(sessionStorage.getItem('houseNumberWuye')):null,
  houseNumberDesign: sessionStorage.getItem('houseNumberDesign')?JSON.parse(sessionStorage.getItem('houseNumberDesign')):null,
  houseAreaDesign: sessionStorage.getItem('houseAreaDesign')?JSON.parse(sessionStorage.getItem('houseAreaDesign')):null,
  houseDesingerYear: sessionStorage.getItem('houseDesingerYear')?JSON.parse(sessionStorage.getItem('houseDesingerYear')):null,
  houseAreaBuilding: sessionStorage.getItem('houseAreaBuilding')?JSON.parse(sessionStorage.getItem('houseAreaBuilding')):null
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
