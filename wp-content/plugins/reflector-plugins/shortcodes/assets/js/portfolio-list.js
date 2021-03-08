;(function ($, window, document, undefined) {
    'use strict';

    $(window).on('load scroll', function() {
        if ($('.parallax-showcase-wrapper .parallax-showcase-content:not(.active)').length) {

            $('.parallax-showcase-wrapper .parallax-showcase-content:not(.active)').each(function () {

                if ($(window).scrollTop() >= $(this).offset().top - $(window).height() * .9) {

                    var parent = $(this);

                    setTimeout(function(){
                        parent.find('.title').addClass('start-anim');
                    }, 400);
                    setTimeout(function(){
                        parent.find('.title').addClass('end-anim').closest('.parallax-showcase-content').addClass('active');
                    }, 800);
                }
            });
        }
    });


    function mix_masonty() {

        var space = 90;

        if($(window).width() < 1200){
            space = 60;
        }
        if($(window).width() < 768){
            space = 15;
        }


        if($('.portfolio-wrap.mix-masonry.not_same').length){
            $('.portfolio-wrap.mix-masonry.not_same').each(function () {
                var self = $(this);
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: 'masonry',
                    masonry: {
                        columnWidth: '.item',
                        "gutter": space
                    }
                });
            });
        }


        if($('.portfolio-wrap.mix-masonry.same').length){
            var image_height = 200;

            if($(window).width() < 767){
                image_height = 200;
            }

            $('.portfolio-wrap.mix-masonry.same').justifiedGallery({
                rowHeight : image_height,
                selector: 'a.item',
                maxrowHeight : 600,
                lastRow : 'justify',
                margins : space
            });

        }
    }


    function masonryIsotope(){

        if ($('.masonry-animated').length) {
            var self = $('.masonry-animated');
            var layoutM = 'masonry';

            self.isotope({
                itemSelector: '.masonry-animated-item',
                layoutMode: layoutM,
                masonry: {
                    columnWidth: '.masonry-animated-item',
                    'gutter' : 30
                },
            });

        }

    }

    function modernIsotopeHeight(){
        if ($('.modern-animated .modern-animated-item').length && $(window).width() > 768) {
            $('.modern-animated .modern-animated-item').css('height', 'auto').equalHeights();
        } else if ($('.modern-animated .modern-animated-item').length) {
            $('.modern-animated .modern-animated-item').css('height', 'auto');
        }
    }

    function modernIsotope(){
        if ($('.modern-animated').length) {
            var self = $('.modern-animated');
            var layoutM = 'masonry';
            self.isotope({
                itemSelector: '.modern-animated-item',
                layoutMode: layoutM,
                masonry: {
                    columnWidth: '.modern-animated-item'
                }
            });

        }
    }

    function initDistortion() {
        if (document.querySelectorAll('.distortion__imgs').length) {
            $('.distortion__imgs').find('canvas').remove();
            Array.from(document.querySelectorAll('.distortion__imgs')).forEach((el) => {
                const imgs = Array.from(el.querySelectorAll('img'));
                new hoverEffect({
                    parent: el,
                    intensity: el.dataset.intensity || undefined,
                    speedIn: el.dataset.speedin || undefined,
                    speedOut: el.dataset.speedout || undefined,
                    easing: el.dataset.easing || undefined,
                    hover: el.dataset.hover || undefined,
                    image1: imgs[0].getAttribute('src'),
                    image2: imgs[1].getAttribute('src'),
                    displacementImage: el.dataset.displacement
                });
            });
        }
    }


    $(window).on('load', function() {
        initDistortion();
    })

    $(window).on('load resize orientationchange', function () {
        mix_masonty();
        masonryIsotope();
        modernIsotopeHeight();
        setTimeout(modernIsotope, 0);
    });


})(jQuery, window, document);