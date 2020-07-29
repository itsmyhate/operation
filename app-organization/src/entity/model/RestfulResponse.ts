export class RestfulResponse{
    code: string;
    msg: string;
    data: any;
    meta: any;
    constructor(options: {
        code: string,
        msg: string,
        data: any,
        meta: any,
    }) {
        this.code = options.code || '0',
        this.msg = options.msg || '',
        this.data = options.data || {},
        this.meta = options.meta || {}
    }
}
