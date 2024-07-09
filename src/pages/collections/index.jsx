import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../contexts/DataContext';
import InternetError from '../error/InternetError';
import CollectionTop from './components/CollectionTop';
import MainSpinner from '../../ui\'s/Spinner/MainSpinner'

import './style.css';
import ItemCollections from './components/ItemCollections';

function index() {
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const [message, setMessage] = useState('');

    const { slug } = useParams();
    const { getRequest } = useDataContext();

    useEffect(function () {
        async function handleFetchCategoryBySlug() {
            if (slug === 'all') {
                setIsLoading(false);
                return;
            };

            try {
                const data = await getRequest('products/category', slug);
                if(data?.message && data?.message !== 'Internet Error') throw new Error(data?.message);
                setCategory(data?.data?.category);
            } catch(err) {
                setMessage(err?.message);
            } finally {
                setIsLoading(false);
            }
        }
        handleFetchCategoryBySlug();
    }, [slug]);


    return (
        <>
            <Header />

            {isLoading ? (
                <MainSpinner />
            ) : (category || slug === 'all') ? (
                <>
                    <CollectionTop data={category} />
                    <section className='section'>
                        <ItemCollections />
                    </section>
                </>
            ) : (
                <InternetError message={message} />
            )}

            <Footer />
        </>
    )
}

export default index
