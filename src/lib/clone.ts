function Clone<x>(data: x): x {
    return JSON.parse(JSON.stringify(data))

}
export default Clone