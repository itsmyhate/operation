export class GlobalState {
    public action: string;
    public payload: any;
    public callBack: (...args: any[]) => void;
    constructor(options: {
        action?: string,
        payload?: any,
        callBack?: () => void,
    }) {
        this.action = options.action || '',
        this.payload = options.payload || {},
        this.callBack = options.callBack || function(...args) {};
    }
}
