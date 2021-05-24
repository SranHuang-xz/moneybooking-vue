import recordListModel from "@/models/recordListModel";
import tagListModel from "@/models/tagListModel";

const store = {
    recordList: recordListModel.fetch(),
    createRecord: (record: RecordItem) => recordListModel.create(record),

    //对tag
    tagList: tagListModel.fetch(),
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag: (name: string) => {
        const success = tagListModel.create(name);
        if (success) {
            alert("添加成功");
        } else {
            alert("该标签名已存在");
        }
    },
    removeTag: (id: string) => {
        return (tagListModel.remove(id))
    },
    updateTag: (id: string, name: string) => {
        return tagListModel.update(id, name);
    }

}
export default store