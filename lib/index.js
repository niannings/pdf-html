(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.pdfHtml = factory());
}(this, (function () { 'use strict';

    function pdfHtml(params) {
      var el = params.el;
      var domGroup = [];
      if (!el) throw new Error('params "el" is required!');

      if (typeof el === 'string') {
        domGroup = Array.from(document.querySelectorAll(el));

        if (!domGroup) {
          throw new Error("can't find " + el);
        }
      } else if (el instanceof Element) {
        domGroup.push(el);
      } else if (el instanceof Array) {
        if (typeof el[0] === 'string') {
          each(el, function (item) {
            var _a;

            return (_a = domGroup).push.apply(_a, Array.from(document.querySelectorAll(item)));
          });
        } else {
          domGroup = el;
        }
      } else {
        domGroup = Array.from(el);
      } // start


      var styleEl = printStart(params, domGroup); // print

      window.print(); // end

      setTimeout(function () {
        return printEnd(domGroup, styleEl);
      });
    }

    function printStart(params, domGroup) {
      var isFull; // init styles

      each(domGroup, function (dom) {
        var _a, _b;

        var nodeName = dom.nodeName.toLowerCase();
        var isFirstLevel = ((_b = (_a = dom.parentElement) === null || _a === void 0 ? void 0 : _a.nodeName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'body';

        if (nodeName === 'body' || nodeName === 'html') {
          isFull = true;
        }

        setClassName(dom, true, isFull, isFirstLevel);
      });
      var styleEl = crateStyle(params.styles || {}, isFull);
      document.querySelector('head').appendChild(styleEl);
      return styleEl;
    }

    function printEnd(domGroup, styleEl) {
      // after print
      each(domGroup, function (dom) {
        return setClassName(dom, false);
      });
      styleEl.parentElement.removeChild(styleEl);
    }

    function setClassName(dom, isBind, isFull, isFirstLevel) {
      if (isBind === void 0) {
        isBind = true;
      }

      if (isFull === void 0) {
        isFull = false;
      }

      if (isFirstLevel === void 0) {
        isFirstLevel = false;
      }

      if (isFull) return;
      var methodName = isBind ? 'add' : 'remove';
      var pe = dom.parentElement;
      dom.classList[methodName]('is-print'); // parent is body

      if (isFirstLevel) {
        dom.classList[methodName]('printing');
        each(Array.from(dom.children), function (item) {
          item.classList[methodName]('is-print');
        });
      }

      while (pe && pe.nodeName.toLowerCase() !== 'body') {
        pe.classList[methodName]('is-print');
        pe.classList[methodName]('printing');
        pe = pe.parentElement;
      }
    }

    function crateStyle(_a, isFull) {
      var _b = _a.size,
          size = _b === void 0 ? 'A4 portrait' : _b,
          _c = _a.margin,
          margin = _c === void 0 ? '2cm' : _c;

      if (isFull === void 0) {
        isFull = false;
      }

      var styles = "\n        @media print {\n            @page {\n                size: " + size + ";\n                margin: " + margin + "\n            }\n            " + (isFull ? '' : "\n                body > :not(.printing),\n                .printing > :not(.is-print) {\n                    display: none;\n                }") + "\n        }\n    ";
      var styleEl = document.createElement('style');
      styleEl.textContent = styles;
      return styleEl;
    }

    function each(list, cb) {
      var len = list.length;
      var i = -1;

      while (++i < len) {
        cb(list[i]);
      }
    }

    return pdfHtml;

})));
