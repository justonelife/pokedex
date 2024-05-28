import { MenuItem } from "primeng/api";

export const APP_MENU: MenuItem[] = [
  {
    label: 'Home',
    routerLink: '/',
    icon: 'pi pi-home'
  },
  {
    label: 'Explorer',
    routerLink: '/explorer',
    icon: 'pi pi-search'
  },
  {
    label: 'About',
    routerLink: '/',
    icon: 'pi pi-info-circle'
  },
] as const;