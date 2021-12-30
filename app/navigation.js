/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
jQuery(function ($) {
	var siteMenuClone = function () {
		$(window).on('resize', function () {
			var $this = $(this),
				w = $this.width()

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu')
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this)
			e.preventDefault()

			console.log('break')

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu')
				$this.removeClass('active')
			} else {
				$('body').addClass('offcanvas-menu')
				$this.addClass('active')
			}
		})

		// click outisde offcanvas
		$(document).on('mouseup', function (e) {
			var container = $('.site-mobile-menu')
			if (
				!container.is(e.target) &&
				container.has(e.target).length === 0
			) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu')
				}
			}
		})
	}
	siteMenuClone()
})
