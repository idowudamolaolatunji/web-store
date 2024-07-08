import React, { useEffect, useState } from 'react'
import ItemCard from './ItemCard';
import { useDataContext } from '../contexts/DataContext';

function ItemsGrid() {
    const [products, setProducts] = useState([]);
    const { getRequest } = useDataContext();


    useEffect(function () {
        async function handleFetchProducts() {
            const data = await getRequest('products');
            setProducts(data?.data?.products)
        }
        handleFetchProducts();
    }, []);


    return (
        <section className="section">
            <div className="container">
                <div className="items__grid">
                    {(products && products.length > 0) && products.map(product => (
                        <>
                            <ItemCard item={product} key={product._id} />
                        </>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ItemsGrid
