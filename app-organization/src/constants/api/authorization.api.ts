import { MethodTypeEnum } from "@/constants/enums/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enums/header-type.enum";

const prefix = process.env.VUE_APP_API_PREFIX + "/authorization";
const authorizationApi = {
  refreshToken: {
    url: prefix + "/token",
    method: MethodTypeEnum.POST.code,
    header: HeaderTypeEnum.BASE.code
  }
};

export default authorizationApi;
