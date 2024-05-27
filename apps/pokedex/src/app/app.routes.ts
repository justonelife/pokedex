import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'explorer',
    pathMatch: 'full'
  },
  {
    path: 'explorer',
    loadComponent: () => import('./pages/poke-explorer/poke-explorer.component').then(c => c.PokeExplorerComponent),
  }
];
