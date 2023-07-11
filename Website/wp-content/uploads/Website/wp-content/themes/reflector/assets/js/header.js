;(function ($, window, document) {
    'use strict';

    var windowWidth         = window.outerWidth,
        reflectorHeaderData = ( typeof window.reflectorHeaderData == 'object' ) ? window.reflectorHeaderData : {},
        clickParentMenuItem = ( reflectorHeaderData.click_parent_menu_item ) ? true : false;

    /*=================================*/
    /* HEADER SCROLL */
    /*=================================*/
    $(window).on('scroll load', function () {
        if ($(this).scrollTop() >= 30) {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').not('.fixed-dark').addClass('bg-fixed-color');
                $('.fixed-dark').addClass('bg-fixed-dark');
				$('.logo-hover, .header-button-scroll').show();
				$('.main-logo, .header-button-default').hide();
            }
            if ($('.right-menu.modern').length) {
                $('.right-menu.modern').closest('.fixed-header').addClass('fixed-header-scroll');
            }
        } else {
            if ($('.header_top_bg.header_trans-fixed').length) {
                $('.header_top_bg.header_trans-fixed').not('.fixed-dark').removeClass('bg-fixed-color');
                $('.fixed-dark').removeClass('bg-fixed-dark');
				$('.logo-hover, .header-button-scroll').hide();
				$('.main-logo, .header-button-default').show();
            }
            if ($('.right-menu.modern').length) {
                $('.right-menu.modern').closest('.fixed-header').removeClass('fixed-header-scroll');
            }
        }
    });

    /* One page menu */
    function activeSection() {
		if ($('.vc_row[id]').length) {
			var wintop = $(window).scrollTop();
			$('.vc_row[id]').each(function () {
				var $this = $(this);
				var currentId = $this.attr('id');
				if (currentId.length > 2) {
					if (wintop >= $(this).offset().top - $('.header_trans-fixed').outerHeight() - $('#wpadminbar').outerHeight()) {
						var reqLink   = $('ul.menu li:not(.menu-item-has-children) > a').filter('[href="#' + currentId + '"]');
						reqLink.closest('li:not(.menu-item-has-children)').addClass('active').siblings().removeClass('active');
					}
				}
			});
		}
	}

    if ($(window).width() >= 1024) {
        $('ul.menu li:not(.menu-item-has-children) > a[href^="#"]').on('click', function (e) {
        	e.preventDefault();
            var elem = $(this).attr('href');
            if ($(elem).length) {
                $('html,body').animate({
                    scrollTop: $(elem).offset().top - $('.header_trans-fixed').outerHeight() - $('#wpadminbar').outerHeight()
                }, 'slow');
            }
        });
    }

    // SEARCH POPUP
    $('.open-search').on('click', function () {
        $('body').css('overflow', 'hidden');
        $('.site-search').addClass('open');
    });
    $('.close-search').on('click', function () {
        $('body').css('overflow', '');
        $('.site-search').removeClass('open');
    });

    /*=================================*/
    /* MOBILE MENU */
    /*=================================*/

    $('.mob-nav').on('click', function (e) {
        e.preventDefault();
        $('html').addClass('no-scroll sidebar-open').height(window.innerHeight + 'px');
        if($('.mob-nav.full-nav').length && $(window).width() > 1024){
            $('#topmenu').slideDown({
                start: function () {
                    $(this).css({
                        display: "flex"
                    })
                }
            });
        }

    });

    $('.mob-nav-close').on('click', function (e) {
        e.preventDefault();
        $('html').removeClass('no-scroll sidebar-open').height('auto');
        if($('.mob-nav.full-nav').length && $(window).width() > 1024){
            $('#topmenu').slideUp(250);
        }
    });


    $('.full-screen-menu .open-search').on('click', function (e) {
        $('.full-screen-menu .search-icon-wrapper').toggleClass('active');
    });

    /*=================================*/
    /* ASIDE MENU */
    /*=================================*/
    function toggleAsideMenu() {
        // ASIDE MENU NAVIGATION
        $('.aside-nav').on('click', function () {
            $('.aside-menu').toggleClass('active-menu');
            $('.topmenu').toggleClass('active-menu');
            return false;
        });
        // TOGGLE ASIDE SUBMENU
        if(!$('.parent-click').length) {
            $('.main-wrapper .menu-item-has-children > a').on('click', function (e) {
                e.preventDefault();
            });
        }

        if (windowWidth >= 1025) {

            $('.main-wrapper').on('click', function (e) {
                if (!e.target.closest('.aside-menu')) {
                    $('.sub-menu-open').slideUp(250);
                }
            });

            var menuItemSel         = clickParentMenuItem ? '.aside-menu .menu-item a i' : '.aside-menu .menu-item a',
                menuItemHasChildSel = clickParentMenuItem ? '.aside-menu .menu-item-has-children > a i' : '.aside-menu .menu-item-has-children > a';

            $( menuItemHasChildSel ).addClass('hide-drop');

            console.log( reflectorHeaderData );
            console.log( menuItemSel );
            $( menuItemSel ).on('click', function (e) {
                e.stopPropagation();

                if ($(this).parent().hasClass('menu-item-has-children')) {

                    if ($(this).hasClass('hide-drop')) {

                        if ($(this).closest('.sub-menu').length) {
                            $(this).removeClass('hide-drop').parent().find('> .sub-menu').slideDown(250).removeClass('sub-menu-open');
                            $(this).parent().siblings().find('.sub-menu').slideUp(250).addClass('sub-menu-open');

                        } else {

                            $('.menu-item-has-children a').addClass('hide-drop').parent().find('> .sub-menu').hide(250).removeClass('sub-menu-open');
                            $(this).removeClass('hide-drop').parent().find('> .sub-menu').slideToggle(250).toggleClass('sub-menu-open');
                        }

                    } else {

                        $(this).addClass('hide-drop').parent().find('> .sub-menu').hide(250).find('.menu-item-has-children a').addClass('hide-drop').parent().find('> .sub-menu').hide(250);
                        $(this).parent().find('> .sub-menu').removeClass('sub-menu-open');
                    }
                }
            });


        } else {
            $('.menu-item-has-children a').removeClass('hide-drop');
        }
        if ($('.aside-fix').length && $(window).width() > 1024) {
            var logoWidth = $('.logo span, .logo img').outerWidth();
            $('.logo').css('top', logoWidth + 'px');
        }
    }

    function fixedMobileMenu() {
        var headerHeight   = $('.header_top_bg').not('.header_trans-fixed').outerHeight();
        var offsetTop;
        var adminbarHeight = $('#wpadminbar').outerHeight();
        if ($('#wpadminbar').length) {
            offsetTop = adminbarHeight + headerHeight;
            $('.header_top_bg').css('margin-top', adminbarHeight);
        } else {
            offsetTop = headerHeight;
        }

        if ($(window).width() < 1025) {
            $('.main-wrapper').css('padding-top', offsetTop + 'px');
        } else {
            if ($('#wpadminbar').length && $('.header_top_bg').hasClass('header_trans-fixed')) {
                $('.main-wrapper').css('padding-top', adminbarHeight + 'px');
            } else {
                $('.main-wrapper').css('padding-top', '0');
            }
        }
        if ($('#wpadminbar').length && $(window).width() < 768) {
            $('#wpadminbar').css({
                'position': 'fixed',
                'top': '0'
            })
        }
    }

    function menuArrows() {
        var typeMenu    = $('[data-type-menu]').attr('data-type-menu'),
            arrowMenus  = ['aside', 'static_aside'];
        if ( window.outerWidth < 1025 || $('.topmenu').hasClass('topmenu-arrow') || ( arrowMenus.indexOf( typeMenu ) != -1 && clickParentMenuItem ) ) {

            if (!$('.menu-item-has-children i').length) {
                $('header .menu-item-has-children > a').after('<i class="fa fa-angle-down"></i>');
                $('header .menu-item-has-children i').addClass('hide-drop');
            }

            $('header .menu-item-has-children i').on('click', function () {
                if (!$(this).hasClass('animation')) {
					$(this).parent().toggleClass('is-open');
                    $(this).addClass('animation');
                    $(this).parent().siblings().removeClass('is-open').find('.fa').removeClass('hide-drop').parent().find('> .sub-menu').slideUp(250);
                    if ($(this).hasClass('hide-drop')) {
                        if ($(this).closest('.sub-menu').length) {
                            $(this).removeClass('hide-drop').parent().find('> .sub-menu').slideToggle(250);
                        } else {
                            $('.menu-item-has-children i').addClass('hide-drop').parent().find('> .sub-menu').hide(250);
                            $(this).removeClass('hide-drop').parent().find('> .sub-menu').slideToggle(250);
                        }
                    } else {
                        $(this).addClass('hide-drop').parent().find('> .sub-menu').hide(100).find('.menu-item-has-children a').addClass('hide-drop').parent().find('> .sub-menu').hide(250);
                    }
                }
                setTimeout(removeClass, 250);

                function removeClass() {
                    $('header .menu-item i').removeClass('animation');
                }
            });
        } else {
            $('header .menu-item-has-children i').remove();
        }
    }

    $('.search-icon-wrapper.ico-style .close-search').on('click', function () {
		$(this).parent().toggleClass('is-active');
		if ($(this).parent().hasClass('is-active')) {
			setTimeout(function() {
				$('.search-icon-wrapper.ico-style .search-field').focus();
			}, 300);
		}
	});

	$(document).on('click', function(e) {
		if (!$(e.target).closest(".search-icon-wrapper.ico-style").length) {
			$('.ico-style .close-search').parent().removeClass('is-active');
		}
		e.stopPropagation();
	});


    /*end of one page menu*/

    /*==========================================================*/
    /* This function fix an issue with empty space below footer in footerMenu */
    /*==========================================================*/
    function bottomSubmenuPosition() {
        const navigation = document.getElementById('topmenu');
        const footer = document.getElementById('footer');

        if (!navigation || !footer) return;
        if(navigation.dataset.typeMenu !== 'bottom') return;

        const documentHeight = footer.getBoundingClientRect().bottom + window.pageYOffset;
        const submenus = navigation.querySelectorAll('li > .sub-menu > li > .sub-menu');

        for(let submenu of submenus) {
            submenu.style.bottom = 'auto';
            const thirdPartHeight = submenu.getBoundingClientRect().bottom + window.pageYOffset - documentHeight;

            if(thirdPartHeight > 0) {
                submenu.style.top = -thirdPartHeight + 'px';
            }
        }
    }


    $(window).on('scroll', function () {
		activeSection();
    });

    $(window).on('load resize', function () {
        windowWidth = window.outerWidth;
        if ($('#wpadminbar').length &&  $(window).width() < 1025) {
            $('#topmenu').css('top', $('#wpadminbar').height());
        }
        fixedMobileMenu();
        menuArrows();
		activeSection();
    });

    $(window).on('load', function () {
        toggleAsideMenu();
        bottomSubmenuPosition();
    });

    window.addEventListener("orientationchange", function () {
        if ($('#wpadminbar').length &&  $(window).width() < 1025) {
            $('#topmenu').css('top', $('#wpadminbar').height());
        }
        fixedMobileMenu();
        menuArrows();
    });
})(jQuery, window, document);