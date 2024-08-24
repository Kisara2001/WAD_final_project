import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useParams(); // Retrieve the token from the URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const response = await fetch(`${SummaryApi.resetPassword.url}/${token}`, {
            method: SummaryApi.resetPassword.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            navigate('/login'); // Redirect to login page
        } else {
            toast.error(data.message);
        }
    };

    return (
        <section className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 w-full max-w-md mx-auto rounded-xl shadow-xl'>
                <h2 className='text-2xl font-bold text-center mb-4'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='grid gap-2'>
                        <label className='text-gray-700 font-semibold'>New Password:</label>
                        <input 
                            type='password' 
                            placeholder='Enter new password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-3 rounded-md bg-gray-100 text-gray-700 outline-none'/>
                    </div>
                    <div className='grid gap-2'>
                        <label className='text-gray-700 font-semibold'>Confirm Password:</label>
                        <input 
                            type='password' 
                            placeholder='Confirm new password' 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full p-3 rounded-md bg-gray-100 text-gray-700 outline-none'/>
                    </div>
                    <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full rounded-full hover:shadow-lg transition-all duration-300'>
                        Reset Password
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ResetPassword;
