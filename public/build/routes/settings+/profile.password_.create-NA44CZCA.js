import {
  PasswordAndConfirmPasswordSchema
} from "/build/_shared/chunk-DIRETMJJ.js";
import {
  require_auth_server
} from "/build/_shared/chunk-44XOYWRB.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import {
  getConstraint,
  parse
} from "/build/_shared/chunk-FS75F6DH.js";
import {
  StatusButton
} from "/build/_shared/chunk-SS7EHFNL.js";
import "/build/_shared/chunk-YTDRTWMN.js";
import {
  ErrorList,
  Field,
  helpers_exports,
  useForm
} from "/build/_shared/chunk-H2TCL2LU.js";
import {
  Button
} from "/build/_shared/chunk-RHPIMEJG.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import "/build/_shared/chunk-7RTSRIVO.js";
import "/build/_shared/chunk-TAQPVQBK.js";
import "/build/_shared/chunk-CHQ4BA76.js";
import {
  Icon
} from "/build/_shared/chunk-HGS2R3YL.js";
import {
  useIsPending
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Form,
  Link,
  useActionData
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

// app/routes/settings+/profile.password_.create.tsx
var import_node = __toESM(require_node(), 1);
var import_auth_server = __toESM(require_auth_server(), 1);
var import_db_server = __toESM(require_db_server(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/settings+/profile.password_.create.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/settings+/profile.password_.create.tsx"
  );
  import.meta.hot.lastModified = "1700840307489.992";
}
var handle = {
  breadcrumb: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "dots-horizontal", children: "Password" }, void 0, false, {
    fileName: "app/routes/settings+/profile.password_.create.tsx",
    lineNumber: 35,
    columnNumber: 15
  }, this),
  getSitemapEntries: () => null
};
var CreatePasswordForm = PasswordAndConfirmPasswordSchema;
function CreatePasswordRoute() {
  _s();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [form, fields] = useForm({
    id: "password-create-form",
    constraint: getConstraint(CreatePasswordForm),
    lastSubmission: actionData?.submission,
    onValidate({
      formData
    }) {
      return parse(formData, {
        schema: CreatePasswordForm
      });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", ...form.props, className: "mx-auto max-w-md", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, { labelProps: {
      children: "New Password"
    }, inputProps: helpers_exports.input(fields.password, {
      type: "password"
    }), errors: fields.password.errors }, void 0, false, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 127,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, { labelProps: {
      children: "Confirm New Password"
    }, inputProps: helpers_exports.input(fields.confirmPassword, {
      type: "password"
    }), errors: fields.confirmPassword.errors }, void 0, false, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 132,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorList, { id: form.errorId, errors: form.errors }, void 0, false, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 137,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid w-full grid-cols-2 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { variant: "secondary", asChild: true, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "..", children: "Cancel" }, void 0, false, {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 140,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 139,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusButton, { type: "submit", status: isPending ? "pending" : actionData?.status ?? "idle", children: "Create Password" }, void 0, false, {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 142,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 138,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/settings+/profile.password_.create.tsx",
    lineNumber: 126,
    columnNumber: 10
  }, this);
}
_s(CreatePasswordRoute, "qg6D+LQiyyBwoKKZlQs9OeApyZ8=", false, function() {
  return [useActionData, useIsPending, useForm];
});
_c = CreatePasswordRoute;
var _c;
$RefreshReg$(_c, "CreatePasswordRoute");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  CreatePasswordRoute as default,
  handle
};
//# sourceMappingURL=/build/routes/settings+/profile.password_.create-NA44CZCA.js.map
