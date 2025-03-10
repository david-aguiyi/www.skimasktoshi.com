/*! Magnific Popup - v1.2.0 - 2024-06-08
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2024 Dmytro Semenov; */
!(function (e) {
  "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : e(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (e) {
  var t,
    n,
    i,
    r,
    o,
    a,
    s = "Close",
    l = "BeforeClose",
    c = "MarkupParse",
    p = "Open",
    d = "Change",
    u = ".mfp",
    f = "mfp-ready",
    m = "mfp-removing",
    g = "mfp-prevent-close",
    v = function () {},
    h = !!window.jQuery,
    $ = e(window),
    y = function (e, n) {
      t.ev.on("mfp" + e + u, n);
    },
    C = function (t, n, i, r) {
      var o = document.createElement("div");
      return (
        (o.className = "mfp-" + t),
        i && (o.innerHTML = i),
        r ? n && n.appendChild(o) : ((o = e(o)), n && o.appendTo(n)),
        o
      );
    },
    w = function (e, n) {
      t.ev.triggerHandler("mfp" + e, n),
        t.st.callbacks &&
          ((e = e.charAt(0).toLowerCase() + e.slice(1)),
          t.st.callbacks[e] &&
            t.st.callbacks[e].apply(t, Array.isArray(n) ? n : [n]));
    },
    b = function (n) {
      return (
        (n === a && t.currTemplate.closeBtn) ||
          ((t.currTemplate.closeBtn = e(
            t.st.closeMarkup.replace("%title%", t.st.tClose)
          )),
          (a = n)),
        t.currTemplate.closeBtn
      );
    },
    x = function () {
      e.magnificPopup.instance ||
        ((t = new v()).init(), (e.magnificPopup.instance = t));
    },
    I = function () {
      var e = document.createElement("p").style,
        t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
      return !1;
    };
  (v.prototype = {
    constructor: v,
    init: function () {
      var n = navigator.appVersion;
      (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
        (t.isAndroid = /android/gi.test(n)),
        (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
        (t.supportsTransition = I()),
        (t.probablyMobile =
          t.isAndroid ||
          t.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (i = e(document)),
        (t.popupsCache = {});
    },
    open: function (n) {
      if (!1 === n.isObj) {
        (t.items = n.items.toArray()), (t.index = 0);
        var r,
          a,
          s = n.items;
        for (r = 0; r < s.length; r++)
          if (((a = s[r]).parsed && (a = a.el[0]), a === n.el[0])) {
            t.index = r;
            break;
          }
      } else
        (t.items = Array.isArray(n.items) ? n.items : [n.items]),
          (t.index = n.index || 0);
      if (t.isOpen) {
        t.updateItemHTML();
        return;
      }
      (t.types = []),
        (o = ""),
        n.mainEl && n.mainEl.length ? (t.ev = n.mainEl.eq(0)) : (t.ev = i),
        n.key
          ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
            (t.currTemplate = t.popupsCache[n.key]))
          : (t.currTemplate = {}),
        (t.st = e.extend(!0, {}, e.magnificPopup.defaults, n)),
        (t.fixedContentPos =
          "auto" === t.st.fixedContentPos
            ? !t.probablyMobile
            : t.st.fixedContentPos),
        t.st.modal &&
          ((t.st.closeOnContentClick = !1),
          (t.st.closeOnBgClick = !1),
          (t.st.showCloseBtn = !1),
          (t.st.enableEscapeKey = !1)),
        t.bgOverlay ||
          ((t.bgOverlay = C("bg").on("click" + u, function () {
            t.close();
          })),
          (t.wrap = C("wrap")
            .attr("tabindex", -1)
            .on("click" + u, function (e) {
              t._checkIfClose(e.target) && t.close();
            })),
          (t.container = C("container", t.wrap))),
        (t.contentContainer = C("content")),
        t.st.preloader &&
          (t.preloader = C("preloader", t.container, t.st.tLoading));
      var l = e.magnificPopup.modules;
      for (r = 0; r < l.length; r++) {
        var d = l[r];
        t["init" + (d = d.charAt(0).toUpperCase() + d.slice(1))].call(t);
      }
      w("BeforeOpen"),
        t.st.showCloseBtn &&
          (t.st.closeBtnInside
            ? (y(c, function (e, t, n, i) {
                n.close_replaceWith = b(i.type);
              }),
              (o += " mfp-close-btn-in"))
            : t.wrap.append(b())),
        t.st.alignTop && (o += " mfp-align-top"),
        t.fixedContentPos
          ? t.wrap.css({
              overflow: t.st.overflowY,
              overflowX: "hidden",
              overflowY: t.st.overflowY,
            })
          : t.wrap.css({ top: $.scrollTop(), position: "absolute" }),
        (!1 !== t.st.fixedBgPos &&
          ("auto" !== t.st.fixedBgPos || t.fixedContentPos)) ||
          t.bgOverlay.css({ height: i.height(), position: "absolute" }),
        t.st.enableEscapeKey &&
          i.on("keyup" + u, function (e) {
            27 === e.keyCode && t.close();
          }),
        $.on("resize" + u, function () {
          t.updateSize();
        }),
        t.st.closeOnContentClick || (o += " mfp-auto-cursor"),
        o && t.wrap.addClass(o);
      var m = (t.wH = $.height()),
        g = {};
      if (t.fixedContentPos && t._hasScrollBar(m)) {
        var v = t._getScrollbarSize();
        v && (g.marginRight = v);
      }
      t.fixedContentPos &&
        (t.isIE7
          ? e("body, html").css("overflow", "hidden")
          : (g.overflow = "hidden"));
      var h = t.st.mainClass;
      return (
        t.isIE7 && (h += " mfp-ie7"),
        h && t._addClassToMFP(h),
        t.updateItemHTML(),
        w("BuildControls"),
        e("html").css(g),
        t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
        (t._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          t.content
            ? (t._addClassToMFP(f), t._setFocus())
            : t.bgOverlay.addClass(f),
            i.on("focusin" + u, t._onFocusIn);
        }, 16),
        (t.isOpen = !0),
        t.updateSize(m),
        w(p),
        n
      );
    },
    close: function () {
      t.isOpen &&
        (w(l),
        (t.isOpen = !1),
        t.st.removalDelay && !t.isLowIE && t.supportsTransition
          ? (t._addClassToMFP(m),
            setTimeout(function () {
              t._close();
            }, t.st.removalDelay))
          : t._close());
    },
    _close: function () {
      w(s);
      var n = m + " " + f + " ";
      if (
        (t.bgOverlay.detach(),
        t.wrap.detach(),
        t.container.empty(),
        t.st.mainClass && (n += t.st.mainClass + " "),
        t._removeClassFromMFP(n),
        t.fixedContentPos)
      ) {
        var r = { marginRight: "" };
        t.isIE7 ? e("body, html").css("overflow", "") : (r.overflow = ""),
          e("html").css(r);
      }
      i.off("keyup" + u + " focusin" + u),
        t.ev.off(u),
        t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        t.bgOverlay.attr("class", "mfp-bg"),
        t.container.attr("class", "mfp-container"),
        t.st.showCloseBtn &&
          (!t.st.closeBtnInside || !0 === t.currTemplate[t.currItem.type]) &&
          t.currTemplate.closeBtn &&
          t.currTemplate.closeBtn.detach(),
        t.st.autoFocusLast &&
          t._lastFocusedEl &&
          e(t._lastFocusedEl).trigger("focus"),
        (t.currItem = null),
        (t.content = null),
        (t.currTemplate = null),
        (t.prevHeight = 0),
        w("AfterClose");
    },
    updateSize: function (e) {
      if (t.isIOS) {
        var n = document.documentElement.clientWidth / window.innerWidth,
          i = window.innerHeight * n;
        t.wrap.css("height", i), (t.wH = i);
      } else t.wH = e || $.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), w("Resize");
    },
    updateItemHTML: function () {
      var n = t.items[t.index];
      t.contentContainer.detach(),
        t.content && t.content.detach(),
        n.parsed || (n = t.parseEl(t.index));
      var i = n.type;
      if (
        (w("BeforeChange", [t.currItem ? t.currItem.type : "", i]),
        (t.currItem = n),
        !t.currTemplate[i])
      ) {
        var o = !!t.st[i] && t.st[i].markup;
        w("FirstMarkupParse", o),
          o ? (t.currTemplate[i] = e(o)) : (t.currTemplate[i] = !0);
      }
      r && r !== n.type && t.container.removeClass("mfp-" + r + "-holder");
      var a = t["get" + i.charAt(0).toUpperCase() + i.slice(1)](
        n,
        t.currTemplate[i]
      );
      t.appendContent(a, i),
        (n.preloaded = !0),
        w(d, n),
        (r = n.type),
        t.container.prepend(t.contentContainer),
        w("AfterChange");
    },
    appendContent: function (e, n) {
      (t.content = e),
        e
          ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n]
            ? t.content.find(".mfp-close").length || t.content.append(b())
            : (t.content = e)
          : (t.content = ""),
        w("BeforeAppend"),
        t.container.addClass("mfp-" + n + "-holder"),
        t.contentContainer.append(t.content);
    },
    parseEl: function (n) {
      var i,
        r = t.items[n];
      if (
        (r.tagName
          ? (r = { el: e(r) })
          : ((i = r.type), (r = { data: r, src: r.src })),
        r.el)
      ) {
        for (var o = t.types, a = 0; a < o.length; a++)
          if (r.el.hasClass("mfp-" + o[a])) {
            i = o[a];
            break;
          }
        (r.src = r.el.attr("data-mfp-src")),
          r.src || (r.src = r.el.attr("href"));
      }
      return (
        (r.type = i || t.st.type || "inline"),
        (r.index = n),
        (r.parsed = !0),
        (t.items[n] = r),
        w("ElementParse", r),
        t.items[n]
      );
    },
    addGroup: function (e, n) {
      var i = function (i) {
        (i.mfpEl = this), t._openClick(i, e, n);
      };
      n || (n = {});
      var r = "click.magnificPopup";
      (n.mainEl = e),
        n.items
          ? ((n.isObj = !0), e.off(r).on(r, i))
          : ((n.isObj = !1),
            n.delegate
              ? e.off(r).on(r, n.delegate, i)
              : ((n.items = e), e.off(r).on(r, i)));
    },
    _openClick: function (n, i, r) {
      if (
        (void 0 !== r.midClick
          ? r.midClick
          : e.magnificPopup.defaults.midClick) ||
        (2 !== n.which && !n.ctrlKey && !n.metaKey && !n.altKey && !n.shiftKey)
      ) {
        var o =
          void 0 !== r.disableOn
            ? r.disableOn
            : e.magnificPopup.defaults.disableOn;
        if (o) {
          if ("function" == typeof o) {
            if (!o.call(t)) return !0;
          } else if ($.width() < o) return !0;
        }
        n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
          (r.el = e(n.mfpEl)),
          r.delegate && (r.items = i.find(r.delegate)),
          t.open(r);
      }
    },
    updateStatus: function (e, i) {
      if (t.preloader) {
        n !== e && t.container.removeClass("mfp-s-" + n),
          i || "loading" !== e || (i = t.st.tLoading);
        var r = { status: e, text: i };
        w("UpdateStatus", r),
          (e = r.status),
          (i = r.text),
          t.st.allowHTMLInStatusIndicator
            ? t.preloader.html(i)
            : t.preloader.text(i),
          t.preloader.find("a").on("click", function (e) {
            e.stopImmediatePropagation();
          }),
          t.container.addClass("mfp-s-" + e),
          (n = e);
      }
    },
    _checkIfClose: function (n) {
      if (!e(n).closest("." + g).length) {
        var i = t.st.closeOnContentClick,
          r = t.st.closeOnBgClick;
        if (
          (i && r) ||
          !t.content ||
          e(n).closest(".mfp-close").length ||
          (t.preloader && n === t.preloader[0])
        )
          return !0;
        if (n === t.content[0] || e.contains(t.content[0], n)) {
          if (i) return !0;
        } else if (r && e.contains(document, n)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e);
    },
    _removeClassFromMFP: function (e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
    },
    _hasScrollBar: function (e) {
      return (
        (t.isIE7 ? i.height() : document.body.scrollHeight) > (e || $.height())
      );
    },
    _setFocus: function () {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).trigger("focus");
    },
    _onFocusIn: function (n) {
      if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target))
        return t._setFocus(), !1;
    },
    _parseMarkup: function (n, i, r) {
      var o;
      r.data && (i = e.extend(r.data, i)),
        w(c, [n, i, r]),
        e.each(i, function (i, r) {
          if (void 0 === r || !1 === r) return !0;
          if ((o = i.split("_")).length > 1) {
            var a = n.find(u + "-" + o[0]);
            if (a.length > 0) {
              var s = o[1];
              "replaceWith" === s
                ? a[0] !== r[0] && a.replaceWith(r)
                : "img" === s
                ? a.is("img")
                  ? a.attr("src", r)
                  : a.replaceWith(
                      e("<img>").attr("src", r).attr("class", a.attr("class"))
                    )
                : a.attr(o[1], r);
            }
          } else t.st.allowHTMLInTemplate ? n.find(u + "-" + i).html(r) : n.find(u + "-" + i).text(r);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        (e.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(e),
          (t.scrollbarSize = e.offsetWidth - e.clientWidth),
          document.body.removeChild(e);
      }
      return t.scrollbarSize;
    },
  }),
    (e.magnificPopup = {
      instance: null,
      proto: v.prototype,
      modules: [],
      open: function (t, n) {
        return (
          x(),
          ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
          (t.index = n || 0),
          this.instance.open(t)
        );
      },
      close: function () {
        return e.magnificPopup.instance && e.magnificPopup.instance.close();
      },
      registerModule: function (t, n) {
        n.options && (e.magnificPopup.defaults[t] = n.options),
          e.extend(this.proto, n.proto),
          this.modules.push(t);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
        allowHTMLInStatusIndicator: !1,
        allowHTMLInTemplate: !1,
      },
    }),
    (e.fn.magnificPopup = function (n) {
      x();
      var i = e(this);
      if ("string" == typeof n) {
        if ("open" === n) {
          var r,
            o = h ? i.data("magnificPopup") : i[0].magnificPopup,
            a = parseInt(arguments[1], 10) || 0;
          o.items
            ? (r = o.items[a])
            : ((r = i), o.delegate && (r = r.find(o.delegate)), (r = r.eq(a))),
            t._openClick({ mfpEl: r }, i, o);
        } else
          t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
      } else
        (n = e.extend(!0, {}, n)),
          h ? i.data("magnificPopup", n) : (i[0].magnificPopup = n),
          t.addGroup(i, n);
      return i;
    });
  var _,
    k,
    P,
    S = "inline",
    T = function () {
      P && (k.after(P.addClass(_)).detach(), (P = null));
    };
  e.magnificPopup.registerModule(S, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        t.types.push(S),
          y(s + "." + S, function () {
            T();
          });
      },
      getInline: function (n, i) {
        if ((T(), n.src)) {
          var r = t.st.inline,
            o = e(n.src);
          if (o.length) {
            var a = o[0].parentNode;
            a &&
              a.tagName &&
              (k || ((k = C((_ = r.hiddenClass))), (_ = "mfp-" + _)),
              (P = o.after(k).detach().removeClass(_))),
              t.updateStatus("ready");
          } else t.updateStatus("error", r.tNotFound), (o = e("<div>"));
          return (n.inlineElement = o), o;
        }
        return t.updateStatus("ready"), t._parseMarkup(i, {}, n), i;
      },
    },
  });
  var E,
    z = "ajax",
    O = function () {
      E && e(document.body).removeClass(E);
    },
    M = function () {
      O(), t.req && t.req.abort();
    };
  e.magnificPopup.registerModule(z, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: "The content could not be loaded.",
    },
    proto: {
      initAjax: function () {
        t.types.push(z),
          (E = t.st.ajax.cursor),
          y(s + "." + z, M),
          y("BeforeChange." + z, M);
      },
      getAjax: function (n) {
        E && e(document.body).addClass(E), t.updateStatus("loading");
        var i = e.extend(
          {
            url: n.src,
            success: function (i, r, o) {
              var a = { data: i, xhr: o };
              w("ParseAjax", a),
                t.appendContent(e(a.data), z),
                (n.finished = !0),
                O(),
                t._setFocus(),
                setTimeout(function () {
                  t.wrap.addClass(f);
                }, 16),
                t.updateStatus("ready"),
                w("AjaxContentAdded");
            },
            error: function () {
              O(),
                (n.finished = n.loadError = !0),
                t.updateStatus(
                  "error",
                  t.st.ajax.tError.replace("%url%", n.src)
                );
            },
          },
          t.st.ajax.settings
        );
        return (t.req = e.ajax(i)), "";
      },
    },
  });
  var B,
    L,
    H = function (e) {
      if (e.data && void 0 !== e.data.title) return e.data.title;
      var n = t.st.image.titleSrc;
      if (n) {
        if ("function" == typeof n) return n.call(t, e);
        if (e.el) return e.el.attr(n) || "";
      }
      return "";
    };
  e.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: "The image could not be loaded.",
    },
    proto: {
      initImage: function () {
        var n = t.st.image,
          i = ".image";
        t.types.push("image"),
          y(p + i, function () {
            "image" === t.currItem.type &&
              n.cursor &&
              e(document.body).addClass(n.cursor);
          }),
          y(s + i, function () {
            n.cursor && e(document.body).removeClass(n.cursor),
              $.off("resize" + u);
          }),
          y("Resize" + i, t.resizeImage),
          t.isLowIE && y("AfterChange", t.resizeImage);
      },
      resizeImage: function () {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var n = 0;
          t.isLowIE &&
            (n =
              parseInt(e.img.css("padding-top"), 10) +
              parseInt(e.img.css("padding-bottom"), 10)),
            e.img.css("max-height", t.wH - n);
        }
      },
      _onImageHasSize: function (e) {
        e.img &&
          ((e.hasSize = !0),
          B && clearInterval(B),
          (e.isCheckingImgSize = !1),
          w("ImageHasSize", e),
          e.imgHidden &&
            (t.content && t.content.removeClass("mfp-loading"),
            (e.imgHidden = !1)));
      },
      findImageSize: function (e) {
        var n = 0,
          i = e.img[0],
          r = function (o) {
            B && clearInterval(B),
              (B = setInterval(function () {
                if (i.naturalWidth > 0) {
                  t._onImageHasSize(e);
                  return;
                }
                n > 200 && clearInterval(B),
                  3 == ++n ? r(10) : 40 === n ? r(50) : 100 === n && r(500);
              }, o));
          };
        r(1);
      },
      getImage: function (n, i) {
        var r = 0,
          o = t.st.image,
          a = function () {
            n &&
              (n.img.off(".mfploader"),
              n === t.currItem &&
                (t._onImageHasSize(n),
                t.updateStatus("error", o.tError.replace("%url%", n.src))),
              (n.hasSize = !0),
              (n.loaded = !0),
              (n.loadError = !0));
          },
          s = function () {
            n &&
              (n.img[0].complete
                ? (n.img.off(".mfploader"),
                  n === t.currItem &&
                    (t._onImageHasSize(n), t.updateStatus("ready")),
                  (n.hasSize = !0),
                  (n.loaded = !0),
                  w("ImageLoadComplete"))
                : ++r < 200
                ? setTimeout(s, 100)
                : a());
          },
          l = i.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          (c.className = "mfp-img"),
            n.el &&
              n.el.find("img").length &&
              (c.alt = n.el.find("img").attr("alt")),
            (n.img = e(c).on("load.mfploader", s).on("error.mfploader", a)),
            (c.src = n.src),
            l.is("img") && (n.img = n.img.clone()),
            (c = n.img[0]).naturalWidth > 0
              ? (n.hasSize = !0)
              : c.width || (n.hasSize = !1);
        }
        return (t._parseMarkup(i, { title: H(n), img_replaceWith: n.img }, n),
        t.resizeImage(),
        n.hasSize)
          ? (B && clearInterval(B),
            n.loadError
              ? (i.addClass("mfp-loading"),
                t.updateStatus("error", o.tError.replace("%url%", n.src)))
              : (i.removeClass("mfp-loading"), t.updateStatus("ready")),
            i)
          : (t.updateStatus("loading"),
            (n.loading = !0),
            n.hasSize ||
              ((n.imgHidden = !0),
              i.addClass("mfp-loading"),
              t.findImageSize(n)),
            i);
      },
    },
  }),
    e.magnificPopup.registerModule("zoom", {
      options: {
        enabled: !1,
        easing: "ease-in-out",
        duration: 300,
        opener: function (e) {
          return e.is("img") ? e : e.find("img");
        },
      },
      proto: {
        initZoom: function () {
          var e,
            n = t.st.zoom,
            i = ".zoom";
          if (n.enabled && t.supportsTransition) {
            var r,
              o,
              a = n.duration,
              c = function (e) {
                var t = e
                    .clone()
                    .removeAttr("style")
                    .removeAttr("class")
                    .addClass("mfp-animated-image"),
                  i = "all " + n.duration / 1e3 + "s " + n.easing,
                  r = {
                    position: "fixed",
                    zIndex: 9999,
                    left: 0,
                    top: 0,
                    "-webkit-backface-visibility": "hidden",
                  },
                  o = "transition";
                return (
                  (r["-webkit-" + o] =
                    r["-moz-" + o] =
                    r["-o-" + o] =
                    r[o] =
                      i),
                  t.css(r),
                  t
                );
              },
              p = function () {
                t.content.css("visibility", "visible");
              };
            y("BuildControls" + i, function () {
              if (t._allowZoom()) {
                if (
                  (clearTimeout(r),
                  t.content.css("visibility", "hidden"),
                  !(e = t._getItemToZoom()))
                ) {
                  p();
                  return;
                }
                (o = c(e)).css(t._getOffset()),
                  t.wrap.append(o),
                  (r = setTimeout(function () {
                    o.css(t._getOffset(!0)),
                      (r = setTimeout(function () {
                        p(),
                          setTimeout(function () {
                            o.remove(), (e = o = null), w("ZoomAnimationEnded");
                          }, 16);
                      }, a));
                  }, 16));
              }
            }),
              y(l + i, function () {
                if (t._allowZoom()) {
                  if ((clearTimeout(r), (t.st.removalDelay = a), !e)) {
                    if (!(e = t._getItemToZoom())) return;
                    o = c(e);
                  }
                  o.css(t._getOffset(!0)),
                    t.wrap.append(o),
                    t.content.css("visibility", "hidden"),
                    setTimeout(function () {
                      o.css(t._getOffset());
                    }, 16);
                }
              }),
              y(s + i, function () {
                t._allowZoom() && (p(), o && o.remove(), (e = null));
              });
          }
        },
        _allowZoom: function () {
          return "image" === t.currItem.type;
        },
        _getItemToZoom: function () {
          return !!t.currItem.hasSize && t.currItem.img;
        },
        _getOffset: function (n) {
          var i,
            r = (i = n
              ? t.currItem.img
              : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
            o = parseInt(i.css("padding-top"), 10),
            a = parseInt(i.css("padding-bottom"), 10);
          r.top -= e(window).scrollTop() - o;
          var s = {
            width: i.width(),
            height: (h ? i.innerHeight() : i[0].offsetHeight) - a - o,
          };
          return (
            (void 0 === L &&
              (L = void 0 !== document.createElement("p").style.MozTransform),
            L)
              ? (s["-moz-transform"] = s.transform =
                  "translate(" + r.left + "px," + r.top + "px)")
              : ((s.left = r.left), (s.top = r.top)),
            s
          );
        },
      },
    });
  var A = "iframe",
    F = function (e) {
      if (t.currTemplate[A]) {
        var n = t.currTemplate[A].find("iframe");
        n.length &&
          (e || (n[0].src = "//about:blank"),
          t.isIE8 && n.css("display", e ? "block" : "none"));
      }
    };
  e.magnificPopup.registerModule(A, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        t.types.push(A),
          y("BeforeChange", function (e, t, n) {
            t !== n && (t === A ? F() : n === A && F(!0));
          }),
          y(s + "." + A, function () {
            F();
          });
      },
      getIframe: function (n, i) {
        var r = n.src,
          o = t.st.iframe;
        e.each(o.patterns, function () {
          if (r.indexOf(this.index) > -1)
            return (
              this.id &&
                (r =
                  "string" == typeof this.id
                    ? r.substr(
                        r.lastIndexOf(this.id) + this.id.length,
                        r.length
                      )
                    : this.id.call(this, r)),
              (r = this.src.replace("%id%", r)),
              !1
            );
        });
        var a = {};
        return (
          o.srcAction && (a[o.srcAction] = r),
          t._parseMarkup(i, a, n),
          t.updateStatus("ready"),
          i
        );
      },
    },
  });
  var j = function (e) {
      var n = t.items.length;
      return e > n - 1 ? e - n : e < 0 ? n + e : e;
    },
    N = function (e, t, n) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
      langDir: null,
      loop: !0,
    },
    proto: {
      initGallery: function () {
        var n = t.st.gallery,
          r = ".mfp-gallery";
        if (((t.direction = !0), !n || !n.enabled)) return !1;
        n.langDir || (n.langDir = document.dir || "ltr"),
          (o += " mfp-gallery"),
          y(p + r, function () {
            n.navigateByImgClick &&
              t.wrap.on("click" + r, ".mfp-img", function () {
                if (t.items.length > 1) return t.next(), !1;
              }),
              i.on("keydown" + r, function (e) {
                37 === e.keyCode
                  ? "rtl" === n.langDir
                    ? t.next()
                    : t.prev()
                  : 39 === e.keyCode &&
                    ("rtl" === n.langDir ? t.prev() : t.next());
              }),
              t.updateGalleryButtons();
          }),
          y("UpdateStatus" + r, function () {
            t.updateGalleryButtons();
          }),
          y("UpdateStatus" + r, function (e, n) {
            n.text && (n.text = N(n.text, t.currItem.index, t.items.length));
          }),
          y(c + r, function (e, i, r, o) {
            var a = t.items.length;
            r.counter = a > 1 ? N(n.tCounter, o.index, a) : "";
          }),
          y("BuildControls" + r, function () {
            if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
              "rtl" === n.langDir
                ? ((i = n.tNext), (r = n.tPrev), (o = "next"), (a = "prev"))
                : ((i = n.tPrev), (r = n.tNext), (o = "prev"), (a = "next"));
              var i,
                r,
                o,
                a,
                s = n.arrowMarkup,
                l = (t.arrowLeft = e(
                  s
                    .replace(/%title%/gi, i)
                    .replace(/%action%/gi, o)
                    .replace(/%dir%/gi, "left")
                ).addClass(g)),
                c = (t.arrowRight = e(
                  s
                    .replace(/%title%/gi, r)
                    .replace(/%action%/gi, a)
                    .replace(/%dir%/gi, "right")
                ).addClass(g));
              "rtl" === n.langDir
                ? ((t.arrowNext = l), (t.arrowPrev = c))
                : ((t.arrowNext = c), (t.arrowPrev = l)),
                l.on("click", function () {
                  "rtl" === n.langDir ? t.next() : t.prev();
                }),
                c.on("click", function () {
                  "rtl" === n.langDir ? t.prev() : t.next();
                }),
                t.container.append(l.add(c));
            }
          }),
          y(d + r, function () {
            t._preloadTimeout && clearTimeout(t._preloadTimeout),
              (t._preloadTimeout = setTimeout(function () {
                t.preloadNearbyImages(), (t._preloadTimeout = null);
              }, 16));
          }),
          y(s + r, function () {
            i.off(r),
              t.wrap.off("click" + r),
              (t.arrowRight = t.arrowLeft = null);
          });
      },
      next: function () {
        var e = j(t.index + 1);
        if (!t.st.gallery.loop && 0 === e) return !1;
        (t.direction = !0), (t.index = e), t.updateItemHTML();
      },
      prev: function () {
        var e = t.index - 1;
        if (!t.st.gallery.loop && e < 0) return !1;
        (t.direction = !1), (t.index = j(e)), t.updateItemHTML();
      },
      goTo: function (e) {
        (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var e,
          n = t.st.gallery.preload,
          i = Math.min(n[0], t.items.length),
          r = Math.min(n[1], t.items.length);
        for (e = 1; e <= (t.direction ? r : i); e++)
          t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? i : r); e++)
          t._preloadItem(t.index - e);
      },
      _preloadItem: function (n) {
        if (((n = j(n)), !t.items[n].preloaded)) {
          var i = t.items[n];
          i.parsed || (i = t.parseEl(n)),
            w("LazyLoad", i),
            "image" === i.type &&
              (i.img = e('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  i.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (i.hasSize = !0), (i.loadError = !0), w("LazyLoadError", i);
                })
                .attr("src", i.src)),
            (i.preloaded = !0);
        }
      },
      updateGalleryButtons: function () {
        t.st.gallery.loop ||
          "object" != typeof t.arrowPrev ||
          null === t.arrowPrev ||
          (0 === t.index ? t.arrowPrev.hide() : t.arrowPrev.show(),
          t.index === t.items.length - 1
            ? t.arrowNext.hide()
            : t.arrowNext.show());
      },
    },
  });
  var D = "retina";
  e.magnificPopup.registerModule(D, {
    options: {
      replaceSrc: function (e) {
        return e.src.replace(/\.\w+$/, function (e) {
          return "@2x" + e;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina,
            n = e.ratio;
          (n = isNaN(n) ? n() : n) > 1 &&
            (y("ImageHasSize." + D, function (e, t) {
              t.img.css({
                "max-width": t.img[0].naturalWidth / n,
                width: "100%",
              });
            }),
            y("ElementParse." + D, function (t, i) {
              i.src = e.replaceSrc(i, n);
            }));
        }
      },
    },
  }),
    x();
});
