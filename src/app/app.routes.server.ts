import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'work/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'trinityrespond' },
        { slug: 'kawacham' },
        { slug: 'namma112-whatsapp' },
        { slug: 'trinityenergy' },
        { slug: 'lans-lift' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
