jQuery(function ($) {

    $(document).on('ready', function () {

        if ($('.pricelist-value').length && $('.pricelist-total').length) {
            var currency = $('.pricelist-wrap .pricing-wrap .currency').first().text(),
                total = $('.pricelist-total');

            total.addClass('active');
            total.find('.currency').text(currency);
            total.find('.price').text('0');

        }

        if($('.reflector-send-email input[type="checkbox"]').length){
            if($('.reflector-send-email input[type="checkbox"]').prop("checked") == true){
                $('.reflector-send-email').find('button').removeAttr('disabled');
            } else{
                $('.reflector-send-email').find('button').attr('disabled',true);
            }

           $('.reflector-send-email input[type="checkbox"]').on('change', function () {
                if($(this).prop("checked") == true){
                    $(this).closest('.reflector-send-email').find('button').removeAttr('disabled');
                } else{
                    $(this).closest('.reflector-send-email').find('button').attr('disabled',true);
                }
            })
        }

        if ($('.pricelist-wrap .pricing-wrap').length) {
            $('.pricelist-wrap .pricing-wrap').on('click', function () {
                $(this).toggleClass('active');
                var value = 0, thisPrice,
                    currency = $('.pricelist-wrap .pricing-wrap .currency').first().text(),
                    name = $(this).find('input[type="radio"]').attr('name');



                if ($(this).hasClass('active')) {
                    $(this).find('input[type="radio"]').prop("checked", true);

                } else {
                    $(this).find('input[type="radio"]').prop("checked", false);
                }

                $('input[name="'+ name +'"]').closest('.pricing-wrap').not(this).removeClass('active');

                $('.pricelist-wrap .pricing-wrap.active').each(function () {
                    thisPrice = +$(this).find('input[type="radio"]').attr('value');
                    value = value + thisPrice;
                    thisPrice = 0;
                });

                var price = currency + value;

                if($('.pricelist-total').length) {
                    $('.pricelist-total').find('.price').text(value);
                    $('.reflector-send-email').attr('data-price', price );
                }

            });
        }

    });

});