<template>
    <div class="w-100" id="subApp">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name: 'SubApp',
    props: {
    },
    data() {
        return {
            menu: null,
            subApp: null,
        };
    },
    created() {
        console.log('subApp init........');
    },
    mounted() {
    },
    methods: {
    }
});
</script>

<style scoped>

</style>
