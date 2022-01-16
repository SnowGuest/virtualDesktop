<!--  -->
<template>
    <main class="desktop" :class="{ desktopShow: loaderDesktop }">
        <shortcutVue v-for="(item,index) in applicationList" :application="item" :id="index" />
    </main>
</template>

<script lang="ts" setup>
// setFileTree
import { ApplicationProp, loadDesktop } from '@/assets/config';
import { useRouter } from 'vue-router';
import { listenerCommand } from '@/utils/ipRender';
import { reactive, provide, ref, Ref } from 'vue';
import shortcutVue from './shortcut.vue';

const loaderDesktop = ref<boolean>(false)
const applicationList = reactive<ApplicationProp[]>([])
const applicationFocusId = ref<number | string>("0")
const router = useRouter()
for (let i = 0; i < 180; i++) {
    applicationList.push({
        id: i,
        isBox: true
    })
}
// console.log(applicationList.map(e => e.id))
listenerCommand("setFileTree", (event: Electron.IpcRendererEvent, tree: any) => {
    const Tree = JSON.parse(tree)
    console.log(Tree)
})
listenerCommand("setDesktopIcon", (event: Electron.IpcRendererEvent, tree: any) => {

})

export interface focusApplication {
    applicationFocusId: Ref<number | string>;
    setFocusId: (id: number | string) => void;
    exchangesApplication: (to: ApplicationProp, from: ApplicationProp) => void;
}
provide<focusApplication>("focus", {
    applicationFocusId,
    setFocusId(id: number | string) {
        applicationFocusId.value = id
    },
    exchangesApplication(to: ApplicationProp, from: ApplicationProp) {
        const fromDate = applicationList.find(e => e.id === from.id)
        const toDate = applicationList.find(e => e.id === to.id)
        if (toDate && fromDate) {
            const toTemporary: ApplicationProp = JSON.parse(JSON.stringify(toDate))
            const fromTemporary: ApplicationProp = JSON.parse(JSON.stringify(fromDate))
            Object.assign(fromDate, toTemporary)
            Object.assign(toDate, fromTemporary)
        }
        // console.log(fromDate, toDate, applicationList.map(e => e.id))
    }
})
export interface API {
    loadDesktop: loadDesktop
}
defineExpose<API>({
    loadDesktop() {
        loaderDesktop.value = true
        setTimeout(() => {
            router.replace({
                name:"air"
            })
        }, 400);
    }
})

applicationList[0].isBox = false
</script>
<style lang="scss" scoped>
.desktop {
    flex: 1;
    padding: 1px;
    justify-self: center;
    background-color: #dceef8;
    // background: url("@/assets/desktopBackground/defalut.jpg") no-repeat;
    background-size: cover;
    display: grid;
    grid-template-columns: repeat(auto-fill, 75px);
    grid-template-rows: repeat(auto-fill, 70px);
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
}
.desktopShow {
    background-color: transparent;
    background: url("@/assets/desktopBackground/defalut.jpg") no-repeat;
    background-size: cover;
}
</style>