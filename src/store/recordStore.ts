import Clone from "@/lib/clone";
const key = 'recordList'
// let data: RecordItem[] | undefined = undefined
const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(key) || "[]") as RecordItem[]
        return this.recordList
    },
    saveRecords() {
        window.localStorage.setItem(key, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2: RecordItem = Clone(record)
        record2.createAt = new Date().toISOString();
        this.recordList && this.recordList.push(record2)
        recordStore.saveRecords()

    }

}
recordStore.fetchRecords()

export default recordStore