import { folder } from "@/utils/ipRender";
import { BrowserWindow } from "electron";
import { CreateSSH, sshUser } from "./utils";

let client: CreateSSH | null = null
export function connectionSSH(event: Electron.IpcMainInvokeEvent, win: BrowserWindow, arg: any) {
    return new Promise(async (resolve, reject) => {
        const result = JSON.parse(arg)
        const user: sshUser = result.arg
        user.username = user.username.length > 0 ? user.username : "root"
        try {
            client = new CreateSSH()
            await client.connect(user)
            client.getSystemFileTree().then((fileTree: folder[]) => {
                if (Array.isArray(fileTree)) {

                }
                win.webContents.send("setFileTree", JSON.stringify(fileTree))
                win.webContents.send("desktopReady", JSON.stringify({ flag: true }))

            })
            const Time = await client?.getSystemInstallTime();
            client.getSystemAllSoftLink().then((result) => {
                if (Time) {
                    win.webContents.send("log", JSON.stringify(result.filter(e => {
                        // return [Time.getTime(), new Date(`${e.lastUpdateTime[0]}${e.lastUpdateTime[1]}${e.lastUpdateTime[2]}`).getTime()]
                        if (Time.getTime() < new Date(`${e.lastUpdateTime[0]}${e.lastUpdateTime[1]}${e.lastUpdateTime[2]}`).getTime()) {
                            return e
                        }
                    })))
                }

            })
            resolve(true)
        } catch (error) {
            console.log(error, '错误')
        }
    })

}
export function getTreeList(event: Electron.IpcMainInvokeEvent, win: BrowserWindow, path: string) {
    return new Promise(async (resolve, reject) => {
        if (client) {
            resolve(await client.getSystemFileTree(path))
        }
    })
}