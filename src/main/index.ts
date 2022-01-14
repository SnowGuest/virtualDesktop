import os from "os";
import path from "path";
import { app, BrowserWindow } from "electron";

const isWin7 = os.release().startsWith("6.1");
if (isWin7) app.disableHardwareAcceleration(); // 如果当前是win7 则禁用硬件加速功能

if (!app.requestSingleInstanceLock()) { // 让当前的程序成为一个单一的App
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null; // 构建主要实例

async function createWindow() {
  win = new BrowserWindow({
    width: 1352,
    height: 768,
    frame: false,
    resizable: false, // 禁止拖拽
  });

  if (app.isPackaged) { // 当前是否已经打包了
    win.loadFile(path.join(__dirname, "../index.html")); // 如果打包了则加载上一层的index.html
  } else {
    // 否则加载 指定Url且打开devtools
    const pkg = await import("../../package.json");
    const url = `http://${pkg.env.HOST || "127.0.0.1"}:${pkg.env.PORT}`;
    win.loadURL(url);
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => { // 如果当前所有窗口都销毁了
  win = null;
  if (process.platform !== "darwin") { // 则退出本程序
    app.quit();
  }
});

app.on("second-instance", () => { // 如果有人尝试创建第二个窗口
  if (win) {
    if (win.isMinimized()) win.restore(); // 打开本窗口
    win.focus(); // 本窗口获取焦点
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// @TODO
// auto update
/* if (app.isPackaged) {
  app.whenReady()
    .then(() => import('electron-updater'))
    .then(({ autoUpdater }) => autoUpdater.checkForUpdatesAndNotify())
    .catch((e) =>
      // maybe you need to record some log files.
      console.error('Failed check update:', e)
    )
} */
