<!--  -->
<template>
    <main
        class="desktop"
        :class="{ desktopShow: loaderDesktop }"
        @dragenter.prevent
        @dragover.prevent
        @drop="putDesktopShort"
    >
        <shortcutVue
            v-for="(item,index) in applicationList"
            :key="index"
            :application="item"
            :id="index"
        />
    </main>
</template>

<script lang="ts" setup>
// setFileTree
import { ApplicationProp, loadDesktop } from '@/assets/config';
import { useRouter } from 'vue-router';
import { listenerCommand } from '@/utils/ipRender';
import { reactive, provide, ref, Ref } from 'vue';
import shortcutVue, { Prop as shortcProp } from './shortcut.vue';
let shortcutWidth = 75 + ((window.innerWidth - 2) % 75 / parseInt((window.innerWidth - 2) / 75 + ""))
let shortcutHeight = 70 + ((window.innerHeight - 34) % 70 / parseInt((window.innerHeight - 34) / 70 + ""))
let width = parseInt((window.innerWidth) / shortcutWidth + "")
let height = parseInt((window.innerHeight - 32) / shortcutHeight + "")
const loaderDesktop = ref<boolean>(false); // 是否加载桌面的控制值
const applicationList = reactive<ApplicationProp[]>([])
const applicationFocusId = ref<number | string>("0")
const router = useRouter()
function putDesktopShort(e: DragEvent) {
    const data: shortcProp = JSON.parse(e.dataTransfer?.getData("text/application") as string)
    const { pageX, pageY } = e
    const X = parseInt(pageX / 75 + "")
    const Y = parseInt(pageY / 70 + "")
    let index = (Y - 1) * width + (X - 1)
    if (index > 350) {
        index = (Y - 2) * width + (X - 1)
    }
    console.log(X, Y, width, height)
    const application = applicationList.find(e => e.id === index)
    console.log(index, applicationList, application)
    if (application) {
        exchangesApplication(application, data.application)
    }
    // console.log(index, data)
}
window.addEventListener("resize", () => {
    width = parseInt((window.innerWidth) / shortcutWidth + "")
    height = parseInt((window.innerHeight - 32) / shortcutHeight + "")
    if (window.innerWidth > 1400) {
        calculate(parseInt(width * height + ""), "push")
    } else if (applicationList.length > 180) {
        calculate(170, "delete")
    }
})

function calculate(num: number, type: "push" | "delete" = "push") {
    if (type === "push") {
        const sums = num - applicationList.length
        if (sums > 0) {
            for (let i = 0; i < sums; i++) {
                applicationList.push({
                    id: applicationList.length,
                    isBox: true
                })
            }
        }
    } else {
        if (applicationList.length > num) {
            const sums = applicationList.length - num + 10
            console.log(sums)
            for (let i = 0; i < sums; i++) {
                for (let j = applicationList.length - 1; i < sums; j--) {
                    if (applicationList[j].isBox) {
                        i++
                        applicationList.splice(j, 1)
                    }
                }
            }
        }
    }

}
calculate(parseInt(width * height + ""))

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
function exchangesApplication(to: ApplicationProp, from: ApplicationProp) {
    const fromDate = applicationList.find(e => e.id === from.id)
    const toDate = applicationList.find(e => e.id === to.id)
    if (toDate && fromDate) {
        const toTemporary: ApplicationProp = JSON.parse(JSON.stringify(toDate))
        const fromTemporary: ApplicationProp = JSON.parse(JSON.stringify(fromDate))
        Object.assign(fromDate, toTemporary)
        Object.assign(toDate, fromTemporary)
    }
}
provide<focusApplication>("focus", {
    applicationFocusId,
    setFocusId(id: number | string) {
        applicationFocusId.value = id
    },
    exchangesApplication

})
export interface API {
    loadDesktop: loadDesktop
}
defineExpose<API>({
    loadDesktop() {
        applicationList[0].isBox = false
        loaderDesktop.value = true
        setTimeout(() => {
            router.replace({
                name: "air"
            })
        }, 400);
    }
})

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
    grid-template-columns: repeat(
        auto-fill,
        minmax(75px, 1fr)
    ); // 自适应布局暂时有无法精准计算的问题
    grid-template-rows: repeat(auto-fill, 70px);
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
    justify-content: space-between;
    align-content: space-between;
    // grid-auto-flow: column row; // 我不知道为什么不能竖排
}
.desktopShow {
    background-color: transparent;
    background: url("@/assets/desktopBackground/defalut.jpg") no-repeat;
    background-size: cover;
}
</style>