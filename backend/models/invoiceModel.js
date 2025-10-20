import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const clientInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const lineItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 0 }
});

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNumber: { type: String, required: true },
  currency: { type: String, required: true, default: 'INR' },
  date: { type: Date, required: true },
  paymentTerms: { type: String},
  dueDate: { type: Date, required: true },
  poNumber: { type: String},
  companyInfo: { type: companyInfoSchema, required: true },
  clientInfo: { type: clientInfoSchema, required: true },
  lineItems: { type: [lineItemSchema], required: true },
  notes: { type: String, default: '' },
  terms: { type: String, default: '' },
  discount: { type: Number, default: 0, min: 0 },
  tax: { type: Number, default: 0, min: 0 },
  shipping: { type: Number, default: 0, min: 0 },
  amountPaid: { type: Number, default: 0, min: 0 },
  balanceDue: {type: Number, default: 0, min: 0}
}, {
  timestamps: true
});


const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
