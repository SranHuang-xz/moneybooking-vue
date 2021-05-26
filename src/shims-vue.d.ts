declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module "*.svg" {
  const content: string;
  export default content;
}
type RecordItem = {
  tag: string;
  note: string;
  type: string;
  amount: number;
  createAt?: string;
};
type tag = {
  id: string
  name: string
  icon?: "other" | string
  type: string
}
type TagListModel = {
  data: tag[]
  fetch: () => tag[]
  create: (name: string) => boolean
  save: () => void
  update: (id: string, name: string) => boolean
  remove: (id: string) => boolean
}
type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  currentTag?: tag,
  currentType: "-" | "+"
}
// interface Window {
//   store: {
//     tagList: tag[],
//     createTag: (name: string) => void,
//     removeTag: (id: string) => boolean
//     updateTag: (id: string, name: string) => boolean
//     findTag: (id: string) => tag | undefined
//     recordList: RecordItem[]
//     createRecord: (record: RecordItem) => void
//   }
// }