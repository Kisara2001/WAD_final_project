import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayLKRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();

        if (responseData.success) {
            setData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
        }
    };

    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        });

        const responseData = await response.json();

        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto p-6'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No Data</p>
                    )
                }
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-10 lg:justify-between'>
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded-lg shadow-md'>
                                </div>
                            ))
                        ) : (
                            data.map((product, index) => (
                                <div key={product?._id + "Add To Cart Product"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded-lg shadow-lg grid grid-cols-[128px,1fr]'>
                                    <div className='w-32 h-32 bg-slate-200'>
                                        <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product?.productId?.productName} />
                                    </div>
                                    <div className='px-4 py-2 relative'>
                                        <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>
                                        <h2 className='text-lg lg:text-xl font-bold text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-red-600 font-medium text-lg'>{displayLKRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600 font-semibold text-lg'>{displayLKRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                        <div className='flex items-center gap-3 mt-1'>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => decraseQty(product?._id, product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-full' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>

                <div className='mt-5 lg:mt-0 w-full max-w-sm sticky top-4'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded-lg shadow-md'>
                            </div>
                        ) : (
                            <div className='h-36 bg-white rounded-lg shadow-lg'>
                                <h2 className='text-white bg-red-600 px-4 py-2 rounded-t-lg'>Summary</h2>
                                <div className='px-4 py-2'>
                                    <div className='flex items-center justify-between gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price</p>
                                        <p>{displayLKRCurrency(totalPrice)}</p>
                                    </div>

                                    <button className='transition duration-200 ease-in-out transform hover:scale-105 bg-blue-600 p-2 text-white w-full mt-2 rounded-b-lg shadow-md'>Payment</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Cart;
