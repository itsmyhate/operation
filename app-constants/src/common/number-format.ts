/**
 * 转换数字
 * @param value
 */
import {NumberUnitEnum} from '../constants/enums/number-unit.enum';

const format = (value: any, unit: string, fix?: number, unitName?: string): string => {
    let result;
    value = Number(value);

    if(isNaN(value)) {
        result = 0;
    } else {
        if(unit === NumberUnitEnum.hundred) {
            value = value/100;
        } else if (unit === NumberUnitEnum.thousand) {
            value = value/1000;
        } else if (unit === NumberUnitEnum.t_thousand) {
            value = value/10000;
        } else if (unit === NumberUnitEnum.h_thousand) {
            value = value/100000;
        } else if (unit === NumberUnitEnum.million) {
            value = value/1000000;
        } else if (unit === NumberUnitEnum.t_million) {
            value = value/10000000;
        } else if (unit === NumberUnitEnum.h_million) {
            value = value/100000000;
        }
        result = value;
        if(!!fix) {
            result = result.toFixed(fix);
        }
    }
    if(!!unitName) {
        return result + unitName;
    }
    return result;
}

export const numberFormat = (value: any, unit: string, fix?: number, unitName?: string): string => {
    return format(value, unit, fix, unitName);
}
