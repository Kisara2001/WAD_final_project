import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const EditProfile = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        telephone: '',
        address: '',
        profession: '',
        profilePic: ''
    });

    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setData({
                name: user.name || '',
                telephone: user.telephone || '',
                address: user.address || '',
                profession: user.profession || '',
                profilePic: user.profilePic || ''
            });
        }
    }, [user]);

    const getInitials = (name) => {
        if (!name) return null;
        const names = name.split(' ').filter(n => n); // Filter out any empty strings from multiple spaces
        if (names.length === 1) {
            return names[0][0].toUpperCase(); // Return the first initial if only one name is provided
        } else {
            // Return the first letter of the first and second name parts
            return (names[0][0] + names[1][0]).toUpperCase();
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setData(prevState => ({
                ...prevState,
                profilePic: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(SummaryApi.editProfile.url, {
                method: SummaryApi.editProfile.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user._id,
                    ...data
                })
            });

            const result = await response.json();

            if (response.ok) {  // Check if the response is OK
                if (result.success) {
                    toast.success(result.message);
                    dispatch({ type: 'SET_USER_DETAILS', payload: result.user });
                } else {
                    toast.error(result.message || 'Failed to update profile. Please try again.');
                }
            } else {
                // If the response is not ok, log the error
                toast.error(`Error: ${result.message || 'Failed to update profile. Please try again.'}`);
                console.error("Response not ok:", result);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error("Error during profile update:", error);  // Log the error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen" style={{ backgroundColor: '#f2dec4' }}>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center mb-4">
                    <div className="relative w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold">
                        {data.profilePic ? (
                            <img src={data.profilePic} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            getInitials(data.name)
                        )}
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                        <label className="block text-sm font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold mb-1">Telephone</label>
                        <input
                            type="text"
                            name="telephone"
                            value={data.telephone}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold mb-1">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm font-semibold mb-1">Profession</label>
                        <input
                            type="text"
                            name="profession"
                            value={data.profession}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className={`w-full py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
