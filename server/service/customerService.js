import Customer from ('../db/customerRepo');
import Error from '../error/AppError'
// Service to get all customers
exports.getAllCustomers = async () => {
  return await Customer.getAllCustomers();
};

// Service to get a single customer by ID
exports.getCustomerById = async (id) => {
  const customer = await Customer.getCustomerById(id);
  if (!customer) {
    throw new Error('Customer not found');
  }
  return customer;
};

// Service to create a new customer
exports.createCustomer = async (customerData) => {
  const customerId = await Customer.createCustomer(customerData);
  return { message: 'Customer created successfully', customerId };
};

// Service to update a customer by ID
exports.updateCustomerById = async (id, customerData) => {
  const affectedRows = await Customer.updateCustomerById(id, customerData);
  if (affectedRows === 0) {
    throw new Error('Customer not found');
  }
  return { message: 'Customer updated successfully' };
};

// Service to delete a customer by ID
exports.deleteCustomerById = async (id) => {
  const affectedRows = await Customer.deleteCustomerById(id);
  if (affectedRows === 0) {
    throw new Error('Customer not found');
  }
  return { message: 'Customer deleted successfully' };
};