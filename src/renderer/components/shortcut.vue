
<template>
    <div>
        <div
            v-if="!prop.application.isBox"
            class="application"
            @mouseenter="tapFocus(prop.id)"
            :class="{ 'application-focus': prop.id === foucus?.applicationFocusId.value }"
        >
            <span class="iconfont icon-Nginx"></span>
            <div class="application-text">nginx{{ prop.id }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ApplicationProp } from '@/assets/config';
import { inject } from 'vue'
import type { focusApplication } from "./Main.vue"
const foucus = inject<focusApplication>("focus")
interface Prop {
    application: ApplicationProp;
    id: number | string
}
const prop = defineProps<Prop>()
function tapFocus(id: number | string) {
    foucus?.setFocusId(id)
}
</script>
<style lang="scss" scoped>
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
    &:hover {
        background-color: rgba(255, 255, 255, 0.16);
    }
    .application-text {
        cursor: default;
        user-select: none;
    }
    span {
        font-size: 36px;
        color: #1ac807;
    }
}
.application-focus {
    border: 1px dashed #ffffff;
}
</style>