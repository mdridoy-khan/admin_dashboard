(function ($) {
    "use strict";

    /* ============================================================ */
    /* PRELOADER
    /* ============================================================ */
    $(window).on('load', function() {
        $(".preloader").fadeOut();     
    });

    //=============  Mobile Menu Integration  =============\\
    function mobile_menu(selector, actionSelector) {
        var mobile_menu = $(selector);
        mobile_menu.on("click", function() {
            $(selector).toggleClass('sidemenu-open');
        });
        
        var hamburgerbtn = $(selector);
        hamburgerbtn.on("click", function() {
            $(actionSelector).toggleClass('sidemenu-open');
        });

        $(document).on('click', function(e) {
            var selectorType = $(actionSelector).add(mobile_menu);
            if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                $(actionSelector).removeClass("sidemenu-open");
                $(selector).removeClass("sidemenu-open");
            }
        });
        // $(".menu_wrapper a").on('click', function() {
        //     $('.menu_wrapper, .menu-overlay').removeClass("sidemenu-open");
        // });

    };
    mobile_menu('.navbar-toggler, .close-menu', '.mobile-menu');  



    ///============= Select2 =============\\\
    $('.select2').select2();


})(jQuery);