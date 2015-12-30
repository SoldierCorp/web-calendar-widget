$(function() {
    $('#calendar-section').fullCalendar({
        firstDay: 1,
        aspectRatio: 1.3,
        dragScroll: false,
        header: {
            left:   'prev',
            center: 'title',
            right:  'next'
        },
        monthNames: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
        dayNamesShort: ['D','L','M','M','J','V','S'],
        dayRender: function(date, cell ) {
            if (date.format('YYYY-M-DD') == '2015-12-15') {
                cell.addClass('with-event');
            }
        },
    });
});
