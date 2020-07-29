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
    labelCol: number;
    wrapperCol: number;
    fields: FormField[];
    constructor(options: {
        labelCol: number,
        wrapperCol: number,
        fields: FormField[],
    }){
        this.labelCol = options.labelCol || 0;
        this.wrapperCol = options.wrapperCol || 0;
        this.fields = options.fields || [];
    }
}
export class FormField {
    label: string;
    prop: string ;
    type: string ;
    placeholder: string ;
    value: any ;
    options: any[] = [];
    subSlot?: string;
    preSlot?: string;
    rule?: FormRule ;
    dictionary?: string ;
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
    }){
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
    required: boolean;
    min?: number;
    max?: number;
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
