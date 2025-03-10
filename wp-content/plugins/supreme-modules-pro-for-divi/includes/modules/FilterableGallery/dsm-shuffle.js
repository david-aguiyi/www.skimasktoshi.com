function ownKeys(t, e) {
  var i = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(t);
    e &&
      (s = s.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })),
      i.push.apply(i, s);
  }
  return i;
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = null !== arguments[e] ? arguments[e] : {};
    e % 2
      ? ownKeys(Object(i), !0).forEach(function (e) {
          _defineProperty(t, e, i[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
      : ownKeys(Object(i)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
        });
  }
  return t;
}
function _defineProperty(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = i),
    t
  );
}
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).Shuffle =
        e());
})(void 0, function () {
  "use strict";
  var t = { exports: {} };
  function e() {}
  function i() {}
  function s(t) {
    return parseFloat(t) || 0;
  }
  (e.prototype = {
    on: function (t, e, i) {
      var s = this.e || (this.e = {});
      return (s[t] || (s[t] = [])).push({ fn: e, ctx: i }), this;
    },
    once: function (t, e, i) {
      var s = this;
      function n() {
        s.off(t, n), e.apply(i, arguments);
      }
      return (n._ = e), this.on(t, n, i);
    },
    emit: function (t) {
      for (
        var e = [].slice.call(arguments, 1),
          i = ((this.e || (this.e = {}))[t] || []).slice(),
          s = 0,
          n = i.length;
        s < n;
        s++
      )
        i[s].fn.apply(i[s].ctx, e);
      return this;
    },
    off: function (t, e) {
      var i = this.e || (this.e = {}),
        s = i[t],
        n = [];
      if (s && e)
        for (var o = 0, r = s.length; o < r; o++)
          s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]);
      return n.length ? (i[t] = n) : delete i[t], this;
    },
  }),
    (t.exports = e),
    (t.exports.TinyEmitter = e);
  class n {
    constructor(t, e) {
      (this.x = s(t)), (this.y = s(e));
    }
    static equals(t, e) {
      return t.x === e.x && t.y === e.y;
    }
  }
  class o {
    constructor(t, e, i, s, n) {
      (this.id = n),
        (this.left = t),
        (this.top = e),
        (this.width = i),
        (this.height = s);
    }
    static intersects(t, e) {
      return (
        t.left < e.left + e.width &&
        e.left < t.left + t.width &&
        t.top < e.top + e.height &&
        e.top < t.top + t.height
      );
    }
  }
  var r = {
    BASE: "shuffle",
    SHUFFLE_ITEM: "shuffle-item",
    VISIBLE: "shuffle-item--visible",
    HIDDEN: "shuffle-item--hidden",
  };
  let l = 0;
  class h {
    constructor(t, e) {
      (l += 1),
        (this.id = l),
        (this.element = t),
        (this.isRTL = e),
        (this.isVisible = !0),
        (this.isHidden = !1);
    }
    show() {
      (this.isVisible = !0),
        this.element.classList.remove(r.HIDDEN),
        this.element.classList.add(r.VISIBLE),
        this.element.removeAttribute("aria-hidden");
    }
    hide() {
      (this.isVisible = !1),
        this.element.classList.remove(r.VISIBLE),
        this.element.classList.add(r.HIDDEN),
        this.element.setAttribute("aria-hidden", !0);
    }
    init() {
      this.addClasses([r.SHUFFLE_ITEM, r.VISIBLE]),
        this.applyCss(h.Css.INITIAL),
        this.applyCss(this.isRTL ? h.Css.DIRECTION.rtl : h.Css.DIRECTION.ltr),
        (this.scale = h.Scale.VISIBLE),
        (this.point = new n());
    }
    addClasses(t) {
      t.forEach((t) => {
        this.element.classList.add(t);
      });
    }
    removeClasses(t) {
      t.forEach((t) => {
        this.element.classList.remove(t);
      });
    }
    applyCss(t) {
      Object.keys(t).forEach((e) => {
        this.element.style[e] = t[e];
      });
    }
    dispose() {
      this.removeClasses([r.HIDDEN, r.VISIBLE, r.SHUFFLE_ITEM]),
        this.element.removeAttribute("style"),
        (this.element = null);
    }
  }
  (h.Css = {
    INITIAL: {
      position: "absolute",
      top: 0,
      visibility: "visible",
      willChange: "transform",
    },
    DIRECTION: { ltr: { left: 0 }, rtl: { right: 0 } },
    VISIBLE: {
      before: { opacity: 1, visibility: "visible" },
      after: { transitionDelay: "" },
    },
    HIDDEN: {
      before: { opacity: 0 },
      after: { visibility: "hidden", transitionDelay: "" },
    },
  }),
    (h.Scale = { VISIBLE: 1, HIDDEN: 0.001 });
  let a = null;
  var u = () => {
    if (null !== a) return a;
    let t = document.body || document.documentElement,
      e = document.createElement("div");
    (e.style.cssText = "width:10px;padding:2px;box-sizing:border-box;"),
      t.appendChild(e);
    let { width: i } = window.getComputedStyle(e, null);
    return (a = 10 === Math.round(s(i))), t.removeChild(e), a;
  };
  function d(t, e) {
    let i =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : window.getComputedStyle(t, null),
      n = s(i[e]);
    return (
      u() || "width" !== e
        ? u() ||
          "height" !== e ||
          (n +=
            s(i.paddingTop) +
            s(i.paddingBottom) +
            s(i.borderTopWidth) +
            s(i.borderBottomWidth))
        : (n +=
            s(i.paddingLeft) +
            s(i.paddingRight) +
            s(i.borderLeftWidth) +
            s(i.borderRightWidth)),
      n
    );
  }
  let m = {
    reverse: !1,
    by: null,
    compare: null,
    randomize: !1,
    key: "element",
  };
  function p(t, e) {
    let i = _objectSpread(_objectSpread({}, m), e),
      s = Array.from(t),
      n = !1;
    return t.length
      ? i.randomize
        ? (function (t) {
            let e = t.length;
            for (; e; ) {
              e -= 1;
              let i = Math.floor(Math.random() * (e + 1)),
                s = t[i];
              (t[i] = t[e]), (t[e] = s);
            }
            return t;
          })(t)
        : ("function" == typeof i.by
            ? t.sort((t, e) => {
                if (n) return 0;
                let s = i.by(t[i.key]),
                  o = i.by(e[i.key]);
                return void 0 === s && void 0 === o
                  ? ((n = !0), 0)
                  : s < o || "sortFirst" === s || "sortLast" === o
                  ? -1
                  : s > o || "sortLast" === s || "sortFirst" === o
                  ? 1
                  : 0;
              })
            : "function" == typeof i.compare && t.sort(i.compare),
          n ? s : (i.reverse && t.reverse(), t))
      : [];
  }
  let f = {},
    c = "transitionend",
    g = 0;
  function y(t) {
    return (
      !!f[t] &&
      (f[t].element.removeEventListener(c, f[t].listener), (f[t] = null), !0)
    );
  }
  function I(t) {
    return Math.max(...t);
  }
  function $(t, e, i, s) {
    let n = t / e;
    return (
      Math.abs(Math.round(n) - n) < s && (n = Math.round(n)),
      Math.min(Math.ceil(n), i)
    );
  }
  function E(t, e, i) {
    if (1 === e) return t;
    let s = [];
    for (let n = 0; n <= i - e; n++) s.push(I(t.slice(n, n + e)));
    return s;
  }
  function v(t, e) {
    var i;
    let s = Math.min(...(i = t));
    for (let n = 0, o = t.length; n < o; n++)
      if (t[n] >= s - e && t[n] <= s + e) return n;
    return 0;
  }
  function b(t, e) {
    let i = {};
    t.forEach((t) => {
      i[t.top] ? i[t.top].push(t) : (i[t.top] = [t]);
    });
    let s = [],
      r = [],
      l = [];
    return (
      Object.keys(i).forEach((t) => {
        let n = i[t];
        r.push(n);
        let h = n[n.length - 1],
          a = h.left + h.width,
          u = Math.round((e - a) / 2),
          d = n,
          m = !1;
        if (u > 0) {
          let p = [];
          (m = n.every((t) => {
            let e = new o(t.left + u, t.top, t.width, t.height, t.id),
              i = !s.some((t) => o.intersects(e, t));
            return p.push(e), i;
          })) && (d = p);
        }
        if (!m) {
          let f;
          if (
            n.some((t) =>
              s.some((e) => {
                let i = o.intersects(t, e);
                return i && (f = e), i;
              })
            )
          ) {
            let c = l.findIndex((t) => t.includes(f));
            l.splice(c, 1, r[c]);
          }
        }
        (s = s.concat(d)), l.push(d);
      }),
      l
        .flat()
        .sort((t, e) => t.id - e.id)
        .map((t) => new n(t.left, t.top))
    );
  }
  function S(t) {
    return Array.from(new Set(t));
  }
  let T = 0;
  class C extends t.exports {
    constructor(t) {
      let e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      super(),
        (this.options = _objectSpread(_objectSpread({}, C.options), e)),
        (this.lastSort = {}),
        (this.group = C.ALL_ITEMS),
        (this.lastFilter = C.ALL_ITEMS),
        (this.isEnabled = !0),
        (this.isDestroyed = !1),
        (this.isInitialized = !1),
        (this._transitions = []),
        (this.isTransitioning = !1),
        (this._queue = []);
      let i = this._getElementOption(t);
      if (!i)
        throw TypeError("Shuffle needs to be initialized with an element.");
      (this.element = i),
        (this.id = `shuffle_${T}`),
        (T += 1),
        this._init(),
        (this.isInitialized = !0);
    }
    _init() {
      if (
        ((this.items = this._getItems()),
        (this.sortedItems = this.items),
        (this.options.sizer = this._getElementOption(this.options.sizer)),
        this.element.classList.add(C.Classes.BASE),
        this._initItems(this.items),
        "complete" !== document.readyState)
      ) {
        let t = this.layout.bind(this);
        window.addEventListener("load", function e() {
          window.removeEventListener("load", e), t();
        });
      }
      let e = window.getComputedStyle(this.element, null),
        i = C.getSize(this.element).width;
      this._validateStyles(e),
        this._setColumns(i),
        this.filter(this.options.group, this.options.initialSort),
        (this._rafId = null),
        "ResizeObserver" in window &&
          ((this._resizeObserver = new ResizeObserver(
            this._handleResizeCallback.bind(this)
          )),
          this._resizeObserver.observe(this.element)),
        this.element.offsetWidth,
        this.setItemTransitions(this.items),
        (this.element.style.transition = `height ${this.options.speed}ms ${this.options.easing}`);
    }
    _getElementOption(t) {
      return "string" == typeof t
        ? this.element.querySelector(t)
        : t && t.nodeType && 1 === t.nodeType
        ? t
        : t && t.jquery
        ? t[0]
        : null;
    }
    _validateStyles(t) {
      "static" === t.position && (this.element.style.position = "relative"),
        "hidden" !== t.overflow && (this.element.style.overflow = "hidden");
    }
    _filter() {
      let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : this.lastFilter,
        e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.items,
        i = this._getFilteredSets(t, e);
      return (
        this._toggleFilterClasses(i),
        (this.lastFilter = t),
        "string" == typeof t && (this.group = t),
        i
      );
    }
    _getFilteredSets(t, e) {
      let i = [],
        s = [];
      return (
        t === C.ALL_ITEMS
          ? (i = e)
          : e.forEach((e) => {
              this._doesPassFilter(t, e.element) ? i.push(e) : s.push(e);
            }),
        { visible: i, hidden: s }
      );
    }
    _doesPassFilter(t, e) {
      if ("function" == typeof t) return t.call(e, e, this);
      let i = e.dataset[C.FILTER_ATTRIBUTE_KEY],
        s = this.options.delimiter
          ? i.split(this.options.delimiter)
          : JSON.parse(i);
      function n(t) {
        return s.includes(t);
      }
      return Array.isArray(t)
        ? this.options.filterMode === C.FilterMode.ANY
          ? t.some(n)
          : t.every(n)
        : s.includes(t);
    }
    _toggleFilterClasses(t) {
      let { visible: e, hidden: i } = t;
      e.forEach((t) => {
        t.show();
      }),
        i.forEach((t) => {
          t.hide();
        });
    }
    _initItems(t) {
      t.forEach((t) => {
        t.init();
      });
    }
    _disposeItems(t) {
      t.forEach((t) => {
        t.dispose();
      });
    }
    _updateItemCount() {
      this.visibleItems = this._getFilteredItems().length;
    }
    setItemTransitions(t) {
      let { speed: e, easing: i } = this.options,
        s = this.options.useTransforms ? ["transform"] : ["top", "left"],
        n = Object.keys(h.Css.HIDDEN.before).map((t) =>
          t.replace(/([A-Z])/g, (t, e) => `-${e.toLowerCase()}`)
        ),
        o = s.concat(n).join();
      t.forEach((t) => {
        (t.element.style.transitionDuration = `${e}ms`),
          (t.element.style.transitionTimingFunction = i),
          (t.element.style.transitionProperty = o);
      });
    }
    _getItems() {
      return Array.from(this.element.children)
        .filter((t) => t.matches(this.options.itemSelector))
        .map((t) => new h(t, this.options.isRTL));
    }
    _mergeNewItems(t) {
      let e = Array.from(this.element.children);
      return p(this.items.concat(t), { by: (t) => e.indexOf(t) });
    }
    _getFilteredItems() {
      return this.items.filter((t) => t.isVisible);
    }
    _getConcealedItems() {
      return this.items.filter((t) => !t.isVisible);
    }
    _getColumnSize(t, e) {
      let i;
      return (
        0 ===
          (i =
            "function" == typeof this.options.columnWidth
              ? this.options.columnWidth(t)
              : this.options.sizer
              ? C.getSize(this.options.sizer).width
              : this.options.columnWidth
              ? this.options.columnWidth
              : this.items.length > 0
              ? C.getSize(this.items[0].element, !0).width
              : t) && (i = t),
        i + e
      );
    }
    _getGutterSize(t) {
      return "function" == typeof this.options.gutterWidth
        ? this.options.gutterWidth(t)
        : this.options.sizer
        ? d(this.options.sizer, "marginLeft")
        : this.options.gutterWidth;
    }
    _setColumns() {
      let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : C.getSize(this.element).width,
        e = this._getGutterSize(t),
        i = this._getColumnSize(t, e),
        s = (t + e) / i;
      Math.abs(Math.round(s) - s) < this.options.columnThreshold &&
        (s = Math.round(s)),
        (this.cols = Math.max(Math.floor(s || 0), 1)),
        (this.containerWidth = t),
        (this.colWidth = i);
    }
    _setContainerSize() {
      this.element.style.height = `${this._getContainerSize()}px`;
    }
    _getContainerSize() {
      return I(this.positions);
    }
    _getStaggerAmount(t) {
      return Math.min(
        t * this.options.staggerAmount,
        this.options.staggerAmountMax
      );
    }
    _dispatch(t) {
      let e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      this.isDestroyed || ((e.shuffle = this), this.emit(t, e));
    }
    _resetCols() {
      let t = this.cols;
      for (this.positions = []; t; ) (t -= 1), this.positions.push(0);
    }
    _layout(t) {
      let e = this._getNextPositions(t),
        i = 0;
      t.forEach((t, s) => {
        function o() {
          t.applyCss(h.Css.VISIBLE.after);
        }
        if (n.equals(t.point, e[s]) && !t.isHidden)
          return t.applyCss(h.Css.VISIBLE.before), void o();
        (t.point = e[s]), (t.scale = h.Scale.VISIBLE), (t.isHidden = !1);
        let r = this.getStylesForTransition(t, h.Css.VISIBLE.before);
        (r.transitionDelay = `${this._getStaggerAmount(i)}ms`),
          this._queue.push({ item: t, styles: r, callback: o }),
          (i += 1);
      });
    }
    _getNextPositions(t) {
      if (this.options.isCentered) {
        let e = t.map((t, e) => {
          let i = C.getSize(t.element, !0),
            s = this._getItemPosition(i);
          return new o(s.x, s.y, i.width, i.height, e);
        });
        return this.getTransformedPositions(e, this.containerWidth);
      }
      return t.map((t) => this._getItemPosition(C.getSize(t.element, !0)));
    }
    _getItemPosition(t) {
      return (function (t) {
        let {
            itemSize: e,
            positions: i,
            gridSize: s,
            total: o,
            threshold: r,
            buffer: l,
          } = t,
          h = $(e.width, s, o, r),
          a = E(i, h, o),
          u = v(a, l),
          d = new n(s * u, a[u]),
          m = a[u] + e.height;
        for (let p = 0; p < h; p++) i[u + p] = m;
        return d;
      })({
        itemSize: t,
        positions: this.positions,
        gridSize: this.colWidth,
        total: this.cols,
        threshold: this.options.columnThreshold,
        buffer: this.options.buffer,
      });
    }
    getTransformedPositions(t, e) {
      return b(t, e);
    }
    _shrink() {
      let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : this._getConcealedItems(),
        e = 0;
      t.forEach((t) => {
        function i() {
          t.applyCss(h.Css.HIDDEN.after);
        }
        if (t.isHidden) return t.applyCss(h.Css.HIDDEN.before), void i();
        (t.scale = h.Scale.HIDDEN), (t.isHidden = !0);
        let s = this.getStylesForTransition(t, h.Css.HIDDEN.before);
        (s.transitionDelay = `${this._getStaggerAmount(e)}ms`),
          this._queue.push({ item: t, styles: s, callback: i }),
          (e += 1);
      });
    }
    _handleResizeCallback(t) {
      if (this.isEnabled && !this.isDestroyed)
        for (let e of t)
          Math.round(e.contentRect.width) !== Math.round(this.containerWidth) &&
            (cancelAnimationFrame(this._rafId),
            (this._rafId = requestAnimationFrame(this.update.bind(this))));
    }
    getStylesForTransition(t, e) {
      let i = _objectSpread({}, e);
      if (this.options.useTransforms) {
        let s = this.options.isRTL ? "-" : "",
          n = this.options.roundTransforms ? Math.round(t.point.x) : t.point.x,
          o = this.options.roundTransforms ? Math.round(t.point.y) : t.point.y;
        i.transform = `translate(${s}${n}px, ${o}px) scale(${t.scale})`;
      } else this.options.isRTL ? (i.right = `${t.point.x}px`) : (i.left = `${t.point.x}px`), (i.top = `${t.point.y}px`);
      return i;
    }
    _whenTransitionDone(t, e, i) {
      let s = (function t(e, i) {
        let s = c + (g += 1),
          n = (t) => {
            t.currentTarget === t.target && (y(s), i(t));
          };
        return (
          e.addEventListener(c, n), (f[s] = { element: e, listener: n }), s
        );
      })(t, (t) => {
        e(), i(null, t);
      });
      this._transitions.push(s);
    }
    _getTransitionFunction(t) {
      return (e) => {
        t.item.applyCss(t.styles),
          this._whenTransitionDone(t.item.element, t.callback, e);
      };
    }
    _processQueue() {
      this.isTransitioning && this._cancelMovement();
      let t = this.options.speed > 0,
        e = this._queue.length > 0;
      e && t && this.isInitialized
        ? this._startTransitions(this._queue)
        : (e && this._styleImmediately(this._queue),
          this._dispatch(C.EventType.LAYOUT)),
        (this._queue.length = 0);
    }
    _startTransitions(t) {
      (this.isTransitioning = !0),
        (function (t, e, s) {
          s || ("function" == typeof e ? ((s = e), (e = null)) : (s = i));
          var n = t && t.length;
          if (!n) return s(null, []);
          var o = !1,
            r = Array(n);
          function l(t) {
            return function (e, i) {
              if (!o) {
                if (e) return s(e, r), void (o = !0);
                (r[t] = i), --n || s(null, r);
              }
            };
          }
          t.forEach(
            e
              ? function (t, i) {
                  t.call(e, l(i));
                }
              : function (t, e) {
                  t(l(e));
                }
          );
        })(
          t.map((t) => this._getTransitionFunction(t)),
          this._movementFinished.bind(this)
        );
    }
    _cancelMovement() {
      this._transitions.forEach(y),
        (this._transitions.length = 0),
        (this.isTransitioning = !1);
    }
    _styleImmediately(t) {
      if (t.length) {
        let e = t.map((t) => t.item.element);
        C._skipTransitions(e, () => {
          t.forEach((t) => {
            t.item.applyCss(t.styles), t.callback();
          });
        });
      }
    }
    _movementFinished() {
      (this._transitions.length = 0),
        (this.isTransitioning = !1),
        this._dispatch(C.EventType.LAYOUT);
    }
    filter(t, e) {
      this.isEnabled &&
        ((!t || (t && 0 === t.length)) && (t = C.ALL_ITEMS),
        this._filter(t),
        this._shrink(),
        this._updateItemCount(),
        this.sort(e));
    }
    sort() {
      let t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : this.lastSort;
      if (!this.isEnabled) return;
      this._resetCols();
      let e = p(this._getFilteredItems(), t);
      (this.sortedItems = e),
        this._layout(e),
        this._processQueue(),
        this._setContainerSize(),
        (this.lastSort = t);
    }
    update() {
      let { recalculateSizes: t = !0, force: e = !1 } =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      (this.isEnabled || e) && (t && this._setColumns(), this.sort());
    }
    layout() {
      this.update({ recalculateSizes: !0 });
    }
    add(t) {
      let e = S(t).map((t) => new h(t, this.options.isRTL));
      this._initItems(e), this._resetCols();
      let i = p(this._mergeNewItems(e), this.lastSort),
        s = this._filter(this.lastFilter, i),
        n = (t) => e.includes(t),
        o = (t) => {
          (t.scale = h.Scale.HIDDEN),
            (t.isHidden = !0),
            t.applyCss(h.Css.HIDDEN.before),
            t.applyCss(h.Css.HIDDEN.after);
        },
        r = this._getNextPositions(s.visible);
      s.visible.forEach((t, e) => {
        n(t) &&
          ((t.point = r[e]),
          o(t),
          t.applyCss(this.getStylesForTransition(t, {})));
      }),
        s.hidden.forEach((t) => {
          n(t) && o(t);
        }),
        this.element.offsetWidth,
        this.setItemTransitions(e),
        (this.items = this._mergeNewItems(e)),
        this.filter(this.lastFilter);
    }
    disable() {
      this.isEnabled = !1;
    }
    enable() {
      let t =
        !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      (this.isEnabled = !0), t && this.update();
    }
    remove(t) {
      if (!t.length) return;
      let e = S(t),
        i = e.map((t) => this.getItemByElement(t)).filter((t) => !!t);
      this._toggleFilterClasses({ visible: [], hidden: i }),
        this._shrink(i),
        this.sort(),
        (this.items = this.items.filter((t) => !i.includes(t))),
        this._updateItemCount(),
        this.once(C.EventType.LAYOUT, () => {
          this._disposeItems(i),
            e.forEach((t) => {
              t.parentNode.removeChild(t);
            }),
            this._dispatch(C.EventType.REMOVED, { collection: e });
        });
    }
    getItemByElement(t) {
      return this.items.find((e) => e.element === t);
    }
    resetItems() {
      this._disposeItems(this.items),
        (this.isInitialized = !1),
        (this.items = this._getItems()),
        this._initItems(this.items),
        this.once(C.EventType.LAYOUT, () => {
          this.setItemTransitions(this.items), (this.isInitialized = !0);
        }),
        this.filter(this.lastFilter);
    }
    destroy() {
      this._cancelMovement(),
        this._resizeObserver &&
          (this._resizeObserver.unobserve(this.element),
          (this._resizeObserver = null)),
        this.element.classList.remove("shuffle"),
        this.element.removeAttribute("style"),
        this._disposeItems(this.items),
        (this.items.length = 0),
        (this.sortedItems.length = 0),
        (this._transitions.length = 0),
        (this.options.sizer = null),
        (this.element = null),
        (this.isDestroyed = !0),
        (this.isEnabled = !1);
    }
    static getSize(t) {
      let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        i = window.getComputedStyle(t, null),
        s = d(t, "width", i),
        n = d(t, "height", i);
      return (
        e &&
          ((s += d(t, "marginLeft", i) + d(t, "marginRight", i)),
          (n += d(t, "marginTop", i) + d(t, "marginBottom", i))),
        { width: s, height: n }
      );
    }
    static _skipTransitions(t, e) {
      let i = t.map((t) => {
        let { style: e } = t,
          i = e.transitionDuration,
          s = e.transitionDelay;
        return (
          (e.transitionDuration = "0ms"),
          (e.transitionDelay = "0ms"),
          { duration: i, delay: s }
        );
      });
      e(),
        t[0].offsetWidth,
        t.forEach((t, e) => {
          (t.style.transitionDuration = i[e].duration),
            (t.style.transitionDelay = i[e].delay);
        });
    }
  }
  return (
    (C.ShuffleItem = h),
    (C.ALL_ITEMS = "all"),
    (C.FILTER_ATTRIBUTE_KEY = "groups"),
    (C.EventType = { LAYOUT: "shuffle:layout", REMOVED: "shuffle:removed" }),
    (C.Classes = r),
    (C.FilterMode = { ANY: "any", ALL: "all" }),
    (C.options = {
      group: C.ALL_ITEMS,
      speed: 250,
      easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      itemSelector: "*",
      sizer: null,
      gutterWidth: 0,
      columnWidth: 0,
      delimiter: null,
      buffer: 0,
      columnThreshold: 0.01,
      initialSort: null,
      staggerAmount: 15,
      staggerAmountMax: 150,
      useTransforms: !0,
      filterMode: C.FilterMode.ANY,
      isCentered: !1,
      isRTL: !1,
      roundTransforms: !0,
    }),
    (C.Point = n),
    (C.Rect = o),
    (C.__sorter = p),
    (C.__getColumnSpan = $),
    (C.__getAvailablePositions = E),
    (C.__getShortColumn = v),
    (C.__getCenteredPositions = b),
    C
  );
});
