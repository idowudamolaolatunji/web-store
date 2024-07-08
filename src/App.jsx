import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';

import './index.css';

// AUTH PAGES
const HomePage = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const OtpVerification = lazy(() => import('./pages/auth/OtpVerification'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// ERROR PAGES 
const ErrorPage = lazy(() => import('./pages/error'));
const ManyRequest = lazy(() => import('./pages/error/ManyRequest'));

// AGREEMENT PAGES
const TermsOfUse = lazy(() => import('./pages/agreements/TermsOfUse'));
const PrivacyPolicy = lazy(() => import('./pages/agreements/PrivacyPolicy'));
const RefundPolicy = lazy(() => import('./pages/agreements/RefundPolicy'));

// CONTACTS AND INFO PAGES
const Contact = lazy(() => import('./pages/contactsAndInfo/Contact'));
const About = lazy(() => import('./pages/contactsAndInfo/About'));
const Faq = lazy(() => import('./pages/contactsAndInfo/Faq'));

// PRODUCT PAGES
const ProductPage = lazy(() => import('./pages/product'));
const CollecttionPage = lazy(() => import('./pages/collections'));
const DesignItemPage = lazy(() => import('./pages/designItem'));
const WishlistPage = lazy(() => import('./pages/wishlist'));
const FavoriteListPage = lazy(() => import('./pages/favoriteList'));
const CartPage = lazy(() => import('./pages/cart'));
const OrderTrackingPage = lazy(() => import('./pages/tracking'));
const CheckoutPage = lazy(() => import('./pages/checkout'));

// USER PAGES
const Dashboard = lazy(() => import('./pages/dashboard'));

// BLOG PAGES
const BlogPage = lazy(() => import('./pages/blog'));



function App() {
    return (

        <Suspense fallback={<div></div>}>
            <BrowserRouter>
                <Routes>

                    {/* PROTECTED ROUTES */}
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                        <Route path="/checkout" element={<CheckoutPage />}></Route>
                    </Route>

                    {/* UNPROTECTED ROUTES */}
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/otp-verification" element={<OtpVerification />}></Route>
                    <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                    <Route path="/reset-password" element={<ResetPassword />}></Route>

                    <Route path="/product/:slug" element={<ProductPage />}></Route>
                    <Route path="/collections/:slug" element={<CollecttionPage />}></Route>
                    <Route path="/blogs" element={<BlogPage />}></Route>
                    <Route path="/design-item" element={<DesignItemPage />}></Route>
                    <Route path="/wish-items" element={<WishlistPage />}></Route>
                    <Route path="/favorite-items" element={<FavoriteListPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/tracking-order" element={<OrderTrackingPage />}></Route>
                    
                    <Route path="/about-us" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/faq" element={<Faq />}></Route>


                    <Route path="/terms-of-use" element={<TermsOfUse />}></Route>
                    <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
                    <Route path="/refund-policy" element={<RefundPolicy />}></Route>


                    {/* ERROR ROUTES */}
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/error-too-many-request" element={<ManyRequest />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
        
    )
}

export default App
