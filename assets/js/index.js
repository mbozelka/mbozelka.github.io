
/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document),
        $win = $(window);
    
    $document.ready(function () {
        
        var em = $('.em');
        swap(em);
        
        $('.blog-logo').scrolly({
            winStart: 0,
            winEnd: 200,
            endStyles: {
                'margin-top': 8,
                'width': 60
            }
        });
        
        $('.logo-blue').scrolly({
            winStart: 0,
            winEnd: 200,
            endStyles: {
                'opacity': 1
            }
        });
        
        $('.logo-white').scrolly({
            winStart: 0,
            winEnd: 200,
            endStyles: {
                'opacity': 0
            }
        });
        
        $(".btn-menu, .nav-cover").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });
        
    });
    
    function swap(elem){
        if(elem.length > 0){
            var switchEM;
            if(!elem.data('link')){
                switchEM = elem.data('name') + '@gmail.com';
            }else{
                switchEM = '<a title="Email me" href=' + 'mailto:' + elem.data('name') + '@gmail.com><i class="fa fa-envelope" aria-hidden="true"></i></a>';
            }
            elem.replaceWith(switchEM);  
        }
    }
   
})(jQuery);
