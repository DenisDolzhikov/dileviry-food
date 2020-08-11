'use strict';
import Swiper from 'swiper';
import swiper from '../../../node_modules/swiper/bundle';

export function headerSlider() {
    const slider = new Swiper('.header__slider', {
        loop: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
            el: '.header__slider .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });
}

headerSlider();
