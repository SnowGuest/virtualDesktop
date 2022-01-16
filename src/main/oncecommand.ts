import { app, BrowserWindow } from "electron";

export function close(event: Electron.IpcMainEvent, win: BrowserWindow) {
    win.close();
    app.quit();
}
export function maxMize(event: Electron.IpcMainEvent, win: BrowserWindow) {

    win.setFullScreen(!win.fullScreen)
}
export function minMize(event: Electron.IpcMainEvent, win: BrowserWindow) {
    win.minimize()
}
