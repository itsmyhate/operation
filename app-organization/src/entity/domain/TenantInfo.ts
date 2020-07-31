export class TenantInfo {
    tenId: string;
    tenName: string;
    constructor(options: {
        tenId: string,
        tenName: string,
    }) {
        this.tenId = options.tenId || '',
            this.tenName = options.tenName || ''
    }
}
