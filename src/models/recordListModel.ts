import RecordItem from "@/custom";

const key = 'recordList'
const model = {
    fetch() {
        return JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
    },
    save(data: RecordItem[]) {
        window.localStorage.setItem(key, JSON.stringify(data));

    },
    clone(data: RecordItem | RecordItem[]) {
        return JSON.parse(JSON.stringify(data))

    }
}
export default model