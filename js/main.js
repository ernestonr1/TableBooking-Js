+ function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.carousel"),
                a = t.extend({}, i.DEFAULTS, s.data(), "object" == typeof e && e),
                r = "string" == typeof e ? e : a.slide;
            n || s.data("bs.carousel", n = new i(this, a)), "number" == typeof e ? n.to(e) : r ? n[r]() : a.interval && n.pause().cycle()
        })
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e),
            s = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (s && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1,
            a = (i + n) % this.$items.length;
        return this.$items.eq(a)
    }, i.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    }, i.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    }, i.prototype.slide = function(e, s) {
        var n = this.$element.find(".item.active"),
            a = s || this.getItemForDirection(e, n),
            r = this.interval,
            o = "next" == e ? "left" : "right",
            l = this;
        if (a.hasClass("active")) return this.sliding = !1;
        var h = a[0],
            c = t.Event("slide.bs.carousel", {
                relatedTarget: h,
                direction: o
            });
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, r && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(a)]);
                d && d.addClass("active")
            }
            var u = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: o
            });
            return t.support.transition && this.$element.hasClass("slide") ? (a.addClass(e), a[0].offsetWidth, n.addClass(o), a.addClass(o), n.one("bsTransitionEnd", function() {
                a.removeClass([e, o].join(" ")).addClass("active"), n.removeClass(["active", o].join(" ")), l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(u)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), a.addClass("active"), this.sliding = !1, this.$element.trigger(u)), r && this.cycle(), this
        }
    };
    var s = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = s, this
    };
    var n = function(i) {
        var s, n = t(this),
            a = t(n.attr("data-target") || (s = n.attr("href")) && s.replace(/.*(?=#[^\s]+$)/, ""));
        if (a.hasClass("carousel")) {
            var r = t.extend({}, a.data(), n.data()),
                o = n.attr("data-slide-to");
            o && (r.interval = !1), e.call(a, r), o && a.data("bs.carousel").to(o), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery); +
function(t) {
    "use strict";

    function e(e, i) {
        return this.each(function() {
            var s = t(this),
                n = s.data("bs.modal"),
                a = t.extend({}, o.DEFAULTS, s.data(), "object" == typeof e && e);
            n || s.data("bs.modal", n = new o(this, a)), "string" == typeof e ? n[e](i) : a.show && n.show(i)
        })
    }
    var o = function(e, o) {
        this.options = o, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    o.VERSION = "3.3.7", o.TRANSITION_DURATION = 300, o.BACKDROP_TRANSITION_DURATION = 150, o.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, o.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t)
    }, o.prototype.show = function(e) {
        var i = this,
            s = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(s), this.isShown || s.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            i.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(i.$element) && (i.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var s = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(i.$body), i.$element.show().scrollTop(0), i.adjustDialog(), s && i.$element[0].offsetWidth, i.$element.addClass("in"), i.enforceFocus();
            var n = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            s ? i.$dialog.one("bsTransitionEnd", function() {
                i.$element.trigger("focus").trigger(n)
            }).emulateTransitionEnd(o.TRANSITION_DURATION) : i.$element.trigger("focus").trigger(n)
        }))
    }, o.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : this.hideModal())
    }, o.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, o.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, o.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, o.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, o.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, o.prototype.backdrop = function(e) {
        var i = this,
            s = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && s;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + s).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            n ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                i.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION) : a()
        } else e && e()
    }, o.prototype.handleUpdate = function() {
        this.adjustDialog()
    }, o.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, o.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    }, o.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, o.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, o.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    }, o.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var i = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = o, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(o) {
        var i = t(this),
            s = i.attr("href"),
            n = t(i.attr("data-target") || s && s.replace(/.*(?=#[^\s]+$)/, "")),
            a = n.data("bs.modal") ? "toggle" : t.extend({
                remote: !/#/.test(s) && s
            }, n.data(), i.data());
        i.is("a") && o.preventDefault(), n.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || n.one("hidden.bs.modal", function() {
                i.is(":visible") && i.trigger("focus")
            })
        }), e.call(n, a, this)
    })
}(jQuery); +
function(t) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var o = t(this),
                f = o.data("bs.affix"),
                n = "object" == typeof i && i;
            f || o.data("bs.affix", f = new e(this, n)), "string" == typeof i && f[i]()
        })
    }
    var e = function(i, o) {
        this.options = t.extend({}, e.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    e.VERSION = "3.3.7", e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
        offset: 0,
        target: window
    }, e.prototype.getState = function(t, i, e, o) {
        var f = this.$target.scrollTop(),
            n = this.$element.offset(),
            s = this.$target.height();
        if (null != e && "top" == this.affixed) return f < e && "top";
        if ("bottom" == this.affixed) return null != e ? !(f + this.unpin <= n.top) && "bottom" : !(f + s <= t - o) && "bottom";
        var a = null == this.affixed,
            h = a ? f : n.top,
            r = a ? s : i;
        return null != e && f <= e ? "top" : null != o && h + r >= t - o && "bottom"
    }, e.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(e.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - t
    }, e.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var i = this.$element.height(),
                o = this.options.offset,
                f = o.top,
                n = o.bottom,
                s = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (n = f = o), "function" == typeof f && (f = o.top(this.$element)), "function" == typeof n && (n = o.bottom(this.$element));
            var a = this.getState(s, i, f, n);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var h = "affix" + (a ? "-" + a : ""),
                    r = t.Event(h + ".bs.affix");
                if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(e.RESET).addClass(h).trigger(h.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({
                top: s - i - n
            })
        }
    };
    var o = t.fn.affix;
    t.fn.affix = i, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var e = t(this),
                o = e.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), null != o.offsetTop && (o.offset.top = o.offsetTop), i.call(e, o)
        })
    })
}(jQuery); +
function(n) {
    "use strict";

    function t() {
        var n = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in t)
            if (void 0 !== n.style[i]) return {
                end: t[i]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            r = this;
        n(this).one("bsTransitionEnd", function() {
            i = !0
        });
        var e = function() {
            i || n(r).trigger(n.support.transition.end)
        };
        return setTimeout(e, t), this
    }, n(function() {
        n.support.transition = t(), n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery); +
function(t) {
    "use strict";

    function e(e) {
        return this.each(function() {
            var o = t(this),
                n = o.data("bs.tooltip"),
                s = "object" == typeof e && e;
            !n && /destroy|hide/.test(e) || (n || o.data("bs.tooltip", n = new i(this, s)), "string" == typeof e && n[e]())
        })
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--;) {
            var r = n[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var l = "hover" == r ? "mouseenter" : "focusin",
                    a = "hover" == r ? "mouseleave" : "focusout";
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o)
        }), e
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        if (i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), !i.isInStateTrue()) return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this,
                s = this.tip(),
                r = this.getUID(this.type);
            this.setContent(), s.attr("id", r), this.$element.attr("aria-describedby", r), this.options.animation && s.addClass("fade");
            var l = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                a = /\s?auto?\s?/i,
                p = a.test(l);
            p && (l = l.replace(a, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(l).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var h = this.getPosition(),
                f = s[0].offsetWidth,
                c = s[0].offsetHeight;
            if (p) {
                var u = l,
                    d = this.getPosition(this.$viewport);
                l = "bottom" == l && h.bottom + c > d.bottom ? "top" : "top" == l && h.top - c < d.top ? "bottom" : "right" == l && h.right + f > d.width ? "left" : "left" == l && h.left - f < d.left ? "right" : l, s.removeClass(u).addClass(l)
            }
            var g = this.getCalculatedOffset(l, h, f, c);
            this.applyPlacement(g, l);
            var v = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n)
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v()
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(),
            n = o[0].offsetWidth,
            s = o[0].offsetHeight,
            r = parseInt(o.css("margin-top"), 10),
            l = parseInt(o.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(l) && (l = 0), e.top += r, e.left += l, t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                })
            }
        }, e), 0), o.addClass("in");
        var a = o[0].offsetWidth,
            p = o[0].offsetHeight;
        "top" == i && p != s && (e.top = e.top + s - p);
        var h = this.getViewportAdjustedDelta(i, e, a, p);
        h.left ? e.left += h.left : e.top += h.top;
        var f = /top|bottom/.test(i),
            c = f ? 2 * h.left - n + a : 2 * h.top - s + p,
            u = f ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][u], f)
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element && n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), e && e()
        }
        var n = this,
            s = t(this.$tip),
            r = t.Event("hide.bs." + this.type);
        if (this.$element.trigger(r), !r.isDefaultPrevented()) return s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), this.hoverState = null, this
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function() {
        return this.getTitle()
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0],
            o = "BODY" == i.tagName,
            n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = window.SVGElement && i instanceof window.SVGElement,
            r = o ? {
                top: 0,
                left: 0
            } : s ? null : e.offset(),
            l = {
                scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
            },
            a = o ? {
                width: t(window).width(),
                height: t(window).height()
            } : null;
        return t.extend({}, n, l, a, r)
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0,
            r = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var l = e.top - s - r.scroll,
                a = e.top + s - r.scroll + o;
            l < r.top ? n.top = r.top - l : a > r.top + r.height && (n.top = r.top + r.height - a)
        } else {
            var p = e.left - s,
                h = e.left + s + i;
            p < r.left ? n.left = r.left - p : h > r.right && (n.left = r.left + r.width - h)
        }
        return n
    }, i.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function(t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function() {
        this.enabled = !0
    }, i.prototype.disable = function() {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this
    }
}(jQuery); +
function(t) {
    "use strict";

    function o(o) {
        return this.each(function() {
            var n = t(this),
                r = n.data("bs.popover"),
                i = "object" == typeof o && o;
            !r && /destroy|hide/.test(o) || (r || n.data("bs.popover", r = new e(this, i)), "string" == typeof o && r[o]())
        })
    }
    var e = function(t, o) {
        this.init("popover", t, o)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.VERSION = "3.3.7", e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            o = this.getTitle(),
            e = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](o), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof e ? "html" : "append" : "text"](e), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function() {
        var t = this.$element,
            o = this.options;
        return t.attr("data-content") || ("function" == typeof o.content ? o.content.call(t[0]) : o.content)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var n = t.fn.popover;
    t.fn.popover = o, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
        return t.fn.popover = n, this
    }
}(jQuery); +
function(t) {
    "use strict";

    function e(e) {
        var a, s = e.attr("data-target") || (a = e.attr("href")) && a.replace(/.*(?=#[^\s]+$)/, "");
        return t(s)
    }

    function a(e) {
        return this.each(function() {
            var a = t(this),
                i = a.data("bs.collapse"),
                n = t.extend({}, s.DEFAULTS, a.data(), "object" == typeof e && e);
            !i && n.toggle && /show|hide/.test(e) && (n.toggle = !1), i || a.data("bs.collapse", i = new s(this, n)), "string" == typeof e && i[e]()
        })
    }
    var s = function(e, a) {
        this.$element = t(e), this.options = t.extend({}, s.DEFAULTS, a), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    s.VERSION = "3.3.7", s.TRANSITION_DURATION = 350, s.DEFAULTS = {
        toggle: !0
    }, s.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, s.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, i = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(i && i.length && (e = i.data("bs.collapse"), e && e.transitioning))) {
                var n = t.Event("show.bs.collapse");
                if (this.$element.trigger(n), !n.isDefaultPrevented()) {
                    i && i.length && (a.call(i, "hide"), e || i.data("bs.collapse", null));
                    var l = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[l](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var o = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[l](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return o.call(this);
                    var r = t.camelCase(["scroll", l].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(o, this)).emulateTransitionEnd(s.TRANSITION_DURATION)[l](this.$element[0][r])
                }
            }
        }
    }, s.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var a = this.dimension();
                this.$element[a](this.$element[a]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var i = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[a](0).one("bsTransitionEnd", t.proxy(i, this)).emulateTransitionEnd(s.TRANSITION_DURATION) : i.call(this)
            }
        }
    }, s.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, s.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(a, s) {
            var i = t(s);
            this.addAriaAndCollapsedClass(e(i), i)
        }, this)).end()
    }, s.prototype.addAriaAndCollapsedClass = function(t, e) {
        var a = t.hasClass("in");
        t.attr("aria-expanded", a), e.toggleClass("collapsed", !a).attr("aria-expanded", a)
    };
    var i = t.fn.collapse;
    t.fn.collapse = a, t.fn.collapse.Constructor = s, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(s) {
        var i = t(this);
        i.attr("data-target") || s.preventDefault();
        var n = e(i),
            l = n.data("bs.collapse"),
            o = l ? "toggle" : i.data();
        a.call(n, o)
    })
}(jQuery);
! function(t, e) {
    function i() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    function a() {
        var t = new Date;
        return i(t.getFullYear(), t.getMonth(), t.getDate())
    }

    function s(t) {
        return function() {
            return this[t].apply(this, arguments)
        }
    }

    function n(e, i) {
        function a(t, e) {
            return e.toLowerCase()
        }
        var s, n = t(e).data(),
            r = {},
            h = new RegExp("^" + i.toLowerCase() + "([A-Z])");
        i = new RegExp("^" + i.toLowerCase());
        for (var o in n) i.test(o) && (s = o.replace(h, a), r[s] = n[o]);
        return r
    }

    function r(e) {
        var i = {};
        if (f[e] || (e = e.split("-")[0], f[e])) {
            var a = f[e];
            return t.each(p, function(t, e) {
                e in a && (i[e] = a[e])
            }), i
        }
    }
    var h = t(window),
        o = function() {
            var e = {
                get: function(t) {
                    return this.slice(t)[0]
                },
                contains: function(t) {
                    for (var e = t && t.valueOf(), i = 0, a = this.length; i < a; i++)
                        if (this[i].valueOf() === e) return i;
                    return -1
                },
                remove: function(t) {
                    this.splice(t, 1)
                },
                replace: function(e) {
                    e && (t.isArray(e) || (e = [e]), this.clear(), this.push.apply(this, e))
                },
                clear: function() {
                    this.length = 0
                },
                copy: function() {
                    var t = new o;
                    return t.replace(this), t
                }
            };
            return function() {
                var i = [];
                return i.push.apply(i, arguments), t.extend(i, e), i
            }
        }(),
        d = function(e, i) {
            this.dates = new o, this.viewDate = a(), this.focusDate = null, this._process_options(i), this.element = t(e), this.isInline = !1, this.isInput = this.element.is("input"), this.component = !!this.element.is(".date") && this.element.find(".add-on, .input-group-addon, .btn"), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = t(g.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot th.today, tfoot th.clear").attr("colspan", function(t, e) {
                return parseInt(e) + 1
            }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
        };
    d.prototype = {
        constructor: d,
        _process_options: function(e) {
            this._o = t.extend({}, this._o, e);
            var i = this.o = t.extend({}, this._o),
                a = i.language;
            switch (f[a] || (a = a.split("-")[0], f[a] || (a = u.language)), i.language = a, i.startView) {
                case 2:
                case "decade":
                    i.startView = 2;
                    break;
                case 1:
                case "year":
                    i.startView = 1;
                    break;
                default:
                    i.startView = 0
            }
            switch (i.minViewMode) {
                case 1:
                case "months":
                    i.minViewMode = 1;
                    break;
                case 2:
                case "years":
                    i.minViewMode = 2;
                    break;
                default:
                    i.minViewMode = 0
            }
            i.startView = Math.max(i.startView, i.minViewMode), i.multidate !== !0 && (i.multidate = Number(i.multidate) || !1, i.multidate !== !1 ? i.multidate = Math.max(0, i.multidate) : i.multidate = 1), i.multidateSeparator = String(i.multidateSeparator), i.weekStart %= 7, i.weekEnd = (i.weekStart + 6) % 7;
            var s = g.parseFormat(i.format);
            i.startDate !== -(1 / 0) && (i.startDate ? i.startDate instanceof Date ? i.startDate = this._local_to_utc(this._zero_time(i.startDate)) : i.startDate = g.parseDate(i.startDate, s, i.language) : i.startDate = -(1 / 0)), i.endDate !== 1 / 0 && (i.endDate ? i.endDate instanceof Date ? i.endDate = this._local_to_utc(this._zero_time(i.endDate)) : i.endDate = g.parseDate(i.endDate, s, i.language) : i.endDate = 1 / 0), i.daysOfWeekDisabled = i.daysOfWeekDisabled || [], t.isArray(i.daysOfWeekDisabled) || (i.daysOfWeekDisabled = i.daysOfWeekDisabled.split(/[,\s]*/)), i.daysOfWeekDisabled = t.map(i.daysOfWeekDisabled, function(t) {
                return parseInt(t, 10)
            });
            var n = String(i.orientation).toLowerCase().split(/\s+/g),
                r = i.orientation.toLowerCase();
            if (n = t.grep(n, function(t) {
                    return /^auto|left|right|top|bottom$/.test(t)
                }), i.orientation = {
                    x: "auto",
                    y: "auto"
                }, r && "auto" !== r)
                if (1 === n.length) switch (n[0]) {
                    case "top":
                    case "bottom":
                        i.orientation.y = n[0];
                        break;
                    case "left":
                    case "right":
                        i.orientation.x = n[0]
                } else r = t.grep(n, function(t) {
                    return /^left|right$/.test(t)
                }), i.orientation.x = r[0] || "auto", r = t.grep(n, function(t) {
                    return /^top|bottom$/.test(t)
                }), i.orientation.y = r[0] || "auto";
                else;
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++) i = t[n][0], 2 === t[n].length ? (a = e, s = t[n][1]) : 3 === t[n].length && (a = t[n][1], s = t[n][2]), i.on(s, a)
        },
        _unapplyEvents: function(t) {
            for (var i, a, s, n = 0; n < t.length; n++) i = t[n][0], 2 === t[n].length ? (s = e, a = t[n][1]) : 3 === t[n].length && (s = t[n][1], a = t[n][2]), i.off(a, s)
        },
        _buildEvents: function() {
            this.isInput ? this._events = [
                [this.element, {
                    focus: t.proxy(this.show, this),
                    keyup: t.proxy(function(e) {
                        t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1 && this.update()
                    }, this),
                    keydown: t.proxy(this.keydown, this)
                }]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), {
                    focus: t.proxy(this.show, this),
                    keyup: t.proxy(function(e) {
                        t.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1 && this.update()
                    }, this),
                    keydown: t.proxy(this.keydown, this)
                }],
                [this.component, {
                    click: t.proxy(this.show, this)
                }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, {
                    click: t.proxy(this.show, this)
                }]
            ], this._events.push([this.element, "*", {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }], [this.element, {
                blur: t.proxy(function(t) {
                    this._focused_from = t.target
                }, this)
            }]), this._secondaryEvents = [
                [this.picker, {
                    click: t.proxy(this.click, this)
                }],
                [t(window), {
                    resize: t.proxy(this.place, this)
                }],
                [t(document), {
                    "mousedown touchstart": t.proxy(function(t) {
                        this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide()
                    }, this)
                }]
            ]
        },
        _attachEvents: function() {
            this._detachEvents(), this._applyEvents(this._events)
        },
        _detachEvents: function() {
            this._unapplyEvents(this._events)
        },
        _attachSecondaryEvents: function() {
            this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
        },
        _detachSecondaryEvents: function() {
            this._unapplyEvents(this._secondaryEvents)
        },
        _trigger: function(e, i) {
            var a = i || this.dates.get(-1),
                s = this._utc_to_local(a);
            this.element.trigger({
                type: e,
                date: s,
                dates: t.map(this.dates, this._utc_to_local),
                format: t.proxy(function(t, e) {
                    0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format;
                    var i = this.dates.get(t);
                    return g.formatDate(i, e, this.o.language)
                }, this)
            })
        },
        show: function() {
            this.isInline || this.picker.appendTo("body"), this.picker.show(), this.place(), this._attachSecondaryEvents(), this._trigger("show")
        },
        hide: function() {
            this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide"))
        },
        remove: function() {
            this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
        },
        _utc_to_local: function(t) {
            return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        _local_to_utc: function(t) {
            return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset())
        },
        _zero_time: function(t) {
            return t && new Date(t.getFullYear(), t.getMonth(), t.getDate())
        },
        _zero_utc_time: function(t) {
            return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()))
        },
        getDates: function() {
            return t.map(this.dates, this._utc_to_local)
        },
        getUTCDates: function() {
            return t.map(this.dates, function(t) {
                return new Date(t)
            })
        },
        getDate: function() {
            return this._utc_to_local(this.getUTCDate())
        },
        getUTCDate: function() {
            return new Date(this.dates.get(-1))
        },
        setDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, e), this._trigger("changeDate"), this.setValue()
        },
        setUTCDates: function() {
            var e = t.isArray(arguments[0]) ? arguments[0] : arguments;
            this.update.apply(this, t.map(e, this._utc_to_local)), this._trigger("changeDate"), this.setValue()
        },
        setDate: s("setDates"),
        setUTCDate: s("setUTCDates"),
        setValue: function() {
            var t = this.getFormattedDate();
            this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change()
        },
        getFormattedDate: function(i) {
            i === e && (i = this.o.format);
            var a = this.o.language;
            return t.map(this.dates, function(t) {
                return g.formatDate(t, i, a)
            }).join(this.o.multidateSeparator)
        },
        setStartDate: function(t) {
            this._process_options({
                startDate: t
            }), this.update(), this.updateNavArrows()
        },
        setEndDate: function(t) {
            this._process_options({
                endDate: t
            }), this.update(), this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(t) {
            this._process_options({
                daysOfWeekDisabled: t
            }), this.update(), this.updateNavArrows()
        },
        place: function() {
            if (!this.isInline) {
                var e = this.picker.outerWidth(),
                    i = this.picker.outerHeight(),
                    a = 10,
                    s = h.width(),
                    n = h.height(),
                    r = h.scrollTop(),
                    o = [];
                this.element.parents().each(function() {
                    var e = t(this).css("z-index");
                    "auto" !== e && 0 !== e && o.push(parseInt(e))
                });
                var d = Math.max.apply(Math, o) + 10,
                    l = this.component ? this.component.parent().offset() : this.element.offset(),
                    c = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                    u = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                    p = l.left,
                    f = l.top;
                this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (p -= e - u)) : (this.picker.addClass("datepicker-orient-left"), l.left < 0 ? p -= l.left - a : l.left + e > s && (p = s - e - a));
                var g, v, D = this.o.orientation.y;
                "auto" === D && (g = -r + l.top - i, v = r + n - (l.top + c + i), D = Math.max(g, v) === v ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + D), "top" === D ? f += c : f -= i + parseInt(this.picker.css("padding-top")), this.picker.css({
                    top: f,
                    left: p,
                    zIndex: d
                })
            }
        },
        _allow_update: !0,
        update: function() {
            if (this._allow_update) {
                var e = this.dates.copy(),
                    i = [],
                    a = !1;
                arguments.length ? (t.each(arguments, t.proxy(function(t, e) {
                    e instanceof Date && (e = this._local_to_utc(e)), i.push(e)
                }, this)), a = !0) : (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), i = i && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = t.map(i, t.proxy(function(t) {
                    return g.parseDate(t, this.o.format, this.o.language)
                }, this)), i = t.grep(i, t.proxy(function(t) {
                    return t < this.o.startDate || t > this.o.endDate || !t
                }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), a ? this.setValue() : i.length && String(e) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && e.length && this._trigger("clearDate"), this.fill()
            }
        },
        fillDow: function() {
            var t = this.o.weekStart,
                e = "<tr>";
            if (this.o.calendarWeeks) {
                var i = '<th class="cw">&nbsp;</th>';
                e += i, this.picker.find(".datepicker-days thead tr:first-child").prepend(i)
            }
            for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + f[this.o.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "", e = 0; e < 12;) t += '<span class="month">' + f[this.o.language].monthsShort[e++] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(e) {
            e && e.length ? this.range = t.map(e, function(t) {
                return t.valueOf()
            }) : delete this.range, this.fill()
        },
        getClassNames: function(e) {
            var i = [],
                a = this.viewDate.getUTCFullYear(),
                s = this.viewDate.getUTCMonth(),
                n = new Date;
            return e.getUTCFullYear() < a || e.getUTCFullYear() === a && e.getUTCMonth() < s ? i.push("old") : (e.getUTCFullYear() > a || e.getUTCFullYear() === a && e.getUTCMonth() > s) && i.push("new"), this.focusDate && e.valueOf() === this.focusDate.valueOf() && i.push("focused"), this.o.todayHighlight && e.getUTCFullYear() === n.getFullYear() && e.getUTCMonth() === n.getMonth() && e.getUTCDate() === n.getDate() && i.push("today"), this.dates.contains(e) !== -1 && i.push("active"), (e.valueOf() < this.o.startDate || e.valueOf() > this.o.endDate || t.inArray(e.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) && i.push("disabled"), this.range && (e > this.range[0] && e < this.range[this.range.length - 1] && i.push("range"), t.inArray(e.valueOf(), this.range) !== -1 && i.push("selected")), i
        },
        fill: function() {
            var a, s = new Date(this.viewDate),
                n = s.getUTCFullYear(),
                r = s.getUTCMonth(),
                h = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCFullYear() : -(1 / 0),
                o = this.o.startDate !== -(1 / 0) ? this.o.startDate.getUTCMonth() : -(1 / 0),
                d = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                l = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                c = f[this.o.language].today || f.en.today || "",
                u = f[this.o.language].clear || f.en.clear || "";
            if (!isNaN(n) && !isNaN(r)) {
                this.picker.find(".datepicker-days thead th.datepicker-switch").text(f[this.o.language].months[r] + " " + n), this.picker.find("tfoot th.today").text(c).toggle(this.o.todayBtn !== !1), this.picker.find("tfoot th.clear").text(u).toggle(this.o.clearBtn !== !1), this.updateNavArrows(), this.fillMonths();
                var p = i(n, r - 1, 28),
                    v = g.getDaysInMonth(p.getUTCFullYear(), p.getUTCMonth());
                p.setUTCDate(v), p.setUTCDate(v - (p.getUTCDay() - this.o.weekStart + 7) % 7);
                var D = new Date(p);
                D.setUTCDate(D.getUTCDate() + 42), D = D.valueOf();
                for (var m, y = []; p.valueOf() < D;) {
                    if (p.getUTCDay() === this.o.weekStart && (y.push("<tr>"), this.o.calendarWeeks)) {
                        var w = new Date(+p + (this.o.weekStart - p.getUTCDay() - 7) % 7 * 864e5),
                            k = new Date(Number(w) + (11 - w.getUTCDay()) % 7 * 864e5),
                            _ = new Date(Number(_ = i(k.getUTCFullYear(), 0, 1)) + (11 - _.getUTCDay()) % 7 * 864e5),
                            C = (k - _) / 864e5 / 7 + 1;
                        y.push('<td class="cw">' + C + "</td>")
                    }
                    if (m = this.getClassNames(p), m.push("day"), this.o.beforeShowDay !== t.noop) {
                        var T = this.o.beforeShowDay(this._utc_to_local(p));
                        T === e ? T = {} : "boolean" == typeof T ? T = {
                            enabled: T
                        } : "string" == typeof T && (T = {
                            classes: T
                        }), T.enabled === !1 && m.push("disabled"), T.classes && (m = m.concat(T.classes.split(/\s+/))), T.tooltip && (a = T.tooltip)
                    }
                    m = t.unique(m), y.push('<td class="' + m.join(" ") + '"' + (a ? ' title="' + a + '"' : "") + ">" + p.getUTCDate() + "</td>"), a = null, p.getUTCDay() === this.o.weekEnd && y.push("</tr>"), p.setUTCDate(p.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(y.join(""));
                var b = this.picker.find(".datepicker-months").find("th:eq(1)").text(n).end().find("span").removeClass("active");
                t.each(this.dates, function(t, e) {
                    e.getUTCFullYear() === n && b.eq(e.getUTCMonth()).addClass("active")
                }), (n < h || n > d) && b.addClass("disabled"), n === h && b.slice(0, o).addClass("disabled"), n === d && b.slice(l + 1).addClass("disabled"), y = "", n = 10 * parseInt(n / 10, 10);
                var U = this.picker.find(".datepicker-years").find("th:eq(1)").text(n + "-" + (n + 9)).end().find("td");
                n -= 1;
                for (var M, x = t.map(this.dates, function(t) {
                        return t.getUTCFullYear()
                    }), S = -1; S < 11; S++) M = ["year"], S === -1 ? M.push("old") : 10 === S && M.push("new"), t.inArray(n, x) !== -1 && M.push("active"), (n < h || n > d) && M.push("disabled"), y += '<span class="' + M.join(" ") + '">' + n + "</span>", n += 1;
                U.html(y)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t = new Date(this.viewDate),
                    e = t.getUTCFullYear(),
                    i = t.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        });
                        break;
                    case 1:
                    case 2:
                        this.o.startDate !== -(1 / 0) && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                            visibility: "hidden"
                        }) : this.picker.find(".prev").css({
                            visibility: "visible"
                        }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                            visibility: "hidden"
                        }) : this.picker.find(".next").css({
                            visibility: "visible"
                        })
                }
            }
        },
        click: function(e) {
            e.preventDefault();
            var a, s, n, r = t(e.target).closest("span, td, th");
            if (1 === r.length) switch (r[0].nodeName.toLowerCase()) {
                case "th":
                    switch (r[0].className) {
                        case "datepicker-switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            var h = g.modes[this.viewMode].navStep * ("prev" === r[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, h), this._trigger("changeMonth", this.viewDate);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, h), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                            }
                            this.fill();
                            break;
                        case "today":
                            var o = new Date;
                            o = i(o.getFullYear(), o.getMonth(), o.getDate(), 0, 0, 0), this.showMode(-2);
                            var d = "linked" === this.o.todayBtn ? null : "view";
                            this._setDate(o, d);
                            break;
                        case "clear":
                            var l;
                            this.isInput ? l = this.element : this.component && (l = this.element.find("input")), l && l.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
                    }
                    break;
                case "span":
                    r.is(".disabled") || (this.viewDate.setUTCDate(1), r.is(".month") ? (n = 1, s = r.parent().find("span").index(r), a = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(s), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(i(a, s, n))) : (n = 1, s = 0, a = parseInt(r.text(), 10) || 0, this.viewDate.setUTCFullYear(a), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(i(a, s, n))), this.showMode(-1), this.fill());
                    break;
                case "td":
                    r.is(".day") && !r.is(".disabled") && (n = parseInt(r.text(), 10) || 1, a = this.viewDate.getUTCFullYear(), s = this.viewDate.getUTCMonth(), r.is(".old") ? 0 === s ? (s = 11, a -= 1) : s -= 1 : r.is(".new") && (11 === s ? (s = 0, a += 1) : s += 1), this._setDate(i(a, s, n)))
            }
            this.picker.is(":visible") && this._focused_from && t(this._focused_from).focus(), delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(), 1 === this.o.multidate && 0 === e || (e !== -1 ? this.dates.remove(e) : this.dates.push(t)), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(t, e) {
            e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), this._trigger("changeDate");
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveMonth: function(t, i) {
            if (!t) return e;
            if (!i) return t;
            var a, s, n = new Date(t.valueOf()),
                r = n.getUTCDate(),
                h = n.getUTCMonth(),
                o = Math.abs(i);
            if (i = i > 0 ? 1 : -1, 1 === o) s = i === -1 ? function() {
                return n.getUTCMonth() === h
            } : function() {
                return n.getUTCMonth() !== a
            }, a = h + i, n.setUTCMonth(a), (a < 0 || a > 11) && (a = (a + 12) % 12);
            else {
                for (var d = 0; d < o; d++) n = this.moveMonth(n, i);
                a = n.getUTCMonth(), n.setUTCDate(r), s = function() {
                    return a !== n.getUTCMonth()
                }
            }
            for (; s();) n.setUTCDate(--r), n.setUTCMonth(a);
            return n
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        dateWithinRange: function(t) {
            return t >= this.o.startDate && t <= this.o.endDate
        },
        keydown: function(t) {
            if (this.picker.is(":not(:visible)")) return void(27 === t.keyCode && this.show());
            var e, i, s, n = !1,
                r = this.focusDate || this.viewDate;
            switch (t.keyCode) {
                case 27:
                    this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
                    break;
                case 37:
                case 39:
                    if (!this.o.keyboardNavigation) break;
                    e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || a(), e), s = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || a(), e), s = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || a()), i.setUTCDate(i.getUTCDate() + e), s = new Date(r), s.setUTCDate(r.getUTCDate() + e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                    break;
                case 38:
                case 40:
                    if (!this.o.keyboardNavigation) break;
                    e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || a(), e), s = this.moveYear(r, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || a(), e), s = this.moveMonth(r, e), this._trigger("changeMonth", this.viewDate)) : (i = new Date(this.dates.get(-1) || a()), i.setUTCDate(i.getUTCDate() + 7 * e), s = new Date(r), s.setUTCDate(r.getUTCDate() + 7 * e)), this.dateWithinRange(i) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                    break;
                case 32:
                    break;
                case 13:
                    r = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(r), n = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), this.o.autoclose && this.hide());
                    break;
                case 9:
                    this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
            }
            if (n) {
                this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate");
                var h;
                this.isInput ? h = this.element : this.component && (h = this.element.find("input")), h && h.change()
            }
        },
        showMode: function(t) {
            t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.find(">div").hide().filter(".datepicker-" + g.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
        }
    };
    var l = function(e, i) {
        this.element = t(e), this.inputs = t.map(i.inputs, function(t) {
            return t.jquery ? t[0] : t
        }), delete i.inputs, t(this.inputs).datepicker(i).bind("changeDate", t.proxy(this.dateUpdated, this)), this.pickers = t.map(this.inputs, function(e) {
            return t(e).data("datepicker")
        }), this.updateDates()
    };
    l.prototype = {
        updateDates: function() {
            this.dates = t.map(this.pickers, function(t) {
                return t.getUTCDate()
            }), this.updateRanges()
        },
        updateRanges: function() {
            var e = t.map(this.dates, function(t) {
                return t.valueOf()
            });
            t.each(this.pickers, function(t, i) {
                i.setRange(e)
            })
        },
        dateUpdated: function(e) {
            if (!this.updating) {
                this.updating = !0;
                var i = t(e.target).data("datepicker"),
                    a = i.getUTCDate(),
                    s = t.inArray(e.target, this.inputs),
                    n = this.inputs.length;
                if (s !== -1) {
                    if (t.each(this.pickers, function(t, e) {
                            e.getUTCDate() || e.setUTCDate(a)
                        }), a < this.dates[s])
                        for (; s >= 0 && a < this.dates[s];) this.pickers[s--].setUTCDate(a);
                    else if (a > this.dates[s])
                        for (; s < n && a > this.dates[s];) this.pickers[s++].setUTCDate(a);
                    this.updateDates(), delete this.updating
                }
            }
        },
        remove: function() {
            t.map(this.pickers, function(t) {
                t.remove()
            }), delete this.element.data().datepicker
        }
    };
    var c = t.fn.datepicker;
    t.fn.datepicker = function(i) {
        var a = Array.apply(null, arguments);
        a.shift();
        var s;
        return this.each(function() {
            var h = t(this),
                o = h.data("datepicker"),
                c = "object" == typeof i && i;
            if (!o) {
                var p = n(this, "date"),
                    f = t.extend({}, u, p, c),
                    g = r(f.language),
                    v = t.extend({}, u, g, p, c);
                if (h.is(".input-daterange") || v.inputs) {
                    var D = {
                        inputs: v.inputs || h.find("input").toArray()
                    };
                    h.data("datepicker", o = new l(this, t.extend(v, D)))
                } else h.data("datepicker", o = new d(this, v))
            }
            if ("string" == typeof i && "function" == typeof o[i] && (s = o[i].apply(o, a), s !== e)) return !1
        }), s !== e ? s : this
    };
    var u = t.fn.datepicker.defaults = {
            autoclose: !1,
            beforeShowDay: t.noop,
            calendarWeeks: !1,
            clearBtn: !1,
            daysOfWeekDisabled: [],
            endDate: 1 / 0,
            forceParse: !0,
            format: "mm/dd/yyyy",
            keyboardNavigation: !0,
            language: "en",
            minViewMode: 0,
            multidate: !1,
            multidateSeparator: ",",
            orientation: "auto",
            rtl: !1,
            startDate: -(1 / 0),
            startView: 0,
            todayBtn: !1,
            todayHighlight: !1,
            weekStart: 0
        },
        p = t.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    t.fn.datepicker.Constructor = d;
    var f = t.fn.datepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: "Today",
                clear: "Clear"
            }
        },
        g = {
            modes: [{
                clsName: "days",
                navFnc: "Month",
                navStep: 1
            }, {
                clsName: "months",
                navFnc: "FullYear",
                navStep: 1
            }, {
                clsName: "years",
                navFnc: "FullYear",
                navStep: 10
            }],
            isLeapYear: function(t) {
                return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
            },
            getDaysInMonth: function(t, e) {
                return [31, g.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(t) {
                var e = t.replace(this.validParts, "\0").split("\0"),
                    i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return {
                    separators: e,
                    parts: i
                }
            },
            parseDate: function(a, s, n) {
                function r() {
                    var t = this.slice(0, u[l].length),
                        e = u[l].slice(0, t.length);
                    return t === e
                }
                if (!a) return e;
                if (a instanceof Date) return a;
                "string" == typeof s && (s = g.parseFormat(s));
                var h, o, l, c = /([\-+]\d+)([dmwy])/,
                    u = a.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(a)) {
                    for (a = new Date, l = 0; l < u.length; l++) switch (h = c.exec(u[l]), o = parseInt(h[1]), h[2]) {
                        case "d":
                            a.setUTCDate(a.getUTCDate() + o);
                            break;
                        case "m":
                            a = d.prototype.moveMonth.call(d.prototype, a, o);
                            break;
                        case "w":
                            a.setUTCDate(a.getUTCDate() + 7 * o);
                            break;
                        case "y":
                            a = d.prototype.moveYear.call(d.prototype, a, o)
                    }
                    return i(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), 0, 0, 0)
                }
                u = a && a.match(this.nonpunctuation) || [], a = new Date;
                var p, v, D = {},
                    m = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    y = {
                        yyyy: function(t, e) {
                            return t.setUTCFullYear(e)
                        },
                        yy: function(t, e) {
                            return t.setUTCFullYear(2e3 + e)
                        },
                        m: function(t, e) {
                            if (isNaN(t)) return t;
                            for (e -= 1; e < 0;) e += 12;
                            for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1);
                            return t
                        },
                        d: function(t, e) {
                            return t.setUTCDate(e)
                        }
                    };
                y.M = y.MM = y.mm = y.m, y.dd = y.d, a = i(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0);
                var w = s.parts.slice();
                if (u.length !== w.length && (w = t(w).filter(function(e, i) {
                        return t.inArray(i, m) !== -1
                    }).toArray()), u.length === w.length) {
                    var k;
                    for (l = 0, k = w.length; l < k; l++) {
                        if (p = parseInt(u[l], 10), h = w[l], isNaN(p)) switch (h) {
                            case "MM":
                                v = t(f[n].months).filter(r), p = t.inArray(v[0], f[n].months) + 1;
                                break;
                            case "M":
                                v = t(f[n].monthsShort).filter(r), p = t.inArray(v[0], f[n].monthsShort) + 1
                        }
                        D[h] = p
                    }
                    var _, C;
                    for (l = 0; l < m.length; l++) C = m[l], C in D && !isNaN(D[C]) && (_ = new Date(a), y[C](_, D[C]), isNaN(_) || (a = _))
                }
                return a
            },
            formatDate: function(e, i, a) {
                if (!e) return "";
                "string" == typeof i && (i = g.parseFormat(i));
                var s = {
                    d: e.getUTCDate(),
                    D: f[a].daysShort[e.getUTCDay()],
                    DD: f[a].days[e.getUTCDay()],
                    m: e.getUTCMonth() + 1,
                    M: f[a].monthsShort[e.getUTCMonth()],
                    MM: f[a].months[e.getUTCMonth()],
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear()
                };
                s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, e = [];
                for (var n = t.extend([], i.separators), r = 0, h = i.parts.length; r <= h; r++) n.length && e.push(n.shift()), e.push(s[i.parts[r]]);
                return e.join("")
            },
            headTemplate: '<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    g.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + g.headTemplate + "<tbody></tbody>" + g.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + g.headTemplate + g.contTemplate + g.footTemplate + "</table></div></div>", t.fn.datepicker.DPGlobal = g, t.fn.datepicker.noConflict = function() {
        return t.fn.datepicker = c, this
    }, t(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(e) {
        var i = t(this);
        i.data("datepicker") || (e.preventDefault(), i.datepicker("show"))
    }), t(function() {
        t('[data-provide="datepicker-inline"]').datepicker()
    })
}(window.jQuery);
! function(a) {
    a.fn.datepicker.dates.sv = {
        days: ["SÃ¶ndag", "MÃ¥ndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "LÃ¶rdag", "SÃ¶ndag"],
        daysShort: ["SÃ¶n", "MÃ¥n", "Tis", "Ons", "Tor", "Fre", "LÃ¶r", "SÃ¶n"],
        daysMin: ["SÃ¶", "MÃ¥", "Ti", "On", "To", "Fr", "LÃ¶", "SÃ¶"],
        months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "Idag",
        format: "yyyy-mm-dd",
        weekStart: 1,
        clear: "Rensa"
    }
}(jQuery);
// ! function(t) {
    // "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
// }(function(t) {
    // t.extend(t.fn, {
        // validate: function(e) {
            // if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            // var i = t.data(this[0], "validator");
            // return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function(e) {
                // i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
            // }), this.submit(function(e) {
                // function s() {
                    // var s, r;
                    // return !i.settings.submitHandler || (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), void 0 !== r && r)
                // }
                // return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
            // })), i)
        // },
        // valid: function() {
            // var e, i;
            // return t(this[0]).is("form") ? e = this.validate().form() : (e = !0, i = t(this[0].form).validate(), this.each(function() {
                // e = i.element(this) && e
            // })), e
        // },
        // removeAttrs: function(e) {
            // var i = {},
                // s = this;
            // return t.each(e.split(/\s/), function(t, e) {
                // i[e] = s.attr(e), s.removeAttr(e)
            // }), i
        // },
        // rules: function(e, i) {
            // var s, r, n, a, o, u, l = this[0];
            // if (e) switch (s = t.data(l.form, "validator").settings, r = s.rules, n = t.validator.staticRules(l), e) {
                // case "add":
                    // t.extend(n, t.validator.normalizeRule(i)), delete n.messages, r[l.name] = n, i.messages && (s.messages[l.name] = t.extend(s.messages[l.name], i.messages));
                    // break;
                // case "remove":
                    // return i ? (u = {}, t.each(i.split(/\s/), function(e, i) {
                        // u[i] = n[i], delete n[i], "required" === i && t(l).removeAttr("aria-required")
                    // }), u) : (delete r[l.name], n)
            // }
            // return a = t.validator.normalizeRules(t.extend({}, t.validator.classRules(l), t.validator.attributeRules(l), t.validator.dataRules(l), t.validator.staticRules(l)), l), a.required && (o = a.required, delete a.required, a = t.extend({
                // required: o
            // }, a), t(l).attr("aria-required", "true")), a.remote && (o = a.remote, delete a.remote, a = t.extend(a, {
                // remote: o
            // })), a
        // }
    // }), t.extend(t.expr[":"], {
        // blank: function(e) {
            // return !t.trim("" + t(e).val())
        // },
        // filled: function(e) {
            // return !!t.trim("" + t(e).val())
        // },
        // unchecked: function(e) {
            // return !t(e).prop("checked")
        // }
    // }), t.validator = function(e, i) {
        // this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    // }, t.validator.format = function(e, i) {
        // return 1 === arguments.length ? function() {
            // var i = t.makeArray(arguments);
            // return i.unshift(e), t.validator.format.apply(this, i)
        // } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function(t, i) {
            // e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function() {
                // return i
            // })
        // }), e)
    // }, t.extend(t.validator, {
        // defaults: {
            // messages: {},
            // groups: {},
            // rules: {},
            // errorClass: "error",
            // validClass: "valid",
            // errorElement: "label",
            // focusCleanup: !1,
            // focusInvalid: !0,
            // errorContainer: t([]),
            // errorLabelContainer: t([]),
            // onsubmit: !0,
            // ignore: ":hidden",
            // ignoreTitle: !1,
            // onfocusin: function(t) {
                // this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            // },
            // onfocusout: function(t) {
                // this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            // },
            // onkeyup: function(t, e) {
                // 9 === e.which && "" === this.elementValue(t) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
            // },
            // onclick: function(t) {
                // t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            // },
            // highlight: function(e, i, s) {
                // "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
            // },
            // unhighlight: function(e, i, s) {
                // "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
            // }
        // },
        // setDefaults: function(e) {
            // t.extend(t.validator.defaults, e)
        // },
        // messages: {
            // required: "This field is required.",
            // remote: "Please fix this field.",
            // email: "Please enter a valid email address.",
            // url: "Please enter a valid URL.",
            // date: "Please enter a valid date.",
            // dateISO: "Please enter a valid date ( ISO ).",
            // number: "Please enter a valid number.",
            // digits: "Please enter only digits.",
            // creditcard: "Please enter a valid credit card number.",
            // equalTo: "Please enter the same value again.",
            // maxlength: t.validator.format("Please enter no more than {0} characters."),
            // minlength: t.validator.format("Please enter at least {0} characters."),
            // rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            // range: t.validator.format("Please enter a value between {0} and {1}."),
            // max: t.validator.format("Please enter a value less than or equal to {0}."),
            // min: t.validator.format("Please enter a value greater than or equal to {0}.")
        // },
        // autoCreateRanges: !1,
        // prototype: {
            // init: function() {
                // function e(e) {
                    // var i = t.data(this[0].form, "validator"),
                        // s = "on" + e.type.replace(/^validate/, ""),
                        // r = i.settings;
                    // r[s] && !this.is(r.ignore) && r[s].call(i, this[0], e)
                // }
                // this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                // var i, s = this.groups = {};
                // t.each(this.settings.groups, function(e, i) {
                    // "string" == typeof i && (i = i.split(/\s/)), t.each(i, function(t, i) {
                        // s[i] = e
                    // })
                // }), i = this.settings.rules, t.each(i, function(e, s) {
                    // i[e] = t.validator.normalizeRule(s)
                // }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", e).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            // },
            // form: function() {
                // return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            // },
            // checkForm: function() {
                // this.prepareForm();
                // for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                // return this.valid()
            // },
            // element: function(e) {
                // var i = this.clean(e),
                    // s = this.validationTargetFor(i),
                    // r = !0;
                // return this.lastElement = s, void 0 === s ? delete this.invalid[i.name] : (this.prepareElement(s), this.currentElements = t(s), r = this.check(s) !== !1, r ? delete this.invalid[s.name] : this.invalid[s.name] = !0), t(e).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            // },
            // showErrors: function(e) {
                // if (e) {
                    // t.extend(this.errorMap, e), this.errorList = [];
                    // for (var i in e) this.errorList.push({
                        // message: e[i],
                        // element: this.findByName(i)[0]
                    // });
                    // this.successList = t.grep(this.successList, function(t) {
                        // return !(t.name in e)
                    // })
                // }
                // this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            // },
            // resetForm: function() {
                // t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            // },
            // numberOfInvalids: function() {
                // return this.objectLength(this.invalid)
            // },
            // objectLength: function(t) {
                // var e, i = 0;
                // for (e in t) i++;
                // return i
            // },
            // hideErrors: function() {
                // this.hideThese(this.toHide)
            // },
            // hideThese: function(t) {
                // t.not(this.containers).text(""), this.addWrapper(t).hide()
            // },
            // valid: function() {
                // return 0 === this.size()
            // },
            // size: function() {
                // return this.errorList.length
            // },
            // focusInvalid: function() {
                // if (this.settings.focusInvalid) try {
                    // t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                // } catch (e) {}
            // },
            // findLastActive: function() {
                // var e = this.lastActive;
                // return e && 1 === t.grep(this.errorList, function(t) {
                    // return t.element.name === e.name
                // }).length && e
            // },
            // elements: function() {
                // var e = this,
                    // i = {};
                // return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    // return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), !(this.name in i || !e.objectLength(t(this).rules())) && (i[this.name] = !0, !0)
                // })
            // },
            // clean: function(e) {
                // return t(e)[0]
            // },
            // errors: function() {
                // var e = this.settings.errorClass.split(" ").join(".");
                // return t(this.settings.errorElement + "." + e, this.errorContext)
            // },
            // reset: function() {
                // this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            // },
            // prepareForm: function() {
                // this.reset(), this.toHide = this.errors().add(this.containers)
            // },
            // prepareElement: function(t) {
                // this.reset(), this.toHide = this.errorsFor(t)
            // },
            // elementValue: function(e) {
                // var i, s = t(e),
                    // r = e.type;
                // return "radio" === r || "checkbox" === r ? t("input[name='" + e.name + "']:checked").val() : "number" === r && "undefined" != typeof e.validity ? !e.validity.badInput && s.val() : (i = s.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            // },
            // check: function(e) {
                // e = this.validationTargetFor(this.clean(e));
                // var i, s, r, n = t(e).rules(),
                    // a = t.map(n, function(t, e) {
                        // return e
                    // }).length,
                    // o = !1,
                    // u = this.elementValue(e);
                // for (s in n) {
                    // r = {
                        // method: s,
                        // parameters: n[s]
                    // };
                    // try {
                        // if (i = t.validator.methods[s].call(this, u, e, r.parameters), "dependency-mismatch" === i && 1 === a) {
                            // o = !0;
                            // continue
                        // }
                        // if (o = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        // if (!i) return this.formatAndAdd(e, r), !1
                    // } catch (l) {
                        // throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", l), l
                    // }
                // }
                // if (!o) return this.objectLength(n) && this.successList.push(e), !0
            // },
            // customDataMessage: function(e, i) {
                // return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            // },
            // customMessage: function(t, e) {
                // var i = this.settings.messages[t];
                // return i && (i.constructor === String ? i : i[e])
            // },
            // findDefined: function() {
                // for (var t = 0; t < arguments.length; t++)
                    // if (void 0 !== arguments[t]) return arguments[t]
            // },
            // defaultMessage: function(e, i) {
                // return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            // },
            // formatAndAdd: function(e, i) {
                // var s = this.defaultMessage(e, i.method),
                    // r = /\$?\{(\d+)\}/g;
                // "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                    // message: s,
                    // element: e,
                    // method: i.method
                // }), this.errorMap[e.name] = s, this.submitted[e.name] = s
            // },
            // addWrapper: function(t) {
                // return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            // },
            // defaultShowErrors: function() {
                // var t, e, i;
                // for (t = 0; this.errorList[t]; t++) i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                // if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    // for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                // if (this.settings.unhighlight)
                    // for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                // this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            // },
            // validElements: function() {
                // return this.currentElements.not(this.invalidElements())
            // },
            // invalidElements: function() {
                // return t(this.errorList).map(function() {
                    // return this.element
                // })
            // },
            // showLabel: function(e, i) {
                // var s, r, n, a = this.errorsFor(e),
                    // o = this.idOrName(e),
                    // u = t(e).attr("aria-describedby");
                // a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(i)) : (a = t("<" + this.settings.errorElement + ">").attr("id", o + "-error").addClass(this.settings.errorClass).html(i || ""), s = a, this.settings.wrapper && (s = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(s) : this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e), a.is("label") ? a.attr("for", o) : 0 === a.parents("label[for='" + o + "']").length && (n = a.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), u ? u.match(new RegExp("\\b" + n + "\\b")) || (u += " " + n) : u = n, t(e).attr("aria-describedby", u), r = this.groups[e.name], r && t.each(this.groups, function(e, i) {
                    // i === r && t("[name='" + e + "']", this.currentForm).attr("aria-describedby", a.attr("id"))
                // }))), !i && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, e)), this.toShow = this.toShow.add(a)
            // },
            // errorsFor: function(e) {
                // var i = this.idOrName(e),
                    // s = t(e).attr("aria-describedby"),
                    // r = "label[for='" + i + "'], label[for='" + i + "'] *";
                // return s && (r = r + ", #" + s.replace(/\s+/g, ", #")), this.errors().filter(r)
            // },
            // idOrName: function(t) {
                // return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            // },
            // validationTargetFor: function(e) {
                // return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            // },
            // checkable: function(t) {
                // return /radio|checkbox/i.test(t.type)
            // },
            // findByName: function(e) {
                // return t(this.currentForm).find("[name='" + e + "']")
            // },
            // getLength: function(e, i) {
                // switch (i.nodeName.toLowerCase()) {
                    // case "select":
                        // return t("option:selected", i).length;
                    // case "input":
                        // if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                // }
                // return e.length
            // },
            // depend: function(t, e) {
                // return !this.dependTypes[typeof t] || this.dependTypes[typeof t](t, e)
            // },
            // dependTypes: {
                // "boolean": function(t) {
                    // return t
                // },
                // string: function(e, i) {
                    // return !!t(e, i.form).length
                // },
                // "function": function(t, e) {
                    // return t(e)
                // }
            // },
            // optional: function(e) {
                // var i = this.elementValue(e);
                // return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            // },
            // startRequest: function(t) {
                // this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            // },
            // stopRequest: function(e, i) {
                // this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            // },
            // previousValue: function(e) {
                // return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    // old: null,
                    // valid: !0,
                    // message: this.defaultMessage(e, "remote")
                // })
            // }
        // },
        // classRuleSettings: {
            // required: {
                // required: !0
            // },
            // email: {
                // email: !0
            // },
            // url: {
                // url: !0
            // },
            // date: {
                // date: !0
            // },
            // dateISO: {
                // dateISO: !0
            // },
            // number: {
                // number: !0
            // },
            // digits: {
                // digits: !0
            // },
            // creditcard: {
                // creditcard: !0
            // }
        // },
        // addClassRules: function(e, i) {
            // e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        // },
        // classRules: function(e) {
            // var i = {},
                // s = t(e).attr("class");
            // return s && t.each(s.split(" "), function() {
                // this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            // }), i
        // },
        // attributeRules: function(e) {
            // var i, s, r = {},
                // n = t(e),
                // a = e.getAttribute("type");
            // for (i in t.validator.methods) "required" === i ? (s = e.getAttribute(i), "" === s && (s = !0), s = !!s) : s = n.attr(i), /min|max/.test(i) && (null === a || /number|range|text/.test(a)) && (s = Number(s)), s || 0 === s ? r[i] = s : a === i && "range" !== a && (r[i] = !0);
            // return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        // },
        // dataRules: function(e) {
            // var i, s, r = {},
                // n = t(e);
            // for (i in t.validator.methods) s = n.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), void 0 !== s && (r[i] = s);
            // return r
        // },
        // staticRules: function(e) {
            // var i = {},
                // s = t.data(e.form, "validator");
            // return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
        // },
        // normalizeRules: function(e, i) {
            // return t.each(e, function(s, r) {
                // if (r === !1) return void delete e[s];
                // if (r.param || r.depends) {
                    // var n = !0;
                    // switch (typeof r.depends) {
                        // case "string":
                            // n = !!t(r.depends, i.form).length;
                            // break;
                        // case "function":
                            // n = r.depends.call(i, i)
                    // }
                    // n ? e[s] = void 0 === r.param || r.param : delete e[s]
                // }
            // }), t.each(e, function(s, r) {
                // e[s] = t.isFunction(r) ? r(i) : r
            // }), t.each(["minlength", "maxlength"], function() {
                // e[this] && (e[this] = Number(e[this]))
            // }), t.each(["rangelength", "range"], function() {
                // var i;
                // e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            // }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        // },
        // normalizeRule: function(e) {
            // if ("string" == typeof e) {
                // var i = {};
                // t.each(e.split(/\s/), function() {
                    // i[this] = !0
                // }), e = i
            // }
            // return e
        // },
        // addMethod: function(e, i, s) {
            // t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        // },
        // methods: {
            // required: function(e, i, s) {
                // if (!this.depend(s, i)) return "dependency-mismatch";
                // if ("select" === i.nodeName.toLowerCase()) {
                    // var r = t(i).val();
                    // return r && r.length > 0
                // }
                // return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
            // },
            // email: function(t, e) {
                // return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            // },
            // url: function(t, e) {
                // return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
            // },
            // date: function(t, e) {
                // return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            // },
            // dateISO: function(t, e) {
                // return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            // },
            // number: function(t, e) {
                // return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            // },
            // digits: function(t, e) {
                // return this.optional(e) || /^\d+$/.test(t)
            // },
            // creditcard: function(t, e) {
                // if (this.optional(e)) return "dependency-mismatch";
                // if (/[^0-9 \-]+/.test(t)) return !1;
                // var i, s, r = 0,
                    // n = 0,
                    // a = !1;
                // if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19) return !1;
                // for (i = t.length - 1; i >= 0; i--) s = t.charAt(i), n = parseInt(s, 10), a && (n *= 2) > 9 && (n -= 9), r += n, a = !a;
                // return r % 10 === 0
            // },
            // minlength: function(e, i, s) {
                // var r = t.isArray(e) ? e.length : this.getLength(e, i);
                // return this.optional(i) || r >= s
            // },
            // maxlength: function(e, i, s) {
                // var r = t.isArray(e) ? e.length : this.getLength(e, i);
                // return this.optional(i) || r <= s
            // },
            // rangelength: function(e, i, s) {
                // var r = t.isArray(e) ? e.length : this.getLength(e, i);
                // return this.optional(i) || r >= s[0] && r <= s[1]
            // },
            // min: function(t, e, i) {
                // return this.optional(e) || t >= i
            // },
            // max: function(t, e, i) {
                // return this.optional(e) || t <= i
            // },
            // range: function(t, e, i) {
                // return this.optional(e) || t >= i[0] && t <= i[1]
            // },
            // equalTo: function(e, i, s) {
                // var r = t(s);
                // return this.settings.onfocusout && r.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    // t(i).valid()
                // }), e === r.val()
            // },
            // remote: function(e, i, s) {
                // if (this.optional(i)) return "dependency-mismatch";
                // var r, n, a = this.previousValue(i);
                // return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), a.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = a.message, s = "string" == typeof s && {
                    // url: s
                // } || s, a.old === e ? a.valid : (a.old = e, r = this, this.startRequest(i), n = {}, n[i.name] = e, t.ajax(t.extend(!0, {
                    // url: s,
                    // mode: "abort",
                    // port: "validate" + i.name,
                    // dataType: "json",
                    // data: n,
                    // context: r.currentForm,
                    // success: function(s) {
                        // var n, o, u, l = s === !0 || "true" === s;
                        // r.settings.messages[i.name].remote = a.originalMessage, l ? (u = r.formSubmitted, r.prepareElement(i), r.formSubmitted = u, r.successList.push(i), delete r.invalid[i.name], r.showErrors()) : (n = {}, o = s || r.defaultMessage(i, "remote"), n[i.name] = a.message = t.isFunction(o) ? o(e) : o, r.invalid[i.name] = !0, r.showErrors(n)), a.valid = l, r.stopRequest(i, l)
                    // }
                // }, s)), "pending")
            // }
        // }
    // }), t.format = function() {
        // throw "$.format has been deprecated. Please use $.validator.format instead."
    // };
    // var e, i = {};
    // t.ajaxPrefilter ? t.ajaxPrefilter(function(t, e, s) {
        // var r = t.port;
        // "abort" === t.mode && (i[r] && i[r].abort(), i[r] = s)
    // }) : (e = t.ajax, t.ajax = function(s) {
        // var r = ("mode" in s ? s : t.ajaxSettings).mode,
            // n = ("port" in s ? s : t.ajaxSettings).port;
        // return "abort" === r ? (i[n] && i[n].abort(), i[n] = e.apply(this, arguments), i[n]) : e.apply(this, arguments)
    // }), t.extend(t.fn, {
        // validateDelegate: function(e, i, s) {
            // return this.bind(i, function(i) {
                // var r = t(i.target);
                // if (r.is(e)) return s.apply(r, arguments)
            // })
        // }
    // })
// });
// ! function(t, o) {
    // "use strict";
    // "function" == typeof define && define.amd ? define(["jquery"], o) : "object" == typeof exports ? module.exports = o(require("jquery")) : t.bootbox = o(t.jQuery)
// }(this, function t(o, e) {
    // "use strict";

    // function a(t) {
        // var o = C[f.locale];
        // return o ? o[t] : C.en[t]
    // }

    // function n(t, e, a) {
        // t.stopPropagation(), t.preventDefault();
        // var n = o.isFunction(a) && a.call(e, t) === !1;
        // n || e.modal("hide")
    // }

    // function r(t) {
        // var o, e = 0;
        // for (o in t) e++;
        // return e
    // }

    // function l(t, e) {
        // var a = 0;
        // o.each(t, function(t, o) {
            // e(t, o, a++)
        // })
    // }

    // function i(t) {
        // var e, a;
        // if ("object" != typeof t) throw new Error("Please supply an object of options");
        // if (!t.message) throw new Error("Please specify a message");
        // return t = o.extend({}, f, t), t.buttons || (t.buttons = {}), e = t.buttons, a = r(e), l(e, function(t, n, r) {
            // if (o.isFunction(n) && (n = e[t] = {
                    // callback: n
                // }), "object" !== o.type(n)) throw new Error("button with key " + t + " must be an object");
            // n.label || (n.label = t), n.className || (a <= 2 && r === a - 1 ? n.className = "btn-primary" : n.className = "btn-default")
        // }), t
    // }

    // function c(t, o) {
        // var e = t.length,
            // a = {};
        // if (e < 1 || e > 2) throw new Error("Invalid argument length");
        // return 2 === e || "string" == typeof t[0] ? (a[o[0]] = t[0], a[o[1]] = t[1]) : a = t[0], a
    // }

    // function s(t, e, a) {
        // return o.extend(!0, {}, t, c(e, a))
    // }

    // function u(t, o, e, a) {
        // var n = {
            // className: "bootbox-" + t,
            // buttons: p.apply(null, o)
        // };
        // return b(s(n, a, e), o)
    // }

    // function p() {
        // for (var t = {}, o = 0, e = arguments.length; o < e; o++) {
            // var n = arguments[o],
                // r = n.toLowerCase(),
                // l = n.toUpperCase();
            // t[r] = {
                // label: a(l)
            // }
        // }
        // return t
    // }

    // function b(t, o) {
        // var a = {};
        // return l(o, function(t, o) {
            // a[o] = !0
        // }), l(t.buttons, function(t) {
            // if (a[t] === e) throw new Error("button key " + t + " is not allowed (options are " + o.join("\n") + ")")
        // }), t
    // }
    // var d = {
            // dialog: "<div class='bootbox modal' tabindex='-1' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-body'><div class='bootbox-body'></div></div></div></div></div>",
            // header: "<div class='modal-header'><h4 class='modal-title'></h4></div>",
            // footer: "<div class='modal-footer'></div>",
            // closeButton: "<button type='button' class='bootbox-close-button close' data-dismiss='modal' aria-hidden='true'>&times;</button>",
            // form: "<form class='bootbox-form'></form>",
            // inputs: {
                // text: "<input class='bootbox-input bootbox-input-text form-control' autocomplete=off type=text />",
                // textarea: "<textarea class='bootbox-input bootbox-input-textarea form-control'></textarea>",
                // email: "<input class='bootbox-input bootbox-input-email form-control' autocomplete='off' type='email' />",
                // select: "<select class='bootbox-input bootbox-input-select form-control'></select>",
                // checkbox: "<div class='checkbox'><label><input class='bootbox-input bootbox-input-checkbox' type='checkbox' /></label></div>",
                // date: "<input class='bootbox-input bootbox-input-date form-control' autocomplete=off type='date' />",
                // time: "<input class='bootbox-input bootbox-input-time form-control' autocomplete=off type='time' />",
                // number: "<input class='bootbox-input bootbox-input-number form-control' autocomplete=off type='number' />",
                // password: "<input class='bootbox-input bootbox-input-password form-control' autocomplete='off' type='password' />"
            // }
        // },
        // f = {
            // locale: "en",
            // backdrop: "static",
            // animate: !0,
            // className: null,
            // closeButton: !0,
            // show: !0,
            // container: "body"
        // },
        // m = {};
    // m.alert = function() {
        // var t;
        // if (t = u("alert", ["ok"], ["message", "callback"], arguments), t.callback && !o.isFunction(t.callback)) throw new Error("alert requires callback property to be a function when provided");
        // return t.buttons.ok.callback = t.onEscape = function() {
            // return !o.isFunction(t.callback) || t.callback.call(this)
        // }, m.dialog(t)
    // }, m.confirm = function() {
        // var t;
        // if (t = u("confirm", ["cancel", "confirm"], ["message", "callback"], arguments), t.buttons.cancel.callback = t.onEscape = function() {
                // return t.callback.call(this, !1)
            // }, t.buttons.confirm.callback = function() {
                // return t.callback.call(this, !0)
            // }, !o.isFunction(t.callback)) throw new Error("confirm requires a callback");
        // return m.dialog(t)
    // }, m.prompt = function() {
        // var t, a, n, r, i, c, u;
        // if (r = o(d.form), a = {
                // className: "bootbox-prompt",
                // buttons: p("cancel", "confirm"),
                // value: "",
                // inputType: "text"
            // }, t = b(s(a, arguments, ["title", "callback"]), ["cancel", "confirm"]), c = t.show === e || t.show, t.message = r, t.buttons.cancel.callback = t.onEscape = function() {
                // return t.callback.call(this, null)
            // }, t.buttons.confirm.callback = function() {
                // var e;
                // switch (t.inputType) {
                    // case "text":
                    // case "textarea":
                    // case "email":
                    // case "select":
                    // case "date":
                    // case "time":
                    // case "number":
                    // case "password":
                        // e = i.val();
                        // break;
                    // case "checkbox":
                        // var a = i.find("input:checked");
                        // e = [], l(a, function(t, a) {
                            // e.push(o(a).val())
                        // })
                // }
                // return t.callback.call(this, e)
            // }, t.show = !1, !t.title) throw new Error("prompt requires a title");
        // if (!o.isFunction(t.callback)) throw new Error("prompt requires a callback");
        // if (!d.inputs[t.inputType]) throw new Error("invalid prompt type");
        // switch (i = o(d.inputs[t.inputType]), t.inputType) {
            // case "text":
            // case "textarea":
            // case "email":
            // case "date":
            // case "time":
            // case "number":
            // case "password":
                // i.val(t.value);
                // break;
            // case "select":
                // var f = {};
                // if (u = t.inputOptions || [], !o.isArray(u)) throw new Error("Please pass an array of input options");
                // if (!u.length) throw new Error("prompt with select requires options");
                // l(u, function(t, a) {
                    // var n = i;
                    // if (a.value === e || a.text === e) throw new Error("given options in wrong format");
                    // a.group && (f[a.group] || (f[a.group] = o("<optgroup/>").attr("label", a.group)), n = f[a.group]), n.append("<option value='" + a.value + "'>" + a.text + "</option>")
                // }), l(f, function(t, o) {
                    // i.append(o)
                // }), i.val(t.value);
                // break;
            // case "checkbox":
                // var C = o.isArray(t.value) ? t.value : [t.value];
                // if (u = t.inputOptions || [], !u.length) throw new Error("prompt with checkbox requires options");
                // if (!u[0].value || !u[0].text) throw new Error("given options in wrong format");
                // i = o("<div/>"), l(u, function(e, a) {
                    // var n = o(d.inputs[t.inputType]);
                    // n.find("input").attr("value", a.value), n.find("label").append(a.text), l(C, function(t, o) {
                        // o === a.value && n.find("input").prop("checked", !0)
                    // }), i.append(n)
                // })
        // }
        // return t.placeholder && i.attr("placeholder", t.placeholder), t.pattern && i.attr("pattern", t.pattern), t.maxlength && i.attr("maxlength", t.maxlength), r.append(i), r.on("submit", function(t) {
            // t.preventDefault(), t.stopPropagation(), n.find(".btn-primary").click()
        // }), n = m.dialog(t), n.off("shown.bs.modal"), n.on("shown.bs.modal", function() {
            // i.focus()
        // }), c === !0 && n.modal("show"), n
    // }, m.dialog = function(t) {
        // t = i(t);
        // var a = o(d.dialog),
            // r = a.find(".modal-dialog"),
            // c = a.find(".modal-body"),
            // s = t.buttons,
            // u = "",
            // p = {
                // onEscape: t.onEscape
            // };
        // if (o.fn.modal === e) throw new Error("$.fn.modal is not defined; please double check you have included the Bootstrap JavaScript library. See http://getbootstrap.com/javascript/ for more details.");
        // if (l(s, function(t, o) {
                // u += "<button data-bb-handler='" + t + "' type='button' class='btn " + o.className + "'>" + o.label + "</button>", p[t] = o.callback
            // }), c.find(".bootbox-body").html(t.message), t.animate === !0 && a.addClass("fade"), t.className && a.addClass(t.className), "large" === t.size ? r.addClass("modal-lg") : "small" === t.size && r.addClass("modal-sm"), t.title && c.before(d.header), t.closeButton) {
            // var b = o(d.closeButton);
            // t.title ? a.find(".modal-header").prepend(b) : b.css("margin-top", "-10px").prependTo(c)
        // }
        // return t.title && a.find(".modal-title").html(t.title), u.length && (c.after(d.footer), a.find(".modal-footer").html(u)), a.on("hidden.bs.modal", function(t) {
            // t.target === this && a.remove()
        // }), a.on("shown.bs.modal", function() {
            // a.find(".btn-primary:first").focus()
        // }), "static" !== t.backdrop && a.on("click.dismiss.bs.modal", function(t) {
            // a.children(".modal-backdrop").length && (t.currentTarget = a.children(".modal-backdrop").get(0)), t.target === t.currentTarget && a.trigger("escape.close.bb")
        // }), a.on("escape.close.bb", function(t) {
            // p.onEscape && n(t, a, p.onEscape)
        // }), a.on("click", ".modal-footer button", function(t) {
            // var e = o(this).data("bb-handler");
            // n(t, a, p[e])
        // }), a.on("click", ".bootbox-close-button", function(t) {
            // n(t, a, p.onEscape)
        // }), a.on("keyup", function(t) {
            // 27 === t.which && a.trigger("escape.close.bb")
        // }), o(t.container).append(a), a.modal({
            // backdrop: !!t.backdrop && "static",
            // keyboard: !1,
            // show: !1
        // }), t.show && a.modal("show"), a
    // }, m.setDefaults = function() {
        // var t = {};
        // 2 === arguments.length ? t[arguments[0]] = arguments[1] : t = arguments[0], o.extend(f, t)
    // }, m.hideAll = function() {
        // return o(".bootbox").modal("hide"), m
    // };
    // var C = {
        // bg_BG: {
            // OK: "ÐžÐº",
            // CANCEL: "ÐžÑ‚ÐºÐ°Ð·",
            // CONFIRM: "ÐŸÐ¾Ñ‚Ð²ÑŠÑ€Ð¶Ð´Ð°Ð²Ð°Ð¼"
        // },
        // br: {
            // OK: "OK",
            // CANCEL: "Cancelar",
            // CONFIRM: "Sim"
        // },
        // cs: {
            // OK: "OK",
            // CANCEL: "ZruÅ¡it",
            // CONFIRM: "Potvrdit"
        // },
        // da: {
            // OK: "OK",
            // CANCEL: "Annuller",
            // CONFIRM: "Accepter"
        // },
        // de: {
            // OK: "OK",
            // CANCEL: "Abbrechen",
            // CONFIRM: "Akzeptieren"
        // },
        // el: {
            // OK: "Î•Î½Ï„Î¬Î¾ÎµÎ¹",
            // CANCEL: "Î‘ÎºÏÏÏ‰ÏƒÎ·",
            // CONFIRM: "Î•Ï€Î¹Î²ÎµÎ²Î±Î¯Ï‰ÏƒÎ·"
        // },
        // en: {
            // OK: "OK",
            // CANCEL: "Cancel",
            // CONFIRM: "OK"
        // },
        // es: {
            // OK: "OK",
            // CANCEL: "Cancelar",
            // CONFIRM: "Aceptar"
        // },
        // et: {
            // OK: "OK",
            // CANCEL: "Katkesta",
            // CONFIRM: "OK"
        // },
        // fa: {
            // OK: "Ù‚Ø¨ÙˆÙ„",
            // CANCEL: "Ù„ØºÙˆ",
            // CONFIRM: "ØªØ§ÛŒÛŒØ¯"
        // },
        // fi: {
            // OK: "OK",
            // CANCEL: "Peruuta",
            // CONFIRM: "OK"
        // },
        // fr: {
            // OK: "OK",
            // CANCEL: "Annuler",
            // CONFIRM: "D'accord"
        // },
        // he: {
            // OK: "××™×©×•×¨",
            // CANCEL: "×‘×™×˜×•×œ",
            // CONFIRM: "××™×©×•×¨"
        // },
        // hu: {
            // OK: "OK",
            // CANCEL: "MÃ©gsem",
            // CONFIRM: "MegerÅ‘sÃ­t"
        // },
        // hr: {
            // OK: "OK",
            // CANCEL: "Odustani",
            // CONFIRM: "Potvrdi"
        // },
        // id: {
            // OK: "OK",
            // CANCEL: "Batal",
            // CONFIRM: "OK"
        // },
        // it: {
            // OK: "OK",
            // CANCEL: "Annulla",
            // CONFIRM: "Conferma"
        // },
        // ja: {
            // OK: "OK",
            // CANCEL: "ã‚­ãƒ£ãƒ³ã‚»ãƒ«",
            // CONFIRM: "ç¢ºèª"
        // },
        // lt: {
            // OK: "Gerai",
            // CANCEL: "AtÅ¡aukti",
            // CONFIRM: "Patvirtinti"
        // },
        // lv: {
            // OK: "Labi",
            // CANCEL: "Atcelt",
            // CONFIRM: "ApstiprinÄt"
        // },
        // nl: {
            // OK: "OK",
            // CANCEL: "Annuleren",
            // CONFIRM: "Accepteren"
        // },
        // no: {
            // OK: "OK",
            // CANCEL: "Avbryt",
            // CONFIRM: "OK"
        // },
        // pl: {
            // OK: "OK",
            // CANCEL: "Anuluj",
            // CONFIRM: "PotwierdÅº"
        // },
        // pt: {
            // OK: "OK",
            // CANCEL: "Cancelar",
            // CONFIRM: "Confirmar"
        // },
        // ru: {
            // OK: "OK",
            // CANCEL: "ÐžÑ‚Ð¼ÐµÐ½Ð°",
            // CONFIRM: "ÐŸÑ€Ð¸Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ"
        // },
        // sq: {
            // OK: "OK",
            // CANCEL: "Anulo",
            // CONFIRM: "Prano"
        // },
        // sv: {
            // OK: "OK",
            // CANCEL: "Avbryt",
            // CONFIRM: "OK"
        // },
        // th: {
            // OK: "à¸•à¸à¸¥à¸‡",
            // CANCEL: "à¸¢à¸à¹€à¸¥à¸´à¸",
            // CONFIRM: "à¸¢à¸·à¸™à¸¢à¸±à¸™"
        // },
        // tr: {
            // OK: "Tamam",
            // CANCEL: "Ä°ptal",
            // CONFIRM: "Onayla"
        // },
        // zh_CN: {
            // OK: "OK",
            // CANCEL: "å–æ¶ˆ",
            // CONFIRM: "ç¡®è®¤"
        // },
        // zh_TW: {
            // OK: "OK",
            // CANCEL: "å–æ¶ˆ",
            // CONFIRM: "ç¢ºèª"
        // }
    // };
    // return m.addLocale = function(t, e) {
        // return o.each(["OK", "CANCEL", "CONFIRM"], function(t, o) {
            // if (!e[o]) throw new Error("Please supply a translation for '" + o + "'")
        // }), C[t] = {
            // OK: e.OK,
            // CANCEL: e.CANCEL,
            // CONFIRM: e.CONFIRM
        // }, m
    // }, m.removeLocale = function(t) {
        // return delete C[t], m
    // }, m.setLocale = function(t) {
        // return m.setDefaults("locale", t)
    // }, m.init = function(e) {
        // return t(e || o)
    // }, m
// });
// window.matchMedia || (window.matchMedia = function() {
    // "use strict";
    // var e = window.styleMedia || window.media;
    // if (!e) {
        // var t = document.createElement("style"),
            // i = document.getElementsByTagName("script")[0],
            // n = null;
        // t.type = "text/css", t.id = "matchmediajs-test", i.parentNode.insertBefore(t, i), n = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
            // matchMedium: function(e) {
                // var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                // return t.styleSheet ? t.styleSheet.cssText = i : t.textContent = i, "1px" === n.width
            // }
        // }
    // }
    // return function(t) {
        // return {
            // matches: e.matchMedium(t || "all"),
            // media: t || "all"
        // }
    // }
// }());
// ! function(t) {
    // jQuery.timer = function(t, e, i) {
        // var i = jQuery.extend({
                // reset: 500
            // }, i),
            // t = t || i.reset;
        // return !!e && (timer = function(t, e) {
            // this.internalCallback = function() {
                // e(n)
            // }, this.stop = function() {
                // clearInterval(n.id)
            // }, this.reset = function(t) {
                // n.id && clearInterval(n.id);
                // var t = t || i.reset;
                // this.id = setInterval(this.internalCallback, t)
            // }, this.interval = t, this.id = setInterval(this.internalCallback, this.interval);
            // var n = this
        // }, new timer(t, e))
    // }
// }(jQuery);
// var page;
// ! function(e) {
    // var a = e.RO || {};
    // a.String = {}, a.String.pad = function(e, a, t) {
        // var i = e.toString();
        // for (t || (t = "0"); i.length < a;) i = t + i;
        // return i
    // }, e.RO = a, a.Validators = {}, a.Validators.showErrors = function(e, a) {
        // return $.each(this.successList, function(e, a) {
            // return $(a).popover("hide")
        // }), $.each(a, function(e, a) {
            // var t;
            // return t = $(a.element).popover({
                // trigger: "manual",
                // placement: "inside top",
                // animate: !0,
                // content: a.message,
                // template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
            // }), $(a.element).popover("show")
        // })
    // }, a.Validators.showErrorsModal = function(e, a) {
        // return $.each(this.successList, function(e, a) {
            // return $(a).popover("hide")
        // }), $.each(a, function(e, a) {
            // var t;
            // return t = $(a.element).popover({
                // trigger: "manual",
                // placement: "top",
                // animate: !0,
                // content: a.message,
                // template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>'
            // }), $(a.element).popover("show")
        // })
    // }, window.RO = a
// }(window);
// var PleaseWait;
// PleaseWait = PleaseWait || function() {
    // var e = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h2>Processing...</h2></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 0%;"></div></div></div></div>');
    // return {
        // showPleaseWait: function(a) {
            // e.find("h2").html(a), e.find(".bar").css("width", "0%"), e.modal()
        // },
        // hidePleaseWait: function() {
            // e.modal("hide"), e.remove()
        // }
    // }
// }();
// var showLoading = function() {
        // $(".spinner-wave").show()
    // },
    // hideLoading = function() {
        // $(".spinner-wave").hide()
    // };
// $(function() {
    // $("a[href^='http://'], a[href^='https://']").not(".no-override").filter(function() {
        // var e = $(this).attr("target");
        // return "undefined" == typeof e || e === !1
    // }).filter(function() {
        // return this.href.indexOf(window.location.host) < 0
    // }).add("a[rel=external]").attr("target", "_blank"), $(".languages li").click(function() {
        // window.location = $(this).data("target")
    // }), page = $("#page").val();
    // var e = $("#online"),
        // a = RO.i18n;
    // if ($("#online").length > 0) {
        // var t = $("#baseurl").val(),
            // i = function() {
                // var i = $("#menuType").length > 0 ? $("#menuType").val() : 0;
                // $.ajax({
                    // type: "POST",
                    // url: t + "online",
                    // cache: !1,
                    // data: {
                        // menuType: i
                    // }
                // }).done(function(i) {
                    // var o = $.parseJSON(i);
                    // if (e.val() != o.online) {
                        // e.val(o.online);
                        // var n = parseInt($("#menuType").val(), 10),
                            // r = $(".rh_cart_content_btn");
                        // 1 == o.online ? ($("#ro_online_img").attr("src", t + "../assets/img/header_logo.png"), $("#ro_online_text").html(a.online_text[n]), r.removeClass("disabled"), r.attr("disabled", !1)) : 0 == n && ($("#ro_online_img").attr("src", t + "../assets/img/header_logo_offline.png"), $("#ro_online_text").html(a.offline_text), r.addClass("disabled"), r.attr("disabled", !0))
                    // }
                // })
            // };
        // $.timer(15e3, i), i()
    // }
    // if ($("#roheader").on("click", ".rh_sm_iconbox", function(e) {
            // e.preventDefault();
            // var a = $(".rh_sm_collapse_box").filter(":visible"),
                // t = $(this).data("target");
            // "ro" == t ? window.open("http://restaurangonline.se") : "rh_sm_user" != t || $(this).hasClass("logged_in") ? (a.slideUp(), t != a.attr("id") ? ($(".rh_sm_iconbox").removeClass("rh_sm_iconbox_active"), $(this).addClass("rh_sm_iconbox_active"), $("#rh_sm_collapse").show(), $("#" + t).slideDown()) : ($(".rh_sm_iconbox").removeClass("rh_sm_iconbox_active"), $("#rh_sm_collapse").slideUp())) : showLogin()
        // }), navigator.userAgent.match(/IEMobile\/10\.0/)) {
        // var o = document.createElement("style");
        // o.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")), document.getElementsByTagName("head")[0].appendChild(o)
    // }
// }), $(window).load(function() {
    // $("#rh_times_delivery .rh_times, #rh_times_takeaway .rh_times").popover({
        // placement: "inside bottom",
        // template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>',
        // trigger: "hover",
        // animation: !0,
        // html: !0,
        // title: ""
    // }), $("#roheader-wrapper").length && "bestall" != page ? ($(window).width() > 992 && $("#roheader").affix({
        // offset: {
            // top: $("#roheader").offset().top
        // }
    // }), $("body").addClass("has_roheader")) : $("#roheader-wrapper").length && $("body").addClass("has_roheader")
// });

// function showRegister(e, a) {
    // $registerModal = $("#register-modal");
    // var n = "empty=1";
    // null !== a && (n = a), $.ajax({
        // type: "POST",
        // url: baseURL + "registrering/modal",
        // cache: !1,
        // data: n
    // }).done(function(a) {
        // $registerModal.html(a), $registerModal.modal({
            // keyboard: !1,
            // backdrop: "static"
        // }), $registerModal.modal("show"), handleRegister(e, $registerModal)
    // })
// }

// function handleRegister(e, a) {
    // var n = a.find("form").validate({
            // rules: {
                // fname: "required",
                // lname: "required",
                // email: {
                    // required: !0,
                    // email: !0,
                    // remote: baseURL + "registrering/unique"
                // },
                // city: "required",
                // address: "required",
                // postcode: "required",
                // phone: "required",
                // password: {
                    // required: !0,
                    // minlength: 6
                // },
                // password2: {
                    // equalTo: "#password"
                // }
            // },
            // messages: {
                // fname: "FÃ¶rnamn mÃ¥ste anges",
                // lname: "Efternamn mÃ¥ste anges",
                // email: {
                    // required: "Email mÃ¥ste anges",
                    // email: "Ange en giltig email-address",
                    // remote: "Emailen tillhÃ¶r ett befintligt konto. Logga in fÃ¶r att ansÃ¶ka om att bli fakturakund."
                // },
                // city: "Stad mÃ¥ste anges",
                // address: "Address mÃ¥ste anges",
                // postcode: "Postnr mÃ¥ste anges",
                // phone: "Telefon mÃ¥ste anges",
                // password: {
                    // required: "LÃ¶senord mÃ¥ste anges",
                    // minlength: "Minst 6 tecken"
                // },
                // password2: {
                    // equalTo: "LÃ¶senorden matchar ej"
                // }
            // },
            // showErrors: RO.Validators.showErrors
        // }),
        // i = a.find("#login-div"),
        // r = a.find("#register-div"),
        // t = a.find(".company-row"),
        // o = a.find(".companyhide-row"),
        // s = a.find("#regBtn"),
        // d = a.find("#loginBtn"),
        // l = (a.find(".modal-body"), a.find("#invoiceRegBtn"));
    // $privateMode = a.find("#private"), $privateMode.on("click", function() {
        // i.is(":visible") ? i.fadeOut("fast", function() {
            // d.hide(), s.show(), r.fadeIn("fast"), t.fadeOut(function() {
                // o.fadeIn()
            // })
        // }) : t.fadeOut(function() {
            // o.fadeIn()
        // })
    // }), $companyMode = a.find("#company"), $companyMode.on("click", function() {
        // i.is(":visible") ? i.fadeOut("fast", function() {
            // d.hide(), s.show(), r.fadeIn("fast"), o.fadeOut(function() {
                // t.fadeIn()
            // })
        // }) : o.fadeOut(function() {
            // t.fadeIn()
        // })
    // }), $loginMode = a.find("#login"), $loginMode.on("click", function() {
        // r.fadeOut("fast", function() {
            // s.hide(), d.show(), i.fadeIn("fast")
        // })
    // }), $usePrivateAddress = a.find("#usePrivateAddress"), $usePrivateAddress.on("click", function() {
        // a.find(".company-invoice").prop("disabled", function(e, a) {
            // return !a
        // })
    // }), l.on("click", function(e) {
        // e.preventDefault();
        // var n = a.find("form"),
            // i = n.get(0);
        // $.removeData(i, "validator");
        // var r = n.validate({
                // rules: {
                    // orgCompany: "required",
                    // orgNo: "required",
                    // orgFname: "required",
                    // orgLname: "required",
                    // orgEmail: {
                        // required: !0,
                        // email: !0
                    // },
                    // orgCity: "required",
                    // orgAddress: "required",
                    // orgPostcode: "required",
                    // orgPhone: "required"
                // },
                // messages: {
                    // orgCompany: "FÃ¶retag mÃ¥ste anges",
                    // orgNo: "Org nr mÃ¥ste anges",
                    // orgFname: "FÃ¶rnamn mÃ¥ste anges",
                    // orgLname: "Efternamn mÃ¥ste anges",
                    // orgEmail: {
                        // required: "Email mÃ¥ste anges",
                        // email: "Ange en giltig email-address"
                    // },
                    // orgCity: "Stad mÃ¥ste anges",
                    // orgAddress: "Address mÃ¥ste anges",
                    // orgPostcode: "Postnr mÃ¥ste anges",
                    // orgPhone: "Telefon mÃ¥ste anges"
                // },
                // showErrors: RO.Validators.showErrors
            // }),
            // t = r.form();
        // if (t) {
            // var o = a.find("form").serialize();
            // $.ajax({
                // type: "POST",
                // url: baseURL + "konto/requestInvoice",
                // cache: !1,
                // data: o
            // }).done(function(e) {
                // 1 == e && (window.location = baseURL + "registrering")
            // })
        // }
    // }), s.on("click", function(i) {
        // i.preventDefault();
        // var r = n.form();
        // if (r) {
            // var t = a.find("form").serialize();
            // t += "&modal=1", $.ajax({
                // type: "POST",
                // url: baseURL + "registrering/create",
                // cache: !1,
                // data: t
            // }).done(function(n) {
                // var i = $("#notice-modal");
                // "0" == n ? (i.find("#notice-modal-title").text("Registrering"), i.find("#notice-modal-text").html("Ett fel uppstod med din registrering, var god fÃ¶rsÃ¶k igen."), i.modal("show")) : "link" == e ? ($registerModal.modal("hide"), i.find("#notice-modal-title").text("Registrering"), i.find("#notice-modal-text").html("Din registrering lyckades!<br/><br/>TÃ¤nk pÃ¥ att aktivera ditt konto genom att klicka pÃ¥ lÃ¤nken i mailet som nu skickats till din email!<br/><br/>Du slipper nu knappa in informationen nÃ¤r du handlar - pÃ¥ samtliga RestaurangOnline-anslutna restauranger. Du har Ã¤ven mÃ¶jligheten att spara dina betaluppgifter hos vÃ¥r betalleverantÃ¶r Dibs."), i.modal("show")) : "registrering" == e ? (a.find("form input").val(""), s.text("Registrerad").addClass("disabled"), i.find("#notice-modal-title").text("Registrering"), i.find("#notice-modal-text").html("Din registrering lyckades!<br/><br/>TÃ¤nk pÃ¥ att aktivera ditt konto genom att klicka pÃ¥ lÃ¤nken i mailet som nu skickats till din email!<br/><br/>Du slipper nu knappa in informationen nÃ¤r du handlar - pÃ¥ samtliga RestaurangOnline-anslutna restauranger. Du har Ã¤ven mÃ¶jligheten att spara dina betaluppgifter hos vÃ¥r betalleverantÃ¶r Dibs."), i.modal("show")) : "checkout" == e && ($("#customerID").val(n), $("#modalRegged").val(1), a.find("#saveTicket").is(":checked") && $("#dibsform").append('<input type="hidden" name="maketicket" value="yes" />'), updateCartSettings("checkoutRegistered"))
            // })
        // }
    // }), d.on("click", function(a) {
        // a.preventDefault();
        // var n = $("#loginEmail").val(),
            // i = $("#loginPassword").val();
        // $.ajax({
            // type: "POST",
            // url: baseURL + "login",
            // cache: !1,
            // data: {
                // username: n,
                // password: i
            // }
        // }).done(function(a) {
            // var n = $.parseJSON(a);
            // n.logged_in ? "checkout" == e && ($("#customerID").val(n.customerID), $("#modalRegged").val(1), updateCartSettings("checkoutRegistered")) : (d.popover({
                // placement: "bottom",
                // content: "Fel email eller lÃ¶senord, fÃ¶rsÃ¶k igen eller gÃ¥ vidare."
            // }), d.popover("show"))
        // })
    // }), $skipBtn = a.find(".skip"), $skipBtn.on("click", function(n) {
        // n.preventDefault(), "link" == e ? a.modal("hide") : "checkout" == e && ($("#modalRegged").val(1), updateCartSettings("checkoutRegistered"))
    // })
// }

// function showLogin() {
    // $("#login-modal").modal("show")
// }
// var $registerModal, baseURL;
// $(function() {
    // baseURL = $("#baseurl").val();
    // var e = $("#login-modal"),
        // a = $("#page").val();
    // $("body").on("click", ".showLogin", function(e) {
        // e.preventDefault(), showLogin()
    // }), $("body").on("click", ".showRegister", function(e) {
        // e.preventDefault(), showRegister("link", null)
    // }), "registrering" == a && handleRegister("registrering", $("#register-inline")), e.on("keydown", "input", function(a) {
        // 13 == a.which && e.find("#login_button").trigger("click")
    // }), e.on("click", "#login_button", function(n) {
        // n.preventDefault();
        // var i = $("#login_email").val(),
            // r = $("#login_password").val();
        // $("#login_message").slideUp(), $.ajax({
            // type: "POST",
            // url: baseURL + "login",
            // cache: !1,
            // data: {
                // username: i,
                // password: r
            // }
        // }).done(function(n) {
            // var i = $.parseJSON(n);
            // if (i.logged_in) {
                // $(document).trigger("ro-login", i), e.modal("hide");
                // var r = $(".rh_sm_user");
                // r.addClass("logged_in"), $("#rh_sm_user .username").html(i.user.name), $("#rh_login_user_status div").html("<b>Inloggad:</b> " + i.user.name), $(".rh_login_guest").fadeOut(function() {
                    // $(".rh_login_user").fadeIn()
                // }), $(".show-if-logged-in-nav").removeClass("hidden-xs hidden-sm"), $(".show-if-not-logged-in-nav").addClass("hidden-xs hidden-sm"), $(".hideFromLoggedin").slideUp("fast"), r.trigger("click"), "bestall" == a || "bokabord" == a ? ($("#name").val(i.user.details.name), $("#fname").val(i.user.fname), $("#lname").val(i.user.lname), $("#address").val(i.user.details.address).trigger("input"), $("#city").val(i.user.details.city).trigger("input"), $("#postcode").val(i.user.details.postalcode).trigger("input"), $("#phone").val(i.user.details.phone), $("#email").val(i.user.details.email), $("#customerID").val(i.user.customerID), $("#form-order input").popover("hide"), "bestall" == a && 1 != $("#menuType").val() && $.ajax({
                    // type: "POST",
                    // url: baseURL + "konto/checkoutOptions",
                    // cache: !1,
                    // data: {}
                // }).done(function(e) {
                    // var a = $.parseJSON(e);
                    // a.cardsStatus > 0 && $("#subpaytype-card ul li:first").prepend(a.cards), $("#subpaytype-invoice").html(a.invoice)
                // })) : "registrering" == a && (window.location = baseURL + "registrering")
            // } else $("#login_message").slideDown()
        // })
    // }), $("#roheader").on("click", ".logout", function(e) {
        // e.preventDefault();
        // var n = $(this).attr("id");
        // $.ajax({
            // type: "post",
            // url: baseURL + "login/logout",
            // cache: !1
        // }).done(function(e) {
            // var i = $.parseJSON(e);
            // i.logged_in || ($(document).trigger("ro-logout"), $(".show-if-logged-in-nav").addClass("hidden-xs hidden-sm"), $(".show-if-not-logged-in-nav").removeClass("hidden-xs hidden-sm"), $(".rh_login_user").fadeOut(function() {
                // $(".rh_login_guest").fadeIn()
            // }), "bestall" == a ? window.location = baseURL + "bestall" : "rh_sm_logout" == n && $(".rh_sm_user").trigger("click"))
        // })
    // })
// });
// $rh_cart_content_wrapper = $("#rh_cart .rh_cart_content_wrapper");
// var cartAutohide = function() {
        // $rh_cart_content_wrapper.slideUp("fast")
    // },
    // cartsmAutohide = function() {
        // $("#rh_sm_iconbox_cart").parent().find(".item-cart").slideUp()
    // },
    // cartsmMessageHide = function() {
        // $("#rh_sm_iconbox_cart").find(".cart-message").slideUp()
    // },
    // itemCart = {
        // show: function() {
            // $("#rh_sm_iconbox_cart").parent().find(".item-cart").slideDown(), cartMessage.hide()
        // },
        // hide: function() {
            // $("#rh_sm_iconbox_cart").parent().find(".item-cart").slideUp()
        // },
        // toggle: function() {
            // $("#rh_sm_iconbox_cart").parent().find(".item-cart").slideToggle(), cartMessage.hide()
        // }
    // },
    // cartMessage = {
        // show: function() {
            // $("#rh_sm_iconbox_cart").find(".cart-message").slideDown()
        // },
        // hide: function() {
            // $("#rh_sm_iconbox_cart").find(".cart-message").slideUp()
        // }
    // };
// $("#login-button").on("click", function() {
    // $(".showLogin").trigger("click")
// }), $("#logout-user").on("click", function(t) {
    // t.preventDefault(), $(".logout").trigger("click")
// }), $(".responsive-roheader .offline-time-button").on("click", function() {
    // $(".responsive-roheader .time-tabs").toggleClass("show")
// }), $(".navigation-tbs > ul > li > a").on("click", function() {
    // event.preventDefault();
    // var t = $(this).data("tbs-target");
    // $(".navigation-tbs > ul > li > a").removeClass("active"), $(".time-tabs > .times-display").removeClass("active"), $(this).addClass("active"), $(".time-tabs > .times-display." + t).addClass("active")
// }), ! function(t) {
    // var a, e, n = t("#baseurl").val();
    // $rh_cart = t(".rh_cart_top_wrapper"), $rh_cart_content_wrapper = t("#rh_cart .rh_cart_content_wrapper"), $rh_cart.on("click", "div.disabled", function() {
        // $rh_cart_content_wrapper.slideToggle("fast")
    // }), $rh_cart_content_wrapper.on("mouseenter", function() {
        // window.clearTimeout(a)
    // }), setTimeout(function() {
        // cartMessage.hide()
    // }, 2e3);
    // var r = t("#notice-modal");
    // t(".rh_cart").on("click", ".rh_cart_content_btn, .rh_cart_redbtn", function(a) {
        // a.preventDefault();
        // var e = parseInt(t("#online").val(), 10),
            // o = parseInt(t("#roCart_type").val(), 10),
            // i = parseInt(t(".rh_cart .sum-total").text(), 10);
        // i > 0 && (0 != o || 1 == e) ? window.location = n + "bestall" : 0 == i ? (r.find("#notice-modal-title").text("Tom kundvagn"), r.find("#notice-modal-text").html("Din kundvagn Ã¤r tom. FÃ¶r att gÃ¥ till kassan, lÃ¤gg en vara i kundvagnen och fÃ¶rsÃ¶k igen."), r.modal("show")) : (r.find("#notice-modal-title").text("Offline"), r.find("#notice-modal-text").html("Restaurangen Ã¤r just nu offline och kan ej ta emot onlinebestÃ¤llningar."), r.modal("show"))
    // }), t.fn.courseModal = function(a) {
        // var e = t.extend({}, {
                // cart: t(),
                // baseUrl: "/",
                // menuType: 0,
                // edit: !1,
                // key: 0
            // }, a),
            // n = e.baseUrl,
            // r = e.cart,
            // o = t(this),
            // i = function() {
                // var a = t("#cart-modal-courseID").val(),
                    // r = t("#cart-modal-optionIDs").val();
                // r = r.replace("opt-", "");
                // var o = t("#cart-modal-extraIDs").val();
                // o = o.replace(/ext-/g, ""), t.ajax({
                    // type: "GET",
                    // url: n + "meny/getPriceWithOptionsExtras/" + e.menuType,
                    // cache: !1,
                    // data: {
                        // options: r,
                        // extras: o,
                        // courseID: a
                    // }
                // }).done(function(a) {
                    // t("#cart-modal-sum span").html(a)
                // })
            // };
        // o.find("input[name=extra]").click(function(a) {
            // var e = parseInt(t("#cart-modal-maxExtras").val(), 10);
            // e > 0 && t("input[name=extra]:checked").length > e && (bootbox.alert("Det gÃ¥r tyvÃ¤rr inte att lÃ¤gga till fler Ã¤n " + e + " st tillbehÃ¶r fÃ¶r denna vara!", function() {
                // setTimeout(function() {
                    // t("body").addClass("modal-open")
                // }, 500)
            // }), a.preventDefault())
        // }), o.find("input[name=extra]").change(function(a) {
            // var e = t(this),
                // n = e.attr("id"),
                // r = t("#cart-modal-extraIDs"),
                // o = r.val();
            // e.is(":checked") ? "" == o ? r.val(n) : r.val(o + "," + n) : (o = o.replace(n + ",", ""), o = o.replace("," + n, ""), o = o.replace(n, ""), r.val(o)), i()
        // }), o.find("input[name=option]").change(function(a) {
            // var e = t(this),
                // n = (e.attr("id"), t("#cart-modal-optionIDs"));
            // n.val();
            // t("#cart-modal-optionIDs").val(o.find("input[name=option]:checked").val()), i()
        // }), o.find(".robtn-success").on("click", function(a) {
            // a.preventDefault();
            // var n = t("#cart-modal-courseID").val(),
                // i = t("#cart-modal-min").val(),
                // s = t("#cart-modal-max").val(),
                // c = t("#cart-modal-optionIDs").val();
            // c = c.replace("opt-", "");
            // var l = t("#cart-modal-extraIDs").val();
            // l = l.replace(/ext-/g, ""), e.edit ? r.cart("editCourse", {
                // id: n,
                // options: c,
                // extras: l,
                // key: e.key
            // }) : r.cart("addCourse", {
                // id: n,
                // min: i,
                // max: s,
                // options: c,
                // extras: l
            // }), o.modal("hide")
        // }), e.edit || t(".radio ul li").first().find("input").trigger("click")
    // };
    // var o = function(a, n) {
            // this.options = n;
            // var r = t.merge(t(a), t("#rh_sm_cart"));
            // this.$element = r, this.refresh();
            // var o = this;
            // n.cartLink && t("#cart-order").on("click", function(t) {
                // window.location = n.baseUrl + "bestall"
            // }), r.on("click", ".row", function(a) {
                // window.clearTimeout(e), showLoading();
                // var o = t(this);
                // if (o.hasClass("edit")) {
                    // var i = o.data("key"),
                        // s = o.data("max-units"),
                        // c = o.data("min-units");
                    // t.ajax({
                        // type: "POST",
                        // url: n.baseUrl + "meny/getModalEdit/" + n.menuType,
                        // cache: !1,
                        // data: {
                            // key: i,
                            // max: s,
                            // min: c
                        // }
                    // }).done(function(a) {
                        // var e = t('<div class="modal fade course-modal romodal roTheme"></div>').html(a).appendTo(document.body);
                        // e.modal("show").on("hidden.bs.modal", function() {
                            // t(this).remove()
                        // }), e.courseModal({
                            // baseUrl: n.baseUrl,
                            // menuType: n.menuType,
                            // cart: r,
                            // edit: !0,
                            // key: i
                        // }), hideLoading()
                    // })
                // }
            // }), r.on("click", ".row .btn, .rh_cart_sm_count.minus", function(a) {
                // a.preventDefault(), a.stopPropagation(), window.clearTimeout(e);
                // var s = t(this);
                // if (s.hasClass("plus") || s.hasClass("minus")) {
                    // s.prop("disabled", !0);
                    // var c = s.hasClass("plus"),
                        // l = s.closest(".row"),
                        // d = l.data("key"),
                        // u = l.find(".quantity"),
                        // h = parseInt(u.html(), 10);
                    // if (h >= 100) return;
                    // var m = r.find(".quantity-total"),
                        // p = parseInt(m.html(), 10);
                    // if (c) {
                        // h++, p++;
                        // var f = l.data("max-units");
                        // if (h > f && f > 0) return void bootbox.alert("Det gÃ¥r tyvÃ¤rr inte att lÃ¤gga till fler Ã¤n " + f + " st av denna varan i varukorgen!")
                    // } else {
                        // h--, p--;
                        // var v = l.data("min-units");
                        // h < v && (h = 0)
                    // }
                    // u.html(h);
                    // var g = parseInt(l.find(".price").html().replace(" kr", ""), 10),
                        // _ = t(".sum-total");
                    // c || (g = -1 * g);
                    // var y = parseInt(_.html(), 10) + g;
                    // i(r, null, p, y, y, null, null, null, !0);
                    // var b = n.baseUrl;
                    // b += c ? "varukorg/increaseItem/" + n.menuType : "varukorg/decreaseItem/" + n.menuType, showLoading(), t.ajax({
                        // type: "POST",
                        // url: b,
                        // cache: !1,
                        // data: {
                            // key: d
                        // }
                    // }).done(function(a) {
                        // (!c && 0 == h || 1 == t("#cart_gc").val()) && o.refresh(), n.updateCartSettings(), s.prop("disabled", !1), hideLoading()
                    // })
                // }
            // }), r.on("change", "input[name=deliverytype]", function(a) {
                // var e = t(this).val();
                // t.ajax({
                    // type: "POST",
                    // url: n.baseUrl + "varukorg/setDelivery",
                    // cache: !1,
                    // data: {
                        // deliveryValue: e
                    // }
                // }).done(function(t) {
                    // o.refresh()
                // })
            // })
        // },
        // i = function(a, e, n, r, o, i, s, c, l) {
            // a = t("#rh_cart"), $el_sm = t("#rh_sm_cart"), $el_sm_head = t("#rh_sm_iconbox_cart"), l || (a.find(".rh_cart_content").html(e), t("#checkoutCartContent").html(e), $el_sm.find(".rh_cart_content").html(e)), t(".sum-total").html(o), 0 == n ? (a.find(".quantity-total").html("Tom"), $el_sm_head.find(".quantity-total").html("Kundvagn"), $el_sm_head.find(".quantity-total-st").html(n)) : (a.find(".quantity-total").html(n + (1 == n ? " vara" : " varor")), $el_sm_head.find(".quantity-total").html(n + (1 == n ? " vara" : " varor")), $el_sm_head.find(".quantity-total-st").html(n))
        // };
    // o.prototype = {
        // constructor: o,
        // addCourse: function(n) {
            // if (t.isNumeric(n.id)) {
                // if (12 == this.options.menuType && t(".rh_cart_content").find("div.row[data-key]").length > 0) return void bootbox.alert("Det gÃ¥r bara att bestÃ¤lla en typ av event Ã¥t gÃ¥ngen!<br/>AnvÃ¤nd + fÃ¶r att bestÃ¤lla fler eller tryck - fÃ¶r att ta bort eventet ur kundvagnen.", function() {
                    // matchMedia("screen and (min-width: 992px)").matches ? $rh_cart_content_wrapper.slideDown("fast") : cartMessage.show()
                // });
                // n = t.extend({}, {
                    // id: 0,
                    // min: 0,
                    // max: 0,
                    // extras: "",
                    // options: "",
                    // cartType: this.options.menuType
                // }, n), showLoading();
                // var r = this.$element;
                // t.ajax({
                    // type: "POST",
                    // url: this.options.baseUrl + "varukorg/addItem/" + this.options.menuType,
                    // cache: !1,
                    // data: n
                // }).done(function(n) {
                    // var o = n.split("<dataend>");
                    // json = t.parseJSON(o[0]);
                    // i(r, o[1], json.totalQuantity, json.totalSum, json.cartSum, json.klarnaFee, json.giftcardValue, json.invoiceFee, !1), matchMedia("screen and (min-width: 992px)").matches ? ($rh_cart_content_wrapper.slideDown("fast"), window.clearTimeout(a), a = window.setTimeout(cartAutohide, 2600)) : (cartMessage.show(), window.clearTimeout(e), e = window.setTimeout(cartsmMessageHide, 2600)), hideLoading()
                // })
            // }
        // },
        // editCourse: function(a) {
            // var e = this;
            // a = t.extend({}, {
                // id: 0,
                // extras: "",
                // options: "",
                // key: 0
            // }, a);
            // var n = this.$element;
            // showLoading(), t.ajax({
                // type: "POST",
                // url: this.options.baseUrl + "varukorg/editItem/" + this.options.menuType,
                // cache: !1,
                // data: a
            // }).done(function(a) {
                // var r = a.split("<dataend>");
                // json = t.parseJSON(r[0]);
                // i(n, r[1], json.totalQuantity, json.totalSum, json.cartSum, json.klarnaFee, json.giftcardValue, json.invoiceFee, !1), e.options.updateCartSettings(), e._fixButton(), hideLoading()
            // })
        // },
        // addGiftCard: function(t) {
            // this.addCourse({
                // id: t.id,
                // cartType: 1
            // })
        // },
        // loadGiftCard: function(a) {
            // var e = this;
            // t.ajax({
                // type: "POST",
                // url: this.options.baseUrl + "varukorg/loadGiftcard",
                // cache: !1,
                // data: {
                    // code: a.code,
                    // sum: a.sum
                // }
            // }).done(function(t) {
                // e.refresh()
            // })
        // },
        // empty: function() {
            // var a = this.$element,
                // e = this;
            // t.ajax({
                // type: "GET",
                // url: this.options.baseUrl + "varukorg/emptyCart/" + this.options.menuType,
                // cache: !1,
                // data: {}
            // }).done(function(n) {
                // var r = n.split("<dataend>");
                // json = t.parseJSON(r[0]);
                // i(a, r[1], json.totalQuantity, json.totalSum, json.cartSum, json.klarnaFee, json.giftcardValue, json.invoiceFee, !1), e.options.updateCartSettings(), e._fixButton()
            // })
        // },
        // useKlarna: function(a) {
            // var e = this;
            // t.ajax({
                // type: "POST",
                // url: this.options.baseUrl + "varukorg/setKlarna",
                // cache: !1,
                // data: {
                    // value: a ? 1 : 0
                // }
            // }).done(function(t) {
                // e.refresh()
            // })
        // },
        // useInvoice: function(a) {
            // var e = this;
            // t.ajax({
                // type: "POST",
                // url: this.options.baseUrl + "varukorg/setInvoice",
                // cache: !1,
                // data: {
                    // value: a ? 1 : 0
                // }
            // }).done(function(t) {
                // e.refresh()
            // })
        // },
        // refresh: function() {
            // var a = this.$element,
                // e = this;
            // showLoading(), t.ajax({
                // type: "GET",
                // url: this.options.baseUrl + "varukorg/printCartList?cartType=" + this.options.cartType + "&page=" + t("#page").val(),
                // cache: !1,
                // data: {}
            // }).done(function(n) {
                // var r = n.split("<dataend>");
                // json = t.parseJSON(r[0]);
                // i(a, r[1], json.totalQuantity, json.totalSum, json.cartSum, json.klarnaFee, json.giftcardValue, json.invoiceFee, !1), e._fixButton(), e.options.cartRefresh(), hideLoading()
            // })
        // },
        // _fixButton: function() {
            // var a = t("#cart-order");
            // this.$element.find(".row").length && (this.options.cartType > 0 || parseInt(t("#online").val(), 10)) ? a.removeClass("btn-disabled").prop("disabled", !1) : a.addClass("btn-disabled").prop("disabled", !0)
        // }
    // }, t.fn.cart = function(a, e) {
        // return this.each(function() {
            // var n = t(this),
                // r = n.data("cart"),
                // i = t.extend({}, t.fn.cart.defaults, n.data(), "object" == typeof a && a);
            // r || n.data("cart", r = new o(this, i)), "string" == typeof a && r[a](e)
        // })
    // }, t.fn.cart.defaults = {
        // baseUrl: "/",
        // menuType: 0,
        // cartLink: !0,
        // cartType: 0,
        // cartRefresh: t.noop,
        // updateCartSettings: t.noop
    // }, t.fn.cart.Constructor = o
// }(window.jQuery);
// var restaurant = localStorage.visitedThisRestaurantBefore,
    // popupForRestaurant = {
        // thisRestaurantId: function() {
            // return $("#restaurant-id").val()
        // },
        // popupsThatHasBeenDisplayed: function() {
            // var t = localStorage.getItem("ro-popups-that-has-been-displayed");
            // return null !== t ? JSON.parse(t) : {}
        // },
        // displayedToday: function() {
            // var t = new Date,
                // e = this.thisRestaurantId(),
                // a = 9e5,
                // n = this.popupsThatHasBeenDisplayed(),
                // n = new Date(n[e]);
            // return t - n < a
        // },
        // setDisplayedListItem: function() {
            // var t = this,
                // e = t.thisRestaurantId(),
                // a = this.popupsThatHasBeenDisplayed();
            // a[e] = new Date;
            // var n = JSON.stringify(a);
            // localStorage.setItem("ro-popups-that-has-been-displayed", n)
        // },
        // hide: function() {
            // $(document).ready(function() {
                // $(".ro-popup-container").hide()
            // })
        // },
        // show: function() {
            // $(document).ready(function() {
                // $(".ro-popup-container").show()
            // })
        // }
    // };
// $(document).ready(function() {
    // $(".ro-popup-container").length && (popupForRestaurant.displayedToday() ? popupForRestaurant.hide() : (popupForRestaurant.show(), popupForRestaurant.setDisplayedListItem()))
// });