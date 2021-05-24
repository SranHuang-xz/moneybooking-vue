// import RecordItem from "@/custom";
import Clone from "@/lib/clone";
const key = 'recordList'
const model = {
    data: [] as RecordItem[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
        return this.data
    },
    save() {
        window.localStorage.setItem(key, JSON.stringify(this.data));

    },

    create(record: RecordItem) {
        const record2: RecordItem = Clone(record)
        record2.createAt = new Date();
        this.data.push(record2)
        this.save()

    }
}
export default model