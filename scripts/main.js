$(function() {

    var current_color = '#fced58';
    $('body').css('background', current_color);

    var add_event_div = "<div class='add-event-section'>"+
    "<div><input id='add-event-input' placeholder='Nuevo evento' value=''/>"+
    "<span class='top-triangle'></span>"+
    "<i class='fa fa-map-marker'></i></div></div>";

    var updateColor = function()
    {
        $('.background-color').css('background',current_color);
        $('.fc-center h2').css('color', current_color);
        $('.with-event').css('border-color', current_color);
        $('.fc-today').css('color', current_color);
    };


    $('#show-color').on('click', function(e) {
        e.preventDefault();

        var $el = $(this);

        $('article > div.active').removeClass('active').fadeOut('fast');
        setTimeout(function() {
            $('#choose-color-section').fadeIn('fast').addClass('active');
        }, 250);

        var delay = 0;

        $('#choose-color-section > div span').each(function() {
            $(this).delay(delay).animate({
                opacity: '1',
                height: '40px',
                width: '40px'
            }, 100);

            delay += 35;
        });

        $('#show-menu .fa').removeClass('fa-th-large').addClass('fa-times');
        $('#show-menu').attr('id','back-to-calendar');

        $el.css('opacity','0');

    });

    $(document).on('click', '#back-to-calendar', function(e) {
        e.preventDefault();

        var $el = $(this);

        $('header').css('justify-content','space-between');

        if ($('.date-to-event').length > 0) $('.date-to-event').remove();

        $el.attr('id','show-menu');
        $('.fa', $el).removeClass('fa-times').addClass('fa-th-large');
        $('#show-menu .fa').removeClass('fa-angle-left').addClass('fa-th-large');
        $('#show-color').css('opacity',1);

        $('article > div.active').removeClass('active').fadeOut('fast');
        setTimeout(function() {
            $('#calendar-section').fadeIn('fast').addClass('active');
        }, 250);

        $('#choose-color-section > div span').css({
            width: '0',
            height: '0',
            opacity: '0'
        });

        updateColor();
    });

    $('#choose-color-section span').on('click', function(e) {
        e.preventDefault();

        var $el = $(this);

        current_color = $el.css('backgroundColor');

        $('body').css('background', current_color);
        $('#choose-color-section span.active').removeClass('active');
        $el.addClass('active');

    });

    var showEventDetails = function(date)
    {
        $('article > div.active').removeClass('active').fadeOut('fast');
        setTimeout(function() {
            $('#event-section').fadeIn('fast').addClass('active');
        }, 250);
    };

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
                cell.addClass('has-event');
                cell.append('<span class="with-event"></span>');
            }
        },
        dayClick: function(date, jsEvent, view)
        {
            jsEvent.preventDefault();

            var $el = $(this);

            if ($el.hasClass('fc-other-month'))
                return false;

            if ($el.hasClass('has-event')) {
                var pos = $el.offset();
                var pos_menu = $('#show-menu').offset();

                $('body').append("<div class='date-to-event'><h3>"+date.format('MMM')+"</h3><span><strong>"+date.format('D')+"</strong></span></div>");

                $('.date-to-event').css({
                    left: pos.left - 35,
                    top: pos.top
                });

                $('.date-to-event span').css({
                    'border-color': current_color,
                    'background': current_color
                });

                $('#show-menu .fa').removeClass('fa-th-large').addClass('fa-angle-left');
                $('#show-menu').attr('id','back-to-calendar');
                $('#show-color').css('opacity',0);
                $('header').css('justify-content','flex-start');

                showEventDetails(date.format());

                setTimeout(function() {
                    $('.date-to-event').animate({
                        left: pos_menu.left - 65,
                        top: pos_menu.top
                    }, function() {
                        $('.date-to-event h3').css('opacity',1);
                    });
                }, 250);

                return false;

            }

            var $week = $el.closest('.fc-week');
            var $week_open = $('#calendar-section').find('.fc-week-open');
            var position = $el.position();

            if ($week_open.size() == 0) {
                $week.stop().animate({
                    'margin-bottom': '70px'
                }, 250).addClass('fc-week-open');

                $el.addClass('new-event-date');
                $el.css({
                    'background': current_color,
                    'border-color': current_color
                });

                $el.closest('.fc-bg').next().find("td[data-date='"+date.format()+"']").css('color','black');
                $week.append(add_event_div);

                $('.add-event-section .top-triangle').css('left', (position.left + 18)+'px');

                setTimeout(function() {
                    $('.add-event-section').slideDown(150);
                    $('.add-event-section input').focus();
                }, 250);

            } else {
                $week_open.stop().animate({
                    'margin-bottom': '0'
                }, 250).removeClass('fc-week-open');


                $('.new-event-date').closest('.fc-bg').next().find("td[data-date='"+$('.new-event-date').attr('data-date')+"']").css('color','white');
                $('.new-event-date').css({
                    'background': 'transparent',
                    'border-color': 'transparent'
                });

                $week_open.find('.add-event-section').slideUp('fast', function() {
                    $(this).remove();
                });

                if ($week.hasClass('fc-week-open')) {
                    $week.stop().animate({
                        'margin-bottom': '70px'
                    }, 250).addClass('fc-week-open');
                }

                $('.new-event-date').removeClass('new-event-date');

            }
        }
    });
});
