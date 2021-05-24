import Clone from '@/lib/clone'
import { createID } from '@/lib/createID'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as tag[]
  },
  mutations: {
    fetchRecords(state) {
      // const recordList = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[]
    },
    createRecord(state, record) {
      const record2: RecordItem = Clone(record)
      record2.createAt = new Date();
      state.recordList.push(record2)
      store.commit('saveRecords')
      // recordStore.saveRecords()

    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]")
    },
    createTag(state, name: string) {
      const names = state.tagList.map(tag => tag.name)
      if (names.indexOf(name) >= 0) {
        alert("该标签名已存在");
        return false
      }
      const id = createID().toString()
      state.tagList.push({ id, name })
      store.commit('saveTags')
      alert("添加成功");
      return true
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store
