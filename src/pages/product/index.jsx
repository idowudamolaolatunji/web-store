import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductItem from './components/ProductItem';

import MainSpinner from '../../ui\'s/Spinner/MainSpinner'

import './style.css';
import { useDataContext } from '../../contexts/DataContext';
import { useParams } from 'react-router-dom';
import InternetError from '../error/InternetError';

function index() {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');
    const { getRequest } = useDataContext();

    const { slug } = useParams();


    useEffect(function () {

        async function handleFetchProduct() {
            try {
                const data = await getRequest('products/slug', slug);
                if(data?.message && data?.message !== 'Internet Error') throw new Error(data?.message);
                setProduct(data?.data?.product);
            } catch(err) {
                setMessage(err?.message);
            } finally {
                setIsLoading(false);
            }
        }
        handleFetchProduct();
    }, []);


    return (
        <>
            <Header />

            {isLoading && (
                <MainSpinner />
            )}

            {(product && !isLoading) && (
                <ProductItem product={product} />
            )}

            {(!product && !isLoading) && (
                <InternetError message={message} />
            )}

            <Footer />
        </>
    )
}

export default index
