import React, { useContext, useState } from 'react';
import Logo from './Logo';
import { GrSearch } from "react-icons/gr";
import { FaUserCircle, FaShoppingCart, FaTools } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  console.log(user); 
  
  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    });

    const data = await fetchData.json();

    if(data.success){
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if(data.error){
      toast.error(data.message);
    }

  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if(value){
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

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


  return (
    <header className='h-16 shadow-md bg-orange-200 fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 bg-white'>
          <input 
            type='text' 
            placeholder='search product here...' 
            className='w-full outline-none bg-white' 
            onChange={handleSearch} 
            value={search} 
          />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <GrSearch />
          </div>
        </div>

        <div className='flex items-center gap-6'>
          <div className='relative flex items-center'>
            {user?._id && (
              <>
                {/* Profile Icon or Initials for navigating to the Edit Profile screen */}
                <div className='text-3xl cursor-pointer relative flex justify-center items-center'>
                  {user?.name ? (
                    <div 
                    onClick={() => navigate("/edit-profile")} 
                    className='w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-lg font-medium'
                >
                    {getInitials(user.name)}
                </div>
                  ) : (
                    <FaUserCircle onClick={() => navigate("/edit-profile")} />
                  )}
                </div>

                {/* Icon for Admin Panel */}
                {user?.role === ROLE.ADMIN && (
                  <div className='cursor-pointer ml-4'>
                    <FaTools 
                      onClick={() => navigate("/admin-panel/all-products")} 
                      className='text-2xl' 
                      title="Admin Panel"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className='text-2xl relative'>
              <span><FaShoppingCart/></span>

              <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                <p className='text-sm'>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id  ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
