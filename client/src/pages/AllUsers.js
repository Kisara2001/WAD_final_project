import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4 p-4 shadow-md rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>All Users</h2>
            <div className='overflow-x-auto'>
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr className='bg-gray-800 text-white'>
                            <th className='p-3 border border-gray-700'>Sr.</th>
                            <th className='p-3 border border-gray-700'>Name</th>
                            <th className='p-3 border border-gray-700'>Email</th>
                            <th className='p-3 border border-gray-700'>Role</th>
                            <th className='p-3 border border-gray-700'>Created Date</th>
                            <th className='p-3 border border-gray-700'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUser.map((el, index) => (
                                <tr key={index} className='hover:bg-gray-100'>
                                    <td className='p-3 border border-gray-300'>{index + 1}</td>
                                    <td className='p-3 border border-gray-300'>{el?.name}</td>
                                    <td className='p-3 border border-gray-300'>{el?.email}</td>
                                    <td className='p-3 border border-gray-300'>{el?.role}</td>
                                    <td className='p-3 border border-gray-300'>{moment(el?.createdAt).format('LL')}</td>
                                    <td className='p-3 border border-gray-300'>
                                        <button
                                            className='bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-200'
                                            onClick={() => {
                                                setUpdateUserDetails(el);
                                                setOpenUpdateRole(true);
                                            }}
                                        >
                                            <MdModeEdit />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {
                openUpdateRole && (
                    <ChangeUserRole
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    );
}

export default AllUsers;
