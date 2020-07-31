export class GlobalState {
    action: string;
    payload: any;
    callBack: ((...args: any[]) => void) | null;
    constructor(options: {
        action?: string,
        payload?: any,
        callBack?: (...args: any[]) => void,
    }) {
        this.action = options.action || '',
            this.payload = options.payload || {},
            this.callBack = options.callBack || null;
    }
}

