import {
  SearchBar
} from "/build/_shared/chunk-EEEUZJA4.js";
import {
  useOptionalUser,
  useUser
} from "/build/_shared/chunk-Y7VT56QR.js";
import {
  HoneypotProvider
} from "/build/_shared/chunk-6NMOG26R.js";
import {
  AuthenticityTokenProvider
} from "/build/_shared/chunk-6LMWWETO.js";
import {
  parse
} from "/build/_shared/chunk-FS75F6DH.js";
import "/build/_shared/chunk-SS7EHFNL.js";
import {
  z
} from "/build/_shared/chunk-YTDRTWMN.js";
import {
  ErrorList,
  useForm
} from "/build/_shared/chunk-H2TCL2LU.js";
import {
  Button
} from "/build/_shared/chunk-RHPIMEJG.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  $1746a345f3d73bb7$export$f680877a34711e37,
  $5cb92bef7577960e$export$177fb62ff3ec1f22,
  $cf1ac5d9fe0e8206$export$722aac194ae923,
  $cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2,
  $cf1ac5d9fe0e8206$export$b688253958b8dfe7,
  $cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9,
  $f1701beae083dbae$export$602eac185826482c
} from "/build/_shared/chunk-7RTSRIVO.js";
import {
  $71cd76cc60e0454e$export$6f32135080cb4c3,
  $8927f6f2acc4f386$export$250ffa63cdc0d034,
  $8927f6f2acc4f386$export$6d1a0317bde7de7f,
  $921a889cee6df7e8$export$99c2b779aa4e8b8b,
  $b1b2314f5f9a1d84$export$25bec8c6f54ee79a,
  $c512c27ab02ef895$export$50c7b4e9d9f19c1,
  $e42e1063c40fb3ef$export$b9ecd428b558ff10
} from "/build/_shared/chunk-TAQPVQBK.js";
import {
  $5e63c961fc1ce211$export$8c6ed5c666ac1360,
  $6ed0406888f73fc4$export$43e446d32b3d21af,
  $6ed0406888f73fc4$export$c7b2cbe3552a0d05,
  _extends
} from "/build/_shared/chunk-CHQ4BA76.js";
import {
  GeneralErrorBoundary
} from "/build/_shared/chunk-XV5O3AU2.js";
import {
  withSentry
} from "/build/_shared/chunk-R2QIY5GK.js";
import {
  Icon,
  sprite_default
} from "/build/_shared/chunk-HGS2R3YL.js";
import {
  cn,
  getUserImgSrc,
  invariant,
  require_dist
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
  useMatches,
  useNavigation,
  useRevalidator,
  useRouteLoaderData,
  useSubmit
} from "/build/_shared/chunk-PHQUHPUM.js";
import {
  require_react_dom
} from "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-76ZEIH4H.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:./utils/auth.server.ts
var require_auth_server = __commonJS({
  "empty-module:./utils/auth.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/csrf.server.ts
var require_csrf_server = __commonJS({
  "empty-module:./utils/csrf.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/db.server.ts
var require_db_server = __commonJS({
  "empty-module:./utils/db.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/env.server.ts
var require_env_server = __commonJS({
  "empty-module:./utils/env.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/honeypot.server.ts
var require_honeypot_server = __commonJS({
  "empty-module:./utils/honeypot.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/theme.server.ts
var require_theme_server = __commonJS({
  "empty-module:./utils/theme.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/timing.server.ts
var require_timing_server = __commonJS({
  "empty-module:./utils/timing.server.ts"(exports, module) {
    module.exports = {};
  }
});

// empty-module:./utils/toast.server.ts
var require_toast_server = __commonJS({
  "empty-module:./utils/toast.server.ts"(exports, module) {
    module.exports = {};
  }
});

// css-bundle-plugin-ns:@remix-run/css-bundle
var cssBundleHref = void 0;

// app/root.tsx
var import_node = __toESM(require_node(), 1);
var import_react18 = __toESM(require_react(), 1);

// app/components/progress-bar.tsx
var import_react2 = __toESM(require_react(), 1);
var import_spin_delay = __toESM(require_dist(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/progress-bar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/progress-bar.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
function EpicProgress() {
  _s();
  const transition = useNavigation();
  const busy = transition.state !== "idle";
  const delayedPending = (0, import_spin_delay.useSpinDelay)(busy, {
    delay: 600,
    minDuration: 400
  });
  const ref = (0, import_react2.useRef)(null);
  const [animationComplete, setAnimationComplete] = (0, import_react2.useState)(true);
  (0, import_react2.useEffect)(() => {
    if (!ref.current)
      return;
    if (delayedPending)
      setAnimationComplete(false);
    const animationPromises = ref.current.getAnimations().map(({
      finished
    }) => finished);
    Promise.allSettled(animationPromises).then(() => {
      if (!delayedPending)
        setAnimationComplete(true);
    });
  }, [delayedPending]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { role: "progressbar", "aria-hidden": delayedPending ? void 0 : true, "aria-valuetext": delayedPending ? "Loading" : void 0, className: "fixed inset-x-0 left-0 top-0 z-50 h-[0.20rem] animate-pulse", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { ref, className: cn("h-full w-0 bg-foreground duration-500 ease-in-out", transition.state === "idle" && (animationComplete ? "transition-none" : "w-full opacity-0 transition-all"), delayedPending && transition.state === "submitting" && "w-5/12", delayedPending && transition.state === "loading" && "w-8/12") }, void 0, false, {
      fileName: "app/components/progress-bar.tsx",
      lineNumber: 48,
      columnNumber: 4
    }, this),
    delayedPending && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "update", size: "md", className: "m-1 animate-spin text-foreground", "aria-hidden": true }, void 0, false, {
      fileName: "app/components/progress-bar.tsx",
      lineNumber: 50,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "app/components/progress-bar.tsx",
      lineNumber: 49,
      columnNumber: 23
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/progress-bar.tsx",
    lineNumber: 47,
    columnNumber: 10
  }, this);
}
_s(EpicProgress, "RH18mmpAJ2Z/O9llHYG9E/G/F+A=", false, function() {
  return [useNavigation, import_spin_delay.useSpinDelay];
});
_c = EpicProgress;
var _c;
$RefreshReg$(_c, "EpicProgress");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/toaster.tsx
var import_react5 = __toESM(require_react(), 1);

// node_modules/sonner/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
var import_react4 = __toESM(require_react(), 1);
"use client";
function st(c, { insertAt: a } = {}) {
  if (!c || typeof document == "undefined")
    return;
  let t = document.head || document.getElementsByTagName("head")[0], s = document.createElement("style");
  s.type = "text/css", a === "top" && t.firstChild ? t.insertBefore(s, t.firstChild) : t.appendChild(s), s.styleSheet ? s.styleSheet.cssText = c : s.appendChild(document.createTextNode(c));
}
st(`html[dir=ltr],[data-sonner-toaster][dir=ltr]{--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}html[dir=rtl],[data-sonner-toaster][dir=rtl]{--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999}[data-sonner-toaster][data-x-position=right]{right:max(var(--offset),env(safe-area-inset-right))}[data-sonner-toaster][data-x-position=left]{left:max(var(--offset),env(safe-area-inset-left))}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translate(-50%)}[data-sonner-toaster][data-y-position=top]{top:max(var(--offset),env(safe-area-inset-top))}[data-sonner-toaster][data-y-position=bottom]{bottom:max(var(--offset),env(safe-area-inset-bottom))}[data-sonner-toast]{--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;will-change:transform,opacity,height;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast][data-y-position=top]{top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}[data-sonner-toast] [data-description]{font-weight:400;line-height:1.4;color:inherit}[data-sonner-toast] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast] [data-icon]>*{flex-shrink:0}[data-sonner-toast] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast] [data-button]:focus-visible{box-shadow:0 0 0 2px #0006}[data-sonner-toast] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toast][data-theme=dark] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;background:var(--gray1);color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;opacity:0;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]:focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}[data-sonner-toast] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast]:hover [data-close-button]{opacity:1}[data-sonner-toast]:focus [data-close-button]{opacity:1}[data-sonner-toast]:focus-within [data-close-button]{opacity:1}[data-sonner-toast]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]:before{content:"";position:absolute;left:0;right:0;height:100%}[data-sonner-toast][data-y-position=top][data-swiping=true]:before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]:before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]:before{content:"";position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast]:after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y: translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y: translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]:before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount, 0px));transition:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation:swipe-out .2s ease-out forwards}@keyframes swipe-out{0%{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount)));opacity:1}to{transform:translateY(calc(var(--lift) * var(--offset) + var(--swipe-amount) + var(--lift) * -100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;--mobile-offset: 16px;right:var(--mobile-offset);left:var(--mobile-offset);width:100%}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - 32px)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset)}[data-sonner-toaster][data-y-position=bottom]{bottom:20px}[data-sonner-toaster][data-y-position=top]{top:20px}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset);right:var(--mobile-offset);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-rich-colors=true] [data-sonner-toast][data-type=success],[data-rich-colors=true] [data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true] [data-sonner-toast][data-type=info],[data-rich-colors=true] [data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true] [data-sonner-toast][data-type=warning],[data-rich-colors=true] [data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true] [data-sonner-toast][data-type=error],[data-rich-colors=true] [data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);
var ut = (c) => {
  switch (c) {
    case "success":
      return xt;
    case "info":
      return wt;
    case "warning":
      return Tt;
    case "error":
      return Et;
    default:
      return null;
  }
};
var vt = Array(12).fill(0);
var ft = ({ visible: c }) => import_react4.default.createElement("div", { className: "sonner-loading-wrapper", "data-visible": c }, import_react4.default.createElement("div", { className: "sonner-spinner" }, vt.map((a, t) => import_react4.default.createElement("div", { className: "sonner-loading-bar", key: `spinner-bar-${t}` }))));
var xt = import_react4.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react4.default.createElement("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z", clipRule: "evenodd" }));
var Tt = import_react4.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", height: "20", width: "20" }, import_react4.default.createElement("path", { fillRule: "evenodd", d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z", clipRule: "evenodd" }));
var wt = import_react4.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react4.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z", clipRule: "evenodd" }));
var Et = import_react4.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", height: "20", width: "20" }, import_react4.default.createElement("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z", clipRule: "evenodd" }));
var rt = 1;
var nt = class {
  constructor() {
    this.subscribe = (a) => (this.subscribers.push(a), () => {
      let t = this.subscribers.indexOf(a);
      this.subscribers.splice(t, 1);
    });
    this.publish = (a) => {
      this.subscribers.forEach((t) => t(a));
    };
    this.addToast = (a) => {
      this.publish(a), this.toasts = [...this.toasts, a];
    };
    this.create = (a) => {
      var m;
      let { message: t, ...s } = a, u = typeof (a == null ? void 0 : a.id) == "number" || ((m = a.id) == null ? void 0 : m.length) > 0 ? a.id : rt++, S = this.toasts.find((g) => g.id === u), p = a.dismissible === void 0 ? true : a.dismissible;
      return S ? this.toasts = this.toasts.map((g) => g.id === u ? (this.publish({ ...g, ...a, id: u, title: t }), { ...g, ...a, id: u, dismissible: p, title: t }) : g) : this.addToast({ title: t, ...s, dismissible: p, id: u }), u;
    };
    this.dismiss = (a) => (a || this.toasts.forEach((t) => {
      this.subscribers.forEach((s) => s({ id: t.id, dismiss: true }));
    }), this.subscribers.forEach((t) => t({ id: a, dismiss: true })), a);
    this.message = (a, t) => this.create({ ...t, message: a });
    this.error = (a, t) => this.create({ ...t, message: a, type: "error" });
    this.success = (a, t) => this.create({ ...t, type: "success", message: a });
    this.info = (a, t) => this.create({ ...t, type: "info", message: a });
    this.warning = (a, t) => this.create({ ...t, type: "warning", message: a });
    this.loading = (a, t) => this.create({ ...t, type: "loading", message: a });
    this.promise = (a, t) => {
      if (!t)
        return;
      let s;
      t.loading !== void 0 && (s = this.create({ ...t, promise: a, type: "loading", message: t.loading }));
      let u = a instanceof Promise ? a : a(), S = s !== void 0;
      return u.then((p) => {
        if (t.success !== void 0) {
          S = false;
          let m = typeof t.success == "function" ? t.success(p) : t.success;
          this.create({ id: s, type: "success", message: m });
        }
      }).catch((p) => {
        if (t.error !== void 0) {
          S = false;
          let m = typeof t.error == "function" ? t.error(p) : t.error;
          this.create({ id: s, type: "error", message: m });
        }
      }).finally(() => {
        var p;
        S && (this.dismiss(s), s = void 0), (p = t.finally) == null || p.call(t);
      }), s;
    };
    this.custom = (a, t) => {
      let s = (t == null ? void 0 : t.id) || rt++;
      return this.create({ jsx: a(s), id: s, ...t }), s;
    };
    this.subscribers = [], this.toasts = [];
  }
};
var b = new nt();
var St = (c, a) => {
  let t = (a == null ? void 0 : a.id) || rt++;
  return b.addToast({ title: c, ...a, id: t }), t;
};
var kt = St;
var Nt = Object.assign(kt, { success: b.success, info: b.info, warning: b.warning, error: b.error, custom: b.custom, message: b.message, promise: b.promise, dismiss: b.dismiss, loading: b.loading });
var Mt = 3;
var Ct = "32px";
var Rt = 4e3;
var Pt = 356;
var pt = 14;
var Dt = 20;
var Bt = 200;
var Ht = (c) => {
  let { invert: a, toast: t, interacting: s, setHeights: u, visibleToasts: S, heights: p, index: m, toasts: g, expanded: L, removeToast: U, closeButton: W, style: K, cancelButtonStyle: i, actionButtonStyle: _, className: X = "", descriptionClassName: J = "", duration: x, position: A, gap: G = pt, loadingIcon: Y, expandByDefault: j } = c, [B, M] = import_react3.default.useState(false), [F, $] = import_react3.default.useState(false), [q, C] = import_react3.default.useState(false), [k, Q] = import_react3.default.useState(false), [N, I] = import_react3.default.useState(0), [Z, n] = import_react3.default.useState(0), f = import_react3.default.useRef(null), l = import_react3.default.useRef(null), R = m === 0, D = m + 1 <= S, r = t.type, T = t.dismissible !== false, O = t.className || "", gt = t.descriptionClassName || "", V = import_react3.default.useMemo(() => p.findIndex((o) => o.toastId === t.id) || 0, [p, t.id]), tt = import_react3.default.useMemo(() => t.duration || x || Rt, [t.duration, x]), et = import_react3.default.useRef(0), H = import_react3.default.useRef(0), zt = import_react3.default.useRef(tt), it = import_react3.default.useRef(0), z2 = import_react3.default.useRef(null), [lt, ht] = A.split("-"), dt = import_react3.default.useMemo(() => p.reduce((o, d, h) => h >= V ? o : o + d.height, 0), [p, V]), bt = t.invert || a, at = r === "loading";
  H.current = import_react3.default.useMemo(() => V * G + dt, [V, dt]), import_react3.default.useEffect(() => {
    M(true);
  }, []), import_react3.default.useLayoutEffect(() => {
    if (!B)
      return;
    let o = l.current, d = o.style.height;
    o.style.height = "auto";
    let h = o.getBoundingClientRect().height;
    o.style.height = d, n(h), u((w) => w.find((y) => y.toastId === t.id) ? w.map((y) => y.toastId === t.id ? { ...y, height: h } : y) : [{ toastId: t.id, height: h }, ...w]);
  }, [B, t.title, t.description, u, t.id]);
  let P = import_react3.default.useCallback(() => {
    $(true), I(H.current), u((o) => o.filter((d) => d.toastId !== t.id)), setTimeout(() => {
      U(t);
    }, Bt);
  }, [t, U, u, H]);
  import_react3.default.useEffect(() => {
    if (t.promise && r === "loading" || t.duration === 1 / 0)
      return;
    let o, d = tt;
    return L || s ? (() => {
      if (it.current < et.current) {
        let E = (/* @__PURE__ */ new Date()).getTime() - et.current;
        d = d - E;
      }
      it.current = (/* @__PURE__ */ new Date()).getTime();
    })() : (() => {
      et.current = (/* @__PURE__ */ new Date()).getTime(), o = setTimeout(() => {
        var E;
        (E = t.onAutoClose) == null || E.call(t, t), P();
      }, d);
    })(), () => clearTimeout(o);
  }, [L, s, j, t, tt, P, t.promise, r]), import_react3.default.useEffect(() => {
    let o = l.current;
    if (o) {
      let d = o.getBoundingClientRect().height;
      return n(d), u((h) => [{ toastId: t.id, height: d }, ...h]), () => u((h) => h.filter((w) => w.toastId !== t.id));
    }
  }, [u, t.id]), import_react3.default.useEffect(() => {
    t.delete && P();
  }, [P, t.delete]);
  function yt() {
    return Y ? import_react3.default.createElement("div", { className: "loader", "data-visible": r === "loading" }, Y) : import_react3.default.createElement(ft, { visible: r === "loading" });
  }
  return import_react3.default.createElement("li", { "aria-live": t.important ? "assertive" : "polite", "aria-atomic": "true", role: "status", tabIndex: 0, ref: l, className: X + " " + O, "data-sonner-toast": "", "data-styled": !(t.jsx || t.unstyled), "data-mounted": B, "data-promise": !!t.promise, "data-removed": F, "data-visible": D, "data-y-position": lt, "data-x-position": ht, "data-index": m, "data-front": R, "data-swiping": q, "data-dismissible": T, "data-type": r, "data-invert": bt, "data-swipe-out": k, "data-expanded": !!(L || j && B), style: { "--index": m, "--toasts-before": m, "--z-index": g.length - m, "--offset": `${F ? N : H.current}px`, "--initial-height": j ? "auto" : `${Z}px`, ...K, ...t.style }, onPointerDown: (o) => {
    at || !T || (f.current = /* @__PURE__ */ new Date(), I(H.current), o.target.setPointerCapture(o.pointerId), o.target.tagName !== "BUTTON" && (C(true), z2.current = { x: o.clientX, y: o.clientY }));
  }, onPointerUp: () => {
    var w, E, y, ot;
    if (k || !T)
      return;
    z2.current = null;
    let o = Number(((w = l.current) == null ? void 0 : w.style.getPropertyValue("--swipe-amount").replace("px", "")) || 0), d = (/* @__PURE__ */ new Date()).getTime() - ((E = f.current) == null ? void 0 : E.getTime()), h = Math.abs(o) / d;
    if (Math.abs(o) >= Dt || h > 0.11) {
      I(H.current), (y = t.onDismiss) == null || y.call(t, t), P(), Q(true);
      return;
    }
    (ot = l.current) == null || ot.style.setProperty("--swipe-amount", "0px"), C(false);
  }, onPointerMove: (o) => {
    var ct;
    if (!z2.current || !T)
      return;
    let d = o.clientY - z2.current.y, h = o.clientX - z2.current.x, E = (lt === "top" ? Math.min : Math.max)(0, d), y = o.pointerType === "touch" ? 10 : 2;
    Math.abs(E) > y ? (ct = l.current) == null || ct.style.setProperty("--swipe-amount", `${d}px`) : Math.abs(h) > y && (z2.current = null);
  } }, W && !t.jsx ? import_react3.default.createElement("button", { "aria-label": "Close toast", "data-disabled": at, "data-close-button": true, onClick: at || !T ? () => {
  } : () => {
    var o;
    P(), (o = t.onDismiss) == null || o.call(t, t);
  } }, import_react3.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, import_react3.default.createElement("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), import_react3.default.createElement("line", { x1: "6", y1: "6", x2: "18", y2: "18" }))) : null, t.jsx || import_react3.default.isValidElement(t.title) ? t.jsx || t.title : import_react3.default.createElement(import_react3.default.Fragment, null, r || t.icon || t.promise ? import_react3.default.createElement("div", { "data-icon": "" }, (t.promise || t.type === "loading") && !t.icon ? yt() : null, t.icon || ut(r)) : null, import_react3.default.createElement("div", { "data-content": "" }, import_react3.default.createElement("div", { "data-title": "" }, t.title), t.description ? import_react3.default.createElement("div", { "data-description": "", className: J + gt }, t.description) : null), t.cancel ? import_react3.default.createElement("button", { "data-button": true, "data-cancel": true, style: t.cancelButtonStyle || i, onClick: () => {
    var o;
    T && (P(), (o = t.cancel) != null && o.onClick && t.cancel.onClick());
  } }, t.cancel.label) : null, t.action ? import_react3.default.createElement("button", { "data-button": "", style: t.actionButtonStyle || _, onClick: (o) => {
    var d;
    (d = t.action) == null || d.onClick(o), !o.defaultPrevented && P();
  } }, t.action.label) : null));
};
function mt() {
  if (typeof window == "undefined")
    return "ltr";
  let c = document.documentElement.getAttribute("dir");
  return c === "auto" || !c ? window.getComputedStyle(document.documentElement).direction : c;
}
var Wt = (c) => {
  let { invert: a, position: t = "bottom-right", hotkey: s = ["altKey", "KeyT"], expand: u, closeButton: S, className: p, offset: m, theme: g = "light", richColors: L, duration: U, style: W, visibleToasts: K = Mt, toastOptions: i, dir: _ = mt(), gap: X, loadingIcon: J } = c, [x, A] = import_react3.default.useState([]), G = import_react3.default.useMemo(() => Array.from(new Set([t].concat(x.filter((n) => n.position).map((n) => n.position)))), [x, t]), [Y, j] = import_react3.default.useState([]), [B, M] = import_react3.default.useState(false), [F, $] = import_react3.default.useState(false), [q, C] = import_react3.default.useState(g !== "system" ? g : typeof window != "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), k = import_react3.default.useRef(null), Q = s.join("+").replace(/Key/g, "").replace(/Digit/g, ""), N = import_react3.default.useRef(null), I = import_react3.default.useRef(false), Z = import_react3.default.useCallback((n) => A((f) => f.filter(({ id: l }) => l !== n.id)), []);
  return import_react3.default.useEffect(() => b.subscribe((n) => {
    if (n.dismiss) {
      A((f) => f.map((l) => l.id === n.id ? { ...l, delete: true } : l));
      return;
    }
    setTimeout(() => {
      import_react_dom.default.flushSync(() => {
        A((f) => {
          let l = f.findIndex((R) => R.id === n.id);
          return l !== -1 ? [...f.slice(0, l), { ...f[l], ...n }, ...f.slice(l + 1)] : [n, ...f];
        });
      });
    });
  }), []), import_react3.default.useEffect(() => {
    if (g !== "system") {
      C(g);
      return;
    }
    g === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? C("dark") : C("light")), typeof window != "undefined" && window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches: n }) => {
      C(n ? "dark" : "light");
    });
  }, [g]), import_react3.default.useEffect(() => {
    x.length <= 1 && M(false);
  }, [x]), import_react3.default.useEffect(() => {
    let n = (f) => {
      var R, D;
      s.every((r) => f[r] || f.code === r) && (M(true), (R = k.current) == null || R.focus()), f.code === "Escape" && (document.activeElement === k.current || (D = k.current) != null && D.contains(document.activeElement)) && M(false);
    };
    return document.addEventListener("keydown", n), () => document.removeEventListener("keydown", n);
  }, [s]), import_react3.default.useEffect(() => {
    if (k.current)
      return () => {
        N.current && (N.current.focus({ preventScroll: true }), N.current = null, I.current = false);
      };
  }, [k.current]), x.length ? import_react3.default.createElement("section", { "aria-label": `Notifications ${Q}`, tabIndex: -1 }, G.map((n, f) => {
    var D;
    let [l, R] = n.split("-");
    return import_react3.default.createElement("ol", { key: n, dir: _ === "auto" ? mt() : _, tabIndex: -1, ref: k, className: p, "data-sonner-toaster": true, "data-theme": q, "data-rich-colors": L, "data-y-position": l, "data-x-position": R, style: { "--front-toast-height": `${(D = Y[0]) == null ? void 0 : D.height}px`, "--offset": typeof m == "number" ? `${m}px` : m || Ct, "--width": `${Pt}px`, "--gap": `${pt}px`, ...W }, onBlur: (r) => {
      I.current && !r.currentTarget.contains(r.relatedTarget) && (I.current = false, N.current && (N.current.focus({ preventScroll: true }), N.current = null));
    }, onFocus: (r) => {
      r.target instanceof HTMLElement && r.target.dataset.dismissible === "false" || I.current || (I.current = true, N.current = r.relatedTarget);
    }, onMouseEnter: () => M(true), onMouseMove: () => M(true), onMouseLeave: () => {
      F || M(false);
    }, onPointerDown: (r) => {
      r.target instanceof HTMLElement && r.target.dataset.dismissible === "false" || $(true);
    }, onPointerUp: () => $(false) }, x.filter((r) => !r.position && f === 0 || r.position === n).map((r, T) => {
      var O;
      return import_react3.default.createElement(Ht, { key: r.id, index: T, toast: r, duration: (O = i == null ? void 0 : i.duration) != null ? O : U, className: i == null ? void 0 : i.className, descriptionClassName: i == null ? void 0 : i.descriptionClassName, invert: a, visibleToasts: K, closeButton: S, interacting: F, position: n, style: i == null ? void 0 : i.style, cancelButtonStyle: i == null ? void 0 : i.cancelButtonStyle, actionButtonStyle: i == null ? void 0 : i.actionButtonStyle, removeToast: Z, toasts: x, heights: Y, setHeights: j, expandByDefault: u, gap: X, loadingIcon: J, expanded: B });
    }));
  })) : null;
};

// app/components/toaster.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/toaster.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/toaster.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
function EpicToaster({
  toast
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Wt, { closeButton: true, position: "top-center" }, void 0, false, {
      fileName: "app/components/toaster.tsx",
      lineNumber: 28,
      columnNumber: 4
    }, this),
    toast ? /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ShowToast, { toast }, void 0, false, {
      fileName: "app/components/toaster.tsx",
      lineNumber: 29,
      columnNumber: 13
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/components/toaster.tsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
_c2 = EpicToaster;
function ShowToast({
  toast
}) {
  _s2();
  const {
    id,
    type,
    title,
    description
  } = toast;
  (0, import_react5.useEffect)(() => {
    setTimeout(() => {
      Nt[type](title, {
        id,
        description
      });
    }, 0);
  }, [description, id, title, type]);
  return null;
}
_s2(ShowToast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c22 = ShowToast;
var _c2;
var _c22;
$RefreshReg$(_c2, "EpicToaster");
$RefreshReg$(_c22, "ShowToast");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var import_react13 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-menu/dist/index.mjs
var import_react12 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-collection/dist/index.mjs
var import_react6 = __toESM(require_react(), 1);
function $e02a7d9cb1dc128c$export$c74125a8e3af6bb2(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = $c512c27ab02ef895$export$50c7b4e9d9f19c1(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {
    collectionRef: {
      current: null
    },
    itemMap: /* @__PURE__ */ new Map()
  });
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = import_react6.default.useRef(null);
    const itemMap = import_react6.default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ import_react6.default.createElement(CollectionProviderImpl, {
      scope,
      itemMap,
      collectionRef: ref
    }, children);
  };
  /* @__PURE__ */ Object.assign(CollectionProvider, {
    displayName: PROVIDER_NAME
  });
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlot = /* @__PURE__ */ import_react6.default.forwardRef((props, forwardedRef) => {
    const { scope, children } = props;
    const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, context.collectionRef);
    return /* @__PURE__ */ import_react6.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionSlot, {
    displayName: COLLECTION_SLOT_NAME
  });
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlot = /* @__PURE__ */ import_react6.default.forwardRef((props, forwardedRef) => {
    const { scope, children, ...itemData } = props;
    const ref = import_react6.default.useRef(null);
    const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
    const context = useCollectionContext(ITEM_SLOT_NAME, scope);
    import_react6.default.useEffect(() => {
      context.itemMap.set(ref, {
        ref,
        ...itemData
      });
      return () => void context.itemMap.delete(ref);
    });
    return /* @__PURE__ */ import_react6.default.createElement($5e63c961fc1ce211$export$8c6ed5c666ac1360, {
      [ITEM_DATA_ATTR]: "",
      ref: composedRefs
    }, children);
  });
  /* @__PURE__ */ Object.assign(CollectionItemSlot, {
    displayName: ITEM_SLOT_NAME
  });
  function useCollection(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = import_react6.default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode)
        return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b2) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b2.ref.current)
      );
      return orderedItems;
    }, [
      context.collectionRef,
      context.itemMap
    ]);
    return getItems;
  }
  return [
    {
      Provider: CollectionProvider,
      Slot: CollectionSlot,
      ItemSlot: CollectionItemSlot
    },
    useCollection,
    createCollectionScope
  ];
}

// node_modules/@radix-ui/react-direction/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);
var $f631663db3294ace$var$DirectionContext = /* @__PURE__ */ (0, import_react7.createContext)(void 0);
function $f631663db3294ace$export$b39126d51d94e6f3(localDir) {
  const globalDir = (0, import_react7.useContext)($f631663db3294ace$var$DirectionContext);
  return localDir || globalDir || "ltr";
}

// node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var import_react8 = __toESM(require_react(), 1);
var $3db38b7d1fb3fe6a$var$count = 0;
function $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c() {
  (0, import_react8.useEffect)(() => {
    var _edgeGuards$, _edgeGuards$2;
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", (_edgeGuards$ = edgeGuards[0]) !== null && _edgeGuards$ !== void 0 ? _edgeGuards$ : $3db38b7d1fb3fe6a$var$createFocusGuard());
    document.body.insertAdjacentElement("beforeend", (_edgeGuards$2 = edgeGuards[1]) !== null && _edgeGuards$2 !== void 0 ? _edgeGuards$2 : $3db38b7d1fb3fe6a$var$createFocusGuard());
    $3db38b7d1fb3fe6a$var$count++;
    return () => {
      if ($3db38b7d1fb3fe6a$var$count === 1)
        document.querySelectorAll("[data-radix-focus-guard]").forEach(
          (node) => node.remove()
        );
      $3db38b7d1fb3fe6a$var$count--;
    };
  }, []);
}
function $3db38b7d1fb3fe6a$var$createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.cssText = "outline: none; opacity: 0; position: fixed; pointer-events: none";
  return element;
}

// node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var import_react9 = __toESM(require_react(), 1);
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var $d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var $d3863c46a17e8a28$var$EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
var $d3863c46a17e8a28$export$20e40289641fbbb6 = /* @__PURE__ */ (0, import_react9.forwardRef)((props, forwardedRef) => {
  const { loop = false, trapped = false, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
  const [container1, setContainer] = (0, import_react9.useState)(null);
  const onMountAutoFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onMountAutoFocusProp);
  const onUnmountAutoFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onUnmountAutoFocusProp);
  const lastFocusedElementRef = (0, import_react9.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(
    forwardedRef,
    (node) => setContainer(node)
  );
  const focusScope = (0, import_react9.useRef)({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  (0, import_react9.useEffect)(() => {
    if (trapped) {
      let handleFocusIn = function(event) {
        if (focusScope.paused || !container1)
          return;
        const target = event.target;
        if (container1.contains(target))
          lastFocusedElementRef.current = target;
        else
          $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
            select: true
          });
      }, handleFocusOut = function(event) {
        if (focusScope.paused || !container1)
          return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null)
          return;
        if (!container1.contains(relatedTarget))
          $d3863c46a17e8a28$var$focus(lastFocusedElementRef.current, {
            select: true
          });
      }, handleMutations = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body)
          return;
        for (const mutation of mutations)
          if (mutation.removedNodes.length > 0)
            $d3863c46a17e8a28$var$focus(container1);
      };
      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      const mutationObserver = new MutationObserver(handleMutations);
      if (container1)
        mutationObserver.observe(container1, {
          childList: true,
          subtree: true
        });
      return () => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
        mutationObserver.disconnect();
      };
    }
  }, [
    trapped,
    container1,
    focusScope.paused
  ]);
  (0, import_react9.useEffect)(() => {
    if (container1) {
      $d3863c46a17e8a28$var$focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container1.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
        container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container1.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          $d3863c46a17e8a28$var$focusFirst($d3863c46a17e8a28$var$removeLinks($d3863c46a17e8a28$var$getTabbableCandidates(container1)), {
            select: true
          });
          if (document.activeElement === previouslyFocusedElement)
            $d3863c46a17e8a28$var$focus(container1);
        }
      }
      return () => {
        container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, $d3863c46a17e8a28$var$EVENT_OPTIONS);
          container1.addEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container1.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented)
            $d3863c46a17e8a28$var$focus(previouslyFocusedElement !== null && previouslyFocusedElement !== void 0 ? previouslyFocusedElement : document.body, {
              select: true
            });
          container1.removeEventListener($d3863c46a17e8a28$var$AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          $d3863c46a17e8a28$var$focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [
    container1,
    onMountAutoFocus,
    onUnmountAutoFocus,
    focusScope
  ]);
  const handleKeyDown = (0, import_react9.useCallback)((event) => {
    if (!loop && !trapped)
      return;
    if (focusScope.paused)
      return;
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
    const focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const container = event.currentTarget;
      const [first, last] = $d3863c46a17e8a28$var$getTabbableEdges(container);
      const hasTabbableElementsInside = first && last;
      if (!hasTabbableElementsInside) {
        if (focusedElement === container)
          event.preventDefault();
      } else {
        if (!event.shiftKey && focusedElement === last) {
          event.preventDefault();
          if (loop)
            $d3863c46a17e8a28$var$focus(first, {
              select: true
            });
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault();
          if (loop)
            $d3863c46a17e8a28$var$focus(last, {
              select: true
            });
        }
      }
    }
  }, [
    loop,
    trapped,
    focusScope.paused
  ]);
  return /* @__PURE__ */ (0, import_react9.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    tabIndex: -1
  }, scopeProps, {
    ref: composedRefs,
    onKeyDown: handleKeyDown
  }));
});
function $d3863c46a17e8a28$var$focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    $d3863c46a17e8a28$var$focus(candidate, {
      select
    });
    if (document.activeElement !== previouslyFocusedElement)
      return;
  }
}
function $d3863c46a17e8a28$var$getTabbableEdges(container) {
  const candidates = $d3863c46a17e8a28$var$getTabbableCandidates(container);
  const first = $d3863c46a17e8a28$var$findVisible(candidates, container);
  const last = $d3863c46a17e8a28$var$findVisible(candidates.reverse(), container);
  return [
    first,
    last
  ];
}
function $d3863c46a17e8a28$var$getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
}
function $d3863c46a17e8a28$var$findVisible(elements, container) {
  for (const element of elements) {
    if (!$d3863c46a17e8a28$var$isHidden(element, {
      upTo: container
    }))
      return element;
  }
}
function $d3863c46a17e8a28$var$isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden")
    return true;
  while (node) {
    if (upTo !== void 0 && node === upTo)
      return false;
    if (getComputedStyle(node).display === "none")
      return true;
    node = node.parentElement;
  }
  return false;
}
function $d3863c46a17e8a28$var$isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function $d3863c46a17e8a28$var$focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({
      preventScroll: true
    });
    if (element !== previouslyFocusedElement && $d3863c46a17e8a28$var$isSelectableInput(element) && select)
      element.select();
  }
}
var $d3863c46a17e8a28$var$focusScopesStack = $d3863c46a17e8a28$var$createFocusScopesStack();
function $d3863c46a17e8a28$var$createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope)
        activeFocusScope === null || activeFocusScope === void 0 || activeFocusScope.pause();
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      var _stack$;
      stack = $d3863c46a17e8a28$var$arrayRemove(stack, focusScope);
      (_stack$ = stack[0]) === null || _stack$ === void 0 || _stack$.resume();
    }
  };
}
function $d3863c46a17e8a28$var$arrayRemove(array, item) {
  const updatedArray = [
    ...array
  ];
  const index = updatedArray.indexOf(item);
  if (index !== -1)
    updatedArray.splice(index, 1);
  return updatedArray;
}
function $d3863c46a17e8a28$var$removeLinks(items) {
  return items.filter(
    (item) => item.tagName !== "A"
  );
}

// node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var import_react10 = __toESM(require_react(), 1);
var $d7bdfb9eb0fdf311$var$ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var $d7bdfb9eb0fdf311$var$EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
var $d7bdfb9eb0fdf311$var$GROUP_NAME = "RovingFocusGroup";
var [$d7bdfb9eb0fdf311$var$Collection, $d7bdfb9eb0fdf311$var$useCollection, $d7bdfb9eb0fdf311$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($d7bdfb9eb0fdf311$var$GROUP_NAME);
var [$d7bdfb9eb0fdf311$var$createRovingFocusGroupContext, $d7bdfb9eb0fdf311$export$c7109489551a4f4] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($d7bdfb9eb0fdf311$var$GROUP_NAME, [
  $d7bdfb9eb0fdf311$var$createCollectionScope
]);
var [$d7bdfb9eb0fdf311$var$RovingFocusProvider, $d7bdfb9eb0fdf311$var$useRovingFocusContext] = $d7bdfb9eb0fdf311$var$createRovingFocusGroupContext($d7bdfb9eb0fdf311$var$GROUP_NAME);
var $d7bdfb9eb0fdf311$export$8699f7c8af148338 = /* @__PURE__ */ (0, import_react10.forwardRef)((props, forwardedRef) => {
  return /* @__PURE__ */ (0, import_react10.createElement)($d7bdfb9eb0fdf311$var$Collection.Provider, {
    scope: props.__scopeRovingFocusGroup
  }, /* @__PURE__ */ (0, import_react10.createElement)($d7bdfb9eb0fdf311$var$Collection.Slot, {
    scope: props.__scopeRovingFocusGroup
  }, /* @__PURE__ */ (0, import_react10.createElement)($d7bdfb9eb0fdf311$var$RovingFocusGroupImpl, _extends({}, props, {
    ref: forwardedRef
  }))));
});
var $d7bdfb9eb0fdf311$var$RovingFocusGroupImpl = /* @__PURE__ */ (0, import_react10.forwardRef)((props, forwardedRef) => {
  const { __scopeRovingFocusGroup, orientation, loop = false, dir, currentTabStopId: currentTabStopIdProp, defaultCurrentTabStopId, onCurrentTabStopIdChange, onEntryFocus, ...groupProps } = props;
  const ref = (0, import_react10.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  const [currentTabStopId = null, setCurrentTabStopId] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId,
    onChange: onCurrentTabStopIdChange
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = (0, import_react10.useState)(false);
  const handleEntryFocus = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onEntryFocus);
  const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = (0, import_react10.useRef)(false);
  const [focusableItemsCount, setFocusableItemsCount] = (0, import_react10.useState)(0);
  (0, import_react10.useEffect)(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, handleEntryFocus);
    }
  }, [
    handleEntryFocus
  ]);
  return /* @__PURE__ */ (0, import_react10.createElement)($d7bdfb9eb0fdf311$var$RovingFocusProvider, {
    scope: __scopeRovingFocusGroup,
    orientation,
    dir: direction,
    loop,
    currentTabStopId,
    onItemFocus: (0, import_react10.useCallback)(
      (tabStopId) => setCurrentTabStopId(tabStopId),
      [
        setCurrentTabStopId
      ]
    ),
    onItemShiftTab: (0, import_react10.useCallback)(
      () => setIsTabbingBackOut(true),
      []
    ),
    onFocusableItemAdd: (0, import_react10.useCallback)(
      () => setFocusableItemsCount(
        (prevCount) => prevCount + 1
      ),
      []
    ),
    onFocusableItemRemove: (0, import_react10.useCallback)(
      () => setFocusableItemsCount(
        (prevCount) => prevCount - 1
      ),
      []
    )
  }, /* @__PURE__ */ (0, import_react10.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
    "data-orientation": orientation
  }, groupProps, {
    ref: composedRefs,
    style: {
      outline: "none",
      ...props.style
    },
    onMouseDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onMouseDown, () => {
      isClickFocusRef.current = true;
    }),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocus, (event) => {
      const isKeyboardFocus = !isClickFocusRef.current;
      if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
        const entryFocusEvent = new CustomEvent($d7bdfb9eb0fdf311$var$ENTRY_FOCUS, $d7bdfb9eb0fdf311$var$EVENT_OPTIONS);
        event.currentTarget.dispatchEvent(entryFocusEvent);
        if (!entryFocusEvent.defaultPrevented) {
          const items = getItems().filter(
            (item) => item.focusable
          );
          const activeItem = items.find(
            (item) => item.active
          );
          const currentItem = items.find(
            (item) => item.id === currentTabStopId
          );
          const candidateItems = [
            activeItem,
            currentItem,
            ...items
          ].filter(Boolean);
          const candidateNodes = candidateItems.map(
            (item) => item.ref.current
          );
          $d7bdfb9eb0fdf311$var$focusFirst(candidateNodes);
        }
      }
      isClickFocusRef.current = false;
    }),
    onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onBlur,
      () => setIsTabbingBackOut(false)
    )
  })));
});
var $d7bdfb9eb0fdf311$var$ITEM_NAME = "RovingFocusGroupItem";
var $d7bdfb9eb0fdf311$export$ab9df7c53fe8454 = /* @__PURE__ */ (0, import_react10.forwardRef)((props, forwardedRef) => {
  const { __scopeRovingFocusGroup, focusable = true, active = false, tabStopId, ...itemProps } = props;
  const autoId = $1746a345f3d73bb7$export$f680877a34711e37();
  const id = tabStopId || autoId;
  const context = $d7bdfb9eb0fdf311$var$useRovingFocusContext($d7bdfb9eb0fdf311$var$ITEM_NAME, __scopeRovingFocusGroup);
  const isCurrentTabStop = context.currentTabStopId === id;
  const getItems = $d7bdfb9eb0fdf311$var$useCollection(__scopeRovingFocusGroup);
  const { onFocusableItemAdd, onFocusableItemRemove } = context;
  (0, import_react10.useEffect)(() => {
    if (focusable) {
      onFocusableItemAdd();
      return () => onFocusableItemRemove();
    }
  }, [
    focusable,
    onFocusableItemAdd,
    onFocusableItemRemove
  ]);
  return /* @__PURE__ */ (0, import_react10.createElement)($d7bdfb9eb0fdf311$var$Collection.ItemSlot, {
    scope: __scopeRovingFocusGroup,
    id,
    focusable,
    active
  }, /* @__PURE__ */ (0, import_react10.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends({
    tabIndex: isCurrentTabStop ? 0 : -1,
    "data-orientation": context.orientation
  }, itemProps, {
    ref: forwardedRef,
    onMouseDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onMouseDown, (event) => {
      if (!focusable)
        event.preventDefault();
      else
        context.onItemFocus(id);
    }),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onFocus,
      () => context.onItemFocus(id)
    ),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      if (event.key === "Tab" && event.shiftKey) {
        context.onItemShiftTab();
        return;
      }
      if (event.target !== event.currentTarget)
        return;
      const focusIntent = $d7bdfb9eb0fdf311$var$getFocusIntent(event, context.orientation, context.dir);
      if (focusIntent !== void 0) {
        event.preventDefault();
        const items = getItems().filter(
          (item) => item.focusable
        );
        let candidateNodes = items.map(
          (item) => item.ref.current
        );
        if (focusIntent === "last")
          candidateNodes.reverse();
        else if (focusIntent === "prev" || focusIntent === "next") {
          if (focusIntent === "prev")
            candidateNodes.reverse();
          const currentIndex = candidateNodes.indexOf(event.currentTarget);
          candidateNodes = context.loop ? $d7bdfb9eb0fdf311$var$wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
        }
        setTimeout(
          () => $d7bdfb9eb0fdf311$var$focusFirst(candidateNodes)
        );
      }
    })
  })));
});
var $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function $d7bdfb9eb0fdf311$var$getDirectionAwareKey(key, dir) {
  if (dir !== "rtl")
    return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function $d7bdfb9eb0fdf311$var$getFocusIntent(event, orientation, dir) {
  const key = $d7bdfb9eb0fdf311$var$getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && [
    "ArrowLeft",
    "ArrowRight"
  ].includes(key))
    return void 0;
  if (orientation === "horizontal" && [
    "ArrowUp",
    "ArrowDown"
  ].includes(key))
    return void 0;
  return $d7bdfb9eb0fdf311$var$MAP_KEY_TO_FOCUS_INTENT[key];
}
function $d7bdfb9eb0fdf311$var$focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function $d7bdfb9eb0fdf311$var$wrapArray(array, startIndex) {
  return array.map(
    (_, index) => array[(startIndex + index) % array.length]
  );
}
var $d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9 = $d7bdfb9eb0fdf311$export$8699f7c8af148338;
var $d7bdfb9eb0fdf311$export$6d08773d2e66f8f2 = $d7bdfb9eb0fdf311$export$ab9df7c53fe8454;

// node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        var attr = node.getAttribute(controlAttribute);
        var alreadyHidden = attr !== null && attr !== "false";
        var counterValue = (counterMap.get(node) || 0) + 1;
        var markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenNodes.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledNodes.set(node, true);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "true");
        }
        if (!alreadyHidden) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = parentNode || getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live]")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};

// node_modules/tslib/tslib.es6.mjs
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e2) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e2.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e2.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var React6 = __toESM(require_react());

// node_modules/react-remove-scroll/dist/es2015/UI.js
var React2 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

// node_modules/use-callback-ref/dist/es2015/assignRef.js
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

// node_modules/use-callback-ref/dist/es2015/useRef.js
var import_react11 = __toESM(require_react());
function useCallbackRef(initialValue, callback) {
  var ref = (0, import_react11.useState)(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}

// node_modules/use-callback-ref/dist/es2015/useMergeRef.js
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef(defaultValue || null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef(ref, newValue);
    });
  });
}

// node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign({ async: true, ssr: false }, options);
  return medium;
}

// node_modules/use-sidecar/dist/es2015/exports.js
var React = __toESM(require_react());
var SideCar = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return React.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar;
}

// node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();

// node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {
  return;
};
var RemoveScroll = React2.forwardRef(function(props, parentRef) {
  var ref = React2.useRef(null);
  var _a = React2.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign(__assign({}, rest), callbacks);
  return React2.createElement(
    React2.Fragment,
    null,
    enabled && React2.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref }),
    forwardProps ? React2.cloneElement(React2.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : React2.createElement(Container, __assign({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var React5 = __toESM(require_react());

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var React4 = __toESM(require_react());

// node_modules/react-style-singleton/dist/es2015/hook.js
var React3 = __toESM(require_react());

// node_modules/get-nonce/dist/es2015/index.js
var currentNonce;
var getNonce = function() {
  if (currentNonce) {
    return currentNonce;
  }
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};

// node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};

// node_modules/react-style-singleton/dist/es2015/hook.js
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles, isDynamic) {
    React3.useEffect(function() {
      sheet.add(styles);
      return function() {
        sheet.remove();
      };
    }, [styles && isDynamic]);
  };
};

// node_modules/react-style-singleton/dist/es2015/component.js
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles = _a.styles, dynamic = _a.dynamic;
    useStyle(styles, dynamic);
    return null;
  };
  return Sheet;
};

// node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse2 = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse2(left), parse2(top), parse2(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};

// node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var RemoveScrollBar = function(props) {
  var noRelative = props.noRelative, noImportant = props.noImportant, _a = props.gapMode, gapMode = _a === void 0 ? "margin" : _a;
  var gap = React4.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return React4.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};

// node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var options;
var nonPassive = passiveSupported ? { passive: false } : false;

// node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  var styles = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles[overflow] !== "hidden" && // contains scroll inside self
    !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), s = _a[1], d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (noOverscroll && availableScroll === 0 || !noOverscroll && delta > availableScroll)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (noOverscroll && availableScrollTop === 0 || !noOverscroll && -delta > availableScrollTop)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

// node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = React5.useRef([]);
  var touchStartRef = React5.useRef([0, 0]);
  var activeAxis = React5.useRef();
  var id = React5.useState(idCounter++)[0];
  var Style2 = React5.useState(function() {
    return styleSingleton();
  })[0];
  var lastProps = React5.useRef(props);
  React5.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  React5.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = React5.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
  }, []);
  var shouldPrevent = React5.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e2) {
      return e2.name === event.type && e2.target === event.target && deltaCompare(e2.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = React5.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e2) {
        return e2 !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = React5.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = React5.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = React5.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  React5.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return React5.createElement(
    React5.Fragment,
    null,
    inert ? React5.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? React5.createElement(RemoveScrollBar, { gapMode: "margin" }) : null
  );
}

// node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);

// node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = React6.forwardRef(function(props, ref) {
  return React6.createElement(RemoveScroll, __assign({}, props, { ref, sideCar: sidecar_default }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var Combination_default = ReactRemoveScroll;

// node_modules/@radix-ui/react-menu/dist/index.mjs
var $6cc32821e9371a1c$var$SELECTION_KEYS = [
  "Enter",
  " "
];
var $6cc32821e9371a1c$var$FIRST_KEYS = [
  "ArrowDown",
  "PageUp",
  "Home"
];
var $6cc32821e9371a1c$var$LAST_KEYS = [
  "ArrowUp",
  "PageDown",
  "End"
];
var $6cc32821e9371a1c$var$FIRST_LAST_KEYS = [
  ...$6cc32821e9371a1c$var$FIRST_KEYS,
  ...$6cc32821e9371a1c$var$LAST_KEYS
];
var $6cc32821e9371a1c$var$SUB_OPEN_KEYS = {
  ltr: [
    ...$6cc32821e9371a1c$var$SELECTION_KEYS,
    "ArrowRight"
  ],
  rtl: [
    ...$6cc32821e9371a1c$var$SELECTION_KEYS,
    "ArrowLeft"
  ]
};
var $6cc32821e9371a1c$var$SUB_CLOSE_KEYS = {
  ltr: [
    "ArrowLeft"
  ],
  rtl: [
    "ArrowRight"
  ]
};
var $6cc32821e9371a1c$var$MENU_NAME = "Menu";
var [$6cc32821e9371a1c$var$Collection, $6cc32821e9371a1c$var$useCollection, $6cc32821e9371a1c$var$createCollectionScope] = $e02a7d9cb1dc128c$export$c74125a8e3af6bb2($6cc32821e9371a1c$var$MENU_NAME);
var [$6cc32821e9371a1c$var$createMenuContext, $6cc32821e9371a1c$export$4027731b685e72eb] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($6cc32821e9371a1c$var$MENU_NAME, [
  $6cc32821e9371a1c$var$createCollectionScope,
  $cf1ac5d9fe0e8206$export$722aac194ae923,
  $d7bdfb9eb0fdf311$export$c7109489551a4f4
]);
var $6cc32821e9371a1c$var$usePopperScope = $cf1ac5d9fe0e8206$export$722aac194ae923();
var $6cc32821e9371a1c$var$useRovingFocusGroupScope = $d7bdfb9eb0fdf311$export$c7109489551a4f4();
var [$6cc32821e9371a1c$var$MenuProvider, $6cc32821e9371a1c$var$useMenuContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$MENU_NAME);
var [$6cc32821e9371a1c$var$MenuRootProvider, $6cc32821e9371a1c$var$useMenuRootContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$MENU_NAME);
var $6cc32821e9371a1c$export$d9b273488cd8ce6f = (props) => {
  const { __scopeMenu, open = false, children, dir, onOpenChange, modal = true } = props;
  const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
  const [content, setContent] = (0, import_react12.useState)(null);
  const isUsingKeyboardRef = (0, import_react12.useRef)(false);
  const handleOpenChange = $b1b2314f5f9a1d84$export$25bec8c6f54ee79a(onOpenChange);
  const direction = $f631663db3294ace$export$b39126d51d94e6f3(dir);
  (0, import_react12.useEffect)(() => {
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, {
        capture: true,
        once: true
      });
      document.addEventListener("pointermove", handlePointer, {
        capture: true,
        once: true
      });
    };
    const handlePointer = () => isUsingKeyboardRef.current = false;
    document.addEventListener("keydown", handleKeyDown, {
      capture: true
    });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, {
        capture: true
      });
      document.removeEventListener("pointerdown", handlePointer, {
        capture: true
      });
      document.removeEventListener("pointermove", handlePointer, {
        capture: true
      });
    };
  }, []);
  return /* @__PURE__ */ (0, import_react12.createElement)($cf1ac5d9fe0e8206$export$be92b6f5f03c0fe9, popperScope, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuProvider, {
    scope: __scopeMenu,
    open,
    onOpenChange: handleOpenChange,
    content,
    onContentChange: setContent
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuRootProvider, {
    scope: __scopeMenu,
    onClose: (0, import_react12.useCallback)(
      () => handleOpenChange(false),
      [
        handleOpenChange
      ]
    ),
    isUsingKeyboardRef,
    dir: direction,
    modal
  }, children)));
};
var $6cc32821e9371a1c$export$9fa5ebd18bee4d43 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, ...anchorProps } = props;
  const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
  return /* @__PURE__ */ (0, import_react12.createElement)($cf1ac5d9fe0e8206$export$b688253958b8dfe7, _extends({}, popperScope, anchorProps, {
    ref: forwardedRef
  }));
});
var $6cc32821e9371a1c$var$PORTAL_NAME = "MenuPortal";
var [$6cc32821e9371a1c$var$PortalProvider, $6cc32821e9371a1c$var$usePortalContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$PORTAL_NAME, {
  forceMount: void 0
});
var $6cc32821e9371a1c$export$793392f970497feb = (props) => {
  const { __scopeMenu, forceMount, children, container } = props;
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$PORTAL_NAME, __scopeMenu);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$PortalProvider, {
    scope: __scopeMenu,
    forceMount
  }, /* @__PURE__ */ (0, import_react12.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || context.open
  }, /* @__PURE__ */ (0, import_react12.createElement)($f1701beae083dbae$export$602eac185826482c, {
    asChild: true,
    container
  }, children)));
};
var $6cc32821e9371a1c$var$CONTENT_NAME = "MenuContent";
var [$6cc32821e9371a1c$var$MenuContentProvider, $6cc32821e9371a1c$var$useMenuContentContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$CONTENT_NAME);
var $6cc32821e9371a1c$export$479f0f2f71193efe = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const portalContext = $6cc32821e9371a1c$var$usePortalContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const { forceMount = portalContext.forceMount, ...contentProps } = props;
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$Collection.Provider, {
    scope: props.__scopeMenu
  }, /* @__PURE__ */ (0, import_react12.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || context.open
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$Collection.Slot, {
    scope: props.__scopeMenu
  }, rootContext.modal ? /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuRootContentModal, _extends({}, contentProps, {
    ref: forwardedRef
  })) : /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuRootContentNonModal, _extends({}, contentProps, {
    ref: forwardedRef
  })))));
});
var $6cc32821e9371a1c$var$MenuRootContentModal = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const ref = (0, import_react12.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  (0, import_react12.useEffect)(() => {
    const content = ref.current;
    if (content)
      return hideOthers(content);
  }, []);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuContentImpl, _extends({}, props, {
    ref: composedRefs,
    trapFocus: context.open,
    disableOutsidePointerEvents: context.open,
    disableOutsideScroll: true,
    onFocusOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onFocusOutside,
      (event) => event.preventDefault(),
      {
        checkForDefaultPrevented: false
      }
    ),
    onDismiss: () => context.onOpenChange(false)
  }));
});
var $6cc32821e9371a1c$var$MenuRootContentNonModal = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuContentImpl, _extends({}, props, {
    ref: forwardedRef,
    trapFocus: false,
    disableOutsidePointerEvents: false,
    disableOutsideScroll: false,
    onDismiss: () => context.onOpenChange(false)
  }));
});
var $6cc32821e9371a1c$var$MenuContentImpl = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, loop = false, trapFocus, onOpenAutoFocus, onCloseAutoFocus, disableOutsidePointerEvents, onEntryFocus, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, disableOutsideScroll, ...contentProps } = props;
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, __scopeMenu);
  const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, __scopeMenu);
  const popperScope = $6cc32821e9371a1c$var$usePopperScope(__scopeMenu);
  const rovingFocusGroupScope = $6cc32821e9371a1c$var$useRovingFocusGroupScope(__scopeMenu);
  const getItems = $6cc32821e9371a1c$var$useCollection(__scopeMenu);
  const [currentItemId, setCurrentItemId] = (0, import_react12.useState)(null);
  const contentRef = (0, import_react12.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, contentRef, context.onContentChange);
  const timerRef = (0, import_react12.useRef)(0);
  const searchRef = (0, import_react12.useRef)("");
  const pointerGraceTimerRef = (0, import_react12.useRef)(0);
  const pointerGraceIntentRef = (0, import_react12.useRef)(null);
  const pointerDirRef = (0, import_react12.useRef)("right");
  const lastPointerXRef = (0, import_react12.useRef)(0);
  const ScrollLockWrapper = disableOutsideScroll ? Combination_default : import_react12.Fragment;
  const scrollLockWrapperProps = disableOutsideScroll ? {
    as: $5e63c961fc1ce211$export$8c6ed5c666ac1360,
    allowPinchZoom: true
  } : void 0;
  const handleTypeaheadSearch = (key) => {
    var _items$find, _items$find2;
    const search = searchRef.current + key;
    const items = getItems().filter(
      (item) => !item.disabled
    );
    const currentItem = document.activeElement;
    const currentMatch = (_items$find = items.find(
      (item) => item.ref.current === currentItem
    )) === null || _items$find === void 0 ? void 0 : _items$find.textValue;
    const values = items.map(
      (item) => item.textValue
    );
    const nextMatch = $6cc32821e9371a1c$var$getNextMatch(values, search, currentMatch);
    const newItem = (_items$find2 = items.find(
      (item) => item.textValue === nextMatch
    )) === null || _items$find2 === void 0 ? void 0 : _items$find2.ref.current;
    (function updateSearch(value) {
      searchRef.current = value;
      window.clearTimeout(timerRef.current);
      if (value !== "")
        timerRef.current = window.setTimeout(
          () => updateSearch(""),
          1e3
        );
    })(search);
    if (newItem)
      setTimeout(
        () => newItem.focus()
      );
  };
  (0, import_react12.useEffect)(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  $3db38b7d1fb3fe6a$export$b7ece24a22aeda8c();
  const isPointerMovingToSubmenu = (0, import_react12.useCallback)((event) => {
    var _pointerGraceIntentRe, _pointerGraceIntentRe2;
    const isMovingTowards = pointerDirRef.current === ((_pointerGraceIntentRe = pointerGraceIntentRef.current) === null || _pointerGraceIntentRe === void 0 ? void 0 : _pointerGraceIntentRe.side);
    return isMovingTowards && $6cc32821e9371a1c$var$isPointerInGraceArea(event, (_pointerGraceIntentRe2 = pointerGraceIntentRef.current) === null || _pointerGraceIntentRe2 === void 0 ? void 0 : _pointerGraceIntentRe2.area);
  }, []);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuContentProvider, {
    scope: __scopeMenu,
    searchRef,
    onItemEnter: (0, import_react12.useCallback)((event) => {
      if (isPointerMovingToSubmenu(event))
        event.preventDefault();
    }, [
      isPointerMovingToSubmenu
    ]),
    onItemLeave: (0, import_react12.useCallback)((event) => {
      var _contentRef$current;
      if (isPointerMovingToSubmenu(event))
        return;
      (_contentRef$current = contentRef.current) === null || _contentRef$current === void 0 || _contentRef$current.focus();
      setCurrentItemId(null);
    }, [
      isPointerMovingToSubmenu
    ]),
    onTriggerLeave: (0, import_react12.useCallback)((event) => {
      if (isPointerMovingToSubmenu(event))
        event.preventDefault();
    }, [
      isPointerMovingToSubmenu
    ]),
    pointerGraceTimerRef,
    onPointerGraceIntentChange: (0, import_react12.useCallback)((intent) => {
      pointerGraceIntentRef.current = intent;
    }, [])
  }, /* @__PURE__ */ (0, import_react12.createElement)(ScrollLockWrapper, scrollLockWrapperProps, /* @__PURE__ */ (0, import_react12.createElement)($d3863c46a17e8a28$export$20e40289641fbbb6, {
    asChild: true,
    trapped: trapFocus,
    onMountAutoFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(onOpenAutoFocus, (event) => {
      var _contentRef$current2;
      event.preventDefault();
      (_contentRef$current2 = contentRef.current) === null || _contentRef$current2 === void 0 || _contentRef$current2.focus();
    }),
    onUnmountAutoFocus: onCloseAutoFocus
  }, /* @__PURE__ */ (0, import_react12.createElement)($5cb92bef7577960e$export$177fb62ff3ec1f22, {
    asChild: true,
    disableOutsidePointerEvents,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss
  }, /* @__PURE__ */ (0, import_react12.createElement)($d7bdfb9eb0fdf311$export$be92b6f5f03c0fe9, _extends({
    asChild: true
  }, rovingFocusGroupScope, {
    dir: rootContext.dir,
    orientation: "vertical",
    loop,
    currentTabStopId: currentItemId,
    onCurrentTabStopIdChange: setCurrentItemId,
    onEntryFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(onEntryFocus, (event) => {
      if (!rootContext.isUsingKeyboardRef.current)
        event.preventDefault();
    })
  }), /* @__PURE__ */ (0, import_react12.createElement)($cf1ac5d9fe0e8206$export$7c6e2c02157bb7d2, _extends({
    role: "menu",
    "aria-orientation": "vertical",
    "data-state": $6cc32821e9371a1c$var$getOpenState(context.open),
    "data-radix-menu-content": "",
    dir: rootContext.dir
  }, popperScope, contentProps, {
    ref: composedRefs,
    style: {
      outline: "none",
      ...contentProps.style
    },
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(contentProps.onKeyDown, (event) => {
      const target = event.target;
      const isKeyDownInside = target.closest("[data-radix-menu-content]") === event.currentTarget;
      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
      const isCharacterKey = event.key.length === 1;
      if (isKeyDownInside) {
        if (event.key === "Tab")
          event.preventDefault();
        if (!isModifierKey && isCharacterKey)
          handleTypeaheadSearch(event.key);
      }
      const content = contentRef.current;
      if (event.target !== content)
        return;
      if (!$6cc32821e9371a1c$var$FIRST_LAST_KEYS.includes(event.key))
        return;
      event.preventDefault();
      const items = getItems().filter(
        (item) => !item.disabled
      );
      const candidateNodes = items.map(
        (item) => item.ref.current
      );
      if ($6cc32821e9371a1c$var$LAST_KEYS.includes(event.key))
        candidateNodes.reverse();
      $6cc32821e9371a1c$var$focusFirst(candidateNodes);
    }),
    onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onBlur, (event) => {
      if (!event.currentTarget.contains(event.target)) {
        window.clearTimeout(timerRef.current);
        searchRef.current = "";
      }
    }),
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event) => {
      const target = event.target;
      const pointerXHasChanged = lastPointerXRef.current !== event.clientX;
      if (event.currentTarget.contains(target) && pointerXHasChanged) {
        const newDir = event.clientX > lastPointerXRef.current ? "right" : "left";
        pointerDirRef.current = newDir;
        lastPointerXRef.current = event.clientX;
      }
    }))
  })))))));
});
var $6cc32821e9371a1c$export$dd37bec0e8a99143 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, ...labelProps } = props;
  return /* @__PURE__ */ (0, import_react12.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({}, labelProps, {
    ref: forwardedRef
  }));
});
var $6cc32821e9371a1c$var$ITEM_NAME = "MenuItem";
var $6cc32821e9371a1c$var$ITEM_SELECT = "menu.itemSelect";
var $6cc32821e9371a1c$export$2ce376c2cc3355c8 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { disabled = false, onSelect, ...itemProps } = props;
  const ref = (0, import_react12.useRef)(null);
  const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$ITEM_NAME, props.__scopeMenu);
  const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$ITEM_NAME, props.__scopeMenu);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const isPointerDownRef = (0, import_react12.useRef)(false);
  const handleSelect = () => {
    const menuItem = ref.current;
    if (!disabled && menuItem) {
      const itemSelectEvent = new CustomEvent($6cc32821e9371a1c$var$ITEM_SELECT, {
        bubbles: true,
        cancelable: true
      });
      menuItem.addEventListener(
        $6cc32821e9371a1c$var$ITEM_SELECT,
        (event) => onSelect === null || onSelect === void 0 ? void 0 : onSelect(event),
        {
          once: true
        }
      );
      $8927f6f2acc4f386$export$6d1a0317bde7de7f(menuItem, itemSelectEvent);
      if (itemSelectEvent.defaultPrevented)
        isPointerDownRef.current = false;
      else
        rootContext.onClose();
    }
  };
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuItemImpl, _extends({}, itemProps, {
    ref: composedRefs,
    disabled,
    onClick: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onClick, handleSelect),
    onPointerDown: (event) => {
      var _props$onPointerDown;
      (_props$onPointerDown = props.onPointerDown) === null || _props$onPointerDown === void 0 || _props$onPointerDown.call(props, event);
      isPointerDownRef.current = true;
    },
    onPointerUp: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerUp, (event) => {
      var _event$currentTarget;
      if (!isPointerDownRef.current)
        (_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 || _event$currentTarget.click();
    }),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      const isTypingAhead = contentContext.searchRef.current !== "";
      if (disabled || isTypingAhead && event.key === " ")
        return;
      if ($6cc32821e9371a1c$var$SELECTION_KEYS.includes(event.key)) {
        event.currentTarget.click();
        event.preventDefault();
      }
    })
  }));
});
var $6cc32821e9371a1c$var$MenuItemImpl = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, disabled = false, textValue, ...itemProps } = props;
  const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$ITEM_NAME, __scopeMenu);
  const rovingFocusGroupScope = $6cc32821e9371a1c$var$useRovingFocusGroupScope(__scopeMenu);
  const ref = (0, import_react12.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  const [isFocused, setIsFocused] = (0, import_react12.useState)(false);
  const [textContent, setTextContent] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    const menuItem = ref.current;
    if (menuItem) {
      var _menuItem$textContent;
      setTextContent(((_menuItem$textContent = menuItem.textContent) !== null && _menuItem$textContent !== void 0 ? _menuItem$textContent : "").trim());
    }
  }, [
    itemProps.children
  ]);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$Collection.ItemSlot, {
    scope: __scopeMenu,
    disabled,
    textValue: textValue !== null && textValue !== void 0 ? textValue : textContent
  }, /* @__PURE__ */ (0, import_react12.createElement)($d7bdfb9eb0fdf311$export$6d08773d2e66f8f2, _extends({
    asChild: true
  }, rovingFocusGroupScope, {
    focusable: !disabled
  }), /* @__PURE__ */ (0, import_react12.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    role: "menuitem",
    "data-highlighted": isFocused ? "" : void 0,
    "aria-disabled": disabled || void 0,
    "data-disabled": disabled ? "" : void 0
  }, itemProps, {
    ref: composedRefs,
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event) => {
      if (disabled)
        contentContext.onItemLeave(event);
      else {
        contentContext.onItemEnter(event);
        if (!event.defaultPrevented) {
          const item = event.currentTarget;
          item.focus();
        }
      }
    })),
    onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerLeave, $6cc32821e9371a1c$var$whenMouse(
      (event) => contentContext.onItemLeave(event)
    )),
    onFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onFocus,
      () => setIsFocused(true)
    ),
    onBlur: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      props.onBlur,
      () => setIsFocused(false)
    )
  }))));
});
var $6cc32821e9371a1c$export$f6f243521332502d = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { checked = false, onCheckedChange, ...checkboxItemProps } = props;
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$ItemIndicatorProvider, {
    scope: props.__scopeMenu,
    checked
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$export$2ce376c2cc3355c8, _extends({
    role: "menuitemcheckbox",
    "aria-checked": $6cc32821e9371a1c$var$isIndeterminate(checked) ? "mixed" : checked
  }, checkboxItemProps, {
    ref: forwardedRef,
    "data-state": $6cc32821e9371a1c$var$getCheckedState(checked),
    onSelect: $e42e1063c40fb3ef$export$b9ecd428b558ff10(
      checkboxItemProps.onSelect,
      () => onCheckedChange === null || onCheckedChange === void 0 ? void 0 : onCheckedChange($6cc32821e9371a1c$var$isIndeterminate(checked) ? true : !checked),
      {
        checkForDefaultPrevented: false
      }
    )
  })));
});
var $6cc32821e9371a1c$var$RADIO_GROUP_NAME = "MenuRadioGroup";
var [$6cc32821e9371a1c$var$RadioGroupProvider, $6cc32821e9371a1c$var$useRadioGroupContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$RADIO_GROUP_NAME, {
  value: void 0,
  onValueChange: () => {
  }
});
var $6cc32821e9371a1c$var$RADIO_ITEM_NAME = "MenuRadioItem";
var $6cc32821e9371a1c$export$69bd225e9817f6d0 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { value, ...radioItemProps } = props;
  const context = $6cc32821e9371a1c$var$useRadioGroupContext($6cc32821e9371a1c$var$RADIO_ITEM_NAME, props.__scopeMenu);
  const checked = value === context.value;
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$ItemIndicatorProvider, {
    scope: props.__scopeMenu,
    checked
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$export$2ce376c2cc3355c8, _extends({
    role: "menuitemradio",
    "aria-checked": checked
  }, radioItemProps, {
    ref: forwardedRef,
    "data-state": $6cc32821e9371a1c$var$getCheckedState(checked),
    onSelect: $e42e1063c40fb3ef$export$b9ecd428b558ff10(radioItemProps.onSelect, () => {
      var _context$onValueChang;
      return (_context$onValueChang = context.onValueChange) === null || _context$onValueChang === void 0 ? void 0 : _context$onValueChang.call(context, value);
    }, {
      checkForDefaultPrevented: false
    })
  })));
});
var $6cc32821e9371a1c$var$ITEM_INDICATOR_NAME = "MenuItemIndicator";
var [$6cc32821e9371a1c$var$ItemIndicatorProvider, $6cc32821e9371a1c$var$useItemIndicatorContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$ITEM_INDICATOR_NAME, {
  checked: false
});
var $6cc32821e9371a1c$export$a2593e23056970a3 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, forceMount, ...itemIndicatorProps } = props;
  const indicatorContext = $6cc32821e9371a1c$var$useItemIndicatorContext($6cc32821e9371a1c$var$ITEM_INDICATOR_NAME, __scopeMenu);
  return /* @__PURE__ */ (0, import_react12.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || $6cc32821e9371a1c$var$isIndeterminate(indicatorContext.checked) || indicatorContext.checked === true
  }, /* @__PURE__ */ (0, import_react12.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.span, _extends({}, itemIndicatorProps, {
    ref: forwardedRef,
    "data-state": $6cc32821e9371a1c$var$getCheckedState(indicatorContext.checked)
  })));
});
var $6cc32821e9371a1c$export$1cec7dcdd713e220 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const { __scopeMenu, ...separatorProps } = props;
  return /* @__PURE__ */ (0, import_react12.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.div, _extends({
    role: "separator",
    "aria-orientation": "horizontal"
  }, separatorProps, {
    ref: forwardedRef
  }));
});
var $6cc32821e9371a1c$var$SUB_NAME = "MenuSub";
var [$6cc32821e9371a1c$var$MenuSubProvider, $6cc32821e9371a1c$var$useMenuSubContext] = $6cc32821e9371a1c$var$createMenuContext($6cc32821e9371a1c$var$SUB_NAME);
var $6cc32821e9371a1c$var$SUB_TRIGGER_NAME = "MenuSubTrigger";
var $6cc32821e9371a1c$export$5fbbb3ba7297405f = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
  const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
  const subContext = $6cc32821e9371a1c$var$useMenuSubContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
  const contentContext = $6cc32821e9371a1c$var$useMenuContentContext($6cc32821e9371a1c$var$SUB_TRIGGER_NAME, props.__scopeMenu);
  const openTimerRef = (0, import_react12.useRef)(null);
  const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;
  const scope = {
    __scopeMenu: props.__scopeMenu
  };
  const clearOpenTimer = (0, import_react12.useCallback)(() => {
    if (openTimerRef.current)
      window.clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
  }, []);
  (0, import_react12.useEffect)(
    () => clearOpenTimer,
    [
      clearOpenTimer
    ]
  );
  (0, import_react12.useEffect)(() => {
    const pointerGraceTimer = pointerGraceTimerRef.current;
    return () => {
      window.clearTimeout(pointerGraceTimer);
      onPointerGraceIntentChange(null);
    };
  }, [
    pointerGraceTimerRef,
    onPointerGraceIntentChange
  ]);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$export$9fa5ebd18bee4d43, _extends({
    asChild: true
  }, scope), /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuItemImpl, _extends({
    id: subContext.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": context.open,
    "aria-controls": subContext.contentId,
    "data-state": $6cc32821e9371a1c$var$getOpenState(context.open)
  }, props, {
    ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, subContext.onTriggerChange),
    onClick: (event) => {
      var _props$onClick;
      (_props$onClick = props.onClick) === null || _props$onClick === void 0 || _props$onClick.call(props, event);
      if (props.disabled || event.defaultPrevented)
        return;
      event.currentTarget.focus();
      if (!context.open)
        context.onOpenChange(true);
    },
    onPointerMove: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerMove, $6cc32821e9371a1c$var$whenMouse((event) => {
      contentContext.onItemEnter(event);
      if (event.defaultPrevented)
        return;
      if (!props.disabled && !context.open && !openTimerRef.current) {
        contentContext.onPointerGraceIntentChange(null);
        openTimerRef.current = window.setTimeout(() => {
          context.onOpenChange(true);
          clearOpenTimer();
        }, 100);
      }
    })),
    onPointerLeave: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerLeave, $6cc32821e9371a1c$var$whenMouse((event) => {
      var _context$content;
      clearOpenTimer();
      const contentRect = (_context$content = context.content) === null || _context$content === void 0 ? void 0 : _context$content.getBoundingClientRect();
      if (contentRect) {
        var _context$content2;
        const side = (_context$content2 = context.content) === null || _context$content2 === void 0 ? void 0 : _context$content2.dataset.side;
        const rightSide = side === "right";
        const bleed = rightSide ? -5 : 5;
        const contentNearEdge = contentRect[rightSide ? "left" : "right"];
        const contentFarEdge = contentRect[rightSide ? "right" : "left"];
        contentContext.onPointerGraceIntentChange({
          area: [
            // consistently within polygon bounds
            {
              x: event.clientX + bleed,
              y: event.clientY
            },
            {
              x: contentNearEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.top
            },
            {
              x: contentFarEdge,
              y: contentRect.bottom
            },
            {
              x: contentNearEdge,
              y: contentRect.bottom
            }
          ],
          side
        });
        window.clearTimeout(pointerGraceTimerRef.current);
        pointerGraceTimerRef.current = window.setTimeout(
          () => contentContext.onPointerGraceIntentChange(null),
          300
        );
      } else {
        contentContext.onTriggerLeave(event);
        if (event.defaultPrevented)
          return;
        contentContext.onPointerGraceIntentChange(null);
      }
    })),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      const isTypingAhead = contentContext.searchRef.current !== "";
      if (props.disabled || isTypingAhead && event.key === " ")
        return;
      if ($6cc32821e9371a1c$var$SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
        var _context$content3;
        context.onOpenChange(true);
        (_context$content3 = context.content) === null || _context$content3 === void 0 || _context$content3.focus();
        event.preventDefault();
      }
    })
  })));
});
var $6cc32821e9371a1c$var$SUB_CONTENT_NAME = "MenuSubContent";
var $6cc32821e9371a1c$export$e7142ab31822bde6 = /* @__PURE__ */ (0, import_react12.forwardRef)((props, forwardedRef) => {
  const portalContext = $6cc32821e9371a1c$var$usePortalContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const { forceMount = portalContext.forceMount, ...subContentProps } = props;
  const context = $6cc32821e9371a1c$var$useMenuContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const rootContext = $6cc32821e9371a1c$var$useMenuRootContext($6cc32821e9371a1c$var$CONTENT_NAME, props.__scopeMenu);
  const subContext = $6cc32821e9371a1c$var$useMenuSubContext($6cc32821e9371a1c$var$SUB_CONTENT_NAME, props.__scopeMenu);
  const ref = (0, import_react12.useRef)(null);
  const composedRefs = $6ed0406888f73fc4$export$c7b2cbe3552a0d05(forwardedRef, ref);
  return /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$Collection.Provider, {
    scope: props.__scopeMenu
  }, /* @__PURE__ */ (0, import_react12.createElement)($921a889cee6df7e8$export$99c2b779aa4e8b8b, {
    present: forceMount || context.open
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$Collection.Slot, {
    scope: props.__scopeMenu
  }, /* @__PURE__ */ (0, import_react12.createElement)($6cc32821e9371a1c$var$MenuContentImpl, _extends({
    id: subContext.contentId,
    "aria-labelledby": subContext.triggerId
  }, subContentProps, {
    ref: composedRefs,
    align: "start",
    side: rootContext.dir === "rtl" ? "left" : "right",
    disableOutsidePointerEvents: false,
    disableOutsideScroll: false,
    trapFocus: false,
    onOpenAutoFocus: (event) => {
      var _ref$current;
      if (rootContext.isUsingKeyboardRef.current)
        (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.focus();
      event.preventDefault();
    },
    onCloseAutoFocus: (event) => event.preventDefault(),
    onFocusOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onFocusOutside, (event) => {
      if (event.target !== subContext.trigger)
        context.onOpenChange(false);
    }),
    onEscapeKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onEscapeKeyDown, (event) => {
      rootContext.onClose();
      event.preventDefault();
    }),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      const isKeyDownInside = event.currentTarget.contains(event.target);
      const isCloseKey = $6cc32821e9371a1c$var$SUB_CLOSE_KEYS[rootContext.dir].includes(event.key);
      if (isKeyDownInside && isCloseKey) {
        var _subContext$trigger;
        context.onOpenChange(false);
        (_subContext$trigger = subContext.trigger) === null || _subContext$trigger === void 0 || _subContext$trigger.focus();
        event.preventDefault();
      }
    })
  })))));
});
function $6cc32821e9371a1c$var$getOpenState(open) {
  return open ? "open" : "closed";
}
function $6cc32821e9371a1c$var$isIndeterminate(checked) {
  return checked === "indeterminate";
}
function $6cc32821e9371a1c$var$getCheckedState(checked) {
  return $6cc32821e9371a1c$var$isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
function $6cc32821e9371a1c$var$focusFirst(candidates) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT)
      return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT)
      return;
  }
}
function $6cc32821e9371a1c$var$wrapArray(array, startIndex) {
  return array.map(
    (_, index) => array[(startIndex + index) % array.length]
  );
}
function $6cc32821e9371a1c$var$getNextMatch(values, search, currentMatch) {
  const isRepeated = search.length > 1 && Array.from(search).every(
    (char) => char === search[0]
  );
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = $6cc32821e9371a1c$var$wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter(
      (v2) => v2 !== currentMatch
    );
  const nextMatch = wrappedValues.find(
    (value) => value.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextMatch !== currentMatch ? nextMatch : void 0;
}
function $6cc32821e9371a1c$var$isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function $6cc32821e9371a1c$var$isPointerInGraceArea(event, area) {
  if (!area)
    return false;
  const cursorPos = {
    x: event.clientX,
    y: event.clientY
  };
  return $6cc32821e9371a1c$var$isPointInPolygon(cursorPos, area);
}
function $6cc32821e9371a1c$var$whenMouse(handler) {
  return (event) => event.pointerType === "mouse" ? handler(event) : void 0;
}
var $6cc32821e9371a1c$export$be92b6f5f03c0fe9 = $6cc32821e9371a1c$export$d9b273488cd8ce6f;
var $6cc32821e9371a1c$export$b688253958b8dfe7 = $6cc32821e9371a1c$export$9fa5ebd18bee4d43;
var $6cc32821e9371a1c$export$602eac185826482c = $6cc32821e9371a1c$export$793392f970497feb;
var $6cc32821e9371a1c$export$7c6e2c02157bb7d2 = $6cc32821e9371a1c$export$479f0f2f71193efe;
var $6cc32821e9371a1c$export$b04be29aa201d4f5 = $6cc32821e9371a1c$export$dd37bec0e8a99143;
var $6cc32821e9371a1c$export$6d08773d2e66f8f2 = $6cc32821e9371a1c$export$2ce376c2cc3355c8;
var $6cc32821e9371a1c$export$16ce288f89fa631c = $6cc32821e9371a1c$export$f6f243521332502d;
var $6cc32821e9371a1c$export$371ab307eab489c0 = $6cc32821e9371a1c$export$69bd225e9817f6d0;
var $6cc32821e9371a1c$export$c3468e2714d175fa = $6cc32821e9371a1c$export$a2593e23056970a3;
var $6cc32821e9371a1c$export$1ff3c3f08ae963c0 = $6cc32821e9371a1c$export$1cec7dcdd713e220;
var $6cc32821e9371a1c$export$2ea8a7a591ac5eac = $6cc32821e9371a1c$export$5fbbb3ba7297405f;
var $6cc32821e9371a1c$export$6d4de93b380beddf = $6cc32821e9371a1c$export$e7142ab31822bde6;

// node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var $d08ef79370b62062$var$DROPDOWN_MENU_NAME = "DropdownMenu";
var [$d08ef79370b62062$var$createDropdownMenuContext, $d08ef79370b62062$export$c0623cd925aeb687] = $c512c27ab02ef895$export$50c7b4e9d9f19c1($d08ef79370b62062$var$DROPDOWN_MENU_NAME, [
  $6cc32821e9371a1c$export$4027731b685e72eb
]);
var $d08ef79370b62062$var$useMenuScope = $6cc32821e9371a1c$export$4027731b685e72eb();
var [$d08ef79370b62062$var$DropdownMenuProvider, $d08ef79370b62062$var$useDropdownMenuContext] = $d08ef79370b62062$var$createDropdownMenuContext($d08ef79370b62062$var$DROPDOWN_MENU_NAME);
var $d08ef79370b62062$export$e44a253a59704894 = (props) => {
  const { __scopeDropdownMenu, children, dir, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  const triggerRef = (0, import_react13.useRef)(null);
  const [open = false, setOpen] = $71cd76cc60e0454e$export$6f32135080cb4c3({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange
  });
  return /* @__PURE__ */ (0, import_react13.createElement)($d08ef79370b62062$var$DropdownMenuProvider, {
    scope: __scopeDropdownMenu,
    triggerId: $1746a345f3d73bb7$export$f680877a34711e37(),
    triggerRef,
    contentId: $1746a345f3d73bb7$export$f680877a34711e37(),
    open,
    onOpenChange: setOpen,
    onOpenToggle: (0, import_react13.useCallback)(
      () => setOpen(
        (prevOpen) => !prevOpen
      ),
      [
        setOpen
      ]
    ),
    modal
  }, /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$be92b6f5f03c0fe9, _extends({}, menuScope, {
    open,
    onOpenChange: setOpen,
    dir,
    modal
  }), children));
};
var $d08ef79370b62062$var$TRIGGER_NAME = "DropdownMenuTrigger";
var $d08ef79370b62062$export$d2469213b3befba9 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, disabled = false, ...triggerProps } = props;
  const context = $d08ef79370b62062$var$useDropdownMenuContext($d08ef79370b62062$var$TRIGGER_NAME, __scopeDropdownMenu);
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$b688253958b8dfe7, _extends({
    asChild: true
  }, menuScope), /* @__PURE__ */ (0, import_react13.createElement)($8927f6f2acc4f386$export$250ffa63cdc0d034.button, _extends({
    type: "button",
    id: context.triggerId,
    "aria-haspopup": "menu",
    "aria-expanded": context.open,
    "aria-controls": context.open ? context.contentId : void 0,
    "data-state": context.open ? "open" : "closed",
    "data-disabled": disabled ? "" : void 0,
    disabled
  }, triggerProps, {
    ref: $6ed0406888f73fc4$export$43e446d32b3d21af(forwardedRef, context.triggerRef),
    onPointerDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onPointerDown, (event) => {
      if (!disabled && event.button === 0 && event.ctrlKey === false) {
        context.onOpenToggle();
        if (!context.open)
          event.preventDefault();
      }
    }),
    onKeyDown: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onKeyDown, (event) => {
      if (disabled)
        return;
      if ([
        "Enter",
        " "
      ].includes(event.key))
        context.onOpenToggle();
      if (event.key === "ArrowDown")
        context.onOpenChange(true);
      if ([
        "Enter",
        " ",
        "ArrowDown"
      ].includes(event.key))
        event.preventDefault();
    })
  })));
});
var $d08ef79370b62062$export$cd369b4d4d54efc9 = (props) => {
  const { __scopeDropdownMenu, ...portalProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$602eac185826482c, _extends({}, menuScope, portalProps));
};
var $d08ef79370b62062$var$CONTENT_NAME = "DropdownMenuContent";
var $d08ef79370b62062$export$6e76d93a37c01248 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...contentProps } = props;
  const context = $d08ef79370b62062$var$useDropdownMenuContext($d08ef79370b62062$var$CONTENT_NAME, __scopeDropdownMenu);
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  const hasInteractedOutsideRef = (0, import_react13.useRef)(false);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$7c6e2c02157bb7d2, _extends({
    id: context.contentId,
    "aria-labelledby": context.triggerId
  }, menuScope, contentProps, {
    ref: forwardedRef,
    onCloseAutoFocus: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onCloseAutoFocus, (event) => {
      var _context$triggerRef$c;
      if (!hasInteractedOutsideRef.current)
        (_context$triggerRef$c = context.triggerRef.current) === null || _context$triggerRef$c === void 0 || _context$triggerRef$c.focus();
      hasInteractedOutsideRef.current = false;
      event.preventDefault();
    }),
    onInteractOutside: $e42e1063c40fb3ef$export$b9ecd428b558ff10(props.onInteractOutside, (event) => {
      const originalEvent = event.detail.originalEvent;
      const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
      const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
      if (!context.modal || isRightClick)
        hasInteractedOutsideRef.current = true;
    }),
    style: {
      ...props.style,
      "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
      "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
      "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }));
});
var $d08ef79370b62062$export$76e48c5b57f24495 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...labelProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$b04be29aa201d4f5, _extends({}, menuScope, labelProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$ed97964d1871885d = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$6d08773d2e66f8f2, _extends({}, menuScope, itemProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$53a69729da201fa9 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...checkboxItemProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$16ce288f89fa631c, _extends({}, menuScope, checkboxItemProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$e4f69b41b1637536 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...radioItemProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$371ab307eab489c0, _extends({}, menuScope, radioItemProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$42355ae145153fb6 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...itemIndicatorProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$c3468e2714d175fa, _extends({}, menuScope, itemIndicatorProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$da160178fd3bc7e9 = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...separatorProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$1ff3c3f08ae963c0, _extends({}, menuScope, separatorProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$21dcb7ec56f874cf = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subTriggerProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$2ea8a7a591ac5eac, _extends({}, menuScope, subTriggerProps, {
    ref: forwardedRef
  }));
});
var $d08ef79370b62062$export$f34ec8bc2482cc5f = /* @__PURE__ */ (0, import_react13.forwardRef)((props, forwardedRef) => {
  const { __scopeDropdownMenu, ...subContentProps } = props;
  const menuScope = $d08ef79370b62062$var$useMenuScope(__scopeDropdownMenu);
  return /* @__PURE__ */ (0, import_react13.createElement)($6cc32821e9371a1c$export$6d4de93b380beddf, _extends({}, menuScope, subContentProps, {
    ref: forwardedRef,
    style: {
      ...props.style,
      "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
      "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
      "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
      "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
      "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
    }
  }));
});
var $d08ef79370b62062$export$be92b6f5f03c0fe9 = $d08ef79370b62062$export$e44a253a59704894;
var $d08ef79370b62062$export$41fb9f06171c75f4 = $d08ef79370b62062$export$d2469213b3befba9;
var $d08ef79370b62062$export$602eac185826482c = $d08ef79370b62062$export$cd369b4d4d54efc9;
var $d08ef79370b62062$export$7c6e2c02157bb7d2 = $d08ef79370b62062$export$6e76d93a37c01248;
var $d08ef79370b62062$export$b04be29aa201d4f5 = $d08ef79370b62062$export$76e48c5b57f24495;
var $d08ef79370b62062$export$6d08773d2e66f8f2 = $d08ef79370b62062$export$ed97964d1871885d;
var $d08ef79370b62062$export$16ce288f89fa631c = $d08ef79370b62062$export$53a69729da201fa9;
var $d08ef79370b62062$export$371ab307eab489c0 = $d08ef79370b62062$export$e4f69b41b1637536;
var $d08ef79370b62062$export$c3468e2714d175fa = $d08ef79370b62062$export$42355ae145153fb6;
var $d08ef79370b62062$export$1ff3c3f08ae963c0 = $d08ef79370b62062$export$da160178fd3bc7e9;
var $d08ef79370b62062$export$2ea8a7a591ac5eac = $d08ef79370b62062$export$21dcb7ec56f874cf;
var $d08ef79370b62062$export$6d4de93b380beddf = $d08ef79370b62062$export$f34ec8bc2482cc5f;

// app/components/ui/dropdown-menu.tsx
var React7 = __toESM(require_react(), 1);
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/ui/dropdown-menu.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ui/dropdown-menu.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
var DropdownMenu = $d08ef79370b62062$export$be92b6f5f03c0fe9;
var DropdownMenuTrigger = $d08ef79370b62062$export$41fb9f06171c75f4;
var DropdownMenuPortal = $d08ef79370b62062$export$602eac185826482c;
var DropdownMenuSubTrigger = React7.forwardRef(_c3 = ({
  className,
  inset,
  children,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$2ea8a7a591ac5eac, { ref, className: cn("flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent", inset && "pl-8", className), ...props, children: [
  children,
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "ml-auto h-4 w-4", children: "\u25B6\uFE0F" }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 37,
    columnNumber: 3
  }, this)
] }, void 0, true, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 35,
  columnNumber: 12
}, this));
_c23 = DropdownMenuSubTrigger;
DropdownMenuSubTrigger.displayName = $d08ef79370b62062$export$2ea8a7a591ac5eac.displayName;
var DropdownMenuSubContent = React7.forwardRef(_c32 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$6d4de93b380beddf, { ref, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 44,
  columnNumber: 12
}, this));
_c4 = DropdownMenuSubContent;
DropdownMenuSubContent.displayName = $d08ef79370b62062$export$6d4de93b380beddf.displayName;
var DropdownMenuContent = React7.forwardRef(_c5 = ({
  className,
  sideOffset = 4,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$602eac185826482c, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$7c6e2c02157bb7d2, { ref, sideOffset, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 52,
  columnNumber: 3
}, this) }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 51,
  columnNumber: 12
}, this));
_c6 = DropdownMenuContent;
DropdownMenuContent.displayName = $d08ef79370b62062$export$7c6e2c02157bb7d2.displayName;
var DropdownMenuItem = React7.forwardRef(_c7 = ({
  className,
  inset,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$6d08773d2e66f8f2, { ref, className: cn("relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", inset && "pl-8", className), ...props }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 60,
  columnNumber: 12
}, this));
_c8 = DropdownMenuItem;
DropdownMenuItem.displayName = $d08ef79370b62062$export$6d08773d2e66f8f2.displayName;
var DropdownMenuCheckboxItem = React7.forwardRef(_c9 = ({
  className,
  children,
  checked,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$16ce288f89fa631c, { ref, className: cn("relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), checked, ...props, children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$c3468e2714d175fa, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "h-4 w-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("path", { d: "M1,4 L3,6 L7,2", stroke: "black", strokeWidth: "1", fill: "none" }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 73,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 72,
    columnNumber: 6
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 71,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 70,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 69,
    columnNumber: 3
  }, this),
  children
] }, void 0, true, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 68,
  columnNumber: 12
}, this));
_c10 = DropdownMenuCheckboxItem;
DropdownMenuCheckboxItem.displayName = $d08ef79370b62062$export$16ce288f89fa631c.displayName;
var DropdownMenuRadioItem = React7.forwardRef(_c11 = ({
  className,
  children,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$371ab307eab489c0, { ref, className: cn("relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), ...props, children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$c3468e2714d175fa, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "h-2 w-2", children: "\u26AA" }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 88,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 87,
    columnNumber: 3
  }, this),
  children
] }, void 0, true, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 86,
  columnNumber: 12
}, this));
_c12 = DropdownMenuRadioItem;
DropdownMenuRadioItem.displayName = $d08ef79370b62062$export$371ab307eab489c0.displayName;
var DropdownMenuLabel = React7.forwardRef(_c13 = ({
  className,
  inset,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$b04be29aa201d4f5, { ref, className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className), ...props }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 100,
  columnNumber: 12
}, this));
_c14 = DropdownMenuLabel;
DropdownMenuLabel.displayName = $d08ef79370b62062$export$b04be29aa201d4f5.displayName;
var DropdownMenuSeparator = React7.forwardRef(_c15 = ({
  className,
  ...props
}, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)($d08ef79370b62062$export$1ff3c3f08ae963c0, { ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props }, void 0, false, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 106,
  columnNumber: 12
}, this));
_c16 = DropdownMenuSeparator;
DropdownMenuSeparator.displayName = $d08ef79370b62062$export$1ff3c3f08ae963c0.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), ...props }, void 0, false, {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 113,
    columnNumber: 10
  }, this);
};
_c17 = DropdownMenuShortcut;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var _c3;
var _c23;
var _c32;
var _c4;
var _c5;
var _c6;
var _c7;
var _c8;
var _c9;
var _c10;
var _c11;
var _c12;
var _c13;
var _c14;
var _c15;
var _c16;
var _c17;
$RefreshReg$(_c3, "DropdownMenuSubTrigger$React.forwardRef");
$RefreshReg$(_c23, "DropdownMenuSubTrigger");
$RefreshReg$(_c32, "DropdownMenuSubContent$React.forwardRef");
$RefreshReg$(_c4, "DropdownMenuSubContent");
$RefreshReg$(_c5, "DropdownMenuContent$React.forwardRef");
$RefreshReg$(_c6, "DropdownMenuContent");
$RefreshReg$(_c7, "DropdownMenuItem$React.forwardRef");
$RefreshReg$(_c8, "DropdownMenuItem");
$RefreshReg$(_c9, "DropdownMenuCheckboxItem$React.forwardRef");
$RefreshReg$(_c10, "DropdownMenuCheckboxItem");
$RefreshReg$(_c11, "DropdownMenuRadioItem$React.forwardRef");
$RefreshReg$(_c12, "DropdownMenuRadioItem");
$RefreshReg$(_c13, "DropdownMenuLabel$React.forwardRef");
$RefreshReg$(_c14, "DropdownMenuLabel");
$RefreshReg$(_c15, "DropdownMenuSeparator$React.forwardRef");
$RefreshReg$(_c16, "DropdownMenuSeparator");
$RefreshReg$(_c17, "DropdownMenuShortcut");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/styles/font.css
var font_default = "/build/_assets/font-ISWYXDEE.css";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-NJPDFGSZ.css";

// app/root.tsx
var import_auth_server = __toESM(require_auth_server(), 1);

// node_modules/@epic-web/client-hints/dist/index.js
function getHintUtils(hints) {
  function getCookieValue(cookieString, name) {
    const hint = hints[name];
    if (!hint) {
      throw new Error(`Unknown client hint: ${typeof name === "string" ? name : "Unknown"}`);
    }
    const value = cookieString.split(";").map((c) => c.trim()).find((c) => c.startsWith(hint.cookieName + "="))?.split("=")[1];
    return value ? decodeURIComponent(value) : null;
  }
  function getHints2(request) {
    const cookieString = typeof document !== "undefined" ? document.cookie : typeof request !== "undefined" ? request.headers.get("Cookie") ?? "" : "";
    return Object.entries(hints).reduce((acc, [name, hint]) => {
      const hintName = name;
      if ("transform" in hint) {
        acc[hintName] = hint.transform(getCookieValue(cookieString, hintName) ?? hint.fallback);
      } else {
        acc[hintName] = getCookieValue(cookieString, hintName) ?? hint.fallback;
      }
      return acc;
    }, {});
  }
  function getClientHintCheckScript() {
    return `
const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
	const [key, value] = cur.split('=');
	acc[key] = value;
	return acc;
}, {});
let cookieChanged = false;
const hints = [
${Object.values(hints).map((hint) => {
      const cookieName = JSON.stringify(hint.cookieName);
      return `{ name: ${cookieName}, actual: String(${hint.getValueCode}), cookie: cookies[${cookieName}] }`;
    }).join(",\n")}
];
for (const hint of hints) {
	if (decodeURIComponent(hint.cookie) !== hint.actual) {
		cookieChanged = true;
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + '; Max-Age=31536000; path=/';
	}
}
// if the cookie changed, reload the page, unless the browser doesn't support
// cookies (in which case we would enter an infinite loop of reloads)
if (cookieChanged && navigator.cookieEnabled) {
	window.location.reload();
}
			`;
  }
  return { getHints: getHints2, getClientHintCheckScript };
}

// node_modules/@epic-web/client-hints/dist/color-scheme.js
var clientHint = {
  cookieName: "CH-prefers-color-scheme",
  getValueCode: `window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'`,
  fallback: "light",
  transform(value) {
    return value === "dark" ? "dark" : "light";
  }
};
function subscribeToSchemeChange(subscriber, cookieName = clientHint.cookieName) {
  const schemaMatch = window.matchMedia("(prefers-color-scheme: dark)");
  function handleThemeChange() {
    const value = schemaMatch.matches ? "dark" : "light";
    document.cookie = `${cookieName}=${value}; Max-Age=31536000; Path=/`;
    subscriber(value);
  }
  schemaMatch.addEventListener("change", handleThemeChange);
  return function cleanupSchemaChange() {
    schemaMatch.removeEventListener("change", handleThemeChange);
  };
}

// node_modules/@epic-web/client-hints/dist/time-zone.js
var clientHint2 = {
  cookieName: "CH-time-zone",
  getValueCode: "Intl.DateTimeFormat().resolvedOptions().timeZone",
  fallback: "UTC"
};

// app/utils/client-hints.tsx
var React8 = __toESM(require_react(), 1);

// app/utils/request-info.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/request-info.ts"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
function useRequestInfo() {
  const data = useRouteLoaderData("root");
  invariant(data?.requestInfo, "No requestInfo found in root loader");
  return data.requestInfo;
}

// app/utils/client-hints.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/utils/client-hints.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s3 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/client-hints.tsx"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
var hintsUtils = getHintUtils({
  theme: clientHint,
  timeZone: clientHint2
  // add other hints here
});
var {
  getHints
} = hintsUtils;
function useHints() {
  _s3();
  const requestInfo = useRequestInfo();
  return requestInfo.hints;
}
_s3(useHints, "7GAbGGZBfQ5CZ09LzgbRSVzv82k=", false, function() {
  return [useRequestInfo];
});
function ClientHintCheck({
  nonce
}) {
  _s22();
  const {
    revalidate
  } = useRevalidator();
  React8.useEffect(() => subscribeToSchemeChange(() => revalidate()), [revalidate]);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("script", { nonce, dangerouslySetInnerHTML: {
    __html: hintsUtils.getClientHintCheckScript()
  } }, void 0, false, {
    fileName: "app/utils/client-hints.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
_s22(ClientHintCheck, "L1dc0F01n381QK//sAnvnvJbeZg=", false, function() {
  return [useRevalidator];
});
_c18 = ClientHintCheck;
var _c18;
$RefreshReg$(_c18, "ClientHintCheck");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/root.tsx
var import_csrf_server = __toESM(require_csrf_server(), 1);
var import_db_server = __toESM(require_db_server(), 1);
var import_env_server = __toESM(require_env_server(), 1);
var import_honeypot_server = __toESM(require_honeypot_server(), 1);

// app/utils/nonce-provider.ts
var React9 = __toESM(require_react(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/nonce-provider.ts"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
var NonceContext = React9.createContext("");
var NonceProvider = NonceContext.Provider;
var useNonce = () => React9.useContext(NonceContext);

// app/root.tsx
var import_theme_server = __toESM(require_theme_server(), 1);
var import_timing_server = __toESM(require_timing_server(), 1);
var import_toast_server = __toESM(require_toast_server(), 1);
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s4 = $RefreshSig$();
var _s23 = $RefreshSig$();
var _s32 = $RefreshSig$();
var _s42 = $RefreshSig$();
var _s5 = $RefreshSig$();
var _s6 = $RefreshSig$();
var _s7 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
}
var links = () => {
  return [
    // Preload svg sprite as a resource to avoid render blocking
    {
      rel: "preload",
      href: sprite_default,
      as: "image"
    },
    // Preload CSS as a resource to avoid render blocking
    {
      rel: "preload",
      href: font_default,
      as: "style"
    },
    {
      rel: "preload",
      href: tailwind_default,
      as: "style"
    },
    cssBundleHref ? {
      rel: "preload",
      href: cssBundleHref,
      as: "style"
    } : null,
    {
      rel: "mask-icon",
      href: "/favicons/mask-icon.svg"
    },
    {
      rel: "alternate icon",
      type: "image/png",
      href: "/favicons/favicon-32x32.png"
    },
    {
      rel: "apple-touch-icon",
      href: "/favicons/apple-touch-icon.png"
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
      crossOrigin: "use-credentials"
    },
    // necessary to make typescript happy
    //These should match the css preloads above to avoid css as render blocking resource
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicons/favicon.svg"
    },
    {
      rel: "stylesheet",
      href: font_default
    },
    {
      rel: "stylesheet",
      href: tailwind_default
    },
    cssBundleHref ? {
      rel: "stylesheet",
      href: cssBundleHref
    } : null
  ].filter(Boolean);
};
var meta = ({
  data
}) => {
  return [{
    title: data ? "Epic Notes" : "Error | Epic Notes"
  }, {
    name: "description",
    content: `Your own captain's log`
  }];
};
var ThemeFormSchema = z.object({
  theme: z.enum(["system", "light", "dark"])
});
function Document({
  children,
  nonce,
  theme = "light",
  env = {}
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("html", { lang: "en", className: `${theme} h-full overflow-x-hidden`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ClientHintCheck, { nonce }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 253,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 254,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 255,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 256,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 257,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 252,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("body", { className: "bg-background text-foreground", children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("script", { nonce, dangerouslySetInnerHTML: {
        __html: `window.ENV = ${JSON.stringify(env)}`
      } }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 261,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ScrollRestoration, { nonce }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 265,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Scripts, { nonce }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 266,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(LiveReload, { nonce }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 267,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 259,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 251,
    columnNumber: 10
  }, this);
}
_c19 = Document;
function App() {
  _s4();
  const data = useLoaderData();
  const nonce = useNonce();
  const user = useOptionalUser();
  const theme = useTheme();
  const matches = useMatches();
  const isOnSearchPage = matches.find((m) => m.id === "routes/users+/index");
  const searchBar = isOnSearchPage ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(SearchBar, { status: "idle" }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 280,
    columnNumber: 45
  }, this);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Document, { nonce, theme, env: data.ENV, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex h-screen flex-col justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("header", { className: "container py-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("nav", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "/", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "font-light", children: "epic" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 287,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "font-bold", children: "notes" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 288,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 286,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "ml-auto hidden max-w-sm flex-1 sm:block", children: searchBar }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 290,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex items-center gap-10", children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(UserDropdown, {}, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 294,
          columnNumber: 17
        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { asChild: true, variant: "default", size: "sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "/login", children: "Log In" }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 295,
          columnNumber: 11
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 294,
          columnNumber: 36
        }, this) }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 293,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "block w-full sm:hidden", children: searchBar }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 299,
          columnNumber: 8
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 285,
        columnNumber: 7
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 284,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 283,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 305,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 304,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "container flex justify-between pb-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { to: "/", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "font-light", children: "epic" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 310,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "font-bold", children: "notes" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 311,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 309,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ThemeSwitch, { userPreference: data.requestInfo.userPrefs.theme }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 313,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 308,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 282,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(EpicToaster, { toast: data.toast }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 316,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(EpicProgress, {}, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 317,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 281,
    columnNumber: 10
  }, this);
}
_s4(App, "Ww9DDRzzndcZ3+AVHLXNJYaW4DE=", false, function() {
  return [useLoaderData, useNonce, useOptionalUser, useTheme, useMatches];
});
_c24 = App;
function AppWithProviders() {
  _s23();
  const data = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(AuthenticityTokenProvider, { token: data.csrfToken, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(HoneypotProvider, { ...data.honeyProps, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(App, {}, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 329,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 328,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 327,
    columnNumber: 10
  }, this);
}
_s23(AppWithProviders, "5thj+e1edPyRpKif1JmVRC6KArE=", false, function() {
  return [useLoaderData];
});
_c33 = AppWithProviders;
var root_default = _c42 = withSentry(AppWithProviders);
function UserDropdown() {
  _s32();
  const user = useUser();
  const submit = useSubmit();
  const formRef = (0, import_react18.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenu, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Button, { asChild: true, variant: "secondary", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
      Link,
      {
        to: `/users/${user.username}`,
        onClick: (e2) => e2.preventDefault(),
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("img", { className: "h-8 w-8 rounded-full object-cover", alt: user.name ?? user.username, src: getUserImgSrc(user.image?.id) }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 350,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-body-sm font-bold", children: user.name ?? user.username }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 352,
            columnNumber: 7
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "app/root.tsx",
        lineNumber: 346,
        columnNumber: 6
      },
      this
    ) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 345,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 344,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenuContent, { sideOffset: 8, align: "start", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { prefetch: "intent", to: `/users/${user.username}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { className: "text-body-md", name: "avatar", children: "Profile" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 362,
        columnNumber: 8
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 361,
        columnNumber: 7
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 360,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Link, { prefetch: "intent", to: `/users/${user.username}/notes`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { className: "text-body-md", name: "pencil-2", children: "Notes" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 369,
        columnNumber: 8
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 368,
        columnNumber: 7
      }, this) }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 367,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        DropdownMenuItem,
        {
          asChild: true,
          onSelect: (event) => {
            event.preventDefault();
            submit(formRef.current);
          },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Form, { action: "/logout", method: "POST", ref: formRef, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { className: "text-body-md", name: "exit", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { type: "submit", children: "Logout" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 383,
            columnNumber: 9
          }, this) }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 382,
            columnNumber: 8
          }, this) }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 381,
            columnNumber: 7
          }, this)
        },
        void 0,
        false,
        {
          fileName: "app/root.tsx",
          lineNumber: 374,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 359,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 358,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 343,
    columnNumber: 10
  }, this);
}
_s32(UserDropdown, "GiYd3mw2i4e4eBV25q+8c1DvoZc=", false, function() {
  return [useUser, useSubmit];
});
_c52 = UserDropdown;
function useTheme() {
  _s42();
  const hints = useHints();
  const requestInfo = useRequestInfo();
  const optimisticMode = useOptimisticThemeMode();
  if (optimisticMode) {
    return optimisticMode === "system" ? hints.theme : optimisticMode;
  }
  return requestInfo.userPrefs.theme ?? hints.theme;
}
_s42(useTheme, "JyetDj7pYXDjfsAfIcf5oMOz00Y=", false, function() {
  return [useHints, useRequestInfo, useOptimisticThemeMode];
});
function useOptimisticThemeMode() {
  _s5();
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find((f) => f.formAction === "/");
  if (themeFetcher && themeFetcher.formData) {
    const submission = parse(themeFetcher.formData, {
      schema: ThemeFormSchema
    });
    return submission.value?.theme;
  }
}
_s5(useOptimisticThemeMode, "ZAoh5/+oZaZzKGX88/4q063VSFM=", false, function() {
  return [useFetchers];
});
function ThemeSwitch({
  userPreference
}) {
  _s6();
  const fetcher = useFetcher();
  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission
  });
  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreference ?? "system";
  const nextMode = mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const modeLabel = {
    light: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { name: "sun", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Light" }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 446,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 445,
      columnNumber: 12
    }, this),
    dark: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { name: "moon", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "Dark" }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 449,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 448,
      columnNumber: 11
    }, this),
    system: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Icon, { name: "laptop", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "sr-only", children: "System" }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 452,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 451,
      columnNumber: 13
    }, this)
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(fetcher.Form, { method: "POST", ...form.props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("input", { type: "hidden", name: "theme", value: nextMode }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 456,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("button", { type: "submit", className: "flex h-8 w-8 cursor-pointer items-center justify-center", children: modeLabel[mode] }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 458,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 457,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(ErrorList, { errors: form.errors, id: form.errorId }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 463,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 455,
    columnNumber: 10
  }, this);
}
_s6(ThemeSwitch, "uagBKBd+jjGPlAeXi0p1Kt1UeRY=", false, function() {
  return [useFetcher, useForm, useOptimisticThemeMode];
});
_c62 = ThemeSwitch;
function ErrorBoundary() {
  _s7();
  const nonce = useNonce();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(Document, { nonce, children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(GeneralErrorBoundary, {}, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 484,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 483,
    columnNumber: 10
  }, this);
}
_s7(ErrorBoundary, "fTu1PJvfUhwKAAPh1vkoJap6Hoo=", false, function() {
  return [useNonce];
});
_c72 = ErrorBoundary;
var _c19;
var _c24;
var _c33;
var _c42;
var _c52;
var _c62;
var _c72;
$RefreshReg$(_c19, "Document");
$RefreshReg$(_c24, "App");
$RefreshReg$(_c33, "AppWithProviders");
$RefreshReg$(_c42, "%default%");
$RefreshReg$(_c52, "UserDropdown");
$RefreshReg$(_c62, "ThemeSwitch");
$RefreshReg$(_c72, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  root_default as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-HEG7BLOT.js.map
