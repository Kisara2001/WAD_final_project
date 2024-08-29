const serverDomin = "http://localhost:8080";

const SummaryApi = {
    signUP: {
        url: `${serverDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${serverDomin}/api/signin`,
        method: "post"
    },
    forgotPassword: {
        url: `${serverDomin}/api/forgot-password`,
        method: 'POST'
    },
    resetPassword: {
        url: `${serverDomin}/api/reset-password`,
        method: 'POST'
    },
    current_user: {
        url: `${serverDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${serverDomin}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${serverDomin}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${serverDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${serverDomin}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${serverDomin}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${serverDomin}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${serverDomin}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${serverDomin}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${serverDomin}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${serverDomin}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${serverDomin}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${serverDomin}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${serverDomin}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${serverDomin}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${serverDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${serverDomin}/api/filter-product`,
        method: 'post'
    },
    // Added editProfile API endpoint
    editProfile: {
        url: `${serverDomin}/api/edit-profile`,
        method: 'post'
    }
};

export default SummaryApi;
