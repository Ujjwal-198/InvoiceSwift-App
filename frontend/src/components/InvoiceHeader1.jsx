// src/components/InvoiceHeader1.jsx
import React from 'react';
import { useFormContext } from 'react-hook-form';


const currencyOptions = [
    { code: 'INR', symbol: '₹' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
    { code: 'AUD', symbol: 'A$' },
    { code: 'CAD', symbol: 'CA$' },
    { code: 'CHF', symbol: 'Fr' },
    { code: 'CNY', symbol: '¥' },
    { code: 'SGD', symbol: 'S$' },
];

const InvoiceHeader1 = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="flex flex-col align-middle justify-between gap-y-10 w-full">
            <div className="flex flex-col align-middle items-start justify-between md:px-20 gap-y-8 w-full md:flex-row md:items-center">
                {/* Heading, Invoice number and currency option */}
                <div className="flex flex-col gap-y-2 md:w-40 w-50">
                    <h1 className="text-3xl font-semibold py-2">INVOICE</h1>
                    <div className="border border-gray-400 flex align-center justify-center rounded-lg">
                        <span className="text-center text-gray-600 px-2 py-1 rounded-lg">#</span>
                        <input
                            type="text"
                            className="w-full text-right px-3 py-1 no-spinner focus:outline-none active:bg-transparent focus:bg-transparent focus:shadow"
                            {...register('invoiceNumber', { required: 'Invoice Number is required' })}
                            placeholder="INV-XXX"
                        />
                    </div>
                    {errors.invoiceNumber && <p className="text-red-500 text-xs">{errors.invoiceNumber.message}</p>}
                    <div className="flex flex-col gap-y-1">
                        <select
                            {...register('currency', { required: 'Currency is required' })}
                            className="w-full md:w-40 px-4 rounded-lg border border-gray-300 py-1 text-sm text-gray-700 bg-gray-50 cursor-pointer focus:outline-none focus:border-blue-500"
                        >
                            <option value="" disabled>
                                Select Currency
                            </option>
                            {currencyOptions.map((currency, index) => (
                                <option className="text-sm" key={index} value={currency.code}>
                                    {`${currency.code} ${currency.symbol}`}
                                </option>
                            ))}
                        </select>
                        {errors.currency && <p className="text-xs text-red-500">{errors.currency.message}</p>}
                    </div>
                </div>
                {/* Heading, Invoice number and currency option ends here */}
                {/* Header Form */}
                <div className="flex flex-col md:p-0 md:shadow-none gap-y-2 p-5 shadow rounded w-80">
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Date</p>
                        <input
                            type="date"
                            {...register('date', { required: 'Date is Required' })}
                            className="border py-1 border-gray-300 focus:outline-none rounded px-2 focus:shadow w-full text-sm placeholder-gray-500"
                        />
                        {errors.date && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Payment Terms</p>
                        <input
                            placeholder='(Optional)'
                            {...register('paymentTerms')}
                            className="border py-1 border-gray-300 focus:outline-none rounded px-2 focus:shadow text-sm placeholder-gray-500"
                        />
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Due Date</p>
                        <input
                            type="date"
                            {...register('dueDate', { required: 'Due Date is Required' })}
                            className="border py-1 border-gray-300 focus:outline-none rounded px-2 focus:shadow w-full text-sm placeholder-gray-500"
                        />
                        {errors.dueDate && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.dueDate && <p className="text-xs text-red-500">{errors.dueDate.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">PO Number</p>
                        <input
                            placeholder='(Optional)'
                            type="text"
                            maxLength={10}
                            {...register('poNumber')}
                            className="border py-1 border-gray-300 focus:outline-none rounded px-2 focus:shadow text-sm placeholder-gray-500"
                        />
                    </div>
                </div>
                {/* Header Form Ends here */}
            </div>
            {/* Info Form */}
            <div className="flex md:flex-row flex-col gap-8 align-middle justify-around w-full">
                {/* Your Company Info */}
                <div className="flex flex-col gap-y-2 shadow rounded p-5 md:w-auto w-80">
                    <h1 className="text-lg font-semibold pb-3">Issued By</h1>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Company Name</p>
                        <input
                            {...register('companyInfo.name', { required: 'Company name is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.companyInfo?.name && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.companyInfo?.name && <p className="text-red-500 text-xs">{errors.companyInfo.name.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Address</p>
                        <input
                            {...register('companyInfo.address', { required: 'Address is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.companyInfo?.address && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.companyInfo?.address && <p className="text-red-500 text-xs">{errors.companyInfo.address.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Email</p>
                        <input
                            {...register('companyInfo.email', { required: 'Email is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.companyInfo?.email && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.companyInfo?.email && <p className="text-red-500 text-xs">{errors.companyInfo.email.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Phone</p>
                        <input
                            {...register('companyInfo.phone', { required: 'Phone is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.companyInfo?.phone && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.companyInfo?.phone && <p className="text-red-500 text-xs">{errors.companyInfo.phone.message}</p>}
                    </div>
                </div>
                {/* Your Company Info ends here */}
                {/* Client info */}
                <div className="flex flex-col gap-y-2 shadow rounded p-5 md:w-auto w-80">
                    <h1 className="text-lg font-semibold pb-3">Issued To</h1>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Name</p>
                        <input
                            {...register('clientInfo.name', { required: 'Client name is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.clientInfo?.name && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.clientInfo?.name && <p className="text-red-500 text-xs">{errors.clientInfo.name.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Address</p>
                        <input
                            {...register('clientInfo.address', { required: 'Address is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.clientInfo?.address && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.clientInfo?.address && <p className="text-red-500 text-xs">{errors.clientInfo.address.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Email</p>
                        <input
                            {...register('clientInfo.email', { required: 'Email is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.clientInfo?.email && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.clientInfo?.email && <p className="text-red-500 text-xs">{errors.clientInfo.email.message}</p>}
                    </div>
                    <div className="flex flex-col md:grid md:grid-cols-[100px_1fr] gap-x-2 gap-y-1">
                        <p className="text-sm text-gray-700">Phone</p>
                        <input
                            {...register('clientInfo.phone', { required: 'Phone is required' })}
                            className="border border-gray-300 focus:outline-none rounded-lg px-2 py-1 focus:shadow text-sm"
                        />
                        {errors.clientInfo?.phone && <p className="text-red-500 text-xs hidden md:inline">Error :</p>}
                        {errors.clientInfo?.phone && <p className="text-red-500 text-xs">{errors.clientInfo.phone.message}</p>}
                    </div>
                </div>
                {/* Client info ends here */}
            </div>
            {/* Info Form ends here */}
        </div>
    );
};

export default InvoiceHeader1;