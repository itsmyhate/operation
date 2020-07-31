import { MethodTypeEnum } from "@/constants/enums/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enums/header-type.enum";

const prefix = process.env.VUE_APP_API_CORE_PREFIX + "/sysAppInfo";
const appsApi = {

  addApp: {
    url: prefix + "/addApp",
    method: MethodTypeEnum.POST.code,
    header: HeaderTypeEnum.AUTH.code
  },
  selectAppList: {
    url: prefix + "/selectAppList",
    method: MethodTypeEnum.GET.code,
    header: HeaderTypeEnum.AUTH.code
  }
};

export default appsApi;
