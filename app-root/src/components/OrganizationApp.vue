<template>
    <div class="w-100" id="organizationApp">
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {loadMicroApp} from "qiankun";
    import {MicroApp} from "qiankun/es/interfaces";

    export default Vue.extend({
        name: "organizationApp",
        props: {
        },
        data(): any {
            return {
                menu: null,
                subApp:  null,
            }
        },
        created() {
            console.log('OrganizationApp init........');
        },
        mounted() {
            console.log('OrganizationApp  mounted.........')
            this.subApp = this.loadSubApp();
        },
        beforeDestroy() {
            console.log('organization unmount.............')
            this.subApp.unmount();
        },
        methods: {
            loadSubApp(): MicroApp {
                return loadMicroApp({
                    name: 'organization',
                    entry: '//localhost:4202/index.html',
                    container: `#organizationApp`
                });
            }
        }
    })
</script>

<style scoped>

</style>
