import { ipcRenderer } from "electron"
export type IpcMainName =
    "close" |
    "maxMize" |
    "minMize" |
    "connectionSSH"

type CommandType = "send" | "invoke"
interface arg {
    [index: string]: any
}

export interface folder {

}

export async function onceCommand(name: IpcMainName, type: CommandType = "send", arg?: arg) {
    const Time = new Date().getTime()
    const result = arg ? await ipcRenderer[type](name, JSON.stringify({ arg })) : await ipcRenderer[type](name)
    console.log(`本次通讯延迟${new Date().getTime() - Time}ms`);
    if (result) {
        return Promise.resolve(result)
    }
}

export async function listenerCommand(name: string, callback: (event: Electron.IpcRendererEvent, ...arg: any[]) => void) {
    // const result = arg ? await ipcRenderer[type](name, JSON.stringify({ arg })) : await ipcRenderer[type](name)
    const result = ipcRenderer.on(name, callback)
    if (result) {
        return Promise.resolve(result)
    }
}
listenerCommand("log", (event: Electron.IpcRendererEvent, arg: string) => {
    console.log(JSON.parse(arg))
})