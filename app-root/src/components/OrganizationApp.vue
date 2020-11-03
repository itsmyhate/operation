<template>
    <div class="w-100" id="organizationApp">
    </div>
</template>

<script lang="ts">
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {getMenusInfo} from '@/services/menus.service';
import {initGlobalState, loadMicroApp} from 'qiankun';
import {MicroApp} from 'qiankun/es/interfaces';
import Vue from 'vue';
import {globalStateListenerService} from "@/services/global-state-listener.service";
import {GET_APP_HISROUTE, GET_APP_INFO, SET_APP_HISROUTE_ACTION} from '@/store/app-his-route.module';

export default Vue.extend({
    name: 'OrganizationApp',
    props: {
    },
    data() {
        return {
            appInfo: null,
            menu: null,
            subApp:  null,
        };
    },
    created() {

        /*const data = this.$store.getters[GET_APP_INFO];
        this.appInfo = {
            name: data.appId,
            entry: data.appUrl,
            container: `#${data.appId}App`,
        };*/
        const apps: any[] = getMenusInfo() || [];
        const data: SysAppInfo = apps.find((ap: any) => ap.appId === this.$COMMON.AppNameEnum.organization);
        if(!data) {
            this.$message.error('未找到应用信息！')
        }
        this.appInfo = {
            name: data.appId,
            entry: data.appUrl,
            container: `#${data.appId}App`,
        };
        console.log('OrganizationApp init........', this.appInfo);
    },
    mounted() {
        console.log('OrganizationApp  mounted.........');
        this.subApp = this.loadSubApp();
    },
    activated() {
        console.log('organization activated.............', this.$route);
        const hisRoute = this.$store.getters[GET_APP_HISROUTE](this.appInfo.name);
        if (!!hisRoute) {
            console.log('触发organization setHisRoute start.......', hisRoute);
            this.$COMMON.globalStateService.dispatch(
                this.appInfo.name,
                {
                    action: this.$COMMON.ActionsKeyEnum.setHisRoute, payload: hisRoute, callBack: () => {
                        console.log('触发organization setHisRoute callback.......');
                    }
                }
            );
        }
    },
    beforeDestroy() {
        console.log('organization unmount.............');
        this.subApp.unmount();
    },
    methods: {
        loadSubApp() {
            return loadMicroApp(this.appInfo);
        }
    }
});
</script>

<style scoped>

</style>
