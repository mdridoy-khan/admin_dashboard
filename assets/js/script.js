(function ($) {
    "use strict";

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
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
            $(selector).toggleClass('sidebar_collapsed');
        });
        
        var hamburgerbtn = $(selector);
        hamburgerbtn.on("click", function() {
            $(actionSelector).toggleClass('sidebar_collapsed');
        });

        $(document).on('click', function(e) {
            var selectorType = $(actionSelector).add(mobile_menu);
            if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
                $(actionSelector).removeClass("sidebar_collapsed");
                $(selector).removeClass("sidebar_collapsed");
            }
        });
        // $(".menu_wrapper a").on('click', function() {
        //     $('.menu_wrapper, .menu-overlay').removeClass("sidemenu-open");
        // });

    };
    mobile_menu('.sidebarToggler', '.sidebar');  



    ///============= Select2 =============\\\
    $('.select2').select2();


})(jQuery);