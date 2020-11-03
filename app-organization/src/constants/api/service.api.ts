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
          url: this.systemUrl + this.prefix + '/sysUserInfo' + '/refreshToken',
          method: MethodTypeEnum.POST.code,
          header: HeaderTypeEnum.BASE.code
        },
      },
      sysAppInfo: {
        selectAppList: {
          url: this.systemUrl + this.prefix + '/sysAppInfo' + '/selectAppList',
          method: MethodTypeEnum.GET.code,
          header: HeaderTypeEnum.AUTH.code
        },
        addApp: {
          url: this.systemUrl + this.prefix + '/sysAppInfo' + '/addApp',
          method: MethodTypeEnum.POST.code,
          header: HeaderTypeEnum.AUTH.code
        },
      },
      dictionary: {
        getDictList: {
          url: this.systemUrl + this.prefix + '/dictionary' + '/getDictList',
          method: MethodTypeEnum.GET.code,
          header: HeaderTypeEnum.AUTH.code
        }
      },
      tenants: {
        initChart: {
          url: this.systemUrl + this.prefix + '/tenants_info' + '/initCharts',
          method: MethodTypeEnum.GET.code,
          header: HeaderTypeEnum.AUTH.code
        },
      }
    }
  }
}
export const serviceApi = new ServiceApi();
