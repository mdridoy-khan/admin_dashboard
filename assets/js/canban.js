$(document).ready(function() {
    var main = $('#kanban_board')[0];

    var list = Sortable.create(main, {
        group: 'list',
        sort: true,
        filter: '.add-card',
        draggable: '.list',
        ghostClass: "ghost",
        dragoverBubble: true,
    });

    function initListContent() {
        var dropzones = $('.listcontent');

        dropzones.each(function() {
            Sortable.create(this, {
                group: 'card',
                sort: true,
                draggable: '.card',
                ghostClass: "ghost",
            });
        });
    }

    initListContent();

    var canvas = $('.kanban_canvas');
    canvas.on('click', bodyClickHandler);

    function bodyClickHandler(e) {
        elMouseLeaveHandler(e);
        var el = $(e.target);
        var isCard = el.hasClass('card');
        var isTitle = el.hasClass('title');
        var isInactive = el.hasClass('inactive');
        var isEditable = el.hasClass('editable');
        var editing = el.hasClass('editing');

        if (isCard && isInactive) {
            list.options.disabled = true;
            el.prop('disabled', false);
            el.removeClass('inactive').addClass('active');
            el.select();
        }

        if (isTitle && isInactive) {
            list.options.disabled = true;
            el.prop('disabled', false);
            el.removeClass('inactive').addClass('active');
            el.select();
        }

        if (isEditable && !editing) {
            el.prop('contentEditable', true).focus();
            document.execCommand('selectAll', false, null);
            el.on('blur', elBlurHandler);
            el.on('keypress', elKeypressHandler);
            el.addClass('editing');

            if (el.parent().hasClass('add-list')) {
                el.parent().attr('class', 'initial');
            }
        }
    }

    function elKeypressHandler(e) {       

        if (e.keyCode === 13) {
            e.preventDefault();
            $(e.target).blur();
        }

        var el = $(e.target);
        if (el.hasClass('add-card')) {
            el.addClass('pending');
        }

        if (el.parent().hasClass('initial')) {
            el.parent().attr('class', 'pending');
        }
    }

    function elBlurHandler(e) {
        var el = $(e.target);
        el.prop('contentEditable', false).removeClass('editing');

        if (el.hasClass('pending')) {
            el.attr('class', 'card removable editable');
            var newEl = $('<div>', { class: 'add-card editable' }).text('Add another card');
            el.parent().append(newEl);
            el.parent().find('.listcontent').append(el);
        }

        if (el.parent().hasClass('initial')) {
            el.parent().attr('class', 'add-list');
        }

        if (el.parent().hasClass('pending')) {
            el.parent().attr('class', 'list');
            el.attr('class', 'title removable editable');
            var newContent = $('<div>', { class: 'listcontent' });
            el.parent().append(newContent);
            var newEl = $('<div>', { class: 'add-card editable' }).text('Add another card');
            el.parent().append(newEl);
            $('#kanban_board').append(el.parent());

            initListContent();

            var addList = $('<div>', { class: 'add-list' });
            var title = $('<div>', { class: 'title editable addListPlaceholder' }).text('Add New List');
            addList.append(title);
            $('.kanban_canvas').append(addList);
        }

        initDelete();
    }

    function initDelete() {
        var editables = $('.editable');

        editables.each(function() {
            $(this).on('mouseenter', elMouseEnterHandler);
            $(this).on('mouseleave', elMouseLeaveHandler);
        });
    }

    initDelete();

    function elMouseEnterHandler(e) {
        var el = $(e.target);
        var isRemovable = el.hasClass('removable');
    
        if (isRemovable && el.find('.del').length === 0) {
            var del = $('<span>', { class: 'del fal fa-times' });
            el.append(del);
            
            el.on('click', deleteHandler);
        }
    }

    function elMouseLeaveHandler(e) {
        var del = $(e.target).find('span');
        if (del) del.remove();
    }

    function deleteHandler(e) {
        var parent = $(e.target).parent();

        if (parent.hasClass('card')) {
            parent.remove();
        }

        if (parent.hasClass('title')) {
            parent.parent().remove();
        }
    }
});
