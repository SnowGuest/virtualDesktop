
<template>
    <div style="position: relative;" ref="application">
        <div
            :draggable="true"
            v-if="!prop.application.isBox"
            class="application"
            @mousedown="tapFocus(prop.id)"
            :class="{ 'application-focus': prop.id === foucus?.applicationFocusId.value }"
        >
            <img :draggable="false" src="@/assets/homeScreenIcon/Nginx.png" />
            <div class="application-text">nginx{{ prop.id }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ApplicationProp } from '@/assets/config';
import { inject, ref } from 'vue'
import type { focusApplication } from "./Main.vue"
const foucus = inject<focusApplication>("focus")
const application = ref<HTMLDivElement>()
interface Prop {
    application: ApplicationProp;
    id: number | string
}
const prop = defineProps<Prop>()
function tapFocus(id: number | string) {
    application.value?.focus()
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
        pointer-events: none;
    }
    img {
        flex: 1;
        object-fit: cover;
        max-height: 60%;
        user-select: none;
        pointer-events: none;
    }
}
.application-focus {
    border: 1px dashed #ffffff;
}
</style>