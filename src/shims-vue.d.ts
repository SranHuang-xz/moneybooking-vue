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
type GroupList = { title: string; total?: number; items: RecordItem[] }[];
type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  defaultTags: tag[],
  groupList: GroupList
  currentTag?: tag,
  currentType: "-" | "+"
}
declare module 'lodash'
