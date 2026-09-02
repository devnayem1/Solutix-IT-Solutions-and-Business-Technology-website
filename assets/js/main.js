/***************************************************
==================== JS INDEX ======================
****************************************************
01. Smooth Scroll Js
02. Sticky Header Js
03. Menu Controls JS
04. Preloder Js
05. Search Js
06. Back To Top Js
07. Magic Cursor Js
08. Wow Js
09. Common Js
10. Nice Select Js
11. Masonary Js
12. Nice Select Js
13. Jarallax Js
14. Magnific PopUp Js
15. Odomater Js
16. price toggle
17. Gsap Animations Js
****************************************************/

(function ($) {
	"use strict";
	var windowOn = $(window);

	////////////////////////////////////////////////////
	// 01. Smooth Scroll Js

	gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
	if($('#smooth-wrapper').length && $('#smooth-content').length){
		ScrollSmoother.create({
			smooth: .7,
			effects: true,
			smoothTouch: .1,
			ignoreMobileResize: true
		})
	}    

	////////////////////////////////////////////////////
	// 02. Sticky Header Js

    $(window).on('scroll', function () {
    var scrollTop = $(window).scrollTop();
    scrollTop < 20
        ? $('#header-sticky').removeClass('header-sticky')
        : $('#header-sticky').addClass('header-sticky');
    });

	////////////////////////////////////////////////////
	// 03.Menu Controls JS
    
    var TPMenu = {
        init: function () {
            this.mobileMenu();
            this.offcanvas();
        },
        mobileMenu: function () {
            // mobile menu 
            var tpMenuWrap = $('.tp-mobile-menu-active > ul').clone();
            var tpSideMenu = $('.tp-offcanvas-menu nav');
            tpSideMenu.append(tpMenuWrap);
            if ($(tpSideMenu).find('.sub-menu, .mega-menu').length !== 0) {
            $(tpSideMenu).find('.sub-menu, .mega-menu').parent().append('<button class="tp-menu-close"><i class="fas fa-chevron-right"></i></button>');
            }
            var sideMenuList = $('.tp-offcanvas-menu nav > ul > li button.tp-menu-close, .tp-offcanvas-menu nav > ul li.has-dropdown > a');
            $(sideMenuList).on('click', function (e) {
            e.preventDefault();
            if (!($(this).parent().hasClass('active'))) {
                $(this).parent().addClass('active');
                $(this).siblings('.sub-menu, .mega-menu').slideDown();
            } else {
                $(this).siblings('.sub-menu, .mega-menu').slideUp();
                $(this).parent().removeClass('active');
            }
            });
        },
        offcanvas: function () {
            // offcanvas 
            $(".tp-offcanvas-toogle").on('click', function(){
                $(".tp-offcanvas").addClass("tp-offcanvas-open");
                $(".tp-offcanvas-overlay").addClass("tp-offcanvas-overlay-open");
            });
            $(".tp-offcanvas-close-toggle,.tp-offcanvas-overlay").on('click', function(){
                $(".tp-offcanvas").removeClass("tp-offcanvas-open");
                $(".tp-offcanvas-overlay").removeClass("tp-offcanvas-overlay-open");
            });
        }
    };
    document.addEventListener("DOMContentLoaded", () => {
        const currentPage = window.location.pathname.split("https://html.aqlova.com/").pop() || "index.html";

        document.querySelectorAll(".tp-mobile-menu-active a").forEach(link => {
            const href = link.getAttribute("href");

            if (href === currentPage) {
                // Current menu item active
                link.parentElement.classList.add("active");

                // Parent menu active (if submenu item)
                const subMenu = link.closest(".sub-menu");
                if (subMenu) {
                    subMenu.parentElement.classList.add("active");
                }
            }
        });
    });
	////////////////////////////////////////////////////
	// 04. Preloder Js

	$(window).on('load', function () {
		$("#preloader").fadeOut(500);
	});
	$(window).on('load', function () {
		$("#loading").fadeOut(500);
	});
    $(function () {
        TPMenu.init();
    });
	////////////////////////////////////////////////////
	// 05. Search Js

	$(".tp-search-click").on("click", function () {
		$(".tp-search-form-toggle").addClass("active");
		$(".tp-search-body-overlay").addClass("active");
	});

	$(".tp-search-close,.tp-search-body-overlay").on("click", function () {
		$(".tp-search-form-toggle").removeClass("active");
		$(".tp-search-body-overlay").removeClass("active");
	});
    
	////////////////////////////////////////////////////
	// 06. Back To Top Js

    var backToTopBtn     = $('#back_to_top');
    var backToTopWrapper = $('.back-to-top-wrapper');
    $(window).on('scroll', function () {
        $(window).scrollTop() > 300
            ? backToTopWrapper.addClass('back-to-top-btn-show')
            : backToTopWrapper.removeClass('back-to-top-btn-show');
    });
    $(backToTopBtn).on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, '300');
    });

	////////////////////////////////////////////////////
	// 07. Magic Cursor Js

    if ($("body").not(".is-mobile").hasClass("tp-magic-cursor")) {
        $(".tp-magnetic-item").wrap('<div class="tp-magnetic-wrap"></div>');

        if ($("a.tp-magnetic-item").length) {
            $("a.tp-magnetic-item").addClass("not-hide-cursor");
        }

        var $mouse = { x: 0, y: 0 };
        var $pos = { x: 0, y: 0 };
        var $ratio = 0.15;
        var $active = false;
        var $ball = $("#ball");

        var $ballWidth = 14;
        var $ballHeight = 14;
        var $ballScale = 1;
        var $ballOpacity = 1;
        var $ballBorderWidth = 1;

        gsap.set($ball, {
            xPercent: -50,
            yPercent: -50,
            width: $ballWidth,
            height: $ballHeight,
            borderWidth: $ballBorderWidth,
            opacity: $ballOpacity
        });

        document.addEventListener("mousemove", mouseMove);

        function mouseMove(e) {
            $mouse.x = e.clientX;
            $mouse.y = e.clientY;
        }

        gsap.ticker.add(updatePosition);

        function updatePosition() {
            if (!$active) {
                $pos.x += ($mouse.x - $pos.x) * $ratio;
                $pos.y += ($mouse.y - $pos.y) * $ratio;
                gsap.set($ball, { x: $pos.x, y: $pos.y });
            }
        }

        $(".tp-magnetic-wrap").on("mousemove", function(e) {
            parallaxCursor(e, this, 2);
            callParallax(e, this);
        });

        function callParallax(e, parent) {
            parallaxIt(e, parent, parent.querySelector(".tp-magnetic-item"), 25);
        }

        function parallaxIt(e, parent, target, movement) {
            var boundingRect = parent.getBoundingClientRect();
            var relX = e.clientX - boundingRect.left;
            var relY = e.clientY - boundingRect.top;

            gsap.to(target, {
                duration: 0.3,
                x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
                y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
                ease: Power2.easeOut
            });
        }

        function parallaxCursor(e, parent, movement) {
            var rect = parent.getBoundingClientRect();
            var relX = e.clientX - rect.left;
            var relY = e.clientY - rect.top;
            $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
            $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
            gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
        }

        $(".tp-magnetic-wrap").on("mouseenter", function() {
            gsap.to($ball, { duration: 0.3, scale: 2, borderWidth: 1, opacity: $ballOpacity });
            $active = true;
        }).on("mouseleave", function() {
            gsap.to($ball, { duration: 0.3, scale: $ballScale, borderWidth: $ballBorderWidth, opacity: $ballOpacity });
            gsap.to(this.querySelector(".tp-magnetic-item"), { duration: 0.3, x: 0, y: 0, clearProps:"all" });
            $active = false;
        });

        // Cursor hover view from CSS variable
        $("[data-cursor]").each(function() {
            var $this = $(this);
            var color = getComputedStyle(this).getPropertyValue('--cursor-color').trim() || '#fff';

            $this.on("mouseenter", function() {
                $("#ball").addClass("with-blur");
                $ball.append('<div class="ball-view"></div>');
                $(".ball-view").append($this.attr("data-cursor"));

                gsap.to($ball, {
                    duration: 0.3,
                    xPercent: is_rtl() ? 50 : -50,
                    yPercent: -60,
                    width: 110,
                    height: 110,
                    opacity: 1,
                    borderWidth: 0,
                    zIndex: 1,
                    backdropFilter: "blur(14px)",
                    backgroundColor: color,
                });

                gsap.to(".ball-view", { duration: 0.3, scale: 1, autoAlpha: 1 });
            }).on("mouseleave", function() {
                gsap.to($ball, {
                    duration: 0.3,
                    yPercent: -50,
                    width: $ballWidth,
                    height: $ballHeight,
                    opacity: $ballOpacity,
                    borderWidth: $ballBorderWidth,
                    backgroundColor: "#000"
                });

                gsap.to(".ball-view", { duration: 0.3, scale: 0, autoAlpha: 0, clearProps:"all" });
                $ball.find(".ball-view").remove();
            });

            $this.addClass("not-hide-cursor");
        });

        // Hide cursor on certain elements
        $("a, button").not('.cursor-hide').on("mouseenter", function() {
            gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
        }).on("mouseleave", function() {
            gsap.to($ball, { duration: 0.3, scale: $ballScale, opacity: $ballOpacity });
        });

        $("a").not('[target="_blank"], .cursor-hide, [href^="#"], [href^="mailto"], [href^="tel"], .lg-trigger, .tp-btn-disabled a')
            .on('click', function() {
                gsap.to($ball, { duration: 0.3, scale: 1.3, autoAlpha: 0 });
            });

        // Document enter/leave
        $(document).on("mouseleave", function() {
            gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 0 });
        }).on("mouseenter", function() {
            gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
        }).on("mousemove", function() {
            gsap.to("#magic-cursor", { duration: 0.3, autoAlpha: 1 });
        });
    }
    function is_rtl() {
        return $('html').attr('dir') === 'rtl';
    }
	////////////////////////////////////////////////////
	// 08. Wow Js

	new WOW().init();

	////////////////////////////////////////////////////
	// 09. Common Js

	$("[data-background").each(function () {
		$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
	});

	$("[data-width]").each(function () {
		$(this).css("width", $(this).attr("data-width"));
	});

	$("[data-bg-color]").each(function () {
		$(this).css("background-color", $(this).attr("data-bg-color"));
	});

	$("[data-text-color]").each(function () {
		$(this).css("color", $(this).attr("data-text-color"));
	});

	////////////////////////////////////////////////////
	// 10. Nice Select Js

	$('.tp-select select').niceSelect();

	////////////////////////////////////////////////////
	// 11. Masonary Js

	$('.grid').imagesLoaded(function () {
		var $grid = $('.grid').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item',
			}
		});

		// filter items on button click
		$('.masonary-menu').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

		//for menu active class
		$('.masonary-menu button').on('click', function (event) {
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');
			event.preventDefault();
		});

	});

    if ($('.tp-portfolio-load-more').length > 0) {

        var show_item = parseInt($('.tp-portfolio-load-more').attr('data-show'), 10) || 4;
        var count_item = show_item;

        $('.grid').imagesLoaded(function () {

            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item'
                }
            });

            // Load More Function
            function loadMore(showing) {

                var iso = $grid.data('isotope');

                if (!iso) return;

                // First show all filtered items
                $(iso.filteredItems).each(function () {
                    $(this.element).show();
                });

                // Hide extra items
                $(iso.filteredItems).each(function (index) {
                    if (index >= showing) {
                        $(this.element).hide();
                    }
                });

                // Refresh isotope
                $grid.isotope('layout');

                // Button show/hide
                if (iso.filteredItems.length <= showing) {
                    $('#tp-load-more').hide();
                } else {
                    $('#tp-load-more').show();
                }
            }

            // Initial Load
            loadMore(show_item);

            // Filter
            $('.masonary-menu').on('click', 'button', function () {

                var filterValue = $(this).attr('data-filter');

                $('.masonary-menu button').removeClass('active');
                $(this).addClass('active');

                count_item = show_item;

                $grid.isotope({
                    filter: filterValue
                });

                $grid.one('arrangeComplete', function () {
                    loadMore(show_item);
                });

            });

            // Load More Click
            $('#tp-load-more').on('click', function (e) {

                e.preventDefault();

                count_item += show_item;

                loadMore(count_item);

            });

            // Window Resize Fix
            $(window).on('resize', function () {
                $grid.isotope('layout');
            });

        });
    }


	////////////////////////////////////////////////////
	// 12. Jarallax Js
    jarallax(document.querySelectorAll('.jarallax'), {
    speed: 0.2
    })

	////////////////////////////////////////////////////
	// 13. Magnific PopUp Js

	$('.popup-image').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});

	$(".popup-video").magnificPopup({
		type: "iframe",
	});

	$('.tp-portfolio-item').on('mouseenter', function(){
		$('.tp-portfolio-item').removeClass('active');
		$(this).addClass('active');
	});

	// it-faq-accordion //
	$('.it-faq-accordion, .accordion-items').on("click", function(){
		$(this).addClass('faq-active').siblings().removeClass('faq-active');
	});


	////////////////////////////////////////////////////
	// 14. Odomater Js

    windowOn.on('load', function () {
        $('.odometer').each(function () {
            var $this = $(this);
            $this.waypoint(function (direction) {
                if (direction === 'down' && !$this.hasClass('loaded')) {
                    $this.html($this.data('count'));
                    $this.addClass('loaded');
                }
            }, { offset: '90%' });
        });
    });

	////////////////////////////////////////////////////
	// 15.price toggle

	function tabtable_active_1() {
		const $elements = {
			monthly: $("#tp-nav-monthly"),
			yearly: $("#tp-nav-yearly"),
			switcher: $("#tp-switcher-input"),
			tabMonthly: $("#tp-tab-monthly"),
			tabYearly: $("#tp-tab-yearly")
		};

		const setActive = isMonthly => {
			$elements.switcher.prop("checked", isMonthly);
			$elements.monthly.toggleClass("is-active", isMonthly);
			$elements.yearly.toggleClass("is-active", !isMonthly);
			$elements.tabMonthly.toggleClass("tp-tab-hide", !isMonthly);
			$elements.tabYearly.toggleClass("tp-tab-hide", isMonthly);
		};

		[$elements.monthly, $elements.yearly].forEach($el =>
			$el.on("click", () => setActive($el.is($elements.monthly)))
		);

		$elements.switcher.on("click", () =>
			setActive(!$elements.monthly.hasClass("is-active"))
		);
	}
	if ($("#tp-nav-monthly").length) tabtable_active_1();

	////////////////////////////////////////////////////
	// 16. Gsap Animations Js

    // project slider 
    if (document.querySelector(".project-slider-wrap")) {
        const pr = ScrollTrigger.matchMedia();
        pr.add("(min-width: 1199px)", () => {
            const sections = document.querySelectorAll(".project-slider-panel");
            const wrap = document.querySelector(".project-slider-wrap");
            if (!sections.length || !wrap) return;
            // Initial state
            gsap.set(sections, { scale: 1 });
            // Animate each section except the last one
            sections.forEach((section, index) => {
                const isLast = index === sections.length - 1;
                gsap.to(section, {
                    scale: isLast ? 1 : 1, 
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 15%",
                        end: "bottom bottom",
                        scrub: true,
                        pin: true,
                        pinSpacing: false,
                        endTrigger: wrap,
                        
                    },
                });
            });

            // Cleanup on condition change
            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            };
        });
    }

    // circle text 
    gsap.to(".circle-text-3", {
        rotationX: 360,
        duration: 9,
        repeat: -1,
        ease: "linear"
    });
    // circle text 
    gsap.to(".circle-text-2", {
        rotationY: 360,
        duration: 6,
        repeat: -1,
        ease: "linear"
    });
    // circle text 
    gsap.to(".circle-text", {
        rotation: 360,
        duration: 7,
        repeat: -1,
        ease: "linear"
    });

	// 28. fade-class-active //
	if ($(".tp_fade_anim").length > 0) {
		gsap.utils.toArray(".tp_fade_anim").forEach((item) => {
			let tp_fade_offset = item.getAttribute("data-fade-offset") || 40,
				tp_duration_value = item.getAttribute("data-duration") || 0.75,
				tp_fade_direction = item.getAttribute("data-fade-from") || "bottom",
				tp_onscroll_value = item.getAttribute("data-on-scroll") || 1,
				tp_delay_value = item.getAttribute("data-delay") || 0.15,
				tp_ease_value = item.getAttribute("data-ease") || "power2.out",
				tp_anim_setting = {
					opacity: 0,
					ease: tp_ease_value,
					duration: tp_duration_value,
					delay: tp_delay_value,
					x: (tp_fade_direction === "left" ? -tp_fade_offset : (tp_fade_direction === "right" ? tp_fade_offset : 0)),
					y: (tp_fade_direction === "top" ? -tp_fade_offset : (tp_fade_direction === "bottom" ? tp_fade_offset : 0)),
			    };
			if (tp_onscroll_value === 1) {
				tp_anim_setting.scrollTrigger = {
					trigger: item,
					start: 'top 85%',
				};
			}
			gsap.from(item, tp_anim_setting);
		});
	}

    // 51. zoom in //
	$(".anim-zoomin").each(function() {
		// Add wrap <div>.
		$(this).wrap('<div class="anim-zoomin-wrap"></div>');
		// Add overflow hidden.
		$(".anim-zoomin-wrap").css({ "overflow": "hidden" })

		let $this = $(this);
		let $asiWrap = $this.parents(".anim-zoomin-wrap");

		let tp_ZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $asiWrap,
				start: "top 100%",
				
			}
		});
		tp_ZoomIn.from($this, { duration: 2, autoAlpha: 0, scale: 1.2, ease: Power2.easeOut, clearProps:"all" });
	});

    // 51. zoom in //
	$(".anim-zoomin-2").each(function() {
		// Add wrap <div>.
		$(this).wrap('<div class="anim-zoomin-wrap-2"></div>');
		// Add overflow hidden.
		$(".anim-zoomin-wrap-2").css({ "overflow": "hidden" })

		let $this = $(this);
		let $asiWrap = $this.parents(".anim-zoomin-wrap-2");

		let tp_ZoomIn = gsap.timeline({
			scrollTrigger: {
				trigger: $asiWrap,
				start: "top 100%",
				
			}
		});
		tp_ZoomIn.from($this, { duration: 2, autoAlpha: 0, scale: 1.4, ease: "power4.inOut", clearProps:"all" });
	});

    // choose_addClass
    let $addClass = $(".choose_addClass");
    ScrollTrigger.create({
        trigger: $addClass,
        start: "top 100%",
        onEnter: () => $addClass.addClass("active")
    });

	// 54. tp-text-revel-anim //
	const tp_anim_reveal = document.querySelectorAll(".text-line-anim");
	tp_anim_reveal.forEach(areveal => {
		const getAttributeValue = (attr, defaultValue) => areveal.getAttribute(attr) || defaultValue;
		const duration_value = parseFloat(getAttributeValue("data-duration", 1));
		const onscroll_value = parseInt(getAttributeValue("data-on-scroll", 1), 10);
		const stagger_value = parseFloat(getAttributeValue("data-stagger", 0.02));
		const data_delay = parseFloat(getAttributeValue("data-delay", 0.05));
		const ease_value = getAttributeValue("data-ease", "circ.out");

		areveal.split = new SplitText(areveal, { type: "lines,words,chars", linesClass: "tp-revel-line" });
		const animationProps = {
			duration: duration_value,
			delay: data_delay,
			ease: ease_value,
			y: 80,
			stagger: stagger_value,
			opacity: 0,
		};
		if (onscroll_value === 1) {
			areveal.anim = gsap.from(areveal.split.chars, {
				scrollTrigger: {
					trigger: areveal,
					start: 'top 80%',
				},
				...animationProps,
			});
		} else {
			areveal.anim = gsap.from(areveal.split.chars, animationProps);
		}
	});

    // paralax 
    const pr = ScrollTrigger.matchMedia();
    pr.add("(min-width: 1199px)", () => {
        var parallaxItems = document.querySelectorAll('[data-parallax-y], [data-parallax-x], [data-parallax-rotate]');
        parallaxItems.forEach(function (item) {
            var yVal = item.getAttribute('data-parallax-y') || 0;
            var xVal = item.getAttribute('data-parallax-x') || 0;
            var scrubVal = item.getAttribute('data-parallax-scrub') || 1;
            var rotateVal = item.getAttribute('data-parallax-rotate') || 0;

            gsap.to(item, {
                y: yVal,
                x: xVal,
                rotation: rotateVal,
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: parseFloat(scrubVal),
                }
            });
        });
    });

    // moving_text
    function moving_text() {
        if ($('.moving-text').length > 0) {
        gsap.utils.toArray('.moving-text').forEach((section) => {
                const w = section.querySelector('.wrapper-text');
                gsap.fromTo(w, { 
                    x: 0,
                }, {
                    x: -800,
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom", 
                        end: "bottom top",   
                        scrub: 2, 
                        invalidateOnRefresh: true
                    }
                });
            });
        }
    }
    $(window).on('load', function() {
        moving_text();
    });

    // card-anim 
    function initCards() {
    const cards = document.querySelectorAll('.cards-item');
    const container = document.getElementById('cardsContainer');
    if (!container || cards.length === 0) return;
    const totalCards = cards.length;

    function getOverlapMargin() {
        const containerW = container.offsetWidth;
        const singleCardW = containerW / totalCards;
        return Math.min(-100, -(singleCardW * 0.25));
    }
    const overlapPx = getOverlapMargin();
    cards.forEach((card, i) => {
        if (i < totalCards - 1) {
        gsap.set(card, {
            marginRight: overlapPx,
            rotation: 5,
            transformOrigin: 'bottom center'
        });
        }
    });

    const tl = gsap.timeline({
        scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        end: 'bottom 80%',
        scrub: 1.2,
        toggleActions: 'play none none reverse',
        }
    });

    cards.forEach((card, i) => {
        if (i < totalCards - 1) {
        tl.to(card, {
            marginRight: 0,
            rotation: 0,
            duration: 1,
            ease: 'power2.out'
        }, i * 0.15);
        }
    });
    }

    // dots-anim
    window.addEventListener('load', initCards);
    window.addEventListener('resize', () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    initCards();
    });

    (function () {
        const svg = document.getElementById("main-svg");
        if( svg !== null){
        const dots = Array.from(svg.querySelectorAll(".dot"));
        const RADIUS = 80;
        const dotPositions = dots.map(dot => {
            const x = parseFloat(dot.getAttribute("x")) || 0;
            const y = parseFloat(dot.getAttribute("y")) || 0;
            const w = parseFloat(dot.getAttribute("width")) || 0;
            const h = parseFloat(dot.getAttribute("height")) || 0;
            return {
                cx: x + w / 2,
                cy: y + h / 2
            };
        });
        // Store original rotation
        const originalRotations = dots.map(dot => {
            const transform = dot.getAttribute("transform") || "";
            const match = transform.match(/rotate\(([-\d.]+)/);
            return match ? parseFloat(match[1]) : 0;
        });
        function getSVGCoords(e) {
            const rect = svg.getBoundingClientRect();

            const clientX = e.touches
                ? e.touches[0].clientX
                : e.clientX;

            const clientY = e.touches
                ? e.touches[0].clientY
                : e.clientY;

            const viewBox = svg.viewBox.baseVal;

            return {
                x: ((clientX - rect.left) / rect.width) * viewBox.width,
                y: ((clientY - rect.top) / rect.height) * viewBox.height
            };
        }
        function animateDots(mx, my) {
            dots.forEach((dot, index) => {
                const { cx, cy } = dotPositions[index];

                const dx = cx - mx;
                const dy = cy - my;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < RADIUS) {

                    if (!dot.dataset.rotated) {
                        dot.dataset.rotated = "true";

                        gsap.to(dot, {
                            rotation: originalRotations[index] + 190,
                            transformOrigin: "50% 50%",
                            duration: 0.4,
                            ease: "power2.out",
                            overwrite: true
                        });
                    }

                } else {
                    delete dot.dataset.rotated;
                }
            });
        }
        svg.addEventListener("mousemove", e => {
            const { x, y } = getSVGCoords(e);
            animateDots(x, y);
        });
        svg.addEventListener("touchmove", e => {
            e.preventDefault();
            const { x, y } = getSVGCoords(e);
            animateDots(x, y);
        }, { passive: false });
        svg.addEventListener("mouseleave", () => {
            dots.forEach((dot, index) => {
                delete dot.dataset.rotated;
                gsap.to(dot, {
                    rotation: originalRotations[index],
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: true
                });
            });

        });
        }

    })();

    function floatingDots(svgSelector, dotsSelector) {
        const svg = document.querySelector(svgSelector);
        if (!svg) return;
        const dots = svg.querySelectorAll(dotsSelector);
        dots.forEach((dot, i) => {
            const bx = +dot.dataset.bx;
            const by = +dot.dataset.by;
            let angle = (i / dots.length) * Math.PI * 2;
            gsap.ticker.add(() => {
                angle += 0.01;
                dot.setAttribute(
                    "cx",
                    bx + Math.cos(angle) * (3 + (i % 5) * 2.5)
                );
                dot.setAttribute(
                    "cy",
                    by + Math.sin(angle) * (2 + (i % 4) * 2.5)
                );
            });
        });
    }

    floatingDots("#mainSvg", "#g0 circle, #g1 circle,#g3 path", {
        speed: 0.01,
        radiusX: 8,
        radiusY: 6
    });

    // tp-floating-dots
    document.querySelectorAll(".tp-floating-dots").forEach(wrapper => {
        wrapper.querySelectorAll(".tp-floating-item").forEach((item, i) => {
            gsap.to(item, {
                x: gsap.utils.random(-8, 8),
                y: gsap.utils.random(-8, 8),
                duration: gsap.utils.random(2, 4),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1
            });
        });
    });

    // char-animate
    gsap.utils.toArray(".char-animate-wrap").forEach((section) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 60%", 
                toggleActions: "play none none none"
            }
        });
        const animateMe = section.querySelectorAll(".char-animate");
        animateMe.forEach((chunk) => {
            const split = new SplitText(chunk, {
                type: "words",
                charsClass: "char",
                wordsClass: "word++"
            });
            tl.from(split.words, {
                autoAlpha: 0,
                duration: 1,
                stagger: 0.1,
            });
        });
    });

    // reval-line
    if (document.querySelector('.reval-line')) {
        gsap.registerPlugin(SplitText, ScrollTrigger);
        document.querySelectorAll('.reval-line').forEach(function (el) {
            var split = new SplitText(el, {
            type      : 'lines,words,chars',
            linesClass: 'split-line'
            });
            gsap.set(split.chars, { opacity: 0.3, x: -7 });
            gsap.to(split.chars, {
            scrollTrigger: {
                trigger: el,
                start  : el.getAttribute('data-rt-start')  || 'top 80%',
                end    : el.getAttribute('data-rt-end')    || 'top 20%',
                toggleActions: 'play none none none',
                scrub  : 1,
                markers: false
            },
            x      : 0,
            opacity: 1,
            stagger: parseFloat(el.getAttribute('data-rt-stagger'))  || 0.2,
            duration: parseFloat(el.getAttribute('data-rt-duration')) || 0.7
            });
        });
    }

	// 27. carachter Animation //
	if ($('.tp-char-animation').length > 0) {
		let char_come = gsap.utils.toArray(".tp-char-animation");
		char_come.forEach(splitTextLine => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: splitTextLine,
					start: 'top 90%',
					end: 'bottom 60%',
					scrub: false,
					toggleActions: 'play none none none'
				}
			});
			const itemSplitted = new SplitText(splitTextLine, { type: "chars, words" });
			gsap.set(splitTextLine, { perspective: 300 });
			itemSplitted.split({ type: "chars, words" })
			tl.from(itemSplitted.chars,
				{
					duration: 1,
					delay: 0.6,
					x: 100,
					autoAlpha: 0,
					stagger: 0.05
				});
		});
	}

    // work-anim
    $(function () {
        if ($(".tp-work-anim").length) {
            const items = [];
            const wrapper = document.querySelector(".tp-work-wrapper");

            if (!wrapper) {
                return;
            }

            gsap.utils.toArray(".tp-work-anim").forEach((item) => {
                const speedX = parseFloat(item.getAttribute("data-speed-x")) || 2;
                const speedY = parseFloat(item.getAttribute("data-speed-y")) || 2;
                const directionX = item.getAttribute("data-direction-x") || "right";
                const directionY = item.getAttribute("data-direction-y") || "down";

                // item কে absolute করো
                item.style.position = "absolute";

                const rect = item.getBoundingClientRect();
                const wrapperRect = wrapper.getBoundingClientRect();

                const startX = rect.left - wrapperRect.left;
                const startY = rect.top - wrapperRect.top;

                // item এর original position set করো
                item.style.left = startX + "px";
                item.style.top = startY + "px";

                items.push({
                    el: item,
                    wrapper,
                    x: startX,
                    y: startY,
                    originX: startX,
                    originY: startY,
                    vx: directionX === "left" ? -speedX : speedX,
                    vy: directionY === "up" ? -speedY : speedY
                });
            });

            gsap.ticker.add(() => {
                items.forEach((state) => {
                    const wrapperRect = state.wrapper.getBoundingClientRect();
                    const maxX = wrapperRect.width - state.el.offsetWidth;
                    const maxY = wrapperRect.height - state.el.offsetHeight;

                    state.x += state.vx;
                    state.y += state.vy;

                    if (state.x <= 0) { state.x = 0; state.vx = Math.abs(state.vx); }
                    if (state.x >= maxX) { state.x = maxX; state.vx = -Math.abs(state.vx); }
                    if (state.y <= 0) { state.y = 0; state.vy = Math.abs(state.vy); }
                    if (state.y >= maxY) { state.y = maxY; state.vy = -Math.abs(state.vy); }

                    gsap.set(state.el, {
                        left: 0,
                        top: 0,
                        x: state.x,
                        y: state.y
                    });
                });
            });
        }
    });

    // perspective-slider
	function perspective() {
        if ($('.tp-perspective-slider').length) {
            gsap.set('.tp-perspective-slider', { perspective: 150 });
            $('.tp-perspective-slider .tp-perspective-image').each(function () {
                var slide = $(this);
                gsap.fromTo(this, {
                    scaleX: .8,
                    z: '0vh',
                }, {
                    scaleX: 1,
                    z: '1vh',
                    scrollTrigger: {
                        trigger: slide,
                        start: "top+=0px bottom",
                        end: "bottom top",
                        immediateRender: false,
                        scrub: 0.1,
                    }
                });
            });

        }
    }
    perspective()
    
    // word_brok_anim
    const words = new SplitText(".word_brok_anim", { type: "words" }).words;
    gsap.from(words, {
    scrollTrigger: {
        trigger: ".word_brok_anim",
        start: "top 80%",
        once: true
    },
    yPercent: i => i % 2 ? 100 : -100,
    opacity: 0,
    duration: 1,
    stagger: 0,
    ease: "circ.out"
    });

    // wave_anim
    (function () {
        const VERT = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;
        const FRAG = `
            uniform sampler2D uTex;
            uniform float uProgress;
            varying vec2 vUv;
            void main() {
                float wave =
                    sin(vUv.y * 10.0) * 0.03 +
                    sin(vUv.y * 24.0) * 0.015;
                float front = uProgress + wave;
                float diff  = front - vUv.x;
                float prox = exp(-abs(diff) * 50.0);
                float dispX = prox * 0.08;
                float dispY = sin(vUv.y * 20.0) * prox * 0.04;
                vec2 uv = clamp(
                    vUv + vec2(dispX, dispY),
                    0.001,
                    0.999
                );
                vec4 col = texture2D(uTex, uv);
                gl_FragColor = col;
            }
        `;
        document.querySelectorAll(".wave_anim").forEach((thumb) => {
            const imgEl   = thumb.querySelector("img");
            const videoEl = thumb.querySelector("video");
            const isVideo = !!videoEl && !imgEl;
            const mediaEl = isVideo ? videoEl : imgEl;
            if (!mediaEl) return;

            thumb.style.position = "relative";

            const glWrapper = document.createElement("div");
            glWrapper.style.cssText = `
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:1;
            `;
            thumb.appendChild(glWrapper);
            mediaEl.style.opacity = "0";

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.domElement.style.cssText = "width:100%;height:100%;display:block;";
            glWrapper.appendChild(renderer.domElement);

            const scene  = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 10);
            camera.position.z = 1;

            function resize() {
                renderer.setSize(thumb.offsetWidth, thumb.offsetHeight, false);
            }
            resize();
            new ResizeObserver(resize).observe(thumb);

            let texture;
            if (isVideo) {
                videoEl.muted       = true;
                videoEl.playsInline = true;
                videoEl.loop        = true;
                videoEl.play().catch(() => {});
                texture = new THREE.VideoTexture(videoEl);
            } else {
                texture = new THREE.TextureLoader().load(imgEl.src, resize);
            }
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTex:      { value: texture },
                    uProgress: { value: -0.3 }
                },
                vertexShader:   VERT,
                fragmentShader: FRAG
            });

            const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
            scene.add(mesh);

            function triggerIn() {
                gsap.killTweensOf(mesh.scale);
                gsap.to(mesh.scale, { x: 1.1, y: 1.1, duration: 1.5, ease: "power2.out" });

                gsap.killTweensOf(material.uniforms.uProgress);
                material.uniforms.uProgress.value = -0.3;
                gsap.to(material.uniforms.uProgress, { value: 1.3, duration: 1.5, ease: "power2.out" });
            }

            function triggerOut() {
                gsap.killTweensOf(mesh.scale);
                gsap.to(mesh.scale, { x: 1, y: 1, duration: 2, ease: "power2.out" });
            }

            const wrapperArea = thumb.closest(".wave_anim_wrap");
            if (wrapperArea) {
                wrapperArea.addEventListener("mouseenter", triggerIn);
                wrapperArea.addEventListener("mouseleave", triggerOut);
            } else {
                thumb.addEventListener("mouseenter", triggerIn);
                thumb.addEventListener("mouseleave", triggerOut);
            }

            function render() {
                requestAnimationFrame(render);
                renderer.render(scene, camera);
            }
            render();
        });
    })();

	gsap.utils.toArray("[data-speed-x]").forEach(el => {
		const speedX = parseFloat(el.dataset.speedX) || 0;
		let st; 

		st = ScrollTrigger.create({
			trigger: el,
			scrub: true,
			onUpdate: (self) => {
			const progress = self.progress;
			const move = progress * speedX * 300;
			gsap.to(el, { x: -move, overwrite: true, duration: 0 });
			}
		});
	});
})(jQuery);