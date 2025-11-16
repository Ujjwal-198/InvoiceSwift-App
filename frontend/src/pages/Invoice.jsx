import React, { useState, useRef } from 'react';
import { useForm, FormProvider as RHFFormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FaDownload, FaCloudDownloadAlt } from "react-icons/fa";
import { InvoiceHeader1, InvoiceTable, InvoiceFooter, InvoicePDF } from '../components/index.js';
import { handleSaveInvoice } from '../features/invoiceSlice.js';
import { extractErrorMessage } from '../utils/extractError.js';

import { pdf } from '@react-pdf/renderer';


const Invoice = () => {
    const defaultValues = {
        invoiceNumber: '',
        currency: 'INR',
        date: new Date().toISOString().split('T')[0],
        paymentTerms: '',
        dueDate: '',
        poNumber: '',
        companyInfo: { name: '', address: '', email: '', phone: '' },
        clientInfo: { name: '', address: '', email: '', phone: '' },
        lineItems: [{ id: Date.now().toString(), itemName: '', quantity: 0, price: 0 }],
        notes: '',
        terms: '',
        discount: 0,
        tax: 0,
        shipping: 0,
        amountPaid: 0,
        balanceDue: 0,
    };

    const dispatch = useDispatch();
    const { authenticated } = useSelector((state) => state.user);
    const { loading } = useSelector((s) => s.invoice);

    const [formData, setFormData] = useState(null);
    const [viewError, setViewError] = useState(null);
    const [pdfData, setPdfData] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleDownloadInvoice = async () => {
        if (!canDownload) {
            alert("⚠️ Please fill invoice details before downloading the PDF.");
            return;
        }

        try {
            setIsGenerating(true);
            const snapshot = JSON.parse(JSON.stringify(formMethods.getValues()));
            console.log("🔍 INVOICE PAGE - Form Values Snapshot:", snapshot);
            console.log("🔍 INVOICE PAGE - Discount:", snapshot.discount);
            console.log("🔍 INVOICE PAGE - Tax:", snapshot.tax);
            console.log("🔍 INVOICE PAGE - Subtotal:", snapshot.subtotal);
            console.log("🔍 INVOICE PAGE - Total:", snapshot.total);
            setPdfData(snapshot);

            await new Promise((resolve) => setTimeout(resolve, 200));
            const pdfBlob = await pdf(<InvoicePDF formData={snapshot} />).toBlob();

            const url = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `Invoice_${snapshot.invoiceNumber || "unnamed"}.pdf`;
            link.click();
            URL.revokeObjectURL(url);

            alert("Invoice Downloaded Successfully");
            formMethods.reset(defaultValues);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate invoice PDF.");
        } finally {
            setIsGenerating(false);
        }
    };

    const printRef = useRef(null);

    const formMethods = useForm({
        defaultValues,
        mode: 'onChange',
    });

    const values = formMethods.watch();

    const canDownload = (() => {
        const hasInvoiceNumber = values.invoiceNumber?.trim() !== "";
        const hasCompanyName = values.companyInfo?.name?.trim() !== "";
        const hasClientName = values.clientInfo?.name?.trim() !== "";

        const hasValidItem = values.lineItems?.some(
            (item) =>
                item.itemName?.trim() !== "" &&
                (Number(item.quantity) > 0 || Number(item.price) > 0)
        );

        return hasInvoiceNumber && hasCompanyName && hasClientName && hasValidItem;
    })();


    const onSubmit = async (data) => {
        setFormData(data);
        setViewError(null);
        try {
            await dispatch(handleSaveInvoice(data)).unwrap();
            formMethods.reset(defaultValues);
            alert("Invoice saved successfully! You can access it in the 'My Invoices/profile' section.");
        } catch (err) {
            const msg = extractErrorMessage(err);
            setViewError(msg);
            console.error('Save Invoice Error:', msg);
        }
    };

    return (
        <RHFFormProvider {...formMethods}>
            <div className="flex flex-col items-center w-full py-10 px-2 sm:px-4 md:px-8 lg:px-10">
                <form
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                    className="w-full max-w-5xl bg-white rounded-xl shadow-sm p-4 sm:p-6 md:p-8"
                >
                    <div ref={printRef} className="w-full">
                        {/* Header */}
                        <div className="w-full overflow-x-auto">
                            <InvoiceHeader1 />
                        </div>

                        {/* Table Section */}
                        <div className="w-full my-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 rounded-lg">
                            <InvoiceTable />
                        </div>

                        <hr className="my-10 border-gray-300" />

                        {/* Footer Section */}
                        <div className="w-full">
                            <InvoiceFooter />
                        </div>

                        <hr className="my-10 border-gray-300" />
                    </div>

                    {viewError && (
                        <p className="text-sm text-red-500 mt-2" role="alert">
                            {viewError}
                        </p>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                        {/* Save Invoice Button */}
                        <button
                            type="submit"
                            disabled={!authenticated}
                            title={!authenticated ? 'Please Login/Signup to save Invoice' : ''}
                            className={`flex flex-row items-center justify-center gap-2 px-5 py-2 rounded-full text-white font-medium transition 
                                ${authenticated
                                    ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                                    : 'bg-blue-200 cursor-not-allowed'
                                }`}
                        >
                            {loading ? 'Saving...' : 'Save Invoice'}
                            <FaCloudDownloadAlt className="text-lg" />
                        </button>

                        <button
                            onClick={() => handleDownloadInvoice()}
                            disabled={isGenerating}
                            className="flex flex-row items-center justify-center gap-2 px-5 py-2 rounded-full text-white font-medium transition bg-gray-800 hover:bg-gray-900 cursor-pointer"
                        >
                            {isGenerating ? "Preparing PDF..." : "Download Invoice"}
                            <FaDownload className="text-lg" />
                        </button>
                    </div>
                </form>
            </div>
        </RHFFormProvider>
    );
};

export default Invoice;
