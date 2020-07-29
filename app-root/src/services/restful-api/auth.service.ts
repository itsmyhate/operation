import ApiService from "@/services/restful-api/api.service";
import authorizationApi from "@/constants/api/authorization.api";
import {AxiosRequestConfig} from "axios";

const AuthService = {
    createBasicHeaders(): any {
        return {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
    },
    createAuthHeaders(): any {
        const token = this.$COMMON.AuthService.getToken().accessToken;
        return {
            headers: {
                Authorization: "bearer " + token,
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        };
    },
    createFileDownloadAuthorizationHeader() {
        const token = this.$COMMON.AuthService.getToken().accessToken;
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + token,
            },
            responseType: "blob"
        };
    },
    jsonToFormData(params: any) {
        if (params != null) {
            const formData = new FormData();
            Object.keys(params).forEach(key => {
                formData.append(key, params[key]);
            });
            return formData;
        }
    },
    refreshToken(): Promise<any> {
        const params = this.jsonToFormData({
          refresh_token: this.$COMMON.AuthService.getToken().refreshToken,
        });
        const headers = this.createBasicHeaders();
        return ApiService.general(authorizationApi.refreshToken, {}, params, headers).then((response: any) => {
          if (response != null && response.access_token != null) {
              const res = this.$COMMON.AuthService.updateToken(response.access_token);
              return res;
          }
          return false;
        });
    },
    verificationToken(config: AxiosRequestConfig) {
        if (config.headers && config.headers.Authorization) {
            return this.$COMMON.AuthService.checkToken();
        }
        return true;
    },
};

export default AuthService;
