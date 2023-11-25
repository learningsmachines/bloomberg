import {
  floatingToolbarClassName
} from "/build/_shared/chunk-RZOEGAMM.js";
import {
  userHasPermission
} from "/build/_shared/chunk-ZL5Q24C5.js";
import {
  useOptionalUser
} from "/build/_shared/chunk-Y7VT56QR.js";
import {
  require_csrf_server
} from "/build/_shared/chunk-YBPZLMI7.js";
import {
  require_toast_server
} from "/build/_shared/chunk-O7MTR2WV.js";
import {
  require_auth_server
} from "/build/_shared/chunk-44XOYWRB.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import {
  AuthenticityTokenInput
} from "/build/_shared/chunk-6LMWWETO.js";
import "/build/_shared/chunk-FS75F6DH.js";
import {
  StatusButton
} from "/build/_shared/chunk-SS7EHFNL.js";
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
import "/build/_shared/chunk-7RTSRIVO.js";
import "/build/_shared/chunk-TAQPVQBK.js";
import "/build/_shared/chunk-CHQ4BA76.js";
import {
  GeneralErrorBoundary
} from "/build/_shared/chunk-XV5O3AU2.js";
import "/build/_shared/chunk-R2QIY5GK.js";
import {
  Icon
} from "/build/_shared/chunk-HGS2R3YL.js";
import {
  getNoteImgSrc,
  useIsPending
} from "/build/_shared/chunk-POVIIGBA.js";
import {
  Form,
  Link,
  useActionData,
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

// app/routes/users+/$username_+/notes.$noteId.tsx
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
    window.$RefreshRuntime$.register(type, '"app/routes/users+/$username_+/notes.$noteId.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
var _s2 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/users+/$username_+/notes.$noteId.tsx"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
var DeleteFormSchema = z.object({
  intent: z.literal("delete-note"),
  noteId: z.string()
});
function NoteRoute() {
  _s();
  const data = useLoaderData();
  const user = useOptionalUser();
  const isOwner = user?.id === data.note.ownerId;
  const canDelete = userHasPermission(user, isOwner ? `delete:note:own` : `delete:note:any`);
  const displayBar = canDelete || isOwner;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 flex flex-col px-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "mb-2 pt-12 text-h2 lg:mb-6", children: data.note.title }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 142,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: `${displayBar ? "pb-24" : "pb-12"} overflow-y-auto`, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "flex flex-wrap gap-5 py-5", children: data.note.images.map((image) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: getNoteImgSrc(image.id), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: getNoteImgSrc(image.id), alt: image.altText ?? "", className: "h-32 w-32 rounded-lg object-cover" }, void 0, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 146,
        columnNumber: 8
      }, this) }, image.id, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 145,
        columnNumber: 37
      }, this)) }, void 0, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 144,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "whitespace-break-spaces text-sm md:text-lg", children: data.note.content }, void 0, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 151,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 143,
      columnNumber: 4
    }, this),
    displayBar ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: floatingToolbarClassName, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-sm text-foreground/90 max-[524px]:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "clock", className: "scale-125", children: [
        data.timeAgo,
        " ago"
      ] }, void 0, true, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 157,
        columnNumber: 7
      }, this) }, void 0, false, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 156,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4", children: [
        canDelete ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DeleteNote, { id: data.note.id }, void 0, false, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 162,
          columnNumber: 20
        }, this) : null,
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, { asChild: true, className: "min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "edit", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "pencil-1", className: "scale-125 max-md:scale-150", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "max-md:hidden", children: "Edit" }, void 0, false, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 166,
          columnNumber: 10
        }, this) }, void 0, false, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 165,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 164,
          columnNumber: 8
        }, this) }, void 0, false, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 163,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 161,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 155,
      columnNumber: 18
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
    lineNumber: 141,
    columnNumber: 10
  }, this);
}
_s(NoteRoute, "DervCVTA0wfLFPjif2ltFzo3whQ=", false, function() {
  return [useLoaderData, useOptionalUser];
});
_c = NoteRoute;
function DeleteNote({
  id
}) {
  _s2();
  const actionData = useActionData();
  const isPending = useIsPending();
  const [form] = useForm({
    id: "delete-note",
    lastSubmission: actionData?.submission
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "POST", ...form.props, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AuthenticityTokenInput, {}, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 189,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "noteId", value: id }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 190,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusButton, { type: "submit", name: "intent", value: "delete-note", variant: "destructive", status: isPending ? "pending" : actionData?.status ?? "idle", disabled: isPending, className: "w-full max-md:aspect-square max-md:px-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { name: "trash", className: "scale-125 max-md:scale-150", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "max-md:hidden", children: "Delete" }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 193,
      columnNumber: 6
    }, this) }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 192,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 191,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ErrorList, { errors: form.errors, id: form.errorId }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 196,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
    lineNumber: 188,
    columnNumber: 10
  }, this);
}
_s2(DeleteNote, "G+LY8oKPtG3PTaudrP2QM73mqkI=", false, function() {
  return [useActionData, useIsPending, useForm];
});
_c2 = DeleteNote;
var meta = ({
  data,
  params,
  matches
}) => {
  const notesMatch = matches.find((m) => m.id === "routes/users+/$username_+/notes");
  const displayName = notesMatch?.data?.owner.name ?? params.username;
  const noteTitle = data?.note.title ?? "Note";
  const noteContentsSummary = data && data.note.content.length > 100 ? data?.note.content.slice(0, 97) + "..." : "No content";
  return [{
    title: `${noteTitle} | ${displayName}'s Notes | Epic Notes`
  }, {
    name: "description",
    content: noteContentsSummary
  }];
};
function ErrorBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GeneralErrorBoundary, { statusHandlers: {
    403: () => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "You are not allowed to do that" }, void 0, false, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 221,
      columnNumber: 16
    }, this),
    404: ({
      params
    }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
      'No note with the id "',
      params.noteId,
      '" exists'
    ] }, void 0, true, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 224,
      columnNumber: 11
    }, this)
  } }, void 0, false, {
    fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
    lineNumber: 220,
    columnNumber: 10
  }, this);
}
_c3 = ErrorBoundary;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "NoteRoute");
$RefreshReg$(_c2, "DeleteNote");
$RefreshReg$(_c3, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  NoteRoute as default,
  meta
};
//# sourceMappingURL=/build/routes/users+/$username_+/notes.$noteId-KCMVWPNB.js.map
