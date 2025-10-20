// src/components/InvoiceFooter.jsx
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

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

const currencyFormats = {
    INR: { locale: 'en-IN', style: 'currency', currency: 'INR' },
    USD: { locale: 'en-US', style: 'currency', currency: 'USD' },
    EUR: { locale: 'de-DE', style: 'currency', currency: 'EUR' },
    GBP: { locale: 'en-GB', style: 'currency', currency: 'GBP' },
    JPY: { locale: 'ja-JP', style: 'currency', currency: 'JPY' },
    AUD: { locale: 'en-AU', style: 'currency', currency: 'AUD' },
    CAD: { locale: 'en-CA', style: 'currency', currency: 'CAD' },
    CHF: { locale: 'de-CH', style: 'currency', currency: 'CHF' },
    CNY: { locale: 'zh-CN', style: 'currency', currency: 'CNY' },
    SGD: { locale: 'en-SG', style: 'currency', currency: 'SGD' },
};


const InvoiceFooter = () => {
    const { register, setValue, control, formState: { errors } } = useFormContext();

    const watchedFields = useWatch({ control, name: ['lineItems', 'discount', 'tax', 'shipping', 'amountPaid', 'currency'] });

    const [lineItems, discount, tax, shipping, amountPaid, currency] = watchedFields;

    const discountNum = Number(discount) || 0;
    const taxNum = Number(tax) || 0;
    const shippingNum = Number(shipping) || 0;
    const amountPaidNum = Number(amountPaid) || 0;

    const subTotal = (lineItems || []).reduce((sum, item) => {
        return sum + (Number(item.total) || 0);
    }, 0);

    const calcDiscountAmount = (subTotal * discountNum) / 100;
    const calcTaxAmount = (subTotal * taxNum) / 100;

    const total = subTotal - calcDiscountAmount + calcTaxAmount + shippingNum;

    const balanceDue = total - amountPaidNum;

    React.useEffect(() => {
        setValue('balanceDue', Number((balanceDue || 0).toFixed(2)), {
            shouldValidate: true,
            shouldDirty: true,
        });
    }, [balanceDue, setValue]);


    const formatCurrency = (amount, currencyCode) => {
        if (!currencyCode || amount === undefined || isNaN(amount)) return '0.00';
        const format = currencyFormats[currencyCode] || currencyFormats['USD'];
        return new Intl.NumberFormat(format.locale, {
            style: format.style,
            currency: format.currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const selectedCurrency = currencyOptions.find(c => c.code === currency)?.symbol || '$';

    return (
        <div className='flex flex-col md:flex-row gap-5 align-middle justify-between items-start w-full md:px-20'>
            <div className='flex flex-col gap-y-3 w-full md:w-auto'>

                <div className='flex flex-col gap-y-2'>
                    <p className='text-sm '>Notes</p>
                    <textarea
                        {...register('notes')}
                        placeholder='Notes - any relevant information not already covered'
                        className='md:w-sm w-full min-h-[50px] max-h-[300px] resize-none overflow-hidden p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:shadow'
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p className='text-sm '>Terms</p>
                    <textarea
                        {...register('terms')}
                        placeholder='Terms and conditions - late fees, payment methods, delivery schedule'
                        className='md:w-sm w-full min-h-[50px] max-h-[300px] resize-none overflow-hidden p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:shadow'
                    />
                </div>
            </div>


            <div className='flex flex-col gap-y-2 shadow rounded p-4 max-w-sm w-full md:w-auto'>
                <div className='grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 py-1'>
                    <p className='text-sm text-gray-700'>Subtotal</p>

                    <p className='w-20 bg-transparent focus:outline-none text-left text-sm px-1 border-0'>{formatCurrency(subTotal, currency)}</p>
                </div>

                <div className='grid grid-cols-[70px_1fr] gap-y-3 gap-x-2'>
                    <p className='text-sm text-gray-700'>Discount</p>
                    <div className='border border-gray-300 rounded-lg bg-white flex flex-row items-center px-2 py-1 w-25'>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            {...register('discount', {
                                valueAsNumber: true,
                                min: { value: 0, message: 'Discount must be 0% or more.' },
                                max: { value: 100, message: 'Discount cannot exceed 100%.' }
                            })}
                            className='w-15 bg-transparent focus:outline-none text-left text-sm px-1 border-0 no-spinner'
                            placeholder='0'
                        />
                        <span className='text-sm text-gray-500 bg-transparent px-1'>%</span>
                    </div>
                    {errors.discount && <p className='text-xs text-red-500'>Error :</p>}
                    {errors.discount && <p className='text-xs text-red-500'>{errors.discount.message}</p>}
                </div>


                <div className='grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 w-25'>
                    <p className='text-sm text-gray-700'>Tax</p>
                    <div className='border border-gray-300 rounded-lg bg-white flex flex-row items-center px-2 py-1'>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            {...register('tax', {
                                valueAsNumber: true,
                                min: { value: 0, message: 'Tax must be 0% or more.' }
                            })}
                            className='w-15 bg-transparent focus:outline-none text-left text-sm px-1 border-0'
                            placeholder='0'
                        />
                        <span className='text-sm text-gray-500 bg-transparent px-1'>%</span>
                    </div>
                    {errors.tax && <p className='text-xs text-red-500'>Error :</p>}
                    {errors.tax && <p className='text-xs text-red-500'>{errors.tax.message}</p>}
                </div>


                <div className='grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 w-25'>
                    <p className='text-sm text-gray-700'>Shipping</p>
                    <div className='border border-gray-300 rounded-lg bg-white flex flex-row items-center px-2 py-1'>
                        <span className='text-sm text-gray-500 bg-transparent px-2'>{selectedCurrency}</span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register('shipping', { valueAsNumber: true, min: 0 })}
                            className='w-15 bg-transparent focus:outline-none text-left text-sm px-1 border-0 no-spinner'
                            placeholder='0'
                        />
                    </div>
                </div>


                <div className='grid grid-cols-[70px_1fr] gap-y-3 gap-x-2 py-1'>
                    <p className='text-sm text-gray-700'>Total</p>
                    <p className='w-20 bg-transparent focus:outline-none text-left text-sm px-1 border-0'>{formatCurrency(total, currency)}</p>
                </div>

                <div className='grid grid-cols-[100px_1fr] gap-y-3 gap-x-2'>
                    <p className='text-sm text-gray-700'>Amount Paid</p>
                    <div className='border border-gray-300 rounded-lg bg-white flex flex-row items-center px-2 py-1'>
                        <span className='text-sm text-gray-500 bg-transparent px-2'>{selectedCurrency}</span>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            {...register('amountPaid', { valueAsNumber: true, min: 0 })}
                            className='w-16 bg-transparent focus:outline-none text-left text-sm px-1 border-0 no-spinner'
                            placeholder='0'
                        />
                    </div>
                </div>

                <div className='grid grid-cols-[80px_1fr] gap-y-3 gap-x-2 py-1'>
                    <p className='text-sm text-gray-700'>Balance Due</p>
                    <p className='w-20 bg-transparent focus:outline-none text-left text-sm px-1 border-0'>{formatCurrency(balanceDue, currency)}</p>
                </div>
            </div>
        </div>
    );
};

export default InvoiceFooter;