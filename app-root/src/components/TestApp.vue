<template>
    <div class="w-100" id="testApp">
    </div>
</template>

<script lang="ts">
import {SysAppInfo} from '@/entity/domain/SysAppInfo';
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import {GlobalState} from '@/entity/model/GlobalState';
import {getMenusInfo} from '@/services/menus.service';
import {GET_APP_HISROUTE, GET_APP_INFO} from '@/store/app-his-route.module';
import {initGlobalState, loadMicroApp, start} from 'qiankun';
import {MicroApp} from 'qiankun/es/interfaces';
import Vue from 'vue';
import {globalStateListenerService} from "@/services/global-state-listener.service";

export default Vue.extend({
    name: 'TestApp',
    props: {
    },
    data(): any {
        return {
            appInfo: null,
            menu: null,
            subApp: null,
        };
    },
    created() {
        /*
        * 上层路由出口被keep-alive后：只触发一次created
        * */
        /*const data = this.$store.getters[GET_APP_INFO];
        this.appInfo = {
            name: data.appId,
            entry: data.appUrl,
            container: `#${data.appId}App`,
        };*/
        const apps: any[] = getMenusInfo() || [];
        const data: SysAppInfo = apps.find((ap: any) => ap.appId === this.$COMMON.AppNameEnum.test);
        if(!data) {
            this.$Message.error('未找到应用信息！')
        }
        this.appInfo = {
            name: data.appId,
            entry: data.appUrl,
            container: `#${data.appId}App`,
        };
        console.log('TestApp init........', this.appInfo);
    },
    mounted() {
        /*
        * 上层路由出口被keep-alive后：只触发一次mounted
        * */
        console.log(`${this.appInfo.name}--mounted.........`);
        this.subApp = this.loadSubApp();
        /*
        * 路由快照时，需要执行
        * */
        const hisRoute = this.$store.getters[GET_APP_HISROUTE](this.appInfo.name);
        if (!!hisRoute) {
            console.log(`触发${this.appInfo.name}App setHisRoute start.......`, hisRoute);
            this.$COMMON.globalStateService.dispatch(
                this.appInfo.name,
                new GlobalState({
                    action: this.$COMMON.ActionsKeyEnum.setHisRoute, payload: hisRoute, callBack: () => {
                        console.log('触发testApp setHisRoute callback.......');
                    }
                })
            );
        }
    },
    activated() {
        /*
        * 路由不快照不会执行
        * */
        console.log('testApp activated.............', this.$route);
        const hisRoute = this.$store.getters[GET_APP_HISROUTE](this.appInfo.name);
        if (!!hisRoute) {
            console.log('触发testApp setHisRoute start.......', hisRoute);
            this.$COMMON.globalStateService.dispatch(
                this.appInfo.name,
                new GlobalState({
                    action: this.$COMMON.ActionsKeyEnum.setHisRoute, payload: hisRoute, callBack: () => {
                        console.log('触发testApp setHisRoute callback.......');
                    }
                })
            );
        }
    },
    beforeDestroy() {
        /*
        * 上层路由出口被keep-alive后：不会触发destory，这里不会执行
        * */
        console.log('testApp unmount......');
        this.subApp.unmount();
    },
    methods: {
        loadSubApp(): MicroApp {
            return loadMicroApp(this.appInfo);
        },
        getHisRoute(): string {
            return this.$store.getters[GET_APP_HISROUTE](this.appInfo.name);
        }
    }
});
</script>

<style scoped>
</style>
