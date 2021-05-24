import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from './components/Nav.vue'
import Layout from './components/Layout.vue'
import Icon from './components/Icon.vue'
import tagListModel from './models/tagListModel'
import recordListModel from './models/recordListModel'
// import alias

Vue.config.productionTip = false
Vue.component('Nav', Nav)
Vue.component('Layout', Layout)
Vue.component('Icon', Icon)

//对record
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem) => recordListModel.create(record);




//对tag
window.tagList = tagListModel.fetch()
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0]
}
window.createTag = (name: string) => {
  const success = tagListModel.create(name);
  if (success) {
    alert("添加成功");
  } else {
    alert("该标签名已存在");
  }
}
window.removeTag = (id: string) => {
  return (tagListModel.remove(id))
}
window.updateTag = (id: string, name: string) => {
  return tagListModel.update(id, name);
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
