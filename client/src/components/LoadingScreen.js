import React from 'react';
import backgroundImage from '../assest/loginbackgroundimage.jpg';  // Import the background image

const LoadingScreen = () => {
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-cover bg-center z-50"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
           
        </div>
    );
};

export default LoadingScreen;
