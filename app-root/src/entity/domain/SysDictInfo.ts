export class SysDictInfo {
    code: string;
    name: string;
    text: string;
    constructor(options: {
        code: string,
        name: string,
        text: string,
    }) {
        this.code = options.code || '',
        this.name = options.name || '',
        this.text = options.text || ''
    }
}
