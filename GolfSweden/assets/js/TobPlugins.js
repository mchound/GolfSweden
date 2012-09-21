(function ($) {
    $.fn.tobNavigationJS = function () {
        // Add click event to li items
        // This = div id="navigation"
        $(this).on('click', 'ul li', function (clickedObject) {

            // This = li
            // Hide arrow-image by setting display: none
            $(this).siblings().find('.current').siblings('img').css('display', 'none');
            // Remove .current class from selected menu item
            $(this).siblings().find('.current').removeClass('current');

            // Add class .current to clicked listitem > a
            $(clickedObject.currentTarget).children('a').addClass('current');
            // Make arrow-image visible by setting display: block
            $(clickedObject.currentTarget).children('img').css('display', 'block');

            var activeSection = $('section[active="true"]');
            var clickedSectionId = $(clickedObject.currentTarget).children('a').attr('id').replace('link_', '');
            var clickedSection = $('#' + clickedSectionId);

            $(activeSection).fadeOut('slow', function () {
                $(activeSection).removeAttr('active');
                $(clickedSection).slideDown('slow', function () {
                    $(clickedSection).attr('active', 'true');
                });
            });
        });

    };

    $.extend({
        tobRadioButtonJS: function (groupId) {
            if (groupId === undefined) {
                $('.tobRadioButton').each(function (index, group) {
                    var groupId = $(group).attr('id');
                    $('#' + groupId + ' button').click(function (eventObject) {
                        $('#' + groupId + ' button').removeClass('selected');
                        $(eventObject.target).addClass('selected');
                    });
                });
                return this;
            }
            else if (groupId == 'all groups') {
                var groupValues = [];
                var group;
                $.each($('.tobRadioButton'), function (index, divElement) {
                    group = new Object();
                    var identifier = $(divElement).attr('id').toString();
                    var value = $(divElement).children('.selected').attr('value');
                    group = { id: identifier, value: value};
                    groupValues.push(group);
                });
                return groupValues;
            }
            return $('#' + groupId + ' .selected').attr('value');
        }
    });

})(jQuery);


