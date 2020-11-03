import ClientService from '@/services/restful-client/client.service';
import {AxiosRequestConfig} from 'axios';
import Vue from 'vue';
import {serviceApi} from "@/constants/api/service.api";

export class AuthService {
    protected createBasicHeaders(): any {
        return {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };
    };
    protected createAuthHeaders(): any {
        const token = Vue.prototype.$COMMON.AuthService.getToken().accessToken;
        return {
            headers: {
                Authorization: 'bearer ' + token,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };
    };
    protected createFileDownloadAuthorizationHeader() {
        const token = Vue.prototype.$COMMON.AuthService.getToken().accessToken;
        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + token,
            },
            responseType: 'blob'
        };
    }
    protected jsonToFormData(params: any) {
        if (params != null) {
            const formData = new FormData();
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key]);
            });
            return formData;
        }
    }
    protected refreshToken(): Promise<any> {
        const params = this.jsonToFormData({
          refresh_token: Vue.prototype.$COMMON.AuthService.getToken().refreshToken,
        });
        const headers = this.createBasicHeaders();
        return ClientService.general(serviceApi.systemApi.sysUserInfo.refreshToken, {}, params, headers).then((response: any) => {
          if (response != null && response.access_token != null) {
              const res = Vue.prototype.$COMMON.AuthService.updateToken(response.access_token);
              return res;
          }
          return false;
        });
    }
    protected verificationToken(config: AxiosRequestConfig) {
        if (config.headers && config.headers.Authorization) {
            return Vue.prototype.$COMMON.AuthService.checkToken();
        }
        return true;
    }
};
