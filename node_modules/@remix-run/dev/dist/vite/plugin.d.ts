import type * as Vite from "vite";
import { type AppConfig as RemixUserConfig } from "../config";
declare const supportedRemixConfigKeys: readonly ["appDirectory", "assetsBuildDirectory", "future", "ignoredRouteFiles", "publicPath", "routes", "serverBuildPath", "serverModuleFormat"];
type SupportedRemixConfigKey = typeof supportedRemixConfigKeys[number];
export type RemixVitePluginOptions = Pick<RemixUserConfig, SupportedRemixConfigKey> & {
    legacyCssImports?: boolean;
};
export type RemixVitePlugin = (options?: RemixVitePluginOptions) => Vite.Plugin[];
export declare const remixVitePlugin: RemixVitePlugin;
export {};
