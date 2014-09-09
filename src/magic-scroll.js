(function(){
    var active = false;

    var MagicScroll = function(selector, options) {
        if(!(this instanceof MagicScroll)) {
            return new MagicScroll(selector, options);
        }

        if(!selector) {
            console.log('WTF Bro! Give me selector!');
        } else {
            this.elements = document.querySelectorAll(selector);
            active = false;
        }

        return this;

    };

    MagicScroll.prototype.create = function() {
        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(!element.magicScroll) {
                element.magicScroll = true;

                element.addEventListener('mouseup', this._unactive);
                element.addEventListener('mousedown', this._active);
                element.addEventListener('mouseleave', this._unactive);
                element.addEventListener('mousemove', this._move, false);
            }
        }

        return this;
    };

    MagicScroll.prototype._active = function(event) {
        active = true;
    };

    MagicScroll.prototype._unactive = function(event) {
        active = false;
    };

    MagicScroll.prototype._move = function(event) {
        if(active) {
            event && event.preventDefault();

            if(event.movementY > 0) {
                event.currentTarget.scrollTop -= Math.abs(event.movementY * 2);
            }
            else if(event.movementY < 0) {
                event.currentTarget.scrollTop += Math.abs(event.movementY * 2);
            }

        }
    };

    MagicScroll.prototype.destroy = function() {
        for(var i = 0; i < this.elements.length; i++) {
            var element = this.elements[i];

            if(element.magicScroll) {
                element.removeEventListener('mouseup', this._unactive);
                element.removeEventListener('mousedown', this._active);
                element.removeEventListener('mouseleave', this._unactive);
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