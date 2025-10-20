// src/components/InvoiceTable.jsx
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

const InvoiceTable = () => {
    const { register, control, formState: { errors }, setValue } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'lineItems',
    });

    const watchedLineItems = useWatch({ control, name: 'lineItems', defaultValue: fields });


    const handleInputChange = (index, fieldName, value) => {

        setValue(`lineItems.${index}.${fieldName}`, parseFloat(value) || 0, { shouldValidate: true });

        if (fieldName === 'quantity' || fieldName === 'price') {
            const currentQuantity = fieldName === 'quantity' ? parseFloat(value) : watchedLineItems[index]?.quantity;
            const currentPrice = fieldName === 'price' ? parseFloat(value) : watchedLineItems[index]?.price;

            const total = (Number(currentQuantity) || 0) * (Number(currentPrice) || 0);
            setValue(`lineItems.${index}.total`, total.toFixed(2));
        }
    };


    const handleAddItem = () => {
        append({ id: Date.now().toString(), itemName: '', quantity: 0, price: 0, total: 0 });
    };


    return (
        <div className="overflow-x-auto md:mx-10">
            <table className='w-full border-separate border-spacing-y-1 rounded-2xl'>
                <thead>
                    <tr className='bg-gray-800 rounded-xl text-white text-md'>
                        <td className='px-4 py-1 font-semibold'>Item</td>
                        <td className='px-4 py-1 font-semibold'>Quantity</td>
                        <td className='px-4 py-1 font-semibold'>Price</td>
                        <td className='px-4 py-1 font-semibold'>Total</td>
                        <td className='px-4 py-1 font-semibold w-5'></td>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field, index) => (
                        <tr key={field.id} className='mx-1 group text-sm text-gray-800'>
                            <td className='p-1'>
                                <input
                                    {...register(`lineItems.${index}.itemName`, { required: 'Item name is required' })}
                                    type='text'
                                    className='w-full min-w-40 border-1 border-gray-300 px-2 py-1 rounded focus:shadow focus:outline-none focus:bg-transparent'
                                    placeholder='Item Name'
                                />
                                {errors.lineItems?.[index]?.itemName && <p className='text-red-500 text-xs'>{errors.lineItems[index].itemName.message}</p>}
                            </td>
                            {/* Quantity Input */}
                            <td className='p-1 w-20'>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    {...register(`lineItems.${index}.quantity`, {
                                        required: 'Quantity is required',
                                        min: { value: 1, message: 'Quantity must be at least 1' },
                                        validate: value => Number(value) > 0 || 'Quantity must be greater than 0'
                                    })}
                                    className='w-full border-1 border-gray-300 px-2 py-1 rounded focus:shadow focus:outline-none bg-transparent'
                                    placeholder='0'
                                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                />
                                {errors.lineItems?.[index]?.quantity && <p className='text-red-500 text-xs'>{errors.lineItems[index].quantity.message}</p>}
                            </td>
                            {/* Price Input */}
                            <td className='p-1 w-20'>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    {...register(`lineItems.${index}.price`, {
                                        required: 'Price is required',
                                        min: { value: 0.01, message: 'Price must be at least 0.01' },
                                        validate: value => Number(value) > 0 || 'Price must be greater than 0'
                                    })}
                                    className='w-full border-1 border-gray-300 px-2 py-1 rounded focus:shadow focus:outline-none bg-transparent'
                                    placeholder='0.00'
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                />
                                {errors.lineItems?.[index]?.price && <p className='text-red-500 text-xs'>{errors.lineItems[index].price.message}</p>}
                            </td>
                            {/* Total Display */}
                            <td className='p-1 px-5 text-gray-700 w-20'>
                                {watchedLineItems[index]?.total || '0.00'}
                            </td>
                            <td className="px-1 py-1 w-5 text-center">
                                <button
                                    type="button"
                                    className={`md:hidden group-hover:inline-block text-red-500 hover:text-red-700 transition duration-150 ease-in-out ${fields.length === 1 ? 'opacity-40 cursor-not-allowed' : ''
                                        }`}
                                    onClick={() => {
                                        if (fields.length > 1) {
                                            remove(index);
                                        }
                                    }}
                                    disabled={fields.length === 1}
                                >
                                    <RxCross2 />
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={handleAddItem} className='px-2 py-1 my-4 mx-2 text-gray-800 ring-1 ring-gray-800 rounded-md cursor-pointer hover:bg-gray-800 hover:text-white transition-colors duration-150 ease-in-out text-sm'>
                + AddItem
            </button>
        </div>
    );
};

export default InvoiceTable;