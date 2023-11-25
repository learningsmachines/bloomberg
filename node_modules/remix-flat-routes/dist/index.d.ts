import type { DefineRouteFunction, RouteManifest } from '@remix-run/dev/dist/config/routes';
declare type RouteInfo = {
    id: string;
    path: string;
    file: string;
    name: string;
    segments: string[];
    parentId?: string;
    index?: boolean;
    caseSensitive?: boolean;
};
declare type DefineRouteOptions = {
    caseSensitive?: boolean;
    index?: boolean;
};
declare type DefineRouteChildren = {
    (): void;
};
export declare type VisitFilesFunction = (dir: string, visitor: (file: string) => void, baseDir?: string) => void;
export declare type FlatRoutesOptions = {
    appDir?: string;
    routeDir?: string | string[];
    defineRoutes?: DefineRoutesFunction;
    basePath?: string;
    visitFiles?: VisitFilesFunction;
    paramPrefixChar?: string;
    ignoredRouteFiles?: string[];
    routeRegex?: RegExp;
};
export declare type DefineRoutesFunction = (callback: (route: DefineRouteFunction) => void) => any;
export type { DefineRouteFunction, DefineRouteOptions, DefineRouteChildren, RouteManifest, RouteInfo, };
export { flatRoutes };
export default function flatRoutes(routeDir: string | string[], defineRoutes: DefineRoutesFunction, options?: FlatRoutesOptions): RouteManifest;
export declare function isRouteModuleFile(filename: string, routeRegex: RegExp): boolean;
export declare function isIndexRoute(routeId: string): boolean;
export declare function getRouteInfo(routeDir: string, file: string, options: FlatRoutesOptions): {
    id: string;
    path: string;
    file: string;
    name: string;
    segments: string[];
    index: boolean;
};
export declare function createRoutePath(routeSegments: string[], index: boolean, options: FlatRoutesOptions): string | undefined;
export declare function getRouteSegments(name: string, index: boolean, paramPrefixChar?: string): string[];
export declare function defaultVisitFiles(dir: string, visitor: (file: string) => void, baseDir?: string): void;
export declare function createRouteId(file: string): string;
export declare function normalizeSlashes(file: string): string;
