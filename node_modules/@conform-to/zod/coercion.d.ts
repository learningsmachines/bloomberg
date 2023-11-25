import { type ZodType, type ZodTypeAny, type output, ZodEffects } from 'zod';
/**
 * Helpers for coercing string value
 * Modify the value only if it's a string, otherwise return the value as-is
 */
export declare function coerceString(value: unknown, transform?: (text: string) => unknown): unknown;
/**
 * Helpers for coercing file
 * Modify the value only if it's a file, otherwise return the value as-is
 */
export declare function coerceFile(file: unknown): unknown;
/**
 * A file schema is usually defined as `z.instanceof(File)`
 * which is implemented based on ZodAny with `superRefine`
 * Check the `instanceOfType` function on zod for more info
 */
export declare function isFileSchema(schema: ZodEffects<any, any, any>): boolean;
/**
 * @deprecated Conform coerce empty strings to undefined by default
 */
export declare function ifNonEmptyString(fn: (text: string) => unknown): (value: unknown) => unknown;
/**
 * Reconstruct the provided schema with additional preprocessing steps
 * This coerce empty values to undefined and transform strings to the correct type
 */
export declare function enableTypeCoercion<Type extends ZodTypeAny>(type: Type, cache?: Map<ZodTypeAny, ZodTypeAny>): ZodType<output<Type>>;
