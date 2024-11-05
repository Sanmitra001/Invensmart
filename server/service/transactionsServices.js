import transactionsRepo from "../db/transactionsRepo.js";
import AppError from "../error/AppError.js";

async function getService() {
  try {
    const [transactions] = transactionsRepo.getTransaction;
    return transactions;
  } catch (error) {
    console.log(error);
    throw new AppError("Transactions Retrive Error", 400);
  }
}

async function addService(customerId, transactionDate, totalAmount, items) {
  try {
    const resultId = transactionsRepo.addTransaction(
      customerId,
      transactionDate,
      totalAmount
    );
    transactionsRepo.addTransactionDetails(resultId, items);
    return resultId;
  } catch (error) {
    throw new AppError("Transactions Adding Error", 400);
  }
}

export default { getService, addService };
