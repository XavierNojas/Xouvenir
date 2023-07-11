;(function ($, window) {
    'use strict';

    // $(window).on('load', function () {
    //     if($('.video').length) {
    //         $('.play').each(function() {
    //             $(this).magnificPopup({
    //                 disableOn: 700,
    //                 type: 'iframe',
    //                 mainClass: 'mfp-fade',
    //                 removalDelay: 160,
    //                 preloader: false,
    //                 fixedContentPos: true,
    //                 fixedBgPos: true
    //             });
    //         });
    //     }
    // });

    function calcHeight() {
        if($('.about-section-modern .images-wrap .img-wrap img').length){
            $('.about-section-modern').each(function () {
                var imgH = $(this).find('.img-wrap img').outerHeight();
                $(this).find('.content-wrap').height(imgH);
            });
        }
    }
    

    function asideFixed() {
        $('.js-fixed-aside').each(function (index, el) {
            if ($(this).outerWidth() < 0.75 * $(window).outerWidth()) {
                // add animation

                var parent = $(this).closest('.js-fixed-parent');

                var parentHeight = parent.outerHeight();
                var itemHeight = $(this).outerHeight();
                var headerHeight = $('.header_trans-fixed').outerHeight() + $('#wpadminbar').outerHeight();

                var parentOffset = parent.offset().top;
                var scrollPosition = $(window).scrollTop();
                var positionAsideTop = scrollPosition - (parentOffset - headerHeight) + 30;
                var positionAsideBottom = positionAsideTop - (parentHeight - itemHeight);

                if (positionAsideTop > 0 && (positionAsideBottom < 0)) {
                    $(this).css('transform', 'translateY(' + positionAsideTop + 'px)');
                } else if (positionAsideBottom > 0) {
                    $(this).css('transform', 'translateY(' + (parentHeight - itemHeight) + 'px)');
                } else {
                    $(this).css('transform', 'translateY(0px)');
                }
            } else {
                $(this).css('transform', 'translateY(0px)');
            }
        });
    }

    $(window).on('load resize orientationchange', function () {
        calcHeight();
    });

    $(window).on('load scroll resize', function () {
        asideFixed();
    });

})(jQuery, window, document);