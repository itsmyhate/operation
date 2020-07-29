import Vue from "vue";
import axios, {AxiosRequestConfig} from "axios";
import VueAxios from "vue-axios";
import {EnableTypeEnum} from "@/constants/enums/enable-type.enum";
import {MethodTypeEnum} from "@/constants/enums/method-type.enum";
import {HeaderTypeEnum} from "@/constants/enums/header-type.enum";
import AuthService from "../auth.service";
import {RestfulResponse} from "@/entity/model/RestfulResponse";

interface Query {
    [key: string]: any;
}
const ApiService = {
    init() {
        const auth = Vue.prototype.$COMMON.AuthService;
        Vue.use(VueAxios, axios);
        if (process.env.VUE_APP_ENABLE_MOCK != EnableTypeEnum.YES.code) {
            Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
        }
        const headers = AuthService.createBasicHeaders();
        Object.keys(headers).forEach(function (key) {
            Vue.axios.defaults.headers.common[key] = headers[key];
        });

        Vue.axios.interceptors.request.use(
            function (config) {
                if (AuthService.verificationToken(config)) {
                    return Promise.resolve(config);
                } else {
                    return AuthService.refreshToken().then(response => {
                        if (response) {
                            config.headers.Authorization = "bearer" + auth.getToken().accessToken;
                            return config;
                        } else {
                            auth.AuthService.logout();
                            return Promise.reject("刷新失败");
                        }
                    });
                }
            },
            function (error) {
                console.log("Do something with request error");
                return Promise.reject(error);
            }
        );
    },
    get(path: string, query: Query, requestConfig: AxiosRequestConfig): Promise<RestfulResponse> {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        console.log(path, requestConfig);
        return Vue.axios
            .get(`${path}`, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    },
    post(path: string, params: any, query: Query, requestConfig: AxiosRequestConfig): Promise<RestfulResponse>  {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return Vue.axios
            .post(`${path}`, params, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    },
    put(path: string, params: any, query: Query, requestConfig: AxiosRequestConfig): Promise<RestfulResponse>  {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return Vue.axios
            .put(`${path}`, params, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    },
    delete(path: string, query: Query, requestConfig: AxiosRequestConfig): Promise<RestfulResponse>  {
        path = query != null ? this.urlQueryConvert(path, query) : path;
        return Vue.axios
            .delete(path, requestConfig)
            .then(this.createBusCodeHander())
            .catch(this.createErrorHander());
    },
    general(api: any, query: Query = {}, params: any = null, requestConfig?: AxiosRequestConfig | any): any  {
        if (!!api.url && !!api.method) {
            if (requestConfig == null) {
                switch (api.header) {
                    case HeaderTypeEnum.BASE.code:
                        requestConfig = AuthService.createBasicHeaders();
                        break;
                    case HeaderTypeEnum.AUTH.code:
                        requestConfig = AuthService.createAuthHeaders();
                        break;
                }
            }
            switch (api.method) {
                case MethodTypeEnum.GET.code:
                    return this.get(api.url, query, requestConfig);
                    break;
                case MethodTypeEnum.PUT.code:
                    return this.put(api.url, params, query, requestConfig);
                    break;
                case MethodTypeEnum.POST.code:
                    return this.post(api.url, params, query, requestConfig);
                    break;
                case MethodTypeEnum.DELETE.code:
                    return this.delete(api.url, query, requestConfig);
                    break;
            }
        }
    },
    createBusCodeHander() {
        return function (response: any) {
            if (response.status === 200) {
                return response.data;
            }
            return response;
        };
    },
    createErrorHander() {
        return function (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                return {
                    code: "1000",
                    msg: "响应异常，稍后请重试或联系管理员"
                };
            } else if (error.request) {
                console.log(error.request);
                return {
                    code: "1000",
                    msg: "请求异常，稍后请重试或联系管理员"
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
                return {
                    code: "1000",
                    msg: "未知异常，稍后请重试或联系管理员"
                };
            }
            console.log(error.config);
        };
    },
    urlQueryConvert(url: string, query: Query) {
        let connectiveSymbol = "";
        if (url.indexOf("?") !== -1) {
            connectiveSymbol = "&";
        } else {
            connectiveSymbol = "?";
        }
        if (query) {
            Object.keys(query).forEach((key, idx) => {
                const val = query[key];
                if (idx === 0) {
                    if (val != null && val !== "null" && val !== "undefined") {
                        url += connectiveSymbol + key + "=" + val;
                    } else {
                        url += connectiveSymbol + key + "=";
                    }
                } else {
                    if (val != null && val !== "null" && val !== "undefined") {
                        url += "&" + key + "=" + val;
                    } else {
                        url += "&" + key + "=";
                    }
                }
            });
        }
        return url;
    }
};

export default ApiService;
