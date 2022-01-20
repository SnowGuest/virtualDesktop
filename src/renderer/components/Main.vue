<!--  -->
<template>
    <main
        class="desktop"
        ref="desktop"
        :class="{ desktopShow: loaderDesktop }"
        @dragenter.prevent
        @dragover.prevent
        @drop="putDesktopShort"
        @click.right="showMenu"
    >
        <shortcutVue
            v-for="(item,index) in applicationList"
            :key="index"
            :application="item"
            :sort="index"
        />
    </main>
</template>

<script lang="ts" setup>
import menu from "@/menu/main.json"
import { ApplicationProp, loadDesktop } from '@/assets/config';
import { useRouter } from 'vue-router';
import { listenerCommand, onceCommand } from '@/utils/ipRender';
import { reactive, provide, ref, Ref } from 'vue';
import shortcutVue, { Prop as shortcProp } from './shortcut.vue';
const desktop = ref<HTMLElement>()

let shortcutWidth = 75 + ((window.innerWidth - 2) % 75 / parseInt((window.innerWidth - 2) / 75 + ""))
let shortcutHeight = 75 + ((window.innerHeight - 34) % 75 / parseInt((window.innerHeight - 34) / 75 + ""))
let width = parseInt((window.innerWidth) / shortcutWidth + "")
let height = parseInt((window.innerHeight - 32) / shortcutHeight + "")
const loaderDesktop = ref<boolean>(false); // 是否加载桌面的控制值
const applicationList = reactive<ApplicationProp[]>([])
const applicationFocusId = ref<number | string>("0")
const router = useRouter()
function putDesktopShort(e: DragEvent) {
    const data: shortcProp = JSON.parse(e.dataTransfer?.getData("text/application") as string)
    const { pageX, pageY } = e
    const X = parseInt(pageX / shortcutWidth + "") // 当前用户鼠标最近的X单元格
    const Y = parseInt((pageY - 32) / shortcutHeight + ""); // 当前用户鼠标最近的Y单元格
    let index = (Y - 1) * width + (X - 1); // 计算出来相对于最近的点
    // const mainHight = shortcutHeight * height + 32 + 2; //当前Main高度 + header + Main的padding
    // const mainWidth = shortcutWidth * width + 2; //当前Main宽度
    if (pageX - 2 <= 0) { // 处理左侧贴边的情况
        index = width * Y
        console.log("左侧贴边")
    } else if (pageY >= window.innerHeight - 2) { // 处理底部贴边 保留4px容差值
        index = width * (Y - 1) + X
        console.log("底部贴边")
    } else if (pageX >= window.innerWidth - 2) { // 处理右侧贴边 保留4px容差值
        index = width * ((Y - 1) > 0 ? (Y - 1) : Y) + X
        console.log("右侧贴边")
    }

    console.log(pageX, pageY, X, Y, width, height)
    const application = applicationList.find(e => e.id === index)
    console.log(index, applicationFocusId.value)
    console.log(data)
    if (application && index !== applicationFocusId.value) {
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
    setFocusSort: (sort: number | string) => void;
    exchangesApplication: (to: ApplicationProp, from: ApplicationProp) => void;
}
function exchangesApplication(to: ApplicationProp, from: ApplicationProp) {
    console.log(to, from)
    const fromDate = applicationList.find(e => e.id === from.id)
    const toDate = applicationList.find(e => e.id === to.id)
    console.log(toDate, fromDate, "去到,原本",)

    if (toDate && fromDate) {
        const toTemporary: ApplicationProp = JSON.parse(JSON.stringify(toDate))
        const fromTemporary: ApplicationProp = JSON.parse(JSON.stringify(fromDate))
        if (to.isBox) {
            const newData: ApplicationProp = {
                isBox: true,
                id: toTemporary.id
            }
            Object.assign(fromDate, newData)
        }
        Object.assign(toDate, fromTemporary)
    }
    console.log(applicationList.map(e => e.id))
}
provide<focusApplication>("focus", {
    applicationFocusId,
    setFocusSort(sort: number | string) {
        applicationFocusId.value = sort
    },
    exchangesApplication
})
export interface API {
    loadDesktop: loadDesktop
}
applicationList[0].isBox = false
applicationList[1].isBox = false
applicationList[25].isBox = false
applicationList[26].isBox = false
loaderDesktop.value = true
defineExpose<API>({
    loadDesktop() {
        // desktop.value?.addEventListener("")
        setTimeout(() => {
            router.replace({
                name: "air"
            })
        }, 400);
    }
})
function showMenu(e: MouseEvent) {
    console.log(e)
    console.log(menu)
    onceCommand("showMenu", "send", { menu, x: e.pageX, y: e.pageY })
}

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
    grid-template-rows: repeat(auto-fill, 75px);
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