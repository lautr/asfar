/**
 * asfar
 * ajax substitute for all requests
 *
 * a drop in tool to transform any regular GET Request int ao an ajax request and place the response in to the page,
 * allowing the use of callback functions to define any kind of effect while keeping the history legit
 *
 * @version 1.2
 * @author  johannes lauter ( hannes@lautr.com )
 * @see     https://github.com/lautr/asfar
 */
;(function($, doc, win) {
    "use strict";

    var name = 'js-asfar';

    function Asfar(el, opts, target) {
        this.$el  = $(el);
        this.pagecount = 0;
        this.currentHash = null;

        this.default = {
            'selector':        'a[href*="' + document.location.host + '"], a[href^="/"], a:not([href^="http://"])',
            'target':           target,
            'sheBangFallback': true,
            'sheBangInterval': 150,
            'html5Support':     true,
            'before':           function (urlFragment, target) {},
            'success':          function (urlFragment, target) {},
            'after':            function (urlFragment, target) {},
            'error':            function (jqXHR, textStatus, errorThrown, urlFragment, target) {},
            'insert':           function (urlFragment, target, data) {
			    $(target).html(data);
		    },
            'historyNext':      function(urlFragment, target, data) {
                this.opts.insert(urlFragment, target, data);
            },
            'historyPrev':      function(urlFragment, target, data) {
                this.opts.insert(urlFragment, target, data);
            }
        };

        this.opts = $.extend(this.default, opts);

        this.$el.data(name, this);

        this.$selector = $(this.opts.selector);

        this.init();
    }

    Asfar.prototype.pushState = function (urlFragment, first) {
        if (this.opts.html5Support) {
            history.pushState({type: 'ajax'}, "title " + this.pagecount,urlFragment);
            this.pagecount++;
        }else{
            location.hash = '#!' + urlFragment;
            this.currentHash = location.hash;
        }
    }

    Asfar.prototype.call = function(urlFragment, target, isHistory) {
        var self = this;

        self.opts.before(urlFragment, target);

        $.ajax({
            cache: false,
            async: true,
            type: 'GET',
            dataType: "html",
            url: urlFragment,
            success: function(data) {
                // we need to wrap it, otherwise we can't select it if body is the parent
                var responseHtml = '<section id="asfar-fake">' + data + '</section>';

                if (0 !== $(responseHtml).find(target).parent().size()) {
                    data = $(responseHtml).find(target).html();
                }

                self.opts.insert(urlFragment, target, data);

                if (true !== isHistory) {
                    self.pushState(urlFragment);
                }

                self.opts.success(urlFragment, target);

                $(target).trigger('asfar', [urlFragment]);
            },
            error: function(jqXHR, textStatus, errorThrown){
                self.opts.error(jqXHR, textStatus, errorThrown, urlFragment, target);
            }
        });

        // is that really usefull?
        self.opts.after(urlFragment, target);
    }

    /**
     * @todo check viability of delegation
     */
    Asfar.prototype.init = function() {
        var self = this;

        // no matter if you want html5 support or not, if it ain't there it ain't gonna happen
        if (typeof history.pushState === 'undefined') {
            this.opts.html5Support = false;
        }

        // no html5 , no she bang fallback, no asfar *sadface*
        if (!this.opts.html5Support && !this.opts.sheBangFallback) {
            return false;
        }

        if (!this.opts.html5Support) {
            setInterval(function () {
                if ('' === location.hash) {
                    // start
                    if (null !== self.currentHash){
                        self.call(location.hash.substring(2), self.opts.target, true);
                        self.currentHash = null;
                    }
                } else {
                    if (location.hash !== self.currentHash) {
                        self.call(location.hash.substring(2), self.opts.target, false);
                    }

                }
            }, self.opts.sheBangInterval);
        } else {
            window.onpopstate = function (event) {
                if (event.state !== null) {
                    if ("ajax" === event.state.type) {
                         self.call(document.location.pathname, self.opts.target, true);
                    }
                }
            };
        }

        // this can be copied in to the header of the html document to increase speed
        if (!this.opts.html5Support && '#!' === location.hash.substring(0,2)) {
			location.href = location.hash.substring(2);
		}

        this.$selector.on('click.' + name, function(e) {
            e.preventDefault();

            self.call($(this).attr('href'), self.opts.target, false);
        });

        if (this.opts.html5Support) {
            self.pushState(document.location.pathname);
        }
    };

    Asfar.prototype.destroy = function() {
        this.$selector.off('.' + name);

        this.$el.removeData(name);
        this.$el = null;
    };

    $.fn.asfar = function(opts) {
        var target = $(this).selector;

        // you can not initiate more then one asfar instance at a time because you would need a unique selector (a elements for each asfar content area)
        if (1 === $(this).size()) {
            return new Asfar(this, opts, target);
        }
    };

})(jQuery, document, window);