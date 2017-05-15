(function () {

    var Filter = (function () {

        var $category = document.querySelectorAll('.js-filter-category'),
            $item = document.querySelectorAll('.js-filter-item');

        return {
            /*
             * @access public
             */
            init: function () {
                $category[0].classList.add('active');
                this._event();
            },

            _event: function () {
                var self = this;
                [].map.call($category, function(el) {
                    el.addEventListener('click', function (e) {
                        e.preventDefault();
                        self._toggle(this.dataset.category);

                        this.classList.add('active');

                    });
                });
            },

            /*
             * 1. Добавляем класс "active" к $item с категорией = category
             * 2. Удаляем класс "active" у всех $category
             *
             * @param {number} category
             */
            _toggle: function (category) {
                [].map.call($item, function(el) {
                    if(el.dataset.category === category || category == 0) {
                        el.classList.add('active');
                        el.classList.remove('no-active');
                    } else {
                        el.classList.remove('active');
                        el.classList.add('no-active');
                    }
                });

                [].map.call($category, function(el) {
                    el.classList.remove('active');
                });

            }
        };

    })();

    var App = {
        init: function () {
            Filter.init();
        }
    };

    App.init();

})();
