import { GLOBAL_OBJ } from '@sentry/utils';
import type { FutureConfig, ServerBuild } from './vendor/types';
export type EnhancedGlobal = typeof GLOBAL_OBJ & {
    __remixContext?: {
        future?: FutureConfig;
        state?: {
            loaderData?: {
                root?: {
                    remixVersion?: number;
                };
            };
        };
    };
};
/**
 * Get the future flags from the Remix browser context
 *
 * @returns The future flags
 */
export declare function getFutureFlagsBrowser(): FutureConfig | undefined;
/**
 * Get the future flags from the Remix server build
 *
 * @param build The Remix server build
 *
 * @returns The future flags
 */
export declare function getFutureFlagsServer(build: ServerBuild): FutureConfig | undefined;
/**
 * Learn Remix version from the server build object
 * V2 Server builds have a non-optional `mode` property
 *
 * @returns The major version number
 */
export declare function getRemixVersionFromBuild(build: ServerBuild): number;
/**
 * Read Remix version from the Remix context on the browser
 *
 * @returns The major version number
 */
export declare function readRemixVersionFromLoader(): number | undefined;
//# sourceMappingURL=futureFlags.d.ts.map