
var app_html = {
    init: function(){
        this.ownSlider();
        this.myscript();
        //this.mymap();
        this.animatedInput();
        this.dropDown();
        this.responsiveTable();
    },
    ownSlider: function () {

        function svgNewSliser(slider){
            var mainSlider = $(slider);
            var duration = ( $('.no-csstransitions').length > 0 ) ? 0 : 150,
            //Animation from active slide
            lateralSlidePath = 'M -0.07573275,424.04688 C 7.8242673,598.14688 99.6,756 99.6,756 L 600,756 600,0 88.924267,0.04688177 C 68.424267,123.74688 6.3242673,237.04688 -0.07573275,377.24688 Z',
            //Animation to active svg effect
            visibleSlidePath = 'M -0.07573275,424.04688 0,756 600,756 600,0 0,0 -0.07573275,377.24688 Z';


            if($(window).width() >= 960) {

                mainSlider.find('.item .svg-wrapper').on('mouseenter', function(){
                    var allSlides = mainSlider.find('.item'),
                        thisItem = $(this).parent().index(),
                        selected = mainSlider.find('.item.selected').index();

                    //Activate slide on hover
                    Snap('#cd-morphing-path-' + (thisItem)).animate({'d': visibleSlidePath}, duration, mina.linear);

                    allSlides.removeClass('selected');
                    $(this).parent().addClass('selected');

                }).on('mouseleave', function(){
                    var allSlides = mainSlider.find('.item'),
                        selected = mainSlider.find('.item.selected').index();
                    //Reset all slides
                    Snap("#cd-morphing-path-0").animate({'d': lateralSlidePath}, duration, mina.linear);
                    Snap("#cd-morphing-path-1").animate({'d': lateralSlidePath}, duration, mina.linear);
                    Snap("#cd-morphing-path-2").animate({'d': lateralSlidePath}, duration, mina.linear);

                    allSlides.removeClass('selected');
                });
            } else {
                mainSlider.owlCarousel({
                    loop:true,
                    nav:true,
                    navText: [
                        "<span class='icon-arrow'></span>",
                        "<span class='icon-arrow'></span>"
                    ],
                    items:1,
                    responsive : {
                        960 : false
                    }
                });
            }
        }

        svgNewSliser('.new-slider .gallery-wrapper');

        function accordionSlider(slider){

            var mainSlider = $(slider);

            if($(window).width() >= 960) {

                mainSlider.find('.item').on('click', function(){
                    var allSlides = mainSlider.find('.item');

                    allSlides.removeClass('active left-slide right-slide');
                    $(this).addClass('active');
                    $(this).nextAll().addClass('right-slide');
                    $(this).prevAll().addClass('left-slide');
                });
            } else {
                mainSlider.owlCarousel({
                    loop:true,
                    nav:true,
                    navText: [
                        "<span class='icon-arrow'></span>",
                        "<span class='icon-arrow'></span>"
                    ],
                    items:1,
                    responsive : {
                        960 : false
                    }
                });
            }
        };

        accordionSlider('.main-slider');


    },
    myscript: function () {

        $('.owl-news .btn[href]').click(function(e){
            e.preventDefault();
            var id= $(this).data('id');
            App.request.get('route/news/display/' + id, function(res){
                $.fancybox(res);
            });
        });

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

        $('.header .btn-clear').on('click', function(){
            $(this).toggleClass('open');
            $('.wrapper').toggleClass('open-menu');
            $('.header').toggleClass('open-menu');

        });

        waterfall('.list');

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

        $('.owl-news').owlCarousel({
            loop:true,
            margin:10,
            nav:false,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                }
            }
        });
    },

    mymap: function (){

        function initMap() {

           var styleArray = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}];

            var map = new google.maps.Map(document.getElementById('map'), {
                scrollwheel: false,
                zoom: 5,
                minZoom: 3,
                center: {lat: 52.049813, lng: 45.017721},
                styles: styleArray
            });

            google.maps.event.addListener(map, 'click', function(event){
                this.setOptions({scrollwheel:true});
            });

            setMarkers(map);
        }

        // Data for the markers consisting of a name, a LatLng and a zIndex for the
        // order in which these markers should display on top of each other.
        var places = [
            ['Kuiv', 50.457502, 30.525132],
            ['Budapest', 47.494584, 19.040347],
            ['Minsk', 53.902481, 27.559267],
            ['Moskov', 55.757973, 37.614624],
            ['Astana', 51.157337, 71.460134]
        ];

        function setMarkers(map) {
            var image = {
                url: 'assets/images/marker.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(51, 72),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(25, 72)
            };

            var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
            };


            for (var i = 0; i < places.length; i++) {
                var beach = places[i];
                var marker = new google.maps.Marker({
                    position: {lat: beach[1], lng: beach[2]},
                    map: map,
                    icon: image,
                    shape: shape,
                    title: beach[0],
                    zIndex: beach[3]
                });

            }

        }

        initMap();

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

    }
};

$(window).on('load', function(){
    app_html.init();
});


