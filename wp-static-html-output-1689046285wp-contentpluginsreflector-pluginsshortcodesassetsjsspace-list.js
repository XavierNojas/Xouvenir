;(function ($, window, document, undefined) {
    'use strict';

    function space_simple(){

        if ($('.space-wrap.simple').length) {

            $('.space-wrap.simple').each(function () {
                var self = $(this);
                var layoutM = 'masonry';
                self.isotope({
                    itemSelector: '.item',
                    layoutMode: layoutM,
                    masonry: {
                        columnWidth: '.item',
                        'gutter': 50
                    }
                });
            });
        }
    }

    $(window).on('load resize', function () {
        space_simple();
    });

    window.addEventListener("orientationchange", function() {
        space_simple();
    });


})(jQuery, window, document);