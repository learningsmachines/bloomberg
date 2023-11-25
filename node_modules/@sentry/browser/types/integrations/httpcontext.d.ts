import type { Event, Integration } from '@sentry/types';
/** HttpContext integration collects information about HTTP request headers */
export declare class HttpContext implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    constructor();
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /** @inheritDoc */
    preprocessEvent(event: Event): void;
}
//# sourceMappingURL=httpcontext.d.ts.map