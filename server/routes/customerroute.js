import express from ('express');
import{
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomerById,
  deleteCustomerById
} from '../controller/customercontroller';
import { authenticate,authorization } from ('../middleware/auth');

exports.router = express.Router();

// Routes with middleware applied
router.get('/', authenticate, getAllCustomers);            // All authenticated users
router.get('/:id', authenticate, getCustomerById);         // All authenticated users
router.post('/', authenticate, createCustomer);            // All authenticated users
router.put('/:id', authenticate, updateCustomerById);      // All authenticated users
router.delete('/:id', authenticate, authorization('Admin'), deleteCustomerById); // Only Admins
