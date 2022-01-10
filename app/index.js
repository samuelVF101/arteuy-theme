import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'lodash'
import './sass/main.scss'

import '@fortawesome/fontawesome-free/js/all'

// Swiper. core version + navigation, pagination modules:
import Swiper, { Navigation, Autoplay } from 'swiper'

// configure Swiper to use modules
Swiper.use([Navigation, Autoplay])
jQuery(function ($) {
	const Blockslider = new Swiper('.block-slider', {
		speed: 1000,
		autoplay: false,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})
})
