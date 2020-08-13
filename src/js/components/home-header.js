'use strict';
import Swiper from 'swiper';
import swiper from '../../../node_modules/swiper/bundle';

export function headerSlider() {
    const slider = new Swiper('.home-header__slider', {
        loop: true,
        speed: 200,
        slidesPerView: 1,
        slidesPerGroup: 1,
        effect: 'fade',
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.home-header__slider .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    });
}

headerSlider();
