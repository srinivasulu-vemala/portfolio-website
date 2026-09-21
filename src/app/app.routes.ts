import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Vemala Srinivasulu — Full Stack Developer'
  },
  {
    path: 'work/:slug',
    loadComponent: () =>
      import('./features/work/work-detail.component').then(m => m.WorkDetailComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then(m => m.AboutComponent),
    title: 'About — Vemala Srinivasulu'
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: '404 — Page Not Found'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
