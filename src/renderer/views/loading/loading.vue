<template>
    <div class="spinner-container">
        <div class="spinner-path">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
        <defs>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
</template>

<script lang="ts" setup>
import { ref } from "vue"

export interface API {
    updateStatus: (flag: boolean) => Promise<boolean>
}
const opacity = ref<number>(1)
const display = ref<string>("block")
function updateStatus(flag: boolean): Promise<boolean> {
    return new Promise((resolve, reject) => {
        opacity.value = Number(flag)
        if (!flag) {
            setTimeout(() => {
                display.value = "none"
                resolve(true)
            }, 1200);
        }
    })

}
defineExpose<API>({
    updateStatus
})
</script>
<style lang="scss" scoped>
.spinner-container {
    width: 50%;
    height: 50%;
    position: relative;
    filter: url(#gooey);
    transition: all 1.2s;
    display: v-bind(display);
    opacity: v-bind(opacity);
    transform: translateX(14%);
}
.spinner-path {
    position: relative;
    left: 25%;
    top: 50%;
    width: 10rem;
    height: 10rem;

    * {
        animation: spinner 3s infinite;
        &:after {
            content: " ";
            display: block;
            position: absolute;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
        }

        &:nth-child(1) {
            animation-delay: 0.5s;
            &:after {
                background: #4285f4;
            }
        }

        &:nth-child(2) {
            animation-delay: 1s;
            &:after {
                background: #db4437;
            }
        }

        &:nth-child(3) {
            animation-delay: 1.5;
            &:after {
                background: #f4b400;
            }
        }
        &:nth-child(4) {
            animation-delay: 2s;
            &:after {
                background: #0f9d58;
            }
        }
    }
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>