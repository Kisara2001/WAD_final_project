import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import backgroundImage from '../assest/loginbackgroundimage.jpg';  // Import the background image
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({
      ...prev,
      profilePic: imagePic
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }

    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section 
      id='signup' 
      className='min-h-screen flex items-center justify-center bg-cover bg-center' 
      style={{ backgroundImage: `url(${backgroundImage})` }}  // Apply the background image
    >
      <div className='mx-auto container p-4'>
        <div className='bg-white p-8 w-full max-w-md mx-auto rounded-xl shadow-xl bg-opacity-100'>
          <div className='w-24 h-24 mx-auto relative overflow-hidden rounded-full mb-4'>
            <div>
              <img src={data.profilePic || loginIcons} alt='login icons' className='w-full h-full object-cover'/>
            </div>
            <form>
              
            </form>
          </div>

          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='grid gap-2'>
              <label className='text-gray-700 font-semibold'>Name:</label>
              <div className='bg-gray-100 p-3 rounded-md shadow-inner'>
                <input 
                  type='text' 
                  placeholder='Enter your name' 
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent text-gray-700'/>
              </div>
            </div>

            <div className='grid gap-2'>
              <label className='text-gray-700 font-semibold'>Email:</label>
              <div className='bg-gray-100 p-3 rounded-md shadow-inner'>
                <input 
                  type='email' 
                  placeholder='Enter your email' 
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent text-gray-700'/>
              </div>
            </div>

            <div className='grid gap-2'>
              <label className='text-gray-700 font-semibold'>Password:</label>
              <div className='bg-gray-100 p-3 rounded-md shadow-inner flex items-center'>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder='Enter password'
                  value={data.password}
                  name='password' 
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent text-gray-700'/>
                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </div>
              </div>
            </div>

            <div className='grid gap-2'>
              <label className='text-gray-700 font-semibold'>Confirm Password:</label>
              <div className='bg-gray-100 p-3 rounded-md shadow-inner flex items-center'>
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder='Confirm password'
                  value={data.confirmPassword}
                  name='confirmPassword' 
                  onChange={handleOnChange}
                  required
                  className='w-full h-full outline-none bg-transparent text-gray-700'/>
                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                </div>
              </div>
            </div>

            <button className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 w-full rounded-full hover:shadow-lg transition-all duration-300 mt-6'>
              Sign Up
            </button>
          </form>

          <p className='mt-6 text-center text-gray-600'>Already have an account? <Link to={"/login"} className='text-indigo-600 hover:underline hover:text-indigo-700 font-semibold'>Login</Link></p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
