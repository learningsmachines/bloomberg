import {
  SearchBar
} from "/build/_shared/chunk-EEEUZJA4.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import "/build/_shared/chunk-SS7EHFNL.js";
import {
  z
} from "/build/_shared/chunk-YTDRTWMN.js";
import {
  ErrorList
} from "/build/_shared/chunk-H2TCL2LU.js";
import "/build/_shared/chunk-RHPIMEJG.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-7RTSRIVO.js";
import "/build/_shared/chunk-TAQPVQBK.js";
import "/build/_shared/chunk-CHQ4BA76.js";
import {
  GeneralErrorBoundary
} from "/build/_shared/chunk-XV5O3AU2.js";
import "/build/_shared/chunk-R2QIY5GK.js";
import "/build/_shared/chunk-HGS2R3YL.js";
import {
  cn,
  getUserImgSrc,
  useDelayedIsPending
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Link,
  useLoaderData
} from "/build/_shared/chunk-PHQUHPUM.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  createHotContext
} from "/build/_shared/chunk-76ZEIH4H.js";
import "/build/_shared/chunk-UWV35TSL.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/users+/index.tsx
var import_node = __toESM(require_node(), 1);
var import_db_server = __toESM(require_db_server(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/users+/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/users+/index.tsx"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
var UserSearchResultSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string().nullable(),
  imageId: z.string().nullable()
});
var UserSearchResultsSchema = z.array(UserSearchResultSchema);
_c = UserSearchResultsSchema;
function UsersRoute() {
  _s();
  const data = useLoaderData();
  const isPending = useDelayedIsPending({
    formMethod: "GET",
    formAction: "/users"
  });
  if (data.status === "error") {
    console.error(data.error);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container mb-48 mt-36 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-h1", children: "Epic Notes Users" }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 86,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full max-w-[700px] ", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchBar, { status: data.status, autoFocus: true, autoSubmit: true }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 88,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 87,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: data.status === "idle" ? data.users.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: cn("flex w-full flex-wrap items-center justify-center gap-4 delay-200", {
      "opacity-50": isPending
    }), children: data.users.map((user) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: user.username, className: "flex h-36 w-44 flex-col items-center justify-center rounded-lg bg-muted px-5 py-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { alt: user.name ?? user.username, src: getUserImgSrc(user.imageId), className: "h-16 w-16 rounded-full" }, void 0, false, {
        fileName: "app/routes/users+/index.tsx",
        lineNumber: 96,
        columnNumber: 11
      }, this),
      user.name ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-body-md", children: user.name }, void 0, false, {
        fileName: "app/routes/users+/index.tsx",
        lineNumber: 97,
        columnNumber: 24
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-full overflow-hidden text-ellipsis text-center text-body-sm text-muted-foreground", children: user.username }, void 0, false, {
        fileName: "app/routes/users+/index.tsx",
        lineNumber: 100,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 95,
      columnNumber: 10
    }, this) }, user.id, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 94,
      columnNumber: 32
    }, this)) }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 91,
      columnNumber: 51
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "No users found" }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 105,
      columnNumber: 15
    }, this) : data.status === "error" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorList, { errors: ["There was an error parsing the results"] }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 105,
      columnNumber: 65
    }, this) : null }, void 0, false, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 90,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/users+/index.tsx",
    lineNumber: 85,
    columnNumber: 10
  }, this);
}
_s(UsersRoute, "X4KRWZR4FN6itrOq+aVkJ8n94s8=", false, function() {
  return [useLoaderData, useDelayedIsPending];
});
_c2 = UsersRoute;
function ErrorBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GeneralErrorBoundary, {}, void 0, false, {
    fileName: "app/routes/users+/index.tsx",
    lineNumber: 114,
    columnNumber: 10
  }, this);
}
_c3 = ErrorBoundary;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "UserSearchResultsSchema");
$RefreshReg$(_c2, "UsersRoute");
$RefreshReg$(_c3, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  UsersRoute as default
};
//# sourceMappingURL=/build/routes/users+/index-X2CZUN26.js.map
