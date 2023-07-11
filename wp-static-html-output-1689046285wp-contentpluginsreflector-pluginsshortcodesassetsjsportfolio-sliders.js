;(function ($, window, document, undefined) {
    'use strict';
    $(window).on('load resize', function() {
        var winWidth = window.innerWidth,
            slideWidth;
        if (winWidth > 768) {
            slideWidth = winWidth*0.5;
        } else {
            slideWidth = winWidth;
        }

        if($('.portfolio-slider-wrap.urban_slider').length){
            $('.gallery-top-slide').width(slideWidth);
        }

    });


    if($('.portfolio-slider-wrap.urban_slider').length){

        $('.urban_slider .gallery-top').each(function () {
            var autoplaySpeed = $(this).data('autoplayspeed'),
                autoplay = $(this).data('autoplay'),
                speed = $(this).data('speed'),
                id = '#' + $(this).data('id');

            $(this).slick({
                slidesToShow: 1,
                autoplay: autoplay,
                slidesToScroll: 1,
                arrows: true,
                speed: speed,
                autoplaySpeed: autoplaySpeed,
                infinite: true,
                asNavFor: id,
                centerMode: true,
                centerPadding: '30px',
                variableWidth: true,
                prevArrow: '<button type="button" class="slick-prev"></button>',
                nextArrow: '<button type="button" class="slick-next"></button>',
                cssEase: 'ease'
            });
        });

        $('.urban_slider .gallery-thumb').each(function () {
            var autoplaySpeed = $(this).data('autoplayspeed'),
                autoplay = $(this).data('autoplay'),
                id = '#' + $(this).data('id'),
                speed = $(this).data('speed');

            $(this).slick({
                slidesToShow: 3,
                autoplay: autoplay,
                slidesToScroll: 1,
                infinite: true,
                speed: speed,
                arrows: false,
                autoplaySpeed: autoplaySpeed,
                asNavFor: id,
                centerMode: true,
                centerPadding: '30px',
                focusOnSelect: true,
                cssEase: 'ease',
                responsive: [
                    {
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });

        });
    }

    if($('.portfolio-slider-wrap.interactive').length){
        $('.tabs-header > .container > ul > li > a').on('hover', function(e) {
            e.preventDefault();
            if (!$(this).parent().hasClass('active')) {
                var index_el = $(this).parent().index();

                $(this).parent().addClass('active').siblings().removeClass('active');
                $(this).parent().closest('.tabs').find('.tabs-item').removeClass('active').eq(index_el).addClass('active');
            } else {
                return false
            }
        });
    }


    // SWIPER OUTER WRAPPER BACKGROUND ON SWIPE

    function changeBg() {
        var colorBg = $('.swiper-container-vert-slider .swiper-slide-active').css("background-image");
        $('.outer-swiper-wrapper .img-overlay').css("background-image", colorBg);
    }

    function heightVerticalSlider() {
        var pageHeight = $(window).outerHeight(),
            headerHeight;


        if ($('body').hasClass('static-menu')) {
            headerHeight = 71;
        } else {
            headerHeight = $('.header_top_bg').outerHeight();
        }

        var footerHeight = $('#footer').length ? $('#footer').outerHeight() : headerHeight;

        if ($('#wpadminbar').length) {
            $('.header_top_bg.fixed-header').css('top', '32px');
            if (!$('body').hasClass('static-menu')) {
                headerHeight += $('#wpadminbar').height();
            }
        }

        $('.swiper-container-vert-slider').css("height", pageHeight - (headerHeight + footerHeight));
        $('.outer-swiper-wrapper').css({"padding-top": headerHeight - $('#wpadminbar').height() , "padding-bottom": footerHeight});
    }

    function initSwiperVert() {

        var pageHeight = $(window).outerHeight(),
            elVertSwiper = $('.swiper-container-vert-slider'),
            headerHeight;

        if ($('body').hasClass('static-menu')) {
            headerHeight = 71;
        } else {
            headerHeight = $('.header_top_bg').outerHeight();
        }

        var footerHeight = $('#footer').length ? $('#footer').outerHeight() : headerHeight;

        if($('#wpadminbar').length){
            headerHeight = headerHeight + $('#wpadminbar').outerHeight();
        }

        if (elVertSwiper.length) {
            elVertSwiper.each(function () {
                var $t = $(this);

                var speed = parseInt($t.attr('data-speed'), 10) ? parseInt($t.attr('data-speed'), 10) : '1500',
                    autoplay = parseInt($t.attr('data-autoplay'), 10),
                    loop = parseInt($t.attr('data-loop'), 10) ? parseInt($t.attr('data-loop'), 10) : false;

                if (autoplay) {
                    var autoPlayObject = {
                        delay: autoplay,
                        waitForTransition: false,
                        disableOnInteraction: false
                    };
                } else {
                    var autoPlayObject = false;
                }

                var vertSwiper = new Swiper($(this), {
                    direction: 'vertical',
                    speed: speed,
                    autoplay: autoPlayObject,
                    loop: loop,
                    height: pageHeight - (headerHeight + footerHeight),
                    slidesPerView: 1,
                    mousewheelControl: true,
                    on: {
                        slideChangeTransitionEnd: function () {
                            changeBg();
                        },
                    },
                    navigation: {
                        nextEl: $(this).find('.swiper-button-next'),
                        prevEl: $(this).find('.swiper-button-prev'),
                    },

                });
            })
        }
    }


    function horizontalScrollSlider() {
        var headerH = $('.header_top_bg').not('.header_trans-fixed, .fixed-header').outerHeight() || 0;
        var footerH = $('#footer').not('.fix-bottom').outerHeight() || 0;
        var windowH = $(window).height();
        var offsetTop;
        if ($('#wpadminbar').length) {
            offsetTop = headerH + $('#wpadminbar').outerHeight();
        } else {
            offsetTop = headerH;
        }
        $('.swiper-horizontal-scroll .swiper-slide').css('height', ((windowH - offsetTop - footerH)/2 - 15)  + 'px');
        var slider = $('.swiper-horizontal-scroll');

        var itemHeight = $('.swiper-horizontal-scroll .img-wrap').height();
        $('.swiper-horizontal-scroll .img-wrap').width(itemHeight);

        if (slider.length) {
            slider.each(function () {
                var $t = $(this);

                var speed = parseInt($t.attr('data-speed'), 10) ? parseInt($t.attr('data-speed'), 10) : '1500',
                    autoplay = parseInt($t.attr('data-autoplay'), 10),
                    loop = parseInt($t.attr('data-loop'), 10) ? parseInt($t.attr('data-loop'), 10) : false;

                if (autoplay) {
                    var autoPlayObject = {
                        delay: autoplay,
                        waitForTransition: false,
                        disableOnInteraction: false
                    };
                } else {
                    var autoPlayObject = false;
                }

                var breakpoints = {
                    600: {
                        slidesPerView: 1
                    },
                    992: {
                        slidesPerView: 2
                    },
                    1240: {
                        slidesPerView: 2
                    },
                    1600: {
                        slidesPerView: 3
                    }
                };

                var horizontalScroll = new Swiper($(this), {
                    speed: speed,
                    autoplay: autoPlayObject,
                    loop: loop,
                    slidesPerView: 3,
                    breakpoints: breakpoints,
                    mousewheelControl: true,
                    slidesPerColumn: 2,
                    slidesPerColumnFill: 'column',
                    spaceBetween: 30,
                });
            })
        }
    }


    function horizontalTyped(){
        if($('.portfolio-slider-wrap.horizontal .main-title').length){
            $('.portfolio-slider-wrap.horizontal .main-title').each(function () {
                var head = $(this);
                var typingWords = head.data('words'),
                    wordsArray = typingWords.split(',');
                head.each(function () {
                    $(this).typed({
                        strings: wordsArray,
                        // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
                        stringsElement: null,
                        // typing speed
                        typeSpeed: 200,
                        // time before typing starts
                        startDelay: 500,
                        // backspacing speed
                        backSpeed: 20,
                        // time before backspacing
                        backDelay: 500,
                        // loop
                        loop: true,
                        // false = infinite
                        loopCount: false,
                        // show cursor
                        showCursor: true,
                        // character for cursor
                        cursorChar: "",
                        // attribute to type (null == text)
                        attr: null,
                        // either html or text
                        contentType: 'html',
                        // call when done callback function
                    });
                })
            });
        }
    }

    if($('.slider_classic').length){
        $('.slider_classic').each(function () {
            $(this).closest('.vc_row').css('z-index', '500');
        })
    }

    $(window).on('load', function () {
        initSwiperVert();
        horizontalTyped();
    });

    $(window).on('load resize', function () {
        changeBg();
        heightVerticalSlider();
        horizontalScrollSlider();
    });


})(jQuery, window, document);