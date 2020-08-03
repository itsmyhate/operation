<template>
    <div class="w-100" id="finaccApp">
    </div>
</template>

<script lang="ts">
    import {SysAppInfo} from '@/entity/domain/SysAppInfo';
    import {getMenusInfo} from '@/services/menus.service';
    import {GET_APP_INFO} from '@/store/app-his-route.module';
    import {initGlobalState, loadMicroApp} from 'qiankun';
    import {MicroApp} from 'qiankun/es/interfaces';
    import Vue from 'vue';
    import {globalStateListenerService} from "@/services/global-state-listener.service";

    export default Vue.extend({
        name: 'FinaccApp',
        props: {},
        data(): any {
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
            const data: SysAppInfo = apps.find((ap: any) => ap.appId === this.$COMMON.AppNameEnum.finAcc);
            if(!data) {
                this.$Message.error('未找到应用信息！')
            }
            this.appInfo = {
                name: data.appId,
                entry: data.appUrl,
                container: `#${data.appId}App`,
            };
            console.log('finaccApp init........', this.appInfo);
        },
        mounted() {
            console.log('finaccApp  mounted.........');
            this.subApp = this.loadSubApp();
        },
        beforeDestroy() {
            console.log('finaccApp unmount.............');
            this.subApp.unmount();
        },
        methods: {
            loadSubApp(): MicroApp {
                const subApp = loadMicroApp(this.appInfo);
                return subApp;
            }
        }
    });
</script>

<style scoped>

</style>
