import {
  NoteEditor
} from "/build/_shared/chunk-EAQ55TK3.js";
import "/build/_shared/chunk-RZOEGAMM.js";
import "/build/_shared/chunk-YBPZLMI7.js";
import {
  require_auth_server
} from "/build/_shared/chunk-44XOYWRB.js";
import {
  require_db_server
} from "/build/_shared/chunk-FSP6GK2P.js";
import "/build/_shared/chunk-6LMWWETO.js";
import "/build/_shared/chunk-FS75F6DH.js";
import "/build/_shared/chunk-SS7EHFNL.js";
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
import "/build/_shared/chunk-HGS2R3YL.js";
import "/build/_shared/chunk-POVIIGBA.js";
import {
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

// app/routes/users+/$username_+/notes.$noteId_.edit.tsx
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
    window.$RefreshRuntime$.register(type, '"app/routes/users+/$username_+/notes.$noteId_.edit.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/users+/$username_+/notes.$noteId_.edit.tsx"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
function NoteEdit() {
  _s();
  const data = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(NoteEditor, { note: data.note }, void 0, false, {
    fileName: "app/routes/users+/$username_+/notes.$noteId_.edit.tsx",
    lineNumber: 61,
    columnNumber: 10
  }, this);
}
_s(NoteEdit, "5thj+e1edPyRpKif1JmVRC6KArE=", false, function() {
  return [useLoaderData];
});
_c = NoteEdit;
var _c;
$RefreshReg$(_c, "NoteEdit");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  NoteEdit as default
};
//# sourceMappingURL=/build/routes/users+/$username_+/notes.$noteId_.edit-XSLEPOCQ.js.map
