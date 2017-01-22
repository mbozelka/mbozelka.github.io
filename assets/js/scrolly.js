(function($){
    $.scrolly = function(el, options){
        
        var base = this,
            $win = $(window),
            cachedTopPos = 0,
            scrollDown = true,
            startStyles = {};
        
        base.$el = $(el);
        base.el = el;
        
        // Add a reverse reference to the DOM object
        base.$el.data("scrolly", base);
        
        base.init = function(){
            base.options = $.extend({},$.scrolly.defaultOptions, options);
            
            base.cacheStartStyle();
            base.getDirection();
            base.calcNewPos();
            $win.on('scroll', function(){
                base.getDirection();
                base.calcNewPos();
            });
        };
        
        base.calcNewPos = function(){
            var winTop = $win.scrollTop();
            
            // out of max range so return with end styles
            if(winTop >= base.options.winEnd){
                base.$el.css(base.options.endStyles);
                return;
            }
            
            // out of min range so return with start styles
            else if(winTop <= base.options.winStart){
                base.$el.css(startStyles); 
                return;
            }
                
            for(key in base.options.endStyles){
                var endStyle, startStyle, endVal, startVal, winTraveldist, objChangeRate, percent;
                
                endStyle = base.getNumericalVal(base.options.endStyles[key]);
                startStyle = base.getNumericalVal(startStyles[key]);
                endVal = (scrollDown) ? endStyle : startStyle;
                startVal = (scrollDown) ? startStyle : endStyle;
                
                // compute the updated value
                // based on how much it needs to change
                // compared to the window range
                winTraveldist = base.options.winEnd - base.options.winStart;
                objChangeRate = startVal - endVal;
                percent = (scrollDown)? Math.abs((winTop - base.options.winEnd)) / winTraveldist : Math.abs(winTop - base.options.winStart) / winTraveldist;
                
                // update with new position
                base.updatePos(key, endVal + (objChangeRate * percent));
            }
        };
        
        base.updatePos = function(key, newVal){
            base.$el.css(key, newVal); 
        };
        
        base.getNumericalVal = function(val){
            return parseInt(val, 10);
        };
        
        base.getDirection = function(){
            var winTop = $win.scrollTop();
            scrollDown = (cachedTopPos <= winTop) ? true : false;
            cachedTopPos = winTop;
        };
        
        base.cacheStartStyle= function(){
            for(key in base.options.endStyles){
                startStyles[key] = base.$el.css(key);
            } 
        };
        // Run initializer
        base.init();
        
    };
    
    $.scrolly.defaultOptions = {
        winStart: null,
        winEnd: null,
        endStyles: {}
    };
    
    $.fn.scrolly = function(options){
        return this.each(function(){
            (new $.scrolly(this, options));
        });
    };
   
})(jQuery);