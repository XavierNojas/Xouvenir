jQuery(function ($) {

	if ($('.insta-wrapper').length) {
		$('.insta-wrapper').lightGallery({
			selector: '.insta-item',
			mode: 'lg-slide',
			closable: false,
			iframeMaxWidth: '80%',
			download: false
		});
	}
});