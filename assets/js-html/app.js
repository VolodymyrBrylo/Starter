
var app_html = {
    myscript: function () {

        $(document).on('click', '.news-np', function(e){
            e.preventDefault();
            $.fancybox.close();
            var id= $(this).data('id');
            App.request.get('route/news/display/' + id, function(res){
                $.fancybox(res);
                $.fancybox.update();
            });
        });

        $('.submenu').on('click', function(){
            $(this).toggleClass('open');
        });

        function maxHeight (block) {
            var maxHeight = 0;

            $(block).each(function(){
                if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
            });

            $(block).height(maxHeight);
        }


        $('a[href^=#]').bind('click',function (e) {
            e.preventDefault();
            var target = this.hash,
                destination = $(this).attr('href');

            $('nav a').removeClass('active');
            $(this).addClass('active');

            if($(this).parents(".mobile-menu").length){
                $('.header .btn-clear').removeClass('open');
                $('.wrapper').removeClass('open-menu');
                $('.header').removeClass('open-menu');
            }

            $('html, body').stop().animate( {
                'scrollTop': $(destination).offset().top-70
            }, 900, 'swing', function () {
                window.location.hash = target;
            } );
        } );

    },
    animatedInput: function() {
        var input = $('.form-horizontal input, .form-horizontal textarea, .form-search input, .form-subscribe input');

        if(input.length) {
            input.each(function(){
                $(this).focus(function(){
                    $(this).parents('.form-group').addClass('filled');
                });
                $(this).on('change', function(){
                    $(this).parents('.form-group').addClass('filled');
                });

                $(this).blur(function(){

                    if($(this).val() == '') {
                        $(this).parents('.form-group').removeClass('filled');
                    }
                });

                input.on('keyup', function(e){
                    var code = e.keyCode || e.which;
                    if (code != '9') {
                        if($(this).val() == '') {
                            $(this).blur();
                            $(this).parents('.form-group').removeClass('filled');
                        }
                    }
                })
            })
        }
    },
    dropDown: function() {
        $('.btn[dropdown]').on('click', function(){
            $(this).parent().find('.text-hide').addClass('open');
            $(this).addClass('hidden');
        });
    },
    responsiveTable: function () {
        function responseTable(table){
            if ($(window).width() <= 992) {

                $(table).each(function(){
                    var fullWidth = $(this);
                    var trWidth = 0;

                    fullWidth.find('tbody>tr').each(function(){
                        var thisTD = $(this);
                        trWidth += thisTD.outerWidth();
                    });

                    var lenTR = fullWidth.find('tr'),
                        lenHead = fullWidth.find('tr th');

                    for (var j = 0; j < lenHead.length; j++) {

                        var maxH = 0;

                        for (var i = 0 ; i < lenTR.length ; i++) {

                            var tr = lenTR.eq(i);
                            var td = tr.find('td, th').eq(j);

                            if (td.height() > maxH) { maxH = td.height(); }

                        }

                        for (var k = 0 ; k < lenTR.length ; k++) {

                            var trMaxH = lenTR.eq(k);
                            var tdMaxH = trMaxH.find('td,th').eq(j);
                            tdMaxH.height(maxH);

                        }

                    }

                    fullWidth.find('tbody').width(trWidth);
                    fullWidth.find('tbody').wrap('<div class="tbody-wrap"></div>');

                });

            }
        }

    },

    init: function(){
        this.ownSlider();
        this.myscript();
        this.animatedInput();
        this.dropDown();
        this.responsiveTable();
    }
};

$(window).on('load', function(){
    app_html.init();
});


