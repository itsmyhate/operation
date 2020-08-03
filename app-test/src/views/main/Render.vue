<template>
    <div class="d-flex flex-column">
        <div class="d-flex"><span>Header....</span></div>
        <div class="d-flex" ><span>Footer....</span></div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import TestR from "@/components/TestR";
    export default {
        name: "Render",
        created() {
            const test = new Vue({

                data() {
                    return {parent: true}
                },
                render(createElement, context) {
                    if(this.parent) {
                        return createElement('div', {
                            attrs: {
                            }
                        }, [
                            createElement('div', [createElement(TestR), createElement('button')]),
                        ]);
                    } else {
                        return createElement('div', {
                            attrs: {
                            }
                        }, [
                            createElement('button'),
                        ]);
                    }

                }
            }).$mount();
            document.body.appendChild(test.$el);
            console.log(test.$children)
        },
    }
</script>

<style scoped>

</style>
