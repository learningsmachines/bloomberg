import {
  require_client
} from "/build/_shared/chunk-ZWGWGGVF.js";
import {
  RemixBrowser
} from "/build/_shared/chunk-PHQUHPUM.js";
import "/build/_shared/chunk-GIAAE3CH.js";
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
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/entry.client.tsx
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/entry.client.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
if (ENV.MODE === "production" && ENV.SENTRY_DSN) {
  import("/build/_shared/monitoring.client-2INEEAVC.js").then(({ init }) => init());
}
(0, import_react2.startTransition)(() => {
  (0, import_client.hydrateRoot)(document, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RemixBrowser, {}, void 0, false, {
    fileName: "app/entry.client.tsx",
    lineNumber: 21,
    columnNumber: 24
  }, this));
});
//# sourceMappingURL=/build/entry.client-H6SK6IEI.js.map
