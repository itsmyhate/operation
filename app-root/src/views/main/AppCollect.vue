<template>
    <div class="d-flex">
        <Row class="w-100 ml-2 mr-2">
            <iCol span="6" v-for="item in data">
                <Card class="m-3 root-card-df" :title="item.appName">
                    <iButton @click="goSubApp(item)" type="dashed" size="small">Go to </iButton>
                    <span class="ml-2">{{item.appDesc}}</span>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script lang="ts">
import appsApi from '@/constants/api/core/apps.api';
import {EnableTypeEnum} from '@/constants/enums/enable-type.enum';
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {RestfulResponse} from '@/entity/model/RestfulResponse';
import {startQiankun} from '@/qiankun.start';
import {globalStateListenerService} from '@/services/global-state-listener.service';
import {getMenusInfo, setMenusInfo} from '@/services/menus.service';
import {SubAppService} from '@/services/notice/sub-app.service';
import ApiService from '@/services/restful-api/api.service';
import {GET_APP_HISROUTE, SET_APP_INFO} from '@/store/app-his-route.module';
import {initGlobalState} from 'qiankun';
import Vue from 'vue';

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
            ApiService.general(appsApi.selectAppList, {}, null).then((res: RestfulResponse) => {
                if (res.code === EnableTypeEnum.YES.code) {
                    this.data = res.data;
                    setMenusInfo(this.data);

                    /*
                    * 注册root观察者
                    * */
                    globalStateListenerService.init(this.$COMMON, this.data);
                    // startQiankun(this.$COMMON, this.data);
                } else {
                    this.$Message.error(res.msg);
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
