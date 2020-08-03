export class TenantInfo {
    public tenId: string;
    public tenName: string;
    constructor(options: {
        tenId: string,
        tenName: string,
    }) {
        this.tenId = options.tenId || '',
            this.tenName = options.tenName || '';
    }
}
