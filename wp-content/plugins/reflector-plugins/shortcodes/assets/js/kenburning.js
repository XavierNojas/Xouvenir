(function(jQuery) {

    jQuery.fn.kenBurning = function(options) {
        var defaults = {
                time: 6000
            },
            settings = jQuery.extend(defaults, options),
            $container = jQuery(this),
            animation = "in";
        jQuery(function() {
            $container.addClass("kenburning-container");
            jQuery.fn.kenBurning.doIt();
            kenBurningplay = setInterval("jQuery.fn.kenBurning.doIt()", settings.time);

        });

        if(jQuery('.kenburns-wrap').length){

            var number = jQuery('.kenburns-wrap').find(".item-ken").length;
            var count = 2;
            if ( number % 2 ) {
                count = 1;
            }

            jQuery.fn.kenBurning.doIt = function() {
                var $active = $container.find(".item-ken.active");
                if ($active.length === 0) {
                    $active = $container.find(".item-ken:last");
                }
                var $next = $active.next().length ? $active.next() : $container.find(".item-ken:first");

                $active.addClass("last-active").removeClass("active").find('.img').removeClass('zoomout zoomin').css("transform","");
                if (animation === "in") {
                    $next.css({
                        left: "0",
                        right: "auto"
                    }).find('.img').addClass("zoomin").css("transform", "scale(1.2)").parent('.item-ken').addClass("active");
                    setTimeout(function() {
                        $active.removeClass("last-active");
                        if( count === 1){
                            $active.find('.img').addClass("zoomout").removeClass("zoomin").css("transform", "scale(1)").parent('.item-ken');
                        }
                    }, settings.time);
                    animation = "out";
                } else {
                    $next.css({
                        left: "auto",
                        right: "0"
                    }).find('.img').addClass("zoomout").css("transform", "scale(1)").parent('.item-ken').addClass("active");
                    setTimeout(function() {
                        $active.removeClass("last-active")
                        if( count === 1){
                            $active.find('.img').addClass("zoomin").removeClass("zoomout").css("transform", "scale(1.2)").parent('.item-ken');
                        }
                    }, settings.time);
                    animation = "in";
                }
            };
        }


    };


    jQuery(".kenburns-wrap").each(function() {
        jQuery(this).on("click", function() {

            var time = jQuery(this).find('.kenburns').attr('data-time') ? jQuery(this).find('.kenburns').attr('data-time') : 6000;

            if (jQuery(this).find('.kenburns-play').hasClass("pause")) {
                clearInterval(kenBurningplay);
            } else {
                jQuery.fn.kenBurning.doIt();
                kenBurningplay = setInterval("jQuery.fn.kenBurning.doIt()", time );
            }
            jQuery(this).find('.kenburns-play').toggleClass("pause");
            jQuery(this).toggleClass("pause");
        });
    });
})(jQuery);


(function ($, window, document, undefined) {
    'use strict';

    var _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);


    if($('.cs_gallery-wrap.kenburn .kenburns').length){
        $('.cs_gallery-wrap.kenburn .kenburns').each(function () {
            var time = $(this).attr('data-time') ? $(this).attr('data-time') : 6000;
            $(this).kenBurning({
                time : time
            });

        });

// for sound bg
        $('.reflector-sound-btn').on('click',function(e){
            e.stopPropagation();
            var $button = $(this);
            if ($button.hasClass('play')) {
                $button.next('audio').trigger('pause');
                $button.removeClass('play');
            } else {
                $button.next('audio').trigger('play');
                $button.addClass('play');
            }

        });

    }

    function kenburnsHeight() {
        if($('.cs_gallery-wrap.kenburn .kenburns-wrap').length){
            $('.cs_gallery-wrap.kenburn .kenburns-wrap').each(function () {
                var headerH = $('.header_top_bg').not('.header_trans-fixed').outerHeight() || 0,
                    footerH = $('#footer').not('.fix-bottom').outerHeight() || 0,
                    sliderH = $(window).height() - (headerH + footerH),
                    bottomplay = $('#footer').length && $('#footer').hasClass('fix-bottom') ? ($('#footer').outerHeight() + 60) : '60';

                $(this).find('.kenburns-play').css('bottom', bottomplay + 'px');
                $(this).find('.reflector-sound-btn').css('bottom', bottomplay + 'px');

                $(this).css('height', sliderH + 'px');

                if($(window).width() < 769  && _ismobile ){
                    $(this).find('.reflector-sound-btn').css('bottom', (+bottomplay - 30) + 'px');
                    $(this).find('.info').css('bottom', (+bottomplay + 15) + 'px');
                }else{
                    $(this).find('.info').css('bottom', +(bottomplay - 23) + 'px');
                    $(this).find('.reflector-sound-btn').css('bottom', +(bottomplay - 20) + 'px');
                }

            });
        }
    }


    function kenburnPlaySound() {
        if ($('.reflector-sound-btn').length && $('.reflector-sound-btn').hasClass('play')) {
            $('.reflector-sound-btn').next('audio').trigger('play');

        }
    }


    $(window).on('load', function () {
        setTimeout(kenburnPlaySound, 500);
    });

    $(window).on('load resize orientationchange', function () {
        setTimeout(kenburnsHeight, 0);
    });

})(jQuery, window, document);