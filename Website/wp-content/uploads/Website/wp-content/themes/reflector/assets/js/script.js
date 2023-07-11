;(function ($, window, document, undefined) {
    'use strict';

    $('body').fitVids({ignore: '.vimeo-video, .youtube-simple-wrap iframe, .iframe-video.for-btn iframe, .post-media.video-container iframe'});

    /*=================================*/
    /* PAGE CALCULATIONS */
    /*=================================*/
    /**
     *
     * PageCalculations function
     * @since 1.0.0
     * @version 1.0.0
     * @var winW
     * @var winH
     * @var winS
     * @var pageCalculations
     * @var onEvent
     **/
    if (typeof pageCalculations !== 'function') {

        var winW, winH, winS, pageCalculations, onEvent = window.addEventListener;

        pageCalculations = function (func) {

            winW = window.innerWidth;
            winH = window.innerHeight;
            winS = document.body.scrollTop;

            if (!func) return;

            onEvent('load', func, true); // window onload
            onEvent('resize', func, true); // window resize
            onEvent("orientationchange", func, false); // window orientationchange

        }; // end pageCalculations

        pageCalculations(function () {
            pageCalculations();
        });
    }

    /*=================================*/
    /* FULL HEIGHT BANNER */
    /*=================================*/
    function topBannerHeight() {
        var headerH = $('.header_top_bg').not('.header_trans-fixed, .fixed-header').outerHeight() || 0;
        var footerH = $('#footer').not('.fix-bottom').outerHeight() || 0;
        var windowH = $(window).outerHeight();
        var offsetTopAdmin = $('#wpadminbar').outerHeight() || 0;
        var offsetTop = headerH + offsetTopAdmin;

        $('.full-height-window').css('min-height', (windowH - offsetTop) + 'px');
        $('.full-height-window-hard').css('height', (windowH - offsetTop) + 'px');
        $('.full-height-window-hard-2').css('height', (windowH - offsetTop - 30) + 'px');
        $('.middle-height-window-hard').css('height', (windowH - offsetTop) * 0.8 + 'px');

        $('body, .main-wrapper').css('min-height', $(window).height());


        if($(window).width() < 1025){
            $('.full-height-hard').css('height', (windowH - footerH) + 'px');
        }else{
            $('.full-height-hard').css('height', (windowH - headerH - footerH) + 'px');
        }

    }

    /*=================================*/
    /* VIDEO POPUP */
    /*=================================*/
    $(window).on('load', function () {
        if($('.js-video-play').length) {
            $('.js-video-play').each(function() {
    			$(this).magnificPopup({
                    disableOn: 700,
                    type: 'iframe',
                    mainClass: 'mfp-fade',
                    removalDelay: 160,
                    preloader: false,
                    fixedContentPos: true,
                    fixedBgPos: true
                });
            });
        }
    });

    /*=================================*/
    /* IS TOUCH DEVICE */
    /*=================================*/
    function isTouchDevice() {
        return 'ontouchstart' in document.documentElement;
    }

    /*=================================*/
    /* SWIPER SLIDER */
    /*=================================*/
    var swipers = [];
    function initSwiper() {
        var initIterator = 0;

        $('.swiper-container').each(function () {
            var $t = $(this);

            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            $t.parent().find('.swiper-pagination').addClass('swiper-pagination-' + index);

            if($t.hasClass('outer-pagination')){
                $t.closest('.swiper-container-wrap').find('.swiper-pagination').addClass('swiper-pagination-' + index);
            }else{
                $t.parent().find('.swiper-pagination').addClass('swiper-pagination-' + index);
            }

            $t.parent().find('.swiper-button-next').addClass('swiper-button-next-' + index);
            $t.parent().find('.swiper-button-prev').addClass('swiper-button-prev-' + index);

            var setThumb = function (parent) {
                var slidesNum = parent.find('.swiper-slide:not(.swiper-slide-duplicate)').length,
                    activeIndex = loopVar ? parent.find('.swiper-slide.swiper-slide-active').attr('data-swiper-slide-index') : $t.find('.swiper-slide.swiper-slide-active').index(),
                    customSliderCurrent = parent.find('.number-slides .current'),
                    customSliderTotal = parent.find('.number-slides .total');

                activeIndex++;
                activeIndex = activeIndex < 10 ? '0' + activeIndex : activeIndex;
                slidesNum = slidesNum < 10 ? '0' + slidesNum : slidesNum;

                customSliderCurrent.text(activeIndex);
                customSliderTotal.text(slidesNum);
            };

            if (isTouchDevice() && $t.data('mode') == 'vertical') {
                $t.attr('data-noswiping', 1);
                $(this).find('.swiper-slide').addClass('swiper-no-swiping');
            }

            var autoPlayVar = parseInt($t.attr('data-autoplay'), 10);
            var mode = $t.attr('data-mode') ? $t.attr('data-mode') : 'horizontal';
            var effect = $t.attr('data-effect') ? $t.attr('data-effect') : 'slide';
            var paginationType = $t.attr('data-pagination-type') ? $t.attr('data-pagination-type') : 'bullets';
            var loopVar = parseInt($t.attr('data-loop'), 10) ? parseInt($t.attr('data-loop'), 10) : false;
            var noSwipingVar = $t.attr('data-noSwiping') ? parseInt($t.attr('data-noSwiping'), 10) : true;
            var mouse = parseInt($t.attr('data-mouse'), 10) ? parseInt($t.attr('data-mouse'), 10) : false;
            var speedVar = parseInt($t.attr('data-speed'), 10) ? parseInt($t.attr('data-speed'), 10) : '1500';
            var centerVar = parseInt($t.attr('data-center'), 10) ? parseInt($t.attr('data-center'), 10) : false;
            var spaceBetweenVar = parseInt($t.attr('data-space'), 10) ? parseInt($t.attr('data-space'), 10) : 0;
            var slidesPerView = parseInt($t.attr('data-slidesPerView'), 10) ? parseInt($t.attr('data-slidesPerView'), 10) : 'auto';
            var slidesPerColumn = parseInt($t.attr('data-slidesPerColumn'), 10) ? parseInt($t.attr('data-slidesPerColumn'), 10) : 1;
            var heightVar = parseInt($t.attr('data-height'), 10) ? parseInt($t.attr('data-height'), 10) : false;
            var grabCursorVar = parseInt($t.attr('data-grab-cursor'), 10) ? parseInt($t.attr('data-grab-cursor'), 10) : false;
            var slideToClickedSlideVar = parseInt($t.attr('data-slide-to-clicked'), 10) ? parseInt($t.attr('data-slide-to-clicked'), 10) : false;
            var breakpoints = {};
            var responsive = parseInt($t.attr('data-responsive'), 10) ? parseInt($t.attr('data-responsive'), 10)  : false;
            var lazyVar = parseInt($t.attr('data-lazy'), 10) ? parseInt($t.attr('data-lazy'), 10)  : false;
            var lazyAmountVar = parseInt($t.attr('data-lazy-amount'), 10) ? parseInt($t.attr('data-lazy-amount'), 10)  : 3;

            if (lazyVar) {
                lazyVar = {
                    loadPrevNext: true,
                    loadPrevNextAmount: lazyAmountVar,
                };
            }

            if (autoPlayVar) {

                var autoPlayObject = {
                    delay: autoPlayVar,
                };
            } else {
                var autoPlayObject = false;
            }

            if (responsive) {

                slidesPerView = $t.attr('data-add-slides');
                var lg = $t.attr('data-lg-slides') ? $t.attr('data-lg-slides') : slidesPerView;
                var md = $t.attr('data-md-slides') ? $t.attr('data-md-slides') : lg;
                var sm = $t.attr('data-sm-slides') ? $t.attr('data-sm-slides') : md;
                var xs = $t.attr('data-xs-slides') ? $t.attr('data-xs-slides') : sm;

                slidesPerColumn = $t.attr('data-add-column');
                var lg_col = $t.attr('data-lg-column') ? $t.attr('data-lg-column') : slidesPerColumn;
                var md_col = $t.attr('data-md-column') ? $t.attr('data-md-column') : lg_col;
                var sm_col = $t.attr('data-sm-column') ? $t.attr('data-sm-column') : md_col;
                var xs_col = $t.attr('data-xs-column') ? $t.attr('data-xs-column') : sm_col;

                var spaceLg = $t.attr('data-lg-space') ? $t.attr('data-lg-space') : spaceBetweenVar;
                var spaceMd = $t.attr('data-md-space') ? $t.attr('data-md-space') : spaceLg;
                var spaceSm = $t.attr('data-sm-space') ? $t.attr('data-sm-space') : spaceMd;
                var spaceXs = $t.attr('data-xs-space') ? $t.attr('data-xs-space') : spaceSm;

                breakpoints = {
                    767: {
                        slidesPerView: xs !== 'auto' ? parseInt(xs, 10): xs,
                        slidesPerColumn: parseInt(xs_col, 10),
                        spaceBetween: parseInt(spaceXs, 10)
                    },
                    991: {
                        slidesPerView: sm !== 'auto' ? parseInt(sm, 10): sm,
                        slidesPerColumn: parseInt(sm_col, 10),
                        spaceBetween: parseInt(spaceSm, 10)
                    },
                    1200: {
                        slidesPerView: md !== 'auto' ? parseInt(md, 10): md,
                        slidesPerColumn: parseInt(md_col, 10),
                        spaceBetween: parseInt(spaceMd, 10)
                    },
                    1600: {
                        slidesPerView: lg !== 'auto' ? parseInt(lg, 10): lg,
                        slidesPerColumn: parseInt(lg_col, 10),
                        spaceBetween: parseInt(spaceLg, 10)
                    }
                };

            }

            if($t.hasClass('vertical-items')){
                breakpoints = {
                    767: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        direction: 'horizontal',
                        noSwiping: 0
                    },
                    991: {
                        slidesPerView: 3,
                        direction: 'vertical'
                    },
                    1200: {
                        slidesPerView: 3,
                        direction: 'vertical'
                    },
                    1600: {
                        slidesPerView: 3,
                        direction: 'vertical'
                    },
                };
            }

            if ($t.closest('.cs-slider.horizontal')) {
                $t.closest('.vc_row[data-vc-full-width]').css('overflow', 'visible');
            }

            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                pagination: {
                    el: '.swiper-pagination-' + index,
                    clickable: true,
                    type: paginationType,
                    renderBullet: function (index, className) {
                        if($t.hasClass('outer-pagination')){
                            return '<span class="' + className + '">' + (index + 1) + '</span>';
                        }else{
                            return '<span class="' + className + '"></span>';
                        }
                    },
                },
                clickable: true,
                navigation: {
                    nextEl: '.swiper-button-next-' + index,
                    prevEl: '.swiper-button-prev-' + index,
                },
                direction: mode || 'horizontal',
                slidesPerView: slidesPerView,
                slidesPerColumn: slidesPerColumn,
                breakpoints: breakpoints,
                centeredSlides: centerVar,
                noSwiping: noSwipingVar,
                noSwipingClass: 'swiper-no-swiping',
                watchSlidesVisibility: true,
                spaceBetween: spaceBetweenVar,
                slideToClickedSlide: slideToClickedSlideVar,
                loop: loopVar,
                speed: speedVar,
                grabCursor: grabCursorVar,
                autoplay: autoPlayObject,
                effect: effect,
                mousewheel: mouse,
                iOSEdgeSwipeDetection: true,
                autoHeight: heightVar,
                preloadImages: false,
                lazy: lazyVar,
                //
                parallax: true,
                on: {
                    slideChange: function () {
                       // $t.find('img[data-lazy-src]').foxlazy();
                        paginationScroll($t, lg);
                    },
                },
            });

            initIterator++;
        });
    }

    /*=================================*/

    function paginationScroll(parent) {
        if (parent.attr('data-pagination-scroll')) {
            var pagination = parent.parent().find('.swiper-pagination'),
                active = $(pagination).find('.swiper-pagination-bullet-active')[0];
            if (active) {
                $(pagination).animate({
                    scrollTop: $(active).offset().top - $(pagination).offset().top + $(pagination).scrollTop()
                }, 500)
            }
        }
    }

    /*=================================*/

    function swiperEqualHeight() {
        $('.swiper-container[data-equal-height]').each(function () {
            var $t = $(this),
                max_height = 0,
                eq_height = parseInt($t.attr('data-equal-height'), 10),
                id = 'swiper-' + $t.attr('id');

            if (eq_height) {
                $t.find('.swiper-slide').each(function () {
                    var swiperHeight = $(this).css('height', 'auto').outerHeight();
                    max_height = (swiperHeight > max_height) ? swiperHeight : max_height;
                });

                $t.css('height', max_height);
                swipers[id].update();
            }
        });
    }

    // ==============================
    // INIT SHOP
    // ==============================
    function initShop() {
    	if ($('.woocommerce-product-gallery__wrapper').length) {
    		$('.woocommerce-product-gallery__wrapper').lightGallery({
    			selector: '.woocommerce-product-gallery__wrapper a',
    			mode: 'lg-slide',
    			closable: true,
    			iframeMaxWidth: '80%',
    			download: false,
    		});
    	}
    }

    // ==============================
    // PORTFOLIO ISOTOPE
    // ==============================
    function portfolioIsotope() {
    	if ($('.isotope-container').length) {
    		$('.isotope-container').each(function () {
    			var self = $(this);
    			self.isotope({
    				itemSelector: '.isotope-item',
    				layoutMode: 'masonry',
    				masonry: {
    					columnWidth: '.isotope-item',
                        'gutter': 30
    				}
    			});
    		});
    	}
    }

    // ==============================
    // LIGHT GALLERY
    // ==============================
    if ($('.light-gallery').length) {
        $('.light-gallery').each(function () {
            $(this).lightGallery({
                selector: '.gallery-item',
                mode: 'lg-slide',
                closable: true,
                iframeMaxWidth: '80%',
                download: false
            });
        });
    }

    // ==============================
    // SHARE POPUP
    // ==============================
    $('[data-share]').on('click',function () {
        var w = window,
            url = this.getAttribute('data-share'),
            title = '',
            w_pop = 600,
            h_pop = 600,
            scren_left = w.screenLeft ? w.screenLeft : screen.left,
            scren_top = w.screenTop ? w.screenTop : screen.top,
            width = w.innerWidth,
            height = w.innerHeight,
            left = ((width / 2) - (w_pop / 2)) + scren_left,
            top = ((height / 2) - (h_pop / 2)) + scren_top,
            newWindow = w.open(url, title, 'scrollbars=yes, width=' + w_pop + ', height=' + h_pop + ', top=' + top + ', left=' + left);
        if (w.focus) {
            newWindow.focus();
        }
        return false;
    });

    /*=================================*/
    /* MAIN WRAPPER */
    /*=================================*/
    function calcPaddingMainWrapper() {
        var footer = $('#footer');
        var paddValue = footer.outerHeight();
        footer.bind('heightChange', function () {
            if (!$("#footer.fix-bottom").length && $("#footer.footer-parallax").length) {
                $('.main-wrapper').css('margin-bottom', paddValue);
            } else if (!$("#footer.fix-bottom").length) {
                $('.main-wrapper').css('padding-bottom', paddValue);
            }
        });

        footer.trigger('heightChange');
    }

    /*=================================*/
    /* ADD IMAGE ON BACKGROUND */
    /*=================================*/
    function wpc_add_img_bg(img_sel, parent_sel) {
        if (!img_sel) {
            return false;
        }

        var $parent, $imgDataHidden, _this;
        $(img_sel).each(function () {
            _this = $(this);
            $imgDataHidden = _this.data('s-hidden');
            $parent = _this.closest(parent_sel);
            $parent = $parent.length ? $parent : _this.parent();
            $parent.css('background-image', 'url(' + this.src + ')').addClass('s-back-switch');
            if ($imgDataHidden) {
                _this.css('visibility', 'hidden');
                _this.show();
            }
            else {
                _this.hide();
            }
        });
    }

    /*=================================*/
    /* BLOG ISOTOPE */
    /*=================================*/
    function initBlogIsotope() {

        if ($('.izotope-blog').length) {
            var self = $('.izotope-blog'),
                layoutM = 'masonry';

         //   self.find("[data-lazy-src]").foxlazy('', function () {
			self.foxlazy('', function () {
                self.isotope({
                    itemSelector: '.post',
                    percentPosition: true,
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.post'
                    }
                });

                self.isotope('layout');
            });

        }

    }

    pageCalculations(function () {
        if (!window.enable_foxlazy) {
            wpc_add_img_bg('.s-img-switch');
        }
    });

    /*=================================*/
    /* COPYRIGHT */
    /*=================================*/
    if ($('.reflector_copyright_overlay').length) {
        $(document).on('contextmenu',function(event){
            if($('.reflector_copyright_overlay').hasClass('copy')){
                event.preventDefault();
            }else if(event.target.tagName != 'A'){
                event.preventDefault();
            }
            $('.reflector_copyright_overlay').addClass('active');
        }).on('click', function(){
            $('.reflector_copyright_overlay').removeClass('active').removeAttr('style');
        });
    }


    $('.parallax-window .btn-scroll-down').on('click', function () {
        var scroll = $(window).height();
        $('html, body').animate({
            scrollTop: scroll
        }, 600);
        return false;
    });


    $(window).on('load', function () {
        if ($('.cs-preloader').length) {
            $('.cs-preloader').fadeOut(400);
        }

        if($('.wpcf7-form-control-wrap textarea').length){
            $('.wpcf7-form-control-wrap textarea').closest('.wpcf7-form-control-wrap').addClass('textarea-form');
        }

        if($('.widget_search input[type="submit"]').length){
            $('.widget_search input[type="submit"]').wrap('<div class="submit-wrap"></div>');
        }

        wpc_add_img_bg('.s-img-switch');
        topBannerHeight();
        initSwiper();
        swiperEqualHeight();
        initShop();
        initBlogIsotope();

        // fix vc_row width
        setTimeout(function () {
            $(window).resize();
        }, 300);
    });

    /*=================================*/

    $(window).on('resize', function () {
        swiperEqualHeight();
        topBannerHeight();
    });
    
    /*=================================*/

    $(window).on('load resize', function () {
        calcPaddingMainWrapper();
        portfolioIsotope();
    });

    /*=================================*/

    window.addEventListener("orientationchange", function () {
        swiperEqualHeight();
        calcPaddingMainWrapper();
        topBannerHeight();
        portfolioIsotope();
    });

    /*=================================*/


    function send_form() {

        if (window.get) {
            $('#pricelistform .close').on('click', function (e) {
                $('#pricelistform').find('.reflector-send-popup').removeClass('active');
                $('.main-wrapper').removeClass('active-wrapper');
            });
            $('#pricelistform').submit( function (e) {

                e.preventDefault();

                var wrapp_elements = $(this).closest('.reflector-send-email'),
                    mail_to = wrapp_elements.attr('data-mail'),
                    placeholder = wrapp_elements.find('textarea[name="reflector_message"]').attr('placeholder'),
                    price = wrapp_elements.attr('data-price'),
                    packages = [],
                    packagesString;


                $('.pricelist-wrap .pricing-wrap.active').each(function (index ) {
                    var dataTitle = $(this).find('.pricelist-value').attr('data-price-title'),
                        dataPrice = $(this).find('.pricelist-value').attr('data-price-value');

                    packages[index] = dataTitle + '=' + dataPrice;

                });

                if(packages.length > 0){
                    packagesString = packages.join('&');
                }

                var form = $(this).serialize();

                $.ajax({
                    type: "POST",
                    url: get.ajaxurl,
                    data: {
                        'action': 'reflector-send-email',
                        'mail_to': mail_to,
                        'price': price,
                        'packages': packagesString,
                        'placeholder': placeholder,
                        form: form
                    },
                    beforeSend: function() {
                        $(".price-send-loader").addClass('active');
                    },
                    success: function() {
                        $(".price-send-loader").removeClass('active');
                    }
                }).done(function($data) {
                    wrapp_elements.find('.reflector-send-popup').addClass('active');
                    $('.main-wrapper').addClass('active-wrapper');

                    if ( $data !== 'error') {
                        wrapp_elements.find('.done').show();
                        wrapp_elements.find('.error').hide();
                        if(packages.length > 0){
                            wrapp_elements.find('.pdf-wrap').attr('href', $data ).show();
                        }

                    } else {
                        wrapp_elements.find('.done').hide();
                        wrapp_elements.find('.popup-title').hide();
                        wrapp_elements.find('.error').show();
                    }

                    wrapp_elements.find('input, textarea').val('');
                });
            });
        }
    }

    $(window).on('load', function () {
        send_form();
    });



})(jQuery, window, document);