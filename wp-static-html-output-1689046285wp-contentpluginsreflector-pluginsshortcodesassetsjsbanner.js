;(function ($, window, document) {
    'use strict';


    $('.btn-scroll-down').on('click', function () {
        var scroll = $(this).closest('.top-banner').outerHeight() + $(this).closest('.top-banner').offset().top;
        $('html, body').animate({
            scrollTop: scroll
        }, 600);
        return false;
    });


    function gridrotate(){
        if($('.gridrotate-gallery .gridrotate').length){

            if($('.gridrotate-gallery .title').length){

                $('.gridrotate-gallery .title').each(function () {
                    var head = $(this);
                    var typingWords = head.find('.typed').data('words'),
                        wordsArray = typingWords.split(',');
                    head.find('.typed').each(function () {
                        $(this).typed({
                            strings: wordsArray,
                            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
                            stringsElement: null,
                            // typing speed
                            typeSpeed: 30,
                            // time before typing starts
                            startDelay: 1200,
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

            $('.gridrotate-gallery .gridrotate').each(function () {
                $(this).gridrotator({
                    rows : 4,
                    // number of columns
                    columns : 8,
                    w1200 : { rows : 5, columns : 7 },
                    w992 : { rows : 6, columns : 5 },
                    w510 : { rows : 6, columns : 4 },
                    w480 : { rows : 6, columns : 4 },
                    w320 : { rows : 6, columns : 4 },
                    step : 7,
                    maxStep : 7
                });

            })
        }
    }


    $(window).on('load', function () {
        gridrotate();
    });

})(jQuery, window, document);