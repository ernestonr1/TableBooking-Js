! function() {
    "use strict";

    function t(e, o) {
        function i(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        var r;
        if (o = o || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = o.touchBoundary || 10, this.layer = e, this.tapDelay = o.tapDelay || 200, this.tapTimeout = o.tapTimeout || 700, !t.notNeeded(e)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], c = this, s = 0, u = a.length; s < u; s++) c[a[s]] = i(c[a[s]], c);
            n && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, n, o) {
                var i = Node.prototype.removeEventListener;
                "click" === t ? i.call(e, t, n.hijacked || n, o) : i.call(e, t, n, o)
            }, e.addEventListener = function(t, n, o) {
                var i = Node.prototype.addEventListener;
                "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function(t) {
                    t.propagationStopped || n(t)
                }), o) : i.call(e, t, n, o)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        n = navigator.userAgent.indexOf("Android") > 0 && !e,
        o = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        i = o && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        r = o && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (o && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !n;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var n, o;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), o = e.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, o.screenX, o.screenY, o.clientX, o.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, t.dispatchEvent(n)
    }, t.prototype.determineEventType = function(t) {
        return n && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        o && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, n;
        if (e = t.fastClickScrollParent, !e || !e.contains(t)) {
            n = t;
            do {
                if (n.scrollHeight > n.offsetHeight) {
                    e = n, t.fastClickScrollParent = n;
                    break
                }
                n = n.parentElement
            } while (n)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, n, r;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), n = t.targetTouches[0], o) {
            if (r = window.getSelection(), r.rangeCount && !r.isCollapsed) return !0;
            if (!i) {
                if (n.identifier && n.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = n.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = n.pageX, this.touchStartY = n.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            n = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > n || Math.abs(e.pageY - this.touchStartY) > n
    }, t.prototype.onTouchMove = function(t) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, a, c, s, u, l = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, r && (u = t.changedTouches[0], l = document.elementFromPoint(u.pageX - window.pageXOffset, u.pageY - window.pageYOffset) || l, l.fastClickScrollParent = this.targetElement.fastClickScrollParent), c = l.tagName.toLowerCase(), "label" === c) {
            if (e = this.findControl(l)) {
                if (this.focus(l), n) return !1;
                l = e
            }
        } else if (this.needsFocus(l)) return t.timeStamp - a > 100 || o && window.top !== window && "input" === c ? (this.targetElement = null, !1) : (this.focus(l), this.sendClick(l, t), o && "select" === c || (this.targetElement = null, t.preventDefault()), !1);
        return !(!o || i || (s = l.fastClickScrollParent, !s || s.fastClickLastScrollTop === s.scrollTop)) || (this.needsClick(l) || (t.preventDefault(), this.sendClick(l, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        n && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, o, i, r;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (o = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!n) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (e.content.indexOf("user-scalable=no") !== -1) return !0;
                if (o > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (i = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), i[1] >= 10 && i[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (e.content.indexOf("user-scalable=no") !== -1) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (r = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], !!(r >= 27 && (e = document.querySelector("meta[name=viewport]"), e && (e.content.indexOf("user-scalable=no") !== -1 || document.documentElement.scrollWidth <= window.outerWidth))) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction))
    }, t.attach = function(e, n) {
        return new t(e, n)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}();
$(window).load(function() {
    "use strict";
    window.rndJS || (window.rndJS = {
        version: 2,
        api: {
            base: "http://localhost:8080/api.hungrig.se/public",
            clientKey: "",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": "sv-SE"
            }
        },
        init: function() {
            rndJS = window.rndJS, rndJS.initPrototypeAdditions(), $.support.cors = !0, 
							$("#hungrigAPIurl") && $("#hungrigAPIurl").val() && (rndJS.api.base = $("#hungrigAPIurl").val()), 
							$("#clientKey") && $("#clientKey").val() && (rndJS.api.clientKey = $("#clientKey").val()), 
							console.info("rndJS is go! (" + rndJS.api.base + ", " + rndJS.api.clientKey + ")")
        },
        initPrototypeAdditions: function() {
            $.fn.doesExist = $.fn.doesExist || function() {
                return jQuery(this).length > 0
            }, Array.prototype.range = Array.prototype.range || function(e, t) {
                for (var r = e; r <= t; r++) this.push(r);
                return this
            }, Array.prototype.has = Array.prototype.has || function(e) {
                return this.indexOf(e) > -1
            }, Date.prototype.toYmd = Date.prototype.toYmd || function() {
                return this.getFullYear() + "-" + rndJS.pad(this.getMonth() + 1, 2) + "-" + rndJS.pad(this.getDate(), 2)
            }
        },
        rendCollection: function(e, t, r) {
            rndJS = window.rndJS;
            var n = "";
            return e && t && t.forEach(function(t, a, i) {
                n += rndJS.rendItem(e, t, a, r)
            }), n
        },
        rendItem: function(e, t, r, n) {
            return rndJS = window.rndJS, e.replace(/(<!|&lt;!|\[!)--rndJS\[([^\]]*)\]--(>|&gt;|\])/gi, function(e, a, i, s, o, c) {
                for (var u = i.split(","), d = u.shift(), l = [];
                    ["!", "@", "/"].has(d.substr(0, 1));) l.push(d.substr(0, 1)), d = d.slice(1);
                var p = d.split("."),
                    h = t,
                    f = "";
                return void 0 !== n && p.shift() != n ? e : 1 == p.length && "self" == p[0] ? h : (p.forEach(function(e, t, n) {
                    if (h[e]) h = h[e];
                    else if (l.has("/")) h = "";
                    else {
                        var a = rndJS.getObjectLowercase(h);
                        if (a[e]) h = a[e];
                        else if ("string" == typeof e) switch (e.trim().toLowerCase()) {
                            case "item_index":
                                h = r;
                                break;
                            default:
                                l.has("!") && console.warn(f + "." + e + " not found in " + h, h), h = ""
                        } else l.has("!") && console.warn("element not found in" + h + ", type: " + typeof e, h)
                    }
                    f = e
                }), u.forEach(function(e, t, r) {
                    var n = e.trim().toLowerCase();
                    switch (n) {
                        case "implode":
                            h = h.join(" ");
                            break;
                        case "lastfield":
                            h = h.split(" "), h = h[h.length - 1];
                            break;
                        case "removeseconds":
                            h = h.split(":"), h.pop(), h = h.join(":");
                            break;
                        case "break":
                            h && (h = "<br/>" + h);
                            break;
                        case "hide":
                            h = h ? "hidden" : "";
                            break;
                        case "parsenl":
                            h = h.replace(/\n/gi, "<br/>");
                            break;
                        case "checked":
                            h = h ? ' checked="checked"' : "";
                            break;
                        case "selected":
                            h = h ? " selected" : "";
                            break;
                        case "disabled":
                            h = h ? " disabled" : "";
                            break;
                        case "date":
                            h = new Date(h).toYmd();
                            break;
                        case "time":
                            h = new Date(h), h = h.toTimeString().substr(0, 5);
                            break;
                        case "capitalize":
                            "string" == typeof h && (h = h.charAt(0).toUpperCase() + h.slice(1));
                            break;
                        case "cut2":
                            h = h.slice(2);
                            break;
                        case "trim":
                            h = h.trim();
                            break;
                        case "!":
                            h = !h;
                            break;
                        default:
                            "is:" == n.substr(0, 3) ? h = h == n.substr(3) ? 1 : 0 : "isnot:" == n.substr(0, 6) ? h = h != n.substr(6) ? 1 : 0 : "or:" == n.substr(0, 3) ? h || (h = n.substr(3)) : l.has("@") || console.warn("rndJS: " + n + " could not be resolved (" + h + ")")
                    }
                }), h)
            })
        },
        getObjectLowercase: function(e) {
            if (rndJS = window.rndJS, "object" == typeof e) {
                for (var t, r = Object.keys(e), n = r.length, a = {}; n--;) t = r[n], a[t.toLowerCase()] = e[t];
                return a
            }
            return e
        },
        doAjax: function(e, t, r, n, a) {
            return rndJS = window.rndJS, r ? (r = JSON.stringify(r), "{}" == r.trim() && (r = "")) : r = "", "/" == t.substr(0, 1) && "/" == rndJS.api.base.substr(-1, 1) && (t = t.substr(1)), "/" == t.substr(-1, 1) && (t = t.slice(0, -1)), $.ajax({
                type: e,
                url: rndJS.api.base + t,
                headers: rndJS.api.headers,
                context: this,
                cache: !1,
                data: r
            }).always(function(e) {
                var t = void 0 === e.error || e.error;
                if (t || "function" != typeof n || n(e.data, e.meta), t && "function" == typeof a) {
                    var r = e.responseText;
                    try {
                        r = JSON.parse(r)
                    } catch (i) {}
                    a(r, e)
                }
            })
        },
        route: function(e, t) {
            t = t || {};
            var r = $.extend({}, {
                clientKey: rndJS.api.clientKey
            }, t);
            return $.each(r, function(t, r) {
                e = e.replace("{" + t + "}", r)
            }), e
        },
        populateSelect: function(e, t, r, n, a) {
            a && $(n).html(""), $.each(e, function(e, a) {
                var i = a[t];
                "function" == typeof t && (i = t(a)), $(n).append($("<option></option>").attr("value", a[r]).text(i))
            })
        },
        serializeForm: function(e, t, r) {
            void 0 === r && (r = "name");
            var n = {};
            return $(e).find("input, textarea").each(function(e) {
                n[$(this).attr(r)] = function() {
                    var e = $(this).attr("type");
                    $(this).is("textarea") && (e = "text");
                    var r = $(this).val() == $(this).attr("placeholder") ? "" : $(this).val();
                    return e ? ["checkbox", "radio"].has(e) ? t ? $(this).prop("checked") ? 1 : 0 : $(this).prop("checked") : ["number"].has(e) ? Number(r) : r : $.isNumeric($(this).val()) ? Number(r) : r
                }.call(this)
            }), n
        },
        dateAdd: function(e, t, r) {
            var n = new Date(e);
            switch (t.toLowerCase()) {
                case "year":
                    n.setFullYear(n.getFullYear() + r);
                    break;
                case "quarter":
                    n.setMonth(n.getMonth() + 3 * r);
                    break;
                case "month":
                    n.setMonth(n.getMonth() + r);
                    break;
                case "week":
                    n.setDate(n.getDate() + 7 * r);
                    break;
                case "day":
                    n.setDate(n.getDate() + r);
                    break;
                case "hour":
                    n.setTime(n.getTime() + 36e5 * r);
                    break;
                case "minute":
                    n.setTime(n.getTime() + 6e4 * r);
                    break;
                case "second":
                    n.setTime(n.getTime() + 1e3 * r);
                    break;
                default:
                    n = void 0
            }
            return n
        },
        pad: function(e, t, r) {
            return r = r || "0", e += "", e.length >= t ? e : new Array(t - e.length + 1).join(r) + e
        },
        getById: function(e, t, r) {
            r || (r = "id");
            var n = null;
            return e.some(function(e, a) {
                if (e[r] == t) return n = e, !0
            }), n
        },
        debounce: function(e, t, r) {
            var n, a, i, s, o, c = function() {
                var u = (new Date).getTime() - s;
                u < t && u >= 0 ? n = setTimeout(c, t - u) : (n = null, r || (o = e.apply(i, a), n || (i = a = null)))
            };
            return function() {
                i = this, a = arguments, s = (new Date).getTime();
                var u = r && !n;
                return n || (n = setTimeout(c, t)), u && (o = e.apply(i, a), i = a = null), o
            }
        }
    }, window.rndJS.init())
});
$(function() {
    §.attach(document.body)
}), $(window).load(function() {
    "use strict";
    window.roBB || (window.roBB = {
        data: {},
        init: function() {
            rndJS = window.rndJS, roBB = window.roBB, $(window).on("resize", function(e) {
                rndJS.debounce(roBB.resize, 200)()
            }), roBB.resize(), roBB.activate = function() {
                rndJS || roBB.onError("rndJS not included"), roBB.reloadSettings()
            }, roBB.onError = function(e, o) {
                o && 500 == o.status ? (console.error("Sever error occured " + JSON.stringify(o)), $("#error_data").text("An unknown server problem occured"), roBB.switchPage("error")) : e && "stopped" == e.error_message ? roBB.switchPage("stopped") : e && "no slots" == e.error_message ? roBB.switchPage("tooslow") : e && e.error_message ? (console.error("Ordinary server error occured " + e.error_message), $("#error_data").text(e.error_message), roBB.switchPage("error")) : e && "string" == typeof e ? (console.error("Ordinary local error occured " + e), $("#error_data").text(e), roBB.switchPage("error")) : (console.error("Unknown error occured " + JSON.stringify(e)), $("#error_data").text(JSON.stringify([e, o, rndJS.api])), roBB.switchPage("error"))
            }, roBB.reloadSettings = function() {
                rndJS.doAjax("GET", rndJS.route("/booking/settings/{clientKey}"), {}, function(e, o) {
                    return e ? (roBB.data.settings = e, roBB.data.settings.toc && $(".roBB #bokningsvillkor").text(roBB.data.settings.toc), void(roBB.data.settings.stopped ? roBB.switchPage("stopped") : roBB.data.settings.onlineShowAreas ? roBB.loadAreas() : roBB.data.settings.defaultarea ? roBB.selectArea(roBB.data.settings.defaultarea) : roBB.onError("There is no default area"))) : void roBB.onError("No data recieved, booking may not be activated on this restaurant.")
                }, roBB.onError), roBB.data.userData = {};
                try {
                    roBB.data.userData = JSON.parse($("#roBB-data #roBB-user").text())
                } catch (e) {
                    console.warn("Could not parse login data", e)
                }
            }, roBB.switchPage = function(e, o, r) {
                if (o = void 0 === o || o, r || (r = "roBB"), $.isNumeric(e) && e == -1) {
                    if (roBB.data.shownPage && roBB.data.shownPage != roBB.data.currentLocation) return roBB.switchPage(roBB.data.currentLocation, !1);
                    if (void 0 === roBB.data.pageHistory[roBB.data.pageHistory.length - 2]) return "history-fail";
                    e = roBB.data.pageHistory.pop(), o = !1
                }
                return r = $('[pageholder="' + r + '"]'), r.find('[pageid="' + e + '"]').hasClass("show") ? "same-page" : (r.find("[pageid].show").removeClass("show"), r.find('[pageid="' + e + '"]').addClass("show"), roBB.data.shownPage = e, $(document).scrollTop() + $("#roheader").outerHeight() > $("div.roBB").offset().top && $(document).scrollTop($("div.roBB").offset().top - $("#roheader").outerHeight() - 1), !["loading", "error", "stopped", "full", "bokningsvillkor"].has(e) && o && (roBB.data.pageHistory = roBB.data.pageHistory || [], roBB.data.pageHistory.push(e), window.location = "#" + e, roBB.data.currentLocation = e), "loading" != e && r.find("[pageid].show").hasClass("hastopbar") ? r.addClass("hastopbar") : "loading" != e && r.removeClass("hastopbar"), roBB.renderer(roBB.data, "div.topbar", "article.roBB-progress"), void setTimeout(function() {
                    roBB.resize()
                }, 150))
            }, roBB.renderer = function(e, o, r) {
                var t;
                t = Array.isArray && Array.isArray(e) || $.isArray(e) ? rndJS.rendCollection($("#rndJS-samples " + r).prop("outerHTML"), e) : rndJS.rendItem($("#rndJS-samples " + r).prop("outerHTML"), e, -1), console.log(t), $(".roBB " + o).html(t)
            }, roBB.handleEvent = function(e, o, r, t, a) {
                a = a || 350;
                var s = rndJS.debounce(r, a, !0);
                $(document).on(e, o, function(e) {
                    s.call(this), t || "click" != e.type || e.preventDefault()
                })
            }, window.addEventListener("hashchange", function(e) {
                var o = location.hash.replace("#", "");
                roBB.switchPage(o)
            }, !1), roBB.handleEvent("click", "button#goBack", function(e) {
                roBB.switchPage(-1)
            }), roBB.handleEvent("click", "#goVillkor a", function(e) {
                roBB.switchPage("bokningsvillkor")
            }), roBB.handleEvent("click", "[robb-gotopage]", function(e) {
                var o = $(this).attr("robb-gotopage");
                ("areas" == o && roBB.data.areas.length || "people" == o && roBB.data.selectedArea || "calendar" == o && roBB.data.selectedPeopleNum || "sessions" == o && roBB.data.pickedDate || "contact" == o && roBB.data.selectedSession) && roBB.switchPage(o)
            }), roBB.loadAreas = function() {
                rndJS.doAjax("GET", rndJS.route("/booking/areas/{clientKey}"), {}, function(e, o) {
                    e && e.length ? (roBB.data.areas = e, roBB.renderer(e, "section.roBB-areas", "article.roBB-area"), roBB.switchPage("areas")) : roBB.onError("There are no areas available")
                }, roBB.onError)
            }, roBB.selectArea = function(e) {
                return $.isNumeric(e) ? roBB.data.selectedArea = rndJS.getById(roBB.data.areas, e) : roBB.data.selectedArea = e, roBB.data.selectedPeopleNum = null, roBB.data.pickedDate = null, roBB.data.selectedSession = null, roBB.data.selectedArea.onlineMaxGuests ? (roBB.renderer([].range(1, roBB.data.selectedArea.onlineMaxGuests), "section.roBB-people #selectPeopleBox", "article.roBB-peopleNum"), roBB.renderer(roBB.data.settings.commentToGuest, "section.roBB-people #sessionCommentBox", "article.roBB-session-comment"), void roBB.switchPage("people")) : void roBB.onError("Online max guests is an invalid number or 0")
            }, roBB.handleEvent("click", "article.roBB-area", function() {
                roBB.selectArea($(this).data("id"))
            }), roBB.selectPeopleNum = function(e) {
                e && $.isNumeric(e) && (roBB.data.selectedPeopleNum = e), roBB.data.pickedDate = null, roBB.data.selectedSession = null, roBB.fetchCalendar()
            }, roBB.handleEvent("click", "article.roBB-peopleNum", function() {
                roBB.data.selectedPeopleNum = $(this).data("num"), $("section.roBB-people article.roBB-peopleNum.selected").removeClass("selected"), $(this).addClass("selected"), $("section.roBB-people #selectPeople").prop("disabled", !1)
            }, !1, 100), 
						roBB.handleEvent("click", "button#selectPeople", roBB.selectPeopleNum), roBB.fetchCalendar = function() {
                roBB.switchPage("loading");
                var e = (new Date, (new Date).toYmd()),
                    o = rndJS.dateAdd(new Date, "week", roBB.data.settings.onlineBookingHorizon).toYmd(),
                    r = rndJS.route("/booking/calendar/{clientKey}/{startDate}/{endDate}/{seats}/{areaId}", {
                        startDate: e,
                        endDate: o,
                        seats: roBB.data.selectedPeopleNum,
                        areaId: roBB.data.selectedArea.id
                    });
                rndJS.doAjax("GET", r, {}, function(r, t) {
                    r.available.length ? (roBB.switchPage("calendar"), $("#roBB-datepicker").datepicker("remove").datepicker({
                        startDate: e,
                        endDate: o,
                        language: "sv",
                        autoclose: !0,
                        beforeShowDay: function(e) {
                            var o = e.toYmd();
                            return $.inArray(o, r.available) >= 0 ? {
                                tooltip: "VÃ¤lj datum"
                            } : $.inArray(o, r.full) >= 0 ? {
                                classes: "bcfull disabled",
                                tooltip: "Fullt"
                            } : {
                                classes: "bcclosed disabled",
                                tooltip: "StÃ¤ngt"
                            }
                        }
                    }), roBB.pickDate(null, !0)) : roBB.showBookingFull()
                }, roBB.onError)
            }, $("#roBB-datepicker").datepicker().on("changeDate", function(e) {
                $("section.roBB-calendar #selectDate").prop("disabled", !1), roBB.pickDate(e.date)
            }), roBB.pickDate = function(e, o) {
                e && (roBB.data.pickedDate = e.toYmd()), o && ($("#roBB-datepicker").datepicker("update", roBB.data.pickedDate), $("#roBB-datepicker .active").trigger("click"))
            }, 
						roBB.showBookingFull = function() {
                roBB.switchPage("full")
            }, 
						roBB.updateSessionComment = function(e) {
                roBB.renderer(e, "section.roBB-sessions #sessionCommentBox", "article.roBB-session-comment")
            }, roBB.selectDate = function() {
                roBB.switchPage("loading"), roBB.data.selectedSession = null;
                var e = rndJS.route("/booking/sessions/{clientKey}/{date}/{areaId}", {
                    date: roBB.data.pickedDate,
                    areaId: roBB.data.selectedArea.id
                });
                rndJS.doAjax("GET", e, {}, function(e, o) {
                    return e && e.length ? (roBB.data.availableSessions = e, e.length > 3 ? (roBB.renderer([0], "section.roBB-sessions #sessionListBox", "article.roBB-session-selectList"), rndJS.populateSelect(e, "name", "id", $("section.roBB-sessions #sessionListBox select#sessionList"), !0)) : (e[0].selected = !0, roBB.updateSessionComment(e[0].comment), roBB.renderer(e, "section.roBB-sessions #sessionListBox", "article.roBB-session-button")), void roBB.getAvailableSlots(function(e) {
                        roBB.switchPage("sessions")
                    })) : void roBB.onError("This day can not be booked.")
                }, roBB.onError)
            }, roBB.handleEvent("click", "button#selectDate", roBB.selectDate), roBB.getSelectedSession = function() {
                return $("#sessionListBox").find("select").length ? $("#sessionListBox select#sessionList option:selected").val() : $("#sessionListBox article.selected").data("value")
            }, roBB.getAvailableSlots = function(e) {
                roBB.renderer([0], "section.roBB-sessions #selectTimeBox", "article.roBB-session-loading"), roBB.updateSessionComment(rndJS.getById(roBB.data.availableSessions, roBB.getSelectedSession()).comment), $("section.roBB-sessions #selectSession").prop("disabled", !0);
                var o = rndJS.route("/booking/available/{clientKey}/{date}/{seats}/{areaId}/{sessionId}", {
                    date: roBB.data.pickedDate,
                    seats: roBB.data.selectedPeopleNum,
                    areaId: roBB.data.selectedArea.id,
                    sessionId: roBB.getSelectedSession()
                });
                rndJS.doAjax("GET", o, {}, function(o, r) {
                    o.length ? (roBB.renderer(o, "section.roBB-sessions #selectTimeBox", "article.roBB-session"), roBB.resize()) : roBB.renderer([0], "section.roBB-sessions #selectTimeBox", "article.roBB-session-full"), e && "function" == typeof e && e(o)
                }, roBB.onError)
            }, roBB.handleEvent("click", "#sessionListBox article.roBB-session-button", function() {
                $("#sessionListBox article.roBB-session-button.selected").removeClass("selected"), $(this).addClass("selected"), roBB.getAvailableSlots()
            }), roBB.handleEvent("change", "select#sessionList", roBB.getAvailableSlots), roBB.handleEvent("click", "article.roBB-session", function() {
                roBB.data.selectedSession = $(this).data("label"), $("section.roBB-sessions article.roBB-session.selected").removeClass("selected"), $(this).addClass("selected"), $("section.roBB-sessions #selectSession").prop("disabled", !1)
            }, !1, 100), roBB.selectSession = function() {
                roBB.renderer(roBB.data.userData, "section.roBB-contact form#contactInfo", "div.roBB-contact-form"), roBB.switchPage("contact")
            }, roBB.handleEvent("click", "button#selectSession", roBB.selectSession), roBB.evaluateBooking = function(e) {
                var o = !0;
                return $(e).find("input[required]").each(function(e, r) {
                    "checkbox" != $(this).attr("type") && $(this).val() || "email" != $(this).attr("type") && /\S+@\S+\.\S+/.test($(this).val()) || $(this).prop("checked") ? $(this).parent().removeClass("has-error") : (o = !1, $(this).parent().addClass("has-error"))
                }), o
            }, roBB.createBooking = function() {
                var e = $("form#contactInfo"),
                    o = rndJS.serializeForm(e);
                if (roBB.evaluateBooking(e) && o.terms) {
                    roBB.switchPage("loading");
                    var r = {
                        clientKey: rndJS.api.clientKey,
                        date: roBB.data.pickedDate,
                        time: roBB.data.selectedSession,
                        areaId: roBB.data.selectedArea.id,
                        sessionId: roBB.getSelectedSession(),
                        seats: roBB.data.selectedPeopleNum,
                        message: o.note,
                        guest: {
                            clientKey: rndJS.api.clientKey,
                            firstname: o.firstname,
                            lastname: o.lastname,
                            phone: o.phone,
                            email: o.email,
                            address: "",
                            city: "",
                            zip: "",
                            company: "",
                            note: ""
                        }
                    };
                    rndJS.doAjax("POST", "/booking", r, function(e, o) {
                        o.success ? (roBB.data.bookingConfirmation = e, roBB.renderer(e, "section.roBB-bookingsuccess", "article.roBB-bookingsuccess"), roBB.switchPage("bookingsuccess")) : roBB.onError(e)
                    }, roBB.onError)
                } else alert("Dubbelkolla sÃ¥ att du har fyllt i alla fÃ¤lt och godkÃ¤nt bokningsvillkoren fÃ¶rst!")
            }, roBB.handleEvent("click", "button#createBooking", roBB.createBooking), $(document).on("ro-logout", function(e) {}), $(document).on("ro-login", function(e, o) {
                roBB.data.userData = o.user, roBB.data.userData.email = roBB.data.userData.details.email, roBB.renderer(roBB.data.userData, "section.roBB-contact form#contactInfo", "div.roBB-contact-form")
            }), roBB.activate(), roBB.testError = function() {
                roBB.onError({
                    emulated: "emulated-error",
                    evenMore: "even-more-emulations"
                })
            }, roBB.testFull = function() {
                roBB.showBookingFull()
            }, roBB.testStopped = function() {
                roBB.switchPage("stopped")
            }
        },
        resize: function() {
            $("[pageholder]").each(function(e, o) {
                var r = $(this).find("[pageid]").map(function() {
                    return $(this).outerHeight()
                }).get();
                $(this).css("min-height", Math.max.apply(null, r) + 60)
            })
        }
    }, window.roBB.init())
});