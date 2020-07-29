<template>
    <div class="d-flex">
        <Row class="w-100 ml-2 mr-2">
            <iCol span="6" v-for="item in data">
                <Card class="m-3 app-card-df" :title="item.appName">
                    <iButton @click="goSubApp(item)" type="dashed" size="small">Go to </iButton>
                    <span class="ml-2">{{item.appDesc}}</span>
                </Card>
            </iCol>
        </Row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {SubAppService} from "@/services/notice/sub-app.service";
    import {GET_APP_HISROUTE} from "@/store/app-his-route.module";
    import { getMenusInfo } from '@/services/auth.service';
    import {SysAppInfo} from "@/entity/domain/SysAppInfo";

    export default Vue.extend({
        name: "AppCollect",
        data(): any {
            return {
                data: null,
            }
        },
        created() {
            this.data = getMenusInfo() || [];
        },
        methods: {
            goSubApp(data: SysAppInfo) {
                SubAppService.update(data.appName);
                const redirectUrl = this.$store.getters[GET_APP_HISROUTE](data.appId);
                this.$router.push({path: `${data.activeRule}`});
            }
        }
    });
</script>
<style scoped>
    .app-card-df{
        min-height: 150px;
        max-height: 150px;
    }
</style>
