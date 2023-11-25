var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key2 of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key2) && key2 !== except && __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  return to;
}, __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// app/utils/db.server.ts
import { remember } from "@epic-web/remember";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
var prisma, init_db_server = __esm({
  "app/utils/db.server.ts"() {
    "use strict";
    prisma = remember("prisma", () => {
      let client = new PrismaClient({
        log: [
          { level: "query", emit: "event" },
          { level: "error", emit: "stdout" },
          { level: "warn", emit: "stdout" }
        ]
      });
      return client.$on("query", async (e) => {
        if (e.duration < 20)
          return;
        let color = e.duration < 20 * 1.1 ? "green" : e.duration < 20 * 1.2 ? "blue" : e.duration < 20 * 1.3 ? "yellow" : e.duration < 20 * 1.4 ? "redBright" : "red", dur = chalk[color](`${e.duration}ms`);
        console.info(`prisma:query - ${dur} - ${e.query}`);
      }), client.$connect(), client;
    });
  }
});

// app/utils/monitoring.server.ts
var monitoring_server_exports = {};
__export(monitoring_server_exports, {
  init: () => init3
});
import { ProfilingIntegration } from "@sentry/profiling-node";
import * as Sentry from "@sentry/remix";
function init3() {
  Sentry.init({
    dsn: ENV.SENTRY_DSN,
    environment: ENV.MODE,
    tracesSampleRate: ENV.MODE === "production" ? 1 : 0,
    denyUrls: [
      /\/resources\/healthcheck/,
      // TODO: be smarter about the public assets...
      /\/build\//,
      /\/favicons\//,
      /\/img\//,
      /\/fonts\//,
      /\/favicon.ico/,
      /\/site\.webmanifest/
    ],
    integrations: [
      new Sentry.Integrations.Http({ tracing: !0 }),
      new Sentry.Integrations.Prisma({ client: prisma }),
      new ProfilingIntegration()
    ],
    beforeSendTransaction(event) {
      return event.request?.headers?.["X-Healthcheck"] === "true" ? null : event;
    }
  });
}
var init_monitoring_server = __esm({
  "app/utils/monitoring.server.ts"() {
    "use strict";
    init_db_server();
  }
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleDataRequest: () => handleDataRequest,
  handleError: () => handleError
});
import { PassThrough } from "stream";
import {
  createReadableStreamFromReadable
} from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import * as Sentry2 from "@sentry/remix";
import isbot from "isbot";
import { getInstanceInfo } from "litefs-js";
import { renderToPipeableStream } from "react-dom/server";

// app/utils/env.server.ts
import { z } from "zod";
var schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  DATABASE_PATH: z.string(),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string(),
  INTERNAL_COMMAND_TOKEN: z.string(),
  HONEYPOT_SECRET: z.string(),
  CACHE_DATABASE_PATH: z.string(),
  // If you plan on using Sentry, uncomment this line
  // SENTRY_DSN: z.string(),
  // If you plan to use Resend, uncomment this line
  // RESEND_API_KEY: z.string(),
  // If you plan to use GitHub auth, remove the default:
  GITHUB_CLIENT_ID: z.string().default("MOCK_GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: z.string().default("MOCK_GITHUB_CLIENT_SECRET"),
  GITHUB_TOKEN: z.string().default("MOCK_GITHUB_TOKEN")
});
function init() {
  let parsed = schema.safeParse(process.env);
  if (parsed.success === !1)
    throw console.error(
      "\u274C Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    ), new Error("Invalid environment variables");
}
function getEnv() {
  return {
    MODE: "development",
    SENTRY_DSN: process.env.SENTRY_DSN
  };
}

// app/utils/nonce-provider.ts
import * as React from "react";
var NonceContext = React.createContext(""), NonceProvider = NonceContext.Provider, useNonce = () => React.useContext(NonceContext);

// app/utils/timing.server.ts
function makeTimings(type, desc) {
  let timings = {
    [type]: [{ desc, start: performance.now() }]
  };
  return Object.defineProperty(timings, "toString", {
    value: function() {
      return getServerTimeHeader(timings);
    },
    enumerable: !1
  }), timings;
}
function createTimer(type, desc) {
  let start = performance.now();
  return {
    end(timings) {
      let timingType = timings[type];
      timingType || (timingType = timings[type] = []), timingType.push({ desc, time: performance.now() - start });
    }
  };
}
async function time(fn, {
  type,
  desc,
  timings
}) {
  let timer = createTimer(type, desc), promise = typeof fn == "function" ? fn() : fn;
  if (!timings)
    return promise;
  let result = await promise;
  return timer.end(timings), result;
}
function getServerTimeHeader(timings) {
  return timings ? Object.entries(timings).map(([key2, timingInfos]) => {
    let dur = timingInfos.reduce((acc, timingInfo) => {
      let time2 = timingInfo.time ?? performance.now() - timingInfo.start;
      return acc + time2;
    }, 0).toFixed(1), desc = timingInfos.map((t) => t.desc).filter(Boolean).join(" & ");
    return [
      key2.replaceAll(/(:| |@|=|;|,|\/|\\)/g, "_"),
      desc ? `desc=${JSON.stringify(desc)}` : null,
      `dur=${dur}`
    ].filter(Boolean).join(";");
  }).join(",") : "";
}
function cachifiedTimingReporter(timings) {
  if (timings)
    return ({ key: key2 }) => {
      let cacheRetrievalTimer = createTimer(
        `cache:${key2}`,
        `${key2} cache retrieval`
      ), getFreshValueTimer;
      return (event) => {
        switch (event.name) {
          case "getFreshValueStart":
            getFreshValueTimer = createTimer(
              `getFreshValue:${key2}`,
              `request forced to wait for a fresh ${key2} value`
            );
            break;
          case "getFreshValueSuccess":
            getFreshValueTimer?.end(timings);
            break;
          case "done":
            cacheRetrievalTimer.end(timings);
            break;
        }
      };
    };
}

// app/entry.server.tsx
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
init();
global.ENV = getEnv();
ENV.MODE === "production" && ENV.SENTRY_DSN && Promise.resolve().then(() => (init_monitoring_server(), monitoring_server_exports)).then(({ init: init4 }) => init4());
async function handleRequest(...args) {
  let [
    request,
    responseStatusCode,
    responseHeaders,
    remixContext,
    loadContext
  ] = args, { currentInstance, primaryInstance } = await getInstanceInfo();
  responseHeaders.set("fly-region", process.env.FLY_REGION ?? "unknown"), responseHeaders.set("fly-app", process.env.FLY_APP_NAME ?? "unknown"), responseHeaders.set("fly-primary-instance", primaryInstance), responseHeaders.set("fly-instance", currentInstance);
  let callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady", nonce = String(loadContext.cspNonce) ?? void 0;
  return new Promise(async (resolve, reject) => {
    let didError = !1, timings = makeTimings("render", "renderToPipeableStream"), { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(NonceProvider, { value: nonce, children: /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 54,
        columnNumber: 5
      }, this) }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 53,
        columnNumber: 4
      }, this),
      {
        [callbackName]: () => {
          let body = new PassThrough();
          responseHeaders.set("Content-Type", "text/html"), responseHeaders.append("Server-Timing", timings.toString()), resolve(
            new Response(createReadableStreamFromReadable(body), {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        },
        nonce
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
async function handleDataRequest(response) {
  let { currentInstance, primaryInstance } = await getInstanceInfo();
  return response.headers.set("fly-region", process.env.FLY_REGION ?? "unknown"), response.headers.set("fly-app", process.env.FLY_APP_NAME ?? "unknown"), response.headers.set("fly-primary-instance", primaryInstance), response.headers.set("fly-instance", currentInstance), response;
}
function handleError(error, { request }) {
  error instanceof Error ? Sentry2.captureRemixServerException(error, "remix.server", request) : Sentry2.captureException(error);
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  action: () => action2,
  default: () => root_default,
  headers: () => headers,
  links: () => links,
  loader: () => loader,
  meta: () => meta,
  useOptimisticThemeMode: () => useOptimisticThemeMode,
  useTheme: () => useTheme
});
import { useForm } from "@conform-to/react";
import { parse as parse2 } from "@conform-to/zod";
import {
  json as json2
} from "@remix-run/node";
import {
  Form as Form2,
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
  useSubmit as useSubmit2
} from "@remix-run/react";
import { withSentry } from "@sentry/remix";
import { useRef as useRef4 } from "react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { z as z6 } from "zod";

// app/components/error-boundary.tsx
import {
  isRouteErrorResponse,
  useParams,
  useRouteError
} from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";

// app/utils/misc.tsx
import { useFormAction, useNavigation } from "@remix-run/react";
import { clsx } from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSpinDelay } from "spin-delay";
import { extendTailwindMerge } from "tailwind-merge";

// app/utils/extended-theme.ts
var extendedTheme = {
  colors: {
    border: "hsl(var(--border))",
    input: {
      DEFAULT: "hsl(var(--input))",
      invalid: "hsl(var(--input-invalid))"
    },
    ring: {
      DEFAULT: "hsl(var(--ring))",
      invalid: "hsl(var(--foreground-destructive))"
    },
    background: "hsl(var(--background))",
    foreground: {
      DEFAULT: "hsl(var(--foreground))",
      destructive: "hsl(var(--foreground-destructive))"
    },
    primary: {
      DEFAULT: "hsl(var(--primary))",
      foreground: "hsl(var(--primary-foreground))"
    },
    secondary: {
      DEFAULT: "hsl(var(--secondary))",
      foreground: "hsl(var(--secondary-foreground))"
    },
    destructive: {
      DEFAULT: "hsl(var(--destructive))",
      foreground: "hsl(var(--destructive-foreground))"
    },
    muted: {
      DEFAULT: "hsl(var(--muted))",
      foreground: "hsl(var(--muted-foreground))"
    },
    accent: {
      DEFAULT: "hsl(var(--accent))",
      foreground: "hsl(var(--accent-foreground))"
    },
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))"
    },
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))"
    }
  },
  borderRadius: {
    lg: "var(--radius)",
    md: "calc(var(--radius) - 2px)",
    sm: "calc(var(--radius) - 4px)"
  },
  fontSize: {
    // 1rem = 16px
    /** 80px size / 84px high / bold */
    mega: ["5rem", { lineHeight: "5.25rem", fontWeight: "700" }],
    /** 56px size / 62px high / bold */
    h1: ["3.5rem", { lineHeight: "3.875rem", fontWeight: "700" }],
    /** 40px size / 48px high / bold */
    h2: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }],
    /** 32px size / 36px high / bold */
    h3: ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }],
    /** 28px size / 36px high / bold */
    h4: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "700" }],
    /** 24px size / 32px high / bold */
    h5: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
    /** 16px size / 20px high / bold */
    h6: ["1rem", { lineHeight: "1.25rem", fontWeight: "700" }],
    /** 32px size / 36px high / normal */
    "body-2xl": ["2rem", { lineHeight: "2.25rem" }],
    /** 28px size / 36px high / normal */
    "body-xl": ["1.75rem", { lineHeight: "2.25rem" }],
    /** 24px size / 32px high / normal */
    "body-lg": ["1.5rem", { lineHeight: "2rem" }],
    /** 20px size / 28px high / normal */
    "body-md": ["1.25rem", { lineHeight: "1.75rem" }],
    /** 16px size / 20px high / normal */
    "body-sm": ["1rem", { lineHeight: "1.25rem" }],
    /** 14px size / 18px high / normal */
    "body-xs": ["0.875rem", { lineHeight: "1.125rem" }],
    /** 12px size / 16px high / normal */
    "body-2xs": ["0.75rem", { lineHeight: "1rem" }],
    /** 18px size / 24px high / semibold */
    caption: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }],
    /** 12px size / 16px high / bold */
    button: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }]
  },
  keyframes: {
    "accordion-down": {
      from: { height: "0" },
      to: { height: "var(--radix-accordion-content-height)" }
    },
    "accordion-up": {
      from: { height: "var(--radix-accordion-content-height)" },
      to: { height: "0" }
    }
  },
  animation: {
    "accordion-down": "accordion-down 0.2s ease-out",
    "accordion-up": "accordion-up 0.2s ease-out"
  }
};

// app/utils/misc.tsx
function getUserImgSrc(imageId) {
  return imageId ? `/resources/user-images/${imageId}` : "/img/user.png";
}
function getNoteImgSrc(imageId) {
  return `/resources/note-images/${imageId}`;
}
function getErrorMessage(error) {
  return typeof error == "string" ? error : error && typeof error == "object" && "message" in error && typeof error.message == "string" ? error.message : (console.error("Unable to get error message for error", error), "Unknown Error");
}
function formatColors() {
  let colors = [];
  for (let [key2, color] of Object.entries(extendedTheme.colors))
    if (typeof color == "string")
      colors.push(key2);
    else {
      let colorGroup = Object.keys(color).map(
        (subKey) => subKey === "DEFAULT" ? "" : subKey
      );
      colors.push({ [key2]: colorGroup });
    }
  return colors;
}
var customTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: formatColors(),
      borderRadius: Object.keys(extendedTheme.borderRadius)
    },
    classGroups: {
      "font-size": [
        {
          text: Object.keys(extendedTheme.fontSize)
        }
      ],
      animate: [
        {
          animate: Object.keys(extendedTheme.animation)
        }
      ]
    }
  }
});
function cn(...inputs) {
  return customTwMerge(clsx(inputs));
}
function getDomainUrl(request) {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host") ?? new URL(request.url).host;
  return `${host.includes("localhost") ? "http" : "https"}://${host}`;
}
function getReferrerRoute(request) {
  let referrer = request.headers.get("referer") ?? request.headers.get("referrer") ?? request.referrer, domain = getDomainUrl(request);
  return referrer?.startsWith(domain) ? referrer.slice(domain.length) : "/";
}
function combineHeaders(...headers3) {
  let combined = new Headers();
  for (let header of headers3)
    if (header)
      for (let [key2, value] of new Headers(header).entries())
        combined.append(key2, value);
  return combined;
}
function combineResponseInits(...responseInits) {
  let combined = {};
  for (let responseInit of responseInits)
    combined = {
      ...responseInit,
      headers: combineHeaders(combined.headers, responseInit?.headers)
    };
  return combined;
}
function invariant(condition, message) {
  if (!condition)
    throw new Error(typeof message == "function" ? message() : message);
}
function invariantResponse(condition, message, responseInit) {
  if (!condition)
    throw new Response(typeof message == "function" ? message() : message, {
      status: 400,
      ...responseInit
    });
}
function useIsPending({
  formAction,
  formMethod = "POST",
  state = "non-idle"
} = {}) {
  let contextualFormAction = useFormAction(), navigation = useNavigation();
  return (state === "non-idle" ? navigation.state !== "idle" : navigation.state === state) && navigation.formAction === (formAction ?? contextualFormAction) && navigation.formMethod === formMethod;
}
function useDelayedIsPending({
  formAction,
  formMethod,
  delay = 400,
  minDuration = 300
} = {}) {
  let isPending = useIsPending({ formAction, formMethod });
  return useSpinDelay(isPending, {
    delay,
    minDuration
  });
}
function callAll(...fns) {
  return (...args) => fns.forEach((fn) => fn?.(...args));
}
function useDoubleCheck() {
  let [doubleCheck, setDoubleCheck] = useState(!1);
  function getButtonProps(props) {
    let onBlur = () => setDoubleCheck(!1), onClick = doubleCheck ? void 0 : (e) => {
      e.preventDefault(), setDoubleCheck(!0);
    }, onKeyUp = (e) => {
      e.key === "Escape" && setDoubleCheck(!1);
    };
    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick),
      onKeyUp: callAll(onKeyUp, props?.onKeyUp)
    };
  }
  return { doubleCheck, getButtonProps };
}
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    timer && clearTimeout(timer), timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
function useDebounce(callback, delay) {
  let callbackRef = useRef(callback);
  return useEffect(() => {
    callbackRef.current = callback;
  }), useMemo(
    () => debounce(
      (...args) => callbackRef.current(...args),
      delay
    ),
    [delay]
  );
}
async function downloadFile(url, retries = 0) {
  try {
    let response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch image with status ${response.status}`);
    let contentType = response.headers.get("content-type") ?? "image/jpg", blob = Buffer.from(await response.arrayBuffer());
    return { contentType, blob };
  } catch (e) {
    if (retries > 3)
      throw e;
    return downloadFile(url, retries + 1);
  }
}

// app/components/error-boundary.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => /* @__PURE__ */ jsxDEV2("p", { children: [
    error.status,
    " ",
    error.data
  ] }, void 0, !0, {
    fileName: "app/components/error-boundary.tsx",
    lineNumber: 17,
    columnNumber: 3
  }, this),
  statusHandlers,
  unexpectedErrorHandler = (error) => /* @__PURE__ */ jsxDEV2("p", { children: getErrorMessage(error) }, void 0, !1, {
    fileName: "app/components/error-boundary.tsx",
    lineNumber: 22,
    columnNumber: 36
  }, this)
}) {
  let error = useRouteError();
  captureRemixErrorBoundaryError(error);
  let params = useParams();
  return typeof document < "u" && console.error(error), /* @__PURE__ */ jsxDEV2("div", { className: "container flex items-center justify-center p-20 text-h2", children: isRouteErrorResponse(error) ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
    error,
    params
  }) : unexpectedErrorHandler(error) }, void 0, !1, {
    fileName: "app/components/error-boundary.tsx",
    lineNumber: 37,
    columnNumber: 3
  }, this);
}

// app/components/forms.tsx
import { useInputEvent } from "@conform-to/react";
import { useId, useRef as useRef2 } from "react";

// app/components/ui/checkbox.tsx
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React2 from "react";
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var Checkbox = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV3(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDEV3(
      CheckboxPrimitive.Indicator,
      {
        className: cn("flex items-center justify-center text-current"),
        children: /* @__PURE__ */ jsxDEV3("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ jsxDEV3(
          "path",
          {
            d: "M1,4 L3,6 L7,2",
            stroke: "currentcolor",
            strokeWidth: "1",
            fill: "none"
          },
          void 0,
          !1,
          {
            fileName: "app/components/ui/checkbox.tsx",
            lineNumber: 29,
            columnNumber: 5
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/ui/checkbox.tsx",
          lineNumber: 28,
          columnNumber: 4
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/ui/checkbox.tsx",
        lineNumber: 25,
        columnNumber: 3
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/checkbox.tsx",
    lineNumber: 17,
    columnNumber: 2
  },
  this
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// app/components/ui/input.tsx
import * as React3 from "react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var Input = React3.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxDEV4(
    "input",
    {
      type,
      className: cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/input.tsx",
      lineNumber: 11,
      columnNumber: 4
    },
    this
  )
);
Input.displayName = "Input";

// app/components/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as React4 from "react";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Label = React4.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV5(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/label.tsx",
    lineNumber: 16,
    columnNumber: 2
  },
  this
));
Label.displayName = LabelPrimitive.Root.displayName;

// app/components/ui/textarea.tsx
import * as React5 from "react";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var Textarea = React5.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV6(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/textarea.tsx",
      lineNumber: 11,
      columnNumber: 4
    },
    this
  )
);
Textarea.displayName = "Textarea";

// app/components/forms.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function ErrorList({
  id,
  errors
}) {
  let errorsToRender = errors?.filter(Boolean);
  return errorsToRender?.length ? /* @__PURE__ */ jsxDEV7("ul", { id, className: "flex flex-col gap-1", children: errorsToRender.map((e) => /* @__PURE__ */ jsxDEV7("li", { className: "text-foreground-destructive text-[10px]", children: e }, e, !1, {
    fileName: "app/components/forms.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this)) }, void 0, !1, {
    fileName: "app/components/forms.tsx",
    lineNumber: 20,
    columnNumber: 3
  }, this) : null;
}
function Field({
  labelProps,
  inputProps,
  errors,
  className
}) {
  let fallbackId = useId(), id = inputProps.id ?? fallbackId, errorId = errors?.length ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxDEV7("div", { className, children: [
    /* @__PURE__ */ jsxDEV7(Label, { htmlFor: id, ...labelProps }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 46,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7(
      Input,
      {
        id,
        "aria-invalid": errorId ? !0 : void 0,
        "aria-describedby": errorId,
        ...inputProps
      },
      void 0,
      !1,
      {
        fileName: "app/components/forms.tsx",
        lineNumber: 47,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsxDEV7(ErrorList, { id: errorId, errors }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 54,
      columnNumber: 16
    }, this) : null }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 53,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/forms.tsx",
    lineNumber: 45,
    columnNumber: 3
  }, this);
}
function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className
}) {
  let fallbackId = useId(), id = textareaProps.id ?? textareaProps.name ?? fallbackId, errorId = errors?.length ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxDEV7("div", { className, children: [
    /* @__PURE__ */ jsxDEV7(Label, { htmlFor: id, ...labelProps }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 76,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7(
      Textarea,
      {
        id,
        "aria-invalid": errorId ? !0 : void 0,
        "aria-describedby": errorId,
        ...textareaProps
      },
      void 0,
      !1,
      {
        fileName: "app/components/forms.tsx",
        lineNumber: 77,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsxDEV7(ErrorList, { id: errorId, errors }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 84,
      columnNumber: 16
    }, this) : null }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 83,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/forms.tsx",
    lineNumber: 75,
    columnNumber: 3
  }, this);
}
function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className
}) {
  let fallbackId = useId(), buttonRef = useRef2(null), control = useInputEvent({
    // Retrieve the checkbox element by name instead as Radix does not expose the internal checkbox element
    // See https://github.com/radix-ui/primitives/discussions/874
    ref: () => buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ""),
    onFocus: () => buttonRef.current?.focus()
  }), id = buttonProps.id ?? buttonProps.name ?? fallbackId, errorId = errors?.length ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxDEV7("div", { className, children: [
    /* @__PURE__ */ jsxDEV7("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDEV7(
        Checkbox,
        {
          id,
          ref: buttonRef,
          "aria-invalid": errorId ? !0 : void 0,
          "aria-describedby": errorId,
          ...buttonProps,
          onCheckedChange: (state) => {
            control.change(Boolean(state.valueOf())), buttonProps.onCheckedChange?.(state);
          },
          onFocus: (event) => {
            control.focus(), buttonProps.onFocus?.(event);
          },
          onBlur: (event) => {
            control.blur(), buttonProps.onBlur?.(event);
          },
          type: "button"
        },
        void 0,
        !1,
        {
          fileName: "app/components/forms.tsx",
          lineNumber: 117,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ jsxDEV7(
        "label",
        {
          htmlFor: id,
          ...labelProps,
          className: "self-center text-body-xs text-muted-foreground"
        },
        void 0,
        !1,
        {
          fileName: "app/components/forms.tsx",
          lineNumber: 137,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/forms.tsx",
      lineNumber: 116,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV7("div", { className: "px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsxDEV7(ErrorList, { id: errorId, errors }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 144,
      columnNumber: 16
    }, this) : null }, void 0, !1, {
      fileName: "app/components/forms.tsx",
      lineNumber: 143,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/forms.tsx",
    lineNumber: 115,
    columnNumber: 3
  }, this);
}

// app/components/progress-bar.tsx
import { useNavigation as useNavigation2 } from "@remix-run/react";
import { useEffect as useEffect2, useRef as useRef3, useState as useState2 } from "react";
import { useSpinDelay as useSpinDelay2 } from "spin-delay";

// app/components/ui/icons/sprite.svg
var sprite_default = "/build/_assets/sprite-SZTQFBWO.svg";

// app/components/ui/icon.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var sizeClassName = {
  font: "w-[1em] h-[1em]",
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7"
}, childrenSizeClassName = {
  font: "gap-1.5",
  xs: "gap-1.5",
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2",
  xl: "gap-3"
};
function Icon({
  name,
  size = "font",
  className,
  children,
  ...props
}) {
  return children ? /* @__PURE__ */ jsxDEV8(
    "span",
    {
      className: `inline-flex items-center ${childrenSizeClassName[size]}`,
      children: [
        /* @__PURE__ */ jsxDEV8(Icon, { name, size, className, ...props }, void 0, !1, {
          fileName: "app/components/ui/icon.tsx",
          lineNumber: 52,
          columnNumber: 5
        }, this),
        children
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/ui/icon.tsx",
      lineNumber: 49,
      columnNumber: 4
    },
    this
  ) : /* @__PURE__ */ jsxDEV8(
    "svg",
    {
      ...props,
      className: cn(sizeClassName[size], "inline self-center", className),
      children: /* @__PURE__ */ jsxDEV8("use", { href: `${sprite_default}#${name}` }, void 0, !1, {
        fileName: "app/components/ui/icon.tsx",
        lineNumber: 62,
        columnNumber: 4
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/icon.tsx",
      lineNumber: 58,
      columnNumber: 3
    },
    this
  );
}

