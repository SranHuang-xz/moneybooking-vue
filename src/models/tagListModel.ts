import RecordItem from "@/custom";
type tag = {
    id: string
    name: string
}
type TagListModel = {
    data: tag[]
    fetch: () => tag[]
    create: (name: string) => boolean
    save: () => void
    update: (id: string, name: string) => boolean
    remove: (id: string) => boolean
}

const key = 'tagList'
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(key) || "[]")
        return this.data
    },
    save() {
        window.localStorage.setItem(key, JSON.stringify(this.data));

    },
    create(name: string) {
        const names = this.data.map(tag => tag.name)
        if (names.indexOf(name) >= 0) {
            return false
        }
        this.data.push({ id: name, name: name })
        this.save()
        return true
    },
    update(id: string, name: string) {
        const idList = this.data.map(tag => tag.id)
        console.log("ddd");

        if (idList.indexOf(id) >= 0) {
            const names = this.data.map(tag => tag.name)
            if (names.indexOf(name) >= 0) {
                alert("该标签已存在")
                return false
            }
            else {
                const tag = this.data.filter(tag => tag.id === id)[0]
                tag.name = name
                this.save()
                return true
            }

        }
        else {
            return false
        }

    },
    remove(id: string) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break
            }

        }
        this.data.slice(index, 1)
        this.save()
        return true
    }
}
export default tagListModel