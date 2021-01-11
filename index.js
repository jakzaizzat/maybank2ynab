const sample = require("./sample.json");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "out.csv",
  header: [
    { id: "date", title: "Date" },
    { id: "payee", title: "Payee" },
    { id: "memo", title: "Memo" },
    { id: "outflow", title: "Outflow" },
    { id: "inflow", title: "Inflow" },
  ],
});

const transactions = sample.transaction;
console.log(transactions);

const data = [];
transactions.forEach((transaction) => {
  let obj = {
    date: transaction.postingDate,
    payee: null,
    memo: transaction.description,
    outflow: null,
    inflow: null,
  };

  if (transaction.amount.includes("-")) {
    obj.outflow = transaction.amount.replace("-", "");
  } else {
    obj.inflow = transaction.amount.replace("-", "");
  }

  data.push(obj);
});

csvWriter
  .writeRecords(data)
  .then(() => console.log("The CSV file was written successfully"));
