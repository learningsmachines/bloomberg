import { Event, Integration } from '@sentry/types';
/** Deduplication filter */
export declare class Dedupe implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    private _previousEvent?;
    constructor();
    /** @inheritDoc */
    setupOnce(_addGlobaleventProcessor: unknown, _getCurrentHub: unknown): void;
    /**
     * @inheritDoc
     */
    processEvent(currentEvent: Event): Event | null;
}
//# sourceMappingURL=dedupe.d.ts.map
