import React, { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './CarouselArrowButtons'
import { DotButton, useDotButton } from './CarouselDotButton'

import './style.css';

const options = { loop: true, duration: 30 }

const Carousel = ({ slideImages }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slideImages.map((img, i) => (
                        <div className="embla__slide" key={i}>
                            <img className="embla__slide__img" src={img} alt="" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel;
