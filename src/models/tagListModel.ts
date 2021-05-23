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
    }
}
export default tagListModel