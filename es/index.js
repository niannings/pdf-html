/*! pdf-html - v1.0.5 - 2/25/2020 https://niannings.github.io */
function n(n,r,t,i){if(void 0===r&&(r=!0),void 0===t&&(t=!1),void 0===i&&(i=!1),!t){var o=r?"add":"remove",a=n.parentElement;for(n.classList[o]("is-print"),i&&(n.classList[o]("printing"),e(Array.from(n.children),(function(n){n.classList[o]("is-print")})));a&&"body"!==a.nodeName.toLowerCase();)a.classList[o]("is-print"),a.classList[o]("printing"),a=a.parentElement}}function e(n,e){for(var r=n.length,t=-1;++t<r;)e(n[t])}export default function(r){var t=r.el,i=[];if(!t)throw new Error('params "el" is required!');if("string"==typeof t){if(!(i=Array.from(document.querySelectorAll(t))))throw new Error("can't find "+t)}else t instanceof Element?i.push(t):t instanceof Array?"string"==typeof t[0]?e(t,(function(n){var e;return(e=i).push.apply(e,Array.from(document.querySelectorAll(n)))})):i=t:i=Array.from(t);var o=function(r,t){var i;e(t,(function(e){var r,t,o=e.nodeName.toLowerCase(),a="body"===(null===(t=null===(r=e.parentElement)||void 0===r?void 0:r.nodeName)||void 0===t?void 0:t.toLowerCase());"body"!==o&&"html"!==o||(i=!0),n(e,!0,i,a)}));var o=function(n,e){var r=n.size,t=void 0===r?"A4 portrait":r,i=n.margin;void 0===e&&(e=!1);var o="\n        @media print {\n            @page {\n                size: "+t+";\n                margin: "+(void 0===i?"2cm":i)+"\n            }\n            "+(e?"":"\n                body > :not(.printing),\n                .printing > :not(.is-print) {\n                    display: none;\n                }")+"\n        }\n    ",a=document.createElement("style");return a.textContent=o,a}(r.styles||{},i);return document.querySelector("head").appendChild(o),o}(r,i);window.print(),setTimeout((function(){return function(r,t){e(r,(function(e){return n(e,!1)})),t.parentElement.removeChild(t)}(i,o)}))}
