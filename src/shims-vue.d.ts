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
  type: "+" | "-";
  amount: number;
  createAt?: Date;
};
