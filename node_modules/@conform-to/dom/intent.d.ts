import { type Pretty } from './types.js';
export interface IntentButtonProps {
    name: typeof INTENT;
    value: string;
    formNoValidate?: boolean;
}
export type ListIntentPayload<Schema = unknown> = {
    name: string;
    operation: 'insert';
    defaultValue?: Schema;
    index?: number;
} | {
    name: string;
    operation: 'prepend';
    defaultValue?: Schema;
} | {
    name: string;
    operation: 'append';
    defaultValue?: Schema;
} | {
    name: string;
    operation: 'replace';
    defaultValue: Schema;
    index: number;
} | {
    name: string;
    operation: 'remove';
    index: number;
} | {
    name: string;
    operation: 'reorder';
    from: number;
    to: number;
};
type ExtractListIntentPayload<Operation, Schema = unknown> = Pretty<Omit<Extract<ListIntentPayload<Schema>, {
    operation: Operation;
}>, 'name' | 'operation'>>;
type ListIntent<Operation> = {} extends ExtractListIntentPayload<Operation> ? <Schema>(name: string, payload?: ExtractListIntentPayload<Operation, Schema>) => IntentButtonProps : <Schema>(name: string, payload: ExtractListIntentPayload<Operation, Schema>) => IntentButtonProps;
/**
 * Helpers to configure an intent button for modifying a list
 *
 * @see https://conform.guide/api/react#list
 */
export declare const list: {
    /**
     * @deprecated You can use `insert` without specifying an index instead
     */
    append: ListIntent<'append'>;
    /**
     * @deprecated You can use `insert` with zero index instead
     */
    prepend: ListIntent<'prepend'>;
    insert: ListIntent<'insert'>;
    replace: ListIntent<'replace'>;
    remove: ListIntent<'remove'>;
    reorder: ListIntent<'reorder'>;
};
export declare const INTENT = "__intent__";
/**
 * Returns the intent from the form data or search params.
 * It throws an error if multiple intent is set.
 */
export declare function getIntent(payload: FormData | URLSearchParams): string;
/**
 * Returns the properties required to configure an intent button for validation
 *
 * @see https://conform.guide/api/react#validate
 */
export declare function validate(field: string): IntentButtonProps;
export declare function requestIntent(form: HTMLFormElement | null | undefined, buttonProps: {
    value: string;
    formNoValidate?: boolean;
}): void;
export declare function parseIntent<Schema>(intent: string): {
    type: 'validate';
    payload: string;
} | {
    type: 'list';
    payload: ListIntentPayload<Schema>;
} | null;
export declare function updateList<Schema>(list: Array<Schema>, payload: ListIntentPayload<Schema>): Array<Schema>;
export {};
