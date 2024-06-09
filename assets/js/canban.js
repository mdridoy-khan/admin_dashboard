var main = $('#kanban_board')[0];
        var list = Sortable.create(main, {
            group: 'list',
            sort: true,
            filter: '.add-card',
            draggable: '.list-item',
            ghostClass: "ghost",
            dragoverBubble: true,
        });

        function initListContent() {
            var dropzones = $('.list-cards');

            dropzones.each(function() {
                Sortable.create(this, {
                    group: 'card',
                    sort: true,
                    draggable: '.list-card',
                    ghostClass: "ghost",
                });
            });
        }

        initListContent();

        $('.addListForm').hide();
        $('.addListPlaceholder').on('click', function() {
            $(this).hide();
            $('.addListForm').show();
        });
        $('.addListForm button[type="reset"]').on('click', function() {
            $('.addListForm').hide();
            $('.addListPlaceholder').show();
        });

        $('.addCardForm').hide();
        $('.list-add-card-btn').on('click', function() {
            $(this).hide();
            $(this).siblings('.addCardForm').show();
        });
        $('.addCardForm button[type="reset"]').on('click', function() {
            $(this).parents('.addCardForm').hide();
            $(this).parents('form').siblings('.list-add-card-btn').show();
        });