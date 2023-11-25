import { Transaction } from '@sentry/types';
import { ExpressCreateRequestHandler, ExpressRequestHandler, ExpressResponse } from '../vendor/types';
/**
 * Instruments `createRequestHandler` from `@remix-run/express`
 */
export declare function wrapExpressCreateRequestHandler(origCreateRequestHandler: ExpressCreateRequestHandler): (options: any) => ExpressRequestHandler;
export type AugmentedExpressResponse = ExpressResponse & {
    __sentryTransaction?: Transaction;
};
//# sourceMappingURL=express.d.ts.map
