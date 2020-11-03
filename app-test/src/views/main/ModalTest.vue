<template>
    <div class="d-flex flex-column">
        <div class="d-flex">
            <button type="button" class="btn btn-primary mr-1"
                    @click="click">+ 新增</button>
        </div>
        <div>
            <a-modal v-model="visible" :title="'title'" @cancel="cancel" :show-footer="true">
                <template><h1>Content........</h1></template>
                <template><h1>Content........</h1></template>
                <template><h1>Content........</h1></template>
<!--                <template v-slot:footer><h1>footer</h1></template>-->
            </a-modal>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ModalTest",
        data() {
            return {
                visible: true,
            }
        },
        methods: {
            click(msg) {
                this.visible = !this.visible;
                console.log(this.visible)
                // this.$Modal.info({
                //     title: 'i\'m title',
                //     body: '<h1 >content....</h1>',
                //     onOk: () => {console.log('hahaha....OK')},
                //     onCancel: () => {console.log('hahaha....Cancel')},
                // });

            },
            cancel() {
                console.log(this.visible);
            }
        }
    }
</script>

<style scoped>

</style>
