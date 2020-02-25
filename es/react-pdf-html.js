/*! pdf-html - v1.0.4 - 2/25/2020 https://niannings.github.io */
import t from"./index.js";import e,{createRef as n,Component as r}from"react";import{render as o,unmountComponentAtNode as i}from"react-dom";
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
***************************************************************************** */var u=function(t,e){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};var c=function(){return(c=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};var l=function(r){function o(){var t=null!==r&&r.apply(this,arguments)||this;return t.htmlRef=n(),t}return function(t,e){function n(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}(o,r),o.prototype.componentDidMount=function(){var e,n=this.props,r=n.el,o=n.styles,i=n.html;null===(e=this.htmlRef.current)||void 0===e||e.append(i),t({el:r,styles:o})},o.prototype.render=function(){return e.createElement("div",{ref:this.htmlRef})},o}(r);export default function(t){var n=t.el,r=t.component,u=t.styles,p=t.async,a=void 0!==p&&p,f=document.createElement("div"),s=function(t){return!!t&&(function(t){var n=t.el;o(e.createElement(l,c({},t)),n),setTimeout((function(){var t;i(n),null===(t=n.parentNode)||void 0===t||t.removeChild(n)}))}({el:n,styles:u,html:f}),!0)};return o(r,f),a?s:(setTimeout((function(){return s(!0)})),null)}
