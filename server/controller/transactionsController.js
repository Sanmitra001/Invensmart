import transactionsServices from "../services/transactionsServices.js";

async function getTransaction(req, res, next) {
  try {
    const transaction = await transactionsServices.getService();
    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
}

async function addTransaction(req, res, next) {
  try {
    await transactionsServices.addService(
      req.body.customerId,
      req.body.transactionDate,
      req.body.totalAmount,
      req.body.items
    );
    res.status(201).json({
      Created: "Transaction created successfully.",
    });
  } catch (err) {
    next(err);
  }
}

export default { getTransaction, addTransaction };
