(function(){

    var active = scrolling = false;

    var MagicScroll = function(selector, options) {
        if(!(this instanceof MagicScroll)) {
            return new MagicScroll(selector, options);
        }

        if(!selector) {
            console.log('WTF Bro! Give me selector!');
        } else {
            this.elements = document.querySelectorAll(selector);
        }

        return this;

    };

    MagicScroll.prototype.create = function() {
        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(!element.magicScroll) {
                element.magicScroll = true;

                element.addEventListener('mousedown', this._start);
                element.addEventListener('mouseup', this._stop);
                element.addEventListener('mouseleave', this._stop);
                element.addEventListener('mousemove', this._move);
            }
        }

        return this;
    };

    MagicScroll.prototype._start = function(e) {
        active = true;
    };

    MagicScroll.prototype._stop = function(e) {
        active = false;

        e.currentTarget.classList.remove('scrolling');
        scrolling = false;
    };

    MagicScroll.prototype._move = function(event) {
        if(active) {
            event && event.preventDefault();

            var $current= event.currentTarget,
                mY      = (event.movementY) ? event.movementY : event.webkitMovementY;

            if(!scrolling) {
                $current.classList.add('scrolling');
                scrolling = true;
            }

            if(mY > 0) {
                $current.scrollTop -= Math.abs(mY * 2);
            }
            else if(mY < 0) {
                $current.scrollTop += Math.abs(mY * 2);
            }

        }
    };

    MagicScroll.prototype.destroy = function() {
        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(element.magicScroll) {
                element.removeEventListener('mousedown', this._start);
                element.removeEventListener('mouseup', this._stop);
                element.removeEventListener('mouseleave', this._stop);
                element.removeEventListener('mousemove', this._move);

                delete element.magicScroll;
            }
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = MagicScroll;
        }

        exports.MagicScroll = MagicScroll;
    } else {
        this.MagicScroll = MagicScroll;
    }

    // AMD Registrity
    if (typeof define === 'function' && define.amd) {
        define('MagicScroll', [], function() {
            return MagicScroll;
        });
    }
}).call(this);