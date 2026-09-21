import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly siteBaseUrl = 'https://srinivasulu-vemala.github.io';
  private readonly defaultOgImage = 'https://srinivasulu-vemala.github.io/og-image.png';

  updateTags(config: SeoConfig): void {
    const fullTitle = config.title.includes('Vemala Srinivasulu')
      ? config.title
      : `${config.title} | Vemala Srinivasulu`;
    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: config.description });

    const fullUrl = config.url ? `${this.siteBaseUrl}${config.url}` : this.siteBaseUrl;
    const ogImage = config.ogImage ? `${this.siteBaseUrl}${config.ogImage}` : this.defaultOgImage;

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: fullUrl });
    this.meta.updateTag({ property: 'og:image', content: ogImage });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    // Canonical link
    this.updateCanonicalUrl(fullUrl);

    // Dynamic JSON-LD schema injection (e.g. BreadcrumbList on case study pages)
    if (config.schema) {
      this.setJsonLd(config.schema);
    } else {
      this.removeJsonLd();
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(schema: Record<string, unknown>): void {
    const id = 'dynamic-jsonld';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }

  private removeJsonLd(): void {
    const script = this.document.getElementById('dynamic-jsonld');
    if (script) {
      script.remove();
    }
  }
}
