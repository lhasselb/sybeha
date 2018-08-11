/*
Mosaic - Sliding Boxes and Captions jQuery Plugin
Version 1.0.1
www.buildinternet.com/project/mosaic
By Sam Dunn / One Mighty Roar (www.onemightyroar.com)
Released under MIT License / GPL License
*/
(function(a) {
    if (!a.omr) {
        a.omr = new Object()
    }
    a.omr.mosaic = function(c, b) {
        var d = this;
        d.$el = a(c);
        d.el = c;
        d.$el.data("omr.mosaic", d);
        d.init = function() {
            d.options = a.extend({}, a.omr.mosaic.defaultOptions, b);
            d.load_box()
        };
        d.load_box = function() {
            if (d.options.preload) {
                a(d.options.backdrop, d.el).hide();
                a(d.options.overlay, d.el).hide();
                a(window).load(function() {
                    if (d.options.options.animation == "fade" && a(d.options.overlay, d.el).css("opacity") == 0) {
                        a(d.options.overlay, d.el).css("filter", "alpha(opacity=0)")
                    }
                    a(d.options.overlay, d.el).fadeIn(200, function() {
                        a(d.options.backdrop, d.el).fadeIn(200)
                    });
                    d.allow_hover()
                })
            } else {
                a(d.options.backdrop, d.el).show();
                a(d.options.overlay, d.el).show();
                d.allow_hover()
            }
        };
        d.allow_hover = function() {
            switch (d.options.animation) {
                case "fade":
                    a(d.el).hover(function() {
                        a(d.options.overlay, d.el).stop().fadeTo(d.options.speed, d.options.opacity)
                    }, function() {
                        a(d.options.overlay, d.el).stop().fadeTo(d.options.speed, 0)
                    });
                    break;
                case "slide":
                    startX = a(d.options.overlay, d.el).css(d.options.anchor_x) != "auto" ? a(d.options.overlay, d.el).css(d.options.anchor_x) : "0px";
                    startY = a(d.options.overlay, d.el).css(d.options.anchor_y) != "auto" ? a(d.options.overlay, d.el).css(d.options.anchor_y) : "0px";
                    var f = {};
                    f[d.options.anchor_x] = d.options.hover_x;
                    f[d.options.anchor_y] = d.options.hover_y;
                    var e = {};
                    e[d.options.anchor_x] = startX;
                    e[d.options.anchor_y] = startY;
                    a(d.el).hover(function() {
                        a(d.options.overlay, d.el).stop().animate(f, d.options.speed)
                    }, function() {
                        a(d.options.overlay, d.el).stop().animate(e, d.options.speed)
                    });
                    break
            }
        };
        d.init()
    };
    a.omr.mosaic.defaultOptions = {
        animation: "fade",
        speed: 150,
        opacity: 1,
        preload: 0,
        anchor_x: "left",
        anchor_y: "bottom",
        hover_x: "0px",
        hover_y: "0px",
        overlay: ".mosaic-overlay",
        backdrop: ".mosaic-backdrop"
    };
    a.fn.mosaic = function(b) {
        return this.each(function() {
            (new a.omr.mosaic(this, b))
        })
    }
})(jQuery);


