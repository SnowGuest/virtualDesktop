
<template>
    <div
        class="applicationBox"
        ref="application"
        :class="{ 'applicationBox_inline': !prop.application.isBox }"
        @dragenter.prevent.stop
        @dragover.prevent.stop
        @drop.prevent.stop="putDesktopShort"
    >
        <div
            :draggable="true"
            v-if="!prop.application.isBox"
            class="application"
            @mousedown="tapFocus(prop.sort)"
            @dragstart="startDragPut"
        >
            <img :draggable="false" src="@/assets/homeScreenIcon/Nginx.png" />
            <div class="application-text">nginx{{ prop.sort }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ApplicationProp } from '@/assets/config';
import { inject, ref } from 'vue'
import type { focusApplication } from "./Main.vue";
import imgsrc from "@/assets/homeScreenIcon/Nginx.png"
const foucus = inject<focusApplication>("focus");
const application = ref<HTMLDivElement>()
export interface Prop {
    application: ApplicationProp;
    sort: number | string
}
const prop = defineProps<Prop>()
function tapFocus(sort: number | string) {
    application.value?.focus()
    foucus?.setFocusSort(sort)
}
function putDesktopShort(e: DragEvent) {
    // console.log("自己的id", prop.application)
    console.log("上一家的id", e.dataTransfer?.getData("text/application"))
    if (typeof e.dataTransfer?.getData("text/application") === "string") {
        const touchApplication: Prop = JSON.parse(e.dataTransfer?.getData("text/application"))
        foucus?.exchangesApplication(prop.application, touchApplication.application)
    }
}
function startDragPut(e: DragEvent) {
    // const canvas = document.createElement("canvas");
    // canvas.width = canvas.height = 50;
    // const ctx = canvas.getContext("2d");
    // const img = new Image()
    // img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' %3E%3Cpath /%3E%3C/svg%3E"
    // if (ctx) {
    //     ctx.drawImage(img, 0, 0);
    // }
    // e.dataTransfer?.setDragImage(canvas, 0, 0);
    e.dataTransfer?.setData("text/application", JSON.stringify(prop))
}

</script>
<style lang="scss" scoped>
.applicationBox {
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 64px;
    min-height: 70px;
    max-width: 100%;
    max-height: 100%;
}
.applicationBox_inline {
    &:hover {
        background-color: rgba(255, 255, 255, 0.16);
    }
}
.application {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 4px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    transition: all 0.3s;
    background: transparent;

    .application-text {
        cursor: default;
        user-select: none;
        pointer-events: none;
    }
    img {
        flex: 1;
        object-fit: cover;
        max-height: 42px;
        user-select: none;
        pointer-events: none;
    }
}
</style>