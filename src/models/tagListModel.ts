import RecordItem from "@/custom";
type TagListModel = {
    data: string[]
    fetch: () => string[]
    create: (name: string) => boolean
    save: () => void
}

const key = 'tagList'
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        return JSON.parse(window.localStorage.getItem(key) || "[]")
    },
    save() {
        window.localStorage.setItem(key, JSON.stringify(this.data));

    },
    create(name: string) {
        if (this.data.indexOf(name) >= 0) {
            return false
        }
        this.data.push(name)
        this.save()
        return true
    }
}
export default tagListModel