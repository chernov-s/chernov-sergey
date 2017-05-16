var Scroll = (function () {

    'use strict';

    var settings = {
        rootSelector: document.querySelector('body'),
        link: document.querySelectorAll('.go-to'),

        speed: 30
    };

    function easeOutCubic(currentIteration, startValue, changeInValue) {
        return changeInValue * (Math.pow(currentIteration / settings.speed - 1, 3) + 1) + startValue;
    }

    return {

        init: function () {
            this.event();
        },

        event: function () {
            var self = this;
            [].map.call(settings.link, function(el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();
                    self.clickHandler(this);
                });
            });
        },

        /*
         * @param {object} el - link to anchor
         */
        clickHandler: function (el) {
            var anchor = document.querySelector( el.getAttribute('href') );

            var from = settings.rootSelector.scrollTop,
                to = anchor.getBoundingClientRect().top;
            var i = 0;
            (function scroll() {
                settings.rootSelector.scrollTop = easeOutCubic(i, from, to);
                i++;
                if (i < settings.speed) {
                    requestAnimationFrame(scroll);
                }
            })();
        }
    };

})();