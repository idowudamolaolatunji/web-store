import React from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'

function CollectionTop({ data }) {
    const { slug } = useParams();

    const bgImage = import.meta.env.VITE_SERVER_ASSET_URL + '/products/' + data?.categoryImage;

    return (
        <>
            {(data && slug !== "all") ? (
                <div className='collection--top' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})` }}>
                    <div className="collection--details">
                        <h4 className="collection--heading">{data?.categoryName}</h4>
                        <span className='collection--link'>
                            <Link to={'/'}>home</Link>
                            <MdKeyboardArrowRight />
                            <Link to={'/collections/all'}>product</Link>
                            <MdKeyboardArrowRight />
                            <p>{data?.categoryName}</p>
                        </span>
                        <p className='collection--description'>{data?.categoryDescription}</p>
                        <span className='collection--count'>{data?.itemCounts} Items</span>
                    </div>
                </div>

            ) : (
                <div className='collection--top' style={{ height: '35vh' }} >
                    <div className="collection--details">
                        <h4 className="collection--heading" style={{ color: '#333' }}>Products</h4>
                        <span className='collection--link' style={{ color: '#555' }}>
                            <Link to={'/'}>home</Link>
                            <MdKeyboardArrowRight />
                            <p>product</p>
                        </span>
                    </div>
                </div>
            )}



        </>
    )
}

export default CollectionTop
