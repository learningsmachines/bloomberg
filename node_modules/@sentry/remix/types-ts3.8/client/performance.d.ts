import { ErrorBoundaryProps } from '@sentry/react';
import { Transaction, TransactionContext } from '@sentry/types';
import * as React from 'react';
type Params<Key extends string = string> = {
    readonly [key in Key]: string | undefined;
};
interface RouteMatch<ParamKey extends string = string> {
    params: Params<ParamKey>;
    pathname: string;
    id: string;
    handle: unknown;
}
type UseEffect = (cb: () => void, deps: unknown[]) => void;
type UseLocation = () => {
    pathname: string;
    search?: string;
    hash?: string;
    state?: unknown;
    key?: unknown;
};
type UseMatches = () => RouteMatch[] | null;
/**
 * Creates a react-router v6 instrumention for Remix applications.
 *
 * This implementation is slightly different (and simpler) from the react-router instrumentation
 * as in Remix, `useMatches` hook is available where in react-router-v6 it's not yet.
 */
export declare function remixRouterInstrumentation(useEffect: UseEffect, useLocation: UseLocation, useMatches: UseMatches): (customStartTransaction: (context: TransactionContext) => Transaction | undefined, startTransactionOnPageLoad?: boolean, startTransactionOnLocationChange?: boolean) => void;
/**
 * Wraps a remix `root` (see: https://remix.run/docs/en/v1/guides/migrating-react-router-app#creating-the-root-route)
 * To enable pageload/navigation tracing on every route.
 * Also wraps the application with `ErrorBoundary`.
 *
 * @param OrigApp The Remix root to wrap
 * @param options The options for ErrorBoundary wrapper.
 */
export declare function withSentry<P extends Record<string, unknown>, R extends React.ComponentType<P>>(OrigApp: R, options?: {
    wrapWithErrorBoundary?: boolean;
    errorBoundaryOptions?: ErrorBoundaryProps;
}): R;
export {};
//# sourceMappingURL=performance.d.ts.map
