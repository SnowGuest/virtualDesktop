<template>
    <div
        class="defalutLoading center"
        :class="{ defalutLoadingFirst: ground, defalutLoadingHide: hideLoading }"
    >
        <component :is="index ? SSHVue : loadingVue" ref="loading" @ready="Ready"></component>
        <!-- <loadingVue  /> -->
        <!-- <SSHVue /> -->
    </div>
</template>

<script lang="ts" setup>
import loadingVue, { API as loadingAPI } from './loading.vue';
import SSHVue from "./SSH.vue"
import { inject, ref } from 'vue';
import { ProvideInterface } from '@/assets/config';
const base = inject<ProvideInterface>("base")
const hideLoading = ref<boolean>(false)
const index = ref<number>(0)
const ground = ref<boolean>(false);
const loading = ref<loadingAPI>()
setTimeout(async () => {
    ground.value = true
    await loading.value?.updateStatus(false)
    index.value = 1
}, 2000);
function Ready() {
    base?.loadDesktop()
    hideLoading.value = true
}
</script>
<style lang="scss" scoped>
@keyframes show {
    from {
        background: #000000;
    }
    80% {
        background: #dceef8;
    }
    to {
        background: url("@/assets/LoadingGround.png") no-repeat;
        background-size: cover;
    }
}
@keyframes hide {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
        pointer-events: none;
    }
}
.defalutLoading {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 32px);
    background: rgba(0, 0, 0, 1);
    opacity: 1;
    transition: opacity 0.4s;
}

.defalutLoadingFirst {
    animation: show 0.4s forwards;
}
.defalutLoadingHide {
    // animation: hide 1.4s forwards;
    opacity: 0;
}
</style>