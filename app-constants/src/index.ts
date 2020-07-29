import {numberFormat} from './common/number-format';
import {thousandSymbol} from './common/thousand-symbol';
import {ActionsKeyEnum, AppNameEnum} from './constants/enums/index';
import {DictionaryService} from './services/dictionary.service';
import {DictionaryEnum} from './constants/dictionary.enum';
import {globalStateService} from './services/global-state.service';
import {AuthService} from './services/auth.service';
export const COMMON = {
    /*
    * 公共方法
    * */
    numberFormat, thousandSymbol,
    /*
    * 公共枚举
    * */
    ActionsKeyEnum, AppNameEnum, DictionaryEnum,
    /*
   * 公共服务
   * */
    DictionaryService, globalStateService, AuthService,

}
