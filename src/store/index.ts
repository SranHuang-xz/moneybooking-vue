import clone from '@/lib/clone'
import Clone from '@/lib/clone'
import { createID } from '@/lib/createID'
import router from '@/router'
import dayjs from 'dayjs'
import { update } from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const defaultTagOut: tag[] = [
  { id: createID().toString(), name: "消费", icon: "money", type: "-" },
  { id: createID().toString(), name: "餐饮", icon: "food", type: "-" },
  { id: createID().toString(), name: "购物", icon: "buy", type: "-" },
  { id: createID().toString(), name: "住房", icon: "home", type: "-" },
  { id: createID().toString(), name: "交通", icon: "go", type: "-" },
  { id: createID().toString(), name: "工资", icon: "wage", type: "+" },
  { id: createID().toString(), name: "借入", icon: "borrow", type: "+" },
  { id: createID().toString(), name: "红包", icon: "redbag", type: "all" },
  { id: createID().toString(), name: "其他", icon: "other", type: "all" },
]
const defaultTagList: tag[] = [
  { id: createID().toString(), name: "消费", icon: "money", type: "-" },
  { id: createID().toString(), name: "餐饮", icon: "food", type: "-" },
  { id: createID().toString(), name: "购物", icon: "buy", type: "-" },
  { id: createID().toString(), name: "住房", icon: "home", type: "-" },
  { id: createID().toString(), name: "交通", icon: "go", type: "-" },
  { id: createID().toString(), name: "医疗", icon: "medical", type: "-" },
  { id: createID().toString(), name: "娱乐", icon: "enjoy", type: "-" },
  { id: createID().toString(), name: "借出", icon: "lend", type: "-" },
  { id: createID().toString(), name: "水电", icon: "water", type: "-" },
  { id: createID().toString(), name: "衣服", icon: "cloth", type: "-" },
  { id: createID().toString(), name: "化妆", icon: "makeup", type: "-" },
  { id: createID().toString(), name: "礼物", icon: "gift", type: "+" },
  { id: createID().toString(), name: "奖金", icon: "price", type: "+" },
  { id: createID().toString(), name: "理财", icon: "conduct", type: "+" },
  { id: createID().toString(), name: "工资", icon: "wage", type: "+" },
  { id: createID().toString(), name: "借入", icon: "borrow", type: "+" },
  { id: createID().toString(), name: "红包", icon: "redbag", type: "all" },
  { id: createID().toString(), name: "其他", icon: "other", type: "all" },
]
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    groupList: [],
    defaultTags: defaultTagList,
    currentTag: undefined,
    currentType: "-"
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[]
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = Clone(record)
      record2.createAt = record2.createAt || new Date().toISOString();
      state.recordList.push(record2)
      store.commit('saveRecords')
      store.commit('saveGroupList')
      store.commit('updateGroupList', record2)
    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    updateRecordList(state, object: { oldname: string, newname: string }) {
      const { oldname, newname } = object
      const x = state.recordList.map(r => {
        r.tag = r.tag === oldname ? newname : r.tag
      }
      )
      store.commit("saveRecords")

    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]")
      if (!state.tagList || state.tagList.length === 0) {
        state.tagList = defaultTagOut
        store.commit('saveTags')
      }
    },
    createTags(state, object: { name: string, type: string, icon: string }) {
      const names = state.tagList.map(tag => tag.name)
      const { name, type, icon } = object
      if (names.indexOf(name) >= 0) {
        alert("该标签已存在");
        return false
      }
      const id = createID().toString()
      // const icon = "other"
      state.tagList.splice(state.tagList.length, 0, { id, name, icon, type })
      store.commit('saveTags')
      alert("添加成功");
      router.back()
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
          store.commit("updateRecordList", { oldname: tag.name, newname: name })
          tag.name = name
          store.commit("saveTags")
        }
      }
    },
    fetchGroupList(state) {
      state.groupList = JSON.parse(window.localStorage.getItem("groupList") || "[]")
    },
    saveGroupList(state) {
      window.localStorage.setItem("groupList", JSON.stringify(state.groupList));
    },
    updateGroupList(state, type: string) {

      const recordList = state.recordList;
      if (recordList.length === 0) {
        return [];
      }
      const newList = clone(recordList)
        .filter((r) => r.type === type)
        .sort(
          (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
        );
      if (newList.length === 0) {
        state.groupList = []
        store.commit("saveGroupList")
        return;
      }
      const groupList: GroupList = [
        {
          title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
          items: [newList[0]],
        },
      ];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = groupList[groupList.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
          last.items.push(current);
        } else {
          groupList.push({
            title: dayjs(current.createAt).format("YYYY-MM-DD"),
            items: [current],
          });
        }
      }
      groupList.forEach((group) => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      state.groupList = groupList
      store.commit("saveGroupList")
    }
  },
  actions: {
  },
  modules: {
  }
})
export default store
