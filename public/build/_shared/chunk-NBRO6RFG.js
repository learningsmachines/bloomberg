import {
  createHotContext
} from "/build/_shared/chunk-76ZEIH4H.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/spacer.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/spacer.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/spacer.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
function Spacer({
  size
}) {
  const options = {
    "4xs": "h-4",
    "3xs": "h-8",
    "2xs": "h-12",
    xs: "h-16",
    sm: "h-20",
    md: "h-24",
    lg: "h-28",
    xl: "h-32",
    "2xl": "h-36",
    "3xl": "h-40",
    "4xl": "h-44"
  };
  const className = options[size];
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className }, void 0, false, {
    fileName: "app/components/spacer.tsx",
    lineNumber: 38,
    columnNumber: 10
  }, this);
}
_c = Spacer;
var _c;
$RefreshReg$(_c, "Spacer");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  Spacer
};
//# sourceMappingURL=/build/_shared/chunk-NBRO6RFG.js.map
