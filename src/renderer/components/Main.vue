<!--  -->
<template>
    <main class="desktop">
        <shortcutVue v-for="(item,index) in applicationList" :application="item" :id="item.id" />
    </main>
</template>

<script lang="ts" setup>
import { ApplicationProp } from '@/assets/config';
import { reactive, provide, ref, Ref } from 'vue';
import shortcutVue from './shortcut.vue';
const applicationList = reactive<ApplicationProp[]>([])
const applicationFocusId = ref<number | string>("0")
export interface focusApplication {
    applicationFocusId: Ref<number | string>;
    setFocusId: (id: number | string) => void;
}
provide<focusApplication>("focus", {
    applicationFocusId,
    setFocusId(id: number | string) {
        applicationFocusId.value = id
    }
})
for (let i = 0; i < 180; i++) {
    applicationList.push({
        id: 1,
        isBox: true
    })
}
applicationList[0].isBox = false
</script>
<style lang="scss" scoped>
.desktop {
    flex: 1;
    padding: 1px;
    justify-self: center;
    background: url("@/assets/desktopBackground/defalut.jpg") no-repeat;
    background-size: cover;
    display: grid;
    grid-template-columns: repeat(auto-fill, 75px);
    grid-template-rows: repeat(auto-fill, 70px);
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
}
</style>