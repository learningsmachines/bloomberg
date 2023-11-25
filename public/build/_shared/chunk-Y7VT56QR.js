import {
  useRouteLoaderData
} from "/build/_shared/chunk-PHQUHPUM.js";
import {
  createHotContext
} from "/build/_shared/chunk-76ZEIH4H.js";

// app/utils/user.ts
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/utils/user.ts"
  );
  import.meta.hot.lastModified = "1700840307493.3254";
}
function isUser(user) {
  return user && typeof user === "object" && typeof user.id === "string";
}
function useOptionalUser() {
  const data = useRouteLoaderData("root");
  if (!data || !isUser(data.user)) {
    return void 0;
  }
  return data.user;
}
function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export {
  useOptionalUser,
  useUser
};
//# sourceMappingURL=/build/_shared/chunk-Y7VT56QR.js.map
