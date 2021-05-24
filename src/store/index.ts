import Clone from '@/lib/clone'
import Vue from 'vue'
import Vuex from 'vuex'

const key = 'recordList'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state) {
      // const recordList = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
      state.recordList = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
    },
    createRecord(state, record) {
      const record2: RecordItem = Clone(record)
      record2.createAt = new Date();
      state.recordList.push(record2)
      store.commit('saveRecords')
      // recordStore.saveRecords()

    },
    saveRecords(state) {
      window.localStorage.setItem(key, JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store
