import express from 'express';
import { handleInvoiceSave, handleGetAllInvoice, handleGetInvoiceByNumber, handleDeleteInvoiceByNumber } from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/save', handleInvoiceSave);
router.get('/getAllInvoices', handleGetAllInvoice);
router.get('/:invoiceNum',  handleGetInvoiceByNumber);
router.delete('/:invoiceNum', handleDeleteInvoiceByNumber);

export default router;