
<template>
    <header class="menuBar between">
        <nav class="menuBar_left">
            <img class="logoImg" src="@/assets/logo.png" />
        </nav>
        <nav class="align-end menuBar_right">
            <div class="center" @click="minMize">
                <span
                    title="最小化"
                    class="iconfont icon-2zuixiaohua-1"
                    style="transform: translateY(25%);"
                ></span>
            </div>
            <div class="center" @click="maxMize">
                <span title="全屏" class="iconfont icon-zuidahua" style="transform: translateY(10%);"></span>
            </div>
            <div class="center" @click="close">
                <span
                    title="关闭桌面"
                    class="iconfont icon-zhuxiaoguanji"
                    style="transform: translateY(5%);"
                ></span>
            </div>
        </nav>
    </header>
</template>

<script lang="ts" setup>
import { ProvideInterface, MenuBarColorStatus } from "@/assets/config"
import { inject, ref } from "vue";
import { onceCommand } from "@/utils/ipRender"
const base = inject<ProvideInterface>("base")
const groundColor = ref<string>("#000000");
const fontColor = ref<string>("#FFFFFF");
const autoTiming = ref<NodeJS.Timer>()
if (base?.menuBarColor === MenuBarColorStatus.autoTime) {
    timingColor()
    autoTiming.value = setInterval(timingColor, 1000 * 60 * 60)
} else if (base?.menuBarColor === MenuBarColorStatus.customize) {

} else {
    groundColor.value = MenuBarColorStatus.white ? "#FFFFFF" : "#000000";
    fontColor.value = MenuBarColorStatus.white ? "#000000" : "#FFFFFF"
}
function close() {
    onceCommand("close")
}
function maxMize() {
    onceCommand("maxMize")
}
function minMize() {
    onceCommand("minMize")
}
function timingColor() {
    const date = new Date();
    groundColor.value = date.getHours() >= 4 && date.getHours() < 18 ? "#FFFFFF" : "#000000";
    fontColor.value = date.getHours() >= 4 && date.getHours() < 18 ? "#000000" : "#FFFFFF";
}
</script>
<style lang="scss" scoped>
.logoImg {
    height: 100%;
    object-fit: cover;
    user-select: none;
}

.menuBar {
    display: flex;
    height: 32px;
    background-color: v-bind(groundColor);
    // box-shadow: 0px 0px 3px 3px v-bind(groundColor);
    -webkit-app-region: drag;

    .menuBar_left {
        height: 100%;
    }
    .menuBar_right {
        height: 100%;
        .center {
            width: 30px;
            -webkit-app-region: no-drag;
            height: 100%;
            cursor: pointer;
            overflow: hidden;
            position: relative;
            &::after {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                transform: scale(0);
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.4);
                transition: all 0.3s;
                border-radius: 2px;
            }
            &:hover {
                &::after {
                    transform: scale(1);
                }
            }
        }
        .center:last-child {
            width: 34px;
        }
        color: v-bind(fontColor);
    }
}
</style>