import Customer from '../db/customerRepo'

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    next(error)
  }
};

// Get a single customer by ID
export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    next(error)}
};

// Create a new customer
export const createCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    const customerId = await Customer.createCustomer(customerData);
    res.status(201).json({ message: 'Customer created successfully', customerId });
  } catch (error) {
   next(error)
  }
};

// Update an existing customer by ID
export const updateCustomerById = async (req, res) => {
  const { id } = req.params;
  const customerData = req.body;

  try {
    const affectedRows = await Customer.updateCustomerById(id, customerData);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    next(error)
  }
};

// Delete a customer by ID
export const deleteCustomerById = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await Customer.deleteCustomerById(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).send(); // No content response
  } catch (error) {
  next(error)
  }
};