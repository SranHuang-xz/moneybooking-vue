import Clone from '@/lib/clone'
import { createID } from '@/lib/createID'
import router from '@/router'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const defaultTagOut: tag[] = [
  { id: createID().toString(), name: "消费", icon: "money", type: "-" },
  { id: createID().toString(), name: "餐饮", icon: "food", type: "-" },
  { id: createID().toString(), name: "购物", icon: "buy", type: "-" },
  { id: createID().toString(), name: "住房", icon: "home", type: "-" },
  { id: createID().toString(), name: "交通", icon: "go", type: "-" },
  { id: createID().toString(), name: "医疗", icon: "medical", type: "-" },
  { id: createID().toString(), name: "娱乐", icon: "enjoy", type: "-" },
  { id: createID().toString(), name: "借出", icon: "lend", type: "-" },
  { id: createID().toString(), name: "工资", icon: "wage", type: "+" },
  { id: createID().toString(), name: "借入", icon: "borrow", type: "+" },
  { id: createID().toString(), name: "红包", icon: "redbag", type: "all" },
  { id: createID().toString(), name: "其他", icon: "other", type: "all" },
  { id: createID().toString(), name: "添加", icon: "add", type: "all" }
]

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    currentType: "-"
  } as RootState,
  mutations: {
    fetchRecords(state) {
      // const recordList = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[]
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = Clone(record)
      record2.createAt = new Date().toISOString();
      state.recordList.push(record2)
      store.commit('saveRecords')
      // recordStore.saveRecords()

    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]")
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = defaultTagOut
        store.commit('saveTags')
      }
    },
    createTags(state, object: { name: string, type: string }) {
      alert("wytjl")
      const names = state.tagList.map(tag => tag.name)
      const { name, type } = object
      if (names.indexOf(name) >= 0) {
        alert("该标签名已存在");
        return false
      }
      const id = createID().toString()
      const icon = "other"
      state.tagList.splice(state.tagList.length - 1, 0, { id, name, icon, type })
      store.commit('saveTags')
      alert("添加成功");
      return true
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0]

    },
    removeTag(state, id: string) {
      let index = -1
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i
          break
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1)
        store.commit("saveTags")
        alert("删除成功")
        router.back()
      }
      else {
        alert("删除失败")
      }


    },
    updateTag(state, object: { id: string, name: string }) {
      const { id, name } = object
      const idList = state.tagList.map(tag => tag.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(tag => tag.name)
        if (names.indexOf(name) >= 0) {
          alert("该标签已存在")
        }
        else {
          const tag = state.tagList.filter(tag => tag.id === id)[0]
          tag.name = name
          store.commit("saveTags")
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
