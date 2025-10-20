import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleGetAllInvoices,
    handleGetInvoiceByNumber,
    clearViewError,
    clearCurrentInvoice,
    handleDeleteInvoiceByNumber
} from '../features/invoiceSlice.js';
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from '../components/InvoicePDF.jsx';

const UserInvoices = () => {
    const dispatch = useDispatch();
    const { invoices = [], loading, error, viewLoading, viewError, currentInvoice } = useSelector((state) => state.invoice);
    const [sortKey, setSortKey] = useState('createdAt'); 
    const [sortOrder, setSortOrder] = useState('asc'); 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(handleGetAllInvoices()).unwrap().catch(err => {
            console.error('Failed to fetch invoices:', err);
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentInvoice) {
            const generateAndOpenPDF = async () => {
                try {
                    const pdfDoc = pdf(<InvoicePDF formData={currentInvoice} />);
                    const blob = await pdfDoc.toBlob();
                    const blobUrl = URL.createObjectURL(blob);
                    window.open(blobUrl, '_blank');
                    setTimeout(() => {
                        URL.revokeObjectURL(blobUrl);
                        dispatch(clearCurrentInvoice());
                    }, 1000);
                } catch (err) {
                    console.error('Error generating PDF:', err);
                    dispatch(clearViewError());
                    dispatch(clearCurrentInvoice());
                    dispatch({ type: 'invoice/getInvoiceByNumber/rejected', payload: 'Failed to generate PDF' });
                }
            };
            generateAndOpenPDF();
        }
    }, [currentInvoice, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearViewError());
            dispatch(clearCurrentInvoice());
        };
    }, [dispatch]);

    const handleSortKeyChange = (event) => {
        const newSortKey = event.target.value;
        setSortKey(newSortKey);
        setCurrentPage(1); 
    };

    const handleSortOrderToggle = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setCurrentPage(1);
    };

    
    const sortedInvoices = [...invoices].sort((a, b) => {
        if (sortKey === 'createdAt') {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortKey === 'InvoiceNum') {
            return sortOrder === 'asc'
                ? a.InvoiceNum.localeCompare(b.InvoiceNum)
                : b.InvoiceNum.localeCompare(a.InvoiceNum);
        }
        if (sortKey === 'DueDate') {
            const dateA = new Date(a.DueDate);
            const dateB = new Date(b.DueDate);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        if (sortKey === 'balanceDue') {
            const valueA = a.balanceDue === '*' ? -Infinity : Number(a.balanceDue);
            const valueB = b.balanceDue === '*' ? -Infinity : Number(b.balanceDue);
            return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });

    
    const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentInvoices = sortedInvoices.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleView = (invoiceNum) => {
        dispatch(clearViewError());
        dispatch(handleGetInvoiceByNumber(invoiceNum)).unwrap().catch(err => {
            console.error('Error fetching invoice:', err);
        });
    };

    const handleDelete = (invoiceNum) => {
        dispatch(clearViewError());
        dispatch(handleDeleteInvoiceByNumber(invoiceNum)).unwrap()
            .then(() => {
                console.log(`Invoice #${invoiceNum} deleted successfully`);
            })
            .catch(err => {
                console.error('Error deleting invoice:', err);
            });
    };

    if (loading && invoices.length === 0) {
        return <div className="text-center py-10">Loading invoices...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error fetching invoices: {error}</div>;
    }

    return (
        <div className="mt-5">
            <h1 className="text-2xl font-bold mb-6">YOUR INVOICES</h1>
            <div className="mb-4 flex items-center space-x-4">
                <div>
                    <label htmlFor="sortKey" className="mr-2 text-sm font-medium text-gray-700 cursor-pointer">
                        Sort by:
                    </label>
                    <select
                        id="sortKey"
                        value={sortKey}
                        onChange={handleSortKeyChange}
                        className="border border-gray-300 rounded-md p-2 text-sm"
                    >
                        <option value="createdAt">Date of Creation</option>
                        <option value="InvoiceNum">Invoice Number</option>
                        <option value="DueDate">Due Date</option>
                        <option value="balanceDue">Due Balance</option>
                    </select>
                </div>
                <button
                    onClick={handleSortOrderToggle}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm cursor-pointer"
                >
                    {sortOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
                </button>
            </div>

            {viewError && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {viewError}
                    <button
                        onClick={() => dispatch(clearViewError())}
                        className="ml-4 text-sm text-red-900 underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {invoices.length > 0 ? (
                <>
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full table-auto divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INV</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Balance</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentInvoices.map((invoice, index) => (
                                    <tr key={invoice.InvoiceNum}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{startIndex + index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{invoice.InvoiceNum}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(invoice.DueDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.ClientName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {invoice.currency} {invoice.balanceDue}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleView(invoice.InvoiceNum)}
                                                className={`text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer ${viewLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={viewLoading}
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleDelete(invoice.InvoiceNum)}
                                                className={`text-red-600 hover:text-red-900 cursor-pointer ${viewLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={viewLoading}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-6">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                Previous
                            </button>

                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-500 text-center">No invoices found for this user.</p>
            )}
        </div>
    );
};

export default UserInvoices;