// app/components/progress-bar.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
function EpicProgress() {
  let transition = useNavigation2(), busy = transition.state !== "idle", delayedPending = useSpinDelay2(busy, {
    delay: 600,
    minDuration: 400
  }), ref = useRef3(null), [animationComplete, setAnimationComplete] = useState2(!0);
  return useEffect2(() => {
    if (!ref.current)
      return;
    delayedPending && setAnimationComplete(!1);
    let animationPromises = ref.current.getAnimations().map(({ finished }) => finished);
    Promise.allSettled(animationPromises).then(() => {
      delayedPending || setAnimationComplete(!0);
    });
  }, [delayedPending]), /* @__PURE__ */ jsxDEV9(
    "div",
    {
      role: "progressbar",
      "aria-hidden": delayedPending ? void 0 : !0,
      "aria-valuetext": delayedPending ? "Loading" : void 0,
      className: "fixed inset-x-0 left-0 top-0 z-50 h-[0.20rem] animate-pulse",
      children: [
        /* @__PURE__ */ jsxDEV9(
          "div",
          {
            ref,
            className: cn(
              "h-full w-0 bg-foreground duration-500 ease-in-out",
              transition.state === "idle" && (animationComplete ? "transition-none" : "w-full opacity-0 transition-all"),
              delayedPending && transition.state === "submitting" && "w-5/12",
              delayedPending && transition.state === "loading" && "w-8/12"
            )
          },
          void 0,
          !1,
          {
            fileName: "app/components/progress-bar.tsx",
            lineNumber: 37,
            columnNumber: 4
          },
          this
        ),
        delayedPending && /* @__PURE__ */ jsxDEV9("div", { className: "absolute flex items-center justify-center", children: /* @__PURE__ */ jsxDEV9(
          Icon,
          {
            name: "update",
            size: "md",
            className: "m-1 animate-spin text-foreground",
            "aria-hidden": !0
          },
          void 0,
          !1,
          {
            fileName: "app/components/progress-bar.tsx",
            lineNumber: 51,
            columnNumber: 6
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/progress-bar.tsx",
          lineNumber: 50,
          columnNumber: 5
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/progress-bar.tsx",
      lineNumber: 31,
      columnNumber: 3
    },
    this
  );
}

// app/components/search-bar.tsx
import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { useId as useId2 } from "react";

// app/components/ui/status-button.tsx
import * as React9 from "react";
import { useSpinDelay as useSpinDelay3 } from "spin-delay";

// app/components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import * as React7 from "react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors outline-none focus-visible:ring-4 focus-within:ring-4 ring-ring ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        wide: "px-24 py-5",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        pill: "px-12 py-3 leading-3",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Button = React7.forwardRef(
  ({ className, variant, size, asChild = !1, ...props }, ref) => /* @__PURE__ */ jsxDEV10(
    asChild ? Slot : "button",
    {
      className: cn(buttonVariants({ variant, size, className })),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/ui/button.tsx",
      lineNumber: 48,
      columnNumber: 4
    },
    this
  )
);
Button.displayName = "Button";

// app/components/ui/tooltip.tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React8 from "react";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var TooltipProvider = TooltipPrimitive.Provider, Tooltip = TooltipPrimitive.Root, TooltipTrigger = TooltipPrimitive.Trigger, TooltipContent = React8.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV11(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/tooltip.tsx",
    lineNumber: 16,
    columnNumber: 2
  },
  this
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// app/components/ui/status-button.tsx
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var StatusButton = React9.forwardRef(({ message, status, className, children, spinDelay, ...props }, ref) => {
  let companion = {
    pending: useSpinDelay3(status === "pending", {
      delay: 400,
      minDuration: 300,
      ...spinDelay
    }) ? /* @__PURE__ */ jsxDEV12("div", { className: "inline-flex h-6 w-6 items-center justify-center", children: /* @__PURE__ */ jsxDEV12(Icon, { name: "update", className: "animate-spin" }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 29,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 28,
      columnNumber: 4
    }, this) : null,
    success: /* @__PURE__ */ jsxDEV12("div", { className: "inline-flex h-6 w-6 items-center justify-center", children: /* @__PURE__ */ jsxDEV12(Icon, { name: "check" }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 34,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 33,
      columnNumber: 4
    }, this),
    error: /* @__PURE__ */ jsxDEV12("div", { className: "inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive", children: /* @__PURE__ */ jsxDEV12(Icon, { name: "cross-1", className: "text-destructive-foreground" }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 39,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 38,
      columnNumber: 4
    }, this),
    idle: null
  }[status];
  return /* @__PURE__ */ jsxDEV12(
    Button,
    {
      ref,
      className: cn("flex justify-center gap-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxDEV12("div", { children }, void 0, !1, {
          fileName: "app/components/ui/status-button.tsx",
          lineNumber: 51,
          columnNumber: 4
        }, this),
        message ? /* @__PURE__ */ jsxDEV12(TooltipProvider, { children: /* @__PURE__ */ jsxDEV12(Tooltip, { children: [
          /* @__PURE__ */ jsxDEV12(TooltipTrigger, { children: companion }, void 0, !1, {
            fileName: "app/components/ui/status-button.tsx",
            lineNumber: 55,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV12(TooltipContent, { children: message }, void 0, !1, {
            fileName: "app/components/ui/status-button.tsx",
            lineNumber: 56,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/ui/status-button.tsx",
          lineNumber: 54,
          columnNumber: 6
        }, this) }, void 0, !1, {
          fileName: "app/components/ui/status-button.tsx",
          lineNumber: 53,
          columnNumber: 5
        }, this) : companion
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/ui/status-button.tsx",
      lineNumber: 46,
      columnNumber: 3
    },
    this
  );
});
StatusButton.displayName = "Button";

// app/components/search-bar.tsx
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
function SearchBar({
  status,
  autoFocus = !1,
  autoSubmit = !1
}) {
  let id = useId2(), [searchParams] = useSearchParams(), submit = useSubmit(), isSubmitting = useIsPending({
    formMethod: "GET",
    formAction: "/users"
  }), handleFormChange = useDebounce((form) => {
    submit(form);
  }, 400);
  return /* @__PURE__ */ jsxDEV13(
    Form,
    {
      method: "GET",
      action: "/users",
      className: "flex flex-wrap items-center justify-center gap-2",
      onChange: (e) => autoSubmit && handleFormChange(e.currentTarget),
      children: [
        /* @__PURE__ */ jsxDEV13("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV13(Label, { htmlFor: id, className: "sr-only", children: "Search" }, void 0, !1, {
            fileName: "app/components/search-bar.tsx",
            lineNumber: 38,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ jsxDEV13(
            Input,
            {
              type: "search",
              name: "search",
              id,
              defaultValue: searchParams.get("search") ?? "",
              placeholder: "Search",
              className: "w-full",
              autoFocus
            },
            void 0,
            !1,
            {
              fileName: "app/components/search-bar.tsx",
              lineNumber: 41,
              columnNumber: 5
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/search-bar.tsx",
          lineNumber: 37,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ jsxDEV13("div", { children: /* @__PURE__ */ jsxDEV13(
          StatusButton,
          {
            type: "submit",
            status: isSubmitting ? "pending" : status,
            className: "flex w-full items-center justify-center",
            size: "sm",
            children: [
              /* @__PURE__ */ jsxDEV13(Icon, { name: "magnifying-glass", size: "sm" }, void 0, !1, {
                fileName: "app/components/search-bar.tsx",
                lineNumber: 58,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ jsxDEV13("span", { className: "sr-only", children: "Search" }, void 0, !1, {
                fileName: "app/components/search-bar.tsx",
                lineNumber: 59,
                columnNumber: 6
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/search-bar.tsx",
            lineNumber: 52,
            columnNumber: 5
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/search-bar.tsx",
          lineNumber: 51,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/search-bar.tsx",
      lineNumber: 31,
      columnNumber: 3
    },
    this
  );
}

// app/components/toaster.tsx
import { useEffect as useEffect3 } from "react";
import { Toaster, toast as showToast } from "sonner";
import { Fragment, jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
function EpicToaster({ toast }) {
  return /* @__PURE__ */ jsxDEV14(Fragment, { children: [
    /* @__PURE__ */ jsxDEV14(Toaster, { closeButton: !0, position: "top-center" }, void 0, !1, {
      fileName: "app/components/toaster.tsx",
      lineNumber: 8,
      columnNumber: 4
    }, this),
    toast ? /* @__PURE__ */ jsxDEV14(ShowToast, { toast }, void 0, !1, {
      fileName: "app/components/toaster.tsx",
      lineNumber: 9,
      columnNumber: 13
    }, this) : null
  ] }, void 0, !0, {
    fileName: "app/components/toaster.tsx",
    lineNumber: 7,
    columnNumber: 3
  }, this);
}
function ShowToast({ toast }) {
  let { id, type, title, description } = toast;
  return useEffect3(() => {
    setTimeout(() => {
      showToast[type](title, { id, description });
    }, 0);
  }, [description, id, title, type]), null;
}

// app/components/ui/dropdown-menu.tsx
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React10 from "react";
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root, DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSubTrigger = React10.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDEV15("span", { className: "ml-auto h-4 w-4", children: "\u25B6\uFE0F" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 34,
        columnNumber: 3
      }, this)
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 24,
    columnNumber: 2
  },
  this
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropdownMenuSubContent = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 44,
    columnNumber: 2
  },
  this
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = React10.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxDEV15(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 61,
    columnNumber: 3
  },
  this
) }, void 0, !1, {
  fileName: "app/components/ui/dropdown-menu.tsx",
  lineNumber: 60,
  columnNumber: 2
}, this));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 80,
    columnNumber: 2
  },
  this
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuCheckboxItem = React10.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV15("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV15(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV15("span", { className: "h-4 w-4", children: /* @__PURE__ */ jsxDEV15("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ jsxDEV15(
        "path",
        {
          d: "M1,4 L3,6 L7,2",
          stroke: "black",
          strokeWidth: "1",
          fill: "none"
        },
        void 0,
        !1,
        {
          fileName: "app/components/ui/dropdown-menu.tsx",
          lineNumber: 109,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 108,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 107,
        columnNumber: 5
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 106,
        columnNumber: 4
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 105,
        columnNumber: 3
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 96,
    columnNumber: 2
  },
  this
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropdownMenuRadioItem = React10.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDEV15("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDEV15(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsxDEV15("span", { className: "h-2 w-2", children: "\u26AA" }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 139,
        columnNumber: 5
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 138,
        columnNumber: 4
      }, this) }, void 0, !1, {
        fileName: "app/components/ui/dropdown-menu.tsx",
        lineNumber: 137,
        columnNumber: 3
      }, this),
      children
    ]
  },
  void 0,
  !0,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 129,
    columnNumber: 2
  },
  this
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropdownMenuLabel = React10.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 153,
    columnNumber: 2
  },
  this
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React10.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV15(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 169,
    columnNumber: 2
  },
  this
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxDEV15(
  "span",
  {
    className: cn("ml-auto text-xs tracking-widest opacity-60", className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/ui/dropdown-menu.tsx",
    lineNumber: 182,
    columnNumber: 3
  },
  this
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

// app/styles/font.css
var font_default = "/build/_assets/font-ISWYXDEE.css";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-NJPDFGSZ.css";

// app/utils/auth.server.ts
import { redirect as redirect3 } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { Authenticator } from "remix-auth";
import { safeRedirect } from "remix-utils/safe-redirect";

// app/utils/connections.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

// app/utils/providers/github.server.ts
import { createId as cuid } from "@paralleldrive/cuid2";
import { redirect as redirect2 } from "@remix-run/node";
import { GitHubStrategy } from "remix-auth-github";
import { z as z4 } from "zod";

// app/utils/cache.server.ts
import fs from "fs";
import { remember as remember2 } from "@epic-web/remember";
import Database from "better-sqlite3";
import {
  cachified as baseCachified,
  lruCacheAdapter,
  verboseReporter,
  mergeReporters
} from "cachified";
import { LRUCache } from "lru-cache";
import { z as z3 } from "zod";

// app/routes/admin+/cache_.sqlite.tsx
var cache_sqlite_exports = {};
__export(cache_sqlite_exports, {
  action: () => action,
  updatePrimaryCacheValue: () => updatePrimaryCacheValue
});
import { json, redirect } from "@remix-run/node";
import { getInstanceInfo as getInstanceInfo2, getInternalInstanceDomain } from "litefs-js";
import { z as z2 } from "zod";
async function action({ request }) {
  let { currentIsPrimary, primaryInstance } = await getInstanceInfo2();
  if (!currentIsPrimary)
    throw new Error(
      `${request.url} should only be called on the primary instance (${primaryInstance})}`
    );
  let token = process.env.INTERNAL_COMMAND_TOKEN;
  if (!(request.headers.get("Authorization") === `Bearer ${token}`))
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  let { key: key2, cacheValue } = z2.object({ key: z2.string(), cacheValue: z2.unknown().optional() }).parse(await request.json());
  return cacheValue === void 0 ? await cache.delete(key2) : await cache.set(key2, cacheValue), json({ success: !0 });
}
async function updatePrimaryCacheValue({
  key: key2,
  cacheValue
}) {
  let { currentIsPrimary, primaryInstance } = await getInstanceInfo2();
  if (currentIsPrimary)
    throw new Error(
      `updatePrimaryCacheValue should not be called on the primary instance (${primaryInstance})}`
    );
  let domain = getInternalInstanceDomain(primaryInstance), token = process.env.INTERNAL_COMMAND_TOKEN;
  return fetch(`${domain}/admin/cache/sqlite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ key: key2, cacheValue })
  });
}

// app/utils/litefs.server.ts
var litefs_server_exports = {};
__reExport(litefs_server_exports, litefs_js_star);
__reExport(litefs_server_exports, remix_star);
import * as litefs_js_star from "litefs-js";
import * as remix_star from "litefs-js/remix.js";

// app/utils/cache.server.ts
var CACHE_DATABASE_PATH = process.env.CACHE_DATABASE_PATH, cacheDb = remember2("cacheDb", createDatabase);
function createDatabase(tryAgain = !0) {
  let db = new Database(CACHE_DATABASE_PATH), { currentIsPrimary } = (0, litefs_server_exports.getInstanceInfoSync)();
  if (!currentIsPrimary)
    return db;
  try {
    db.exec(`
			CREATE TABLE IF NOT EXISTS cache (
				key TEXT PRIMARY KEY,
				metadata TEXT,
				value TEXT
			)
		`);
  } catch (error) {
    if (fs.unlinkSync(CACHE_DATABASE_PATH), tryAgain)
      return console.error(
        `Error creating cache database, deleting the file at "${CACHE_DATABASE_PATH}" and trying again...`
      ), createDatabase(!1);
    throw error;
  }
  return db;
}
var lru = remember2(
  "lru-cache",
  () => new LRUCache({ max: 5e3 })
), lruCache = lruCacheAdapter(lru), cacheEntrySchema = z3.object({
  metadata: z3.object({
    createdTime: z3.number(),
    ttl: z3.number().nullable().optional(),
    swr: z3.number().nullable().optional()
  }),
  value: z3.unknown()
}), cacheQueryResultSchema = z3.object({
  metadata: z3.string(),
  value: z3.string()
}), cache = {
  name: "SQLite cache",
  get(key2) {
    let result = cacheDb.prepare("SELECT value, metadata FROM cache WHERE key = ?").get(key2), parseResult = cacheQueryResultSchema.safeParse(result);
    if (!parseResult.success)
      return null;
    let parsedEntry = cacheEntrySchema.safeParse({
      metadata: JSON.parse(parseResult.data.metadata),
      value: JSON.parse(parseResult.data.value)
    });
    if (!parsedEntry.success)
      return null;
    let { metadata, value } = parsedEntry.data;
    return value ? { metadata, value } : null;
  },
  async set(key2, entry2) {
    let { currentIsPrimary, primaryInstance } = await (0, litefs_server_exports.getInstanceInfo)();
    currentIsPrimary ? cacheDb.prepare(
      "INSERT OR REPLACE INTO cache (key, value, metadata) VALUES (@key, @value, @metadata)"
    ).run({
      key: key2,
      value: JSON.stringify(entry2.value),
      metadata: JSON.stringify(entry2.metadata)
    }) : updatePrimaryCacheValue({
      key: key2,
      cacheValue: entry2
    }).then((response) => {
      response.ok || console.error(
        `Error updating cache value for key "${key2}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`,
        { entry: entry2 }
      );
    });
  },
  async delete(key2) {
    let { currentIsPrimary, primaryInstance } = await (0, litefs_server_exports.getInstanceInfo)();
    currentIsPrimary ? cacheDb.prepare("DELETE FROM cache WHERE key = ?").run(key2) : updatePrimaryCacheValue({
      key: key2,
      cacheValue: void 0
    }).then((response) => {
      response.ok || console.error(
        `Error deleting cache value for key "${key2}" on primary instance (${primaryInstance}): ${response.status} ${response.statusText}`
      );
    });
  }
};
async function getAllCacheKeys(limit) {
  return {
    sqlite: cacheDb.prepare("SELECT key FROM cache LIMIT ?").all(limit).map((row) => row.key),
    lru: [...lru.keys()]
  };
}
async function searchCacheKeys(search, limit) {
  return {
    sqlite: cacheDb.prepare("SELECT key FROM cache WHERE key LIKE ? LIMIT ?").all(`%${search}%`, limit).map((row) => row.key),
    lru: [...lru.keys()].filter((key2) => key2.includes(search))
  };
}
async function cachified({
  timings,
  reporter = verboseReporter(),
  ...options
}) {
  return baseCachified({
    ...options,
    reporter: mergeReporters(cachifiedTimingReporter(timings), reporter)
  });
}

// app/utils/providers/github.server.ts
var GitHubUserSchema = z4.object({ login: z4.string() }), GitHubUserParseResult = z4.object({
  success: z4.literal(!0),
  data: GitHubUserSchema
}).or(
  z4.object({
    success: z4.literal(!1)
  })
), shouldMock = process.env.GITHUB_CLIENT_ID?.startsWith("MOCK_"), GitHubProvider = class {
  getAuthStrategy() {
    return new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
      },
      async ({ profile }) => {
        let email = profile.emails[0].value.trim().toLowerCase(), username = profile.displayName, imageUrl = profile.photos[0].value;
        return {
          email,
          id: profile.id,
          username,
          name: profile.name.givenName,
          imageUrl
        };
      }
    );
  }
  async resolveConnectionData(providerId, { timings } = {}) {
    let result = await cachified({
      key: `connection-data:github:${providerId}`,
      cache,
      timings,
      ttl: 6e4,
      swr: 6048e5,
      async getFreshValue(context) {
        await new Promise((r) => setTimeout(r, 3e3));
        let rawJson = await (await fetch(
          `https://api.github.com/user/${providerId}`,
          { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
        )).json(), result2 = GitHubUserSchema.safeParse(rawJson);
        return result2.success || (context.metadata.ttl = 0), result2;
      },
      checkValue: GitHubUserParseResult
    });
    return {
      displayName: result.success ? result.data.login : "Unknown",
      link: result.success ? `https://github.com/${result.data.login}` : null
    };
  }
  async handleMockAction(request) {
    if (!shouldMock)
      return;
    let connectionSession = await connectionSessionStorage.getSession(
      request.headers.get("cookie")
    ), state = cuid();
    connectionSession.set("oauth2:state", state);
    let code = "MOCK_CODE_GITHUB_KODY", searchParams = new URLSearchParams({ code, state });
    throw redirect2(`/auth/github/callback?${searchParams}`, {
      headers: {
        "set-cookie": await connectionSessionStorage.commitSession(connectionSession)
      }
    });
  }
};

// app/utils/connections.server.ts
var connectionSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_connection",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    maxAge: 60 * 10,
    // 10 minutes
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
}), providers = {
  github: new GitHubProvider()
};
function handleMockAction(providerName, request) {
  return providers[providerName].handleMockAction(request);
}
function resolveConnectionData(providerName, providerId, options) {
  return providers[providerName].resolveConnectionData(providerId, options);
}

// app/utils/auth.server.ts
init_db_server();

// app/utils/session.server.ts
import { createCookieSessionStorage as createCookieSessionStorage2 } from "@remix-run/node";
var authSessionStorage = createCookieSessionStorage2({
  cookie: {
    name: "en_session",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
}), originalCommitSession = authSessionStorage.commitSession;
Object.defineProperty(authSessionStorage, "commitSession", {
  value: async function(...args) {
    let [session, options] = args;
    options?.expires && session.set("expires", options.expires), options?.maxAge && session.set("expires", new Date(Date.now() + options.maxAge * 1e3));
    let expires = session.has("expires") ? new Date(session.get("expires")) : void 0;
    return await originalCommitSession(session, {
      ...options,
      expires
    });
  }
});

// app/utils/auth.server.ts
var SESSION_EXPIRATION_TIME = 1e3 * 60 * 60 * 24 * 30, getSessionExpirationDate = () => new Date(Date.now() + SESSION_EXPIRATION_TIME), sessionKey = "sessionId", authenticator = new Authenticator(
  connectionSessionStorage
);
for (let [providerName, provider] of Object.entries(providers))
  authenticator.use(provider.getAuthStrategy(), providerName);
async function getUserId(request) {
  let authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  ), sessionId = authSession.get(sessionKey);
  if (!sessionId)
    return null;
  let session = await prisma.session.findUnique({
    select: { user: { select: { id: !0 } } },
    where: { id: sessionId, expirationDate: { gt: /* @__PURE__ */ new Date() } }
  });
  if (!session?.user)
    throw redirect3("/", {
      headers: {
        "set-cookie": await authSessionStorage.destroySession(authSession)
      }
    });
  return session.user.id;
}
async function requireUserId(request, { redirectTo } = {}) {
  let userId = await getUserId(request);
  if (!userId) {
    let requestUrl = new URL(request.url);
    redirectTo = redirectTo === null ? null : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    let loginRedirect = ["/login", (redirectTo ? new URLSearchParams({ redirectTo }) : null)?.toString()].filter(Boolean).join("?");
    throw redirect3(loginRedirect);
  }
  return userId;
}
async function requireAnonymous(request) {
  if (await getUserId(request))
    throw redirect3("/");
}
async function login({
  username,
  password
}) {
  let user = await verifyUserPassword({ username }, password);
  return user ? await prisma.session.create({
    select: { id: !0, expirationDate: !0, userId: !0 },
    data: {
      expirationDate: getSessionExpirationDate(),
      userId: user.id
    }
  }) : null;
}
async function resetUserPassword({
  username,
  password
}) {
  let hashedPassword = await getPasswordHash(password);
  return prisma.user.update({
    where: { username },
    data: {
      password: {
        update: {
          hash: hashedPassword
        }
      }
    }
  });
}
async function signup({
  email,
  username,
  password,
  name
}) {
  let hashedPassword = await getPasswordHash(password);
  return await prisma.session.create({
    data: {
      expirationDate: getSessionExpirationDate(),
      user: {
        create: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          name,
          roles: { connect: { name: "user" } },
          password: {
            create: {
              hash: hashedPassword
            }
          }
        }
      }
    },
    select: { id: !0, expirationDate: !0 }
  });
}
async function signupWithConnection({
  email,
  username,
  name,
  providerId,
  providerName,
  imageUrl
}) {
  return await prisma.session.create({
    data: {
      expirationDate: getSessionExpirationDate(),
      user: {
        create: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          name,
          roles: { connect: { name: "user" } },
          connections: { create: { providerId, providerName } },
          image: imageUrl ? { create: await downloadFile(imageUrl) } : void 0
        }
      }
    },
    select: { id: !0, expirationDate: !0 }
  });
}
async function logout({
  request,
  redirectTo = "/"
}, responseInit) {
  let authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  ), sessionId = authSession.get(sessionKey);
  throw sessionId && prisma.session.deleteMany({ where: { id: sessionId } }), redirect3(safeRedirect(redirectTo), {
    ...responseInit,
    headers: combineHeaders(
      { "set-cookie": await authSessionStorage.destroySession(authSession) },
      responseInit?.headers
    )
  });
}
async function getPasswordHash(password) {
  return await bcrypt.hash(password, 10);
}
async function verifyUserPassword(where, password) {
  let userWithPassword = await prisma.user.findUnique({
    where,
    select: { id: !0, password: { select: { hash: !0 } } }
  });
  return !userWithPassword || !userWithPassword.password || !await bcrypt.compare(password, userWithPassword.password.hash) ? null : { id: userWithPassword.id };
}

// app/utils/client-hints.tsx
import { getHintUtils } from "@epic-web/client-hints";
import {
  clientHint as colorSchemeHint,
  subscribeToSchemeChange
} from "@epic-web/client-hints/color-scheme";
import { clientHint as timeZoneHint } from "@epic-web/client-hints/time-zone";
import { useRevalidator } from "@remix-run/react";
import * as React11 from "react";

// app/utils/request-info.ts
import { useRouteLoaderData } from "@remix-run/react";
function useRequestInfo() {
  let data = useRouteLoaderData("root");
  return invariant(data?.requestInfo, "No requestInfo found in root loader"), data.requestInfo;
}

// app/utils/client-hints.tsx
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
var hintsUtils = getHintUtils({
  theme: colorSchemeHint,
  timeZone: timeZoneHint
  // add other hints here
}), { getHints } = hintsUtils;
function useHints() {
  return useRequestInfo().hints;
}
function ClientHintCheck({ nonce }) {
  let { revalidate } = useRevalidator();
  return React11.useEffect(
    () => subscribeToSchemeChange(() => revalidate()),
    [revalidate]
  ), /* @__PURE__ */ jsxDEV16(
    "script",
    {
      nonce,
      dangerouslySetInnerHTML: {
        __html: hintsUtils.getClientHintCheckScript()
      }
    },
    void 0,
    !1,
    {
      fileName: "app/utils/client-hints.tsx",
      lineNumber: 44,
      columnNumber: 3
    },
    this
  );
}

// app/utils/csrf.server.ts
import { createCookie } from "@remix-run/node";
import { CSRF, CSRFError } from "remix-utils/csrf/server";
var cookie = createCookie("csrf", {
  path: "/",
  httpOnly: !0,
  secure: !1,
  sameSite: "lax",
  secrets: process.env.SESSION_SECRET.split(",")
}), csrf = new CSRF({ cookie });
async function validateCSRF(formData, headers3) {
  try {
    await csrf.validate(formData, headers3);
  } catch (error) {
    throw error instanceof CSRFError ? new Response("Invalid CSRF token", { status: 403 }) : error;
  }
}

// app/root.tsx
init_db_server();

// app/utils/honeypot.server.ts
import { Honeypot, SpamError } from "remix-utils/honeypot/server";
var honeypot = new Honeypot({
  validFromFieldName: process.env.TESTING ? null : void 0,
  encryptionSeed: process.env.HONEYPOT_SECRET
});
function checkHoneypot(formData) {
  try {
    honeypot.check(formData);
  } catch (error) {
    throw error instanceof SpamError ? new Response("Form not submitted properly", { status: 400 }) : error;
  }
}

// app/utils/theme.server.ts
import * as cookie2 from "cookie";
var cookieName = "en_theme";
function getTheme(request) {
  let cookieHeader = request.headers.get("cookie"), parsed = cookieHeader ? cookie2.parse(cookieHeader)[cookieName] : "light";
  return parsed === "light" || parsed === "dark" ? parsed : null;
}
function setTheme(theme) {
  return theme === "system" ? cookie2.serialize(cookieName, "", { path: "/", maxAge: -1 }) : cookie2.serialize(cookieName, theme, { path: "/" });
}

// app/utils/toast.server.ts
import { createId as cuid2 } from "@paralleldrive/cuid2";
import { createCookieSessionStorage as createCookieSessionStorage3, redirect as redirect4 } from "@remix-run/node";
import { z as z5 } from "zod";
var toastKey = "toast", TypeSchema = z5.enum(["message", "success", "error"]), ToastSchema = z5.object({
  description: z5.string(),
  id: z5.string().default(() => cuid2()),
  title: z5.string().optional(),
  type: TypeSchema.default("message")
}), toastSessionStorage = createCookieSessionStorage3({
  cookie: {
    name: "en_toast",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
});
async function redirectWithToast(url, toast, init4) {
  return redirect4(url, {
    ...init4,
    headers: combineHeaders(init4?.headers, await createToastHeaders(toast))
  });
}
async function createToastHeaders(optionalToast) {
  let session = await toastSessionStorage.getSession(), toast = ToastSchema.parse(optionalToast);
  session.flash(toastKey, toast);
  let cookie4 = await toastSessionStorage.commitSession(session);
  return new Headers({ "set-cookie": cookie4 });
}
async function getToast(request) {
  let session = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  ), result = ToastSchema.safeParse(session.get(toastKey)), toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast ? new Headers({
      "set-cookie": await toastSessionStorage.destroySession(session)
    }) : null
  };
}

// app/utils/user.ts
import { useRouteLoaderData as useRouteLoaderData2 } from "@remix-run/react";
function isUser(user) {
  return user && typeof user == "object" && typeof user.id == "string";
}
function useOptionalUser() {
  let data = useRouteLoaderData2("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}

// app/root.tsx
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var links = () => [
  // Preload svg sprite as a resource to avoid render blocking
  { rel: "preload", href: sprite_default, as: "image" },
  // Preload CSS as a resource to avoid render blocking
  { rel: "preload", href: font_default, as: "style" },
  { rel: "preload", href: tailwind_default, as: "style" },
  void 0 ? { rel: "preload", href: void 0, as: "style" } : null,
  { rel: "mask-icon", href: "/favicons/mask-icon.svg" },
  {
    rel: "alternate icon",
    type: "image/png",
    href: "/favicons/favicon-32x32.png"
  },
  { rel: "apple-touch-icon", href: "/favicons/apple-touch-icon.png" },
  {
    rel: "manifest",
    href: "/site.webmanifest",
    crossOrigin: "use-credentials"
  },
  // necessary to make typescript happy
  //These should match the css preloads above to avoid css as render blocking resource
  { rel: "icon", type: "image/svg+xml", href: "/favicons/favicon.svg" },
  { rel: "stylesheet", href: font_default },
  { rel: "stylesheet", href: tailwind_default },
  void 0 ? { rel: "stylesheet", href: void 0 } : null
].filter(Boolean), meta = ({ data }) => [
  { title: data ? "Epic Notes" : "Error | Epic Notes" },
  { name: "description", content: "Your own captain's log" }
];
async function loader({ request }) {
  let timings = makeTimings("root loader"), userId = await time(() => getUserId(request), {
    timings,
    type: "getUserId",
    desc: "getUserId in root"
  }), user = userId ? await time(
    () => prisma.user.findUniqueOrThrow({
      select: {
        id: !0,
        name: !0,
        username: !0,
        image: { select: { id: !0 } },
        roles: {
          select: {
            name: !0,
            permissions: {
              select: { entity: !0, action: !0, access: !0 }
            }
          }
        }
      },
      where: { id: userId }
    }),
    { timings, type: "find user", desc: "find user in root" }
  ) : null;
  userId && !user && (console.info("something weird happened"), await logout({ request, redirectTo: "/" }));
  let { toast, headers: toastHeaders } = await getToast(request), honeyProps = honeypot.getInputProps(), [csrfToken, csrfCookieHeader] = await csrf.commitToken();
  return json2(
    {
      user,
      requestInfo: {
        hints: getHints(request),
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
        userPrefs: {
          theme: getTheme(request)
        }
      },
      ENV: getEnv(),
      toast,
      honeyProps,
      csrfToken
    },
    {
      headers: combineHeaders(
        { "Server-Timing": timings.toString() },
        toastHeaders,
        csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null
      )
    }
  );
}
var headers = ({ loaderHeaders }) => ({
  "Server-Timing": loaderHeaders.get("Server-Timing") ?? ""
}), ThemeFormSchema = z6.object({
  theme: z6.enum(["system", "light", "dark"])
});
async function action2({ request }) {
  let formData = await request.formData(), submission = parse2(formData, {
    schema: ThemeFormSchema
  });
  if (submission.intent !== "submit")
    return json2({ status: "idle", submission });
  if (!submission.value)
    return json2({ status: "error", submission }, { status: 400 });
  let { theme } = submission.value, responseInit = {
    headers: { "set-cookie": setTheme(theme) }
  };
  return json2({ success: !0, submission }, responseInit);
}
function Document({
  children,
  nonce,
  theme = "light",
  env = {}
}) {
  return /* @__PURE__ */ jsxDEV17("html", { lang: "en", className: `${theme} h-full overflow-x-hidden`, children: [
    /* @__PURE__ */ jsxDEV17("head", { children: [
      /* @__PURE__ */ jsxDEV17(ClientHintCheck, { nonce }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 207,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 208,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17("meta", { charSet: "utf-8" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 209,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 210,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 211,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 206,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17("body", { className: "bg-background text-foreground", children: [
      children,
      /* @__PURE__ */ jsxDEV17(
        "script",
        {
          nonce,
          dangerouslySetInnerHTML: {
            __html: `window.ENV = ${JSON.stringify(env)}`
          }
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 215,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ jsxDEV17(ScrollRestoration, { nonce }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 221,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17(Scripts, { nonce }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 222,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17(LiveReload, { nonce }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 223,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 213,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 205,
    columnNumber: 5
  }, this);
}
function App() {
  let data = useLoaderData(), nonce = useNonce(), user = useOptionalUser(), theme = useTheme(), searchBar = useMatches().find((m) => m.id === "routes/users+/index") ? null : /* @__PURE__ */ jsxDEV17(SearchBar, { status: "idle" }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 236,
    columnNumber: 45
  }, this);
  return /* @__PURE__ */ jsxDEV17(Document, { nonce, theme, env: data.ENV, children: [
    /* @__PURE__ */ jsxDEV17("div", { className: "flex h-screen flex-col justify-between", children: [
      /* @__PURE__ */ jsxDEV17("header", { className: "container py-6", children: /* @__PURE__ */ jsxDEV17("nav", { children: /* @__PURE__ */ jsxDEV17("div", { className: "flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8", children: [
        /* @__PURE__ */ jsxDEV17(Link, { to: "/", children: [
          /* @__PURE__ */ jsxDEV17("div", { className: "font-light", children: "epic" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 245,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV17("div", { className: "font-bold", children: "notes" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 246,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 244,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV17("div", { className: "ml-auto hidden max-w-sm flex-1 sm:block", children: searchBar }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 248,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV17("div", { className: "flex items-center gap-10", children: user ? /* @__PURE__ */ jsxDEV17(UserDropdown, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 253,
          columnNumber: 17
        }, this) : /* @__PURE__ */ jsxDEV17(Button, { asChild: !0, variant: "default", size: "sm", children: /* @__PURE__ */ jsxDEV17(Link, { to: "/login", children: "Log In" }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 256,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 255,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 251,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV17("div", { className: "block w-full sm:hidden", children: searchBar }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 260,
          columnNumber: 8
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 243,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 242,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 241,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV17(Outlet, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 266,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 265,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV17("div", { className: "container flex justify-between pb-5", children: [
        /* @__PURE__ */ jsxDEV17(Link, { to: "/", children: [
          /* @__PURE__ */ jsxDEV17("div", { className: "font-light", children: "epic" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 271,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV17("div", { className: "font-bold", children: "notes" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 272,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 270,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV17(ThemeSwitch, { userPreference: data.requestInfo.userPrefs.theme }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 274,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 269,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 240,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17(EpicToaster, { toast: data.toast }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 277,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17(EpicProgress, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 278,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 239,
    columnNumber: 5
  }, this);
}
function AppWithProviders() {
  let data = useLoaderData();
  return /* @__PURE__ */ jsxDEV17(AuthenticityTokenProvider, { token: data.csrfToken, children: /* @__PURE__ */ jsxDEV17(HoneypotProvider, { ...data.honeyProps, children: /* @__PURE__ */ jsxDEV17(App, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 288,
    columnNumber: 5
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 287,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 286,
    columnNumber: 5
  }, this);
}
var root_default = withSentry(AppWithProviders);
function UserDropdown() {
  let user = useUser(), submit = useSubmit2(), formRef = useRef4(null);
  return /* @__PURE__ */ jsxDEV17(DropdownMenu, { children: [
    /* @__PURE__ */ jsxDEV17(DropdownMenuTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV17(Button, { asChild: !0, variant: "secondary", children: /* @__PURE__ */ jsxDEV17(
      Link,
      {
        to: `/users/${user.username}`,
        onClick: (e) => e.preventDefault(),
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxDEV17(
            "img",
            {
              className: "h-8 w-8 rounded-full object-cover",
              alt: user.name ?? user.username,
              src: getUserImgSrc(user.image?.id)
            },
            void 0,
            !1,
            {
              fileName: "app/root.tsx",
              lineNumber: 310,
              columnNumber: 7
            },
            this
          ),
          /* @__PURE__ */ jsxDEV17("span", { className: "text-body-sm font-bold", children: user.name ?? user.username }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 315,
            columnNumber: 7
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/root.tsx",
        lineNumber: 304,
        columnNumber: 6
      },
      this
    ) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 303,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 302,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17(DropdownMenuPortal, { children: /* @__PURE__ */ jsxDEV17(DropdownMenuContent, { sideOffset: 8, align: "start", children: [
      /* @__PURE__ */ jsxDEV17(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxDEV17(Link, { prefetch: "intent", to: `/users/${user.username}`, children: /* @__PURE__ */ jsxDEV17(Icon, { className: "text-body-md", name: "avatar", children: "Profile" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 325,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 324,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 323,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV17(DropdownMenuItem, { asChild: !0, children: /* @__PURE__ */ jsxDEV17(Link, { prefetch: "intent", to: `/users/${user.username}/notes`, children: /* @__PURE__ */ jsxDEV17(Icon, { className: "text-body-md", name: "pencil-2", children: "Notes" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 332,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 331,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 330,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV17(
        DropdownMenuItem,
        {
          asChild: !0,
          onSelect: (event) => {
            event.preventDefault(), submit(formRef.current);
          },
          children: /* @__PURE__ */ jsxDEV17(Form2, { action: "/logout", method: "POST", ref: formRef, children: /* @__PURE__ */ jsxDEV17(Icon, { className: "text-body-md", name: "exit", children: /* @__PURE__ */ jsxDEV17("button", { type: "submit", children: "Logout" }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 347,
            columnNumber: 9
          }, this) }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 346,
            columnNumber: 8
          }, this) }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 345,
            columnNumber: 7
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/root.tsx",
          lineNumber: 337,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 322,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 321,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 301,
    columnNumber: 5
  }, this);
}
function useTheme() {
  let hints = useHints(), requestInfo = useRequestInfo(), optimisticMode = useOptimisticThemeMode();
  return optimisticMode ? optimisticMode === "system" ? hints.theme : optimisticMode : requestInfo.userPrefs.theme ?? hints.theme;
}
function useOptimisticThemeMode() {
  let themeFetcher = useFetchers().find((f) => f.formAction === "/");
  if (themeFetcher && themeFetcher.formData)
    return parse2(themeFetcher.formData, {
      schema: ThemeFormSchema
    }).value?.theme;
}
function ThemeSwitch({ userPreference }) {
  let fetcher = useFetcher(), [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission
  }), mode2 = useOptimisticThemeMode() ?? userPreference ?? "system", nextMode = mode2 === "system" ? "light" : mode2 === "light" ? "dark" : "system", modeLabel = {
    light: /* @__PURE__ */ jsxDEV17(Icon, { name: "sun", children: /* @__PURE__ */ jsxDEV17("span", { className: "sr-only", children: "Light" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 402,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 401,
      columnNumber: 5
    }, this),
    dark: /* @__PURE__ */ jsxDEV17(Icon, { name: "moon", children: /* @__PURE__ */ jsxDEV17("span", { className: "sr-only", children: "Dark" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 407,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 406,
      columnNumber: 5
    }, this),
    system: /* @__PURE__ */ jsxDEV17(Icon, { name: "laptop", children: /* @__PURE__ */ jsxDEV17("span", { className: "sr-only", children: "System" }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 412,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 411,
      columnNumber: 5
    }, this)
  };
  return /* @__PURE__ */ jsxDEV17(fetcher.Form, { method: "POST", ...form.props, children: [
    /* @__PURE__ */ jsxDEV17("input", { type: "hidden", name: "theme", value: nextMode }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 419,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxDEV17(
      "button",
      {
        type: "submit",
        className: "flex h-8 w-8 cursor-pointer items-center justify-center",
        children: modeLabel[mode2]
      },
      void 0,
      !1,
      {
        fileName: "app/root.tsx",
        lineNumber: 421,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 420,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV17(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 428,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 418,
    columnNumber: 5
  }, this);
}
function ErrorBoundary() {
  let nonce = useNonce();
  return /* @__PURE__ */ jsxDEV17(Document, { nonce, children: /* @__PURE__ */ jsxDEV17(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 447,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 446,
    columnNumber: 5
  }, this);
}

// app/routes/$.tsx
var __exports = {};
__export(__exports, {
  ErrorBoundary: () => ErrorBoundary2,
  default: () => NotFound,
  loader: () => loader2
});
import { Link as Link2, useLocation } from "@remix-run/react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
async function loader2() {
  throw new Response("Not found", { status: 404 });
}
function NotFound() {
  return /* @__PURE__ */ jsxDEV18(ErrorBoundary2, {}, void 0, !1, {
    fileName: "app/routes/$.tsx",
    lineNumber: 19,
    columnNumber: 9
  }, this);
}
function ErrorBoundary2() {
  let location = useLocation();
  return /* @__PURE__ */ jsxDEV18(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: () => /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxDEV18("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxDEV18("h1", { children: "We can't find this page:" }, void 0, !1, {
              fileName: "app/routes/$.tsx",
              lineNumber: 30,
              columnNumber: 8
            }, this),
            /* @__PURE__ */ jsxDEV18("pre", { className: "whitespace-pre-wrap break-all text-body-lg", children: location.pathname }, void 0, !1, {
              fileName: "app/routes/$.tsx",
              lineNumber: 31,
              columnNumber: 8
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/$.tsx",
            lineNumber: 29,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ jsxDEV18(Link2, { to: "/", className: "text-body-md underline", children: /* @__PURE__ */ jsxDEV18(Icon, { name: "arrow-left", children: "Back to home" }, void 0, !1, {
            fileName: "app/routes/$.tsx",
            lineNumber: 36,
            columnNumber: 8
          }, this) }, void 0, !1, {
            fileName: "app/routes/$.tsx",
            lineNumber: 35,
            columnNumber: 7
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/$.tsx",
          lineNumber: 28,
          columnNumber: 6
        }, this)
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/$.tsx",
      lineNumber: 25,
      columnNumber: 3
    },
    this
  );
}

// app/routes/_auth+/auth.$provider.ts
var auth_provider_exports = {};
__export(auth_provider_exports, {
  action: () => action3,
  loader: () => loader3
});
import { redirect as redirect5 } from "@remix-run/node";

// app/utils/connections.tsx
import { Form as Form3 } from "@remix-run/react";
import { z as z7 } from "zod";
import { jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var GITHUB_PROVIDER_NAME = "github", providerNames = [GITHUB_PROVIDER_NAME], ProviderNameSchema = z7.enum(providerNames), providerLabels = {
  [GITHUB_PROVIDER_NAME]: "GitHub"
}, providerIcons = {
  [GITHUB_PROVIDER_NAME]: /* @__PURE__ */ jsxDEV19(Icon, { name: "github-logo" }, void 0, !1, {
    fileName: "app/utils/connections.tsx",
    lineNumber: 19,
    columnNumber: 26
  }, this)
};
function ProviderConnectionForm({
  redirectTo,
  type,
  providerName
}) {
  let label = providerLabels[providerName], formAction = `/auth/${providerName}`, isPending = useIsPending({ formAction });
  return /* @__PURE__ */ jsxDEV19(
    Form3,
    {
      className: "flex items-center justify-center gap-2",
      action: formAction,
      method: "POST",
      children: [
        redirectTo ? /* @__PURE__ */ jsxDEV19("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
          fileName: "app/utils/connections.tsx",
          lineNumber: 41,
          columnNumber: 5
        }, this) : null,
        /* @__PURE__ */ jsxDEV19(
          StatusButton,
          {
            type: "submit",
            className: "w-full",
            status: isPending ? "pending" : "idle",
            children: /* @__PURE__ */ jsxDEV19("span", { className: "inline-flex items-center gap-1.5", children: [
              providerIcons[providerName],
              /* @__PURE__ */ jsxDEV19("span", { children: [
                type,
                " with ",
                label
              ] }, void 0, !0, {
                fileName: "app/utils/connections.tsx",
                lineNumber: 50,
                columnNumber: 6
              }, this)
            ] }, void 0, !0, {
              fileName: "app/utils/connections.tsx",
              lineNumber: 48,
              columnNumber: 5
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/utils/connections.tsx",
            lineNumber: 43,
            columnNumber: 4
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/utils/connections.tsx",
      lineNumber: 35,
      columnNumber: 3
    },
    this
  );
}

// app/utils/redirect-cookie.server.ts
import * as cookie3 from "cookie";
var key = "redirectTo", destroyRedirectToHeader = cookie3.serialize(key, "", { maxAge: -1 });
function getRedirectCookieHeader(redirectTo) {
  return redirectTo && redirectTo !== "/" ? cookie3.serialize(key, redirectTo, { maxAge: 60 * 10 }) : null;
}
function getRedirectCookieValue(request) {
  let rawCookie = request.headers.get("cookie");
  return (rawCookie ? cookie3.parse(rawCookie) : {})[key] || null;
}

// app/routes/_auth+/auth.$provider.ts
async function loader3() {
  return redirect5("/login");
}
async function action3({ request, params }) {
  let providerName = ProviderNameSchema.parse(params.provider);
  try {
    return await handleMockAction(providerName, request), await authenticator.authenticate(providerName, request);
  } catch (error) {
    if (error instanceof Response) {
      let rawRedirectTo = (await request.formData()).get("redirectTo"), redirectTo = typeof rawRedirectTo == "string" ? rawRedirectTo : getReferrerRoute(request), redirectToCookie = getRedirectCookieHeader(redirectTo);
      redirectToCookie && error.headers.append("set-cookie", redirectToCookie);
    }
    throw error;
  }
}

// app/routes/_auth+/auth.$provider.callback.ts
var auth_provider_callback_exports = {};
__export(auth_provider_callback_exports, {
  loader: () => loader9
});
import { redirect as redirect11 } from "@remix-run/node";
init_db_server();

// app/utils/verification.server.ts
import { createCookieSessionStorage as createCookieSessionStorage4 } from "@remix-run/node";
var verifySessionStorage = createCookieSessionStorage4({
  cookie: {
    name: "en_verification",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    maxAge: 60 * 10,
    // 10 minutes
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
});

// app/routes/_auth+/login.tsx
var login_exports = {};
__export(login_exports, {
  ErrorBoundary: () => ErrorBoundary5,
  action: () => action8,
  default: () => LoginPage,
  handleNewSession: () => handleNewSession,
  handleVerification: () => handleVerification4,
  loader: () => loader7,
  meta: () => meta4,
  shouldRequestTwoFA: () => shouldRequestTwoFA
});
import { conform as conform5, useForm as useForm6 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint5, parse as parse8 } from "@conform-to/zod";
import {
  json as json7,
  redirect as redirect9
} from "@remix-run/node";
import { Form as Form8, Link as Link4, useActionData as useActionData5, useSearchParams as useSearchParams4 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput4 } from "remix-utils/csrf/react";
import { HoneypotInputs as HoneypotInputs3 } from "remix-utils/honeypot/react";
import { safeRedirect as safeRedirect3 } from "remix-utils/safe-redirect";
import { z as z13 } from "zod";

// app/components/spacer.tsx
import { jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
function Spacer({
  size
}) {
  let className = {
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
  }[size];
  return /* @__PURE__ */ jsxDEV20("div", { className }, void 0, !1, {
    fileName: "app/components/spacer.tsx",
    lineNumber: 56,
    columnNumber: 9
  }, this);
}

// app/routes/settings+/profile.two-factor.tsx
var profile_two_factor_exports = {};
__export(profile_two_factor_exports, {
  default: () => TwoFactorRoute,
  handle: () => handle,
  twoFAVerificationType: () => twoFAVerificationType
});
import { Outlet as Outlet2 } from "@remix-run/react";
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var handle = {
  breadcrumb: /* @__PURE__ */ jsxDEV21(Icon, { name: "lock-closed", children: "2FA" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.tsx",
    lineNumber: 8,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, twoFAVerificationType = "2fa";
function TwoFactorRoute() {
  return /* @__PURE__ */ jsxDEV21(Outlet2, {}, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.tsx",
    lineNumber: 15,
    columnNumber: 9
  }, this);
}

// app/routes/_auth+/login.tsx
init_db_server();

// app/utils/user-validation.ts
import { z as z8 } from "zod";
var UsernameSchema = z8.string({ required_error: "Username is required" }).min(3, { message: "Username is too short" }).max(20, { message: "Username is too long" }).regex(/^[a-zA-Z0-9_]+$/, {
  message: "Username can only include letters, numbers, and underscores"
}).transform((value) => value.toLowerCase()), PasswordSchema = z8.string({ required_error: "Password is required" }).min(6, { message: "Password is too short" }).max(100, { message: "Password is too long" }), NameSchema = z8.string({ required_error: "Name is required" }).min(3, { message: "Name is too short" }).max(40, { message: "Name is too long" }), EmailSchema = z8.string({ required_error: "Email is required" }).email({ message: "Email is invalid" }).min(3, { message: "Email is too short" }).max(100, { message: "Email is too long" }).transform((value) => value.toLowerCase()), PasswordAndConfirmPasswordSchema = z8.object({ password: PasswordSchema, confirmPassword: PasswordSchema }).superRefine(({ confirmPassword, password }, ctx) => {
  confirmPassword !== password && ctx.addIssue({
    path: ["confirmPassword"],
    code: "custom",
    message: "The passwords must match"
  });
});

// app/routes/_auth+/verify.tsx
var verify_exports = {};
__export(verify_exports, {
  ErrorBoundary: () => ErrorBoundary4,
  action: () => action7,
  codeQueryParam: () => codeQueryParam,
  default: () => VerifyRoute,
  getRedirectToUrl: () => getRedirectToUrl,
  isCodeValid: () => isCodeValid,
  prepareVerification: () => prepareVerification,
  redirectToQueryParam: () => redirectToQueryParam,
  requireRecentVerification: () => requireRecentVerification,
  targetQueryParam: () => targetQueryParam,
  typeQueryParam: () => typeQueryParam
});
import { conform as conform4, useForm as useForm5 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint4, parse as parse7 } from "@conform-to/zod";
import { json as json6 } from "@remix-run/node";
import { Form as Form7, useActionData as useActionData4, useSearchParams as useSearchParams3 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput3 } from "remix-utils/csrf/react";
import { HoneypotInputs as HoneypotInputs2 } from "remix-utils/honeypot/react";
import { z as z12 } from "zod";

// app/routes/settings+/profile.change-email.tsx
var profile_change_email_exports = {};
__export(profile_change_email_exports, {
  EmailChangeEmail: () => EmailChangeEmail,
  EmailChangeNoticeEmail: () => EmailChangeNoticeEmail,
  action: () => action4,
  default: () => ChangeEmailIndex,
  handle: () => handle2,
  handleVerification: () => handleVerification,
  loader: () => loader4
});
import { conform, useForm as useForm2 } from "@conform-to/react";
import { getFieldsetConstraint, parse as parse4 } from "@conform-to/zod";
import * as E from "@react-email/components";
import { json as json3, redirect as redirect6 } from "@remix-run/node";
import { Form as Form4, useActionData, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { z as z10 } from "zod";
init_db_server();

// app/utils/email.server.ts
import { renderAsync } from "@react-email/components";
import { z as z9 } from "zod";
var resendErrorSchema = z9.union([
  z9.object({
    name: z9.string(),
    message: z9.string(),
    statusCode: z9.number()
  }),
  z9.object({
    name: z9.literal("UnknownError"),
    message: z9.literal("Unknown Error"),
    statusCode: z9.literal(500),
    cause: z9.any()
  })
]), resendSuccessSchema = z9.object({
  id: z9.string()
});
async function sendEmail({
  react,
  ...options
}) {
  let email = {
    from: "hello@epicstack.dev",
    ...options,
    ...react ? await renderReactEmail(react) : null
  };
  if (!process.env.RESEND_API_KEY && !process.env.MOCKS)
    return console.error("RESEND_API_KEY not set and we're not in mocks mode."), console.error(
      "To send emails, set the RESEND_API_KEY environment variable."
    ), console.error("Would have sent the following email:", JSON.stringify(email)), {
      status: "success",
      data: { id: "mocked" }
    };
  let response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    }
  }), data = await response.json(), parsedData = resendSuccessSchema.safeParse(data);
  if (response.ok && parsedData.success)
    return {
      status: "success",
      data: parsedData
    };
  {
    let parseResult = resendErrorSchema.safeParse(data);
    return parseResult.success ? {
      status: "error",
      error: parseResult.data
    } : {
      status: "error",
      error: {
        name: "UnknownError",
        message: "Unknown Error",
        statusCode: 500,
        cause: data
      }
    };
  }
}
async function renderReactEmail(react) {
  let [html, text] = await Promise.all([
    renderAsync(react),
    renderAsync(react, { plainText: !0 })
  ]);
  return { html, text };
}

// app/routes/settings+/profile.change-email.tsx
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
var handle2 = {
  breadcrumb: /* @__PURE__ */ jsxDEV22(Icon, { name: "envelope-closed", children: "Change Email" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 28,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, newEmailAddressSessionKey = "new-email-address";
async function handleVerification({
  request,
  submission
}) {
  await requireRecentVerification(request), invariant(submission.value, "submission.value should be defined by now");
  let verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  ), newEmail = verifySession.get(newEmailAddressSessionKey);
  if (!newEmail)
    return submission.error[""] = [
      "You must submit the code on the same device that requested the email change."
    ], json3({ status: "error", submission }, { status: 400 });
  let preUpdateUser = await prisma.user.findFirstOrThrow({
    select: { email: !0 },
    where: { id: submission.value.target }
  }), user = await prisma.user.update({
    where: { id: submission.value.target },
    select: { id: !0, email: !0, username: !0 },
    data: { email: newEmail }
  });
  return sendEmail({
    to: preUpdateUser.email,
    subject: "Epic Stack email changed",
    react: /* @__PURE__ */ jsxDEV22(EmailChangeNoticeEmail, { userId: user.id }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 64,
      columnNumber: 10
    }, this)
  }), redirectWithToast(
    "/settings/profile",
    {
      title: "Email Changed",
      type: "success",
      description: `Your email has been changed to ${user.email}`
    },
    {
      headers: {
        "set-cookie": await verifySessionStorage.destroySession(verifySession)
      }
    }
  );
}
var ChangeEmailSchema = z10.object({
  email: EmailSchema
});
async function loader4({ request }) {
  await requireRecentVerification(request);
  let userId = await requireUserId(request), user = await prisma.user.findUnique({
    where: { id: userId },
    select: { email: !0 }
  });
  if (!user) {
    let params = new URLSearchParams({ redirectTo: request.url });
    throw redirect6(`/login?${params}`);
  }
  return json3({ user });
}
async function action4({ request }) {
  let userId = await requireUserId(request), formData = await request.formData();
  await validateCSRF(formData, request.headers);
  let submission = await parse4(formData, {
    schema: ChangeEmailSchema.superRefine(async (data, ctx) => {
      await prisma.user.findUnique({
        where: { email: data.email }
      }) && ctx.addIssue({
        path: ["email"],
        code: z10.ZodIssueCode.custom,
        message: "This email is already in use."
      });
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json3({ status: "idle", submission });
  if (!submission.value)
    return json3({ status: "error", submission }, { status: 400 });
  let { otp, redirectTo, verifyUrl } = await prepareVerification({
    period: 10 * 60,
    request,
    target: userId,
    type: "change-email"
  }), response = await sendEmail({
    to: submission.value.email,
    subject: "Epic Notes Email Change Verification",
    react: /* @__PURE__ */ jsxDEV22(EmailChangeEmail, { verifyUrl: verifyUrl.toString(), otp }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 136,
      columnNumber: 10
    }, this)
  });
  if (response.status === "success") {
    let verifySession = await verifySessionStorage.getSession();
    return verifySession.set(newEmailAddressSessionKey, submission.value.email), redirect6(redirectTo.toString(), {
      headers: {
        "set-cookie": await verifySessionStorage.commitSession(verifySession)
      }
    });
  } else
    return submission.error[""] = [response.error.message], json3({ status: "error", submission }, { status: 500 });
}
function EmailChangeEmail({
  verifyUrl,
  otp
}) {
  return /* @__PURE__ */ jsxDEV22(E.Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ jsxDEV22(E.Container, { children: [
    /* @__PURE__ */ jsxDEV22("h1", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: "Epic Notes Email Change" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 164,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 163,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: [
      "Here's your verification code: ",
      /* @__PURE__ */ jsxDEV22("strong", { children: otp }, void 0, !1, {
        fileName: "app/routes/settings+/profile.change-email.tsx",
        lineNumber: 168,
        columnNumber: 38
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 167,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 166,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: "Or click the link:" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 172,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 171,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22(E.Link, { href: verifyUrl, children: verifyUrl }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 174,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 162,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 161,
    columnNumber: 3
  }, this);
}
function EmailChangeNoticeEmail({ userId }) {
  return /* @__PURE__ */ jsxDEV22(E.Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ jsxDEV22(E.Container, { children: [
    /* @__PURE__ */ jsxDEV22("h1", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: "Your Epic Notes email has been changed" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 185,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 184,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: "We're writing to let you know that your Epic Notes email has been changed." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 188,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 187,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: "If you changed your email address, then you can safely ignore this. But if you did not change your email address, then please contact support immediately." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 194,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 193,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: /* @__PURE__ */ jsxDEV22(E.Text, { children: [
      "Your Account ID: ",
      userId
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 201,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 200,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 183,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 182,
    columnNumber: 3
  }, this);
}
function ChangeEmailIndex() {
  let data = useLoaderData2(), actionData = useActionData(), [form, fields] = useForm2({
    id: "change-email-form",
    constraint: getFieldsetConstraint(ChangeEmailSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse4(formData, { schema: ChangeEmailSchema });
    }
  }), isPending = useIsPending();
  return /* @__PURE__ */ jsxDEV22("div", { children: [
    /* @__PURE__ */ jsxDEV22("h1", { className: "text-h1", children: "Change Email" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 224,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: "You will receive an email at the new email address to confirm." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 225,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV22("p", { children: [
      "An email notice will also be sent to your old address ",
      data.user.email,
      "."
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 226,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV22("div", { className: "mx-auto mt-5 max-w-sm", children: /* @__PURE__ */ jsxDEV22(Form4, { method: "POST", ...form.props, children: [
      /* @__PURE__ */ jsxDEV22(AuthenticityTokenInput, {}, void 0, !1, {
        fileName: "app/routes/settings+/profile.change-email.tsx",
        lineNumber: 231,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV22(
        Field,
        {
          labelProps: { children: "New Email" },
          inputProps: conform.input(fields.email),
          errors: fields.email.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.change-email.tsx",
          lineNumber: 232,
          columnNumber: 6
        },
        this
      ),
      /* @__PURE__ */ jsxDEV22(ErrorList, { id: form.errorId, errors: form.errors }, void 0, !1, {
        fileName: "app/routes/settings+/profile.change-email.tsx",
        lineNumber: 237,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV22("div", { children: /* @__PURE__ */ jsxDEV22(
        StatusButton,
        {
          status: isPending ? "pending" : actionData?.status ?? "idle",
          children: "Send Confirmation"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.change-email.tsx",
          lineNumber: 239,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.change-email.tsx",
        lineNumber: 238,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 230,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.change-email.tsx",
      lineNumber: 229,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.change-email.tsx",
    lineNumber: 223,
    columnNumber: 3
  }, this);
}

// app/routes/_auth+/verify.tsx
init_db_server();

// app/utils/totp.server.ts
var totp_server_exports = {};
__reExport(totp_server_exports, totp_star);
import * as totp_star from "@epic-web/totp";

// app/routes/_auth+/onboarding.tsx
var onboarding_exports = {};
__export(onboarding_exports, {
  action: () => action5,
  default: () => SignupRoute,
  handleVerification: () => handleVerification2,
  loader: () => loader5,
  meta: () => meta2
});
import { conform as conform2, useForm as useForm3 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint2, parse as parse5 } from "@conform-to/zod";
import {
  json as json4,
  redirect as redirect7
} from "@remix-run/node";
import {
  Form as Form5,
  useActionData as useActionData2,
  useLoaderData as useLoaderData3,
  useSearchParams as useSearchParams2
} from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput2 } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { safeRedirect as safeRedirect2 } from "remix-utils/safe-redirect";
import { z as z11 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var onboardingEmailSessionKey = "onboardingEmail", SignupFormSchema = z11.object({
  username: UsernameSchema,
  name: NameSchema,
  agreeToTermsOfServiceAndPrivacyPolicy: z11.boolean({
    required_error: "You must agree to the terms of service and privacy policy"
  }),
  remember: z11.boolean().optional(),
  redirectTo: z11.string().optional()
}).and(PasswordAndConfirmPasswordSchema);
async function requireOnboardingEmail(request) {
  await requireAnonymous(request);
  let email = (await verifySessionStorage.getSession(
    request.headers.get("cookie")
  )).get(onboardingEmailSessionKey);
  if (typeof email != "string" || !email)
    throw redirect7("/signup");
  return email;
}
async function loader5({ request }) {
  let email = await requireOnboardingEmail(request);
  return json4({ email });
}
async function action5({ request }) {
  let email = await requireOnboardingEmail(request), formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse5(formData, {
    schema: (intent) => SignupFormSchema.superRefine(async (data, ctx) => {
      if (await prisma.user.findUnique({
        where: { username: data.username },
        select: { id: !0 }
      })) {
        ctx.addIssue({
          path: ["username"],
          code: z11.ZodIssueCode.custom,
          message: "A user already exists with this username"
        });
        return;
      }
    }).transform(async (data) => {
      if (intent !== "submit")
        return { ...data, session: null };
      let session2 = await signup({ ...data, email });
      return { ...data, session: session2 };
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json4({ status: "idle", submission });
  if (!submission.value?.session)
    return json4({ status: "error", submission }, { status: 400 });
  let { session, remember: remember3, redirectTo } = submission.value, authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.id);
  let verifySession = await verifySessionStorage.getSession(), headers3 = new Headers();
  return headers3.append(
    "set-cookie",
    await authSessionStorage.commitSession(authSession, {
      expires: remember3 ? session.expirationDate : void 0
    })
  ), headers3.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  ), redirectWithToast(
    safeRedirect2(redirectTo),
    { title: "Welcome", description: "Thanks for signing up!" },
    { headers: headers3 }
  );
}
async function handleVerification2({ submission }) {
  invariant(submission.value, "submission.value should be defined by now");
  let verifySession = await verifySessionStorage.getSession();
  return verifySession.set(onboardingEmailSessionKey, submission.value.target), redirect7("/onboarding", {
    headers: {
      "set-cookie": await verifySessionStorage.commitSession(verifySession)
    }
  });
}
var meta2 = () => [{ title: "Setup Epic Notes Account" }];
function SignupRoute() {
  let data = useLoaderData3(), actionData = useActionData2(), isPending = useIsPending(), [searchParams] = useSearchParams2(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm3({
    id: "onboarding-form",
    constraint: getFieldsetConstraint2(SignupFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse5(formData, { schema: SignupFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV23("div", { className: "container flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxDEV23("div", { className: "mx-auto w-full max-w-lg", children: [
    /* @__PURE__ */ jsxDEV23("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsxDEV23("h1", { className: "text-h1", children: [
        "Welcome aboard ",
        data.email,
        "!"
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/onboarding.tsx",
        lineNumber: 167,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV23("p", { className: "text-body-md text-muted-foreground", children: "Please enter your details." }, void 0, !1, {
        fileName: "app/routes/_auth+/onboarding.tsx",
        lineNumber: 168,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/onboarding.tsx",
      lineNumber: 166,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV23(Spacer, { size: "xs" }, void 0, !1, {
      fileName: "app/routes/_auth+/onboarding.tsx",
      lineNumber: 172,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV23(
      Form5,
      {
        method: "POST",
        className: "mx-auto min-w-full max-w-sm sm:min-w-[368px]",
        ...form.props,
        children: [
          /* @__PURE__ */ jsxDEV23(AuthenticityTokenInput2, {}, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding.tsx",
            lineNumber: 178,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV23(HoneypotInputs, {}, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding.tsx",
            lineNumber: 179,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV23(
            Field,
            {
              labelProps: { htmlFor: fields.username.id, children: "Username" },
              inputProps: {
                ...conform2.input(fields.username),
                autoComplete: "username",
                className: "lowercase"
              },
              errors: fields.username.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 180,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23(
            Field,
            {
              labelProps: { htmlFor: fields.name.id, children: "Name" },
              inputProps: {
                ...conform2.input(fields.name),
                autoComplete: "name"
              },
              errors: fields.name.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 189,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23(
            Field,
            {
              labelProps: { htmlFor: fields.password.id, children: "Password" },
              inputProps: {
                ...conform2.input(fields.password, { type: "password" }),
                autoComplete: "new-password"
              },
              errors: fields.password.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 197,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23(
            Field,
            {
              labelProps: {
                htmlFor: fields.confirmPassword.id,
                children: "Confirm Password"
              },
              inputProps: {
                ...conform2.input(fields.confirmPassword, { type: "password" }),
                autoComplete: "new-password"
              },
              errors: fields.confirmPassword.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 206,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                children: "Do you agree to our Terms of Service and Privacy Policy?"
              },
              buttonProps: conform2.input(
                fields.agreeToTermsOfServiceAndPrivacyPolicy,
                { type: "checkbox" }
              ),
              errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 218,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: conform2.input(fields.remember, { type: "checkbox" }),
              errors: fields.remember.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 230,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV23("input", { ...conform2.input(fields.redirectTo, { type: "hidden" }) }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding.tsx",
            lineNumber: 239,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV23(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding.tsx",
            lineNumber: 240,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV23("div", { className: "flex items-center justify-between gap-6", children: /* @__PURE__ */ jsxDEV23(
            StatusButton,
            {
              className: "w-full",
              status: isPending ? "pending" : actionData?.status ?? "idle",
              type: "submit",
              disabled: isPending,
              children: "Create an account"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding.tsx",
              lineNumber: 243,
              columnNumber: 7
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding.tsx",
            lineNumber: 242,
            columnNumber: 6
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_auth+/onboarding.tsx",
        lineNumber: 173,
        columnNumber: 5
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/onboarding.tsx",
    lineNumber: 165,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/onboarding.tsx",
    lineNumber: 164,
    columnNumber: 3
  }, this);
}

// app/routes/_auth+/reset-password.tsx
var reset_password_exports = {};
__export(reset_password_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action6,
  default: () => ResetPasswordPage,
  handleVerification: () => handleVerification3,
  loader: () => loader6,
  meta: () => meta3
});
import { conform as conform3, useForm as useForm4 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint3, parse as parse6 } from "@conform-to/zod";
import {
  json as json5,
  redirect as redirect8
} from "@remix-run/node";
import { Form as Form6, useActionData as useActionData3, useLoaderData as useLoaderData4 } from "@remix-run/react";
init_db_server();
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
var resetPasswordUsernameSessionKey = "resetPasswordUsername";
async function handleVerification3({ submission }) {
  invariant(submission.value, "submission.value should be defined by now");
  let target = submission.value.target, user = await prisma.user.findFirst({
    where: { OR: [{ email: target }, { username: target }] },
    select: { email: !0, username: !0 }
  });
  if (!user)
    return submission.error.code = ["Invalid code"], json5({ status: "error", submission }, { status: 400 });
  let verifySession = await verifySessionStorage.getSession();
  return verifySession.set(resetPasswordUsernameSessionKey, user.username), redirect8("/reset-password", {
    headers: {
      "set-cookie": await verifySessionStorage.commitSession(verifySession)
    }
  });
}
var ResetPasswordSchema = PasswordAndConfirmPasswordSchema;
async function requireResetPasswordUsername(request) {
  await requireAnonymous(request);
  let resetPasswordUsername = (await verifySessionStorage.getSession(
    request.headers.get("cookie")
  )).get(
    resetPasswordUsernameSessionKey
  );
  if (typeof resetPasswordUsername != "string" || !resetPasswordUsername)
    throw redirect8("/login");
  return resetPasswordUsername;
}
async function loader6({ request }) {
  let resetPasswordUsername = await requireResetPasswordUsername(request);
  return json5({ resetPasswordUsername });
}
async function action6({ request }) {
  let resetPasswordUsername = await requireResetPasswordUsername(request), formData = await request.formData(), submission = parse6(formData, {
    schema: ResetPasswordSchema
  });
  if (submission.intent !== "submit")
    return json5({ status: "idle", submission });
  if (!submission.value?.password)
    return json5({ status: "error", submission }, { status: 400 });
  let { password } = submission.value;
  await resetUserPassword({ username: resetPasswordUsername, password });
  let verifySession = await verifySessionStorage.getSession();
  return redirect8("/login", {
    headers: {
      "set-cookie": await verifySessionStorage.destroySession(verifySession)
    }
  });
}
var meta3 = () => [{ title: "Reset Password | Epic Notes" }];
function ResetPasswordPage() {
  let data = useLoaderData4(), actionData = useActionData3(), isPending = useIsPending(), [form, fields] = useForm4({
    id: "reset-password",
    constraint: getFieldsetConstraint3(ResetPasswordSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse6(formData, { schema: ResetPasswordSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV24("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxDEV24("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV24("h1", { className: "text-h1", children: "Password Reset" }, void 0, !1, {
        fileName: "app/routes/_auth+/reset-password.tsx",
        lineNumber: 111,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV24("p", { className: "mt-3 text-body-md text-muted-foreground", children: [
        "Hi, ",
        data.resetPasswordUsername,
        ". No worries. It happens all the time."
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/reset-password.tsx",
        lineNumber: 112,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/reset-password.tsx",
      lineNumber: 110,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV24("div", { className: "mx-auto mt-16 min-w-full sm:min-w-[368px] max-w-sm", children: /* @__PURE__ */ jsxDEV24(Form6, { method: "POST", ...form.props, children: [
      /* @__PURE__ */ jsxDEV24(
        Field,
        {
          labelProps: {
            htmlFor: fields.password.id,
            children: "New Password"
          },
          inputProps: {
            ...conform3.input(fields.password, { type: "password" }),
            autoComplete: "new-password",
            autoFocus: !0
          },
          errors: fields.password.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/reset-password.tsx",
          lineNumber: 118,
          columnNumber: 6
        },
        this
      ),
      /* @__PURE__ */ jsxDEV24(
        Field,
        {
          labelProps: {
            htmlFor: fields.confirmPassword.id,
            children: "Confirm Password"
          },
          inputProps: {
            ...conform3.input(fields.confirmPassword, { type: "password" }),
            autoComplete: "new-password"
          },
          errors: fields.confirmPassword.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/reset-password.tsx",
          lineNumber: 130,
          columnNumber: 6
        },
        this
      ),
      /* @__PURE__ */ jsxDEV24(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
        fileName: "app/routes/_auth+/reset-password.tsx",
        lineNumber: 142,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV24(
        StatusButton,
        {
          className: "w-full",
          status: isPending ? "pending" : actionData?.status ?? "idle",
          type: "submit",
          disabled: isPending,
          children: "Reset password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/reset-password.tsx",
          lineNumber: 144,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/reset-password.tsx",
      lineNumber: 117,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/reset-password.tsx",
      lineNumber: 116,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/reset-password.tsx",
    lineNumber: 109,
    columnNumber: 3
  }, this);
}
function ErrorBoundary3() {
  return /* @__PURE__ */ jsxDEV24(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/_auth+/reset-password.tsx",
    lineNumber: 159,
    columnNumber: 9
  }, this);
}

// app/routes/_auth+/verify.tsx
import { Fragment as Fragment2, jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var codeQueryParam = "code", targetQueryParam = "target", typeQueryParam = "type", redirectToQueryParam = "redirectTo", types = ["onboarding", "reset-password", "change-email", "2fa"], VerificationTypeSchema = z12.enum(types), VerifySchema = z12.object({
  [codeQueryParam]: z12.string().min(6).max(6),
  [typeQueryParam]: VerificationTypeSchema,
  [targetQueryParam]: z12.string(),
  [redirectToQueryParam]: z12.string().optional()
});
async function action7({ request }) {
  let formData = await request.formData();
  return checkHoneypot(formData), await validateCSRF(formData, request.headers), validateRequest(request, formData);
}
function getRedirectToUrl({
  request,
  type,
  target,
  redirectTo
}) {
  let redirectToUrl = new URL(`${getDomainUrl(request)}/verify`);
  return redirectToUrl.searchParams.set(typeQueryParam, type), redirectToUrl.searchParams.set(targetQueryParam, target), redirectTo && redirectToUrl.searchParams.set(redirectToQueryParam, redirectTo), redirectToUrl;
}
async function requireRecentVerification(request) {
  let userId = await requireUserId(request);
  if (await shouldRequestTwoFA(request)) {
    let reqUrl = new URL(request.url), redirectUrl = getRedirectToUrl({
      request,
      target: userId,
      type: twoFAVerificationType,
      redirectTo: reqUrl.pathname + reqUrl.search
    });
    throw await redirectWithToast(redirectUrl.toString(), {
      title: "Please Reverify",
      description: "Please reverify your account before proceeding"
    });
  }
}
async function prepareVerification({
  period,
  request,
  type,
  target
}) {
  let verifyUrl = getRedirectToUrl({ request, type, target }), redirectTo = new URL(verifyUrl.toString()), { otp, ...verificationConfig } = (0, totp_server_exports.generateTOTP)({
    algorithm: "SHA256",
    // Leaving off 0 and O on purpose to avoid confusing users.
    charSet: "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789",
    period
  }), verificationData = {
    type,
    target,
    ...verificationConfig,
    expiresAt: new Date(Date.now() + verificationConfig.period * 1e3)
  };
  return await prisma.verification.upsert({
    where: { target_type: { target, type } },
    create: verificationData,
    update: verificationData
  }), verifyUrl.searchParams.set(codeQueryParam, otp), { otp, redirectTo, verifyUrl };
}
async function isCodeValid({
  code,
  type,
  target
}) {
  let verification = await prisma.verification.findUnique({
    where: {
      target_type: { target, type },
      OR: [{ expiresAt: { gt: /* @__PURE__ */ new Date() } }, { expiresAt: null }]
    },
    select: { algorithm: !0, secret: !0, period: !0, charSet: !0 }
  });
  return !(!verification || !(0, totp_server_exports.verifyTOTP)({
    otp: code,
    ...verification
  }));
}
async function validateRequest(request, body) {
  let submission = await parse7(body, {
    schema: VerifySchema.superRefine(async (data, ctx) => {
      if (!await isCodeValid({
        code: data[codeQueryParam],
        type: data[typeQueryParam],
        target: data[targetQueryParam]
      })) {
        ctx.addIssue({
          path: ["code"],
          code: z12.ZodIssueCode.custom,
          message: "Invalid code"
        });
        return;
      }
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json6({ status: "idle", submission });
  if (!submission.value)
    return json6({ status: "error", submission }, { status: 400 });
  await (0, litefs_server_exports.ensurePrimary)();
  let { value: submissionValue } = submission;
  async function deleteVerification() {
    await prisma.verification.delete({
      where: {
        target_type: {
          type: submissionValue[typeQueryParam],
          target: submissionValue[targetQueryParam]
        }
      }
    });
  }
  switch (submissionValue[typeQueryParam]) {
    case "reset-password":
      return await deleteVerification(), handleVerification3({ request, body, submission });
    case "onboarding":
      return await deleteVerification(), handleVerification2({ request, body, submission });
    case "change-email":
      return await deleteVerification(), handleVerification({ request, body, submission });
    case "2fa":
      return handleVerification4({ request, body, submission });
  }
}
function VerifyRoute() {
  let [searchParams] = useSearchParams3(), isPending = useIsPending(), actionData = useActionData4(), parsedType = VerificationTypeSchema.safeParse(
    searchParams.get(typeQueryParam)
  ), type = parsedType.success ? parsedType.data : null, checkEmail = /* @__PURE__ */ jsxDEV25(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV25("h1", { className: "text-h1", children: "Check your email" }, void 0, !1, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 237,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV25("p", { className: "mt-3 text-body-md text-muted-foreground", children: "We've sent you a code to verify your email address." }, void 0, !1, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 238,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/verify.tsx",
    lineNumber: 236,
    columnNumber: 3
  }, this), headings = {
    onboarding: checkEmail,
    "reset-password": checkEmail,
    "change-email": checkEmail,
    "2fa": /* @__PURE__ */ jsxDEV25(Fragment2, { children: [
      /* @__PURE__ */ jsxDEV25("h1", { className: "text-h1", children: "Check your 2FA app" }, void 0, !1, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 250,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV25("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your 2FA code to verify your identity." }, void 0, !1, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 251,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 249,
      columnNumber: 4
    }, this)
  }, [form, fields] = useForm5({
    id: "verify-form",
    constraint: getFieldsetConstraint4(VerifySchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse7(formData, { schema: VerifySchema });
    },
    defaultValue: {
      code: searchParams.get(codeQueryParam) ?? "",
      type,
      target: searchParams.get(targetQueryParam) ?? "",
      redirectTo: searchParams.get(redirectToQueryParam) ?? ""
    }
  });
  return /* @__PURE__ */ jsxDEV25("main", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxDEV25("div", { className: "text-center", children: type ? headings[type] : "Invalid Verification Type" }, void 0, !1, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 275,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV25(Spacer, { size: "xs" }, void 0, !1, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 279,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV25("div", { className: "mx-auto flex w-72 max-w-full flex-col justify-center gap-1", children: [
      /* @__PURE__ */ jsxDEV25("div", { children: /* @__PURE__ */ jsxDEV25(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 283,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 282,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV25("div", { className: "flex w-full gap-2", children: /* @__PURE__ */ jsxDEV25(Form7, { method: "POST", ...form.props, className: "flex-1", children: [
        /* @__PURE__ */ jsxDEV25(AuthenticityTokenInput3, {}, void 0, !1, {
          fileName: "app/routes/_auth+/verify.tsx",
          lineNumber: 287,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV25(HoneypotInputs2, {}, void 0, !1, {
          fileName: "app/routes/_auth+/verify.tsx",
          lineNumber: 288,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV25(
          Field,
          {
            labelProps: {
              htmlFor: fields[codeQueryParam].id,
              children: "Code"
            },
            inputProps: conform4.input(fields[codeQueryParam]),
            errors: fields[codeQueryParam].errors
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/verify.tsx",
            lineNumber: 289,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV25(
          "input",
          {
            ...conform4.input(fields[typeQueryParam], { type: "hidden" })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/verify.tsx",
            lineNumber: 297,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV25(
          "input",
          {
            ...conform4.input(fields[targetQueryParam], { type: "hidden" })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/verify.tsx",
            lineNumber: 300,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV25(
          "input",
          {
            ...conform4.input(fields[redirectToQueryParam], {
              type: "hidden"
            })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/verify.tsx",
            lineNumber: 303,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV25(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : actionData?.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Submit"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/verify.tsx",
            lineNumber: 308,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 286,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/_auth+/verify.tsx",
        lineNumber: 285,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/verify.tsx",
      lineNumber: 281,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/verify.tsx",
    lineNumber: 274,
    columnNumber: 3
  }, this);
}
function ErrorBoundary4() {
  return /* @__PURE__ */ jsxDEV25(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/_auth+/verify.tsx",
    lineNumber: 324,
    columnNumber: 9
  }, this);
}

// app/routes/_auth+/login.tsx
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
var verifiedTimeKey = "verified-time", unverifiedSessionIdKey = "unverified-session-id", rememberKey = "remember";
async function handleNewSession({
  request,
  session,
  redirectTo,
  remember: remember3
}, responseInit) {
  let verification = await prisma.verification.findUnique({
    select: { id: !0 },
    where: {
      target_type: { target: session.userId, type: twoFAVerificationType }
    }
  });
  if (Boolean(verification)) {
    let verifySession = await verifySessionStorage.getSession();
    verifySession.set(unverifiedSessionIdKey, session.id), verifySession.set(rememberKey, remember3);
    let redirectUrl = getRedirectToUrl({
      request,
      type: twoFAVerificationType,
      target: session.userId,
      redirectTo
    });
    return redirect9(
      `${redirectUrl.pathname}?${redirectUrl.searchParams}`,
      combineResponseInits(
        {
          headers: {
            "set-cookie": await verifySessionStorage.commitSession(verifySession)
          }
        },
        responseInit
      )
    );
  } else {
    let authSession = await authSessionStorage.getSession(
      request.headers.get("cookie")
    );
    return authSession.set(sessionKey, session.id), redirect9(
      safeRedirect3(redirectTo),
      combineResponseInits(
        {
          headers: {
            "set-cookie": await authSessionStorage.commitSession(authSession, {
              expires: remember3 ? session.expirationDate : void 0
            })
          }
        },
        responseInit
      )
    );
  }
}
async function handleVerification4({
  request,
  submission
}) {
  invariant(submission.value, "Submission should have a value by this point");
  let authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  ), verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  ), remember3 = verifySession.get(rememberKey), { redirectTo } = submission.value, headers3 = new Headers();
  authSession.set(verifiedTimeKey, Date.now());
  let unverifiedSessionId = verifySession.get(unverifiedSessionIdKey);
  if (unverifiedSessionId) {
    let session = await prisma.session.findUnique({
      select: { expirationDate: !0 },
      where: { id: unverifiedSessionId }
    });
    if (!session)
      throw await redirectWithToast("/login", {
        type: "error",
        title: "Invalid session",
        description: "Could not find session to verify. Please try again."
      });
    authSession.set(sessionKey, unverifiedSessionId), headers3.append(
      "set-cookie",
      await authSessionStorage.commitSession(authSession, {
        expires: remember3 ? session.expirationDate : void 0
      })
    );
  } else
    headers3.append(
      "set-cookie",
      await authSessionStorage.commitSession(authSession)
    );
  return headers3.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  ), redirect9(safeRedirect3(redirectTo), { headers: headers3 });
}
async function shouldRequestTwoFA(request) {
  let authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  if ((await verifySessionStorage.getSession(
    request.headers.get("cookie")
  )).has(unverifiedSessionIdKey))
    return !0;
  let userId = await getUserId(request);
  if (!userId || !await prisma.verification.findUnique({
    select: { id: !0 },
    where: { target_type: { target: userId, type: twoFAVerificationType } }
  }))
    return !1;
  let verifiedTime = authSession.get(verifiedTimeKey) ?? /* @__PURE__ */ new Date(0), twoHours = 1e3 * 60 * 2;
  return Date.now() - verifiedTime > twoHours;
}
var LoginFormSchema = z13.object({
  username: UsernameSchema,
  password: PasswordSchema,
  redirectTo: z13.string().optional(),
  remember: z13.boolean().optional()
});
async function loader7({ request }) {
  return await requireAnonymous(request), json7({});
}
async function action8({ request }) {
  await requireAnonymous(request);
  let formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse8(formData, {
    schema: (intent) => LoginFormSchema.transform(async (data, ctx) => {
      if (intent !== "submit")
        return { ...data, session: null };
      let session2 = await login(data);
      return session2 ? { ...data, session: session2 } : (ctx.addIssue({
        code: z13.ZodIssueCode.custom,
        message: "Invalid username or password"
      }), z13.NEVER);
    }),
    async: !0
  });
  if (delete submission.payload.password, submission.intent !== "submit")
    return delete submission.value?.password, json7({ status: "idle", submission });
  if (!submission.value?.session)
    return json7({ status: "error", submission }, { status: 400 });
  let { session, remember: remember3, redirectTo } = submission.value;
  return handleNewSession({
    request,
    session,
    remember: remember3 ?? !1,
    redirectTo
  });
}
function LoginPage() {
  let actionData = useActionData5(), isPending = useIsPending(), [searchParams] = useSearchParams4(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm6({
    id: "login-form",
    constraint: getFieldsetConstraint5(LoginFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse8(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV26("div", { className: "flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxDEV26("div", { className: "mx-auto w-full max-w-md", children: [
    /* @__PURE__ */ jsxDEV26("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsxDEV26("h1", { className: "text-h1", children: "Welcome back!" }, void 0, !1, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 265,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV26("p", { className: "text-body-md text-muted-foreground", children: "Please enter your details." }, void 0, !1, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 266,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/login.tsx",
      lineNumber: 264,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV26(Spacer, { size: "xs" }, void 0, !1, {
      fileName: "app/routes/_auth+/login.tsx",
      lineNumber: 270,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { children: /* @__PURE__ */ jsxDEV26("div", { className: "mx-auto w-full max-w-md px-8", children: [
      /* @__PURE__ */ jsxDEV26(Form8, { method: "POST", ...form.props, children: [
        /* @__PURE__ */ jsxDEV26(AuthenticityTokenInput4, {}, void 0, !1, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 275,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV26(HoneypotInputs3, {}, void 0, !1, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 276,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV26(
          Field,
          {
            labelProps: { children: "Username" },
            inputProps: {
              ...conform5.input(fields.username),
              autoFocus: !0,
              className: "lowercase"
            },
            errors: fields.username.errors
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 277,
            columnNumber: 8
          },
          this
        ),
        /* @__PURE__ */ jsxDEV26(
          Field,
          {
            labelProps: { children: "Password" },
            inputProps: conform5.input(fields.password, {
              type: "password"
            }),
            errors: fields.password.errors
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 287,
            columnNumber: 8
          },
          this
        ),
        /* @__PURE__ */ jsxDEV26("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV26(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: conform5.input(fields.remember, {
                type: "checkbox"
              }),
              errors: fields.remember.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/login.tsx",
              lineNumber: 296,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV26("div", { children: /* @__PURE__ */ jsxDEV26(
            Link4,
            {
              to: "/forgot-password",
              className: "text-body-xs font-semibold",
              children: "Forgot password?"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/login.tsx",
              lineNumber: 307,
              columnNumber: 10
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 306,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 295,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV26(
          "input",
          {
            ...conform5.input(fields.redirectTo, { type: "hidden" })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 316,
            columnNumber: 8
          },
          this
        ),
        /* @__PURE__ */ jsxDEV26(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 319,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center justify-between gap-6 pt-3", children: /* @__PURE__ */ jsxDEV26(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : actionData?.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Log in"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 322,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 321,
          columnNumber: 8
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 274,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV26("ul", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ jsxDEV26("li", { children: /* @__PURE__ */ jsxDEV26(
        ProviderConnectionForm,
        {
          type: "Login",
          providerName,
          redirectTo
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 335,
          columnNumber: 10
        },
        this
      ) }, providerName, !1, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 334,
        columnNumber: 9
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 332,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV26("div", { className: "flex items-center justify-center gap-2 pt-6", children: [
        /* @__PURE__ */ jsxDEV26("span", { className: "text-muted-foreground", children: "New here?" }, void 0, !1, {
          fileName: "app/routes/_auth+/login.tsx",
          lineNumber: 344,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV26(
          Link4,
          {
            to: redirectTo ? `/signup?${encodeURIComponent(redirectTo)}` : "/signup",
            children: "Create an account"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/login.tsx",
            lineNumber: 345,
            columnNumber: 8
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/login.tsx",
        lineNumber: 343,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/login.tsx",
      lineNumber: 273,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/login.tsx",
      lineNumber: 272,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/login.tsx",
    lineNumber: 263,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/login.tsx",
    lineNumber: 262,
    columnNumber: 3
  }, this);
}
var meta4 = () => [{ title: "Login to Epic Notes" }];
function ErrorBoundary5() {
  return /* @__PURE__ */ jsxDEV26(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/_auth+/login.tsx",
    lineNumber: 367,
    columnNumber: 9
  }, this);
}

// app/routes/_auth+/onboarding_.$provider.tsx
var onboarding_provider_exports = {};
__export(onboarding_provider_exports, {
  action: () => action9,
  default: () => SignupRoute2,
  handleVerification: () => handleVerification5,
  loader: () => loader8,
  meta: () => meta5,
  onboardingEmailSessionKey: () => onboardingEmailSessionKey2,
  prefilledProfileKey: () => prefilledProfileKey,
  providerIdKey: () => providerIdKey
});
import { conform as conform6, useForm as useForm7 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint6, parse as parse9 } from "@conform-to/zod";
import {
  json as json8,
  redirect as redirect10
} from "@remix-run/node";
import {
  Form as Form9,
  useActionData as useActionData6,
  useLoaderData as useLoaderData5,
  useSearchParams as useSearchParams5
} from "@remix-run/react";
import { safeRedirect as safeRedirect4 } from "remix-utils/safe-redirect";
import { z as z14 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var onboardingEmailSessionKey2 = "onboardingEmail", providerIdKey = "providerId", prefilledProfileKey = "prefilledProfile", SignupFormSchema2 = z14.object({
  imageUrl: z14.string().optional(),
  username: UsernameSchema,
  name: NameSchema,
  agreeToTermsOfServiceAndPrivacyPolicy: z14.boolean({
    required_error: "You must agree to the terms of service and privacy policy"
  }),
  remember: z14.boolean().optional(),
  redirectTo: z14.string().optional()
});
async function requireData({
  request,
  params
}) {
  await requireAnonymous(request);
  let verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  ), email = verifySession.get(onboardingEmailSessionKey2), providerId = verifySession.get(providerIdKey), result = z14.object({
    email: z14.string(),
    providerName: ProviderNameSchema,
    providerId: z14.string()
  }).safeParse({ email, providerName: params.provider, providerId });
  if (result.success)
    return result.data;
  throw console.error(result.error), redirect10("/signup");
}
async function loader8({ request, params }) {
  let { email } = await requireData({ request, params }), authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  ), prefilledProfile = (await verifySessionStorage.getSession(
    request.headers.get("cookie")
  )).get(prefilledProfileKey), formError = authSession.get(authenticator.sessionErrorKey);
  return json8({
    email,
    status: "idle",
    submission: {
      intent: "",
      payload: prefilledProfile ?? {},
      error: {
        "": typeof formError == "string" ? [formError] : []
      }
    }
  });
}
async function action9({ request, params }) {
  let { email, providerId, providerName } = await requireData({
    request,
    params
  }), formData = await request.formData(), verifySession = await verifySessionStorage.getSession(
    request.headers.get("cookie")
  ), submission = await parse9(formData, {
    schema: SignupFormSchema2.superRefine(async (data, ctx) => {
      if (await prisma.user.findUnique({
        where: { username: data.username },
        select: { id: !0 }
      })) {
        ctx.addIssue({
          path: ["username"],
          code: z14.ZodIssueCode.custom,
          message: "A user already exists with this username"
        });
        return;
      }
    }).transform(async (data) => {
      let session2 = await signupWithConnection({
        ...data,
        email,
        providerId,
        providerName
      });
      return { ...data, session: session2 };
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json8({ status: "idle", submission });
  if (!submission.value?.session)
    return json8({ status: "error", submission }, { status: 400 });
  let { session, remember: remember3, redirectTo } = submission.value, authSession = await authSessionStorage.getSession(
    request.headers.get("cookie")
  );
  authSession.set(sessionKey, session.id);
  let headers3 = new Headers();
  return headers3.append(
    "set-cookie",
    await authSessionStorage.commitSession(authSession, {
      expires: remember3 ? session.expirationDate : void 0
    })
  ), headers3.append(
    "set-cookie",
    await verifySessionStorage.destroySession(verifySession)
  ), redirectWithToast(
    safeRedirect4(redirectTo),
    { title: "Welcome", description: "Thanks for signing up!" },
    { headers: headers3 }
  );
}
async function handleVerification5({ submission }) {
  invariant(submission.value, "submission.value should be defined by now");
  let verifySession = await verifySessionStorage.getSession();
  return verifySession.set(onboardingEmailSessionKey2, submission.value.target), redirect10("/onboarding", {
    headers: {
      "set-cookie": await verifySessionStorage.commitSession(verifySession)
    }
  });
}
var meta5 = () => [{ title: "Setup Epic Notes Account" }];
function SignupRoute2() {
  let data = useLoaderData5(), actionData = useActionData6(), isPending = useIsPending(), [searchParams] = useSearchParams5(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm7({
    id: "onboarding-provider-form",
    constraint: getFieldsetConstraint6(SignupFormSchema2),
    lastSubmission: actionData?.submission ?? data.submission,
    onValidate({ formData }) {
      return parse9(formData, { schema: SignupFormSchema2 });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV27("div", { className: "container flex min-h-full flex-col justify-center pb-32 pt-20", children: /* @__PURE__ */ jsxDEV27("div", { className: "mx-auto w-full max-w-lg", children: [
    /* @__PURE__ */ jsxDEV27("div", { className: "flex flex-col gap-3 text-center", children: [
      /* @__PURE__ */ jsxDEV27("h1", { className: "text-h1", children: [
        "Welcome aboard ",
        data.email,
        "!"
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
        lineNumber: 208,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV27("p", { className: "text-body-md text-muted-foreground", children: "Please enter your details." }, void 0, !1, {
        fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
        lineNumber: 209,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
      lineNumber: 207,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV27(Spacer, { size: "xs" }, void 0, !1, {
      fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
      lineNumber: 213,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV27(
      Form9,
      {
        method: "POST",
        className: "mx-auto min-w-full max-w-sm sm:min-w-[368px]",
        ...form.props,
        children: [
          fields.imageUrl.defaultValue ? /* @__PURE__ */ jsxDEV27("div", { className: "mb-4 flex flex-col items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxDEV27(
              "img",
              {
                src: fields.imageUrl.defaultValue,
                alt: "Profile",
                className: "h-24 w-24 rounded-full"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
                lineNumber: 221,
                columnNumber: 8
              },
              this
            ),
            /* @__PURE__ */ jsxDEV27("p", { className: "text-body-sm text-muted-foreground", children: "You can change your photo later" }, void 0, !1, {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 226,
              columnNumber: 8
            }, this),
            /* @__PURE__ */ jsxDEV27("input", { ...conform6.input(fields.imageUrl, { type: "hidden" }) }, void 0, !1, {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 229,
              columnNumber: 8
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
            lineNumber: 220,
            columnNumber: 7
          }, this) : null,
          /* @__PURE__ */ jsxDEV27(
            Field,
            {
              labelProps: { htmlFor: fields.username.id, children: "Username" },
              inputProps: {
                ...conform6.input(fields.username),
                autoComplete: "username",
                className: "lowercase"
              },
              errors: fields.username.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 232,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV27(
            Field,
            {
              labelProps: { htmlFor: fields.name.id, children: "Name" },
              inputProps: {
                ...conform6.input(fields.name),
                autoComplete: "name"
              },
              errors: fields.name.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 241,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV27(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
                children: "Do you agree to our Terms of Service and Privacy Policy?"
              },
              buttonProps: conform6.input(
                fields.agreeToTermsOfServiceAndPrivacyPolicy,
                { type: "checkbox" }
              ),
              errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 250,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV27(
            CheckboxField,
            {
              labelProps: {
                htmlFor: fields.remember.id,
                children: "Remember me"
              },
              buttonProps: conform6.input(fields.remember, { type: "checkbox" }),
              errors: fields.remember.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 262,
              columnNumber: 6
            },
            this
          ),
          redirectTo ? /* @__PURE__ */ jsxDEV27("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
            lineNumber: 272,
            columnNumber: 7
          }, this) : null,
          /* @__PURE__ */ jsxDEV27(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
            lineNumber: 275,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ jsxDEV27("div", { className: "flex items-center justify-between gap-6", children: /* @__PURE__ */ jsxDEV27(
            StatusButton,
            {
              className: "w-full",
              status: isPending ? "pending" : actionData?.status ?? "idle",
              type: "submit",
              disabled: isPending,
              children: "Create an account"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
              lineNumber: 278,
              columnNumber: 7
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
            lineNumber: 277,
            columnNumber: 6
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
        lineNumber: 214,
        columnNumber: 5
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
    lineNumber: 206,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/onboarding_.$provider.tsx",
    lineNumber: 205,
    columnNumber: 3
  }, this);
}

// app/routes/_auth+/auth.$provider.callback.ts
var destroyRedirectTo = { "set-cookie": destroyRedirectToHeader };
async function loader9({ request, params }) {
  let providerName = ProviderNameSchema.parse(params.provider), redirectTo = getRedirectCookieValue(request), label = providerLabels[providerName], authResult = await authenticator.authenticate(providerName, request, { throwOnError: !0 }).then(
    (data) => ({ success: !0, data }),
    (error) => ({ success: !1, error })
  );
  if (!authResult.success)
    throw console.error(authResult.error), await redirectWithToast(
      "/login",
      {
        title: "Auth Failed",
        description: `There was an error authenticating with ${label}.`,
        type: "error"
      },
      { headers: destroyRedirectTo }
    );
  let { data: profile } = authResult, existingConnection = await prisma.connection.findUnique({
    select: { userId: !0 },
    where: {
      providerName_providerId: { providerName, providerId: profile.id }
    }
  }), userId = await getUserId(request);
  if (existingConnection && userId)
    return existingConnection.userId === userId ? redirectWithToast(
      "/settings/profile/connections",
      {
        title: "Already Connected",
        description: `Your "${profile.username}" ${label} account is already connected.`
      },
      { headers: destroyRedirectTo }
    ) : redirectWithToast(
      "/settings/profile/connections",
      {
        title: "Already Connected",
        description: `The "${profile.username}" ${label} account is already connected to another account.`
      },
      { headers: destroyRedirectTo }
    );
  if (userId)
    return await prisma.connection.create({
      data: {
        providerName,
        providerId: profile.id,
        userId
      }
    }), redirectWithToast(
      "/settings/profile/connections",
      {
        title: "Connected",
        type: "success",
        description: `Your "${profile.username}" ${label} account has been connected.`
      },
      { headers: destroyRedirectTo }
    );
  if (existingConnection)
    return makeSession({ request, userId: existingConnection.userId });
  let user = await prisma.user.findUnique({
    select: { id: !0 },
    where: { email: profile.email.toLowerCase() }
  });
  if (user)
    return await prisma.connection.create({
      data: {
        providerName,
        providerId: profile.id,
        userId: user.id
      }
    }), makeSession(
      { request, userId: user.id },
      {
        headers: await createToastHeaders({
          title: "Connected",
          description: `Your "${profile.username}" ${label} account has been connected.`
        })
      }
    );
  let verifySession = await verifySessionStorage.getSession();
  verifySession.set(onboardingEmailSessionKey2, profile.email), verifySession.set(prefilledProfileKey, {
    ...profile,
    email: profile.email.toLowerCase(),
    username: profile.username?.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase()
  }), verifySession.set(providerIdKey, profile.id);
  let onboardingRedirect = [
    `/onboarding/${providerName}`,
    redirectTo ? new URLSearchParams({ redirectTo }) : null
  ].filter(Boolean).join("?");
  return redirect11(onboardingRedirect, {
    headers: combineHeaders(
      { "set-cookie": await verifySessionStorage.commitSession(verifySession) },
      destroyRedirectTo
    )
  });
}
async function makeSession({
  request,
  userId,
  redirectTo
}, responseInit) {
  redirectTo ??= "/";
  let session = await prisma.session.create({
    select: { id: !0, expirationDate: !0, userId: !0 },
    data: {
      expirationDate: getSessionExpirationDate(),
      userId
    }
  });
  return handleNewSession(
    { request, session, redirectTo, remember: !0 },
    { headers: combineHeaders(responseInit?.headers, destroyRedirectTo) }
  );
}

// app/routes/_auth+/forgot-password.tsx
var forgot_password_exports = {};
__export(forgot_password_exports, {
  ErrorBoundary: () => ErrorBoundary6,
  action: () => action10,
  default: () => ForgotPasswordRoute,
  meta: () => meta6
});
import { conform as conform7, useForm as useForm8 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint7, parse as parse10 } from "@conform-to/zod";
import * as E2 from "@react-email/components";
import {
  json as json9,
  redirect as redirect12
} from "@remix-run/node";
import { Link as Link6, useFetcher as useFetcher2 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput5 } from "remix-utils/csrf/react";
import { HoneypotInputs as HoneypotInputs4 } from "remix-utils/honeypot/react";
import { z as z15 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
var ForgotPasswordSchema = z15.object({
  usernameOrEmail: z15.union([EmailSchema, UsernameSchema])
});
async function action10({ request }) {
  let formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse10(formData, {
    schema: ForgotPasswordSchema.superRefine(async (data, ctx) => {
      if (!await prisma.user.findFirst({
        where: {
          OR: [
            { email: data.usernameOrEmail },
            { username: data.usernameOrEmail }
          ]
        },
        select: { id: !0 }
      })) {
        ctx.addIssue({
          path: ["usernameOrEmail"],
          code: z15.ZodIssueCode.custom,
          message: "No user exists with this username or email"
        });
        return;
      }
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json9({ status: "idle", submission });
  if (!submission.value)
    return json9({ status: "error", submission }, { status: 400 });
  let { usernameOrEmail } = submission.value, user = await prisma.user.findFirstOrThrow({
    where: { OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }] },
    select: { email: !0, username: !0 }
  }), { verifyUrl, redirectTo, otp } = await prepareVerification({
    period: 10 * 60,
    request,
    type: "reset-password",
    target: usernameOrEmail
  }), response = await sendEmail({
    to: user.email,
    subject: "Epic Notes Password Reset",
    react: /* @__PURE__ */ jsxDEV28(ForgotPasswordEmail, { onboardingUrl: verifyUrl.toString(), otp }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 78,
      columnNumber: 4
    }, this)
  });
  return response.status === "success" ? redirect12(redirectTo.toString()) : (submission.error[""] = [response.error.message], json9({ status: "error", submission }, { status: 500 }));
}
function ForgotPasswordEmail({
  onboardingUrl,
  otp
}) {
  return /* @__PURE__ */ jsxDEV28(E2.Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ jsxDEV28(E2.Container, { children: [
    /* @__PURE__ */ jsxDEV28("h1", { children: /* @__PURE__ */ jsxDEV28(E2.Text, { children: "Epic Notes Password Reset" }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 101,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 100,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV28("p", { children: /* @__PURE__ */ jsxDEV28(E2.Text, { children: [
      "Here's your verification code: ",
      /* @__PURE__ */ jsxDEV28("strong", { children: otp }, void 0, !1, {
        fileName: "app/routes/_auth+/forgot-password.tsx",
        lineNumber: 105,
        columnNumber: 38
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 104,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 103,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV28("p", { children: /* @__PURE__ */ jsxDEV28(E2.Text, { children: "Or click the link:" }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 109,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 108,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV28(E2.Link, { href: onboardingUrl, children: onboardingUrl }, void 0, !1, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 111,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/forgot-password.tsx",
    lineNumber: 99,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/forgot-password.tsx",
    lineNumber: 98,
    columnNumber: 3
  }, this);
}
var meta6 = () => [{ title: "Password Recovery for Epic Notes" }];
function ForgotPasswordRoute() {
  let forgotPassword = useFetcher2(), [form, fields] = useForm8({
    id: "forgot-password-form",
    constraint: getFieldsetConstraint7(ForgotPasswordSchema),
    lastSubmission: forgotPassword.data?.submission,
    onValidate({ formData }) {
      return parse10(formData, { schema: ForgotPasswordSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV28("div", { className: "container pb-32 pt-20", children: /* @__PURE__ */ jsxDEV28("div", { className: "flex flex-col justify-center", children: [
    /* @__PURE__ */ jsxDEV28("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV28("h1", { className: "text-h1", children: "Forgot Password" }, void 0, !1, {
        fileName: "app/routes/_auth+/forgot-password.tsx",
        lineNumber: 138,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV28("p", { className: "mt-3 text-body-md text-muted-foreground", children: "No worries, we'll send you reset instructions." }, void 0, !1, {
        fileName: "app/routes/_auth+/forgot-password.tsx",
        lineNumber: 139,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 137,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV28("div", { className: "mx-auto mt-16 min-w-full sm:min-w-[368px] max-w-sm", children: [
      /* @__PURE__ */ jsxDEV28(forgotPassword.Form, { method: "POST", ...form.props, children: [
        /* @__PURE__ */ jsxDEV28(AuthenticityTokenInput5, {}, void 0, !1, {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 145,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28(HoneypotInputs4, {}, void 0, !1, {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 146,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28("div", { children: /* @__PURE__ */ jsxDEV28(
          Field,
          {
            labelProps: {
              htmlFor: fields.usernameOrEmail.id,
              children: "Username or Email"
            },
            inputProps: {
              autoFocus: !0,
              ...conform7.input(fields.usernameOrEmail)
            },
            errors: fields.usernameOrEmail.errors
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/forgot-password.tsx",
            lineNumber: 148,
            columnNumber: 8
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 147,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 160,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28("div", { className: "mt-6", children: /* @__PURE__ */ jsxDEV28(
          StatusButton,
          {
            className: "w-full",
            status: forgotPassword.state === "submitting" ? "pending" : forgotPassword.data?.status ?? "idle",
            type: "submit",
            disabled: forgotPassword.state !== "idle",
            children: "Recover password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/forgot-password.tsx",
            lineNumber: 163,
            columnNumber: 8
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 162,
          columnNumber: 7
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/forgot-password.tsx",
        lineNumber: 144,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV28(
        Link6,
        {
          to: "/login",
          className: "mt-11 text-center text-body-sm font-bold",
          children: "Back to Login"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/forgot-password.tsx",
          lineNumber: 177,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/forgot-password.tsx",
      lineNumber: 143,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/forgot-password.tsx",
    lineNumber: 136,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/forgot-password.tsx",
    lineNumber: 135,
    columnNumber: 3
  }, this);
}
function ErrorBoundary6() {
  return /* @__PURE__ */ jsxDEV28(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/_auth+/forgot-password.tsx",
    lineNumber: 190,
    columnNumber: 9
  }, this);
}

// app/routes/_auth+/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action11,
  loader: () => loader10
});
import { redirect as redirect13 } from "@remix-run/node";
async function loader10() {
  return redirect13("/");
}
async function action11({ request }) {
  return logout({ request });
}

// app/routes/_auth+/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  ErrorBoundary: () => ErrorBoundary7,
  SignupEmail: () => SignupEmail,
  action: () => action12,
  default: () => SignupRoute3,
  meta: () => meta7
});
import { conform as conform8, useForm as useForm9 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint8, parse as parse11 } from "@conform-to/zod";
import * as E3 from "@react-email/components";
import {
  json as json10,
  redirect as redirect14
} from "@remix-run/node";
import { Form as Form10, useActionData as useActionData7, useSearchParams as useSearchParams6 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput6 } from "remix-utils/csrf/react";
import { HoneypotInputs as HoneypotInputs5 } from "remix-utils/honeypot/react";
import { z as z16 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV29 } from "react/jsx-dev-runtime";
var SignupSchema = z16.object({
  email: EmailSchema
});
async function action12({ request }) {
  let formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse11(formData, {
    schema: SignupSchema.superRefine(async (data, ctx) => {
      if (await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: !0 }
      })) {
        ctx.addIssue({
          path: ["email"],
          code: z16.ZodIssueCode.custom,
          message: "A user already exists with this email"
        });
        return;
      }
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json10({ status: "idle", submission });
  if (!submission.value)
    return json10({ status: "error", submission }, { status: 400 });
  let { email } = submission.value, { verifyUrl, redirectTo, otp } = await prepareVerification({
    period: 10 * 60,
    request,
    type: "onboarding",
    target: email
  }), response = await sendEmail({
    to: email,
    subject: "Welcome to Epic Notes!",
    react: /* @__PURE__ */ jsxDEV29(SignupEmail, { onboardingUrl: verifyUrl.toString(), otp }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 73,
      columnNumber: 10
    }, this)
  });
  return response.status === "success" ? redirect14(redirectTo.toString()) : (submission.error[""] = [response.error.message], json10({ status: "error", submission }, { status: 500 }));
}
function SignupEmail({
  onboardingUrl,
  otp
}) {
  return /* @__PURE__ */ jsxDEV29(E3.Html, { lang: "en", dir: "ltr", children: /* @__PURE__ */ jsxDEV29(E3.Container, { children: [
    /* @__PURE__ */ jsxDEV29("h1", { children: /* @__PURE__ */ jsxDEV29(E3.Text, { children: "Welcome to Epic Notes!" }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 95,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 94,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV29("p", { children: /* @__PURE__ */ jsxDEV29(E3.Text, { children: [
      "Here's your verification code: ",
      /* @__PURE__ */ jsxDEV29("strong", { children: otp }, void 0, !1, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 99,
        columnNumber: 38
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 98,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 97,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV29("p", { children: /* @__PURE__ */ jsxDEV29(E3.Text, { children: "Or click the link to get started:" }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 103,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 102,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV29(E3.Link, { href: onboardingUrl, children: onboardingUrl }, void 0, !1, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 105,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 93,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 92,
    columnNumber: 3
  }, this);
}
var meta7 = () => [{ title: "Sign Up | Epic Notes" }];
function SignupRoute3() {
  let actionData = useActionData7(), isPending = useIsPending(), [searchParams] = useSearchParams6(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm9({
    id: "signup-form",
    constraint: getFieldsetConstraint8(SignupSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse11(formData, { schema: SignupSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV29("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxDEV29("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV29("h1", { className: "text-h1", children: "Let's start your journey!" }, void 0, !1, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 135,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV29("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your email." }, void 0, !1, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 136,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 134,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV29("div", { className: "mx-auto mt-16 min-w-full sm:min-w-[368px] max-w-sm", children: [
      /* @__PURE__ */ jsxDEV29(Form10, { method: "POST", ...form.props, children: [
        /* @__PURE__ */ jsxDEV29(AuthenticityTokenInput6, {}, void 0, !1, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 142,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV29(HoneypotInputs5, {}, void 0, !1, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 143,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV29(
          Field,
          {
            labelProps: {
              htmlFor: fields.email.id,
              children: "Email"
            },
            inputProps: { ...conform8.input(fields.email), autoFocus: !0 },
            errors: fields.email.errors
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/signup.tsx",
            lineNumber: 144,
            columnNumber: 6
          },
          this
        ),
        /* @__PURE__ */ jsxDEV29(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 152,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV29(
          StatusButton,
          {
            className: "w-full",
            status: isPending ? "pending" : actionData?.status ?? "idle",
            type: "submit",
            disabled: isPending,
            children: "Submit"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/_auth+/signup.tsx",
            lineNumber: 153,
            columnNumber: 6
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 141,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV29("ul", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ jsxDEV29("li", { children: /* @__PURE__ */ jsxDEV29(
        ProviderConnectionForm,
        {
          type: "Signup",
          providerName,
          redirectTo
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_auth+/signup.tsx",
          lineNumber: 165,
          columnNumber: 8
        },
        this
      ) }, providerName, !1, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 164,
        columnNumber: 7
      }, this)) }, void 0, !1, {
        fileName: "app/routes/_auth+/signup.tsx",
        lineNumber: 162,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_auth+/signup.tsx",
      lineNumber: 140,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 133,
    columnNumber: 3
  }, this);
}
function ErrorBoundary7() {
  return /* @__PURE__ */ jsxDEV29(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/_auth+/signup.tsx",
    lineNumber: 179,
    columnNumber: 9
  }, this);
}

// app/routes/_marketing+/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => AboutRoute
});
import { jsxDEV as jsxDEV30 } from "react/jsx-dev-runtime";
function AboutRoute() {
  return /* @__PURE__ */ jsxDEV30("div", { children: "About page" }, void 0, !1, {
    fileName: "app/routes/_marketing+/about.tsx",
    lineNumber: 2,
    columnNumber: 9
  }, this);
}

// app/routes/_marketing+/index.tsx
var marketing_exports = {};
__export(marketing_exports, {
  default: () => Index,
  meta: () => meta8
});

// app/routes/_marketing+/logos/docker.svg
var docker_default = "/build/_assets/docker-PXO7TIYX.svg";

// app/routes/_marketing+/logos/eslint.svg
var eslint_default = "/build/_assets/eslint-VPOTK7W4.svg";

// app/routes/_marketing+/logos/faker.svg
var faker_default = "/build/_assets/faker-OAT6X3K3.svg";

// app/routes/_marketing+/logos/fly.svg
var fly_default = "/build/_assets/fly-35ZOU4DX.svg";

// app/routes/_marketing+/logos/github.svg
var github_default = "/build/_assets/github-HOJF6FGJ.svg";

// app/routes/_marketing+/logos/msw.svg
var msw_default = "/build/_assets/msw-WSUAYRZN.svg";

// app/routes/_marketing+/logos/playwright.svg
var playwright_default = "/build/_assets/playwright-JNNUWCNI.svg";

// app/routes/_marketing+/logos/prettier.svg
var prettier_default = "/build/_assets/prettier-NMKTJYDI.svg";

// app/routes/_marketing+/logos/prisma.svg
var prisma_default = "/build/_assets/prisma-U4MLCNC5.svg";

// app/routes/_marketing+/logos/radix.svg
var radix_default = "/build/_assets/radix-NUKLEAS2.svg";

// app/routes/_marketing+/logos/react-email.svg
var react_email_default = "/build/_assets/react-email-YMRKTLLV.svg";

// app/routes/_marketing+/logos/remix.svg
var remix_default = "/build/_assets/remix-5QQU3DJT.svg";

// app/routes/_marketing+/logos/resend.svg
var resend_default = "/build/_assets/resend-OMIULYPP.svg";

// app/routes/_marketing+/logos/sentry.svg
var sentry_default = "/build/_assets/sentry-6VXVIIJA.svg";

// app/routes/_marketing+/logos/shadcn-ui.svg
var shadcn_ui_default = "/build/_assets/shadcn-ui-EH6IJCJT.svg";

// app/routes/_marketing+/logos/sqlite.svg
var sqlite_default = "/build/_assets/sqlite-72EFWPWS.svg";

// app/routes/_marketing+/logos/tailwind.svg
var tailwind_default2 = "/build/_assets/tailwind-UEDJXWUC.svg";

// app/routes/_marketing+/logos/testing-library.png
var testing_library_default = "/build/_assets/testing-library-NGURR4WR.png";

// app/routes/_marketing+/logos/typescript.svg
var typescript_default = "/build/_assets/typescript-MWNTIQSQ.svg";

// app/routes/_marketing+/logos/vitest.svg
var vitest_default = "/build/_assets/vitest-MBMTIYCC.svg";

// app/routes/_marketing+/logos/zod.svg
var zod_default = "/build/_assets/zod-3ONWVJM7.svg";

// app/routes/_marketing+/logos/stars.jpg
var stars_default = "/build/_assets/stars-Y5JT26BU.jpg";

// app/routes/_marketing+/logos/logos.ts
var logos = [
  {
    src: remix_default,
    alt: "Remix",
    href: "https://remix.run"
  },
  {
    src: fly_default,
    alt: "Fly.io",
    href: "https://fly.io"
  },
  {
    src: sqlite_default,
    alt: "SQLite",
    href: "https://sqlite.org"
  },
  {
    src: prisma_default,
    alt: "Prisma",
    href: "https://prisma.io"
  },
  {
    src: zod_default,
    alt: "Zod",
    href: "https://zod.dev/"
  },
  {
    src: github_default,
    alt: "GitHub",
    href: "https://github.com"
  },
  {
    src: resend_default,
    alt: "Resend",
    href: "https://resend.com"
  },
  {
    src: react_email_default,
    alt: "React Email",
    href: "https://react.email"
  },
  {
    src: tailwind_default2,
    alt: "Tailwind",
    href: "https://tailwindcss.com"
  },
  {
    src: radix_default,
    alt: "Radix UI",
    href: "https://www.radix-ui.com/"
  },
  {
    src: shadcn_ui_default,
    alt: "shadcn/ui",
    href: "https://ui.shadcn.com/"
  },
  {
    src: playwright_default,
    alt: "Playwright",
    href: "https://playwright.dev/"
  },
  {
    src: msw_default,
    alt: "MSW",
    href: "https://mswjs.io"
  },
  {
    src: faker_default,
    alt: "Faker.js",
    href: "https://fakerjs.dev/"
  },
  {
    src: vitest_default,
    alt: "Vitest",
    href: "https://vitest.dev"
  },
  {
    src: testing_library_default,
    alt: "Testing Library",
    href: "https://testing-library.com"
  },
  {
    src: docker_default,
    alt: "Docker",
    href: "https://www.docker.com"
  },
  {
    src: typescript_default,
    alt: "TypeScript",
    href: "https://typescriptlang.org"
  },
  {
    src: prettier_default,
    alt: "Prettier",
    href: "https://prettier.io"
  },
  {
    src: eslint_default,
    alt: "ESLint",
    href: "https://eslint.org"
  },
  {
    src: sentry_default,
    alt: "Sentry",
    href: "https://sentry.io"
  }
];

// app/routes/_marketing+/index.tsx
import { jsxDEV as jsxDEV31 } from "react/jsx-dev-runtime";
var meta8 = () => [{ title: "Epic Notes" }];
function Index() {
  return /* @__PURE__ */ jsxDEV31("main", { className: "relative min-h-screen sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ jsxDEV31("div", { className: "relative sm:pb-16 sm:pt-8", children: [
    /* @__PURE__ */ jsxDEV31("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV31("div", { className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl", children: [
      /* @__PURE__ */ jsxDEV31("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxDEV31("img", { className: "h-full w-full object-cover", src: stars_default, alt: "" }, void 0, !1, {
          fileName: "app/routes/_marketing+/index.tsx",
          lineNumber: 19,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV31("div", { className: "absolute inset-0 bg-[color:rgba(30,23,38,0.5)] mix-blend-multiply" }, void 0, !1, {
          fileName: "app/routes/_marketing+/index.tsx",
          lineNumber: 20,
          columnNumber: 8
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_marketing+/index.tsx",
        lineNumber: 18,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV31("div", { className: "lg:pt-18 relative px-4 pb-8 pt-8 sm:px-6 sm:pb-14 sm:pt-16 lg:px-8 lg:pb-20", children: [
        /* @__PURE__ */ jsxDEV31("h1", { className: "text-center text-mega font-extrabold tracking-tight sm:text-8xl lg:text-9xl", children: /* @__PURE__ */ jsxDEV31(
          "a",
          {
            className: "block uppercase text-white drop-shadow-md",
            href: "https://www.epicweb.dev/stack",
            children: [
              /* @__PURE__ */ jsxDEV31("span", { children: "Epic Stack" }, void 0, !1, {
                fileName: "app/routes/_marketing+/index.tsx",
                lineNumber: 28,
                columnNumber: 10
              }, this),
              /* @__PURE__ */ jsxDEV31(
                "svg",
                {
                  className: "mx-auto mt-2",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "120",
                  height: "120",
                  fill: "none",
                  viewBox: "0 0 65 65",
                  children: /* @__PURE__ */ jsxDEV31(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M39.445 25.555 37 17.163 65 0 47.821 28l-8.376-2.445Zm-13.89 0L28 17.163 0 0l17.179 28 8.376-2.445Zm13.89 13.89L37 47.837 65 65 47.821 37l-8.376 2.445Zm-13.89 0L28 47.837 0 65l17.179-28 8.376 2.445Z"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/_marketing+/index.tsx",
                      lineNumber: 37,
                      columnNumber: 11
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/_marketing+/index.tsx",
                  lineNumber: 29,
                  columnNumber: 10
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/_marketing+/index.tsx",
            lineNumber: 24,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/_marketing+/index.tsx",
          lineNumber: 23,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV31("p", { className: "mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl", children: [
          "Check the",
          " ",
          /* @__PURE__ */ jsxDEV31(
            "a",
            {
              className: "underline",
              href: "https://github.com/epicweb-dev/epic-stack/blob/main/docs/getting-started.md",
              children: "Getting Started"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_marketing+/index.tsx",
              lineNumber: 46,
              columnNumber: 9
            },
            this
          ),
          " ",
          "guide file for how to get your project off the ground!"
        ] }, void 0, !0, {
          fileName: "app/routes/_marketing+/index.tsx",
          lineNumber: 44,
          columnNumber: 8
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/_marketing+/index.tsx",
        lineNumber: 22,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 17,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 16,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV31("div", { className: "mx-auto mt-8 max-w-7xl px-4 py-2 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV31("div", { className: "flex flex-wrap justify-center gap-8 rounded-3xl bg-slate-100 py-4 dark:bg-slate-200", children: /* @__PURE__ */ jsxDEV31(TooltipProvider, { children: logos.map((img) => /* @__PURE__ */ jsxDEV31(Tooltip, { children: [
      /* @__PURE__ */ jsxDEV31(TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV31(
        "a",
        {
          href: img.href,
          className: "flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0",
          children: /* @__PURE__ */ jsxDEV31(
            "img",
            {
              alt: img.alt,
              src: img.src,
              className: "object-contain"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/_marketing+/index.tsx",
              lineNumber: 68,
              columnNumber: 12
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/_marketing+/index.tsx",
          lineNumber: 64,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/_marketing+/index.tsx",
        lineNumber: 63,
        columnNumber: 10
      }, this),
      /* @__PURE__ */ jsxDEV31(TooltipContent, { children: img.alt }, void 0, !1, {
        fileName: "app/routes/_marketing+/index.tsx",
        lineNumber: 75,
        columnNumber: 10
      }, this)
    ] }, img.href, !0, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, this)) }, void 0, !1, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 59,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/_marketing+/index.tsx",
      lineNumber: 58,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/_marketing+/index.tsx",
    lineNumber: 15,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/_marketing+/index.tsx",
    lineNumber: 14,
    columnNumber: 3
  }, this);
}

// app/routes/_marketing+/privacy.tsx
var privacy_exports = {};
__export(privacy_exports, {
  default: () => PrivacyRoute
});
import { jsxDEV as jsxDEV32 } from "react/jsx-dev-runtime";
function PrivacyRoute() {
  return /* @__PURE__ */ jsxDEV32("div", { children: "Privacy" }, void 0, !1, {
    fileName: "app/routes/_marketing+/privacy.tsx",
    lineNumber: 2,
    columnNumber: 9
  }, this);
}

// app/routes/_marketing+/support.tsx
var support_exports = {};
__export(support_exports, {
  default: () => SupportRoute
});
import { jsxDEV as jsxDEV33 } from "react/jsx-dev-runtime";
function SupportRoute() {
  return /* @__PURE__ */ jsxDEV33("div", { children: "Support" }, void 0, !1, {
    fileName: "app/routes/_marketing+/support.tsx",
    lineNumber: 2,
    columnNumber: 9
  }, this);
}

// app/routes/_marketing+/tos.tsx
var tos_exports = {};
__export(tos_exports, {
  default: () => TermsOfServiceRoute
});
import { jsxDEV as jsxDEV34 } from "react/jsx-dev-runtime";
function TermsOfServiceRoute() {
  return /* @__PURE__ */ jsxDEV34("div", { children: "Terms of service" }, void 0, !1, {
    fileName: "app/routes/_marketing+/tos.tsx",
    lineNumber: 2,
    columnNumber: 9
  }, this);
}

// app/routes/_seo+/robots[.]txt.ts
var robots_txt_exports = {};
__export(robots_txt_exports, {
  loader: () => loader11
});
import { generateRobotsTxt } from "@nasa-gcn/remix-seo";
function loader11({ request }) {
  return generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` }
  ]);
}

// app/routes/_seo+/sitemap[.]xml.ts
var sitemap_xml_exports = {};
__export(sitemap_xml_exports, {
  loader: () => loader12
});
import { generateSitemap } from "@nasa-gcn/remix-seo";
function loader12({ request }) {
  return generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`
    }
  });
}

// app/routes/admin+/cache.tsx
var cache_exports = {};
__export(cache_exports, {
  ErrorBoundary: () => ErrorBoundary8,
  action: () => action13,
  default: () => CacheAdminRoute,
  handle: () => handle3,
  loader: () => loader13
});
import { json as json12, redirect as redirect15 } from "@remix-run/node";
import {
  Form as Form11,
  Link as Link8,
  useFetcher as useFetcher3,
  useLoaderData as useLoaderData6,
  useSearchParams as useSearchParams7,
  useSubmit as useSubmit3
} from "@remix-run/react";

// app/utils/permissions.ts
import { json as json11 } from "@remix-run/node";
init_db_server();
async function requireUserWithPermission(request, permission) {
  let userId = await requireUserId(request), permissionData = parsePermissionString(permission), user = await prisma.user.findFirst({
    select: { id: !0 },
    where: {
      id: userId,
      roles: {
        some: {
          permissions: {
            some: {
              ...permissionData,
              access: permissionData.access ? { in: permissionData.access } : void 0
            }
          }
        }
      }
    }
  });
  if (!user)
    throw json11(
      {
        error: "Unauthorized",
        requiredPermission: permissionData,
        message: `Unauthorized: required permissions: ${permission}`
      },
      { status: 403 }
    );
  return user.id;
}
async function requireUserWithRole(request, name) {
  let userId = await requireUserId(request), user = await prisma.user.findFirst({
    select: { id: !0 },
    where: { id: userId, roles: { some: { name } } }
  });
  if (!user)
    throw json11(
      {
        error: "Unauthorized",
        requiredRole: name,
        message: `Unauthorized: required role: ${name}`
      },
      { status: 403 }
    );
  return user.id;
}
function parsePermissionString(permissionString) {
  let [action24, entity, access] = permissionString.split(":");
  return {
    action: action24,
    entity,
    access: access ? access.split(",") : void 0
  };
}
function userHasPermission(user, permission) {
  if (!user)
    return !1;
  let { action: action24, entity, access } = parsePermissionString(permission);
  return user.roles.some(
    (role) => role.permissions.some(
      (permission2) => permission2.entity === entity && permission2.action === action24 && (!access || access.includes(permission2.access))
    )
  );
}

// app/routes/admin+/cache.tsx
import { jsxDEV as jsxDEV35 } from "react/jsx-dev-runtime";
var handle3 = {
  getSitemapEntries: () => null
};
async function loader13({ request }) {
  await requireUserWithRole(request, "admin");
  let searchParams = new URL(request.url).searchParams, query = searchParams.get("query");
  if (query === "")
    return searchParams.delete("query"), redirect15(`/admin/cache?${searchParams.toString()}`);
  let limit = Number(searchParams.get("limit") ?? 100), currentInstanceInfo = await (0, litefs_server_exports.getInstanceInfo)(), instance = searchParams.get("instance") ?? currentInstanceInfo.currentInstance, instances = await (0, litefs_server_exports.getAllInstances)();
  await (0, litefs_server_exports.ensureInstance)(instance);
  let cacheKeys;
  return typeof query == "string" ? cacheKeys = await searchCacheKeys(query, limit) : cacheKeys = await getAllCacheKeys(limit), json12({ cacheKeys, instance, instances, currentInstanceInfo });
}
async function action13({ request }) {
  await requireUserWithRole(request, "admin");
  let formData = await request.formData(), key2 = formData.get("cacheKey"), { currentInstance } = await (0, litefs_server_exports.getInstanceInfo)(), instance = formData.get("instance") ?? currentInstance, type = formData.get("type");
  switch (invariantResponse(typeof key2 == "string", "cacheKey must be a string"), invariantResponse(typeof type == "string", "type must be a string"), invariantResponse(typeof instance == "string", "instance must be a string"), await (0, litefs_server_exports.ensureInstance)(instance), type) {
    case "sqlite": {
      await cache.delete(key2);
      break;
    }
    case "lru": {
      lruCache.delete(key2);
      break;
    }
    default:
      throw new Error(`Unknown cache type: ${type}`);
  }
  return json12({ success: !0 });
}
function CacheAdminRoute() {
  let data = useLoaderData6(), [searchParams] = useSearchParams7(), submit = useSubmit3(), query = searchParams.get("query") ?? "", limit = searchParams.get("limit") ?? "100", instance = searchParams.get("instance") ?? data.instance, handleFormChange = useDebounce((form) => {
    submit(form);
  }, 400);
  return /* @__PURE__ */ jsxDEV35("div", { className: "container", children: [
    /* @__PURE__ */ jsxDEV35("h1", { className: "text-h1", children: "Cache Admin" }, void 0, !1, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 104,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35(Spacer, { size: "2xs" }, void 0, !1, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 105,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35(
      Form11,
      {
        method: "get",
        className: "flex flex-col gap-4",
        onChange: (e) => handleFormChange(e.currentTarget),
        children: [
          /* @__PURE__ */ jsxDEV35("div", { className: "flex-1", children: /* @__PURE__ */ jsxDEV35("div", { className: "flex flex-1 gap-4", children: [
            /* @__PURE__ */ jsxDEV35(
              "button",
              {
                type: "submit",
                className: "flex h-16 items-center justify-center",
                children: "\u{1F50E}"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/admin+/cache.tsx",
                lineNumber: 113,
                columnNumber: 7
              },
              this
            ),
            /* @__PURE__ */ jsxDEV35(
              Field,
              {
                className: "flex-1",
                labelProps: { children: "Search" },
                inputProps: {
                  type: "search",
                  name: "query",
                  defaultValue: query
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/admin+/cache.tsx",
                lineNumber: 119,
                columnNumber: 7
              },
              this
            ),
            /* @__PURE__ */ jsxDEV35("div", { className: "flex h-16 w-14 items-center text-lg font-medium text-muted-foreground", children: /* @__PURE__ */ jsxDEV35("span", { title: "Total results shown", children: data.cacheKeys.sqlite.length + data.cacheKeys.lru.length }, void 0, !1, {
              fileName: "app/routes/admin+/cache.tsx",
              lineNumber: 129,
              columnNumber: 8
            }, this) }, void 0, !1, {
              fileName: "app/routes/admin+/cache.tsx",
              lineNumber: 128,
              columnNumber: 7
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/admin+/cache.tsx",
            lineNumber: 112,
            columnNumber: 6
          }, this) }, void 0, !1, {
            fileName: "app/routes/admin+/cache.tsx",
            lineNumber: 111,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ jsxDEV35("div", { className: "flex flex-wrap items-center gap-4", children: [
            /* @__PURE__ */ jsxDEV35(
              Field,
              {
                labelProps: {
                  children: "Limit"
                },
                inputProps: {
                  name: "limit",
                  defaultValue: limit,
                  type: "number",
                  step: "1",
                  min: "1",
                  max: "10000",
                  placeholder: "results limit"
                }
              },
              void 0,
              !1,
              {
                fileName: "app/routes/admin+/cache.tsx",
                lineNumber: 136,
                columnNumber: 6
              },
              this
            ),
            /* @__PURE__ */ jsxDEV35("select", { name: "instance", defaultValue: instance, children: Object.entries(data.instances).map(([inst, region]) => /* @__PURE__ */ jsxDEV35("option", { value: inst, children: [
              inst,
              `(${region})`,
              inst === data.currentInstanceInfo.currentInstance ? "(current)" : "",
              inst === data.currentInstanceInfo.primaryInstance ? " (primary)" : ""
            ].filter(Boolean).join(" ") }, inst, !1, {
              fileName: "app/routes/admin+/cache.tsx",
              lineNumber: 152,
              columnNumber: 8
            }, this)) }, void 0, !1, {
              fileName: "app/routes/admin+/cache.tsx",
              lineNumber: 150,
              columnNumber: 6
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/admin+/cache.tsx",
            lineNumber: 135,
            columnNumber: 5
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 106,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV35(Spacer, { size: "2xs" }, void 0, !1, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 170,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxDEV35("h2", { className: "text-h2", children: "LRU Cache:" }, void 0, !1, {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 172,
        columnNumber: 5
      }, this),
      data.cacheKeys.lru.map((key2) => /* @__PURE__ */ jsxDEV35(
        CacheKeyRow,
        {
          cacheKey: key2,
          instance,
          type: "lru"
        },
        key2,
        !1,
        {
          fileName: "app/routes/admin+/cache.tsx",
          lineNumber: 174,
          columnNumber: 6
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 171,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35(Spacer, { size: "3xs" }, void 0, !1, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 182,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxDEV35("h2", { className: "text-h2", children: "SQLite Cache:" }, void 0, !1, {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 184,
        columnNumber: 5
      }, this),
      data.cacheKeys.sqlite.map((key2) => /* @__PURE__ */ jsxDEV35(
        CacheKeyRow,
        {
          cacheKey: key2,
          instance,
          type: "sqlite"
        },
        key2,
        !1,
        {
          fileName: "app/routes/admin+/cache.tsx",
          lineNumber: 186,
          columnNumber: 6
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 183,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin+/cache.tsx",
    lineNumber: 103,
    columnNumber: 3
  }, this);
}
function CacheKeyRow({
  cacheKey,
  instance,
  type
}) {
  let fetcher = useFetcher3(), dc = useDoubleCheck(), encodedKey = encodeURIComponent(cacheKey), valuePage = `/admin/cache/${type}/${encodedKey}?instance=${instance}`;
  return /* @__PURE__ */ jsxDEV35("div", { className: "flex items-center gap-2 font-mono", children: [
    /* @__PURE__ */ jsxDEV35(fetcher.Form, { method: "POST", children: [
      /* @__PURE__ */ jsxDEV35("input", { type: "hidden", name: "cacheKey", value: cacheKey }, void 0, !1, {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 214,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV35("input", { type: "hidden", name: "instance", value: instance }, void 0, !1, {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 215,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV35("input", { type: "hidden", name: "type", value: type }, void 0, !1, {
        fileName: "app/routes/admin+/cache.tsx",
        lineNumber: 216,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV35(
        Button,
        {
          size: "sm",
          variant: "secondary",
          ...dc.getButtonProps({ type: "submit" }),
          children: fetcher.state === "idle" ? dc.doubleCheck ? "You sure?" : "Delete" : "Deleting..."
        },
        void 0,
        !1,
        {
          fileName: "app/routes/admin+/cache.tsx",
          lineNumber: 217,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 213,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV35(Link8, { reloadDocument: !0, to: valuePage, children: cacheKey }, void 0, !1, {
      fileName: "app/routes/admin+/cache.tsx",
      lineNumber: 229,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin+/cache.tsx",
    lineNumber: 212,
    columnNumber: 3
  }, this);
}
function ErrorBoundary8({ error }) {
  return console.error(error), /* @__PURE__ */ jsxDEV35("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/admin+/cache.tsx",
    lineNumber: 239,
    columnNumber: 9
  }, this);
}

// app/routes/admin+/cache_.lru.$cacheKey.ts
var cache_lru_cacheKey_exports = {};
__export(cache_lru_cacheKey_exports, {
  loader: () => loader14
});
import { json as json13 } from "@remix-run/node";
import { getAllInstances as getAllInstances2, getInstanceInfo as getInstanceInfo5 } from "litefs-js";
import { ensureInstance as ensureInstance2 } from "litefs-js/remix.js";
async function loader14({ request, params }) {
  await requireUserWithRole(request, "admin");
  let searchParams = new URL(request.url).searchParams, currentInstanceInfo = await getInstanceInfo5(), allInstances = await getAllInstances2(), instance = searchParams.get("instance") ?? currentInstanceInfo.currentInstance;
  await ensureInstance2(instance);
  let { cacheKey } = params;
  return invariantResponse(cacheKey, "cacheKey is required"), json13({
    instance: {
      hostname: instance,
      region: allInstances[instance],
      isPrimary: currentInstanceInfo.primaryInstance === instance
    },
    cacheKey,
    value: lruCache.get(cacheKey)
  });
}

// app/routes/admin+/cache_.sqlite.$cacheKey.ts
var cache_sqlite_cacheKey_exports = {};
__export(cache_sqlite_cacheKey_exports, {
  loader: () => loader15
});
import { json as json14 } from "@remix-run/node";
import { getAllInstances as getAllInstances3, getInstanceInfo as getInstanceInfo6 } from "litefs-js";
import { ensureInstance as ensureInstance3 } from "litefs-js/remix.js";
async function loader15({ request, params }) {
  await requireUserWithRole(request, "admin");
  let searchParams = new URL(request.url).searchParams, currentInstanceInfo = await getInstanceInfo6(), allInstances = await getAllInstances3(), instance = searchParams.get("instance") ?? currentInstanceInfo.currentInstance;
  await ensureInstance3(instance);
  let { cacheKey } = params;
  return invariantResponse(cacheKey, "cacheKey is required"), json14({
    instance: {
      hostname: instance,
      region: allInstances[instance],
      isPrimary: currentInstanceInfo.primaryInstance === instance
    },
    cacheKey,
    value: cache.get(cacheKey)
  });
}

// app/routes/me.tsx
var me_exports = {};
__export(me_exports, {
  loader: () => loader16
});
import { redirect as redirect16 } from "@remix-run/node";
init_db_server();
async function loader16({ request }) {
  let userId = await requireUserId(request), user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    let requestUrl = new URL(request.url), redirectTo = `/login?${new URLSearchParams([
      ["redirectTo", `${requestUrl.pathname}${requestUrl.search}`]
    ])}`;
    return await logout({ request, redirectTo }), redirect16(redirectTo);
  }
  return redirect16(`/users/${user.username}`);
}

// app/routes/resources+/download-user-data.tsx
var download_user_data_exports = {};
__export(download_user_data_exports, {
  loader: () => loader17
});
import { json as json15 } from "@remix-run/node";
init_db_server();
async function loader17({ request }) {
  let userId = await requireUserId(request), user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    // this is one of the *few* instances where you can use "include" because
    // the goal is to literally get *everything*. Normally you should be
    // explicit with "select". We're suing select for images because we don't
    // want to send back the entire blob of the image. We'll send a URL they can
    // use to download it instead.
    include: {
      image: {
        select: {
          id: !0,
          createdAt: !0,
          updatedAt: !0,
          contentType: !0
        }
      },
      notes: {
        include: {
          images: {
            select: {
              id: !0,
              createdAt: !0,
              updatedAt: !0,
              contentType: !0
            }
          }
        }
      },
      password: !1,
      // <-- intentionally omit password
      sessions: !0,
      roles: !0
    }
  }), domain = getDomainUrl(request);
  return json15({
    user: {
      ...user,
      image: user.image ? {
        ...user.image,
        url: `${domain}/resources/user-images/${user.image.id}`
      } : null,
      notes: user.notes.map((note) => ({
        ...note,
        images: note.images.map((image) => ({
          ...image,
          url: `${domain}/resources/note-images/${image.id}`
        }))
      }))
    }
  });
}

// app/routes/resources+/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader18
});
init_db_server();
async function loader18({ request }) {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    return await Promise.all([
      prisma.user.count(),
      fetch(`${new URL(request.url).protocol}${host}`, {
        method: "HEAD",
        headers: { "X-Healthcheck": "true" }
      }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
}

// app/routes/resources+/note-images.$imageId.tsx
var note_images_imageId_exports = {};
__export(note_images_imageId_exports, {
  loader: () => loader19
});
init_db_server();
async function loader19({ params }) {
  invariantResponse(params.imageId, "Image ID is required", { status: 400 });
  let image = await prisma.noteImage.findUnique({
    where: { id: params.imageId },
    select: { contentType: !0, blob: !0 }
  });
  return invariantResponse(image, "Not found", { status: 404 }), new Response(image.blob, {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": Buffer.byteLength(image.blob).toString(),
      "Content-Disposition": `inline; filename="${params.imageId}"`,
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}

// app/routes/resources+/user-images.$imageId.tsx
var user_images_imageId_exports = {};
__export(user_images_imageId_exports, {
  loader: () => loader20
});
init_db_server();
async function loader20({ params }) {
  invariantResponse(params.imageId, "Image ID is required", { status: 400 });
  let image = await prisma.userImage.findUnique({
    where: { id: params.imageId },
    select: { contentType: !0, blob: !0 }
  });
  return invariantResponse(image, "Not found", { status: 404 }), new Response(image.blob, {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": Buffer.byteLength(image.blob).toString(),
      "Content-Disposition": `inline; filename="${params.imageId}"`,
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}

// app/routes/settings+/profile.tsx
var profile_exports = {};
__export(profile_exports, {
  BreadcrumbHandle: () => BreadcrumbHandle,
  default: () => EditUserProfile,
  handle: () => handle4,
  loader: () => loader21
});
import { json as json16 } from "@remix-run/node";
import { Link as Link9, Outlet as Outlet3, useMatches as useMatches2 } from "@remix-run/react";
import { z as z17 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV36 } from "react/jsx-dev-runtime";
var BreadcrumbHandle = z17.object({ breadcrumb: z17.any() }), handle4 = {
  breadcrumb: /* @__PURE__ */ jsxDEV36(Icon, { name: "file-text", children: "Edit Profile" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.tsx",
    lineNumber: 16,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
};
async function loader21({ request }) {
  let userId = await requireUserId(request), user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: !0 }
  });
  return invariantResponse(user, "User not found", { status: 404 }), json16({});
}
var BreadcrumbHandleMatch = z17.object({
  handle: BreadcrumbHandle
});
function EditUserProfile() {
  let user = useUser(), breadcrumbs = useMatches2().map((m) => {
    let result = BreadcrumbHandleMatch.safeParse(m);
    return !result.success || !result.data.handle.breadcrumb ? null : /* @__PURE__ */ jsxDEV36(Link9, { to: m.pathname, className: "flex items-center", children: result.data.handle.breadcrumb }, m.id, !1, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 42,
      columnNumber: 5
    }, this);
  }).filter(Boolean);
  return /* @__PURE__ */ jsxDEV36("div", { className: "m-auto mb-24 mt-16 max-w-3xl", children: [
    /* @__PURE__ */ jsxDEV36("div", { className: "container", children: /* @__PURE__ */ jsxDEV36("ul", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxDEV36("li", { children: /* @__PURE__ */ jsxDEV36(
        Link9,
        {
          className: "text-muted-foreground",
          to: `/users/${user.username}`,
          children: "Profile"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.tsx",
          lineNumber: 54,
          columnNumber: 7
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.tsx",
        lineNumber: 53,
        columnNumber: 6
      }, this),
      breadcrumbs.map((breadcrumb, i, arr) => /* @__PURE__ */ jsxDEV36(
        "li",
        {
          className: cn("flex items-center gap-3", {
            "text-muted-foreground": i < arr.length - 1
          }),
          children: [
            "\u25B6\uFE0F ",
            breadcrumb
          ]
        },
        i,
        !0,
        {
          fileName: "app/routes/settings+/profile.tsx",
          lineNumber: 62,
          columnNumber: 7
        },
        this
      ))
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 52,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 51,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV36(Spacer, { size: "xs" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV36("main", { className: "mx-auto bg-muted px-6 py-8 md:container md:rounded-3xl", children: /* @__PURE__ */ jsxDEV36(Outlet3, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 75,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.tsx",
      lineNumber: 74,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.tsx",
    lineNumber: 50,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.connections.tsx
var profile_connections_exports = {};
__export(profile_connections_exports, {
  action: () => action14,
  default: () => Connections,
  handle: () => handle5,
  headers: () => headers2,
  loader: () => loader22
});
import {
  json as json17
} from "@remix-run/node";
import { useFetcher as useFetcher4, useLoaderData as useLoaderData7 } from "@remix-run/react";
import { useState as useState3 } from "react";
init_db_server();
import { jsxDEV as jsxDEV37 } from "react/jsx-dev-runtime";
var handle5 = {
  breadcrumb: /* @__PURE__ */ jsxDEV37(Icon, { name: "link-2", children: "Connections" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.connections.tsx",
    lineNumber: 34,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
};
async function userCanDeleteConnections(userId) {
  let user = await prisma.user.findUnique({
    select: {
      password: { select: { userId: !0 } },
      _count: { select: { connections: !0 } }
    },
    where: { id: userId }
  });
  return user?.password ? !0 : Boolean(user?._count.connections && user?._count.connections > 1);
}
async function loader22({ request }) {
  let userId = await requireUserId(request), timings = makeTimings("profile connections loader"), rawConnections = await prisma.connection.findMany({
    select: { id: !0, providerName: !0, providerId: !0, createdAt: !0 },
    where: { userId }
  }), connections = [];
  for (let connection of rawConnections) {
    let r = ProviderNameSchema.safeParse(connection.providerName);
    if (!r.success)
      continue;
    let providerName = r.data, connectionData = await resolveConnectionData(
      providerName,
      connection.providerId,
      { timings }
    );
    connections.push({
      ...connectionData,
      providerName,
      id: connection.id,
      createdAtFormatted: connection.createdAt.toLocaleString()
    });
  }
  return json17(
    {
      connections,
      canDeleteConnections: await userCanDeleteConnections(userId)
    },
    { headers: { "Server-Timing": timings.toString() } }
  );
}
var headers2 = ({ loaderHeaders }) => ({
  "Server-Timing": loaderHeaders.get("Server-Timing") ?? ""
});
async function action14({ request }) {
  let userId = await requireUserId(request), formData = await request.formData();
  invariantResponse(
    formData.get("intent") === "delete-connection",
    "Invalid intent"
  ), invariantResponse(
    await userCanDeleteConnections(userId),
    "You cannot delete your last connection unless you have a password."
  );
  let connectionId = formData.get("connectionId");
  invariantResponse(typeof connectionId == "string", "Invalid connectionId"), await prisma.connection.delete({
    where: {
      id: connectionId,
      userId
    }
  });
  let toastHeaders = await createToastHeaders({
    title: "Deleted",
    description: "Your connection has been deleted."
  });
  return json17({ status: "success" }, { headers: toastHeaders });
}
function Connections() {
  let data = useLoaderData7();
  return /* @__PURE__ */ jsxDEV37("div", { className: "mx-auto max-w-md", children: [
    data.connections.length ? /* @__PURE__ */ jsxDEV37("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV37("p", { children: "Here are your current connections:" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 132,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV37("ul", { className: "flex flex-col gap-4", children: data.connections.map((c) => /* @__PURE__ */ jsxDEV37("li", { children: /* @__PURE__ */ jsxDEV37(
        Connection,
        {
          connection: c,
          canDelete: data.canDeleteConnections
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.connections.tsx",
          lineNumber: 136,
          columnNumber: 9
        },
        this
      ) }, c.id, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 135,
        columnNumber: 8
      }, this)) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 133,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 131,
      columnNumber: 5
    }, this) : /* @__PURE__ */ jsxDEV37("p", { children: "You don't have any connections yet." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 145,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV37("div", { className: "mt-5 flex flex-col gap-5 border-b-2 border-t-2 border-border py-3", children: providerNames.map((providerName) => /* @__PURE__ */ jsxDEV37(
      ProviderConnectionForm,
      {
        type: "Connect",
        providerName
      },
      providerName,
      !1,
      {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 149,
        columnNumber: 6
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 147,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.connections.tsx",
    lineNumber: 129,
    columnNumber: 3
  }, this);
}
function Connection({
  connection,
  canDelete
}) {
  let deleteFetcher = useFetcher4(), [infoOpen, setInfoOpen] = useState3(!1), icon = providerIcons[connection.providerName];
  return /* @__PURE__ */ jsxDEV37("div", { className: "flex justify-between gap-2", children: [
    /* @__PURE__ */ jsxDEV37("span", { className: "inline-flex items-center gap-1.5", children: [
      icon,
      /* @__PURE__ */ jsxDEV37("span", { children: [
        connection.link ? /* @__PURE__ */ jsxDEV37("a", { href: connection.link, className: "underline", children: connection.displayName }, void 0, !1, {
          fileName: "app/routes/settings+/profile.connections.tsx",
          lineNumber: 176,
          columnNumber: 7
        }, this) : connection.displayName,
        " ",
        "(",
        connection.createdAtFormatted,
        ")"
      ] }, void 0, !0, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 174,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 172,
      columnNumber: 4
    }, this),
    canDelete ? /* @__PURE__ */ jsxDEV37(deleteFetcher.Form, { method: "POST", children: [
      /* @__PURE__ */ jsxDEV37("input", { name: "connectionId", value: connection.id, type: "hidden" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 187,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV37(TooltipProvider, { children: /* @__PURE__ */ jsxDEV37(Tooltip, { children: [
        /* @__PURE__ */ jsxDEV37(TooltipTrigger, { asChild: !0, children: /* @__PURE__ */ jsxDEV37(
          StatusButton,
          {
            name: "intent",
            value: "delete-connection",
            variant: "destructive",
            size: "sm",
            status: deleteFetcher.state !== "idle" ? "pending" : deleteFetcher.data?.status ?? "idle",
            children: /* @__PURE__ */ jsxDEV37(Icon, { name: "cross-1" }, void 0, !1, {
              fileName: "app/routes/settings+/profile.connections.tsx",
              lineNumber: 202,
              columnNumber: 10
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/settings+/profile.connections.tsx",
            lineNumber: 191,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/settings+/profile.connections.tsx",
          lineNumber: 190,
          columnNumber: 8
        }, this),
        /* @__PURE__ */ jsxDEV37(TooltipContent, { children: "Disconnect this account" }, void 0, !1, {
          fileName: "app/routes/settings+/profile.connections.tsx",
          lineNumber: 205,
          columnNumber: 8
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 189,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 188,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 186,
      columnNumber: 5
    }, this) : /* @__PURE__ */ jsxDEV37(TooltipProvider, { children: /* @__PURE__ */ jsxDEV37(Tooltip, { open: infoOpen, onOpenChange: setInfoOpen, children: [
      /* @__PURE__ */ jsxDEV37(TooltipTrigger, { onClick: () => setInfoOpen(!0), children: /* @__PURE__ */ jsxDEV37(Icon, { name: "question-mark-circled" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 213,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 212,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV37(TooltipContent, { children: "You cannot delete your last connection unless you have a password." }, void 0, !1, {
        fileName: "app/routes/settings+/profile.connections.tsx",
        lineNumber: 215,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 211,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.connections.tsx",
      lineNumber: 210,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.connections.tsx",
    lineNumber: 171,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.index.tsx
var profile_index_exports = {};
__export(profile_index_exports, {
  action: () => action15,
  default: () => EditUserProfile2,
  handle: () => handle6,
  loader: () => loader23
});
import { conform as conform9, useForm as useForm10 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint9, parse as parse12 } from "@conform-to/zod";
import { json as json18 } from "@remix-run/node";
import { Link as Link10, useFetcher as useFetcher5, useLoaderData as useLoaderData8 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput7 } from "remix-utils/csrf/react";
import { z as z18 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV38 } from "react/jsx-dev-runtime";
var handle6 = {
  getSitemapEntries: () => null
}, ProfileFormSchema = z18.object({
  name: NameSchema.optional(),
  username: UsernameSchema
});
async function loader23({ request }) {
  let userId = await requireUserId(request), user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: !0,
      name: !0,
      username: !0,
      email: !0,
      image: {
        select: { id: !0 }
      },
      _count: {
        select: {
          sessions: {
            where: {
              expirationDate: { gt: /* @__PURE__ */ new Date() }
            }
          }
        }
      }
    }
  }), twoFactorVerification = await prisma.verification.findUnique({
    select: { id: !0 },
    where: { target_type: { type: twoFAVerificationType, target: userId } }
  }), password = await prisma.password.findUnique({
    select: { userId: !0 },
    where: { userId }
  });
  return json18({
    user,
    hasPassword: Boolean(password),
    isTwoFactorEnabled: Boolean(twoFactorVerification)
  });
}
var profileUpdateActionIntent = "update-profile", signOutOfSessionsActionIntent = "sign-out-of-sessions", deleteDataActionIntent = "delete-data";
async function action15({ request }) {
  let userId = await requireUserId(request), formData = await request.formData();
  await validateCSRF(formData, request.headers);
  let intent = formData.get("intent");
  switch (intent) {
    case profileUpdateActionIntent:
      return profileUpdateAction({ request, userId, formData });
    case signOutOfSessionsActionIntent:
      return signOutOfSessionsAction({ request, userId, formData });
    case deleteDataActionIntent:
      return deleteDataAction({ request, userId, formData });
    default:
      throw new Response(`Invalid intent "${intent}"`, { status: 400 });
  }
}
function EditUserProfile2() {
  let data = useLoaderData8();
  return /* @__PURE__ */ jsxDEV38("div", { className: "flex flex-col gap-12", children: [
    /* @__PURE__ */ jsxDEV38("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDEV38("div", { className: "relative h-52 w-52", children: [
      /* @__PURE__ */ jsxDEV38(
        "img",
        {
          src: getUserImgSrc(data.user.image?.id),
          alt: data.user.username,
          className: "h-full w-full rounded-full object-cover"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 112,
          columnNumber: 6
        },
        this
      ),
      /* @__PURE__ */ jsxDEV38(
        Button,
        {
          asChild: !0,
          variant: "outline",
          className: "absolute -right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full p-0",
          children: /* @__PURE__ */ jsxDEV38(
            Link10,
            {
              preventScrollReset: !0,
              to: "photo",
              title: "Change profile photo",
              "aria-label": "Change profile photo",
              children: /* @__PURE__ */ jsxDEV38(Icon, { name: "camera", className: "h-4 w-4" }, void 0, !1, {
                fileName: "app/routes/settings+/profile.index.tsx",
                lineNumber: 128,
                columnNumber: 8
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.index.tsx",
              lineNumber: 122,
              columnNumber: 7
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 117,
          columnNumber: 6
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 111,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 110,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38(UpdateProfile, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 133,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38("div", { className: "col-span-6 my-6 h-1 border-b-[1.5px] border-foreground" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 135,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38("div", { className: "col-span-full flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(Link10, { to: "change-email", children: /* @__PURE__ */ jsxDEV38(Icon, { name: "envelope-closed", children: [
        "Change email from ",
        data.user.email
      ] }, void 0, !0, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 139,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 138,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 137,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(Link10, { to: "two-factor", children: data.isTwoFactorEnabled ? /* @__PURE__ */ jsxDEV38(Icon, { name: "lock-closed", children: "2FA is enabled" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 147,
        columnNumber: 8
      }, this) : /* @__PURE__ */ jsxDEV38(Icon, { name: "lock-open-1", children: "Enable 2FA" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 149,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 145,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 144,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(Link10, { to: data.hasPassword ? "password" : "password/create", children: /* @__PURE__ */ jsxDEV38(Icon, { name: "dots-horizontal", children: data.hasPassword ? "Change Password" : "Create a Password" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 155,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 154,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 153,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(Link10, { to: "connections", children: /* @__PURE__ */ jsxDEV38(Icon, { name: "link-2", children: "Manage connections" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 162,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 161,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 160,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(
        Link10,
        {
          reloadDocument: !0,
          download: "my-epic-notes-data.json",
          to: "/resources/download-user-data",
          children: /* @__PURE__ */ jsxDEV38(Icon, { name: "download", children: "Download your data" }, void 0, !1, {
            fileName: "app/routes/settings+/profile.index.tsx",
            lineNumber: 171,
            columnNumber: 7
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 166,
          columnNumber: 6
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 165,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38(SignOutOfSessions, {}, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 174,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV38(DeleteData, {}, void 0, !1, {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 175,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 136,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 109,
    columnNumber: 3
  }, this);
}
async function profileUpdateAction({ userId, formData }) {
  let submission = await parse12(formData, {
    async: !0,
    schema: ProfileFormSchema.superRefine(async ({ username }, ctx) => {
      let existingUsername = await prisma.user.findUnique({
        where: { username },
        select: { id: !0 }
      });
      existingUsername && existingUsername.id !== userId && ctx.addIssue({
        path: ["username"],
        code: z18.ZodIssueCode.custom,
        message: "A user already exists with this username"
      });
    })
  });
  if (submission.intent !== "submit")
    return json18({ status: "idle", submission });
  if (!submission.value)
    return json18({ status: "error", submission }, { status: 400 });
  let data = submission.value;
  return await prisma.user.update({
    select: { username: !0 },
    where: { id: userId },
    data: {
      name: data.name,
      username: data.username
    }
  }), json18({ status: "success", submission });
}
function UpdateProfile() {
  let data = useLoaderData8(), fetcher = useFetcher5(), [form, fields] = useForm10({
    id: "edit-profile",
    constraint: getFieldsetConstraint9(ProfileFormSchema),
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse12(formData, { schema: ProfileFormSchema });
    },
    defaultValue: {
      username: data.user.username,
      name: data.user.name ?? "",
      email: data.user.email
    }
  });
  return /* @__PURE__ */ jsxDEV38(fetcher.Form, { method: "POST", ...form.props, children: [
    /* @__PURE__ */ jsxDEV38(AuthenticityTokenInput7, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 240,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38("div", { className: "grid grid-cols-6 gap-x-10", children: [
      /* @__PURE__ */ jsxDEV38(
        Field,
        {
          className: "col-span-3",
          labelProps: {
            htmlFor: fields.username.id,
            children: "Username"
          },
          inputProps: conform9.input(fields.username),
          errors: fields.username.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 242,
          columnNumber: 5
        },
        this
      ),
      /* @__PURE__ */ jsxDEV38(
        Field,
        {
          className: "col-span-3",
          labelProps: { htmlFor: fields.name.id, children: "Name" },
          inputProps: conform9.input(fields.name),
          errors: fields.name.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 251,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 241,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 259,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV38("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxDEV38(
      StatusButton,
      {
        type: "submit",
        size: "wide",
        name: "intent",
        value: profileUpdateActionIntent,
        status: fetcher.state !== "idle" ? "pending" : fetcher.data?.status ?? "idle",
        children: "Save changes"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 262,
        columnNumber: 5
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 261,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 239,
    columnNumber: 3
  }, this);
}
async function signOutOfSessionsAction({ request, userId }) {
  let sessionId = (await authSessionStorage.getSession(
    request.headers.get("cookie")
  )).get(sessionKey);
  return invariantResponse(
    sessionId,
    "You must be authenticated to sign out of other sessions"
  ), await prisma.session.deleteMany({
    where: {
      userId,
      id: { not: sessionId }
    }
  }), json18({ status: "success" });
}
function SignOutOfSessions() {
  let data = useLoaderData8(), dc = useDoubleCheck(), fetcher = useFetcher5(), otherSessionsCount = data.user._count.sessions - 1;
  return /* @__PURE__ */ jsxDEV38("div", { children: otherSessionsCount ? /* @__PURE__ */ jsxDEV38(fetcher.Form, { method: "POST", children: [
    /* @__PURE__ */ jsxDEV38(AuthenticityTokenInput7, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 308,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ jsxDEV38(
      StatusButton,
      {
        ...dc.getButtonProps({
          type: "submit",
          name: "intent",
          value: signOutOfSessionsActionIntent
        }),
        variant: dc.doubleCheck ? "destructive" : "default",
        status: fetcher.state !== "idle" ? "pending" : fetcher.data?.status ?? "idle",
        children: /* @__PURE__ */ jsxDEV38(Icon, { name: "avatar", children: dc.doubleCheck ? "Are you sure?" : `Sign out of ${otherSessionsCount} other sessions` }, void 0, !1, {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 322,
          columnNumber: 7
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 309,
        columnNumber: 6
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 307,
    columnNumber: 5
  }, this) : /* @__PURE__ */ jsxDEV38(Icon, { name: "avatar", children: "This is your only session" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 330,
    columnNumber: 5
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 305,
    columnNumber: 3
  }, this);
}
async function deleteDataAction({ userId }) {
  return await prisma.user.delete({ where: { id: userId } }), redirectWithToast("/", {
    type: "success",
    title: "Data Deleted",
    description: "All of your data has been deleted"
  });
}
function DeleteData() {
  let dc = useDoubleCheck(), fetcher = useFetcher5();
  return /* @__PURE__ */ jsxDEV38("div", { children: /* @__PURE__ */ jsxDEV38(fetcher.Form, { method: "POST", children: [
    /* @__PURE__ */ jsxDEV38(AuthenticityTokenInput7, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.index.tsx",
      lineNumber: 352,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV38(
      StatusButton,
      {
        ...dc.getButtonProps({
          type: "submit",
          name: "intent",
          value: deleteDataActionIntent
        }),
        variant: dc.doubleCheck ? "destructive" : "default",
        status: fetcher.state !== "idle" ? "pending" : "idle",
        children: /* @__PURE__ */ jsxDEV38(Icon, { name: "trash", children: dc.doubleCheck ? "Are you sure?" : "Delete all your data" }, void 0, !1, {
          fileName: "app/routes/settings+/profile.index.tsx",
          lineNumber: 362,
          columnNumber: 6
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.index.tsx",
        lineNumber: 353,
        columnNumber: 5
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 351,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.index.tsx",
    lineNumber: 350,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.password.tsx
var profile_password_exports = {};
__export(profile_password_exports, {
  action: () => action16,
  default: () => ChangePasswordRoute,
  handle: () => handle7,
  loader: () => loader24
});
import { conform as conform10, useForm as useForm11 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint10, parse as parse13 } from "@conform-to/zod";
import { json as json19, redirect as redirect17 } from "@remix-run/node";
import { Form as Form12, Link as Link11, useActionData as useActionData8 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput8 } from "remix-utils/csrf/react";
import { z as z19 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV39 } from "react/jsx-dev-runtime";
var handle7 = {
  breadcrumb: /* @__PURE__ */ jsxDEV39(Icon, { name: "dots-horizontal", children: "Password" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.password.tsx",
    lineNumber: 25,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, ChangePasswordForm = z19.object({
  currentPassword: PasswordSchema,
  newPassword: PasswordSchema,
  confirmNewPassword: PasswordSchema
}).superRefine(({ confirmNewPassword, newPassword }, ctx) => {
  confirmNewPassword !== newPassword && ctx.addIssue({
    path: ["confirmNewPassword"],
    code: z19.ZodIssueCode.custom,
    message: "The passwords must match"
  });
});
async function requirePassword(userId) {
  if (!await prisma.password.findUnique({
    select: { userId: !0 },
    where: { userId }
  }))
    throw redirect17("/settings/profile/password/create");
}
async function loader24({ request }) {
  let userId = await requireUserId(request);
  return await requirePassword(userId), json19({});
}
async function action16({ request }) {
  let userId = await requireUserId(request);
  await requirePassword(userId);
  let formData = await request.formData();
  await validateCSRF(formData, request.headers);
  let submission = await parse13(formData, {
    async: !0,
    schema: ChangePasswordForm.superRefine(
      async ({ currentPassword, newPassword: newPassword2 }, ctx) => {
        currentPassword && newPassword2 && (await verifyUserPassword({ id: userId }, currentPassword) || ctx.addIssue({
          path: ["currentPassword"],
          code: z19.ZodIssueCode.custom,
          message: "Incorrect password."
        }));
      }
    )
  });
  if (submission.payload = {}, submission.intent !== "submit")
    return submission.value = void 0, json19({ status: "idle", submission });
  if (!submission.value)
    return json19({ status: "error", submission }, { status: 400 });
  let { newPassword } = submission.value;
  return await prisma.user.update({
    select: { username: !0 },
    where: { id: userId },
    data: {
      password: {
        update: {
          hash: await getPasswordHash(newPassword)
        }
      }
    }
  }), redirectWithToast(
    "/settings/profile",
    {
      type: "success",
      title: "Password Changed",
      description: "Your password has been changed."
    },
    { status: 302 }
  );
}
function ChangePasswordRoute() {
  let actionData = useActionData8(), isPending = useIsPending(), [form, fields] = useForm11({
    id: "password-change-form",
    constraint: getFieldsetConstraint10(ChangePasswordForm),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse13(formData, { schema: ChangePasswordForm });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV39(Form12, { method: "POST", ...form.props, className: "mx-auto max-w-md", children: [
    /* @__PURE__ */ jsxDEV39(AuthenticityTokenInput8, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.password.tsx",
      lineNumber: 135,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV39(
      Field,
      {
        labelProps: { children: "Current Password" },
        inputProps: conform10.input(fields.currentPassword, { type: "password" }),
        errors: fields.currentPassword.errors
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.password.tsx",
        lineNumber: 136,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV39(
      Field,
      {
        labelProps: { children: "New Password" },
        inputProps: conform10.input(fields.newPassword, { type: "password" }),
        errors: fields.newPassword.errors
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.password.tsx",
        lineNumber: 141,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV39(
      Field,
      {
        labelProps: { children: "Confirm New Password" },
        inputProps: conform10.input(fields.confirmNewPassword, {
          type: "password"
        }),
        errors: fields.confirmNewPassword.errors
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.password.tsx",
        lineNumber: 146,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV39(ErrorList, { id: form.errorId, errors: form.errors }, void 0, !1, {
      fileName: "app/routes/settings+/profile.password.tsx",
      lineNumber: 153,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV39("div", { className: "grid w-full grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDEV39(Button, { variant: "secondary", asChild: !0, children: /* @__PURE__ */ jsxDEV39(Link11, { to: "..", children: "Cancel" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.password.tsx",
        lineNumber: 156,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.password.tsx",
        lineNumber: 155,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV39(
        StatusButton,
        {
          type: "submit",
          status: isPending ? "pending" : actionData?.status ?? "idle",
          children: "Change Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.password.tsx",
          lineNumber: 158,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.password.tsx",
      lineNumber: 154,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.password.tsx",
    lineNumber: 134,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.password_.create.tsx
var profile_password_create_exports = {};
__export(profile_password_create_exports, {
  action: () => action17,
  default: () => CreatePasswordRoute,
  handle: () => handle8,
  loader: () => loader25
});
import { conform as conform11, useForm as useForm12 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint11, parse as parse14 } from "@conform-to/zod";
import { json as json20, redirect as redirect18 } from "@remix-run/node";
import { Form as Form13, Link as Link12, useActionData as useActionData9 } from "@remix-run/react";
init_db_server();
import { jsxDEV as jsxDEV40 } from "react/jsx-dev-runtime";
var handle8 = {
  breadcrumb: /* @__PURE__ */ jsxDEV40(Icon, { name: "dots-horizontal", children: "Password" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.password_.create.tsx",
    lineNumber: 17,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, CreatePasswordForm = PasswordAndConfirmPasswordSchema;
async function requireNoPassword(userId) {
  if (await prisma.password.findUnique({
    select: { userId: !0 },
    where: { userId }
  }))
    throw redirect18("/settings/profile/password");
}
async function loader25({ request }) {
  let userId = await requireUserId(request);
  return await requireNoPassword(userId), json20({});
}
async function action17({ request }) {
  let userId = await requireUserId(request);
  await requireNoPassword(userId);
  let formData = await request.formData(), submission = await parse14(formData, {
    async: !0,
    schema: CreatePasswordForm
  });
  if (submission.payload = {}, submission.intent !== "submit")
    return submission.value = void 0, json20({ status: "idle", submission });
  if (!submission.value)
    return json20({ status: "error", submission }, { status: 400 });
  let { password } = submission.value;
  return await prisma.user.update({
    select: { username: !0 },
    where: { id: userId },
    data: {
      password: {
        create: {
          hash: await getPasswordHash(password)
        }
      }
    }
  }), redirect18("/settings/profile", { status: 302 });
}
function CreatePasswordRoute() {
  let actionData = useActionData9(), isPending = useIsPending(), [form, fields] = useForm12({
    id: "password-create-form",
    constraint: getFieldsetConstraint11(CreatePasswordForm),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse14(formData, { schema: CreatePasswordForm });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV40(Form13, { method: "POST", ...form.props, className: "mx-auto max-w-md", children: [
    /* @__PURE__ */ jsxDEV40(
      Field,
      {
        labelProps: { children: "New Password" },
        inputProps: conform11.input(fields.password, { type: "password" }),
        errors: fields.password.errors
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 91,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV40(
      Field,
      {
        labelProps: { children: "Confirm New Password" },
        inputProps: conform11.input(fields.confirmPassword, {
          type: "password"
        }),
        errors: fields.confirmPassword.errors
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 96,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV40(ErrorList, { id: form.errorId, errors: form.errors }, void 0, !1, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 103,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV40("div", { className: "grid w-full grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDEV40(Button, { variant: "secondary", asChild: !0, children: /* @__PURE__ */ jsxDEV40(Link12, { to: "..", children: "Cancel" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 106,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.password_.create.tsx",
        lineNumber: 105,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV40(
        StatusButton,
        {
          type: "submit",
          status: isPending ? "pending" : actionData?.status ?? "idle",
          children: "Create Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.password_.create.tsx",
          lineNumber: 108,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.password_.create.tsx",
      lineNumber: 104,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.password_.create.tsx",
    lineNumber: 90,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.photo.tsx
var profile_photo_exports = {};
__export(profile_photo_exports, {
  action: () => action18,
  default: () => PhotoRoute,
  handle: () => handle9,
  loader: () => loader26
});
import { conform as conform12, useForm as useForm13 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint12, parse as parse15 } from "@conform-to/zod";
import {
  json as json21,
  redirect as redirect19,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData
} from "@remix-run/node";
import {
  Form as Form14,
  useActionData as useActionData10,
  useLoaderData as useLoaderData9,
  useNavigation as useNavigation3
} from "@remix-run/react";
import { useState as useState4 } from "react";
import { AuthenticityTokenInput as AuthenticityTokenInput9 } from "remix-utils/csrf/react";
import { z as z20 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV41 } from "react/jsx-dev-runtime";
var handle9 = {
  breadcrumb: /* @__PURE__ */ jsxDEV41(Icon, { name: "avatar", children: "Photo" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.photo.tsx",
    lineNumber: 36,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, MAX_SIZE = 1024 * 1024 * 3, DeleteImageSchema = z20.object({
  intent: z20.literal("delete")
}), NewImageSchema = z20.object({
  intent: z20.literal("submit"),
  photoFile: z20.instanceof(File).refine((file) => file.size > 0, "Image is required").refine((file) => file.size <= MAX_SIZE, "Image size must be less than 3MB")
}), PhotoFormSchema = z20.union([DeleteImageSchema, NewImageSchema]);
async function loader26({ request }) {
  let userId = await requireUserId(request), user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: !0,
      name: !0,
      username: !0,
      image: { select: { id: !0 } }
    }
  });
  return invariantResponse(user, "User not found", { status: 404 }), json21({ user });
}
async function action18({ request }) {
  let userId = await requireUserId(request), formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler({ maxPartSize: MAX_SIZE })
  );
  await validateCSRF(formData, request.headers);
  let submission = await parse15(formData, {
    schema: PhotoFormSchema.transform(async (data) => data.intent === "delete" ? { intent: "delete" } : data.photoFile.size <= 0 ? z20.NEVER : {
      intent: data.intent,
      image: {
        contentType: data.photoFile.type,
        blob: Buffer.from(await data.photoFile.arrayBuffer())
      }
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json21({ status: "idle", submission });
  if (!submission.value)
    return json21({ status: "error", submission }, { status: 400 });
  let { image, intent } = submission.value;
  return intent === "delete" ? (await prisma.userImage.deleteMany({ where: { userId } }), redirect19("/settings/profile")) : (await prisma.$transaction(async ($prisma) => {
    await $prisma.userImage.deleteMany({ where: { userId } }), await $prisma.user.update({
      where: { id: userId },
      data: { image: { create: image } }
    });
  }), redirect19("/settings/profile"));
}
function PhotoRoute() {
  let data = useLoaderData9(), doubleCheckDeleteImage = useDoubleCheck(), actionData = useActionData10(), navigation = useNavigation3(), [form, fields] = useForm13({
    id: "profile-photo",
    constraint: getFieldsetConstraint12(PhotoFormSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return formData.get("intent") === "delete" ? parse15(formData, { schema: DeleteImageSchema }) : parse15(formData, { schema: NewImageSchema });
    },
    shouldRevalidate: "onBlur"
  }), pendingIntent = useIsPending() ? navigation.formData?.get("intent") : null, lastSubmissionIntent = actionData?.submission.value?.intent, [newImageSrc, setNewImageSrc] = useState4(null);
  return /* @__PURE__ */ jsxDEV41("div", { children: /* @__PURE__ */ jsxDEV41(
    Form14,
    {
      method: "POST",
      encType: "multipart/form-data",
      className: "flex flex-col items-center justify-center gap-10",
      onReset: () => setNewImageSrc(null),
      ...form.props,
      children: [
        /* @__PURE__ */ jsxDEV41(AuthenticityTokenInput9, {}, void 0, !1, {
          fileName: "app/routes/settings+/profile.photo.tsx",
          lineNumber: 157,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ jsxDEV41(
          "img",
          {
            src: newImageSrc ?? (data.user ? getUserImgSrc(data.user.image?.id) : ""),
            className: "h-52 w-52 rounded-full object-cover",
            alt: data.user?.name ?? data.user?.username
          },
          void 0,
          !1,
          {
            fileName: "app/routes/settings+/profile.photo.tsx",
            lineNumber: 158,
            columnNumber: 5
          },
          this
        ),
        /* @__PURE__ */ jsxDEV41(ErrorList, { errors: fields.photoFile.errors, id: fields.photoFile.id }, void 0, !1, {
          fileName: "app/routes/settings+/profile.photo.tsx",
          lineNumber: 165,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ jsxDEV41("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsxDEV41(
            "input",
            {
              ...conform12.input(fields.photoFile, { type: "file" }),
              accept: "image/*",
              className: "peer sr-only",
              required: !0,
              tabIndex: newImageSrc ? -1 : 0,
              onChange: (e) => {
                let file = e.currentTarget.files?.[0];
                if (file) {
                  let reader = new FileReader();
                  reader.onload = (event) => {
                    setNewImageSrc(event.target?.result?.toString() ?? null);
                  }, reader.readAsDataURL(file);
                }
              }
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.photo.tsx",
              lineNumber: 173,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV41(
            Button,
            {
              asChild: !0,
              className: "cursor-pointer peer-valid:hidden peer-focus-within:ring-4 peer-focus-visible:ring-4",
              children: /* @__PURE__ */ jsxDEV41("label", { htmlFor: fields.photoFile.id, children: /* @__PURE__ */ jsxDEV41(Icon, { name: "pencil-1", children: "Change" }, void 0, !1, {
                fileName: "app/routes/settings+/profile.photo.tsx",
                lineNumber: 195,
                columnNumber: 8
              }, this) }, void 0, !1, {
                fileName: "app/routes/settings+/profile.photo.tsx",
                lineNumber: 194,
                columnNumber: 7
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.photo.tsx",
              lineNumber: 190,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV41(
            StatusButton,
            {
              name: "intent",
              value: "submit",
              type: "submit",
              className: "peer-invalid:hidden",
              status: pendingIntent === "submit" ? "pending" : lastSubmissionIntent === "submit" ? actionData?.status ?? "idle" : "idle",
              children: "Save Photo"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.photo.tsx",
              lineNumber: 198,
              columnNumber: 6
            },
            this
          ),
          /* @__PURE__ */ jsxDEV41(
            Button,
            {
              type: "reset",
              variant: "destructive",
              className: "peer-invalid:hidden",
              children: /* @__PURE__ */ jsxDEV41(Icon, { name: "trash", children: "Reset" }, void 0, !1, {
                fileName: "app/routes/settings+/profile.photo.tsx",
                lineNumber: 218,
                columnNumber: 7
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.photo.tsx",
              lineNumber: 213,
              columnNumber: 6
            },
            this
          ),
          data.user.image?.id ? /* @__PURE__ */ jsxDEV41(
            StatusButton,
            {
              className: "peer-valid:hidden",
              variant: "destructive",
              ...doubleCheckDeleteImage.getButtonProps({
                type: "submit",
                name: "intent",
                value: "delete"
              }),
              status: pendingIntent === "delete" ? "pending" : lastSubmissionIntent === "delete" ? actionData?.status ?? "idle" : "idle",
              children: /* @__PURE__ */ jsxDEV41(Icon, { name: "trash", children: doubleCheckDeleteImage.doubleCheck ? "Are you sure?" : "Delete" }, void 0, !1, {
                fileName: "app/routes/settings+/profile.photo.tsx",
                lineNumber: 237,
                columnNumber: 8
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/settings+/profile.photo.tsx",
              lineNumber: 221,
              columnNumber: 7
            },
            this
          ) : null
        ] }, void 0, !0, {
          fileName: "app/routes/settings+/profile.photo.tsx",
          lineNumber: 166,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ jsxDEV41(ErrorList, { errors: form.errors }, void 0, !1, {
          fileName: "app/routes/settings+/profile.photo.tsx",
          lineNumber: 245,
          columnNumber: 5
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/settings+/profile.photo.tsx",
      lineNumber: 150,
      columnNumber: 4
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.photo.tsx",
    lineNumber: 149,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.two-factor.disable.tsx
var profile_two_factor_disable_exports = {};
__export(profile_two_factor_disable_exports, {
  action: () => action19,
  default: () => TwoFactorDisableRoute,
  handle: () => handle10,
  loader: () => loader27
});
import { json as json22 } from "@remix-run/node";
import { useFetcher as useFetcher6 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput10 } from "remix-utils/csrf/react";
init_db_server();
import { jsxDEV as jsxDEV42 } from "react/jsx-dev-runtime";
var handle10 = {
  breadcrumb: /* @__PURE__ */ jsxDEV42(Icon, { name: "lock-open-1", children: "Disable" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 17,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
};
async function loader27({ request }) {
  return await requireRecentVerification(request), json22({});
}
async function action19({ request }) {
  await requireRecentVerification(request), await validateCSRF(await request.formData(), request.headers);
  let userId = await requireUserId(request);
  return await prisma.verification.delete({
    where: { target_type: { target: userId, type: twoFAVerificationType } }
  }), redirectWithToast("/settings/profile/two-factor", {
    title: "2FA Disabled",
    description: "Two factor authentication has been disabled."
  });
}
function TwoFactorDisableRoute() {
  let disable2FAFetcher = useFetcher6(), dc = useDoubleCheck();
  return /* @__PURE__ */ jsxDEV42("div", { className: "mx-auto max-w-sm", children: /* @__PURE__ */ jsxDEV42(disable2FAFetcher.Form, { method: "POST", children: [
    /* @__PURE__ */ jsxDEV42(AuthenticityTokenInput10, {}, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
      lineNumber: 46,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV42("p", { children: "Disabling two factor authentication is not recommended. However, if you would like to do so, click here:" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
      lineNumber: 47,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV42(
      StatusButton,
      {
        variant: "destructive",
        status: disable2FAFetcher.state === "loading" ? "pending" : "idle",
        ...dc.getButtonProps({
          className: "mx-auto",
          name: "intent",
          value: "disable",
          type: "submit"
        }),
        children: dc.doubleCheck ? "Are you sure?" : "Disable 2FA"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
        lineNumber: 51,
        columnNumber: 5
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 45,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.disable.tsx",
    lineNumber: 44,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.two-factor.index.tsx
var profile_two_factor_index_exports = {};
__export(profile_two_factor_index_exports, {
  action: () => action21,
  default: () => TwoFactorRoute3,
  handle: () => handle12,
  loader: () => loader29
});
import { json as json24, redirect as redirect21 } from "@remix-run/node";
import { Link as Link13, useFetcher as useFetcher7, useLoaderData as useLoaderData11 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput12 } from "remix-utils/csrf/react";
init_db_server();

// app/routes/settings+/profile.two-factor.verify.tsx
var profile_two_factor_verify_exports = {};
__export(profile_two_factor_verify_exports, {
  action: () => action20,
  default: () => TwoFactorRoute2,
  handle: () => handle11,
  loader: () => loader28,
  twoFAVerifyVerificationType: () => twoFAVerifyVerificationType
});
import { conform as conform13, useForm as useForm14 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint13, parse as parse16 } from "@conform-to/zod";
import { json as json23, redirect as redirect20 } from "@remix-run/node";
import {
  Form as Form15,
  useActionData as useActionData11,
  useLoaderData as useLoaderData10,
  useNavigation as useNavigation4
} from "@remix-run/react";
import * as QRCode from "qrcode";
import { AuthenticityTokenInput as AuthenticityTokenInput11 } from "remix-utils/csrf/react";
import { z as z21 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV43 } from "react/jsx-dev-runtime";
var handle11 = {
  breadcrumb: /* @__PURE__ */ jsxDEV43(Icon, { name: "check", children: "Verify" }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
    lineNumber: 28,
    columnNumber: 14
  }, this),
  getSitemapEntries: () => null
}, CancelSchema = z21.object({ intent: z21.literal("cancel") }), VerifySchema2 = z21.object({
  intent: z21.literal("verify"),
  code: z21.string().min(6).max(6)
}), ActionSchema = z21.union([CancelSchema, VerifySchema2]), twoFAVerifyVerificationType = "2fa-verify";
async function loader28({ request }) {
  let userId = await requireUserId(request), verification = await prisma.verification.findUnique({
    where: {
      target_type: { type: twoFAVerifyVerificationType, target: userId }
    },
    select: {
      id: !0,
      algorithm: !0,
      secret: !0,
      period: !0,
      digits: !0
    }
  });
  if (!verification)
    return redirect20("/settings/profile/two-factor");
  let user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { email: !0 }
  }), issuer = new URL(getDomainUrl(request)).host, otpUri = (0, totp_server_exports.getTOTPAuthUri)({
    ...verification,
    accountName: user.email,
    issuer
  }), qrCode = await QRCode.toDataURL(otpUri);
  return json23({ otpUri, qrCode });
}
async function action20({ request }) {
  let userId = await requireUserId(request), formData = await request.formData();
  await validateCSRF(formData, request.headers);
  let submission = await parse16(formData, {
    schema: () => ActionSchema.superRefine(async (data, ctx) => {
      if (data.intent === "cancel")
        return null;
      if (!await isCodeValid({
        code: data.code,
        type: twoFAVerifyVerificationType,
        target: userId
      }))
        return ctx.addIssue({
          path: ["code"],
          code: z21.ZodIssueCode.custom,
          message: "Invalid code"
        }), z21.NEVER;
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json23({ status: "idle", submission });
  if (!submission.value)
    return json23({ status: "error", submission }, { status: 400 });
  switch (submission.value.intent) {
    case "cancel":
      return await prisma.verification.deleteMany({
        where: { type: twoFAVerifyVerificationType, target: userId }
      }), redirect20("/settings/profile/two-factor");
    case "verify":
      return await prisma.verification.update({
        where: {
          target_type: { type: twoFAVerifyVerificationType, target: userId }
        },
        data: { type: twoFAVerificationType }
      }), redirectWithToast("/settings/profile/two-factor", {
        type: "success",
        title: "Enabled",
        description: "Two-factor authentication has been enabled."
      });
  }
}
function TwoFactorRoute2() {
  let data = useLoaderData10(), actionData = useActionData11(), navigation = useNavigation4(), isPending = useIsPending(), pendingIntent = isPending ? navigation.formData?.get("intent") : null, lastSubmissionIntent = actionData?.submission.value?.intent, [form, fields] = useForm14({
    id: "verify-form",
    constraint: getFieldsetConstraint13(ActionSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return formData.get("intent") === "cancel" ? parse16(formData, { schema: CancelSchema }) : parse16(formData, { schema: VerifySchema2 });
    }
  });
  return /* @__PURE__ */ jsxDEV43("div", { children: /* @__PURE__ */ jsxDEV43("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxDEV43("img", { alt: "qr code", src: data.qrCode, className: "h-56 w-56" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 155,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV43("p", { children: "Scan this QR code with your authenticator app." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 156,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV43("p", { className: "text-sm", children: "If you cannot scan the QR code, you can manually add this account to your authenticator app using this code:" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 157,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV43("div", { className: "p-3", children: /* @__PURE__ */ jsxDEV43(
      "pre",
      {
        className: "whitespace-pre-wrap break-all text-sm",
        "aria-label": "One-time Password URI",
        children: data.otpUri
      },
      void 0,
      !1,
      {
        fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
        lineNumber: 162,
        columnNumber: 6
      },
      this
    ) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 161,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV43("p", { className: "text-sm", children: "Once you've added the account, enter the code from your authenticator app below. Once you enable 2FA, you will need to enter a code from your authenticator app every time you log in or perform important actions. Do not lose access to your authenticator app, or you will lose access to your account." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 169,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV43("div", { className: "flex w-full max-w-xs flex-col justify-center gap-4", children: /* @__PURE__ */ jsxDEV43(Form15, { method: "POST", ...form.props, className: "flex-1", children: [
      /* @__PURE__ */ jsxDEV43(AuthenticityTokenInput11, {}, void 0, !1, {
        fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
        lineNumber: 178,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV43(
        Field,
        {
          labelProps: {
            htmlFor: fields.code.id,
            children: "Code"
          },
          inputProps: { ...conform13.input(fields.code), autoFocus: !0 },
          errors: fields.code.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
          lineNumber: 179,
          columnNumber: 7
        },
        this
      ),
      /* @__PURE__ */ jsxDEV43("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: /* @__PURE__ */ jsxDEV43(ErrorList, { id: form.errorId, errors: form.errors }, void 0, !1, {
        fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
        lineNumber: 189,
        columnNumber: 8
      }, this) }, void 0, !1, {
        fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
        lineNumber: 188,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV43("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV43(
          StatusButton,
          {
            className: "w-full",
            status: pendingIntent === "verify" ? "pending" : lastSubmissionIntent === "verify" ? actionData?.status ?? "idle" : "idle",
            type: "submit",
            name: "intent",
            value: "verify",
            children: "Submit"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
            lineNumber: 193,
            columnNumber: 8
          },
          this
        ),
        /* @__PURE__ */ jsxDEV43(
          StatusButton,
          {
            className: "w-full",
            variant: "secondary",
            status: pendingIntent === "cancel" ? "pending" : lastSubmissionIntent === "cancel" ? actionData?.status ?? "idle" : "idle",
            type: "submit",
            name: "intent",
            value: "cancel",
            disabled: isPending,
            children: "Cancel"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
            lineNumber: 208,
            columnNumber: 8
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
        lineNumber: 192,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 177,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
      lineNumber: 176,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
    lineNumber: 154,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.verify.tsx",
    lineNumber: 153,
    columnNumber: 3
  }, this);
}

// app/routes/settings+/profile.two-factor.index.tsx
import { Fragment as Fragment3, jsxDEV as jsxDEV44 } from "react/jsx-dev-runtime";
var handle12 = {
  getSitemapEntries: () => null
};
async function loader29({ request }) {
  let userId = await requireUserId(request), verification = await prisma.verification.findUnique({
    where: { target_type: { type: twoFAVerificationType, target: userId } },
    select: { id: !0 }
  });
  return json24({ is2FAEnabled: Boolean(verification) });
}
async function action21({ request }) {
  let userId = await requireUserId(request);
  await validateCSRF(await request.formData(), request.headers);
  let { otp: _otp, ...config } = (0, totp_server_exports.generateTOTP)(), verificationData = {
    ...config,
    type: twoFAVerifyVerificationType,
    target: userId
  };
  return await prisma.verification.upsert({
    where: {
      target_type: { target: userId, type: twoFAVerifyVerificationType }
    },
    create: verificationData,
    update: verificationData
  }), redirect21("/settings/profile/two-factor/verify");
}
function TwoFactorRoute3() {
  let data = useLoaderData11(), enable2FAFetcher = useFetcher7();
  return /* @__PURE__ */ jsxDEV44("div", { className: "flex flex-col gap-4", children: data.is2FAEnabled ? /* @__PURE__ */ jsxDEV44(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV44("p", { className: "text-lg", children: /* @__PURE__ */ jsxDEV44(Icon, { name: "check", children: "You have enabled two-factor authentication." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 54,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ jsxDEV44(Link13, { to: "disable", children: /* @__PURE__ */ jsxDEV44(Icon, { name: "lock-open-1", children: "Disable 2FA" }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 59,
      columnNumber: 6
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.two-factor.index.tsx",
    lineNumber: 53,
    columnNumber: 5
  }, this) : /* @__PURE__ */ jsxDEV44(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV44("p", { children: /* @__PURE__ */ jsxDEV44(Icon, { name: "lock-open-1", children: "You have not enabled two-factor authentication yet." }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this) }, void 0, !1, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 65,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ jsxDEV44("p", { className: "text-sm", children: [
      "Two factor authentication adds an extra layer of security to your account. You will need to enter a code from an authenticator app like",
      " ",
      /* @__PURE__ */ jsxDEV44("a", { className: "underline", href: "https://1password.com/", children: "1Password" }, void 0, !1, {
        fileName: "app/routes/settings+/profile.two-factor.index.tsx",
        lineNumber: 74,
        columnNumber: 7
      }, this),
      " ",
      "to log in."
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 70,
      columnNumber: 6
    }, this),
    /* @__PURE__ */ jsxDEV44(enable2FAFetcher.Form, { method: "POST", children: [
      /* @__PURE__ */ jsxDEV44(AuthenticityTokenInput12, {}, void 0, !1, {
        fileName: "app/routes/settings+/profile.two-factor.index.tsx",
        lineNumber: 80,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV44(
        StatusButton,
        {
          type: "submit",
          name: "intent",
          value: "enable",
          status: enable2FAFetcher.state === "loading" ? "pending" : "idle",
          className: "mx-auto",
          children: "Enable 2FA"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/settings+/profile.two-factor.index.tsx",
          lineNumber: 81,
          columnNumber: 7
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/settings+/profile.two-factor.index.tsx",
      lineNumber: 79,
      columnNumber: 6
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/settings+/profile.two-factor.index.tsx",
    lineNumber: 64,
    columnNumber: 5
  }, this) }, void 0, !1, {
    fileName: "app/routes/settings+/profile.two-factor.index.tsx",
    lineNumber: 51,
    columnNumber: 3
  }, this);
}

// app/routes/users+/$username.tsx
var username_exports = {};
__export(username_exports, {
  ErrorBoundary: () => ErrorBoundary9,
  default: () => ProfileRoute,
  loader: () => loader30,
  meta: () => meta9
});
import { json as json25 } from "@remix-run/node";
import { Form as Form16, Link as Link14, useLoaderData as useLoaderData12 } from "@remix-run/react";
init_db_server();
import { Fragment as Fragment4, jsxDEV as jsxDEV45 } from "react/jsx-dev-runtime";
async function loader30({ params }) {
  let user = await prisma.user.findFirst({
    select: {
      id: !0,
      name: !0,
      username: !0,
      createdAt: !0,
      image: { select: { id: !0 } }
    },
    where: {
      username: params.username
    }
  });
  return invariantResponse(user, "User not found", { status: 404 }), json25({ user, userJoinedDisplay: user.createdAt.toLocaleDateString() });
}
function ProfileRoute() {
  let data = useLoaderData12(), user = data.user, userDisplayName = user.name ?? user.username, loggedInUser = useOptionalUser(), isLoggedInUser = data.user.id === loggedInUser?.id;
  return /* @__PURE__ */ jsxDEV45("div", { className: "container mb-48 mt-36 flex flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsxDEV45(Spacer, { size: "4xs" }, void 0, !1, {
      fileName: "app/routes/users+/$username.tsx",
      lineNumber: 39,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV45("div", { className: "container flex flex-col items-center rounded-3xl bg-muted p-12", children: [
      /* @__PURE__ */ jsxDEV45("div", { className: "relative w-52", children: /* @__PURE__ */ jsxDEV45("div", { className: "absolute -top-40", children: /* @__PURE__ */ jsxDEV45("div", { className: "relative", children: /* @__PURE__ */ jsxDEV45(
        "img",
        {
          src: getUserImgSrc(data.user.image?.id),
          alt: userDisplayName,
          className: "h-52 w-52 rounded-full object-cover"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 45,
          columnNumber: 8
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/users+/$username.tsx",
        lineNumber: 44,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/users+/$username.tsx",
        lineNumber: 43,
        columnNumber: 6
      }, this) }, void 0, !1, {
        fileName: "app/routes/users+/$username.tsx",
        lineNumber: 42,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV45(Spacer, { size: "sm" }, void 0, !1, {
        fileName: "app/routes/users+/$username.tsx",
        lineNumber: 54,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV45("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxDEV45("div", { className: "flex flex-wrap items-center justify-center gap-4", children: /* @__PURE__ */ jsxDEV45("h1", { className: "text-center text-h2", children: userDisplayName }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 58,
          columnNumber: 7
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 57,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ jsxDEV45("p", { className: "mt-2 text-center text-muted-foreground", children: [
          "Joined ",
          data.userJoinedDisplay
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 60,
          columnNumber: 6
        }, this),
        isLoggedInUser ? /* @__PURE__ */ jsxDEV45(Form16, { action: "/logout", method: "POST", className: "mt-3", children: /* @__PURE__ */ jsxDEV45(Button, { type: "submit", variant: "link", size: "pill", children: /* @__PURE__ */ jsxDEV45(Icon, { name: "exit", className: "scale-125 max-md:scale-150", children: "Logout" }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 66,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 65,
          columnNumber: 8
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 64,
          columnNumber: 7
        }, this) : null,
        /* @__PURE__ */ jsxDEV45("div", { className: "mt-10 flex gap-4", children: isLoggedInUser ? /* @__PURE__ */ jsxDEV45(Fragment4, { children: [
          /* @__PURE__ */ jsxDEV45(Button, { asChild: !0, children: /* @__PURE__ */ jsxDEV45(Link14, { to: "notes", prefetch: "intent", children: "My notes" }, void 0, !1, {
            fileName: "app/routes/users+/$username.tsx",
            lineNumber: 76,
            columnNumber: 10
          }, this) }, void 0, !1, {
            fileName: "app/routes/users+/$username.tsx",
            lineNumber: 75,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV45(Button, { asChild: !0, children: /* @__PURE__ */ jsxDEV45(Link14, { to: "/settings/profile", prefetch: "intent", children: "Edit profile" }, void 0, !1, {
            fileName: "app/routes/users+/$username.tsx",
            lineNumber: 81,
            columnNumber: 10
          }, this) }, void 0, !1, {
            fileName: "app/routes/users+/$username.tsx",
            lineNumber: 80,
            columnNumber: 9
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 74,
          columnNumber: 8
        }, this) : /* @__PURE__ */ jsxDEV45(Button, { asChild: !0, children: /* @__PURE__ */ jsxDEV45(Link14, { to: "notes", prefetch: "intent", children: [
          userDisplayName,
          "'s notes"
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 88,
          columnNumber: 9
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 87,
          columnNumber: 8
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 72,
          columnNumber: 6
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/users+/$username.tsx",
        lineNumber: 56,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/users+/$username.tsx",
      lineNumber: 41,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users+/$username.tsx",
    lineNumber: 38,
    columnNumber: 3
  }, this);
}
var meta9 = ({ data, params }) => {
  let displayName = data?.user.name ?? params.username;
  return [
    { title: `${displayName} | Epic Notes` },
    {
      name: "description",
      content: `Profile of ${displayName} on Epic Notes`
    }
  ];
};
function ErrorBoundary9() {
  return /* @__PURE__ */ jsxDEV45(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: ({ params }) => /* @__PURE__ */ jsxDEV45("p", { children: [
          'No user with the username "',
          params.username,
          '" exists'
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username.tsx",
          lineNumber: 116,
          columnNumber: 6
        }, this)
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/users+/$username.tsx",
      lineNumber: 113,
      columnNumber: 3
    },
    this
  );
}

// app/routes/users+/$username_+/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  ErrorBoundary: () => ErrorBoundary10,
  default: () => NotesRoute,
  loader: () => loader31
});
import { json as json26 } from "@remix-run/node";
import { Link as Link15, NavLink, Outlet as Outlet4, useLoaderData as useLoaderData13 } from "@remix-run/react";
init_db_server();
import { jsxDEV as jsxDEV46 } from "react/jsx-dev-runtime";
async function loader31({ params }) {
  let owner = await prisma.user.findFirst({
    select: {
      id: !0,
      name: !0,
      username: !0,
      image: { select: { id: !0 } },
      notes: { select: { id: !0, title: !0 } }
    },
    where: { username: params.username }
  });
  return invariantResponse(owner, "Owner not found", { status: 404 }), json26({ owner });
}
function NotesRoute() {
  let data = useLoaderData13(), isOwner = useOptionalUser()?.id === data.owner.id, ownerDisplayName = data.owner.name ?? data.owner.username, navLinkDefaultClassName = "line-clamp-2 block rounded-l-full py-2 pl-8 pr-6 text-base lg:text-xl";
  return /* @__PURE__ */ jsxDEV46("main", { className: "container flex h-full min-h-[400px] px-0 pb-12 md:px-8", children: /* @__PURE__ */ jsxDEV46("div", { className: "grid w-full grid-cols-4 bg-muted pl-2 md:container md:mx-2 md:rounded-3xl md:pr-0", children: [
    /* @__PURE__ */ jsxDEV46("div", { className: "relative col-span-1", children: /* @__PURE__ */ jsxDEV46("div", { className: "absolute inset-0 flex flex-col", children: [
      /* @__PURE__ */ jsxDEV46(
        Link15,
        {
          to: `/users/${data.owner.username}`,
          className: "flex flex-col items-center justify-center gap-2 bg-muted pb-4 pl-8 pr-4 pt-12 lg:flex-row lg:justify-start lg:gap-4",
          children: [
            /* @__PURE__ */ jsxDEV46(
              "img",
              {
                src: getUserImgSrc(data.owner.image?.id),
                alt: ownerDisplayName,
                className: "h-16 w-16 rounded-full object-cover lg:h-24 lg:w-24"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users+/$username_+/notes.tsx",
                lineNumber: 42,
                columnNumber: 8
              },
              this
            ),
            /* @__PURE__ */ jsxDEV46("h1", { className: "text-center text-base font-bold md:text-lg lg:text-left lg:text-2xl", children: [
              ownerDisplayName,
              "'s Notes"
            ] }, void 0, !0, {
              fileName: "app/routes/users+/$username_+/notes.tsx",
              lineNumber: 47,
              columnNumber: 8
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/users+/$username_+/notes.tsx",
          lineNumber: 38,
          columnNumber: 7
        },
        this
      ),
      /* @__PURE__ */ jsxDEV46("ul", { className: "overflow-y-auto overflow-x-hidden pb-12", children: [
        isOwner ? /* @__PURE__ */ jsxDEV46("li", { className: "p-1 pr-0", children: /* @__PURE__ */ jsxDEV46(
          NavLink,
          {
            to: "new",
            className: ({ isActive }) => cn(navLinkDefaultClassName, isActive && "bg-accent"),
            children: /* @__PURE__ */ jsxDEV46(Icon, { name: "plus", children: "New Note" }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/notes.tsx",
              lineNumber: 60,
              columnNumber: 11
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users+/$username_+/notes.tsx",
            lineNumber: 54,
            columnNumber: 10
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/notes.tsx",
          lineNumber: 53,
          columnNumber: 9
        }, this) : null,
        data.owner.notes.map((note) => /* @__PURE__ */ jsxDEV46("li", { className: "p-1 pr-0", children: /* @__PURE__ */ jsxDEV46(
          NavLink,
          {
            to: note.id,
            preventScrollReset: !0,
            prefetch: "intent",
            className: ({ isActive }) => cn(navLinkDefaultClassName, isActive && "bg-accent"),
            children: note.title
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users+/$username_+/notes.tsx",
            lineNumber: 66,
            columnNumber: 10
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/users+/$username_+/notes.tsx",
          lineNumber: 65,
          columnNumber: 9
        }, this))
      ] }, void 0, !0, {
        fileName: "app/routes/users+/$username_+/notes.tsx",
        lineNumber: 51,
        columnNumber: 7
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/users+/$username_+/notes.tsx",
      lineNumber: 37,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.tsx",
      lineNumber: 36,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ jsxDEV46("div", { className: "relative col-span-3 bg-accent md:rounded-r-3xl", children: /* @__PURE__ */ jsxDEV46(Outlet4, {}, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.tsx",
      lineNumber: 82,
      columnNumber: 6
    }, this) }, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.tsx",
      lineNumber: 81,
      columnNumber: 5
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users+/$username_+/notes.tsx",
    lineNumber: 35,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/users+/$username_+/notes.tsx",
    lineNumber: 34,
    columnNumber: 3
  }, this);
}
function ErrorBoundary10() {
  return /* @__PURE__ */ jsxDEV46(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: ({ params }) => /* @__PURE__ */ jsxDEV46("p", { children: [
          'No user with the username "',
          params.username,
          '" exists'
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username_+/notes.tsx",
          lineNumber: 94,
          columnNumber: 6
        }, this)
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/users+/$username_+/notes.tsx",
      lineNumber: 91,
      columnNumber: 3
    },
    this
  );
}

// app/routes/users+/$username_+/notes.$noteId.tsx
var notes_noteId_exports = {};
__export(notes_noteId_exports, {
  DeleteNote: () => DeleteNote,
  ErrorBoundary: () => ErrorBoundary11,
  action: () => action22,
  default: () => NoteRoute,
  loader: () => loader32,
  meta: () => meta10
});
import { useForm as useForm15 } from "@conform-to/react";
import { parse as parse17 } from "@conform-to/zod";
import { json as json27 } from "@remix-run/node";
import {
  Form as Form17,
  Link as Link16,
  useActionData as useActionData12,
  useLoaderData as useLoaderData14
} from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";
import { AuthenticityTokenInput as AuthenticityTokenInput13 } from "remix-utils/csrf/react";
import { z as z22 } from "zod";

// app/components/floating-toolbar.tsx
var floatingToolbarClassName = "absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg bg-muted/80 p-4 pl-5 shadow-xl shadow-accent backdrop-blur-sm md:gap-4 md:pl-7 justify-end";

// app/routes/users+/$username_+/notes.$noteId.tsx
init_db_server();
import { jsxDEV as jsxDEV47 } from "react/jsx-dev-runtime";
async function loader32({ params }) {
  let note = await prisma.note.findUnique({
    where: { id: params.noteId },
    select: {
      id: !0,
      title: !0,
      content: !0,
      ownerId: !0,
      updatedAt: !0,
      images: {
        select: {
          id: !0,
          altText: !0
        }
      }
    }
  });
  invariantResponse(note, "Not found", { status: 404 });
  let date = new Date(note.updatedAt), timeAgo = formatDistanceToNow(date);
  return json27({
    note,
    timeAgo
  });
}
var DeleteFormSchema = z22.object({
  intent: z22.literal("delete-note"),
  noteId: z22.string()
});
async function action22({ request }) {
  let userId = await requireUserId(request), formData = await request.formData();
  await validateCSRF(formData, request.headers);
  let submission = parse17(formData, {
    schema: DeleteFormSchema
  });
  if (submission.intent !== "submit")
    return json27({ status: "idle", submission });
  if (!submission.value)
    return json27({ status: "error", submission }, { status: 400 });
  let { noteId } = submission.value, note = await prisma.note.findFirst({
    select: { id: !0, ownerId: !0, owner: { select: { username: !0 } } },
    where: { id: noteId }
  });
  invariantResponse(note, "Not found", { status: 404 });
  let isOwner = note.ownerId === userId;
  return await requireUserWithPermission(
    request,
    isOwner ? "delete:note:own" : "delete:note:any"
  ), await prisma.note.delete({ where: { id: note.id } }), redirectWithToast(`/users/${note.owner.username}/notes`, {
    type: "success",
    title: "Success",
    description: "Your note has been deleted."
  });
}
function NoteRoute() {
  let data = useLoaderData14(), user = useOptionalUser(), isOwner = user?.id === data.note.ownerId, canDelete = userHasPermission(
    user,
    isOwner ? "delete:note:own" : "delete:note:any"
  ), displayBar = canDelete || isOwner;
  return /* @__PURE__ */ jsxDEV47("div", { className: "absolute inset-0 flex flex-col px-10", children: [
    /* @__PURE__ */ jsxDEV47("h2", { className: "mb-2 pt-12 text-h2 lg:mb-6", children: data.note.title }, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 119,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV47("div", { className: `${displayBar ? "pb-24" : "pb-12"} overflow-y-auto`, children: [
      /* @__PURE__ */ jsxDEV47("ul", { className: "flex flex-wrap gap-5 py-5", children: data.note.images.map((image) => /* @__PURE__ */ jsxDEV47("li", { children: /* @__PURE__ */ jsxDEV47("a", { href: getNoteImgSrc(image.id), children: /* @__PURE__ */ jsxDEV47(
        "img",
        {
          src: getNoteImgSrc(image.id),
          alt: image.altText ?? "",
          className: "h-32 w-32 rounded-lg object-cover"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 125,
          columnNumber: 9
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 124,
        columnNumber: 8
      }, this) }, image.id, !1, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 123,
        columnNumber: 7
      }, this)) }, void 0, !1, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 121,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV47("p", { className: "whitespace-break-spaces text-sm md:text-lg", children: data.note.content }, void 0, !1, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 134,
        columnNumber: 5
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 120,
      columnNumber: 4
    }, this),
    displayBar ? /* @__PURE__ */ jsxDEV47("div", { className: floatingToolbarClassName, children: [
      /* @__PURE__ */ jsxDEV47("span", { className: "text-sm text-foreground/90 max-[524px]:hidden", children: /* @__PURE__ */ jsxDEV47(Icon, { name: "clock", className: "scale-125", children: [
        data.timeAgo,
        " ago"
      ] }, void 0, !0, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 141,
        columnNumber: 7
      }, this) }, void 0, !1, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 140,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ jsxDEV47("div", { className: "grid flex-1 grid-cols-2 justify-end gap-2 min-[525px]:flex md:gap-4", children: [
        canDelete ? /* @__PURE__ */ jsxDEV47(DeleteNote, { id: data.note.id }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 146,
          columnNumber: 20
        }, this) : null,
        /* @__PURE__ */ jsxDEV47(
          Button,
          {
            asChild: !0,
            className: "min-[525px]:max-md:aspect-square min-[525px]:max-md:px-0",
            children: /* @__PURE__ */ jsxDEV47(Link16, { to: "edit", children: /* @__PURE__ */ jsxDEV47(Icon, { name: "pencil-1", className: "scale-125 max-md:scale-150", children: /* @__PURE__ */ jsxDEV47("span", { className: "max-md:hidden", children: "Edit" }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
              lineNumber: 153,
              columnNumber: 10
            }, this) }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
              lineNumber: 152,
              columnNumber: 9
            }, this) }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
              lineNumber: 151,
              columnNumber: 8
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
            lineNumber: 147,
            columnNumber: 7
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 145,
        columnNumber: 6
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 139,
      columnNumber: 5
    }, this) : null
  ] }, void 0, !0, {
    fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
    lineNumber: 118,
    columnNumber: 3
  }, this);
}
function DeleteNote({ id }) {
  let actionData = useActionData12(), isPending = useIsPending(), [form] = useForm15({
    id: "delete-note",
    lastSubmission: actionData?.submission
  });
  return /* @__PURE__ */ jsxDEV47(Form17, { method: "POST", ...form.props, children: [
    /* @__PURE__ */ jsxDEV47(AuthenticityTokenInput13, {}, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 174,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV47("input", { type: "hidden", name: "noteId", value: id }, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 175,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV47(
      StatusButton,
      {
        type: "submit",
        name: "intent",
        value: "delete-note",
        variant: "destructive",
        status: isPending ? "pending" : actionData?.status ?? "idle",
        disabled: isPending,
        className: "w-full max-md:aspect-square max-md:px-0",
        children: /* @__PURE__ */ jsxDEV47(Icon, { name: "trash", className: "scale-125 max-md:scale-150", children: /* @__PURE__ */ jsxDEV47("span", { className: "max-md:hidden", children: "Delete" }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 186,
          columnNumber: 6
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 185,
          columnNumber: 5
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
        lineNumber: 176,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV47(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 189,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
    lineNumber: 173,
    columnNumber: 3
  }, this);
}
var meta10 = ({ data, params, matches }) => {
  let displayName = matches.find(
    (m) => m.id === "routes/users+/$username_+/notes"
  )?.data?.owner.name ?? params.username, noteTitle = data?.note.title ?? "Note", noteContentsSummary = data && data.note.content.length > 100 ? data?.note.content.slice(0, 97) + "..." : "No content";
  return [
    { title: `${noteTitle} | ${displayName}'s Notes | Epic Notes` },
    {
      name: "description",
      content: noteContentsSummary
    }
  ];
};
function ErrorBoundary11() {
  return /* @__PURE__ */ jsxDEV47(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        403: () => /* @__PURE__ */ jsxDEV47("p", { children: "You are not allowed to do that" }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 220,
          columnNumber: 16
        }, this),
        404: ({ params }) => /* @__PURE__ */ jsxDEV47("p", { children: [
          'No note with the id "',
          params.noteId,
          '" exists'
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
          lineNumber: 222,
          columnNumber: 6
        }, this)
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/users+/$username_+/notes.$noteId.tsx",
      lineNumber: 218,
      columnNumber: 3
    },
    this
  );
}

// app/routes/users+/$username_+/notes.$noteId_.edit.tsx
var notes_noteId_edit_exports = {};
__export(notes_noteId_edit_exports, {
  action: () => action23,
  default: () => NoteEdit,
  loader: () => loader33
});
import { json as json29 } from "@remix-run/node";
import { useLoaderData as useLoaderData15 } from "@remix-run/react";
init_db_server();

// app/routes/users+/$username_+/__note-editor.tsx
import {
  conform as conform14,
  list,
  useFieldList,
  useFieldset,
  useForm as useForm16
} from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint14, parse as parse18 } from "@conform-to/zod";
import { createId as cuid3 } from "@paralleldrive/cuid2";
import {
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  json as json28,
  unstable_parseMultipartFormData as parseMultipartFormData,
  redirect as redirect22
} from "@remix-run/node";
import { Form as Form18, useFetcher as useFetcher8 } from "@remix-run/react";
import { useRef as useRef5, useState as useState5 } from "react";
import { AuthenticityTokenInput as AuthenticityTokenInput14 } from "remix-utils/csrf/react";
import { z as z23 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV48 } from "react/jsx-dev-runtime";
var titleMinLength = 1, titleMaxLength = 100, contentMinLength = 1, contentMaxLength = 1e4, MAX_UPLOAD_SIZE = 1024 * 1024 * 3, ImageFieldsetSchema = z23.object({
  id: z23.string().optional(),
  file: z23.instanceof(File).optional().refine((file) => !file || file.size <= MAX_UPLOAD_SIZE, "File size must be less than 3MB"),
  altText: z23.string().optional()
});
function imageHasFile(image) {
  return Boolean(image.file?.size && image.file?.size > 0);
}
function imageHasId(image) {
  return image.id != null;
}
var NoteEditorSchema = z23.object({
  id: z23.string().optional(),
  title: z23.string().min(titleMinLength).max(titleMaxLength),
  content: z23.string().min(contentMinLength).max(contentMaxLength),
  images: z23.array(ImageFieldsetSchema).max(5).optional()
});
async function action23({ request }) {
  let userId = await requireUserId(request), formData = await parseMultipartFormData(
    request,
    createMemoryUploadHandler({ maxPartSize: MAX_UPLOAD_SIZE })
  );
  await validateCSRF(formData, request.headers);
  let submission = await parse18(formData, {
    schema: NoteEditorSchema.superRefine(async (data, ctx) => {
      if (!data.id)
        return;
      await prisma.note.findUnique({
        select: { id: !0 },
        where: { id: data.id, ownerId: userId }
      }) || ctx.addIssue({
        code: z23.ZodIssueCode.custom,
        message: "Note not found"
      });
    }).transform(async ({ images = [], ...data }) => ({
      ...data,
      imageUpdates: await Promise.all(
        images.filter(imageHasId).map(async (i) => imageHasFile(i) ? {
          id: i.id,
          altText: i.altText,
          contentType: i.file.type,
          blob: Buffer.from(await i.file.arrayBuffer())
        } : {
          id: i.id,
          altText: i.altText
        })
      ),
      newImages: await Promise.all(
        images.filter(imageHasFile).filter((i) => !i.id).map(async (image) => ({
          altText: image.altText,
          contentType: image.file.type,
          blob: Buffer.from(await image.file.arrayBuffer())
        }))
      )
    })),
    async: !0
  });
  if (submission.intent !== "submit")
    return json28({ status: "idle", submission });
  if (!submission.value)
    return json28({ status: "error", submission }, { status: 400 });
  let {
    id: noteId,
    title,
    content,
    imageUpdates = [],
    newImages = []
  } = submission.value, updatedNote = await prisma.note.upsert({
    select: { id: !0, owner: { select: { username: !0 } } },
    where: { id: noteId ?? "__new_note__" },
    create: {
      ownerId: userId,
      title,
      content,
      images: { create: newImages }
    },
    update: {
      title,
      content,
      images: {
        deleteMany: { id: { notIn: imageUpdates.map((i) => i.id) } },
        updateMany: imageUpdates.map((updates) => ({
          where: { id: updates.id },
          data: { ...updates, id: updates.blob ? cuid3() : updates.id }
        })),
        create: newImages
      }
    }
  });
  return redirect22(
    `/users/${updatedNote.owner.username}/notes/${updatedNote.id}`
  );
}
function NoteEditor({
  note
}) {
  let noteFetcher = useFetcher8(), isPending = noteFetcher.state !== "idle", [form, fields] = useForm16({
    id: "note-editor",
    constraint: getFieldsetConstraint14(NoteEditorSchema),
    lastSubmission: noteFetcher.data?.submission,
    onValidate({ formData }) {
      return parse18(formData, { schema: NoteEditorSchema });
    },
    defaultValue: {
      title: note?.title ?? "",
      content: note?.content ?? "",
      images: note?.images ?? [{}]
    }
  }), imageList = useFieldList(form.ref, fields.images);
  return /* @__PURE__ */ jsxDEV48("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ jsxDEV48(
      Form18,
      {
        method: "POST",
        className: "flex h-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden px-10 pb-28 pt-12",
        ...form.props,
        encType: "multipart/form-data",
        children: [
          /* @__PURE__ */ jsxDEV48(AuthenticityTokenInput14, {}, void 0, !1, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 215,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ jsxDEV48("button", { type: "submit", className: "hidden" }, void 0, !1, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 221,
            columnNumber: 5
          }, this),
          note ? /* @__PURE__ */ jsxDEV48("input", { type: "hidden", name: "id", value: note.id }, void 0, !1, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 222,
            columnNumber: 13
          }, this) : null,
          /* @__PURE__ */ jsxDEV48("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxDEV48(
              Field,
              {
                labelProps: { children: "Title" },
                inputProps: {
                  autoFocus: !0,
                  ...conform14.input(fields.title, { ariaAttributes: !0 })
                },
                errors: fields.title.errors
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 224,
                columnNumber: 6
              },
              this
            ),
            /* @__PURE__ */ jsxDEV48(
              TextareaField,
              {
                labelProps: { children: "Content" },
                textareaProps: {
                  ...conform14.textarea(fields.content, { ariaAttributes: !0 })
                },
                errors: fields.content.errors
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 232,
                columnNumber: 6
              },
              this
            ),
            /* @__PURE__ */ jsxDEV48("div", { children: [
              /* @__PURE__ */ jsxDEV48(Label, { children: "Images" }, void 0, !1, {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 240,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ jsxDEV48("ul", { className: "flex flex-col gap-4", children: imageList.map((image, index) => /* @__PURE__ */ jsxDEV48(
                "li",
                {
                  className: "relative border-b-2 border-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxDEV48(
                      "button",
                      {
                        className: "absolute right-0 top-0 text-foreground-destructive",
                        ...list.remove(fields.images.name, { index }),
                        children: [
                          /* @__PURE__ */ jsxDEV48("span", { "aria-hidden": !0, children: /* @__PURE__ */ jsxDEV48(Icon, { name: "cross-1" }, void 0, !1, {
                            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                            lineNumber: 252,
                            columnNumber: 12
                          }, this) }, void 0, !1, {
                            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                            lineNumber: 251,
                            columnNumber: 11
                          }, this),
                          " ",
                          /* @__PURE__ */ jsxDEV48("span", { className: "sr-only", children: [
                            "Remove image ",
                            index + 1
                          ] }, void 0, !0, {
                            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                          }, this)
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                        lineNumber: 247,
                        columnNumber: 10
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV48(ImageChooser, { config: image }, void 0, !1, {
                      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                      lineNumber: 256,
                      columnNumber: 10
                    }, this)
                  ]
                },
                image.key,
                !0,
                {
                  fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                  lineNumber: 243,
                  columnNumber: 9
                },
                this
              )) }, void 0, !1, {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 241,
                columnNumber: 7
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 239,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ jsxDEV48(
              Button,
              {
                className: "mt-3",
                ...list.insert(fields.images.name, { defaultValue: {} }),
                children: [
                  /* @__PURE__ */ jsxDEV48("span", { "aria-hidden": !0, children: /* @__PURE__ */ jsxDEV48(Icon, { name: "plus", children: "Image" }, void 0, !1, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 266,
                    columnNumber: 8
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 265,
                    columnNumber: 7
                  }, this),
                  " ",
                  /* @__PURE__ */ jsxDEV48("span", { className: "sr-only", children: "Add image" }, void 0, !1, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 268,
                    columnNumber: 7
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 261,
                columnNumber: 6
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 223,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ jsxDEV48(ErrorList, { id: form.errorId, errors: form.errors }, void 0, !1, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 271,
            columnNumber: 5
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/users+/$username_+/__note-editor.tsx",
        lineNumber: 209,
        columnNumber: 4
      },
      this
    ),
    /* @__PURE__ */ jsxDEV48("div", { className: floatingToolbarClassName, children: [
      /* @__PURE__ */ jsxDEV48(Button, { form: form.id, variant: "destructive", type: "reset", children: "Reset" }, void 0, !1, {
        fileName: "app/routes/users+/$username_+/__note-editor.tsx",
        lineNumber: 274,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ jsxDEV48(
        StatusButton,
        {
          form: form.id,
          type: "submit",
          disabled: isPending,
          status: isPending ? "pending" : "idle",
          children: "Submit"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/users+/$username_+/__note-editor.tsx",
          lineNumber: 277,
          columnNumber: 5
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
      lineNumber: 273,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
    lineNumber: 208,
    columnNumber: 3
  }, this);
}
function ImageChooser({
  config
}) {
  let ref = useRef5(null), fields = useFieldset(ref, config), existingImage = Boolean(fields.id.defaultValue), [previewImage, setPreviewImage] = useState5(
    fields.id.defaultValue ? getNoteImgSrc(fields.id.defaultValue) : null
  ), [altText, setAltText] = useState5(fields.altText.defaultValue ?? "");
  return /* @__PURE__ */ jsxDEV48(
    "fieldset",
    {
      ref,
      "aria-invalid": Boolean(config.errors?.length) || void 0,
      "aria-describedby": config.errors?.length ? config.errorId : void 0,
      children: [
        /* @__PURE__ */ jsxDEV48("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxDEV48("div", { className: "w-32", children: [
            /* @__PURE__ */ jsxDEV48("div", { className: "relative h-32 w-32", children: /* @__PURE__ */ jsxDEV48(
              "label",
              {
                htmlFor: fields.file.id,
                className: cn("group absolute h-32 w-32 rounded-lg", {
                  "bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100": !previewImage,
                  "cursor-pointer focus-within:ring-4": !existingImage
                }),
                children: [
                  previewImage ? /* @__PURE__ */ jsxDEV48("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxDEV48(
                      "img",
                      {
                        src: previewImage,
                        alt: altText ?? "",
                        className: "h-32 w-32 rounded-lg object-cover"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                        lineNumber: 322,
                        columnNumber: 10
                      },
                      this
                    ),
                    existingImage ? null : /* @__PURE__ */ jsxDEV48("div", { className: "pointer-events-none absolute -right-0.5 -top-0.5 rotate-12 rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-md", children: "new" }, void 0, !1, {
                      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                      lineNumber: 328,
                      columnNumber: 11
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                  }, this) : /* @__PURE__ */ jsxDEV48("div", { className: "flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground", children: /* @__PURE__ */ jsxDEV48(Icon, { name: "plus" }, void 0, !1, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 335,
                    columnNumber: 10
                  }, this) }, void 0, !1, {
                    fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                    lineNumber: 334,
                    columnNumber: 9
                  }, this),
                  existingImage ? /* @__PURE__ */ jsxDEV48(
                    "input",
                    {
                      ...conform14.input(fields.id, {
                        type: "hidden",
                        ariaAttributes: !0
                      })
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                      lineNumber: 339,
                      columnNumber: 9
                    },
                    this
                  ) : null,
                  /* @__PURE__ */ jsxDEV48(
                    "input",
                    {
                      "aria-label": "Image",
                      className: "absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0",
                      onChange: (event) => {
                        let file = event.target.files?.[0];
                        if (file) {
                          let reader = new FileReader();
                          reader.onloadend = () => {
                            setPreviewImage(reader.result);
                          }, reader.readAsDataURL(file);
                        } else
                          setPreviewImage(null);
                      },
                      accept: "image/*",
                      ...conform14.input(fields.file, {
                        type: "file",
                        ariaAttributes: !0
                      })
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                      lineNumber: 346,
                      columnNumber: 8
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 312,
                columnNumber: 7
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 311,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ jsxDEV48("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: /* @__PURE__ */ jsxDEV48(ErrorList, { id: fields.file.errorId, errors: fields.file.errors }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 371,
              columnNumber: 7
            }, this) }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 370,
              columnNumber: 6
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 310,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ jsxDEV48("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxDEV48(Label, { htmlFor: fields.altText.id, children: "Alt Text" }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 375,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ jsxDEV48(
              Textarea,
              {
                onChange: (e) => setAltText(e.currentTarget.value),
                ...conform14.textarea(fields.altText, { ariaAttributes: !0 })
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 376,
                columnNumber: 6
              },
              this
            ),
            /* @__PURE__ */ jsxDEV48("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: /* @__PURE__ */ jsxDEV48(
              ErrorList,
              {
                id: fields.altText.errorId,
                errors: fields.altText.errors
              },
              void 0,
              !1,
              {
                fileName: "app/routes/users+/$username_+/__note-editor.tsx",
                lineNumber: 381,
                columnNumber: 7
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/users+/$username_+/__note-editor.tsx",
              lineNumber: 380,
              columnNumber: 6
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/users+/$username_+/__note-editor.tsx",
            lineNumber: 374,
            columnNumber: 5
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/users+/$username_+/__note-editor.tsx",
          lineNumber: 309,
          columnNumber: 4
        }, this),
        /* @__PURE__ */ jsxDEV48("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: /* @__PURE__ */ jsxDEV48(ErrorList, { id: config.errorId, errors: config.errors }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/__note-editor.tsx",
          lineNumber: 389,
          columnNumber: 5
        }, this) }, void 0, !1, {
          fileName: "app/routes/users+/$username_+/__note-editor.tsx",
          lineNumber: 388,
          columnNumber: 4
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/users+/$username_+/__note-editor.tsx",
      lineNumber: 304,
      columnNumber: 3
    },
    this
  );
}

// app/routes/users+/$username_+/notes.$noteId_.edit.tsx
import { jsxDEV as jsxDEV49 } from "react/jsx-dev-runtime";
async function loader33({ params, request }) {
  let userId = await requireUserId(request), note = await prisma.note.findFirst({
    select: {
      id: !0,
      title: !0,
      content: !0,
      images: {
        select: {
          id: !0,
          altText: !0
        }
      }
    },
    where: {
      id: params.noteId,
      ownerId: userId
    }
  });
  return invariantResponse(note, "Not found", { status: 404 }), json29({ note });
}
function NoteEdit() {
  let data = useLoaderData15();
  return /* @__PURE__ */ jsxDEV49(NoteEditor, { note: data.note }, void 0, !1, {
    fileName: "app/routes/users+/$username_+/notes.$noteId_.edit.tsx",
    lineNumber: 36,
    columnNumber: 9
  }, this);
}

// app/routes/users+/$username_+/notes.index.tsx
var notes_index_exports = {};
__export(notes_index_exports, {
  default: () => NotesIndexRoute,
  meta: () => meta11
});
import { jsxDEV as jsxDEV50 } from "react/jsx-dev-runtime";
function NotesIndexRoute() {
  return /* @__PURE__ */ jsxDEV50("div", { className: "container pt-12", children: /* @__PURE__ */ jsxDEV50("p", { className: "text-body-md", children: "Select a note" }, void 0, !1, {
    fileName: "app/routes/users+/$username_+/notes.index.tsx",
    lineNumber: 7,
    columnNumber: 4
  }, this) }, void 0, !1, {
    fileName: "app/routes/users+/$username_+/notes.index.tsx",
    lineNumber: 6,
    columnNumber: 3
  }, this);
}
var meta11 = ({ params, matches }) => {
  let notesMatch = matches.find(
    (m) => m.id === "routes/users+/$username_+/notes"
  ), displayName = notesMatch?.data?.owner.name ?? params.username, noteCount = notesMatch?.data?.owner.notes.length ?? 0, notesText = noteCount === 1 ? "note" : "notes";
  return [
    { title: `${displayName}'s Notes | Epic Notes` },
    {
      name: "description",
      content: `Checkout ${displayName}'s ${noteCount} ${notesText} on Epic Notes`
    }
  ];
};

// app/routes/users+/$username_+/notes.new.tsx
var notes_new_exports = {};
__export(notes_new_exports, {
  action: () => action23,
  default: () => notes_new_default,
  loader: () => loader34
});
import { json as json30 } from "@remix-run/node";
async function loader34({ request }) {
  return await requireUserId(request), json30({});
}
var notes_new_default = NoteEditor;

// app/routes/users+/index.tsx
var users_exports = {};
__export(users_exports, {
  ErrorBoundary: () => ErrorBoundary12,
  default: () => UsersRoute,
  loader: () => loader35
});
import { json as json31, redirect as redirect23 } from "@remix-run/node";
import { Link as Link17, useLoaderData as useLoaderData16 } from "@remix-run/react";
import { z as z24 } from "zod";
init_db_server();
import { jsxDEV as jsxDEV51 } from "react/jsx-dev-runtime";
var UserSearchResultSchema = z24.object({
  id: z24.string(),
  username: z24.string(),
  name: z24.string().nullable(),
  imageId: z24.string().nullable()
}), UserSearchResultsSchema = z24.array(UserSearchResultSchema);
async function loader35({ request }) {
  let searchTerm = new URL(request.url).searchParams.get("search");
  if (searchTerm === "")
    return redirect23("/users");
  let like = `%${searchTerm ?? ""}%`, rawUsers = await prisma.$queryRaw`
		SELECT User.id, User.username, User.name, UserImage.id AS imageId
		FROM User
		LEFT JOIN UserImage ON User.id = UserImage.userId
		WHERE User.username LIKE ${like}
		OR User.name LIKE ${like}
		ORDER BY (
			SELECT Note.updatedAt
			FROM Note
			WHERE Note.ownerId = User.id
			ORDER BY Note.updatedAt DESC
			LIMIT 1
		) DESC
		LIMIT 50
	`, result = UserSearchResultsSchema.safeParse(rawUsers);
  return result.success ? json31({ status: "idle", users: result.data }) : json31({ status: "error", error: result.error.message }, {
    status: 400
  });
}
function UsersRoute() {
  let data = useLoaderData16(), isPending = useDelayedIsPending({
    formMethod: "GET",
    formAction: "/users"
  });
  return data.status === "error" && console.error(data.error), /* @__PURE__ */ jsxDEV51("div", { className: "container mb-48 mt-36 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsxDEV51("h1", { className: "text-h1", children: "Epic Notes Users" }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 64,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV51("div", { className: "w-full max-w-[700px] ", children: /* @__PURE__ */ jsxDEV51(SearchBar, { status: data.status, autoFocus: !0, autoSubmit: !0 }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 66,
      columnNumber: 5
    }, this) }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 65,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ jsxDEV51("main", { children: data.status === "idle" ? data.users.length ? /* @__PURE__ */ jsxDEV51(
      "ul",
      {
        className: cn(
          "flex w-full flex-wrap items-center justify-center gap-4 delay-200",
          { "opacity-50": isPending }
        ),
        children: data.users.map((user) => /* @__PURE__ */ jsxDEV51("li", { children: /* @__PURE__ */ jsxDEV51(
          Link17,
          {
            to: user.username,
            className: "flex h-36 w-44 flex-col items-center justify-center rounded-lg bg-muted px-5 py-3",
            children: [
              /* @__PURE__ */ jsxDEV51(
                "img",
                {
                  alt: user.name ?? user.username,
                  src: getUserImgSrc(user.imageId),
                  className: "h-16 w-16 rounded-full"
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/users+/index.tsx",
                  lineNumber: 83,
                  columnNumber: 11
                },
                this
              ),
              user.name ? /* @__PURE__ */ jsxDEV51("span", { className: "w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-body-md", children: user.name }, void 0, !1, {
                fileName: "app/routes/users+/index.tsx",
                lineNumber: 89,
                columnNumber: 12
              }, this) : null,
              /* @__PURE__ */ jsxDEV51("span", { className: "w-full overflow-hidden text-ellipsis text-center text-body-sm text-muted-foreground", children: user.username }, void 0, !1, {
                fileName: "app/routes/users+/index.tsx",
                lineNumber: 93,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/users+/index.tsx",
            lineNumber: 79,
            columnNumber: 10
          },
          this
        ) }, user.id, !1, {
          fileName: "app/routes/users+/index.tsx",
          lineNumber: 78,
          columnNumber: 9
        }, this))
      },
      void 0,
      !1,
      {
        fileName: "app/routes/users+/index.tsx",
        lineNumber: 71,
        columnNumber: 7
      },
      this
    ) : /* @__PURE__ */ jsxDEV51("p", { children: "No users found" }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this) : data.status === "error" ? /* @__PURE__ */ jsxDEV51(ErrorList, { errors: ["There was an error parsing the results"] }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 104,
      columnNumber: 6
    }, this) : null }, void 0, !1, {
      fileName: "app/routes/users+/index.tsx",
      lineNumber: 68,
      columnNumber: 4
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/users+/index.tsx",
    lineNumber: 63,
    columnNumber: 3
  }, this);
}
function ErrorBoundary12() {
  return /* @__PURE__ */ jsxDEV51(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/users+/index.tsx",
    lineNumber: 112,
    columnNumber: 9
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-H6SK6IEI.js", imports: ["/build/_shared/chunk-ZWGWGGVF.js", "/build/_shared/chunk-PHQUHPUM.js", "/build/_shared/chunk-GIAAE3CH.js", "/build/_shared/chunk-76ZEIH4H.js", "/build/_shared/chunk-UWV35TSL.js", "/build/_shared/chunk-XU7DNSPJ.js", "/build/_shared/chunk-BOXFZXVX.js", "/build/_shared/chunk-PNG5AS42.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-HEG7BLOT.js", imports: ["/build/_shared/chunk-EEEUZJA4.js", "/build/_shared/chunk-Y7VT56QR.js", "/build/_shared/chunk-6NMOG26R.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-DKOEJKML.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/_auth+/auth.$provider": { id: "routes/_auth+/auth.$provider", parentId: "root", path: "auth/:provider", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/auth.$provider-WW2QFSVE.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_auth+/auth.$provider.callback": { id: "routes/_auth+/auth.$provider.callback", parentId: "routes/_auth+/auth.$provider", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/auth.$provider.callback-5XAADI4U.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_auth+/forgot-password": { id: "routes/_auth+/forgot-password", parentId: "root", path: "forgot-password", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/forgot-password-L4OF4SVH.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !1, hasErrorBoundary: !0 }, "routes/_auth+/login": { id: "routes/_auth+/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/login-2RPVQ3SL.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/_auth+/logout": { id: "routes/_auth+/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/logout-M5ZJ3ZMG.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_auth+/onboarding": { id: "routes/_auth+/onboarding", parentId: "root", path: "onboarding", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/onboarding-YRVA42RB.js", imports: ["/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_auth+/onboarding_.$provider": { id: "routes/_auth+/onboarding_.$provider", parentId: "root", path: "onboarding/:provider", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/onboarding_.$provider-7YPMLTIY.js", imports: ["/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_auth+/reset-password": { id: "routes/_auth+/reset-password", parentId: "root", path: "reset-password", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/reset-password-EJZQUZLL.js", imports: ["/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/_auth+/signup": { id: "routes/_auth+/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/signup-DIBGULHT.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !1, hasErrorBoundary: !0 }, "routes/_auth+/verify": { id: "routes/_auth+/verify", parentId: "root", path: "verify", index: void 0, caseSensitive: void 0, module: "/build/routes/_auth+/verify-6WH3HGUS.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !0, hasLoader: !1, hasErrorBoundary: !0 }, "routes/_marketing+/about": { id: "routes/_marketing+/about", parentId: "root", path: "about", index: void 0, caseSensitive: void 0, module: "/build/routes/_marketing+/about-4LFHBFNE.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_marketing+/index": { id: "routes/_marketing+/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_marketing+/index-6PSQ7GTS.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_marketing+/privacy": { id: "routes/_marketing+/privacy", parentId: "root", path: "privacy", index: void 0, caseSensitive: void 0, module: "/build/routes/_marketing+/privacy-CHBEGGHJ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_marketing+/support": { id: "routes/_marketing+/support", parentId: "root", path: "support", index: void 0, caseSensitive: void 0, module: "/build/routes/_marketing+/support-26QXFA7O.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_marketing+/tos": { id: "routes/_marketing+/tos", parentId: "root", path: "tos", index: void 0, caseSensitive: void 0, module: "/build/routes/_marketing+/tos-5B37E7D7.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/_seo+/robots[.]txt": { id: "routes/_seo+/robots[.]txt", parentId: "root", path: "robots.txt", index: void 0, caseSensitive: void 0, module: "/build/routes/_seo+/robots[.]txt-TBZGNCYM.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/_seo+/sitemap[.]xml": { id: "routes/_seo+/sitemap[.]xml", parentId: "root", path: "sitemap.xml", index: void 0, caseSensitive: void 0, module: "/build/routes/_seo+/sitemap[.]xml-JQ7RJ3XX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/admin+/cache": { id: "routes/admin+/cache", parentId: "root", path: "admin/cache", index: void 0, caseSensitive: void 0, module: "/build/routes/admin+/cache-TSPVEV22.js", imports: ["/build/_shared/chunk-ZL5Q24C5.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-NBRO6RFG.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/admin+/cache_.lru.$cacheKey": { id: "routes/admin+/cache_.lru.$cacheKey", parentId: "root", path: "admin/cache/lru/:cacheKey", index: void 0, caseSensitive: void 0, module: "/build/routes/admin+/cache_.lru.$cacheKey-X2GRYDAK.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/admin+/cache_.sqlite": { id: "routes/admin+/cache_.sqlite", parentId: "root", path: "admin/cache/sqlite", index: void 0, caseSensitive: void 0, module: "/build/routes/admin+/cache_.sqlite-7USYJDNY.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/admin+/cache_.sqlite.$cacheKey": { id: "routes/admin+/cache_.sqlite.$cacheKey", parentId: "routes/admin+/cache_.sqlite", path: ":cacheKey", index: void 0, caseSensitive: void 0, module: "/build/routes/admin+/cache_.sqlite.$cacheKey-QRUNMDV6.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/me": { id: "routes/me", parentId: "root", path: "me", index: void 0, caseSensitive: void 0, module: "/build/routes/me-YJ7U5JB6.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/resources+/download-user-data": { id: "routes/resources+/download-user-data", parentId: "root", path: "resources/download-user-data", index: void 0, caseSensitive: void 0, module: "/build/routes/resources+/download-user-data-QWZFMFWX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/resources+/healthcheck": { id: "routes/resources+/healthcheck", parentId: "root", path: "resources/healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/resources+/healthcheck-HMP4SYN5.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/resources+/note-images.$imageId": { id: "routes/resources+/note-images.$imageId", parentId: "root", path: "resources/note-images/:imageId", index: void 0, caseSensitive: void 0, module: "/build/routes/resources+/note-images.$imageId-XY7AWGVH.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/resources+/user-images.$imageId": { id: "routes/resources+/user-images.$imageId", parentId: "root", path: "resources/user-images/:imageId", index: void 0, caseSensitive: void 0, module: "/build/routes/resources+/user-images.$imageId-N2KMUSZO.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile": { id: "routes/settings+/profile", parentId: "root", path: "settings/profile", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile-56PYED4Z.js", imports: ["/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.change-email": { id: "routes/settings+/profile.change-email", parentId: "routes/settings+/profile", path: "change-email", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.change-email-5V5WMMJ3.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-6NMOG26R.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.connections": { id: "routes/settings+/profile.connections", parentId: "routes/settings+/profile", path: "connections", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.connections-EHLR6WVN.js", imports: ["/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.index": { id: "routes/settings+/profile.index", parentId: "routes/settings+/profile", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/settings+/profile.index-QS2JA7SD.js", imports: ["/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.password": { id: "routes/settings+/profile.password", parentId: "routes/settings+/profile", path: "password", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.password-4PYCLHBP.js", imports: ["/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.password_.create": { id: "routes/settings+/profile.password_.create", parentId: "routes/settings+/profile", path: "password/create", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.password_.create-NA44CZCA.js", imports: ["/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.photo": { id: "routes/settings+/profile.photo", parentId: "routes/settings+/profile", path: "photo", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.photo-UA45USEA.js", imports: ["/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.two-factor": { id: "routes/settings+/profile.two-factor", parentId: "routes/settings+/profile", path: "two-factor", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.two-factor-O4OMHZHP.js", imports: ["/build/_shared/chunk-XSA5YJR6.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/settings+/profile.two-factor.disable": { id: "routes/settings+/profile.two-factor.disable", parentId: "routes/settings+/profile.two-factor", path: "disable", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.two-factor.disable-4OI3IES7.js", imports: ["/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js", "/build/_shared/chunk-6NMOG26R.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.two-factor.index": { id: "routes/settings+/profile.two-factor.index", parentId: "routes/settings+/profile.two-factor", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/settings+/profile.two-factor.index-MHRBGHOA.js", imports: ["/build/_shared/chunk-35QU5M5L.js", "/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js", "/build/_shared/chunk-6NMOG26R.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/settings+/profile.two-factor.verify": { id: "routes/settings+/profile.two-factor.verify", parentId: "routes/settings+/profile.two-factor", path: "verify", index: void 0, caseSensitive: void 0, module: "/build/routes/settings+/profile.two-factor.verify-N5J73JPR.js", imports: ["/build/_shared/chunk-35QU5M5L.js", "/build/_shared/chunk-MRLKUITJ.js", "/build/_shared/chunk-NMZL6IDN.js", "/build/_shared/chunk-YROKGDF2.js", "/build/_shared/chunk-3QJDM65C.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-V3X6G6DM.js", "/build/_shared/chunk-SAJ3AEKV.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-R7SB74WW.js", "/build/_shared/chunk-PIFLCODP.js", "/build/_shared/chunk-DIRETMJJ.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-FSP6GK2P.js", "/build/_shared/chunk-6NMOG26R.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/users+/$username": { id: "routes/users+/$username", parentId: "root", path: "users/:username", index: void 0, caseSensitive: void 0, module: "/build/routes/users+/$username-4Q3HQIOD.js", imports: ["/build/_shared/chunk-NBRO6RFG.js", "/build/_shared/chunk-FSP6GK2P.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/users+/$username_+/notes": { id: "routes/users+/$username_+/notes", parentId: "root", path: "users/:username/notes", index: void 0, caseSensitive: void 0, module: "/build/routes/users+/$username_+/notes-DVSOC5RI.js", imports: ["/build/_shared/chunk-FSP6GK2P.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/users+/$username_+/notes.$noteId": { id: "routes/users+/$username_+/notes.$noteId", parentId: "routes/users+/$username_+/notes", path: ":noteId", index: void 0, caseSensitive: void 0, module: "/build/routes/users+/$username_+/notes.$noteId-KCMVWPNB.js", imports: ["/build/_shared/chunk-RZOEGAMM.js", "/build/_shared/chunk-ZL5Q24C5.js", "/build/_shared/chunk-Y7VT56QR.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-O7MTR2WV.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/users+/$username_+/notes.$noteId_.edit": { id: "routes/users+/$username_+/notes.$noteId_.edit", parentId: "routes/users+/$username_+/notes", path: ":noteId/edit", index: void 0, caseSensitive: void 0, module: "/build/routes/users+/$username_+/notes.$noteId_.edit-XSLEPOCQ.js", imports: ["/build/_shared/chunk-EAQ55TK3.js", "/build/_shared/chunk-RZOEGAMM.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/users+/$username_+/notes.index": { id: "routes/users+/$username_+/notes.index", parentId: "routes/users+/$username_+/notes", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/users+/$username_+/notes.index-CVSNFNSO.js", imports: void 0, hasAction: !1, hasLoader: !1, hasErrorBoundary: !1 }, "routes/users+/$username_+/notes.new": { id: "routes/users+/$username_+/notes.new", parentId: "routes/users+/$username_+/notes", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/users+/$username_+/notes.new-M6HASQUC.js", imports: ["/build/_shared/chunk-EAQ55TK3.js", "/build/_shared/chunk-RZOEGAMM.js", "/build/_shared/chunk-YBPZLMI7.js", "/build/_shared/chunk-44XOYWRB.js", "/build/_shared/chunk-6LMWWETO.js", "/build/_shared/chunk-FS75F6DH.js", "/build/_shared/chunk-SS7EHFNL.js", "/build/_shared/chunk-YTDRTWMN.js", "/build/_shared/chunk-H2TCL2LU.js", "/build/_shared/chunk-RHPIMEJG.js", "/build/_shared/chunk-G7CHZRZX.js", "/build/_shared/chunk-7RTSRIVO.js", "/build/_shared/chunk-TAQPVQBK.js", "/build/_shared/chunk-CHQ4BA76.js", "/build/_shared/chunk-XV5O3AU2.js", "/build/_shared/chunk-R2QIY5GK.js", "/build/_shared/chunk-HGS2R3YL.js", "/build/_shared/chunk-POVIIGBA.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/users+/index": { id: "routes/users+/index", parentId: "root", path: "users/", index: !0, caseSensitive: void 0, module: "/build/routes/users+/index-X2CZUN26.js", imports: ["/build/_shared/chunk-FSP6GK2P.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 } }, version: "20977a79", hmr: { runtime: "/build/_shared/chunk-76ZEIH4H.js", timestamp: 1700854273676 }, url: "/build/manifest-20977A79.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  },
  "routes/_auth+/auth.$provider": {
    id: "routes/_auth+/auth.$provider",
    parentId: "root",
    path: "auth/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: auth_provider_exports
  },
  "routes/_auth+/auth.$provider.callback": {
    id: "routes/_auth+/auth.$provider.callback",
    parentId: "routes/_auth+/auth.$provider",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: auth_provider_callback_exports
  },
  "routes/_auth+/forgot-password": {
    id: "routes/_auth+/forgot-password",
    parentId: "root",
    path: "forgot-password",
    index: void 0,
    caseSensitive: void 0,
    module: forgot_password_exports
  },
  "routes/_auth+/login": {
    id: "routes/_auth+/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/_auth+/logout": {
    id: "routes/_auth+/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/_auth+/onboarding": {
    id: "routes/_auth+/onboarding",
    parentId: "root",
    path: "onboarding",
    index: void 0,
    caseSensitive: void 0,
    module: onboarding_exports
  },
  "routes/_auth+/onboarding_.$provider": {
    id: "routes/_auth+/onboarding_.$provider",
    parentId: "root",
    path: "onboarding/:provider",
    index: void 0,
    caseSensitive: void 0,
    module: onboarding_provider_exports
  },
  "routes/_auth+/reset-password": {
    id: "routes/_auth+/reset-password",
    parentId: "root",
    path: "reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: reset_password_exports
  },
  "routes/_auth+/signup": {
    id: "routes/_auth+/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/_auth+/verify": {
    id: "routes/_auth+/verify",
    parentId: "root",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: verify_exports
  },
  "routes/_marketing+/about": {
    id: "routes/_marketing+/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/_marketing+/index": {
    id: "routes/_marketing+/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: marketing_exports
  },
  "routes/_marketing+/privacy": {
    id: "routes/_marketing+/privacy",
    parentId: "root",
    path: "privacy",
    index: void 0,
    caseSensitive: void 0,
    module: privacy_exports
  },
  "routes/_marketing+/support": {
    id: "routes/_marketing+/support",
    parentId: "root",
    path: "support",
    index: void 0,
    caseSensitive: void 0,
    module: support_exports
  },
  "routes/_marketing+/tos": {
    id: "routes/_marketing+/tos",
    parentId: "root",
    path: "tos",
    index: void 0,
    caseSensitive: void 0,
    module: tos_exports
  },
  "routes/_seo+/robots[.]txt": {
    id: "routes/_seo+/robots[.]txt",
    parentId: "root",
    path: "robots.txt",
    index: void 0,
    caseSensitive: void 0,
    module: robots_txt_exports
  },
  "routes/_seo+/sitemap[.]xml": {
    id: "routes/_seo+/sitemap[.]xml",
    parentId: "root",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_xml_exports
  },
  "routes/admin+/cache": {
    id: "routes/admin+/cache",
    parentId: "root",
    path: "admin/cache",
    index: void 0,
    caseSensitive: void 0,
    module: cache_exports
  },
  "routes/admin+/cache_.lru.$cacheKey": {
    id: "routes/admin+/cache_.lru.$cacheKey",
    parentId: "root",
    path: "admin/cache/lru/:cacheKey",
    index: void 0,
    caseSensitive: void 0,
    module: cache_lru_cacheKey_exports
  },
  "routes/admin+/cache_.sqlite": {
    id: "routes/admin+/cache_.sqlite",
    parentId: "root",
    path: "admin/cache/sqlite",
    index: void 0,
    caseSensitive: void 0,
    module: cache_sqlite_exports
  },
  "routes/admin+/cache_.sqlite.$cacheKey": {
    id: "routes/admin+/cache_.sqlite.$cacheKey",
    parentId: "routes/admin+/cache_.sqlite",
    path: ":cacheKey",
    index: void 0,
    caseSensitive: void 0,
    module: cache_sqlite_cacheKey_exports
  },
  "routes/me": {
    id: "routes/me",
    parentId: "root",
    path: "me",
    index: void 0,
    caseSensitive: void 0,
    module: me_exports
  },
  "routes/resources+/download-user-data": {
    id: "routes/resources+/download-user-data",
    parentId: "root",
    path: "resources/download-user-data",
    index: void 0,
    caseSensitive: void 0,
    module: download_user_data_exports
  },
  "routes/resources+/healthcheck": {
    id: "routes/resources+/healthcheck",
    parentId: "root",
    path: "resources/healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/resources+/note-images.$imageId": {
    id: "routes/resources+/note-images.$imageId",
    parentId: "root",
    path: "resources/note-images/:imageId",
    index: void 0,
    caseSensitive: void 0,
    module: note_images_imageId_exports
  },
  "routes/resources+/user-images.$imageId": {
    id: "routes/resources+/user-images.$imageId",
    parentId: "root",
    path: "resources/user-images/:imageId",
    index: void 0,
    caseSensitive: void 0,
    module: user_images_imageId_exports
  },
  "routes/settings+/profile": {
    id: "routes/settings+/profile",
    parentId: "root",
    path: "settings/profile",
    index: void 0,
    caseSensitive: void 0,
    module: profile_exports
  },
  "routes/settings+/profile.change-email": {
    id: "routes/settings+/profile.change-email",
    parentId: "routes/settings+/profile",
    path: "change-email",
    index: void 0,
    caseSensitive: void 0,
    module: profile_change_email_exports
  },
  "routes/settings+/profile.connections": {
    id: "routes/settings+/profile.connections",
    parentId: "routes/settings+/profile",
    path: "connections",
    index: void 0,
    caseSensitive: void 0,
    module: profile_connections_exports
  },
  "routes/settings+/profile.index": {
    id: "routes/settings+/profile.index",
    parentId: "routes/settings+/profile",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: profile_index_exports
  },
  "routes/settings+/profile.password": {
    id: "routes/settings+/profile.password",
    parentId: "routes/settings+/profile",
    path: "password",
    index: void 0,
    caseSensitive: void 0,
    module: profile_password_exports
  },
  "routes/settings+/profile.password_.create": {
    id: "routes/settings+/profile.password_.create",
    parentId: "routes/settings+/profile",
    path: "password/create",
    index: void 0,
    caseSensitive: void 0,
    module: profile_password_create_exports
  },
  "routes/settings+/profile.photo": {
    id: "routes/settings+/profile.photo",
    parentId: "routes/settings+/profile",
    path: "photo",
    index: void 0,
    caseSensitive: void 0,
    module: profile_photo_exports
  },
  "routes/settings+/profile.two-factor": {
    id: "routes/settings+/profile.two-factor",
    parentId: "routes/settings+/profile",
    path: "two-factor",
    index: void 0,
    caseSensitive: void 0,
    module: profile_two_factor_exports
  },
  "routes/settings+/profile.two-factor.disable": {
    id: "routes/settings+/profile.two-factor.disable",
    parentId: "routes/settings+/profile.two-factor",
    path: "disable",
    index: void 0,
    caseSensitive: void 0,
    module: profile_two_factor_disable_exports
  },
  "routes/settings+/profile.two-factor.index": {
    id: "routes/settings+/profile.two-factor.index",
    parentId: "routes/settings+/profile.two-factor",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: profile_two_factor_index_exports
  },
  "routes/settings+/profile.two-factor.verify": {
    id: "routes/settings+/profile.two-factor.verify",
    parentId: "routes/settings+/profile.two-factor",
    path: "verify",
    index: void 0,
    caseSensitive: void 0,
    module: profile_two_factor_verify_exports
  },
  "routes/users+/$username": {
    id: "routes/users+/$username",
    parentId: "root",
    path: "users/:username",
    index: void 0,
    caseSensitive: void 0,
    module: username_exports
  },
  "routes/users+/$username_+/notes": {
    id: "routes/users+/$username_+/notes",
    parentId: "root",
    path: "users/:username/notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/users+/$username_+/notes.$noteId": {
    id: "routes/users+/$username_+/notes.$noteId",
    parentId: "routes/users+/$username_+/notes",
    path: ":noteId",
    index: void 0,
    caseSensitive: void 0,
    module: notes_noteId_exports
  },
  "routes/users+/$username_+/notes.$noteId_.edit": {
    id: "routes/users+/$username_+/notes.$noteId_.edit",
    parentId: "routes/users+/$username_+/notes",
    path: ":noteId/edit",
    index: void 0,
    caseSensitive: void 0,
    module: notes_noteId_edit_exports
  },
  "routes/users+/$username_+/notes.index": {
    id: "routes/users+/$username_+/notes.index",
    parentId: "routes/users+/$username_+/notes",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: notes_index_exports
  },
  "routes/users+/$username_+/notes.new": {
    id: "routes/users+/$username_+/notes.new",
    parentId: "routes/users+/$username_+/notes",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: notes_new_exports
  },
  "routes/users+/index": {
    id: "routes/users+/index",
    parentId: "root",
    path: "users/",
    index: !0,
    caseSensitive: void 0,
    module: users_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=index.js.map
