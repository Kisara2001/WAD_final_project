import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchData = async () => {
        try {
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
        } catch (error) {
            console.error('Error fetching cart data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const updateQty = async (id, qty) => {
        try {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty
                })
            });

            const responseData = await response.json();

            if (responseData.success) {
                fetchData();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteCartProduct = async (id) => {
        try {
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
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const handlePayment = () => {
        // Simulate payment process
        setOrderSuccess(true);

        // Clear the cart after successful order
        setData([]);

        // Optionally, you can also trigger any context methods to refresh the cart count, etc.
        context.fetchUserAddToCart();
    };

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);

    return (
        <div className='container mx-auto'>
            {orderSuccess && (
                <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4' role="alert">
                    <strong className="font-bold">Order Successful!</strong>
                    <span className="block sm:inline"> Your order has been placed successfully.</span>
                </div>
            )}

            <div className='text-center text-lg my-3'>
                {data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((_, index) => (
                            <div key={index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img src={product.productId.productImage[0]} alt={product.productId.productName} className='w-full h-full object-scale-down mix-blend-multiply' />
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product._id)}>
                                        <MdDelete />
                                    </div>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product.productId.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product.productId.sellingPrice)}</p>
                                        <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product.productId.sellingPrice * product.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQty(product._id, product.quantity - 1)} disabled={product.quantity <= 1}>-</button>
                                        <span>{product.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQty(product._id, product.quantity + 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {loading ? (
                        <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'></div>
                    ) : (
                        <div className='h-36 bg-white'>
                            <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                <p>Total Price</p>
                                <p>{displayINRCurrency(totalPrice)}</p>
                            </div>
                            <button className='bg-blue-600 p-2 text-white w-full mt-2' onClick={handlePayment}>Payment</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;