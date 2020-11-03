<template>
    <div class="d-flex">
        <a-row class="w-100 ml-2 mr-2">
            <a-col span="6" v-for="item in data">
                <a-card class="m-3 root-card-df" :title="item.appName">
                    <a-button @click="goSubApp(item)" type="dashed" size="small">Go to </a-button>
                    <span class="ml-2">{{item.appDesc}}</span>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script lang="ts">
import {EnableTypeEnum} from '@/constants/enums/enable-type.enum';
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {RestfulResponse} from '@/entity/model/RestfulResponse';
import {startQiankun} from '@/qiankun.start';
import {globalStateListenerService} from '@/services/global-state-listener.service';
import {getMenusInfo, setMenusInfo} from '@/services/menus.service';
import {SubAppService} from '@/services/notice/sub-app.service';
import ClientService from '@/services/restful-client/client.service';
import {GET_APP_HISROUTE, SET_APP_INFO} from '@/store/app-his-route.module';
import {initGlobalState} from 'qiankun';
import Vue from 'vue';
import {ResponseCodeEnum} from "@/constants/enums/response-code.enum";
import {apps} from "@/mock/apps.mock";
import {serviceApi} from "@/constants/api/service.api";

export default Vue.extend({
    name: 'AppCollect',
    data() {
        return {
            data: [],
        };
    },
    created() {
        this.initAppList();
        // this.data = getMenusInfo() || [];
    },
    methods: {
        goSubApp(data: SysAppInfo) {
            SubAppService.update(data.appName);
            this.$store.commit(SET_APP_INFO, data);
            this.$router.push({path: `${data.appActiveRule}`});
        },
        initAppList() {
            ClientService.general(serviceApi.systemApi.sysAppInfo.selectAppAndMenuList, {}, null).then((res: RestfulResponse) => {
                if (true) {
                // if (res.code === ResponseCodeEnum.SUCCESS.code) {
                //     this.data = res.data;
                    this.data = apps;
                    setMenusInfo(this.data);

                    /*
                    * 注册root观察者
                    * */
                    globalStateListenerService.init(this.$COMMON, this.data);
                    // startQiankun(this.$COMMON, this.data);
                } else {
                    this.$message.error(res.message);
                }
            });
        }
    }
});
</script>
<style scoped lang="scss">
    .#{$prefix} {
        &card-df {
            min-height: 150px;
            max-height: 150px;
        }
    }
</style>
