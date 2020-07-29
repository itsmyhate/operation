import { MethodTypeEnum } from "@/constants/enums/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enums/header-type.enum";

const prefix = process.env.VUE_APP_API_PREFIX + "/dictionary";
const dictionaryApi = {
  getDictList: {
    url: prefix + "/getDictList",
    method: MethodTypeEnum.GET.code,
    header: HeaderTypeEnum.AUTH.code
  }
};

export default dictionaryApi;
