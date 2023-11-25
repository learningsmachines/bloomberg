import "/build/_shared/chunk-MRLKUITJ.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import "/build/_shared/chunk-XSA5YJR6.js";
import "/build/_shared/chunk-YROKGDF2.js";
import "/build/_shared/chunk-3QJDM65C.js";
import {
  require_csrf_server
} from "/build/_shared/chunk-YBPZLMI7.js";
import "/build/_shared/chunk-V3X6G6DM.js";
import "/build/_shared/chunk-SAJ3AEKV.js";
import {
  require_toast_server
} from "/build/_shared/chunk-O7MTR2WV.js";
import "/build/_shared/chunk-NBRO6RFG.js";
import "/build/_shared/chunk-R7SB74WW.js";
import "/build/_shared/chunk-PIFLCODP.js";
import "/build/_shared/chunk-DIRETMJJ.js";
import {
  require_auth_server
} from "/build/_shared/chunk-44XOYWRB.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import "/build/_shared/chunk-6NMOG26R.js";
import {
  AuthenticityTokenInput
} from "/build/_shared/chunk-6LMWWETO.js";
import "/build/_shared/chunk-FS75F6DH.js";
import {
  StatusButton
} from "/build/_shared/chunk-SS7EHFNL.js";
import "/build/_shared/chunk-YTDRTWMN.js";
import "/build/_shared/chunk-H2TCL2LU.js";
import "/build/_shared/chunk-RHPIMEJG.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-7RTSRIVO.js";
import "/build/_shared/chunk-TAQPVQBK.js";
import "/build/_shared/chunk-CHQ4BA76.js";
import "/build/_shared/chunk-XV5O3AU2.js";
import "/build/_shared/chunk-R2QIY5GK.js";
import {
  Icon
} from "/build/_shared/chunk-HGS2R3YL.js";
import {
  useDoubleCheck
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  useFetcher
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

// app/routes/settings+/profile.two-factor.disable.tsx
var import_node = __toESM(require_node(), 1);
var import_auth_server = __toESM(require_auth_server(), 1);
var import_csrf_server = __toESM(require_csrf_server(), 1);
var import_db_server = __toESM(require_db_server(), 1);
var import_toast_server = __toESM(require_toast_server(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/settings+/profile.two-factor.disable.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/settings+/profile.two-factor.disable.tsx"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
var handle = {
  breadcrumb: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "lock-open-1", children: "Disable" }, void 0, false, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 35,
    columnNumber: 15
  }, this),
  getSitemapEntries: () => null
};
function TwoFactorDisableRoute() {
  _s();
  const disable2FAFetcher = useFetcher();
  const dc = useDoubleCheck();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto max-w-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(disable2FAFetcher.Form, { method: "POST", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthenticityTokenInput, {}, void 0, false, {
      fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
      lineNumber: 69,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Disabling two factor authentication is not recommended. However, if you would like to do so, click here:" }, void 0, false, {
      fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
      lineNumber: 70,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusButton, { variant: "destructive", status: disable2FAFetcher.state === "loading" ? "pending" : "idle", ...dc.getButtonProps({
      className: "mx-auto",
      name: "intent",
      value: "disable",
      type: "submit"
    }), children: dc.doubleCheck ? "Are you sure?" : "Disable 2FA" }, void 0, false, {
      fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
      lineNumber: 74,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 68,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_s(TwoFactorDisableRoute, "AovRxqD2axCh0khrBhmC7lIcx4g=", false, function() {
  return [useFetcher, useDoubleCheck];
});
_c = TwoFactorDisableRoute;
var _c;
$RefreshReg$(_c, "TwoFactorDisableRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  TwoFactorDisableRoute as default,
  handle
};
//# sourceMappingURL=/build/routes/settings+/profile.two-factor.disable-4OI3IES7.js.map
