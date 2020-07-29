export class ColumnAction {
    name: string;
    text: string;
    callBack: Function;
    constructor(options: {
        name: string,
        text: string,
        callBack: Function,
    }) {
        this.name = options.name || '',
        this.text = options.text || '',
        this.callBack = options.callBack || undefined
    }
}
export class TableColumn {
    name: string;
    text: string;
    dictKey: string;
    format: string;
    ellipsis: boolean;
    isHide: boolean;
    titleSlots: {name: string};
    bodySlots: {name: string};
    constructor(options: {
        name: string,
        text: string,
        dictKey?: string,
        format?: string,
        ellipsis?: boolean,
        isHide?: boolean,
        titleSlots?: {name: string} ,
        bodySlots?: {name: string} ,
    }) {
        this.name = options.name || '',
        this.text = options.text || '',
        this.dictKey = options.dictKey || '',
        this.format = options.format || '',
        this.ellipsis = options.ellipsis || false,
        this.isHide = options.isHide || false,
        this.titleSlots = options.titleSlots || {name: ''},
        this.bodySlots = options.bodySlots || {name: ''}
    }
}
