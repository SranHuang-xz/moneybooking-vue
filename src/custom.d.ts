type RecordItem = {
    tag: string;
    note: string;
    type: "+" | "-";
    amount: number;
    createAt?: Date;
};

export default RecordItem