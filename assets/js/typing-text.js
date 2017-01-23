(function($){
    $.typingText = function(el, options){

        var base = this,
            index = 0,
            interval = null;
        
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("typingText", base);
        
        base.init = function(){
            base.options = $.extend({},$.typingText.defaultOptions, options);
            if(base.options.text.length > 1)
            {
                base.typeIn();
            }
        };
        
        base.typeIn = function(){
            var text = base.options.text[index],
                i = 0;
            
            interval = setInterval(function(){
                base.frameIn(i, text);
                i++;
            }, base.options.speed);
        };
        
        base.typeOut = function(){
            var text = base.$el.text(),
                i = text.length;
            
            interval = setInterval(function(){
                base.frameOut(i, text);
                i--;
            }, base.options.speed);
        };
        
        base.frameIn = function(i, text){
           if (text.length === i) {
                clearInterval(interval);
                setTimeout(base.typeOut, base.options.delay);
            } else {
                base.$el.html(text.slice(0, (i + 1)));
            }
        };
        
        base.frameOut = function(i, text){
           if (i < 0) {
                clearInterval(interval);
                index = updateIndex(base.options.text, index);
                base.typeIn();
            } else {
                base.$el.html(text.slice(0, i));
            }
        };
        
        function updateIndex(textArry, i){
            return (textArry.length - 1 > i)? i + 1 : 0;
        }
        
        // Run initializer
        base.init();
    };
    
    $.typingText.defaultOptions = {
        text: [],
        delay: 3000,
        speed: 100
    };
    
    $.fn.typingText = function(options){
        return this.each(function(){
            (new $.typingText(this, options));
        });
    };
    
})(jQuery);