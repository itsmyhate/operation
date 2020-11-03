export class RestfulResponse {
    public code: number;
    public message: string;
    public data: any;
    public meta: any;
    constructor(options: {
        code: number,
        message: string,
        data: any,
        meta: any,
    }) {
        this.code = options.code || 0,
        this.message = options.message || '',
        this.data = options.data || {},
        this.meta = options.meta || {};
    }
}
