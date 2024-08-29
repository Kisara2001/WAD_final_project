import React, { useEffect, useState } from 'react';
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className='p-4'>
        <div className='bg-white py-3 px-6 flex justify-between items-center shadow-md rounded-md mb-4'>
            <h2 className='font-bold text-xl'>All Products</h2>
            <button 
              className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-5 rounded-full' 
              onClick={() => setOpenUploadProduct(true)}
            >
              Upload Product
            </button>
        </div>

        {/** All products grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-4 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 190px)' }}>
          {
            allProduct.map((product, index) => (
              <AdminProductCard data={product} key={index + "allProduct"} fetchdata={fetchAllProduct} />
            ))
          }
        </div>

        {/** Upload product component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
          )
        }
    </div>
  );
};

export default AllProducts;
