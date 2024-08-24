import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

            <aside className='bg-gray-800 text-white min-h-full w-full max-w-xs shadow-lg'>
                <div className='h-40 flex justify-center items-center flex-col border-b border-gray-700'>
                    <div className='text-5xl cursor-pointer relative flex justify-center mb-2'>
                        {user?.profilePic ? (
                            <img src={user?.profilePic} className='w-20 h-20 rounded-full border-4 border-gray-600 object-cover' alt={user?.name} />
                        ) : (
                            <FaRegCircleUser className='text-white' />
                        )}
                    </div>
                    <p className='capitalize text-lg font-semibold'>{user?.name}</p>
                    <p className='text-sm text-gray-400'>{user?.role}</p>
                </div>

                {/*** Navigation ***/}       
                <div className='py-4'>
                    <nav className='grid gap-2'>
                        <Link to={"all-users"} className='px-4 py-2 hover:bg-gray-700 rounded flex items-center'>
                            <span>All Users</span>
                        </Link>
                        <Link to={"all-products"} className='px-4 py-2 hover:bg-gray-700 rounded flex items-center'>
                            <span>All Products</span>
                        </Link>
                    </nav>
                </div>  
            </aside>

            <main className='w-full h-full p-6 bg-gray-100'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;
