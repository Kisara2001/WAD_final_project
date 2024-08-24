import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ForgotPassowrd = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(SummaryApi.forgotPassword.url, {
            method: SummaryApi.forgotPassword.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            navigate('/'); // Redirect to home or any other page
        } else {
            toast.error(data.message);
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 w-full max-w-md mx-auto rounded-xl shadow-xl'>
                <h2 className='text-2xl font-bold text-center mb-4'>Forgot Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='grid gap-2'>
                        <label className='text-gray-700 font-semibold'>Email:</label>
                        <input 
                            type='email' 
                            placeholder='Enter your email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-3 rounded-md bg-gray-100 text-gray-700 outline-none'/>
                    </div>
                    <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full rounded-full hover:shadow-lg transition-all duration-300'>
                        Send Reset Link
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ForgotPassowrd;
