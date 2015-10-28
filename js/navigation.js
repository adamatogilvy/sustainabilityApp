if(!GSA){
    var GSA = {}
}
GSA.globalNavigations = new function() {
    var navigation = $('.primary-nav');
    var logoHeight = $('.navbar-brand').height();
    var firstLevelNav = $('#main-nav > li');

    this.navAlign = function() {
        firstLevelNav.height(logoHeight);
        setTimeout(function() {
            $('ul#main-nav > li > a').verticalAlign();
        }, 1);
    };

    this.hoverTransitions = function() {
        var secondLevel = $('ul#main-nav > li > .dropdown-menu > li > ul');
        var firstLevel = $('ul#main-nav > li > .dropdown-menu');

        hoverState(secondLevel, '#fff', '#fff', '#fff', '#fff');
        hoverState(firstLevel, '#fff', '#fff', '#fff', '#fff');


        function hoverState(theLevel, levelThreeHoverBGColor, levelThreeBGColor, levelTwoHoverBorder, levelTwoBorder) {
            theLevel.hover(function() {
                secondLevel.css('border-right', '1px solid ' + levelTwoHoverBorder)
            }, function() {
                secondLevel.css('border-right', '1px solid ' + levelTwoBorder)
            })
        }
    };

    this.searchToggle = function() {
        $('body').on('click', '#main-nav-search-button', function(e) {
            e.preventDefault();
            $('.main-nav-search-field').slideToggle(300);
            $('.search-input #query').focus();
        });
    };
    this.toggleMenu = function() {
        "use strict";
        var toggles = document.querySelectorAll(".cmn-toggle-switch");

        for (var i = toggles.length - 1; i >= 0; i--) {
            var toggle = toggles[i];
            toggleHandler(toggle);
        };

        function toggleHandler(toggle) {
            toggle.addEventListener("click", function(e) {
                e.preventDefault();
                (this.classList.contains("active") === true) ? this.classList.remove("active"): this.classList.add("active");
            });
        }

        $('#mobile-header').on('click', '#hamburger-toggle', function() {
            $(this).addClass('toggled');
            var windowHeight = $(window).height();
            if ($(this).hasClass('toggled-off')) {
                $(this).toggleClass('toggled-on toggled-off');
                $('body > *').not('#mobile-header').animate({
                    opacity: 0.1
                }, 300);
                $('#slideout-menu').css('max-height', windowHeight - 20).slideDown(300);
            } else if ($(this).hasClass('toggled-on')) {
                $(this).toggleClass('toggled-off toggled-on');
                $('body > *').not('#mobile-header').animate({
                    opacity: 1
                }, 300);
                $('#slideout-menu').slideUp(300);
            }
        });

        $('body').on('click', '.toggle-submenu > span', function(e) {
            e.preventDefault();
            var $linkBlock = $(this).parent('a');
            $(this).toggleClass('icon-arrow-up', 'icon-arrow-down');
            $linkBlock.toggleClass('active');
            $linkBlock.next('ul').slideToggle(300);
        });

        $('body').on('click', '.toggle-second-level-submenu > span', function(e) {
            e.preventDefault();
            var $linkBlock = $(this).parent('a');
            $(this).toggleClass('icon-arrow-up', 'icon-arrow-down');
            $linkBlock.toggleClass('active');
            $linkBlock.next('ul').slideToggle(300);
        });

    }

    this.searchFieldWidth = function() {
        $('#mobile-search').stop().animate({
            width: $(window).width() - 100
        }, 300);
    }
};

/* /////////////////////////
    DOCUMENT READY        ///
/////////////////////////*/

$(function(){
	
	//NAVIGATION
	GSA.globalNavigations.toggleMenu();
    GSA.globalNavigations.hoverTransitions();
    GSA.globalNavigations.searchFieldWidth();
    GSA.globalNavigations.searchToggle();
	$(window).resize(function() {
        GSA.globalNavigations.searchFieldWidth();
	});
});