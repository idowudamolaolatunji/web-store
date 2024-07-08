import React from 'react'
import SliderComponent from './components/SliderComponent'
import Header from '../../components/Header'
import ItemsGrid from '../../components/ItemsGrid'
import MainSpinner from '../../ui\'s/Spinner/MainSpinner'

function index() {
    return (
        <>
            {/* <MainSpinner /> */}
            <Header />
            <SliderComponent />
            <ItemsGrid />
        </>
    )
}

export default index
