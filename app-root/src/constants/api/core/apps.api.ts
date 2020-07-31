import { HeaderTypeEnum } from '@/constants/enums/header-type.enum';
import { MethodTypeEnum } from '@/constants/enums/method-type.enum';

const corePrefix = process.env.VUE_APP_API_CORE_PREFIX + '/sysAppInfo';
const appsApi = {
  selectAppList: {
    url: corePrefix + '/selectAppAndMenuList',
    method: MethodTypeEnum.GET.code,
    header: HeaderTypeEnum.AUTH.code
  }
};

export default appsApi;
