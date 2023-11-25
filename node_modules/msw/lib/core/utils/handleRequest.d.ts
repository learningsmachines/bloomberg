import { Emitter } from 'strict-event-emitter';
import { h as ResponseLookupResult, R as RequestHandler } from '../RequestHandler-bb5cbb8f.js';
import { SharedOptions, LifeCycleEventsMap } from '../sharedOptions.js';
import { RequiredDeep } from '../typeUtils.js';
import './request/onUnhandledRequest.js';

interface HandleRequestOptions {
    /**
     * Options for the response resolution process.
     */
    resolutionContext?: {
        baseUrl?: string;
    };
    /**
     * Transforms a `MockedResponse` instance returned from a handler
     * to a response instance supported by the lower tooling (i.e. interceptors).
     */
    transformResponse?(response: Response): Response;
    /**
     * Invoked whenever a request is performed as-is.
     */
    onPassthroughResponse?(request: Request): void;
    /**
     * Invoked when the mocked response is ready to be sent.
     */
    onMockedResponse?(response: Response, handler: RequiredDeep<ResponseLookupResult>): void;
}
declare function handleRequest(request: Request, requestId: string, handlers: Array<RequestHandler>, options: RequiredDeep<SharedOptions>, emitter: Emitter<LifeCycleEventsMap>, handleRequestOptions?: HandleRequestOptions): Promise<Response | undefined>;

export { HandleRequestOptions, handleRequest };
