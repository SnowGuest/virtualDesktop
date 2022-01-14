export enum MenuBarColorStatus {
  white,
  black,
  autoTime,
  customize,
}
export interface ProvideInterface {
  menuBarColor: MenuBarColorStatus;
}

export interface ApplicationProp {
  name?: string;
  icon?: string;
  isBox: boolean;
  id: number | string;
}
