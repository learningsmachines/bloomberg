import type { ServerBuild } from "@remix-run/server-runtime";
import { SEOOptions } from "../types";
export declare function generateSitemap(request: Request, routes: ServerBuild["routes"], options: SEOOptions): Promise<Response>;
