import Invoice from "../models/invoiceModel.js";

export async function handleInvoiceSave(req, res) {
    const { data } = req.body;

    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        if (!data || typeof data !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Invalid or missing invoice data'
            });
        }

        const {
            invoiceNumber,
            currency,
            date,
            paymentTerms,
            dueDate,
            poNumber,
            companyInfo,
            clientInfo,
            lineItems,
            notes,
            terms,
            discount,
            tax,
            shipping,
            amountPaid,
            balanceDue
        } = data;

        if (
            !invoiceNumber ||
            !currency ||
            !date ||
            !dueDate ||
            !companyInfo?.name ||
            !companyInfo?.address ||
            !companyInfo?.email ||
            !companyInfo?.phone ||
            !clientInfo?.name ||
            !clientInfo?.address ||
            !clientInfo?.email ||
            !clientInfo?.phone ||
            !lineItems ||
            !Array.isArray(lineItems) ||
            lineItems.length === 0
        ) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const duplicateInvoiceNumber = await Invoice.findOne({ invoiceNumber });
        if (duplicateInvoiceNumber) {
            return res.status(409).json({
                success: false,
                "error": "Invoice number already exists in the database."


            })
        }

        for (const item of lineItems) {
            if (
                !item.id ||
                !item.itemName ||
                item.quantity == null ||
                item.price == null
            ) {
                return res.status(400).json({
                    success: false,
                    error: 'Each line item must have id, itemName, quantity, and price'
                });
            }
            if (item.quantity < 0 || item.price < 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Quantity and price must be non-negative'
                });
            }
        }

        if (discount < 0 || tax < 0 || shipping < 0 || amountPaid < 0 || balanceDue < 0) {
            return res.status(400).json({
                success: false,
                error: 'Discount, tax, shipping, amountPaid and Due Balance must be non-negative'
            });
        }

        const newInvoice = new Invoice({
            userId: req.user?.id,
            invoiceNumber,
            currency,
            date: new Date(date),
            paymentTerms,
            dueDate: new Date(dueDate),
            poNumber,
            companyInfo: {
                name: companyInfo.name,
                address: companyInfo.address,
                email: companyInfo.email,
                phone: companyInfo.phone
            },
            clientInfo: {
                name: clientInfo.name,
                address: clientInfo.address,
                email: clientInfo.email,
                phone: clientInfo.phone
            },
            lineItems: lineItems.map(item => ({
                id: item.id,
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price
            })),
            notes: notes || '',
            terms: terms || '',
            discount,
            tax,
            shipping,
            amountPaid,
            balanceDue
        });

        const savedInvoice = await Invoice.create(newInvoice);

        return res.status(201).json({
            success: true,
            message: 'Invoice saved successfully',
            data: {
                'Invoice Number': savedInvoice.invoiceNumber,
                'UserId': req.user?.id
            }
        });
    } catch (error) {
        console.error('Error saving invoice:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: `Invoice number ${data.invoiceNumber} already exists`
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
            message: error.message
        });
    }
}

export async function handleGetAllInvoice(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "User ID is required",
                },
            });
        }
        const invoiceList = await Invoice.find({ userId: userId });

        if (!invoiceList || invoiceList.length === 0) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: "No Invoices found for this user",
                },
            });
        }

        const formattedInvoiceList = invoiceList.map((invoice) => ({
            InvoiceNum: invoice.invoiceNumber,
            DueDate: invoice.dueDate,
            ClientName: invoice.clientInfo.name,
            balanceDue: invoice.balanceDue || '*',
            currency: invoice.currency,
            createdAt: invoice.createdAt
        }));

        return res.status(200).json({
            success: true,
            data: {
                InvoiceList: formattedInvoiceList
            },
            message: 'Invoices Fetched Successfully'
        });
    } catch (error) {
        console.error("handleGetAllInvoices error:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
            },
            message: error.message,
        });
    }
}

export async function handleGetInvoiceByNumber(req, res) {
    try {
        const { invoiceNum } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "AUTHENTICATION_REQUIRED",
                    message: "User ID is required",
                },
            });
        }

        const invoice = await Invoice.findOne({ invoiceNumber: invoiceNum, userId });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: `Invoice #${invoiceNum} not found`,
                },
            });
        }

        const formattedInvoice = {
            invoiceNumber: invoice.invoiceNumber,
            currency: invoice.currency,
            date: invoice.date.toISOString().split('T')[0],
            paymentTerms: invoice.paymentTerms || '',
            dueDate: invoice.dueDate.toISOString().split('T')[0],
            poNumber: invoice.poNumber || '',
            companyInfo: {
                name: invoice.companyInfo.name,
                address: invoice.companyInfo.address,
                email: invoice.companyInfo.email,
                phone: invoice.companyInfo.phone,
            },
            clientInfo: {
                name: invoice.clientInfo.name,
                address: invoice.clientInfo.address,
                email: invoice.clientInfo.email,
                phone: invoice.clientInfo.phone,
            },
            lineItems: invoice.lineItems.map(item => ({
                id: item.id,
                itemName: item.itemName,
                quantity: item.quantity,
                price: item.price,
                total: item.quantity * item.price,
            })),
            notes: invoice.notes || '',
            terms: invoice.terms || '',
            discount: invoice.discount || 0,
            tax: invoice.tax || 0,
            shipping: invoice.shipping || 0,
            amountPaid: invoice.amountPaid || 0,
            balanceDue: invoice.balanceDue || 0,
        };

        return res.status(200).json({
            success: true,
            data: formattedInvoice,
            message: 'Invoice fetched successfully',
        });
    } catch (error) {
        console.error("handleGetInvoiceByNumber error:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
            },
            message: error.message,
        });
    }
}

export async function handleDeleteInvoiceByNumber(req, res) {
    try {
        const { invoiceNum } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "AUTHENTICATION_REQUIRED",
                    message: "User ID is required",
                },
            });
        }

        const invoice = await Invoice.findOne({ invoiceNumber: invoiceNum, userId });

        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "NOT_FOUND",
                    message: `Invoice #${invoiceNum} not found`,
                },
            });
        }

        await Invoice.deleteOne({ invoiceNumber: invoiceNum, userId });

        return res.status(200).json({
            success: true,
            data: { invoiceNum },
            message: `Invoice #${invoiceNum} deleted successfully`,
        });
    } catch (error) {
        console.error("handleDeleteInvoiceByNumber error:", error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
            },
            message: error.message,
        });
    }
}

export async function handleDeleteAllInvoicesByUserId(userId) {
    if (!userId) {
        throw new Error('User ID is required for deleting invoices');
    }

    try {
        const result = await Invoice.deleteMany({ userId });
        console.log(`Deleted ${result.deletedCount || 0} invoices for user ${userId}`);
        return result;
    } catch (error) {
        console.error('handleDeleteAllInvoicesByUserId error:', error);
        throw error;
    }
}