jQuery(function (e) {
  class t {
    constructor() {
      (this.observer = new IntersectionObserver(
        (e) => this.handleIntersection(e),
        { threshold: 0.1 }
      )),
        this.initializeAnimations();
    }
    initializeAnimations() {
      let e = window?.et_animation_data ?? [];
      setTimeout(() => {
        e.forEach((e) => {
          let t = document.querySelector("." + e.class);
          if (t) {
            let a = t.getBoundingClientRect(),
              i =
                a.top >= 0 &&
                a.top <=
                  (window.innerHeight || document.documentElement.clientHeight);
            i || this.observer.observe(t);
          }
        });
      }, 100);
    }
    handleIntersection(t) {
      t.forEach((t) => {
        if (t.isIntersecting && window?.et_animate_element) {
          let a = e(t.target);
          window.et_animate_element(a), this.observer.unobserve(t.target);
        }
      });
    }
  }
  e(document).ready(function () {
    new t();
    let e = document.querySelectorAll(".dsm-filterable-gallery-container");
    e.forEach((e, t) => {
      let a = e.dataset.use_lightbox,
        i = e.querySelector(".dsm-filterable-gallery-inner-container");
      "on" === a &&
        jQuery(i).magnificPopup({
          delegate: ".dsm-filterable-gallery-item",
          type: "image",
          tLoading: "Loading image ",
          gallery: { enabled: !0, navigateByImgClick: !0, preload: [0, 1] },
          image: {
            titleSrc: function (e) {
              let t = e.el[0].dataset.lightbox_title,
                a = e.el[0].dataset.lightbox_caption,
                i = e.el[0].dataset.lightbox_description,
                n = "";
              return (
                (n +=
                  void 0 === t || "" === t
                    ? ""
                    : t.replace(/[^]/g, function (e) {
                        return "&#" + e.charCodeAt(0) + ";";
                      })),
                (n +=
                  void 0 === a || "" === a
                    ? ""
                    : "<small class='dsm-filterable-image-caption'>" +
                      a.replace(/[^]/g, function (e) {
                        return "&#" + e.charCodeAt(0) + ";";
                      }) +
                      "</small>"),
                (n +=
                  void 0 === i || "" === i
                    ? ""
                    : "<small class='dsm-filterableimage-description'>" +
                      i.replace(/[^]/g, function (e) {
                        return "&#" + e.charCodeAt(0) + ";";
                      }) +
                      "</small>")
              );
            },
          },
          allowHTMLInTemplate: !0,
        });
    }),
      e.forEach((e) => {
        let t = e.querySelector(".dsm-filterable-gallery-inner-container"),
          a = e.querySelector(".dsm-gallery-loadmore-container"),
          i = e.querySelector(".dsm-gallery-number-pagination-container"),
          n = e.querySelectorAll(".dsm-filterable-gallery-filter-item"),
          r = Number(e.dataset.per_page),
          l = "on" === e.dataset.showpagination,
          s = e.dataset.paginationtype,
          d = Number(e.dataset.speed),
          o = i && "on" === i.dataset.tidyPagination,
          c = new Shuffle(t, {
            itemSelector: ".dsm-filterable-gallery-item",
            delimiter: ",",
            speed: d,
            buffer: 1,
          }),
          g = new IntersectionObserver((e) => {
            e[0].intersectionRatio >= 0.5 && c.update(),
              e[0].isIntersecting && c.update();
          });
        function p() {
          let t = Number(e.dataset.currentpage),
            a = Number(e.dataset.totalpages);
          if (!i) return;
          i.innerHTML = "";
          let n = document.createElement("span");
          n.classList.add("dsm-gallery-number-pagination"),
            n.setAttribute("data-pagination", "prev"),
            (n.innerHTML = i.getAttribute("data-pagination-prev-text"));
          let r = document.createElement("span");
          if (
            (r.classList.add("dsm-gallery-previous-dot"),
            (r.innerHTML = "..."),
            i.appendChild(n),
            o && t > 5 && i.appendChild(r),
            a > 5 && o)
          ) {
            let l = Array(a)
                .fill(0)
                .map((e, t) => t + 1),
              s = t >= 5 ? l.slice(t - 3, t + 2) : [1, 2, 3, 4, 5];
            s.map((e) => {
              let t = document.createElement("span");
              (t.innerHTML = e),
                t.classList.add("dsm-gallery-number-pagination"),
                t.setAttribute("data-pagination", e),
                i.appendChild(t);
            });
          } else
            Array(a)
              .fill(0)
              .map((e, t) => {
                let a = t + 1,
                  n = document.createElement("span");
                (n.innerHTML = a),
                  n.classList.add("dsm-gallery-number-pagination"),
                  n.setAttribute("data-pagination", a),
                  i.appendChild(n);
              });
          let d = document.createElement("span");
          d.classList.add("dsm-gallery-number-pagination"),
            d.setAttribute("data-pagination", "next"),
            (d.innerHTML = i.getAttribute("data-pagination-next-text"));
          let c = document.createElement("span");
          c.classList.add("dsm-gallery-next-dot"),
            (c.innerHTML = "..."),
            o && t > 5 && i.appendChild(c),
            i.appendChild(d),
            (function t() {
              if (!i) return;
              let a = i.querySelectorAll(".dsm-gallery-number-pagination"),
                n = Number(e.dataset.currentpage) > 1,
                r = "true" === e.dataset.hasnextpage;
              a.forEach((t) => {
                isNaN(t.dataset.pagination) ||
                  r ||
                  n ||
                  (t.style.display = "none"),
                  Number(e.dataset.currentpage) ===
                    Number(t.dataset.pagination) &&
                    t.classList.add("dsm-active-pagination-item"),
                  t.addEventListener("click", () => {
                    (r = "true" === e.dataset.hasnextpage),
                      a.forEach((e) =>
                        e.classList.remove("dsm-active-pagination-item")
                      );
                    let i = Number(e.dataset.currentpage),
                      l = t.dataset.pagination,
                      s = u();
                    switch (((n = i > 1), l)) {
                      case "next":
                        {
                          if (!r) return;
                          let d = i + 1;
                          a.forEach((e) => {
                            let t = e.dataset.pagination;
                            d === Number(t) &&
                              e.classList.add("dsm-active-pagination-item");
                          }),
                            e.setAttribute("data-currentpage", d),
                            f(s, d);
                        }
                        break;
                      case "prev":
                        {
                          if (!n) return;
                          let o = i - 1;
                          a.forEach((e) => {
                            let t = e.dataset.pagination;
                            o === Number(t) &&
                              e.classList.add("dsm-active-pagination-item");
                          }),
                            e.setAttribute("data-currentpage", o),
                            f(s, o);
                        }
                        break;
                      default:
                        t.classList.add("dsm-active-pagination-item"),
                          e.setAttribute("data-currentpage", l),
                          f(s, Number(l));
                    }
                  });
              });
            })();
        }
        function u() {
          let e = Array.from(n).find((e) =>
            e.classList.contains("dsm-active-filter")
          );
          return e &&
            e.hasAttribute("data-category") &&
            "undefined" !== e.dataset.category
            ? e.dataset.category
            : "all";
        }
        function m(t) {
          let a = e.querySelectorAll(".dsm-filterable-gallery-item"),
            i = Array.from(a).filter((e) =>
              e.dataset.groups.split(",").includes(t)
            ),
            n = l ? r : i.length,
            s = (function e(t, a) {
              for (var i = [], n = 0, r = t.length; n < r; )
                i.push(t.slice(n, (n += a)));
              return i;
            })(i, n);
          a.forEach((e) => {
            e.setAttribute("data-inpage", "-1");
          }),
            s.forEach((e, t) => {
              let a = t + 1;
              e.forEach((e) => {
                e.setAttribute("data-inpage", a.toString());
              });
            }),
            e.setAttribute("data-totalPages", s.length);
          let d = e.querySelectorAll(".dsm-filterable-gallery-item"),
            c = Array.from(d).filter((a) => {
              let i = Number(a.dataset.inpage),
                n = a.dataset.groups.split(",").includes(t),
                r = Number(e.dataset.currentpage) + 1;
              return i === r && n;
            }),
            g = Array.from(d).filter((a) => {
              let i = Number(a.dataset.inpage),
                n = a.dataset.groups.split(",").includes(t),
                r = Number(e.dataset.currentpage) - 1;
              return i === r && n;
            }),
            u = c.length > 0,
            m = g.length > 0;
          e.setAttribute("data-hasnextpage", String(u)),
            e.setAttribute("data-hasPrevpage", String(m)),
            o && p();
        }
        function f(t, a = e.dataset.currentpage) {
          var i;
          (a = Number(e.dataset.currentpage)),
            c.filter((e) => {
              let i = Number(e.dataset.inpage),
                n = e.dataset.groups,
                r = ("number" === s ? i === a : i <= a) && -1 !== i,
                l = n.split(",").includes(t);
              return l && r;
            }),
            (i = t),
            n.forEach((e) => {
              let t = e.dataset.category;
              i === t
                ? e.classList.add("dsm-active-filter")
                : e.classList.remove("dsm-active-filter");
            }),
            m(t);
        }
        g.observe(t),
          n.forEach((t) => {
            t.addEventListener("click", () => {
              let a = t.dataset.category;
              m(a), e.setAttribute("data-currentpage", "1"), f(a), i && p();
            });
          }),
          a &&
            a.addEventListener("click", () =>
              (function t() {
                let a = Number(e.dataset.currentpage),
                  i = a + 1,
                  n = u();
                e.setAttribute("data-currentpage", i.toString()), m(n), f(n, i);
              })()
            );
        let h = void 0 !== n[0] ? n[0].dataset.category : "all";
        m(h), f(h), p();
      });
  });
});
