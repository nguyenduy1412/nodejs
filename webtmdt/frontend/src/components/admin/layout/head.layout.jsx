import React from 'react';
import { Helmet } from 'react-helmet';

const Head = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AdminLTE 3 | Dashboard</title>

    {/* Stylesheets */}
    <link rel="stylesheet" href="/assets/admin/plugins/fontawesome-free/css/all.min.css" />
    <link rel="stylesheet" href="/assets/admin/css/adminlte.min2167.css?v=3.2.0" />
    <link rel="stylesheet" href="/assets/admin/css/style.css" />
    <link rel="stylesheet" href="/assets/admin/css/OverlayScrollbars.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/daterangepicker/daterangepicker.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/select2/css/select2.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/bs-stepper/css/bs-stepper.min.css" />
    <link rel="stylesheet" href="/assets/admin/plugins/dropzone/min/dropzone.min.css" />
    <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/43.3.0/ckeditor5.css" />
    <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5-premium-features/43.3.0/ckeditor5-premium-features.css" />

    {/* Scripts */}
    <script src="/assets/admin/js/chart.min.js"></script>

    <script src="https://cdn.ckeditor.com/ckeditor5/43.3.0/ckeditor5.js"></script>

    {/* Inline Script */}
    <script nonce="f5766ce1-5c5e-4a52-9822-64048eb692c9">
      {`
        (function (w, d) {
          !function (j, k, l, m) {
            j[l] = j[l] || {};
            j[l].executed = [];
            j.zaraz = {deferred: [], listeners: []};
            j.zaraz.q = [];
            j.zaraz._f = function (n) {
              return async function () {
                var o = Array.prototype.slice.call(arguments);
                j.zaraz.q.push({m: n, a: o});
              }
            };
            for (const p of ["track", "set", "debug"]) j.zaraz[p] = j.zaraz._f(p);
            j.zaraz.init = () => {
              var q = k.getElementsByTagName(m)[0], r = k.createElement(m), s = k.getElementsByTagName("title")[0];
              s && (j[l].t = k.getElementsByTagName("title")[0].text);
              j[l].x = Math.random();
              j[l].w = j.screen.width;
              j[l].h = j.screen.height;
              j[l].j = j.innerHeight;
              j[l].e = j.innerWidth;
              j[l].l = j.location.href;
              j[l].r = k.referrer;
              j[l].k = j.screen.colorDepth;
              j[l].n = k.characterSet;
              j[l].o = (new Date).getTimezoneOffset();
              if (j.dataLayer) for (const w of Object.entries(Object.entries(dataLayer).reduce(((x, y) => ({...x[1], ...y[1]})), {}))) zaraz.set(w[0], w[1], {scope: "page"});
              j[l].q = [];
              for (; j.zaraz.q.length;) {
                const z = j.zaraz.q.shift();
                j[l].q.push(z);
              }
              r.defer = !0;
              for (const A of [localStorage, sessionStorage]) Object.keys(A || {}).filter((C => C.startsWith("_zaraz_"))).forEach((B => {
                try {
                  j[l]["z_" + B.slice(7)] = JSON.parse(A.getItem(B));
                } catch {
                  j[l]["z_" + B.slice(7)] = A.getItem(B);
                }
              }));
              r.referrerPolicy = "origin";
              r.src = "../../cdn-cgi/zaraz/sd0d9.js?z=" + btoa(encodeURIComponent(JSON.stringify(j[l])));
              q.parentNode.insertBefore(r, q);
            };
            ["complete", "interactive"].includes(k.readyState) ? zaraz.init() : j.addEventListener("DOMContentLoaded", zaraz.init);
          }(w, d, "zarazData", "script");
        })(window, document);
      `}
    </script>
  </Helmet>
);

export default Head;
