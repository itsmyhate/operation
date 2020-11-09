import { HeaderTypeEnum } from '@/constants/enums/header-type.enum';
import { MethodTypeEnum } from '@/constants/enums/method-type.enum';
import {BaseApi} from "@/constants/api/base.api";

class ServiceApi extends BaseApi {
  private prefix: string = process.env.VUE_APP_API_CORE_PREFIX;
  public systemApi: any;
  constructor() {
    super();
    this.initSystemApi();
  }
  initSystemApi() {
    this.systemApi = {
      sysUserInfo: {
        refreshToken: {
          url: this.systemUrl + this.prefix + '/sysUserInfo' + this.permitAll + '/login',
          method: MethodTypeEnum.POST.code,
          header: HeaderTypeEnum.BASE.code
        },
        login: {
          url: this.systemUrl + this.prefix + '/sysUserInfo' + this.permitAll + '/login',
          method: MethodTypeEnum.POST.code,
          header: HeaderTypeEnum.BASE.code
        },
        registerGuest: {
          url: this.systemUrl + this.prefix + '/sysUserInfo' + '/registerGuest',
          method: MethodTypeEnum.POST.code,
          header: HeaderTypeEnum.BASE.code
        }
      },
      sysAppInfo: {
        selectAppAndMenuList: {
          url: this.systemUrl + this.prefix + '/sysAppInfo' + '/selectAppAndMenuList',
          method: MethodTypeEnum.GET.code,
          header: HeaderTypeEnum.AUTH.code
        }
      }
    }
  }
}
export const serviceApi = new ServiceApi();
