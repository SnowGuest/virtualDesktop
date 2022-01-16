export enum MenuBarColorStatus {
  white,
  black,
  autoTime,
  customize,
}
export interface ProvideInterface {
  menuBarColor: MenuBarColorStatus;
  loadDesktop: loadDesktop
}
export type loadDesktop = () => void;
export interface ApplicationProp {
  name?: string;
  icon?: string;
  isBox: boolean;
  id?: number | string;
}
