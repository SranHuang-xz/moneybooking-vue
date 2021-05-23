let id: number = parseInt(window.localStorage.getItem('_IdMax') || "0")
function createID() {
    id += 1
    window.localStorage.setItem("_IdMax", id.toString())
    return id
}
export { createID }