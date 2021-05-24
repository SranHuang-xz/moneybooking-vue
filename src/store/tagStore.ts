import { createID } from "@/lib/createID";
const key = 'tagList'
const tagStore = {
    tagList: [] as tag[],
    fetchTags() {
        this.tagList = JSON.parse(window.localStorage.getItem(key) || "[]")
        return this.tagList
    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0]
    },
    createTag(name: string) {
        const names = this.tagList.map(tag => tag.name)
        if (names.indexOf(name) >= 0) {
            alert("该标签名已存在");
        }
        const id = createID().toString()
        this.tagList.push({ id, name })
        this.saveTags()
        alert("添加成功");
        return true

    },
    saveTags() {
        window.localStorage.setItem(key, JSON.stringify(this.tagList));

    },
    removeTag(id: string) {
        let index = -1
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i
                break
            }
        }
        this.tagList.splice(index, 1)
        this.saveTags()
        return true
    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(tag => tag.id)
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(tag => tag.name)
            if (names.indexOf(name) >= 0) {
                alert("该标签已存在")
                return false
            }
            else {
                const tag = this.tagList.filter(tag => tag.id === id)[0]
                tag.name = name
                this.saveTags()
                return true
            }
        }
        else {
            return false
        }
    }

}
tagStore.fetchTags()
export default tagStore