/*
jQuery EasyTabs plugin 3.1.1
Copyright (c) 2010-2011 Steve Schwartz (JangoSteve)
Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
Date: Tue Jan 26 16:30:00 2012 -0500
*/
(function(a) {
    a.easytabs = function(j, e) {
        var f = this,
            q = a(j),
            i = {
                animate: true,
                panelActiveClass: "active",
                tabActiveClass: "active",
                defaultTab: "li:first-child",
                animationSpeed: "normal",
                tabs: "> ul > li",
                updateHash: true,
                cycle: false,
                collapsible: false,
                collapsedClass: "collapsed",
                collapsedByDefault: true,
                uiTabs: false,
                transitionIn: "fadeIn",
                transitionOut: "fadeOut",
                transitionInEasing: "swing",
                transitionOutEasing: "swing",
                transitionCollapse: "slideUp",
                transitionUncollapse: "slideDown",
                transitionCollapseEasing: "swing",
                transitionUncollapseEasing: "swing",
                containerClass: "",
                tabsClass: "",
                tabClass: "",
                panelClass: "",
                cache: true,
                panelContext: q
            },
            h, l, v, m, d, t = {
                fast: 200,
                normal: 400,
                slow: 600
            },
            r;
        f.init = function() {
            f.settings = r = a.extend({}, i, e);
            if (r.uiTabs) {
                r.tabActiveClass = "ui-tabs-selected";
                r.containerClass = "ui-tabs ui-widget ui-widget-content ui-corner-all";
                r.tabsClass = "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all";
                r.tabClass = "ui-state-default ui-corner-top";
                r.panelClass = "ui-tabs-panel ui-widget-content ui-corner-bottom"
            }
            if (r.collapsible && e.defaultTab !== undefined && e.collpasedByDefault === undefined) {
                r.collapsedByDefault = false
            }
            if (typeof(r.animationSpeed) === "string") {
                r.animationSpeed = t[r.animationSpeed]
            }
            a("a.anchor").remove().prependTo("body");
            q.data("easytabs", {});
            f.setTransitions();
            f.getTabs();
            b();
            g();
            w();
            n();
            c();
            q.attr("data-easytabs", true)
        };
        f.setTransitions = function() {
            v = (r.animate) ? {
                show: r.transitionIn,
                hide: r.transitionOut,
                speed: r.animationSpeed,
                collapse: r.transitionCollapse,
                uncollapse: r.transitionUncollapse,
                halfSpeed: r.animationSpeed / 2
            } : {
                show: "show",
                hide: "hide",
                speed: 0,
                collapse: "hide",
                uncollapse: "show",
                halfSpeed: 0
            }
        };
        f.getTabs = function() {
            var x;
            f.tabs = q.find(r.tabs), f.panels = a(), f.tabs.each(function() {
                var A = a(this),
                    z = A.children("a"),
                    y = A.children("a").data("target");
                A.data("easytabs", {});
                if (y !== undefined && y !== null) {
                    A.data("easytabs").ajax = z.attr("href")
                } else {
                    y = z.attr("href")
                }
                y = y.match(/#([^\?]+)/)[0].substr(1);
                x = r.panelContext.find("#" + y);
                if (x.length) {
                    x.data("easytabs", {
                        position: x.css("position"),
                        visibility: x.css("visibility")
                    });
                    x.not(r.panelActiveClass).hide();
                    f.panels = f.panels.add(x);
                    A.data("easytabs").panel = x
                } else {
                    f.tabs = f.tabs.not(A)
                }
            })
        };
        f.selectTab = function(x, C) {
            var y = window.location,
                B = y.hash.match(/^[^\?]*/)[0],
                z = x.parent().data("easytabs").panel,
                A = x.parent().data("easytabs").ajax;
            if (r.collapsible && !d && (x.hasClass(r.tabActiveClass) || x.hasClass(r.collapsedClass))) {
                f.toggleTabCollapse(x, z, A, C)
            } else {
                if (!x.hasClass(r.tabActiveClass) || !z.hasClass(r.panelActiveClass)) {
                    o(x, z, A, C)
                } else {
                    if (!r.cache) {
                        o(x, z, A, C)
                    }
                }
            }
        };
        f.toggleTabCollapse = function(x, y, z, A) {
            f.panels.stop(true, true);
            if (u(q, "easytabs:before", [x, y, r])) {
                f.tabs.filter("." + r.tabActiveClass).removeClass(r.tabActiveClass).children().removeClass(r.tabActiveClass);
                if (x.hasClass(r.collapsedClass)) {
                    if (z && (!r.cache || !x.parent().data("easytabs").cached)) {
                        q.trigger("easytabs:ajax:beforeSend", [x, y]);
                        y.load(z, function(C, B, D) {
                            x.parent().data("easytabs").cached = true;
                            q.trigger("easytabs:ajax:complete", [x, y, C, B, D])
                        })
                    }
                    x.parent().removeClass(r.collapsedClass).addClass(r.tabActiveClass).children().removeClass(r.collapsedClass).addClass(r.tabActiveClass);
                    y.addClass(r.panelActiveClass)[v.uncollapse](v.speed, r.transitionUncollapseEasing, function() {
                        q.trigger("easytabs:midTransition", [x, y, r]);
                        if (typeof A == "function") {
                            A()
                        }
                    })
                } else {
                    x.addClass(r.collapsedClass).parent().addClass(r.collapsedClass);
                    y.removeClass(r.panelActiveClass)[v.collapse](v.speed, r.transitionCollapseEasing, function() {
                        q.trigger("easytabs:midTransition", [x, y, r]);
                        if (typeof A == "function") {
                            A()
                        }
                    })
                }
            }
        };
        f.matchTab = function(x) {
            return f.tabs.find("[href='" + x + "'],[data-target='" + x + "']").first()
        };
        f.matchInPanel = function(x) {
            return (x ? f.panels.filter(":has(" + x + ")").first() : [])
        };
        f.selectTabFromHashChange = function() {
            var y = window.location.hash.match(/^[^\?]*/)[0],
                x = f.matchTab(y),
                z;
            if (r.updateHash) {
                if (x.length) {
                    d = true;
                    f.selectTab(x)
                } else {
                    z = f.matchInPanel(y);
                    if (z.length) {
                        y = "#" + z.attr("id");
                        x = f.matchTab(y);
                        d = true;
                        f.selectTab(x)
                    } else {
                        if (!h.hasClass(r.tabActiveClass) && !r.cycle) {
                            if (y === "" || f.matchTab(m).length || q.closest(y).length) {
                                d = true;
                                f.selectTab(l)
                            }
                        }
                    }
                }
            }
        };
        f.cycleTabs = function(x) {
            if (r.cycle) {
                x = x % f.tabs.length;
                $tab = a(f.tabs[x]).children("a").first();
                d = true;
                f.selectTab($tab, function() {
                    setTimeout(function() {
                        f.cycleTabs(x + 1)
                    }, r.cycle)
                })
            }
        };
        f.publicMethods = {
            select: function(x) {
                var y;
                if ((y = f.tabs.filter(x)).length === 0) {
                    if ((y = f.tabs.find("a[href='" + x + "']")).length === 0) {
                        if ((y = f.tabs.find("a" + x)).length === 0) {
                            if ((y = f.tabs.find("[data-target='" + x + "']")).length === 0) {
                                if ((y = f.tabs.find("a[href$='" + x + "']")).length === 0) {
                                    a.error("Tab '" + x + "' does not exist in tab set")
                                }
                            }
                        }
                    }
                } else {
                    y = y.children("a").first()
                }
                f.selectTab(y)
            }
        };
        var u = function(A, x, z) {
            var y = a.Event(x);
            A.trigger(y, z);
            return y.result !== false
        };
        var b = function() {
            q.addClass(r.containerClass);
            f.tabs.parent().addClass(r.tabsClass);
            f.tabs.addClass(r.tabClass);
            f.panels.addClass(r.panelClass)
        };
        var g = function() {
            var y = window.location.hash.match(/^[^\?]*/)[0],
                x = f.matchTab(y).parent(),
                z;
            if (x.length === 1) {
                h = x;
                r.cycle = false
            } else {
                z = f.matchInPanel(y);
                if (z.length) {
                    y = "#" + z.attr("id");
                    h = f.matchTab(y).parent()
                } else {
                    h = f.tabs.parent().find(r.defaultTab);
                    if (h.length === 0) {
                        a.error("The specified default tab ('" + r.defaultTab + "') could not be found in the tab set.")
                    }
                }
            }
            l = h.children("a").first();
            p(x)
        };
        var p = function(z) {
            var y, x;
            if (r.collapsible && z.length === 0 && r.collapsedByDefault) {
                h.addClass(r.collapsedClass).children().addClass(r.collapsedClass)
            } else {
                y = a(h.data("easytabs").panel);
                x = h.data("easytabs").ajax;
                if (x && (!r.cache || !h.data("easytabs").cached)) {
                    q.trigger("easytabs:ajax:beforeSend", [l, y]);
                    y.load(x, function(B, A, C) {
                        h.data("easytabs").cached = true;
                        q.trigger("easytabs:ajax:complete", [l, y, B, A, C])
                    })
                }
                h.data("easytabs").panel.show().addClass(r.panelActiveClass);
                h.addClass(r.tabActiveClass).children().addClass(r.tabActiveClass)
            }
        };
        var w = function() {
            f.tabs.children("a").bind("click.easytabs", function(x) {
                r.cycle = false;
                d = false;
                f.selectTab(a(this));
                x.preventDefault()
            })
        };
        var o = function(z, D, E, H) {
            f.panels.stop(true, true);
            if (u(q, "easytabs:before", [z, D, r])) {
                var A = f.panels.filter(":visible"),
                    y = D.parent(),
                    F, x, C, G, B = window.location.hash.match(/^[^\?]*/)[0];
                if (r.animate) {
                    F = s(D);
                    x = A.length ? k(A) : 0;
                    C = F - x
                }
                m = B;
                G = function() {
                    q.trigger("easytabs:midTransition", [z, D, r]);
                    if (r.animate && r.transitionIn == "fadeIn") {
                        if (C < 0) {
                            y.animate({
                                height: y.height() + C
                            }, v.halfSpeed).css({
                                "min-height": ""
                            })
                        }
                    }
                    if (r.updateHash && !d) {
                        window.location.hash = "#" + D.attr("id")
                    } else {
                        d = false
                    }
                    D[v.show](v.speed, r.transitionInEasing, function() {
                        y.css({
                            height: "",
                            "min-height": ""
                        });
                        q.trigger("easytabs:after", [z, D, r]);
                        if (typeof H == "function") {
                            H()
                        }
                    })
                };
                if (E && (!r.cache || !z.parent().data("easytabs").cached)) {
                    q.trigger("easytabs:ajax:beforeSend", [z, D]);
                    D.load(E, function(J, I, K) {
                        z.parent().data("easytabs").cached = true;
                        q.trigger("easytabs:ajax:complete", [z, D, J, I, K])
                    })
                }
                if (r.animate && r.transitionOut == "fadeOut") {
                    if (C > 0) {
                        y.animate({
                            height: (y.height() + C)
                        }, v.halfSpeed)
                    } else {
                        y.css({
                            "min-height": y.height()
                        })
                    }
                }
                f.tabs.filter("." + r.tabActiveClass).removeClass(r.tabActiveClass).children().removeClass(r.tabActiveClass);
                f.tabs.filter("." + r.collapsedClass).removeClass(r.collapsedClass).children().removeClass(r.collapsedClass);
                z.parent().addClass(r.tabActiveClass).children().addClass(r.tabActiveClass);
                f.panels.filter("." + r.panelActiveClass).removeClass(r.panelActiveClass);
                D.addClass(r.panelActiveClass);
                if (A.length) {
                    A[v.hide](v.speed, r.transitionOutEasing, G)
                } else {
                    D[v.uncollapse](v.speed, r.transitionUncollapseEasing, G)
                }
            }
        };
        var s = function(y) {
            if (y.data("easytabs") && y.data("easytabs").lastHeight) {
                return y.data("easytabs").lastHeight
            }
            var z = y.css("display"),
                x = y.wrap(a("<div>", {
                    position: "absolute",
                    visibility: "hidden",
                    overflow: "hidden"
                })).css({
                    position: "relative",
                    visibility: "hidden",
                    display: "block"
                }).outerHeight();
            y.unwrap();
            y.css({
                position: y.data("easytabs").position,
                visibility: y.data("easytabs").visibility,
                display: z
            });
            y.data("easytabs").lastHeight = x;
            return x
        };
        var k = function(y) {
            var x = y.outerHeight();
            if (y.data("easytabs")) {
                y.data("easytabs").lastHeight = x
            } else {
                y.data("easytabs", {
                    lastHeight: x
                })
            }
            return x
        };
        var n = function() {
            if (typeof a(window).hashchange === "function") {
                a(window).hashchange(function() {
                    f.selectTabFromHashChange()
                })
            } else {
                if (a.address && typeof a.address.change === "function") {
                    a.address.change(function() {
                        f.selectTabFromHashChange()
                    })
                }
            }
        };
        var c = function() {
            var x;
            if (r.cycle) {
                x = f.tabs.index(h);
                setTimeout(function() {
                    f.cycleTabs(x + 1)
                }, r.cycle)
            }
        };
        f.init()
    };
    a.fn.easytabs = function(c) {
        var b = arguments;
        return this.each(function() {
            var e = a(this),
                d = e.data("easytabs");
            if (undefined === d) {
                d = new a.easytabs(this, c);
                e.data("easytabs", d)
            }
            if (d.publicMethods[c]) {
                return d.publicMethods[c](Array.prototype.slice.call(b, 1))
            }
        })
    }
})(jQuery);

/*
jQuery hashchange event - v1.3 - 7/21/2010
http://benalman.com/projects/jquery-hashchange-plugin/
Copyright (c) 2010 "Cowboy" Ben Alman
Dual licensed under the MIT and GPL licenses.
http://benalman.com/about/license/
*/
(function($, e, b) {
    var c = "hashchange",
        h = document,
        f, g = $.event.special,
        i = h.documentMode,
        d = "on" + c in e && (i === b || i > 7);

    function a(j) {
        j = j || location.href;
        return "#" + j.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $.fn[c] = function(j) {
        return j ? this.bind(c, j) : this.trigger(c)
    };
    $.fn[c].delay = 50;
    g[c] = $.extend(g[c], {
        setup: function() {
            if (d) {
                return false
            }
            $(f.start)
        },
        teardown: function() {
            if (d) {
                return false
            }
            $(f.stop)
        }
    });
    f = (function() {
        var j = {},
            p, m = a(),
            k = function(q) {
                return q
            },
            l = k,
            o = k;
        j.start = function() {
            p || n()
        };
        j.stop = function() {
            p && clearTimeout(p);
            p = b
        };

        function n() {
            var r = a(),
                q = o(m);
            if (r !== m) {
                l(m = r, q);
                $(e).trigger(c)
            } else {
                if (q !== m) {
                    location.href = location.href.replace(/#.*/, "") + q
                }
            }
            p = setTimeout(n, $.fn[c].delay)
        }
        $.browser.msie && !d && (function() {
            var q, r;
            j.start = function() {
                if (!q) {
                    r = $.fn[c].src;
                    r = r && r + a();
                    q = $('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                        r || l(a());
                        n()
                    }).attr("src", r || "javascript:0").insertAfter("body")[0].contentWindow;
                    h.onpropertychange = function() {
                        try {
                            if (event.propertyName === "title") {
                                q.document.title = h.title
                            }
                        } catch (s) {}
                    }
                }
            };
            j.stop = k;
            o = function() {
                return a(q.location.href)
            };
            l = function(v, s) {
                var u = q.document,
                    t = $.fn[c].domain;
                if (v !== s) {
                    u.title = h.title;
                    u.open();
                    t && u.write('<script>document.domain="' + t + '"<\/script>');
                    u.close();
                    q.location.hash = v
                }
            }
        })();
        return j
    })()
})(jQuery, this);





/*
jQuery-Plugin "clearField"
@version: 1.1, 04.12.2010
@author: Stijn Van Minnebruggen
stijn@donotfold.be
http://www.donotfold.be
*/
(function($) {
    $.fn.clearField = function(s) {
        s = jQuery.extend({
            blurClass: 'clearFieldBlurred',
            activeClass: 'clearFieldActive',
            attribute: 'rel',
            value: ''
        }, s);
        return $(this).each(function() {
            var el = $(this);
            s.value = el.val();
            if (el.attr(s.attribute) == undefined) {
                el.attr(s.attribute, el.val()).addClass(s.blurClass)
            } else {
                s.value = el.attr(s.attribute)
            }
            el.focus(function() {
                if (el.val() == el.attr(s.attribute)) {
                    el.val('').removeClass(s.blurClass).addClass(s.activeClass)
                }
            });
            el.blur(function() {
                if (el.val() == '') {
                    el.val(el.attr(s.attribute)).removeClass(s.activeClass).addClass(s.blurClass)
                }
            })
        })
    }
})(jQuery);


/*
Lightbox v2.51
by Lokesh Dhakar - http://www.lokeshdhakar.com
For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/
Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
*/
(function() {
    var a, b, c;
    a = jQuery;
    c = function() {
        function a() {
            this.fileLoadingImage = "resources/themes/sybeha/images/loading.gif";
            this.fileCloseImage = "resources/themes/sybeha/images/close.png";
            this.resizeDuration = 700;
            this.fadeDuration = 500;
            this.labelImage = "Image";
            this.labelOf = "of"
        }
        return a
    }();
    b = function() {
        function b(a) {
            this.options = a;
            this.album = [];
            this.currentImageIndex = void 0;
            this.init()
        }
        b.prototype.init = function() {
            this.enable();
            return this.build()
        };
        b.prototype.enable = function() {
            var b = this;
            return a("body").on("click", "a[rel^=lightbox], area[rel^=lightbox]", function(c) {
                b.start(a(c.currentTarget));
                return false
            })
        };
        b.prototype.build = function() {
            var b, c = this;
            a("<div>", {
                id: "lightboxOverlay"
            }).after(a("<div/>", {
                id: "lightbox"
            }).append(a("<div/>", {
                "class": "lb-outerContainer"
            }).append(a("<div/>", {
                "class": "lb-container"
            }).append(a("<img/>", {
                "class": "lb-image"
            }), a("<div/>", {
                "class": "lb-nav"
            }).append(a("<a/>", {
                "class": "lb-prev"
            }), a("<a/>", {
                "class": "lb-next"
            })), a("<div/>", {
                "class": "lb-loader"
            }).append(a("<a/>", {
                "class": "lb-cancel"
            }).append(a("<img/>", {
                src: this.options.fileLoadingImage
            }))))), a("<div/>", {
                "class": "lb-dataContainer"
            }).append(a("<div/>", {
                "class": "lb-data"
            }).append(a("<div/>", {
                "class": "lb-details"
            }).append(a("<span/>", {
                "class": "lb-caption"
            }), a("<span/>", {
                "class": "lb-number"
            })), a("<div/>", {
                "class": "lb-closeContainer"
            }).append(a("<a/>", {
                "class": "lb-close"
            }).append(a("<img/>", {
                src: this.options.fileCloseImage
            }))))))).appendTo(a("body"));
            a("#lightboxOverlay").hide().on("click", function(a) {
                c.end();
                return false
            });
            b = a("#lightbox");
            b.hide().on("click", function(b) {
                if (a(b.target).attr("id") === "lightbox") c.end();
                return false
            });
            b.find(".lb-outerContainer").on("click", function(b) {
                if (a(b.target).attr("id") === "lightbox") c.end();
                return false
            });
            b.find(".lb-prev").on("click", function(a) {
                c.changeImage(c.currentImageIndex - 1);
                return false
            });
            b.find(".lb-next").on("click", function(a) {
                c.changeImage(c.currentImageIndex + 1);
                return false
            });
            b.find(".lb-loader, .lb-close").on("click", function(a) {
                c.end();
                return false
            })
        };
        b.prototype.start = function(b) {
            var c, d, e, f, g, h, i, j, k;
            a(window).on("resize", this.sizeOverlay);
            a("select, object, embed").css({
                visibility: "hidden"
            });
            a("#lightboxOverlay").width(a(document).width()).height(a(document).height()).fadeIn(this.options.fadeDuration);
            this.album = [];
            g = 0;
            if (b.attr("rel") === "lightbox") {
                this.album.push({
                    link: b.attr("href"),
                    title: b.attr("title")
                })
            } else {
                k = a(b.prop("tagName") + '[rel="' + b.attr("rel") + '"]');
                for (f = 0, j = k.length; f < j; f++) {
                    e = k[f];
                    this.album.push({
                        link: a(e).attr("href"),
                        title: a(e).attr("title")
                    });
                    if (a(e).attr("href") === b.attr("href")) g = f
                }
            }
            d = a(window);
            i = d.scrollTop() + d.height() / 10;
            h = d.scrollLeft();
            c = a("#lightbox");
            c.css({
                top: i + "px",
                left: h + "px"
            }).fadeIn(this.options.fadeDuration);
            this.changeImage(g)
        };
        b.prototype.changeImage = function(b) {
            var c, d, e, f = this;
            this.disableKeyboardNav();
            d = a("#lightbox");
            c = d.find(".lb-image");
            this.sizeOverlay();
            a("#lightboxOverlay").fadeIn(this.options.fadeDuration);
            a(".loader").fadeIn("slow");
            d.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide();
            d.find(".lb-outerContainer").addClass("animating");
            e = new Image;
            e.onload = function() {
                c.attr("src", f.album[b].link);
                c.width = e.width;
                c.height = e.height;
                return f.sizeContainer(e.width, e.height)
            };
            e.src = this.album[b].link;
            this.currentImageIndex = b
        };
        b.prototype.sizeOverlay = function() {
            return a("#lightboxOverlay").width(a(document).width()).height(a(document).height())
        };
        b.prototype.sizeContainer = function(b, c) {
            var d, e, f, g, h, i, j, k, l, m, n, o = this;
            e = a("#lightbox");
            f = e.find(".lb-outerContainer");
            n = f.outerWidth();
            m = f.outerHeight();
            d = e.find(".lb-container");
            j = parseInt(d.css("padding-top"), 10);
            i = parseInt(d.css("padding-right"), 10);
            g = parseInt(d.css("padding-bottom"), 10);
            h = parseInt(d.css("padding-left"), 10);
            l = b + h + i;
            k = c + j + g;
            if (l !== n && k !== m) {
                f.animate({
                    width: l,
                    height: k
                }, this.options.resizeDuration, "swing")
            } else if (l !== n) {
                f.animate({
                    width: l
                }, this.options.resizeDuration, "swing")
            } else if (k !== m) {
                f.animate({
                    height: k
                }, this.options.resizeDuration, "swing")
            }
            setTimeout(function() {
                e.find(".lb-dataContainer").width(l);
                e.find(".lb-prevLink").height(k);
                e.find(".lb-nextLink").height(k);
                o.showImage()
            }, this.options.resizeDuration)
        };
        b.prototype.showImage = function() {
            var b;
            b = a("#lightbox");
            b.find(".lb-loader").hide();
            b.find(".lb-image").fadeIn("slow");
            this.updateNav();
            this.updateDetails();
            this.preloadNeighboringImages();
            this.enableKeyboardNav()
        };
        b.prototype.updateNav = function() {
            var b;
            b = a("#lightbox");
            b.find(".lb-nav").show();
            if (this.currentImageIndex > 0) b.find(".lb-prev").show();
            if (this.currentImageIndex < this.album.length - 1) {
                b.find(".lb-next").show()
            }
        };
        b.prototype.updateDetails = function() {
            var b, c = this;
            b = a("#lightbox");
            if (typeof this.album[this.currentImageIndex].title !== "undefined" && this.album[this.currentImageIndex].title !== "") {
                b.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast")
            }
            if (this.album.length > 1) {
                b.find(".lb-number").html(this.options.labelImage + " " + (this.currentImageIndex + 1) + " " + this.options.labelOf + "  " + this.album.length).fadeIn("fast")
            } else {
                b.find(".lb-number").hide()
            }
            b.find(".lb-outerContainer").removeClass("animating");
            b.find(".lb-dataContainer").fadeIn(this.resizeDuration, function() {
                return c.sizeOverlay()
            })
        };
        b.prototype.preloadNeighboringImages = function() {
            var a, b;
            if (this.album.length > this.currentImageIndex + 1) {
                a = new Image;
                a.src = this.album[this.currentImageIndex + 1].link
            }
            if (this.currentImageIndex > 0) {
                b = new Image;
                b.src = this.album[this.currentImageIndex - 1].link
            }
        };
        b.prototype.enableKeyboardNav = function() {
            a(document).on("keyup.keyboard", a.proxy(this.keyboardAction, this))
        };
        b.prototype.disableKeyboardNav = function() {
            a(document).off(".keyboard")
        };
        b.prototype.keyboardAction = function(a) {
            var b, c, d, e, f;
            b = 27;
            c = 37;
            d = 39;
            f = a.keyCode;
            e = String.fromCharCode(f).toLowerCase();
            if (f === b || e.match(/x|o|c/)) {
                this.end()
            } else if (e === "p" || f === c) {
                if (this.currentImageIndex !== 0) {
                    this.changeImage(this.currentImageIndex - 1)
                }
            } else if (e === "n" || f === d) {
                if (this.currentImageIndex !== this.album.length - 1) {
                    this.changeImage(this.currentImageIndex + 1)
                }
            }
        };
        b.prototype.end = function() {
            this.disableKeyboardNav();
            a(window).off("resize", this.sizeOverlay);
            a("#lightbox").fadeOut(this.options.fadeDuration);
            a("#lightboxOverlay").fadeOut(this.options.fadeDuration);
            return a("select, object, embed").css({
                visibility: "visible"
            })
        };
        return b
    }();
    a(function() {
        var a, d;
        d = new c;
        return a = new b(d)
    })
}).call(this);
