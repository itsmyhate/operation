import { MethodTypeEnum } from "@/constants/enums/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enums/header-type.enum";

const prefix = process.env.VUE_APP_API_PREFIX + "/sysUser";
const sysUserApi = {
  findByPage: {
    url: prefix + "/findByPage",
    method: MethodTypeEnum.POST.code,
    header: HeaderTypeEnum.AUTH.code
  }
};

export default sysUserApi;
