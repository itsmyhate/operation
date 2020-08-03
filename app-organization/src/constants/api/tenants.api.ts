import { MethodTypeEnum } from "@/constants/enums/method-type.enum";
import { HeaderTypeEnum } from "@/constants/enums/header-type.enum";

const prefix = process.env.VUE_APP_API_PREFIX + "/tenants_info";
const tenantsApi = {

    initChart: {
        url: prefix + "/initCharts",
        method: MethodTypeEnum.GET.code,
        header: HeaderTypeEnum.AUTH.code
    },
};

export default tenantsApi;
