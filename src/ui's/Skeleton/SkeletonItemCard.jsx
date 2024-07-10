import React from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import './style.css';

function SkeletonItemCard() {
  return (
    <>
        <div className='skeleton--item-card'>
            <Skeleton height={'26rem'} width={'100%'} />
        </div>
        <div className='skeleton--item-card'>
            <Skeleton height={'26rem'} width={'100%'} />
        </div>
    </>
  )
}

import './style.css';

export default SkeletonItemCard
