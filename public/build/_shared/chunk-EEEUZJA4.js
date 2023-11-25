import {
  StatusButton
} from "/build/_shared/chunk-SS7EHFNL.js";
import {
  Input,
  Label
} from "/build/_shared/chunk-H2TCL2LU.js";
import {
  Icon
} from "/build/_shared/chunk-HGS2R3YL.js";
import {
  useDebounce,
  useIsPending
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Form,
  useSearchParams,
  useSubmit
} from "/build/_shared/chunk-PHQUHPUM.js";
import {
  createHotContext
} from "/build/_shared/chunk-76ZEIH4H.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/search-bar.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/search-bar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/search-bar.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
function SearchBar({
  status,
  autoFocus = false,
  autoSubmit = false
}) {
  _s();
  const id = (0, import_react2.useId)();
  const [searchParams] = useSearchParams();
  const submit = useSubmit();
  const isSubmitting = useIsPending({
    formMethod: "GET",
    formAction: "/users"
  });
  const handleFormChange = useDebounce((form) => {
    submit(form);
  }, 400);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "GET", action: "/users", className: "flex flex-wrap items-center justify-center gap-2", onChange: (e) => autoSubmit && handleFormChange(e.currentTarget), children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: id, className: "sr-only", children: "Search" }, void 0, false, {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 47,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, { type: "search", name: "search", id, defaultValue: searchParams.get("search") ?? "", placeholder: "Search", className: "w-full", autoFocus }, void 0, false, {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 50,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/search-bar.tsx",
      lineNumber: 46,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusButton, { type: "submit", status: isSubmitting ? "pending" : status, className: "flex w-full items-center justify-center", size: "sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "magnifying-glass", size: "sm" }, void 0, false, {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 54,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "sr-only", children: "Search" }, void 0, false, {
        fileName: "app/components/search-bar.tsx",
        lineNumber: 55,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/search-bar.tsx",
      lineNumber: 53,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/components/search-bar.tsx",
      lineNumber: 52,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/search-bar.tsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_s(SearchBar, "67w/u/H51SOczxnmNINjhY9bY4o=", false, function() {
  return [import_react2.useId, useSearchParams, useSubmit, useIsPending, useDebounce];
});
_c = SearchBar;
var _c;
$RefreshReg$(_c, "SearchBar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  SearchBar
};
//# sourceMappingURL=/build/_shared/chunk-EEEUZJA4.js.map
