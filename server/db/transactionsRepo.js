import db from "../connection/db.js";

const getTransaction = async () => {
  try {
    return await db.query("SELECT * FROM Transactions");
  } catch (err) {
    throw new Error(err);
  }
};

const addTransaction = async (customerId, transactionDate, totalAmount) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.execute(
      "INSERT INTO Transactions (customerId, transactionDate, totalAmount) VALUES (?, ?, ?)",
      [customerId, transactionDate, totalAmount]
    );
    await conn.commit();
    return result.insertId;
  } catch (err) {
    await conn.rollback();
    throw new Error(err);
  } finally {
    conn.release();
  }
};

const addTransactionDetails = async (id, items) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    for (let item of items) {
      let subtotal = item.unitPrice;
      if (item.quantity > 1) {
        subtotal *= item.quantity;
      }
      await conn.execute(
        "INSERT INTO Transactiondetails (TransactionID, ProductID, Quantity, UnitPrice, Subtotal) VALUES (?, ?, ?, ?, ?)",
        [id, item.productId, item.quantity, item.unitPrice, subtotal]
      );
    }
    await conn.commit();
    return;
  } catch (err) {
    await conn.rollback();
    throw new Error(err);
  } finally {
    conn.release();
  }
};

export default { getTransaction, addTransaction, addTransactionDetails };
