/*{
    formData: {
        labelCol: 8,
        wrapperCol: 14,
        fields: [ {
            label: '',
            prop: '',
            type: '',
            dictionary: '',
            placeholder: '',
            value: undefined,
            rule: {
                required: undefined,
                min: undefined, max: undefined,
            },
            preSlot: '',
            subSlot: '',
        } ]
    }
}*/
export class Form {
    public labelCol: number;
    public wrapperCol: number;
    public fields: FormField[];
    constructor(options: {
        labelCol: number,
        wrapperCol: number,
        fields: FormField[],
    }) {
        this.labelCol = options.labelCol || 0;
        this.wrapperCol = options.wrapperCol || 0;
        this.fields = options.fields || [];
    }
}
export class FormField {
    public label: string;
    public prop: string ;
    public type: string ;
    public placeholder: string ;
    public value: any ;
    public options: any[] = [];
    public subSlot?: string;
    public preSlot?: string;
    public rule?: FormRule ;
    public dictionary?: string ;
    constructor(options: {
        label: string;
        prop: string;
        type: string;
        placeholder: string;
        value: any;
        subSlot?: string;
        preSlot?: string;
        rule?: FormRule;
        dictionary?: string;
    }) {
        this.label = options.label || '';
        this.prop = options.prop || '';
        this.type = options.type || '';
        this.placeholder = options.placeholder || '';
        this.value = options.value || undefined;
        this.subSlot = options.subSlot || undefined;
        this.preSlot = options.preSlot || undefined;
        this.dictionary = options.dictionary || undefined;
        this.rule = options.rule || undefined;
    }
}
export class FormRule {
    public required: boolean;
    public min?: number;
    public max?: number;
    constructor(options: {
        required: boolean,
        min?: number,
        max?: number
    }) {
        this.required = !!options.required;
        this.min = options.min || undefined;
        this.max = options.max || undefined;
    }
}
