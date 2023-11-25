import { DefineRoutesFunction, RouteManifest } from '@remix-run/dev/dist/config/routes';

type CreateRoutesFromFoldersOptions = {
    /**
     * The directory where your app lives. Defaults to `app`.
     * @default "app"
     */
    appDirectory?: string;
    /**
     * A list of glob patterns to ignore when looking for route modules.
     * Defaults to `[]`.
     */
    ignoredFilePatterns?: string[];
    /**
     * The directory where your routes live. Defaults to `routes`.
     * This is relative to `appDirectory`.
     * @default "routes"
     */
    routesDirectory?: string;
};
/**
 * Defines routes using the filesystem convention in `app/routes`. The rules are:
 *
 * - Route paths are derived from the file path. A `.` in the filename indicates
 *   a `/` in the URL (a "nested" URL, but no route nesting). A `$` in the
 *   filename indicates a dynamic URL segment.
 * - Subdirectories are used for nested routes.
 *
 * For example, a file named `app/routes/gists/$username.tsx` creates a route
 * with a path of `gists/:username`.
 */
declare function createRoutesFromFolders(defineRoutes: DefineRoutesFunction, options?: CreateRoutesFromFoldersOptions): RouteManifest;

export { CreateRoutesFromFoldersOptions, createRoutesFromFolders };
