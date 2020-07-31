<template>
    <div class="w-100" id="testApp">
    </div>
</template>

<script lang="ts">
import {SysMenuInfo} from '@/entity/domain/SysMenuInfo';
import {loadMicroApp, start} from 'qiankun';
import {MicroApp} from 'qiankun/es/interfaces';
import Vue from 'vue';

export default Vue.extend({
    name: 'testApp',
    props: {
    },
    data(): any {
        return {
            menu: null,
            subApp: null,
        };
    },
    created() {
        /*
        * 上层路由出口被keep-alive后：只触发一次created
        * */
        console.log('TestApp init........');
    },
    mounted() {
        /*
        * 上层路由出口被keep-alive后：只触发一次mounted
        * */
        console.log('testApp  mounted.........');
        this.subApp = this.loadSubApp();
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
            return loadMicroApp({
                name: 'test',
                entry: '//localhost:4201/index.html',
                container: `#testApp`
            });
        }
    }
});
</script>

<style scoped>
</style>
