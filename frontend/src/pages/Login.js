import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import backgroundImage from '../assest/loginbackgroundimage.jpg';  // Import the background image
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    return (
        <section 
            id='login' 
            className='min-h-screen flex items-center justify-center bg-cover bg-center' 
            style={{ backgroundImage: `url(${backgroundImage})` }} // Apply the background image
        >
            <div className='mx-auto container p-4'>
                <div className='bg-white p-8 w-full max-w-md mx-auto rounded-xl shadow-xl bg-opacity-100'>
                    <div className='w-24 h-24 mx-auto mb-4'>
                        <img src={loginIcons} alt='login icons' className='rounded-full shadow-md'/>
                    </div>

                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid gap-2'>
                            <label className='text-gray-700 font-semibold'>Email:</label>
                            <div className='bg-gray-100 p-3 rounded-md shadow-inner'>
                                <input 
                                    type='email' 
                                    placeholder='Enter your email' 
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent text-gray-700'/>
                            </div>
                        </div>

                        <div className='grid gap-2'>
                            <label className='text-gray-700 font-semibold'>Password:</label>
                            <div className='bg-gray-100 p-3 rounded-md shadow-inner flex items-center'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Enter your password'
                                    value={data.password}
                                    name='password' 
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent text-gray-700'/>
                                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowPassword((prev) => !prev)}>
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto text-sm text-gray-500 hover:underline hover:text-indigo-600'>
                                Forgot password?
                            </Link>
                        </div>

                        <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full rounded-full hover:shadow-lg transition-all duration-300 mt-6'>
                            Login
                        </button>
                    </form>

                    <p className='mt-6 text-center text-gray-600'>Don't have an account? <Link to={"/sign-up"} className='text-indigo-600 hover:underline hover:text-indigo-700 font-semibold'>Sign up</Link></p>
                </div>
            </div>
        </section>
    );
}

export default Login;
