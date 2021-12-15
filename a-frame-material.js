// A-Frame Material Kit- radio buttons, rounded rectangles
// https://github.com/etiennepinchon/aframe-material

!(function(t) {
  function e(a) {
    if (i[a]) return i[a].exports;
    var o = (i[a] = { exports: {}, id: a, loaded: !1 });
    return t[a].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
  }
  var i = {};
  return (e.m = t), (e.c = i), (e.p = "/dist/"), e(0);
})([
  function(t, e, i) {
    t.exports = i(1);
  },
  function(t, e, i) {
    "use strict";
    !(function() {
      return AFRAME
        ? (AFRAME.ASSETS_PATH || (AFRAME.ASSETS_PATH = "./assets"),
          i(2),
          i(3),
          i(5),
          i(13),
          i(14),
          i(17),
          i(18),
          i(21),
          i(24),
          void i(27))
        : console.error("AFRAME is required!");
    })();
  },
  function(t, e) {
    !(function(t) {
      function e(a) {
        if (i[a]) return i[a].exports;
        var o = (i[a] = { exports: {}, id: a, loaded: !1 });
        return (
          t[a].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports
        );
      }
      var i = {};
      return (e.m = t), (e.c = i), (e.p = ""), e(0);
    })([
      function(t, e) {
        AFRAME.registerComponent("rounded", {
          schema: {
            enabled: { default: !0 },
            width: { type: "number", default: 1 },
            height: { type: "number", default: 1 },
            radius: { type: "number", default: 0.3 },
            topLeftRadius: { type: "number", default: -1 },
            topRightRadius: { type: "number", default: -1 },
            bottomLeftRadius: { type: "number", default: -1 },
            bottomRightRadius: { type: "number", default: -1 },
            color: { type: "color", default: "#F0F0F0" },
            opacity: { type: "number", default: 1 }
          },
          init: function() {
            (this.rounded = new THREE.Mesh(
              this.draw(),
              new THREE.MeshPhongMaterial({
                color: new THREE.Color(this.data.color),
                side: THREE.DoubleSide
              })
            )),
              this.updateOpacity(),
              this.el.setObject3D("mesh", this.rounded);
          },
          update: function() {
            this.data.enabled
              ? this.rounded &&
                ((this.rounded.visible = !0),
                (this.rounded.geometry = this.draw()),
                (this.rounded.material.color = new THREE.Color(
                  this.data.color
                )),
                this.updateOpacity())
              : (this.rounded.visible = !1);
          },
          updateOpacity: function() {
            this.data.opacity < 0 && (this.data.opacity = 0),
              this.data.opacity > 1 && (this.data.opacity = 1),
              this.data.opacity < 1
                ? (this.rounded.material.transparent = !0)
                : (this.rounded.material.transparent = !1),
              (this.rounded.material.opacity = this.data.opacity);
          },
          tick: function() {},
          remove: function() {
            this.rounded &&
              (this.el.object3D.remove(this.rounded), (this.rounded = null));
          },
          draw: function() {
            function t(t, e, i, a, o, n, r, s, l) {
              n || (n = 1e-5),
                r || (r = 1e-5),
                s || (s = 1e-5),
                l || (l = 1e-5),
                t.moveTo(e, i + n),
                t.lineTo(e, i + o - n),
                t.quadraticCurveTo(e, i + o, e + n, i + o),
                t.lineTo(e + a - r, i + o),
                t.quadraticCurveTo(e + a, i + o, e + a, i + o - r),
                t.lineTo(e + a, i + l),
                t.quadraticCurveTo(e + a, i, e + a - l, i),
                t.lineTo(e + s, i),
                t.quadraticCurveTo(e, i, e, i + s);
            }
            var e = new THREE.Shape(),
              i = [
                this.data.radius,
                this.data.radius,
                this.data.radius,
                this.data.radius
              ];
            return (
              this.data.topLeftRadius != -1 && (i[0] = this.data.topLeftRadius),
              this.data.topRightRadius != -1 &&
                (i[1] = this.data.topRightRadius),
              this.data.bottomLeftRadius != -1 &&
                (i[2] = this.data.bottomLeftRadius),
              this.data.bottomRightRadius != -1 &&
                (i[3] = this.data.bottomRightRadius),
              t(
                e,
                0,
                0,
                this.data.width,
                this.data.height,
                i[0],
                i[1],
                i[2],
                i[3]
              ),
              new THREE.ShapeBufferGeometry(e)
            );
          },
          pause: function() {},
          play: function() {}
        }),
          AFRAME.registerPrimitive("a-rounded", {
            defaultComponents: { rounded: {} },
            mappings: {
              enabled: "rounded.enabled",
              width: "rounded.width",
              height: "rounded.height",
              radius: "rounded.radius",
              "top-left-radius": "rounded.topLeftRadius",
              "top-right-radius": "rounded.topRightRadius",
              "bottom-left-radius": "rounded.bottomLeftRadius",
              "bottom-right-radius": "rounded.bottomRightRadius",
              color: "rounded.color",
              opacity: "rounded.opacity"
            }
          });
      }
    ]);
  },
  function(t, e, i) {
    "use strict";
    var a = i(4),
      o = function(t) {
        this.el.object3D.traverse(function(e) {
          e.material &&
            ((e.material.transparent = !0), (e.material.opacity = t));
        });
        var e = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var o, n = this.textEntities[Symbol.iterator]();
            !(e = (o = n.next()).done);
            e = !0
          ) {
            var r = o.value;
            r.setAttribute("opacity", t);
          }
        } catch (t) {
          (i = !0), (a = t);
        } finally {
          try {
            !e && n.return && n.return();
          } finally {
            if (i) throw a;
          }
        }
      };
    AFRAME.registerComponent("fadein", {
      schema: { duration: { type: "int", default: 200 } },
      init: function() {
        (this.textEntities = this.el.querySelectorAll("a-text")),
          this.opacityUpdate(0),
          (this.start = null);
      },
      tick: function(t) {
        this.start || (this.start = t);
        var e = Math.min((t - this.start) / this.data.duration, 1);
        this.opacityUpdate(e),
          1 === e &&
            (this.el.removeAttribute("fadein"),
            a.emit(this.el, "animationend"));
      },
      opacityUpdate: o
    }),
      AFRAME.registerComponent("fadeout", {
        schema: { duration: { type: "int", default: 200 } },
        init: function() {
          (this.textEntities = this.el.querySelectorAll("a-text")),
            this.opacityUpdate(1),
            (this.start = null);
        },
        tick: function(t) {
          this.start || (this.start = t);
          var e = 1 - Math.min((t - this.start) / this.data.duration, 1);
          this.opacityUpdate(e),
            0 === e &&
              (this.el.removeAttribute("fadeout"),
              a.emit(this.el, "animationend"));
        },
        opacityUpdate: o
      }),
      AFRAME.registerComponent("show", {
        init: function() {
          (this.textEntities = this.el.querySelectorAll("a-text")),
            this.opacityUpdate(1),
            this.el.removeAttribute("show");
        },
        opacityUpdate: o
      }),
      AFRAME.registerComponent("hide", {
        init: function() {
          (this.textEntities = this.el.querySelectorAll("a-text")),
            this.opacityUpdate(0),
            this.el.removeAttribute("hide");
        },
        opacityUpdate: o
      });
  },
  function(t, e) {
    "use strict";
    t.exports = {
      emit: function(t, e, i) {
        t.dispatchEvent(new CustomEvent(e, { detail: i }));
      }
    };
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(7),
      n = i(8),
      r = i(11),
      s = i(12);
    AFRAME.registerComponent("keyboard", {
      schema: { isOpen: { type: "boolean", default: !1 } },
      currentInput: null,
      init: function() {
        a.preloadAssets(o), s.init(this.el), n.init(this.el);
        var t = n.numericalUI(),
          e = n.mainUI(),
          i = n.actionsUI();
        (this.el.alphabeticalLayout = n.alphabeticalLayout()),
          (this.el.symbolsLayout = n.symbolsLayout()),
          t.appendChild(n.numericalLayout()),
          e.appendChild(this.el.alphabeticalLayout),
          i.appendChild(n.actionsLayout()),
          this.el.appendChild(t),
          this.el.appendChild(e),
          this.el.appendChild(i),
          (this.el.show = function() {
            r.showKeyboard(l.el);
          }),
          (this.el.hide = function() {
            r.hideKeyboard(l.el);
          }),
          (this.el.open = function() {
            r.openKeyboard(l.el);
          }),
          (this.el.dismiss = function() {
            r.dismissKeyboard(l.el);
          }),
          (this.el.destroy = function() {
            r.destroyKeyboard(l.el);
          }),
          this.el.setAttribute("scale", "2 2 2"),
          this.el.setAttribute("rotation", "-20 0 0"),
          this.el.setAttribute("position", "-1.5 -0.3 -2");
        var l = this;
        this.el.addEventListener("input", function(t) {
          l.currentInput && l.currentInput.appendString(t.detail);
        }),
          this.el.addEventListener("backspace", function(t) {
            l.currentInput && l.currentInput.deleteLast();
          }),
          this.el.addEventListener("dismiss", function(t) {
            l.currentInput && l.currentInput.blur();
          }),
          document.body.addEventListener("didfocusinput", function(t) {
            l.currentInput && l.currentInput.blur(!0),
              (l.currentInput = t.detail),
              l.el.isOpen || r.openKeyboard(l.el);
          }),
          document.body.addEventListener("didblurinput", function(t) {
            (l.currentInput = null), r.dismissKeyboard(l.el);
          });
      },
      update: function() {
        this.data.isOpen ? r.showKeyboard(this.el) : r.hideKeyboard(this.el);
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-keyboard", {
        defaultComponents: { keyboard: {} },
        mappings: { "is-open": "keyboard.isOpen" }
      });
  },
  function(t, e) {
    "use strict";
    var i = {};
    (i.preloadAssets = function(t) {
      var e = document.querySelector("a-assets"),
        i = void 0;
      if (!e) {
        var a = document.querySelector("a-scene");
        (e = document.createElement("a-assets")), a.appendChild(e);
      }
      var o = !0,
        n = !1,
        r = void 0;
      try {
        for (
          var s, l = t[Symbol.iterator]();
          !(o = (s = l.next()).done);
          o = !0
        ) {
          var u = s.value;
          i = !1;
          var d = !0,
            c = !1,
            h = void 0;
          try {
            for (
              var p, b = e.children[Symbol.iterator]();
              !(d = (p = b.next()).done);
              d = !0
            ) {
              var f = p.value;
              u.id === f.id && (i = !0);
            }
          } catch (t) {
            (c = !0), (h = t);
          } finally {
            try {
              !d && b.return && b.return();
            } finally {
              if (c) throw h;
            }
          }
          if (!i) {
            var y = document.createElement(u.type);
            y.setAttribute("id", u.id),
              y.setAttribute("src", u.src),
              e.appendChild(y);
          }
        }
      } catch (t) {
        (n = !0), (r = t);
      } finally {
        try {
          !o && l.return && l.return();
        } finally {
          if (n) throw r;
        }
      }
    }),
      (i.extend = function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        return t;
      }),
      (i.clone = function(t) {
        if (Array.isArray(t)) return t.slice(0);
        var e = Object.create(Object.getPrototypeOf(t)),
          i = void 0,
          a = Object.getOwnPropertyNames(t);
        for (i = 0; i < a.length; )
          Object.defineProperty(
            e,
            a[i],
            Object.getOwnPropertyDescriptor(t, a[i])
          ),
            i++;
        return e;
      }),
      (i.updateOpacity = function(t, e) {
        if (t.hasAttribute("text")) {
          var i = t.getAttribute("text");
          i && ((i.opacity = e), t.setAttribute("text", i));
        }
        t.object3D.traverse(function(t) {
          t.material &&
            ((t.material.transparent = !0), (t.material.opacity = e));
        });
        var a = !0,
          o = !1,
          n = void 0;
        try {
          for (
            var r, s = t.querySelectorAll("a-text")[Symbol.iterator]();
            !(a = (r = s.next()).done);
            a = !0
          ) {
            var l = r.value;
            l.setAttribute("opacity", e);
          }
        } catch (t) {
          (o = !0), (n = t);
        } finally {
          try {
            !a && s.return && s.return();
          } finally {
            if (o) throw n;
          }
        }
      }),
      (i.getWidthFactor = function(t, e) {
        var i = 1e-5;
        return (
          t.components.text &&
            t.components.text.currentFont &&
            ((i = t.components.text.currentFont.widthFactor), (i *= 0.5 + e)),
          i
        );
      }),
      (t.exports = i);
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "img",
        id: "aframeKeyboardShift",
        src: AFRAME.ASSETS_PATH + "/images/ShiftIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardShiftActive",
        src: AFRAME.ASSETS_PATH + "/images/ShiftActiveIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardGlobal",
        src: AFRAME.ASSETS_PATH + "/images/GlobalIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardBackspace",
        src: AFRAME.ASSETS_PATH + "/images/BackspaceIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardEnter",
        src: AFRAME.ASSETS_PATH + "/images/EnterIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardDismiss",
        src: AFRAME.ASSETS_PATH + "/images/DismissIcon.png"
      },
      {
        type: "img",
        id: "aframeKeyboardShadow",
        src: AFRAME.ASSETS_PATH + "/images/KeyShadow.png"
      },
      {
        type: "audio",
        id: "aframeKeyboardKeyIn",
        src: AFRAME.ASSETS_PATH + "/sounds/KeyIn.mp3"
      },
      {
        type: "audio",
        id: "aframeKeyboardKeyDown",
        src: AFRAME.ASSETS_PATH + "/sounds/KeyDown.mp3"
      }
    ];
  },
  function(t, e, i) {
    "use strict";
    var a = i(9),
      o = i(10),
      n = i(11),
      r = {};
    (r.el = null),
      (r.init = function(t) {
        (r.el = t), (n.el = t), (n.SFX = t.SFX);
      }),
      (r.numericalUI = function() {
        var t = document.createElement("a-entity");
        t.setAttribute("position", "0.025 0 0.12"),
          t.setAttribute("rotation", "0 25 0"),
          t.setAttribute("data-ui", !0);
        var e = document.createElement("a-rounded");
        return (
          e.setAttribute("width", "0.280"),
          e.setAttribute("height", "0.360"),
          e.setAttribute("radius", "0.02"),
          e.setAttribute("color", o.KEYBOARD_COLOR),
          t.appendChild(e),
          t
        );
      }),
      (r.mainUI = function() {
        var t = document.createElement("a-entity");
        t.setAttribute("position", "0.312 0 0"), t.setAttribute("data-ui", !0);
        var e = document.createElement("a-rounded");
        return (
          e.setAttribute("width", "0.840"),
          e.setAttribute("height", "0.360"),
          e.setAttribute("radius", "0.02"),
          e.setAttribute("color", o.KEYBOARD_COLOR),
          t.appendChild(e),
          t
        );
      }),
      (r.actionsUI = function() {
        var t = document.createElement("a-entity");
        t.setAttribute("position", "1.180 0 0.01"),
          t.setAttribute("rotation", "0 -25 0"),
          t.setAttribute("data-ui", !0);
        var e = document.createElement("a-rounded");
        return (
          e.setAttribute("width", "0.180"),
          e.setAttribute("height", "0.360"),
          e.setAttribute("radius", "0.02"),
          e.setAttribute("color", o.KEYBOARD_COLOR),
          t.appendChild(e),
          t
        );
      }),
      (r.numericalLayout = function() {
        var t = a.numerical,
          e = document.createElement("a-entity");
        e.setAttribute("position", "0.02 0.26 0.001");
        var i = 0;
        for (var n in t) {
          var s = "num-" + n,
            l = r.key(s, t[n].type, t[n].value),
            u = n % 3,
            d = o.KEY_WIDTH * u,
            c = o.KEY_WIDTH * i;
          l.setAttribute("position", d + " -" + c + " 0"),
            2 === u && i++,
            e.appendChild(l);
        }
        return e;
      }),
      (r.alphabeticalLayout = function() {
        var t = a.alphabetical,
          e = document.createElement("a-entity");
        e.setAttribute("position", "0.02 0.26 0.001");
        var i = 0,
          n = 0,
          s = !1;
        for (var l in t) {
          var u = "main-" + l,
            d = r.key(u, t[l].type, t[l].value),
            c = o.KEY_WIDTH * n,
            h = o.KEY_WIDTH * i;
          1 === i && (c += o.KEY_WIDTH / 2),
            s && (c = c + o.SPACE_KEY_WIDTH - o.KEY_WIDTH + 0.11),
            "spacebar" === t[l].type &&
              ((s = !0), (c += 0.055), (h = o.KEY_WIDTH * i - 0.01)),
            d.setAttribute("position", c + " -" + h + " 0"),
            1 === i && 8 === n ? ((n = -1), i++) : 9 === n && ((n = -1), i++),
            n++,
            e.appendChild(d);
        }
        return e;
      }),
      (r.symbolsLayout = function() {
        var t = a.symbols,
          e = document.createElement("a-entity");
        e.setAttribute("position", "0.02 0.26 0.001");
        var i = 0,
          n = 0,
          s = !1;
        for (var l in t) {
          var u = "symbols-" + l,
            d = r.key(u, t[l].type, t[l].value),
            c = o.KEY_WIDTH * n,
            h = o.KEY_WIDTH * i;
          s && (c = c + o.SPACE_KEY_WIDTH - o.KEY_WIDTH + 0.11),
            "spacebar" === t[l].type &&
              ((s = !0), (c += 0.055), (h = o.KEY_WIDTH * i - 0.01)),
            d.setAttribute("position", c + " -" + h + " 0"),
            9 === n && ((n = -1), i++),
            n++,
            e.appendChild(d);
        }
        return e;
      }),
      (r.actionsLayout = function() {
        var t = a.actions,
          e = document.createElement("a-entity");
        e.setAttribute("position", "0.02 0.26 0.001");
        var i = 0;
        for (var n in t) {
          var s = "action-" + n,
            l = r.key(s, t[n].type, t[n].value);
          l.setAttribute("position", "0 -" + i + " 0"),
            0 == n
              ? (i += o.ACTION_WIDTH + 0.01)
              : 1 == n && (i += o.KEY_WIDTH + 0.01),
            e.appendChild(l);
        }
        return e;
      }),
      (r.key = function(t, e, i) {
        var a = document.createElement("a-rounded");
        if (
          (a.setAttribute("key-id", t),
          a.setAttribute("width", o.KEY_WIDTH),
          a.setAttribute("height", o.KEY_WIDTH),
          a.setAttribute("radius", "0.008"),
          a.setAttribute("position", "0 0 0"),
          a.setAttribute("key-type", e),
          a.setAttribute("key-value", i),
          a.setAttribute("color", o.KEYBOARD_COLOR),
          n.addKeyEvents(a),
          (a.shadow_el = document.createElement("a-image")),
          a.shadow_el.setAttribute("width", 1.25 * o.KEY_WIDTH),
          a.shadow_el.setAttribute("height", 1.25 * o.KEY_WIDTH),
          a.shadow_el.setAttribute(
            "position",
            o.KEY_WIDTH / 2 + " " + o.KEY_WIDTH / 2 + " -0.002"
          ),
          a.shadow_el.setAttribute("src", "#aframeKeyboardShadow"),
          a.appendChild(a.shadow_el),
          "text" === e || "spacebar" === e || "symbol" === e)
        ) {
          var s = document.createElement("a-text");
          s.setAttribute("value", i),
            s.setAttribute("color", "#dbddde"),
            s.setAttribute(
              "position",
              o.KEY_WIDTH / 2 + " " + o.KEY_WIDTH / 2 + " 0.01"
            ),
            s.setAttribute("scale", "0.16 0.16 0.16"),
            s.setAttribute("align", "center"),
            s.setAttribute("baseline", "center"),
            a.appendChild(s);
        }
        if (
          ("spacebar" === e
            ? (a.setAttribute("width", o.SPACE_KEY_WIDTH),
              a.setAttribute("height", o.SPACE_KEY_HEIGHT),
              a.setAttribute("color", "#404b50"),
              a.shadow_el.setAttribute("width", 1.12 * o.SPACE_KEY_WIDTH),
              a.shadow_el.setAttribute("height", 1.2 * o.SPACE_KEY_HEIGHT),
              a.shadow_el.setAttribute(
                "position",
                o.SPACE_KEY_WIDTH / 2 + " " + o.SPACE_KEY_HEIGHT / 2 + " -0.02"
              ),
              s.setAttribute("color", "#adb1b3"),
              s.setAttribute("scale", "0.12 0.12 0.12"),
              s.setAttribute(
                "position",
                o.SPACE_KEY_WIDTH / 2 + " " + o.SPACE_KEY_HEIGHT / 2 + " 0"
              ))
            : "symbol" === e && s.setAttribute("scale", "0.12 0.12 0.12"),
          ("backspace" !== e && "enter" !== e && "dismiss" !== e) ||
            (a.setAttribute("width", o.ACTION_WIDTH),
            a.shadow_el.setAttribute("width", 1.25 * o.ACTION_WIDTH),
            a.shadow_el.setAttribute(
              "position",
              o.ACTION_WIDTH / 2 + " " + o.KEY_WIDTH / 2 + " -0.02"
            )),
          "shift" === e)
        ) {
          var l = document.createElement("a-image");
          l.setAttribute("data-type", "icon"),
            l.setAttribute("width", "0.032"),
            l.setAttribute("height", "0.032"),
            l.setAttribute("position", "0.04 0.04 0.01"),
            l.setAttribute("src", "#aframeKeyboardShift"),
            a.appendChild(l),
            (r.el.shiftKey = a);
        } else if ("global" === e) {
          var l = document.createElement("a-image");
          l.setAttribute("width", "0.032"),
            l.setAttribute("height", "0.032"),
            l.setAttribute("position", "0.04 0.04 0.01"),
            l.setAttribute("src", "#aframeKeyboardGlobal"),
            a.appendChild(l);
        } else if ("backspace" === e) {
          var l = document.createElement("a-image");
          l.setAttribute("width", "0.046"),
            l.setAttribute("height", "0.046"),
            l.setAttribute("position", "0.07 0.04 0.01"),
            l.setAttribute("src", "#aframeKeyboardBackspace"),
            a.appendChild(l);
        } else if ("enter" === e) {
          a.setAttribute("height", o.ACTION_WIDTH),
            a.shadow_el.setAttribute("height", 1.25 * o.ACTION_WIDTH),
            a.shadow_el.setAttribute(
              "position",
              o.ACTION_WIDTH / 2 + " " + o.ACTION_WIDTH / 2 + " -0.02"
            );
          var u = document.createElement("a-circle");
          u.setAttribute("color", "#4285f4"),
            u.setAttribute("radius", 0.044),
            u.setAttribute("position", "0.07 0.07 0.01"),
            a.appendChild(u);
          var l = document.createElement("a-image");
          l.setAttribute("width", "0.034"),
            l.setAttribute("height", "0.034"),
            l.setAttribute("position", "0.07 0.07 0.011"),
            l.setAttribute("src", "#aframeKeyboardEnter"),
            a.appendChild(l);
        } else if ("dismiss" === e) {
          var l = document.createElement("a-image");
          l.setAttribute("width", "0.046"),
            l.setAttribute("height", "0.046"),
            l.setAttribute("position", "0.07 0.04 0.01"),
            l.setAttribute("src", "#aframeKeyboardDismiss"),
            a.appendChild(l);
        }
        return a;
      }),
      (t.exports = r);
  },
  function(t, e) {
    "use strict";
    var i = {
      numerical: [
        { type: "text", value: "1" },
        { type: "text", value: "2" },
        { type: "text", value: "3" },
        { type: "text", value: "4" },
        { type: "text", value: "5" },
        { type: "text", value: "6" },
        { type: "text", value: "7" },
        { type: "text", value: "8" },
        { type: "text", value: "9" },
        { type: "text", value: "." },
        { type: "text", value: "0" },
        { type: "text", value: "-" }
      ],
      alphabetical: [
        { type: "text", value: "q" },
        { type: "text", value: "w" },
        { type: "text", value: "e" },
        { type: "text", value: "r" },
        { type: "text", value: "t" },
        { type: "text", value: "y" },
        { type: "text", value: "u" },
        { type: "text", value: "i" },
        { type: "text", value: "o" },
        { type: "text", value: "p" },
        { type: "text", value: "a" },
        { type: "text", value: "s" },
        { type: "text", value: "d" },
        { type: "text", value: "f" },
        { type: "text", value: "g" },
        { type: "text", value: "h" },
        { type: "text", value: "j" },
        { type: "text", value: "k" },
        { type: "text", value: "l" },
        { type: "shift" },
        { type: "text", value: "z" },
        { type: "text", value: "x" },
        { type: "text", value: "c" },
        { type: "text", value: "v" },
        { type: "text", value: "b" },
        { type: "text", value: "n" },
        { type: "text", value: "m" },
        { type: "text", value: "!" },
        { type: "text", value: "?" },
        { type: "symbol", value: "#+=" },
        { type: "text", value: "@" },
        { type: "spacebar", value: "" },
        { type: "text", value: "," },
        { type: "text", value: "." }
      ],
      symbols: [
        { type: "text", value: "@" },
        { type: "text", value: "#" },
        { type: "text", value: "$" },
        { type: "text", value: "%" },
        { type: "text", value: "&" },
        { type: "text", value: "*" },
        { type: "text", value: "-" },
        { type: "text", value: "+" },
        { type: "text", value: "(" },
        { type: "text", value: ")" },
        { type: "text", value: "~" },
        { type: "text", value: "`" },
        { type: "text", value: '"' },
        { type: "text", value: "'" },
        { type: "text", value: ":" },
        { type: "text", value: ";" },
        { type: "text", value: "_" },
        { type: "text", value: "=" },
        { type: "text", value: "\\" },
        { type: "text", value: "/" },
        { type: "text", value: "{" },
        { type: "text", value: "}" },
        { type: "text", value: "[" },
        { type: "text", value: "]" },
        { type: "text", value: "<" },
        { type: "text", value: ">" },
        { type: "text", value: "^" },
        { type: "text", value: "|" },
        { type: "text", value: "!" },
        { type: "text", value: "?" },
        { type: "symbol", value: "ABC" },
        { type: "text", value: "@" },
        { type: "spacebar", value: "" },
        { type: "text", value: "," },
        { type: "text", value: "." }
      ],
      actions: [
        { type: "backspace", value: "Del" },
        { type: "enter", value: "OK" },
        { type: "dismiss", value: "W" }
      ]
    };
    t.exports = i;
  },
  function(t, e) {
    "use strict";
    var i = {
      KEYBOARD_COLOR: "#263238",
      KEY_COLOR_HIGHLIGHT: "#29363c",
      KEY_COLOR_ACTIVE: "#404b50",
      SPACEBAR_COLOR_ACTIVE: "#3c464b",
      SPACEBAR_COLOR_HIGHLIGHT: "#445055",
      KEY_WIDTH: 0.08,
      SPACE_KEY_WIDTH: 0.368,
      SPACE_KEY_HEIGHT: 0.05,
      ACTION_WIDTH: 0.14
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    var a = i(10),
      o = i(6),
      n = i(4),
      r = i(12),
      s = {};
    (s.el = null),
      (s.showKeyboard = function(t) {
        t.o_position && t.setAttribute("position", t.o_position),
          (t.isOpen = !0);
        var e = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var o, n = t.querySelectorAll("[data-ui]")[Symbol.iterator]();
            !(e = (o = n.next()).done);
            e = !0
          ) {
            var r = o.value,
              s = !0,
              l = !1,
              u = void 0;
            try {
              for (
                var d, c = r.children[Symbol.iterator]();
                !(s = (d = c.next()).done);
                s = !0
              ) {
                var h = d.value;
                h.setAttribute("show", !0);
              }
            } catch (t) {
              (l = !0), (u = t);
            } finally {
              try {
                !s && c.return && c.return();
              } finally {
                if (l) throw u;
              }
            }
          }
        } catch (t) {
          (i = !0), (a = t);
        } finally {
          try {
            !e && n.return && n.return();
          } finally {
            if (i) throw a;
          }
        }
        var p = t.parentNode;
        p || t.sceneEl.appendChild(t);
      }),
      (s.hideKeyboard = function(t) {
        var e = t.getAttribute("position");
        e.x !== -1e4 && (t.o_position = e),
          (t.isOpen = !1),
          t.setAttribute("position", "-10000 -10000 -10000"),
          t.setAttribute("fadeout", { duration: 1 });
      }),
      (s.destroyKeyboard = function(t) {
        var e = t.parentNode;
        e && e.removeChild(t);
      }),
      (s.openKeyboard = function(t) {
        t.o_position && t.setAttribute("position", t.o_position),
          (t.isOpen = !0),
          (t._transitioning = !0);
        var e = t.parentNode;
        e || t.sceneEl.appendChild(t);
        var i = !0,
          a = !1,
          o = void 0;
        try {
          for (
            var r,
              l = function() {
                function e() {
                  i.children[0].removeEventListener("animationend", e),
                    setTimeout(function() {
                      i.children[1].setAttribute("fadein", { duration: 160 }),
                        n.emit(s.el, "didopen"),
                        (t._transitioning = !1);
                    }, 10);
                }
                var i = r.value,
                  a = !0,
                  o = !1,
                  l = void 0;
                try {
                  for (
                    var u, d = i.children[Symbol.iterator]();
                    !(a = (u = d.next()).done);
                    a = !0
                  ) {
                    var c = u.value;
                    c.setAttribute("hide", !0);
                  }
                } catch (t) {
                  (o = !0), (l = t);
                } finally {
                  try {
                    !a && d.return && d.return();
                  } finally {
                    if (o) throw l;
                  }
                }
                i.children[0].setAttribute("fadein", { duration: 160 }),
                  i.children[0].addEventListener("animationend", e);
              },
              u = t.querySelectorAll("[data-ui]")[Symbol.iterator]();
            !(i = (r = u.next()).done);
            i = !0
          )
            l();
        } catch (t) {
          (a = !0), (o = t);
        } finally {
          try {
            !i && u.return && u.return();
          } finally {
            if (a) throw o;
          }
        }
      }),
      (s.dismissKeyboard = function(t) {
        t._transitioning = !0;
        var e = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var o,
              r = function() {
                function e() {
                  i.children[1].removeEventListener("animationend", e),
                    setTimeout(function() {
                      function e() {
                        i.children[0].removeEventListener("animationend", e),
                          s.hideKeyboard(t),
                          n.emit(s.el, "diddismiss"),
                          (t._transitioning = !1);
                      }
                      i.children[0].setAttribute("fadeout", { duration: 160 }),
                        i.children[0].addEventListener("animationend", e);
                    }, 10);
                }
                var i = o.value,
                  a = !0,
                  r = !1,
                  l = void 0;
                try {
                  for (
                    var u, d = i.children[Symbol.iterator]();
                    !(a = (u = d.next()).done);
                    a = !0
                  ) {
                    var c = u.value;
                    c.setAttribute("show", !0);
                  }
                } catch (t) {
                  (r = !0), (l = t);
                } finally {
                  try {
                    !a && d.return && d.return();
                  } finally {
                    if (r) throw l;
                  }
                }
                (t.isOpen = !1),
                  i.children[1].setAttribute("fadeout", { duration: 160 }),
                  i.children[1].addEventListener("animationend", e);
              },
              l = t.querySelectorAll("[data-ui]")[Symbol.iterator]();
            !(e = (o = l.next()).done);
            e = !0
          )
            r();
        } catch (t) {
          (i = !0), (a = t);
        } finally {
          try {
            !e && l.return && l.return();
          } finally {
            if (i) throw a;
          }
        }
      }),
      (s.addKeyEvents = function(t) {
        t.addEventListener("click", s.keyClick),
          t.addEventListener("mousedown", s.keyDown),
          t.addEventListener("mouseup", s.keyOut),
          t.addEventListener("mouseleave", s.keyOut),
          t.addEventListener("mouseenter", s.keyIn);
      }),
      (s.keyClick = function() {
        r.keyDown(s.el);
        var t = this.getAttribute("key-type"),
          e = this.getAttribute("key-value");
        "text" === t || "spacebar" === t
          ? ("spacebar" === t && (e = " "),
            s.isShiftEnabled
              ? ((e = e.toUpperCase()), s.shiftToggle())
              : s.isSymbols && s.symbolsToggle(),
            n.emit(s.el, "input", e))
          : "shift" === t
          ? s.shiftToggle()
          : "symbol" === t
          ? s.symbolsToggle()
          : "backspace" === t
          ? n.emit(s.el, "backspace")
          : "enter" === t
          ? n.emit(s.el, "input", "\n")
          : "dismiss" === t && n.emit(s.el, "dismiss");
      }),
      (s.keyDown = function() {
        s.el._transitioning ||
          ((this.object3D.position.z = 0.003),
          "spacebar" === this.getAttribute("key-type")
            ? this.setAttribute("color", a.SPACEBAR_COLOR_ACTIVE)
            : this.setAttribute("color", a.KEY_COLOR_ACTIVE));
      }),
      (s.keyIn = function() {
        s.el._transitioning ||
          (this.object3D.children[2] &&
            this.object3D.children[2].material &&
            !this.object3D.children[2].material.opacity) ||
          (r.keyIn(s.el),
          "spacebar" === this.getAttribute("key-type")
            ? this.setAttribute("color", a.SPACEBAR_COLOR_HIGHLIGHT)
            : this.setAttribute("color", a.KEY_COLOR_HIGHLIGHT));
      }),
      (s.keyOut = function() {
        (this.object3D.position.z = 0),
          "spacebar" === this.getAttribute("key-type")
            ? this.setAttribute("color", a.KEY_COLOR_ACTIVE)
            : this.setAttribute("color", a.KEYBOARD_COLOR);
      }),
      (s.isShiftEnabled = !1),
      (s.shiftToggle = function() {
        s.isShiftEnabled = !s.isShiftEnabled;
        var t = s.el.shiftKey.querySelector("[data-type]");
        s.isShiftEnabled
          ? t.setAttribute("src", "#aframeKeyboardShiftActive")
          : t.setAttribute("src", "#aframeKeyboardShift");
        var e = !0,
          i = !1,
          a = void 0;
        try {
          for (
            var o, n = document.querySelectorAll("[key-id]")[Symbol.iterator]();
            !(e = (o = n.next()).done);
            e = !0
          ) {
            var r = o.value,
              l = r.getAttribute("key-id"),
              u = r.getAttribute("key-type");
            if (l.startsWith("main-") && "text" === u) {
              var d = r.querySelector("a-text");
              if (d) {
                var c = d.getAttribute("value").toLowerCase();
                this.isShiftEnabled && (c = c.toUpperCase()),
                  d.setAttribute("value", c);
              }
            }
          }
        } catch (t) {
          (i = !0), (a = t);
        } finally {
          try {
            !e && n.return && n.return();
          } finally {
            if (i) throw a;
          }
        }
      }),
      (s.isSymbols = !1),
      (s.symbolsToggle = function() {
        if (((s.isSymbols = !s.isSymbols), s.isSymbols)) {
          var t = s.el.alphabeticalLayout.parentNode;
          t.removeChild(s.el.alphabeticalLayout),
            t.appendChild(s.el.symbolsLayout);
        } else {
          var e = s.el.symbolsLayout.parentNode;
          e.removeChild(s.el.symbolsLayout),
            e.appendChild(s.el.alphabeticalLayout),
            setTimeout(function() {
              o.updateOpacity(s.el.alphabeticalLayout, 1);
            }, 0);
        }
      }),
      (t.exports = s);
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeKeyboardKeyInSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeKeyboardKeyIn"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e),
          (e = document.createElement("a-sound")),
          e.setAttribute("key", "aframeKeyboardKeyDownSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeKeyboardKeyDown"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      keyIn: function(t) {
        var e = t.querySelector("[key=aframeKeyboardKeyInSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      },
      keyDown: function(t) {
        var e = t.querySelector("[key=aframeKeyboardKeyDownSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4);
    AFRAME.registerComponent("input", {
      schema: {
        value: { type: "string", default: "" },
        name: { type: "string", default: "" },
        disabled: { type: "boolean", default: !1 },
        color: { type: "color", default: "#000" },
        align: { type: "string", default: "left" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        opacity: { type: "number", default: 1 },
        side: { type: "string", default: "front" },
        tabSize: { type: "int", default: 4 },
        placeholder: { type: "string", default: "" },
        placeholderColor: { type: "color", default: "#AAA" },
        maxLength: { type: "int", default: 0 },
        type: { type: "string", default: "text" },
        width: { type: "number", default: 1 },
        cursorWidth: { type: "number", default: 0.01 },
        cursorHeight: { type: "number", default: 0.08 },
        cursorColor: { type: "color", default: "#007AFF" },
        backgroundColor: { type: "color", default: "#FFF" },
        backgroundOpacity: { type: "number", default: 1 }
      },
      init: function() {
        var t = this;
        (this.background = document.createElement("a-rounded")),
          this.background.setAttribute("radius", 0.01),
          this.background.setAttribute("height", 0.18),
          this.background.setAttribute("side", "double"),
          this.el.appendChild(this.background),
          (this.cursor = document.createElement("a-plane")),
          this.cursor.setAttribute("position", "0 0 0.003"),
          this.cursor.setAttribute("visible", !1),
          this.el.appendChild(this.cursor),
          (this.text = document.createElement("a-entity")),
          this.el.appendChild(this.text),
          (this.placeholder = document.createElement("a-entity")),
          this.placeholder.setAttribute("visible", !1),
          this.el.appendChild(this.placeholder),
          (this.el.focus = this.focus.bind(this)),
          (this.el.blur = this.blur.bind(this)),
          (this.el.appendString = this.appendString.bind(this)),
          (this.el.deleteLast = this.deleteLast.bind(this)),
          this.blink(),
          this.el.addEventListener("click", function() {
            this.components.input.data.disabled || t.focus();
          }),
          Object.defineProperty(this.el, "value", {
            get: function() {
              return this.getAttribute("value");
            },
            set: function(t) {
              this.setAttribute("value", t);
            },
            enumerable: !0,
            configurable: !0
          });
      },
      blink: function() {
        var t = this;
        return this.isFocused
          ? void (this.cursorInterval = setInterval(function() {
              t.cursor.setAttribute(
                "visible",
                !t.cursor.getAttribute("visible")
              );
            }, 500))
          : (t.cursor.setAttribute("visible", !1),
            clearInterval(this.cursorInterval),
            void (this.cursorInterval = null));
      },
      isFocused: !1,
      focus: function(t) {
        this.isFocused ||
          ((this.isFocused = !0),
          this.cursor.setAttribute("visible", !0),
          this.blink(),
          o.emit(this.el, "focus"),
          t || o.emit(document.body, "didfocusinput", this.el));
      },
      blur: function(t) {
        this.isFocused &&
          ((this.isFocused = !1),
          this.cursorInterval &&
            (clearInterval(this.cursorInterval), (this.cursorInterval = null)),
          this.cursor.setAttribute("visible", !1),
          o.emit(this.el, "blur"),
          t || o.emit(document.body, "didblurinput", this.el));
      },
      appendString: function(t) {
        if ("\n" === t) return this.blur();
        var e = this.el.getAttribute("value");
        e || (e = ""),
          (e += t),
          this.el.setAttribute("value", e),
          o.emit(this.el, "change", e);
      },
      deleteLast: function() {
        var t = this.el.getAttribute("value");
        t || (t = ""),
          (t = t.slice(0, -1)),
          this.el.setAttribute("value", t),
          o.emit(this.el, "change", t);
      },
      updateText: function() {
        function t(o, n, r, s) {
          if (!o.object3D || !o.object3D.children || !o.object3D.children[0])
            return 0;
          var l = o.object3D.children[0].geometry.visibleGlyphs;
          if (!l) return 0;
          if (((l = l[l.length - 1]), !l)) return 0;
          if (l.line)
            return (
              r
                ? (n.value = n.value.substr(1))
                : (n.value = n.value.slice(0, -1)),
              o.setAttribute("text", n),
              t(o, n, r)
            );
          s || (s = a.getWidthFactor(o, n.wrapCount)),
            (l = (l.position[0] + l.data.width) / (s / e.data.width));
          var u = (l + i.left + i.right) / e.data.width;
          return u > 1
            ? (r
                ? (n.value = n.value.substr(1))
                : (n.value = n.value.slice(0, -1)),
              o.setAttribute("text", n),
              t(o, n, r, s))
            : l;
        }
        var e = this,
          i = { left: 0.021, right: 0.021 },
          o = {
            color: this.data.color,
            align: this.data.align,
            side: this.data.side,
            tabSize: this.data.tabSize,
            wrapCount: 24 * this.data.width,
            width: this.data.width
          },
          n = this.text.getAttribute("text");
        n &&
          this.data.value !== n.value &&
          (this.cursorInterval &&
            (clearInterval(this.cursorInterval), (this.cursorInterval = null)),
          this.cursorTimer &&
            (clearTimeout(this.cursorTimer), (this.cursorTimer = null)),
          this.cursor.setAttribute("visible", !0),
          (this.cursorTimer = setTimeout(function() {
            e.blink();
          }, 50))),
          this.data.maxLength
            ? ((o.value = this.data.value.substring(0, this.data.maxLength)),
              this.el.setAttribute("value", o.value))
            : (o.value = this.data.value),
          "password" === this.data.type &&
            (o.value = "*".repeat(this.data.value.length)),
          this.data.font.length && (o.font = this.data.font),
          this.data.letterSpacing &&
            (o.letterSpacing = this.data.letterSpacing),
          this.data.lineHeight.length && (o.lineHeight = this.data.lineHeight),
          this.text.setAttribute("visible", !1),
          this.text.setAttribute("text", o),
          o.value.length
            ? this.placeholder.setAttribute("visible", !1)
            : this.placeholder.setAttribute("visible", !0);
        var r = a.clone(o);
        (r.value = this.data.placeholder),
          (r.color = this.data.placeholderColor),
          this.placeholder.setAttribute("text", r),
          setTimeout(function() {
            if (e.text.object3D) {
              var a = e.text.object3D.children;
              if (a[0] && a[0].geometry && a[0].geometry.visibleGlyphs) {
                var n = 0;
                a[0].geometry.visibleGlyphs.length &&
                  ((n = t(e.text, o, !0)), e.text.setAttribute("visible", !0)),
                  e.cursor.setAttribute("position", n + i.left + " 0 0.003");
              } else e.cursor.setAttribute("position", i.left + " 0 0.003");
            } else e.cursor.setAttribute("position", i.left + " 0 0.003");
            t(e.placeholder, r);
          }, 0),
          this.background.setAttribute("color", this.data.backgroundColor),
          this.background.setAttribute("width", this.data.width),
          this.background.setAttribute("position", "0 -0.09 0.001"),
          this.text.setAttribute(
            "position",
            i.left - 0.001 + this.data.width / 2 + " 0 0.002"
          ),
          this.placeholder.setAttribute(
            "position",
            i.left - 0.001 + this.data.width / 2 + " 0 0.002"
          );
      },
      updateCursor: function() {
        this.cursor.setAttribute("width", this.data.cursorWidth),
          this.cursor.setAttribute("height", this.data.cursorHeight),
          this.cursor.setAttribute("color", this.data.cursorColor);
      },
      update: function() {
        setTimeout(function() {}, 0), this.updateCursor(), this.updateText();
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-input", {
        defaultComponents: { input: {} },
        mappings: {
          value: "input.value",
          name: "input.name",
          disabled: "input.disabled",
          color: "input.color",
          align: "input.align",
          font: "input.font",
          "letter-spacing": "input.letterSpacing",
          "line-height": "input.lineHeight",
          opacity: "input.opacity",
          side: "input.side",
          "tab-size": "input.tabSize",
          placeholder: "input.placeholder",
          "placeholder-color": "input.placeholderColor",
          "max-length": "input.maxLength",
          type: "input.type",
          width: "input.width",
          "cursor-width": "input.cursorWidth",
          "cursor-height": "input.cursorHeight",
          "cursor-color": "input.cursorColor",
          "background-color": "input.backgroundColor",
          "background-opacity": "input.backgroundOpacity"
        }
      });
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4),
      n = i(15),
      r = i(16);
    AFRAME.registerComponent("switch", {
      schema: {
        name: { type: "string", default: "" },
        enabled: { type: "boolean", default: !1 },
        disabled: { type: "boolean", default: !1 },
        fillColor: { type: "color", default: "#bababa" },
        knobColor: { type: "color", default: "#f5f5f5" },
        fillColorEnabled: { type: "color", default: "#80a8ff" },
        knobColorEnabled: { type: "color", default: "#4076fd" },
        fillColorDisabled: { type: "color", default: "#939393" },
        knobColorDisabled: { type: "color", default: "#a2a2a2" }
      },
      init: function() {
        a.preloadAssets(n),
          r.init(this.el),
          (this.el.fill = document.createElement("a-rounded")),
          this.el.fill.setAttribute("width", 0.36),
          this.el.fill.setAttribute("height", 0.16),
          this.el.fill.setAttribute("radius", 0.08),
          this.el.fill.setAttribute("side", "double"),
          this.el.fill.setAttribute("position", "0 0 0.01"),
          this.el.appendChild(this.el.fill),
          (this.el.knob = document.createElement("a-circle")),
          this.el.knob.setAttribute("position", "0.06 0.08 0.02"),
          this.el.knob.setAttribute("radius", 0.12),
          this.el.knob.setAttribute("side", "double"),
          this.el.appendChild(this.el.knob),
          (this.el.shadow_el = document.createElement("a-image")),
          this.el.shadow_el.setAttribute("width", 0.3),
          this.el.shadow_el.setAttribute("height", 0.3),
          this.el.shadow_el.setAttribute("position", "0 0 -0.001"),
          this.el.shadow_el.setAttribute("src", "#aframeSwitchShadow"),
          this.el.knob.appendChild(this.el.shadow_el),
          this.el.addEventListener("click", function() {
            this.components.switch.data.disabled ||
              (this.setAttribute(
                "enabled",
                !this.components.switch.data.enabled
              ),
              o.emit(this, "change", this.components.switch.data.enabled));
          }),
          this.el.addEventListener("mousedown", function() {
            return this.components.switch.data.disabled
              ? r.clickDisabled(this)
              : void r.click(this);
          }),
          Object.defineProperty(this.el, "enabled", {
            get: function() {
              return this.getAttribute("enabled");
            },
            set: function(t) {
              this.setAttribute("enabled", t);
            },
            enumerable: !0,
            configurable: !0
          });
      },
      on: function() {
        this.el.fill.setAttribute("color", this.data.fillColorEnabled),
          this.el.knob.setAttribute("position", "0.32 0.08 0.02"),
          this.el.knob.setAttribute("color", this.data.knobColorEnabled);
      },
      off: function() {
        this.el.fill.setAttribute("color", this.data.fillColor),
          this.el.knob.setAttribute("position", "0.06 0.08 0.02"),
          this.el.knob.setAttribute("color", this.data.knobColor);
      },
      disable: function() {
        this.el.fill.setAttribute("color", this.data.fillColorDisabled),
          this.el.knob.setAttribute("color", this.data.knobColorDisabled);
      },
      update: function() {
        this.data.enabled ? this.on() : this.off(),
          this.data.disabled && this.disable();
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-switch", {
        defaultComponents: { switch: {} },
        mappings: {
          name: "switch.name",
          enabled: "switch.enabled",
          disabled: "switch.disabled",
          "fill-color": "switch.fillColor",
          "knob-color": "switch.knobColor",
          "fill-color-enabled": "switch.fillColorEnabled",
          "knob-color-enabled": "switch.knobColorEnabled",
          "fill-color-disabled": "switch.fillColorDisabled",
          "knob-color-disabled": "switch.knobColorDisabled"
        }
      });
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "img",
        id: "aframeSwitchShadow",
        src: AFRAME.ASSETS_PATH + "/images/SwitchShadow.png"
      },
      {
        type: "audio",
        id: "aframeSwitchClick",
        src: AFRAME.ASSETS_PATH + "/sounds/InputClick.mp3"
      },
      {
        type: "audio",
        id: "aframeSwitchClickDisabled",
        src: AFRAME.ASSETS_PATH + "/sounds/ButtonClickDisabled.mp3"
      }
    ];
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeSwitchClickSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeSwitchClick"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e),
          (e = document.createElement("a-sound")),
          e.setAttribute("key", "aframeSwitchClickDisabledSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeSwitchClickDisabled"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      click: function(t) {
        var e = t.querySelector("[key=aframeSwitchClickSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      },
      clickDisabled: function(t) {
        var e = t.querySelector("[key=aframeSwitchClickDisabledSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    i(6), i(4);
    AFRAME.registerComponent("form", {
      schema: {},
      init: function() {},
      update: function() {},
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-form", {
        defaultComponents: { form: {} },
        mappings: {}
      });
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4),
      n = i(19),
      r = i(20);
    AFRAME.registerComponent("radio", {
      schema: {
        checked: { type: "boolean", default: !1 },
        disabled: { type: "boolean", default: !1 },
        name: { type: "string", default: "" },
        value: { type: "string", default: "" },
        label: { type: "string", default: "" },
        radioColor: { type: "color", default: "#757575" },
        radioColorChecked: { type: "color", default: "#4076fd" },
        color: { type: "color", default: "#757575" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        opacity: { type: "number", default: 1 },
        width: { type: "number", default: 1 }
      },
      init: function() {
        var t = this;
        a.preloadAssets(n),
          r.init(this.el),
          (this.hitbox = document.createElement("a-plane")),
          this.hitbox.setAttribute("height", 0.2),
          this.hitbox.setAttribute("opacity", 0),
          this.hitbox.setAttribute("position", "0 0 0.001"),
          this.el.appendChild(this.hitbox),
          (this.outline = document.createElement("a-ring")),
          this.outline.setAttribute("radius-outer", 0.1),
          this.outline.setAttribute("radius-inner", 0.078),
          this.outline.setAttribute("position", "0.1 0 0.002"),
          this.el.appendChild(this.outline),
          (this.circle = document.createElement("a-circle")),
          this.circle.setAttribute("radius", 0.05),
          this.circle.setAttribute("position", "0.1 0 0.002"),
          this.el.appendChild(this.circle),
          (this.label = document.createElement("a-entity")),
          this.el.appendChild(this.label),
          this.el.addEventListener("click", function() {
            this.components.radio.data.disabled ||
              (this.setAttribute("checked", !0), t.onClick());
          }),
          this.el.addEventListener("mousedown", function() {
            return this.components.radio.data.disabled
              ? r.clickDisabled(this)
              : void r.click(this);
          }),
          Object.defineProperty(this.el, "value", {
            get: function() {
              return this.getAttribute("value");
            },
            set: function(t) {
              this.setAttribute("value", t);
            },
            enumerable: !0,
            configurable: !0
          });
      },
      onClick: function(t) {
        if (this.data.name) {
          var e = this.el.closest("a-form");
          if (e) {
            var i = !1,
              a = Array.from(
                e.querySelectorAll("[name=" + this.data.name + "]")
              );
            a.reverse();
            var n = !0,
              r = !1,
              s = void 0;
            try {
              for (
                var l, u = a[Symbol.iterator]();
                !(n = (l = u.next()).done);
                n = !0
              ) {
                var d = l.value;
                d.components.radio &&
                  (d === this.el && d.hasAttribute("checked")
                    ? ((i = !0),
                      d.components.radio.check(),
                      t || o.emit(d, "change", !0))
                    : i || this.data.checked || !d.hasAttribute("checked")
                    ? d.components.radio.uncheck()
                    : ((i = !0), d.components.radio.check()));
              }
            } catch (t) {
              (r = !0), (s = t);
            } finally {
              try {
                !n && u.return && u.return();
              } finally {
                if (r) throw s;
              }
            }
            !i &&
              this.el.hasAttribute("checked") &&
              (this.check(), t || o.emit(this.el, "change", !0));
          }
        }
      },
      check: function() {
        this.outline.setAttribute("color", this.data.radioColorChecked),
          this.circle.setAttribute("color", this.data.radioColorChecked),
          this.circle.setAttribute("visible", !0),
          this.data.disabled && this.disabled();
      },
      uncheck: function() {
        this.outline.setAttribute("color", this.data.radioColor),
          this.circle.setAttribute("visible", !1),
          this.data.disabled && this.disabled();
      },
      disabled: function() {
        this.outline.setAttribute("color", this.data.radioColor),
          this.circle.setAttribute("color", this.data.radioColor);
      },
      update: function() {
        function t(o, n) {
          if (!o.object3D || !o.object3D.children || !o.object3D.children[0])
            return 0;
          var r = o.object3D.children[0].geometry.visibleGlyphs;
          if (!r) return 0;
          if (((r = r[r.length - 1]), !r)) return 0;
          if (r.line)
            return (
              (i.value = i.value.slice(0, -1)), o.setAttribute("text", i), t(o)
            );
          n || (n = a.getWidthFactor(o, i.wrapCount)),
            (r = (r.position[0] + r.data.width) / (n / e.data.width));
          var s = r / e.data.width;
          return s > 1
            ? ((i.value = i.value.slice(0, -1)),
              o.setAttribute("text", i),
              t(o, n))
            : r;
        }
        var e = this;
        this.onClick(!0),
          this.hitbox.setAttribute("width", this.data.width),
          this.hitbox.setAttribute(
            "position",
            this.data.width / 2 + " 0 0.001"
          );
        var i = {
          color: this.data.color,
          align: "left",
          wrapCount: 10 * (this.data.width + 0.2),
          width: this.data.width
        };
        this.data.font && (i.font = this.data.font),
          (i.value = this.data.label),
          (i.color = this.data.color),
          this.label.setAttribute("text", i),
          this.label.setAttribute(
            "position",
            this.data.width / 2 + 0.24 + " 0 0.002"
          ),
          setTimeout(function() {
            if ((e.data.label.length && t(e.label), e.data.disabled))
              var i = setInterval(function() {
                e.outline.object3D.children[0] &&
                  (clearInterval(i),
                  a.updateOpacity(e.outline, 0.4),
                  a.updateOpacity(e.circle, 0.4),
                  a.updateOpacity(e.label, 0.4));
              }, 10);
            else
              var o = setInterval(function() {
                e.outline.object3D.children[0] &&
                  (clearInterval(o),
                  a.updateOpacity(e.outline, 1),
                  a.updateOpacity(e.circle, 1),
                  a.updateOpacity(e.label, 1));
              }, 10);
          }, 0);
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-radio", {
        defaultComponents: { radio: {} },
        mappings: {
          checked: "radio.checked",
          disabled: "radio.disabled",
          name: "radio.name",
          value: "radio.value",
          label: "radio.label",
          "radio-color": "radio.radioColor",
          "radio-color-checked": "radio.radioColorChecked",
          color: "radio.color",
          align: "radio.align",
          font: "radio.font",
          "letter-spacing": "radio.letterSpacing",
          "line-height": "radio.lineHeight",
          opacity: "radio.opacity",
          width: "radio.width"
        }
      });
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "audio",
        id: "aframeRadioClick",
        src: AFRAME.ASSETS_PATH + "/sounds/InputClick.mp3"
      },
      {
        type: "audio",
        id: "aframeRadioClickDisabled",
        src: AFRAME.ASSETS_PATH + "/sounds/ButtonClickDisabled.mp3"
      }
    ];
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeRadioClickSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeRadioClick"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e),
          (e = document.createElement("a-sound")),
          e.setAttribute("key", "aframeRadioClickDisabledSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeRadioClickDisabled"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      click: function(t) {
        var e = t.querySelector("[key=aframeRadioClickSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      },
      clickDisabled: function(t) {
        var e = t.querySelector("[key=aframeRadioClickDisabledSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4),
      n = i(22),
      r = i(23);
    AFRAME.registerComponent("checkbox", {
      schema: {
        checked: { type: "boolean", default: !1 },
        disabled: { type: "boolean", default: !1 },
        name: { type: "string", default: "" },
        value: { type: "string", default: "" },
        label: { type: "string", default: "" },
        checkboxColor: { type: "color", default: "#757575" },
        checkboxColorChecked: { type: "color", default: "#4076fd" },
        color: { type: "color", default: "#757575" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        opacity: { type: "number", default: 1 },
        width: { type: "number", default: 1 }
      },
      init: function() {
        var t = this;
        a.preloadAssets(n),
          r.init(this.el),
          (this.hitbox = document.createElement("a-plane")),
          this.hitbox.setAttribute("height", 0.2),
          this.hitbox.setAttribute("opacity", 0),
          this.el.appendChild(this.hitbox),
          (this.outline = document.createElement("a-rounded")),
          this.outline.setAttribute("width", 0.2),
          this.outline.setAttribute("height", 0.2),
          this.outline.setAttribute("radius", 0.02),
          this.outline.setAttribute("position", "0 -0.1 0.01"),
          this.el.appendChild(this.outline),
          (this.inside = document.createElement("a-rounded")),
          this.inside.setAttribute("width", 0.156),
          this.inside.setAttribute("height", 0.156),
          this.inside.setAttribute("radius", 0.01),
          this.inside.setAttribute("color", "#EEE"),
          this.inside.setAttribute("position", "0.0195 -0.078 0.02"),
          this.el.appendChild(this.inside),
          (this.checkmark = document.createElement("a-image")),
          this.checkmark.setAttribute("width", 0.16),
          this.checkmark.setAttribute("height", 0.16),
          this.checkmark.setAttribute("src", "#aframeCheckboxMark"),
          this.checkmark.setAttribute("position", "0.1 0 0.03"),
          this.el.appendChild(this.checkmark),
          (this.label = document.createElement("a-entity")),
          this.el.appendChild(this.label),
          this.el.addEventListener("click", function() {
            this.components.checkbox.data.disabled ||
              (this.setAttribute(
                "checked",
                !this.components.checkbox.data.checked
              ),
              t.onClick());
          }),
          this.el.addEventListener("mousedown", function() {
            return this.components.checkbox.data.disabled
              ? r.clickDisabled(this)
              : void r.click(this);
          }),
          Object.defineProperty(this.el, "value", {
            get: function() {
              return this.getAttribute("value");
            },
            set: function(t) {
              this.setAttribute("value", t);
            },
            enumerable: !0,
            configurable: !0
          });
      },
      onClick: function(t) {
        this.data.checked ? this.check() : this.uncheck(),
          t || o.emit(this.el, "change", this.data.checked);
      },
      check: function() {
        this.outline.setAttribute("color", this.data.checkboxColorChecked),
          this.inside.setAttribute("color", this.data.checkboxColorChecked),
          this.checkmark.setAttribute("visible", !0),
          this.data.disabled && this.disabled();
      },
      uncheck: function() {
        this.outline.setAttribute("color", this.data.checkboxColor),
          this.inside.setAttribute("color", "#EEE"),
          this.checkmark.setAttribute("visible", !1),
          this.data.disabled && this.disabled();
      },
      disabled: function() {
        this.outline.setAttribute("color", this.data.checkboxColor),
          this.inside.setAttribute("color", this.data.checkboxColor);
      },
      update: function() {
        function t(o, n) {
          if (!o.object3D || !o.object3D.children || !o.object3D.children[0])
            return 0;
          var r = o.object3D.children[0].geometry.visibleGlyphs;
          if (!r) return 0;
          if (((r = r[r.length - 1]), !r)) return 0;
          if (r.line)
            return (
              (i.value = i.value.slice(0, -1)), o.setAttribute("text", i), t(o)
            );
          n || (n = a.getWidthFactor(o, i.wrapCount)),
            (r = (r.position[0] + r.data.width) / (n / e.data.width));
          var s = r / e.data.width;
          return s > 1
            ? ((i.value = i.value.slice(0, -1)),
              o.setAttribute("text", i),
              t(o, n))
            : r;
        }
        var e = this;
        this.onClick(!0),
          this.hitbox.setAttribute("width", this.data.width),
          this.hitbox.setAttribute("position", this.data.width / 2 + " 0 0.01");
        var i = {
          color: this.data.color,
          align: "left",
          wrapCount: 10 * (this.data.width + 0.2),
          width: this.data.width
        };
        this.data.font && (i.font = this.data.font),
          (i.value = this.data.label),
          (i.color = this.data.color),
          this.label.setAttribute("text", i),
          this.label.setAttribute(
            "position",
            this.data.width / 2 + 0.24 + " 0 0.01"
          ),
          setTimeout(function() {
            if ((e.data.label.length && t(e.label), e.data.disabled))
              var i = setInterval(function() {
                e.checkmark.object3D.children[0] &&
                  (clearInterval(i),
                  a.updateOpacity(e.checkmark, 0.4),
                  a.updateOpacity(e.label, 0.4));
              }, 10);
            else
              var o = setInterval(function() {
                e.checkmark.object3D.children[0] &&
                  (clearInterval(o),
                  a.updateOpacity(e.checkmark, 1),
                  a.updateOpacity(e.label, 1));
              }, 10);
          }, 0);
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-checkbox", {
        defaultComponents: { checkbox: {} },
        mappings: {
          checked: "checkbox.checked",
          disabled: "checkbox.disabled",
          name: "checkbox.name",
          value: "checkbox.value",
          label: "checkbox.label",
          "checkbox-color": "checkbox.checkboxColor",
          "checkbox-color-checked": "checkbox.checkboxColorChecked",
          color: "checkbox.color",
          align: "checkbox.align",
          font: "checkbox.font",
          "letter-spacing": "checkbox.letterSpacing",
          "line-height": "checkbox.lineHeight",
          opacity: "checkbox.opacity",
          width: "checkbox.width"
        }
      });
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "img",
        id: "aframeCheckboxMark",
        src: AFRAME.ASSETS_PATH + "/images/CheckmarkIcon.png"
      },
      {
        type: "audio",
        id: "aframeCheckboxClick",
        src: AFRAME.ASSETS_PATH + "/sounds/InputClick.mp3"
      },
      {
        type: "audio",
        id: "aframeCheckboxClickDisabled",
        src: AFRAME.ASSETS_PATH + "/sounds/ButtonClickDisabled.mp3"
      }
    ];
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeCheckboxClickSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeCheckboxClick"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e),
          (e = document.createElement("a-sound")),
          e.setAttribute("key", "aframeButtonClickDisabledSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeButtonClickDisabled"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      click: function(t) {
        var e = t.querySelector("[key=aframeCheckboxClickSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      },
      clickDisabled: function(t) {
        var e = t.querySelector("[key=aframeButtonClickDisabledSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4),
      n = i(25),
      r = i(26);
    AFRAME.registerComponent("button", {
      schema: {
        disabled: { type: "boolean", default: !1 },
        type: { type: "string", default: "raised" },
        name: { type: "string", default: "" },
        value: { type: "string", default: "Button" },
        buttonColor: { type: "color", default: "#4076fd" },
        color: { type: "color", default: "#FFF" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        opacity: { type: "number", default: 1 },
        width: { type: "number", default: 1 }
      },
      init: function() {
        var t = this;
        a.preloadAssets(n),
          r.init(this.el),
          (this.wrapper = document.createElement("a-entity")),
          this.wrapper.setAttribute("position", "0 0 0.01"),
          this.el.appendChild(this.wrapper),
          (this.shadow = document.createElement("a-image")),
          this.shadow.setAttribute("height", 0.36 * 1.25),
          this.shadow.setAttribute("src", "#aframeButtonShadow"),
          this.wrapper.appendChild(this.shadow),
          (this.outline = document.createElement("a-rounded")),
          this.outline.setAttribute("height", 0.36),
          this.outline.setAttribute("radius", 0.03),
          this.outline.setAttribute("position", "0 -0.18 0.01"),
          this.wrapper.appendChild(this.outline),
          (this.label = document.createElement("a-entity")),
          this.outline.appendChild(this.label),
          this.el.addEventListener("click", function() {
            (this.components.button && this.components.button.data.disabled) ||
              t.onClick();
          }),
          this.el.addEventListener("mousedown", function() {
            return this.components.button &&
              this.components.button.data.disabled
              ? r.clickDisabled(this)
              : (t.wrapper.setAttribute("position", "0 0 0.036"),
                void r.click(this));
          }),
          this.el.addEventListener("mouseup", function() {
            (this.components.button && this.components.button.data.disabled) ||
              t.wrapper.setAttribute("position", "0 0 0");
          }),
          (this.el.getWidth = this.getWidth.bind(this)),
          Object.defineProperty(this.el, "value", {
            get: function() {
              return this.getAttribute("value");
            },
            set: function(t) {
              this.setAttribute("value", t);
            },
            enumerable: !0,
            configurable: !0
          });
      },
      onClick: function() {},
      getWidth: function() {
        return this.__width;
      },
      update: function() {
        function t(o, n, r) {
          if (!o.object3D || !o.object3D.children || !o.object3D.children[0])
            return setTimeout(function() {
              t(o, n);
            }, 10);
          var s = o.object3D.children[0].geometry.visibleGlyphs;
          if (!s)
            return setTimeout(function() {
              t(o, n);
            }, 10);
          if (((s = s[s.length - 1]), !s)) return n(0);
          if (s.line)
            return (
              (i.value = i.value.slice(0, -1)),
              o.setAttribute("text", i),
              t(o, n)
            );
          r || (r = a.getWidthFactor(o, i.wrapCount)),
            (s = (s.position[0] + s.data.width) / (r / e.data.width));
          var l = s / e.data.width;
          return l > 1
            ? ((i.value = i.value.slice(0, -1)),
              o.setAttribute("text", i),
              t(o, n, r))
            : n(s);
        }
        var e = this;
        this.outline.setAttribute("color", this.data.buttonColor);
        var i = {
          color: this.data.color,
          align: "center",
          wrapCount: 10 * this.data.width,
          width: this.data.width
        };
        this.data.font && (i.font = this.data.font),
          "flat" === this.data.type && (i.color = this.data.buttonColor),
          (i.value = this.data.value.toUpperCase()),
          this.label.setAttribute("text", i),
          this.label.setAttribute(
            "position",
            this.data.width / 2 + 0.24 + " 0 0.01"
          ),
          setTimeout(function() {
            if (
              (e.data.value.length &&
                t(e.label, function(t) {
                  e.label.setAttribute("position", t / 2 + 0.14 + " 0.18 0.02"),
                    (t += 0.28),
                    e.outline.setAttribute("width", t),
                    (e.__width = t),
                    e.shadow.setAttribute("width", 1.17 * t),
                    e.shadow.setAttribute("position", t / 2 + " 0 0"),
                    o.emit(e.el, "change:width", t);
                }),
              e.data.disabled)
            ) {
              e.shadow.setAttribute("visible", !1);
              var i = setInterval(function() {
                e.label.object3D.children[0] &&
                  e.label.object3D.children[0].geometry.visibleGlyphs &&
                  (clearInterval(i), a.updateOpacity(e.el, 0.4));
              }, 10);
            } else
              var n = setInterval(function() {
                e.label.object3D.children[0] &&
                  e.label.object3D.children[0].geometry.visibleGlyphs &&
                  (clearInterval(n), a.updateOpacity(e.el, 1));
              }, 10);
            if ("flat" === e.data.type) {
              e.shadow.setAttribute("visible", !1);
              var r = setInterval(function() {
                e.label.object3D.children[0] &&
                  e.label.object3D.children[0].geometry.visibleGlyphs &&
                  (clearInterval(r),
                  a.updateOpacity(e.outline, 0),
                  e.data.disabled && a.updateOpacity(e.label, 0.4));
              }, 10);
            }
          }, 0);
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-button", {
        defaultComponents: { button: {} },
        mappings: {
          disabled: "button.disabled",
          type: "button.type",
          name: "button.name",
          value: "button.value",
          "button-color": "button.buttonColor",
          color: "button.color",
          font: "button.font",
          "letter-spacing": "button.letterSpacing",
          "line-height": "button.lineHeight",
          opacity: "button.opacity",
          width: "button.width"
        }
      });
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "img",
        id: "aframeButtonShadow",
        src: AFRAME.ASSETS_PATH + "/images/ButtonShadow.png"
      },
      {
        type: "audio",
        id: "aframeButtonClick",
        src: AFRAME.ASSETS_PATH + "/sounds/ButtonClick.mp3"
      },
      {
        type: "audio",
        id: "aframeButtonClickDisabled",
        src: AFRAME.ASSETS_PATH + "/sounds/ButtonClickDisabled.mp3"
      }
    ];
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeButtonClickSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeButtonClick"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e),
          (e = document.createElement("a-sound")),
          e.setAttribute("key", "aframeButtonClickDisabledSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeButtonClickDisabled"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      click: function(t) {
        var e = t.querySelector("[key=aframeButtonClickSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      },
      clickDisabled: function(t) {
        var e = t.querySelector("[key=aframeButtonClickDisabledSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  },
  function(t, e, i) {
    "use strict";
    var a = i(6),
      o = i(4),
      n = i(28),
      r = i(29);
    AFRAME.registerComponent("toast", {
      schema: {
        message: { type: "string", default: "You are cool" },
        action: { type: "string", default: "" },
        backgroundColor: { type: "color", default: "#222" },
        actionColor: { type: "color", default: "#4076fd" },
        color: { type: "color", default: "#FFF" },
        font: { type: "string", default: "" },
        letterSpacing: { type: "int", default: 0 },
        lineHeight: { type: "string", default: "" },
        width: { type: "number", default: 3 },
        duration: { type: "number", default: 2e3 },
        autoshow: { type: "boolean", default: !0 }
      },
      init: function() {
        function t(t) {
          var i = e.label.getAttribute("text");
          (i.width = e.data.width - t.detail),
            (i.wrapCount = 10 * i.width),
            e.label.setAttribute("text", i),
            e.label.setAttribute(
              "position",
              i.width / 2 + 0.14 + " 0.04 0.001"
            ),
            this.setAttribute(
              "position",
              e.data.width - t.detail + " " + (0.44 - 0.36) / 2 + " 0.001"
            );
        }
        var e = this;
        a.preloadAssets(n),
          r.init(this.el),
          this.el.setAttribute("position", "10000 10000 10000"),
          this.el.setAttribute("rotation", "-25 0 0"),
          this.el.setAttribute("scale", "0.3 0.3 0.3"),
          (this.background = document.createElement("a-rounded")),
          this.background.setAttribute("height", 0.44),
          this.background.setAttribute("radius", 0.03),
          this.background.setAttribute("position", "0 -0.18 0.001"),
          this.el.appendChild(this.background),
          (this.label = document.createElement("a-entity")),
          this.el.appendChild(this.label),
          (this.action = document.createElement("a-button")),
          e.action.setAttribute("button-color", "#222"),
          this.el.appendChild(this.action),
          this.action.addEventListener("change:width", t),
          this.action.addEventListener("click", function() {
            o.emit(e.el, "actionclick");
          });
        var i = setInterval(function() {
          e.action.object3D &&
            e.action.object3D.children[0] &&
            (clearInterval(i),
            a.updateOpacity(e.el, 0),
            a.updateOpacity(e.label, 0),
            a.updateOpacity(e.action, 0),
            e.data.autoshow && e.show());
        }, 10);
        (this.el.show = this.show.bind(this)),
          (this.el.hide = this.hide.bind(this));
      },
      show: function() {
        this.hideTimer && clearTimeout(this.hideTimer),
          this.el.setAttribute(
            "position",
            -this.data.width / (2 / this.el.object3D.scale.x) + " 0.25 -1.6"
          );
        var t = this;
        setTimeout(function() {
          t.el.setAttribute("fadein", { duration: 160 }),
            setTimeout(function() {
              a.updateOpacity(t.label, 1),
                t.action.components.button.shadow.setAttribute("visible", !1);
            }, 10);
        }, 0),
          (this.hideTimer = setTimeout(function() {
            t.hide();
          }, this.data.duration)),
          r.show(this.el);
      },
      hide: function() {
        var t = this;
        setTimeout(function() {
          a.updateOpacity(t.label, 0),
            t.action.components.button.shadow.setAttribute("visible", !1),
            setTimeout(function() {
              t.el.setAttribute("fadeout", { duration: 160 }),
                setTimeout(function() {
                  t.el.setAttribute("position", "10000 10000 10000");
                }, 200);
            }, 10);
        }, 0);
      },
      update: function() {
        this.background.setAttribute("color", this.data.backgroundColor),
          this.background.setAttribute("width", this.data.width);
        var t = {
          color: this.data.color,
          align: "left",
          wrapCount: 10 * this.data.width,
          width: this.data.width,
          lineHeight: 64
        };
        this.data.font && (t.font = this.data.font),
          "flat" === this.data.type && (t.color = this.data.buttonColor),
          (t.value = this.data.message),
          this.label.setAttribute("text", t),
          this.label.setAttribute(
            "position",
            this.data.width / 2 + 0.14 + " 0 0.001"
          ),
          this.action.setAttribute("value", this.data.action.toUpperCase()),
          this.action.setAttribute("color", this.data.actionColor);
      },
      tick: function() {},
      remove: function() {},
      pause: function() {},
      play: function() {}
    }),
      AFRAME.registerPrimitive("a-toast", {
        defaultComponents: { toast: {} },
        mappings: {
          message: "toast.message",
          action: "toast.action",
          "action-color": "toast.actionColor",
          "background-color": "toast.backgroundColor",
          color: "toast.color",
          font: "toast.font",
          "letter-spacing": "toast.letterSpacing",
          "line-height": "toast.lineHeight",
          width: "toast.width",
          duration: "toast.duration",
          autoshow: "toast.autoshow"
        }
      });
  },
  function(t, e) {
    "use strict";
    t.exports = [
      {
        type: "audio",
        id: "aframeToastShow",
        src: AFRAME.ASSETS_PATH + "/sounds/ToastShow.mp3"
      }
    ];
  },
  function(t, e) {
    "use strict";
    var i = {
      init: function(t) {
        var e = document.createElement("a-sound");
        e.setAttribute("key", "aframeToastShowSound"),
          e.setAttribute("sfx", !0),
          e.setAttribute("src", "#aframeToastShow"),
          e.setAttribute("position", "0 2 5"),
          t.appendChild(e);
      },
      show: function(t) {
        var e = t.querySelector("[key=aframeToastShowSound]");
        e && (e.components.sound.stopSound(), e.components.sound.playSound());
      }
    };
    t.exports = i;
  }
]);
//# sourceMappingURL=aframe-material.min.js.map
