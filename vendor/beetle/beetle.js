/*
 *   Beetle
 *   Written by Pasquale Vitiello (pasqualevitiello@gmail.com),
 *   mokaine.com
 */

jQuery(document).ready(function ($) {


    /* Define some vars
     * 轮播
      * */

    var win = $(window),
        body = $('body'),
        header = $('header'),
        headerHeight = header.outerHeight(true),
        headerNav = $('nav'),
        content = $('main'),
        pxWrapper = $('#intro-wrap'),
        pxContainer = $('#intro'),
        pxImg = $('.intro-item'),
        pxImgCaption = pxContainer.find('.caption'),
        testimonial = $('.testimonial-slider'),
        cCarousel = $('.custom-carousel'),
        loaderIntro = '<div class="landing landing-slider"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div></div></div>',
        loader = '<div class="landing landing-els"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div></div></div>',
        loaderLightbox = '<div class="landing landing-els lightbox"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div></div></div>',
        darkover = '<div class="darkover"></div>'
        ;

    /*
     *确定媒体查询的视口宽度匹配
      */

    function viewport() {

        var e = window,
            //内部的
            a = 'inner';

        //内宽
        if (!('innerWidth' in window)) {
            //客户端
            a = 'client';
            e = document.documentElement || document.body;

        }

        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };

    }


    /* Toggle "mobile" class
     * 首页女神搭配框高
     * 首页男神搭配框高
     * 缩小时
      * */

    function mobileClass() {

        var vpWidth = viewport().width; // This should match media queries

        if ((vpWidth <= 768) && (!body.hasClass('mobile'))) {

            body.addClass('mobile');

        } else if ((vpWidth > 768) && (body.hasClass('mobile'))) {

            body.removeClass('mobile');

        }

    }

    mobileClass();
    $(window).resize(mobileClass);


    /* 介绍高
    * 轮播图片上的文字位置
    * */

    function introHeight() {

        var $this = pxWrapper,
            dataHeight = $this.data('height');

        if ($this.hasClass('full-height')) {

            var recalcHeaderH = header.outerHeight(true);

            if (!body.hasClass('mobile')) {

                $this.css({
                    'height': (win.height())
                });

            } else {

                $this.css({
                    'height': (win.height() - recalcHeaderH)
                });

            }

        } else {

            $this.css({
                'height': dataHeight + 'em'
            });

        }

    }


    /*
     * 初始化的介绍
      * */

    function initIntro() {

        var $this = pxContainer;

        $this.append(loaderIntro);

        $this.addClass(function () {
            return $this.find('.intro-item').length > 1 ? "big-slider" : "";
        });

        $this.waitForImages({

            finished: function () {

                // console.log('All images have loaded.');
                $('.landing-slider').remove();

                if ($this.hasClass('big-slider')) {

                    var autoplay = $this.data('autoplay'),
                        navigation = $this.data('navigation'),
                        pagination = $this.data('pagination'),
                        transition = $this.data('transition');

                    $this.owlCarousel({
                        singleItem: true,
                        autoPlay: autoplay || false, // || = if data- is empty or if it does not exists
                        transitionStyle: transition || false,
                        stopOnHover: true,
                        responsiveBaseWidth: ".slider",
                        responsiveRefreshRate: 0,
                        addClassActive: true,
                        navigation: navigation || false,
                        navigationText: [
                            "<i class='icon icon-arrow-left-simple'></i>",
                            "<i class='icon icon-arrow-right-simple'></i>"
                        ],
                        pagination: pagination || false,
                        rewindSpeed: 2000,
                    });

                }

                $this.removeClass('preload');

                if ($this.hasClass('darken')) {
                    pxImg.append(darkover);
                }
            },
            waitForAll: true
        });

    }

    if (pxContainer.length) {

        initIntro();
        introHeight();
        $(window).resize(introHeight);

    }

    /* Fixed header if there's no Big slider
     * 固定导航栏
      * */

    if (!pxWrapper.length) {

        header.addClass('fixed-header');

    }


    /* Parallax data attributes according to #intro's height
     * 轮播字体的位置
      *
      * */

    function parallax() {

        if (pxWrapper.length) {

            var touchDevice ;

            if (touchDevice) {

                body.addClass('no-parallax');

            } else if (!body.hasClass('mobile') && !body.hasClass('no-parallax')) {

                pxContainer.attr('data-anchor-target', '#intro-wrap');
                pxContainer.attr('data-top', 'transform:translateY(0px);');
                header.attr('data-anchor-target', '#intro-wrap');
                header.attr('data-top', 'transform:translateY(0px);');
                if (touchDevice) {
                    pxContainer.attr('data-top-bottom', 'transform:translateY(0px);');
                    header.attr('data-top-bottom', 'transform:translateY(0px);');
                    header.addClass('transition');
                    // console.log('Disable Parallax');

                } else {
                    pxContainer.attr('data-top-bottom', 'transform:translateY(' + '-' + pxWrapper.height() / 4 + 'px);');
                    header.attr('data-top-bottom', 'transform:translateY(' + '-' + pxWrapper.height() / 4 + 'px);');
                }
                animDone = false;

                skrollr.init({
                    forceHeight: false,
                    smoothScrolling: false,
                    mobileCheck: function () {
                        //hack - forces mobile version to be off
                        return false;
                    },
                    /* easing: 'swing', */
                    render: function () {

                        if (header.hasClass('skrollable-after')) {

                            if (!animDone) {

                                animDone = true;
                                header.addClass('fixed-header').css({
                                    'display': 'none'
                                }).fadeIn(300);

                            }

                        } else {

                            animDone = false;
                            header.removeClass('fixed-header');

                        }

                    }
                }).refresh();

                pxImgCaption.each(function () {

                    var $this = $(this);

                    $this.css({
                        top: ((pxWrapper.height() + headerHeight / 2) - $this.outerHeight()) / 2
                    });

                });

            } else {

                skrollr.init().destroy();
                content.css({
                    marginTop: 0 + 'px'
                });

                var parallaxEls = $('header, #intro'),
                    attrs = parallaxEls[0].attributes,
                    name,
                    index;

                for (index = attrs.length - 1; index >= 0; --index) {
                    name = attrs[index].nodeName;

                    if (name.substring(0, 5) === "data-") {
                        parallaxEls.removeAttr(name);
                    }

                }

                parallaxEls.css({
                    '-webkit-transform': '',
                    '-moz-transform': '',
                    'transform': '',
                    'backgroundPosition': ''
                }).removeClass('skrollable-after');

                pxImgCaption.each(function () {

                    var $this = $(this);

                    if (!body.hasClass('mobile') && body.hasClass('no-parallax')) {

                        $this.css({
                            top: ((pxWrapper.height() + headerHeight) - $this.outerHeight()) / 2
                        });

                    } else {

                        $this.css({
                            top: (pxWrapper.height() - $this.outerHeight()) / 2
                        });

                    }

                });

            }

        } else {

            if (!body.hasClass('mobile')) {

                content.css({
                    marginTop: headerHeight + 'px'
                });

            } else {

                content.css({
                    marginTop: 0
                });

            }

        }

    }

    parallax();
    $(window).resize(parallax);


    /* Submenus
    * 导航栏下拉
    * */

    var menuToggle = $('#menu-toggle'),
        headerNavUl = headerNav.children('ul'),
        liWithSub = headerNavUl.children('li:has(ul.sub-menu)'),
        ulSub = $('ul.sub-menu'),
        parent = ulSub.children('li:has(ul.sub-menu)').children('a'),
        menuArrow = '<span class="sub-arrow"><i class="fa fa-chevron-down"></i></span>';

    liWithSub.addClass('parent').children('a').append(menuArrow);
    parent.addClass('parent');

    menuToggle.click(function () {

        headerNavUl.slideToggle(200);
        $(this).children('i').toggleClass('active');

        return false;

    });

    $(window).resize(function () {

        if (!body.hasClass('mobile')) {

            headerNavUl.removeAttr('style');
            menuToggle.children('i').removeClass('active');

        }

    });


    /* Make page's odd sections darker */

    var page = $('.page'),
        pageSections = page.find('.section'),
        oddSections = pageSections.filter(':odd');

    if (body.hasClass('page') && pageSections.length > 1) {

        oddSections.addClass('greyish');

    }


    /* Overlay content absolute centering

    男神搭配
     */

    function centerOverlay() {

        var PortfolioOverlay = $('.overlay-content'),
            BlogOverlay = $('.blog-overlay');

        if (PortfolioOverlay.length) {

            PortfolioOverlay.each(function () {

                var $this = $(this),
                    itemPortfolioHeight = $this.closest('.item').height(),
                    PortfolioOverlayHeight = $this.height(),
                    PortfolioIcon = $this.children('.post-type');
                PortfolioIconHeight = PortfolioIcon.children('i').height();

                if ((PortfolioOverlayHeight + 30) > itemPortfolioHeight) {

                    $this.children('p').css({
                        'visibility': 'hidden'
                    });
                    $this.children('h2').css({
                        'visibility': 'hidden'
                    });

                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioIconHeight) / 2
                    });

                } else {

                    $this.children('p').css({
                        'visibility': 'visible'
                    });
                    $this.children('h2').css({
                        'visibility': 'visible'
                    });
                    $this.css({
                        marginTop: (itemPortfolioHeight - PortfolioOverlayHeight) / 2
                    });

                }

            });

        }

        if (BlogOverlay.length) {

            BlogOverlay.each(function () {

                var $this = $(this),
                    itemBlogHeight = $this.prev('img').height(),
                    BlogOverlayIcon = $this.children('i'),
                    BlogOverlayIconHeight = BlogOverlayIcon.height();

                BlogOverlayIcon.css({
                    top: (itemBlogHeight - BlogOverlayIconHeight) / 2
                });

            });

        }

    }

    centerOverlay();
    $(window).on('load', centerOverlay);
    $(window).on('resize', centerOverlay);


    /* fix Blog Excerpt Heights
     * 女神搭配，男神搭配板块位置
      * */

    var blogExcerpt = $('.item.column.three .blog-excerpt');

    function fixBlogH() {

        var gridW = parseInt($('.grid-items').width()),
            sizerBigW = (gridW / 100) * 48,
            sizerBigH = sizerBigW * 0.75,
            sizerSmallW = (gridW / 100) * 22.05,
            sizerSmallH = sizerSmallW * 0.75,
            difference = sizerBigH - sizerSmallH + 0.5;

        // console.log(difference);

        if (!body.hasClass('mobile')) {

            blogExcerpt.css({
                'height': difference
            });

        } else {

            blogExcerpt.css({
                'height': 'auto'
            });

        }

    }

    if (blogExcerpt.length) {

        fixBlogH();
        $(window).on('resize', fixBlogH);

    }


    /* Masonry
     * 首页男神搭配，女神搭配
      * */

    var grid = $('.grid-items');

    function masonry() {

        grid.each(function () {

            var $this = $(this),
                filterOptions = $this.prev('.filter-options'),
                sizer = $this.find('.shuffle-sizer');

            $this.append(loader);

            $this.waitForImages({

                finished: function () {

                    $this.children('.landing-els').remove();

                    $this.shuffle({
                        itemSelector: '.item',
                        sizer: sizer,
                        speed: 500,
                        easing: 'ease-out',
                    });

                    if (filterOptions.length) {

                        var btns = filterOptions.children();
                        btns.on('click', function () {
                            var $this = $(this),
                                parentGrid = filterOptions.next(grid),
                                isActive = $this.hasClass('active'),
                                group = isActive ? 'all' : $this.data('group');

                            // Hide current label, show current label in title
                            if (!isActive) {
                                $('.filter-options .active').removeClass('active');
                            }

                            $this.toggleClass('active');

                            // Filter elements
                            parentGrid.shuffle('shuffle', group);
                        });

                        btns = null;

                    }

                    $this.removeClass('preload');
                    centerOverlay();

                },
                waitForAll: true
            });

        });

    }

    if (grid.length) {

        masonry();

    }


});