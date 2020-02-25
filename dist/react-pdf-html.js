import pdfHtml from './index.js';
import React, { createRef, Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function reactPdfHtml(_a) {
  var el = _a.el,
      component = _a.component,
      styles = _a.styles,
      _b = _a.async,
      async = _b === void 0 ? false : _b;
  var div = document.createElement('div');

  var start = function start(isOk) {
    if (isOk) {
      open({
        el: el,
        styles: styles,
        html: div
      });
      return true;
    }

    return false;
  };

  render(component, div);

  if (async) {
    return start;
  }

  setTimeout(function () {
    return start(true);
  });
  return null;
}

function open(params) {
  var el = params.el;
  render(React.createElement(PdfContainer, __assign({}, params)), el);
  setTimeout(function () {
    var _a;

    unmountComponentAtNode(el);
    (_a = el.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(el);
  });
}

var PdfContainer =
/** @class */
function (_super) {
  __extends(PdfContainer, _super);

  function PdfContainer() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.htmlRef = createRef();
    return _this;
  }

  PdfContainer.prototype.componentDidMount = function () {
    var _a;

    var _b = this.props,
        el = _b.el,
        styles = _b.styles,
        html = _b.html;
    (_a = this.htmlRef.current) === null || _a === void 0 ? void 0 : _a.append(html);
    pdfHtml({
      el: el,
      styles: styles
    });
  };

  PdfContainer.prototype.render = function () {
    return React.createElement("div", {
      ref: this.htmlRef
    });
  };

  return PdfContainer;
}(Component);

export default reactPdfHtml;
