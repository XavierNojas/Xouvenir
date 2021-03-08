;(function ($, window, document) {
    'use strict';


function simple_slider(){
    if($('.simple_slider .owl-container-gallery').length){

        $('.simple_slider .owl-container-gallery').each(function () {

            var autoPlayVar = parseInt($(this).attr('data-autoplay'), 10);
            var autoPlay = autoPlayVar ? true : false;

            $(this).owlCarousel({
                autoplay: autoPlay,
                autoplayTimeout: autoPlayVar,
                items: 1,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                loop: true,
                smartSpeed:600,
                nav: true,
                navElement: 'div'
            });
        });
    }
}

    $(window).on('load resize', function () {
        simple_slider();
    });

    window.addEventListener("orientationchange", function() {
        simple_slider();
    });


})(jQuery, window, document);