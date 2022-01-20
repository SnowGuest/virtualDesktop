import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from "electron";
interface MenuOption {
  menu: MenuItemConstructorOptions[];
  x: number;
  y: number;
}
export function close(event: Electron.IpcMainEvent, win: BrowserWindow) {
  win.close();
  app.quit();
}
export function maxMize(event: Electron.IpcMainEvent, win: BrowserWindow) {
  win.setFullScreen(!win.fullScreen);
}
export function minMize(event: Electron.IpcMainEvent, win: BrowserWindow) {
  win.minimize();
}
export function showMenu(
  event: Electron.IpcMainEvent,
  win: BrowserWindow,
  args: string,
) {
  const menu = new Menu();
  const arg: MenuOption = JSON.parse(args).arg;
  console.log(arg);
  arg.menu.forEach((e) => {
    menu.append(new MenuItem(e));
  });
  menu.popup({ window: win, x: arg.x, y: arg.y });
}
