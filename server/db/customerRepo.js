import pool from '../connection/db';

// Get all customers
const getAllCustomers = async () => {
  const [customers] = await pool.query('SELECT * FROM Customers');
  return customers;
};

// Get a single customer by ID
const getCustomerById = async (id) => {
  const [customer] = await pool.query('SELECT * FROM Customers WHERE CustomerID = ?', [id]);
  return customer[0];
};

// Create a new customer
const createCustomer = async (customerData) => {
  const { customerName, email, phone, address, city, state, zipCode, country } = customerData;
  const result = await pool.query(
    'INSERT INTO Customers (CustomerName, Email, Phone, Address, City, State, ZipCode, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [customerName, email, phone, address, city, state, zipCode, country]
  );
  return result[0].insertId;  // Return the new customer ID
};

// Update a customer by ID
const updateCustomerById = async (id, customerData) => {
  const { customerName, email, phone, address, city, state, zipCode, country } = customerData;
  const result = await pool.query(
    'UPDATE Customers SET CustomerName = ?, Email = ?, Phone = ?, Address = ?, City = ?, State = ?, ZipCode = ?, Country = ? WHERE CustomerID = ?',
    [customerName, email, phone, address, city, state, zipCode, country, id]
  );
  return result[0].affectedRows; // Return number of affected rows
};

// Delete a customer by ID
const deleteCustomerById = async (id) => {
  const result = await pool.query('DELETE FROM Customers WHERE CustomerID = ?', [id]);
  return result[0].affectedRows; // Return number of affected rows
};

export default {getAllCustomers, getCustomerById, createCustomer, updateCustomerById,deleteCustomerById}