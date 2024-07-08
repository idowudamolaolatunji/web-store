import React from 'react'
import EmblaCarousel from '../../../ui\'s/EmblaCarosuel/Carousel';

//////////////////////////////////////////////////////
import Img1 from '../../../assets/slider/slider-1.jpg'
import Img2 from '../../../assets/slider/slider-2.jpg'
import Img3 from '../../../assets/slider/slider-3.jpg'
import Img4 from '../../../assets/slider/slider-4.jpg'
//////////////////////////////////////////////////////

const imgArr = [Img1, Img2, Img3, Img4];

function SliderComponent() {
    return (
        <EmblaCarousel slideImages={imgArr} />
    )
}

export default SliderComponent
