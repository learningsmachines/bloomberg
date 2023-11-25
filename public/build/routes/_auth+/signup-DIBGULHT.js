import {
  Container,
  Html,
  Link,
  Text,
  require_email_server
} from "/build/_shared/chunk-MRLKUITJ.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import "/build/_shared/chunk-XSA5YJR6.js";
import "/build/_shared/chunk-YROKGDF2.js";
import {
  require_honeypot_server
} from "/build/_shared/chunk-3QJDM65C.js";
import {
  require_csrf_server
} from "/build/_shared/chunk-YBPZLMI7.js";
import {
  ProviderConnectionForm,
  providerNames
} from "/build/_shared/chunk-V3X6G6DM.js";
import "/build/_shared/chunk-SAJ3AEKV.js";
import "/build/_shared/chunk-O7MTR2WV.js";
import "/build/_shared/chunk-NBRO6RFG.js";
import "/build/_shared/chunk-R7SB74WW.js";
import "/build/_shared/chunk-PIFLCODP.js";
import {
  EmailSchema
} from "/build/_shared/chunk-DIRETMJJ.js";
import "/build/_shared/chunk-44XOYWRB.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import {
  HoneypotInputs
} from "/build/_shared/chunk-6NMOG26R.js";
import {
  AuthenticityTokenInput
} from "/build/_shared/chunk-6LMWWETO.js";
import {
  getConstraint,
  parse
} from "/build/_shared/chunk-FS75F6DH.js";
import {
  StatusButton
} from "/build/_shared/chunk-SS7EHFNL.js";
import {
  z
} from "/build/_shared/chunk-YTDRTWMN.js";
import {
  ErrorList,
  Field,
  helpers_exports,
  useForm
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
  useIsPending
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Form,
  useActionData,
  useSearchParams
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

// app/routes/_auth+/signup.tsx
var import_node = __toESM(require_node(), 1);
var import_csrf_server = __toESM(require_csrf_server(), 1);
var import_db_server = __toESM(require_db_server(), 1);
var import_email_server = __toESM(require_email_server(), 1);
var import_honeypot_server = __toESM(require_honeypot_server(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/_auth+/signup.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/_auth+/signup.tsx"
  );
  import.meta.hot.lastModified = "1700840307486.6584";
}
var SignupSchema = z.object({
  email: EmailSchema
});
function SignupEmail({
  onboardingUrl,
  otp
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Welcome to Epic Notes!" }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 122,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 121,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: [
      "Here's your verification code: ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: otp }, void 0, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 126,
        columnNumber: 38
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 125,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 124,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Text, { children: "Or click the link to get started:" }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 130,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 129,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { href: onboardingUrl, children: onboardingUrl }, void 0, false, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 132,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 120,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 119,
    columnNumber: 10
  }, this);
}
_c = SignupEmail;
var meta = () => {
  return [{
    title: "Sign Up | Epic Notes"
  }];
};
function SignupRoute() {
  _s();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const [form, fields] = useForm({
    id: "signup-form",
    constraint: getConstraint(SignupSchema),
    lastSubmission: actionData?.submission,
    onValidate({
      formData
    }) {
      const result = parse(formData, {
        schema: SignupSchema
      });
      return result;
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "text-h1", children: "Let's start your journey!" }, void 0, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 164,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your email." }, void 0, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 165,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 163,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-auto mt-16 min-w-full sm:min-w-[368px] max-w-sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", ...form.props, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthenticityTokenInput, {}, void 0, false, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 171,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneypotInputs, {}, void 0, false, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 172,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, { labelProps: {
          htmlFor: fields.email.id,
          children: "Email"
        }, inputProps: {
          ...helpers_exports.input(fields.email),
          autoFocus: true
        }, errors: fields.email.errors }, void 0, false, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 173,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorList, { errors: form.errors, id: form.errorId }, void 0, false, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 180,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusButton, { className: "w-full", status: isPending ? "pending" : actionData?.status ?? "idle", type: "submit", disabled: isPending, children: "Submit" }, void 0, false, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 181,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 170,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProviderConnectionForm, { type: "Signup", providerName, redirectTo }, void 0, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 187,
        columnNumber: 8
      }, this) }, providerName, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 186,
        columnNumber: 41
      }, this)) }, void 0, false, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 185,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 169,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 162,
    columnNumber: 10
  }, this);
}
_s(SignupRoute, "pOytQzQfSlfERSUoCdV/IF0+RIo=", false, function() {
  return [useActionData, useIsPending, useSearchParams, useForm];
});
_c2 = SignupRoute;
function ErrorBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GeneralErrorBoundary, {}, void 0, false, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 198,
    columnNumber: 10
  }, this);
}
_c3 = ErrorBoundary;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "SignupEmail");
$RefreshReg$(_c2, "SignupRoute");
$RefreshReg$(_c3, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  SignupRoute as default,
  meta
};
//# sourceMappingURL=/build/routes/_auth+/signup-DIBGULHT.js.map
