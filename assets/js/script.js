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


    // Upload Create Team Thumbnail Image
    function upload_thumbnail(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#teamThumb').attr('src', e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
            $('.thumbnails_upload-wrapper').addClass('image_uploaded');
        }
    }
    $('.remove_image').on('click', function() {
        $(this).parents('.thumbnails_upload-wrapper').find('input').val('');
        $(this).parent().find('img').attr('src', 'assets/img/placeholder-image.png');
        $(this).parents('.thumbnails_upload-wrapper').removeClass('image_uploaded');
    });
    $(document).on('change','#upload_teamThumbnail' , function(){ 
        upload_thumbnail(this); 
    });

    // Toggle Auto suggestion teammate collapse function
    $(document).ready(function() {
        $('.addTeamMate').on('input', function() {
            if ($(this).val().trim() !== '') {
                $('.suggested_team').collapse('show');
            } else {
                $('.suggested_team').collapse('hide');
            }
        });
    });

    ///============= Select2 =============\\\
    $('.select2').select2();

    function socialmedia(newcount){
        var items = `<div class="social_link_item">
            <div class="row gx-3">
                <div class="col-5">
                    <input type="text" name="socialMedia[${newcount}]['name']" placeholder="Social Name" value="" class="form-control">
                </div>
                <div class="col-5">
                    <input type="url" class="form-control" name="socialMedia[${newcount}][url]" placeholder="url">
                </div>
                <div class="col-2">
                    <div class="form-check justify-content-center">
                        <input class="form-check-input" name="socialMedia[${newcount}][newtab]" type="checkbox" id="social_icon_${newcount}">
                        <label for="social_icon_${newcount}" class="form-check-label" title="Open in new tab"></label>
                    </div>
                </div>
                <button type="button" class="remove-field"><i class="fal fa-times"></i></button>
            </div>
        </div>`;

        return items;
    }        
                    
    function addAbleItems( addbutton, cloneITem, appendto, dataCount ){
        var itemcount = $(dataCount).data('count');
        $(document).on('click', addbutton, function() {
            var thisButtonType = $(this).data('type');
            var newcount = itemcount++;
            $(dataCount).attr('data-count', newcount);

            if(thisButtonType == 'socialMedia') {
                var items = socialmedia(newcount);
            } else if (thisButtonType == 'footerTopMenu') {
                var items = footerTopMenuItem(newcount);
            } else if (thisButtonType == 'downloadAppsButton') {
                var items = downloadButtonItem(newcount);
            } else if (thisButtonType == 'footerBottomMenu') {
                var items = footerBottomMenuItem(newcount);
            };
            $(items).appendTo(appendto);
        });
        $(document).on('click', '.remove-field', function(e) {
            $(this).parent().parent('.social_link_item').remove();
            e.preventDefault();
            var newcount = itemcount--;
        });
    };
    addAbleItems('.add_social_link', '.social_link_item', '.social_link_dynamic','#social_item_count');



})(jQuery);