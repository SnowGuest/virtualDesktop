<template>
    <div class="SSH" :class="{ SSHLogin: Login }">
        <div class="SSH-left center"></div>
        <div class="SSH-right-form">
            <h1>连接到你的设备</h1>
            <form @submit.prevent="Send" class="SSH-form_content">
                <div>
                    <input class="cell" v-model="user.host" type="string" placeholder="IP" />
                </div>
                <div>
                    <input
                        class="cell"
                        v-model="user.username"
                        type="text"
                        placeholder="用户名：默认不填root"
                    />
                </div>
                <div>
                    <input class="cell" v-model="user.password" type="password" placeholder="密码" />
                </div>
                <div>
                    <input class="cell" v-model="user.port" type="number" placeholder="端口" />
                </div>
                <div class="end">
                    <button class="primaryButton">登录</button>
                </div>
            </form>
        </div>
        <LoadingVue v-model:value="flagValue" />
    </div>
    <div class="delay column center" :class="{ delay_show: preload }">
        <h1>海内存知己,天涯若比邻</h1>
        <h3>我们正在准备你的设备</h3>
    </div>
</template>

<script lang="ts" setup>
import LoadingVue from '@/components/Loading.vue';
import { listenerCommand, onceCommand } from '@/utils/ipRender';
import { reactive, ref } from 'vue';
const opacity = ref<number>(0)

const emit = defineEmits<{
    (event: 'ready'): void
}>()
listenerCommand("desktopReady", (event: Electron.IpcRendererEvent, flag: { flag: boolean }) => {
    if (flag) {
        setTimeout(() => {
           emit("ready") 
        }, 5400);
    }
})


const flagValue = ref<boolean>(false)
const Login = ref<boolean>(false)
const preload = ref<boolean>(false)
interface sshUser {
    host: string;
    username: string;
    password: string;
    port: number;
}
const user = reactive<sshUser>({
    host: "1.117.116.176",
    username: "root",
    password: "SngBlog7147.",
    port: 22
})

setTimeout(() => {
    opacity.value = 1
}, 300);
async function Send() {
    const data = Date.now()
    flagValue.value = true
    const result = await onceCommand("connectionSSH", "invoke", user)
    let newDate = Date.now() - data
    if (newDate < 1400) {
        newDate = 1400 - newDate
    }
    console.log(newDate)
    setTimeout(() => {
        Login.value = result
    }, newDate);
    setTimeout(() => {
        flagValue.value = false
        preload.value = true
    }, newDate + 850);
}
</script>
<style lang="scss" scoped>
.SSH {
    width: 60vw;
    height: 68vh;
    transition: opacity 0.45s,
        transform cubic-bezier(0.86, -0.52, 0.43, 1.01) 0.85s;
    opacity: v-bind(opacity);
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(4px);
    border-radius: 10px;
    box-shadow: 0 33px 100px rgba(0, 0, 0, 0.3);
    display: flex;
    overflow: hidden;
    .SSH-left {
        width: 34%;
    }
    .SSH-right-form {
        display: flex;
        flex-direction: column;
        padding: 70px 0 0 50px;
        flex: 1;
        background: #ffffff;
        h1 {
            margin-bottom: 40px;
            user-select: none;
        }
        .SSH-form_content {
            align-self: center;
            width: 55%;
            display: flex;
            flex-direction: column;
            transform: translate(-10%, -10%);
            flex: 1;
            justify-content: center;
            div {
                padding-bottom: 4vh;
            }
        }
    }
    .hideLoading {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.3);
    }
}
.SSHLogin {
    transform: translateX(-100vw);
}
.delay {
    opacity: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 32px);
    backdrop-filter: blur(4px);
    font-size: 20px;
    pointer-events: none;
    row-gap: 14px;
    h1 {
        opacity: 0;
        transition: opacity 1.4s;
    }
    h3 {
        opacity: 0;
        transition: opacity 6.4s;
    }
}
.delay_show {
    opacity: 1;
    pointer-events: all;
    h1,
    h3 {
        opacity: 1;
    }
}
</style>