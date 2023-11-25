import type { Jsonify } from "./jsonify";
import type { TypedDeferredData, TypedResponse } from "./responses";
/**
 * Infer JSON serialized data type returned by a loader or action.
 *
 * For example:
 * `type LoaderData = SerializeFrom<typeof loader>`
 */
export type SerializeFrom<T> = T extends (...args: any[]) => infer Output ? Serialize<Awaited<Output>> : Jsonify<Awaited<T>>;
type Serialize<Output> = Output extends TypedDeferredData<infer U> ? {
    [K in keyof U as K extends symbol ? never : Promise<any> extends U[K] ? K : never]: DeferValue<U[K]>;
} & Jsonify<{
    [K in keyof U as Promise<any> extends U[K] ? never : K]: U[K];
}> : Output extends TypedResponse<infer U> ? Jsonify<U> : Jsonify<Output>;
type DeferValue<T> = T extends undefined ? undefined : T extends Promise<unknown> ? Promise<Jsonify<Awaited<T>>> : Jsonify<T>;
export {};
