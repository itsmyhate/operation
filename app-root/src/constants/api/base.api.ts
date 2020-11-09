import {EnableTypeEnum} from "@/constants/enums/enable-type.enum";

export class BaseApi {
  protected permitAll: string = '/permitAll';
  protected gatewayUrl: string;
  protected systemUrl: string;
  protected enableGateWay: boolean;
  constructor() {
    this.gatewayUrl = process.env.VUE_APP_GATEWAY_URL;
    this.systemUrl = process.env.VUE_APP_SYSTEM_URL;
    this.enableGateWay = EnableTypeEnum.YES.code === process.env.VUE_APP_ENABLE_GATEWAY;
    this.initUrl();
  }
  initUrl() {
    this.systemUrl = (this.enableGateWay ? this.gatewayUrl : this.systemUrl) + '/pf-system';
  }
};
