import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let document: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update title and basic meta tags', () => {
    service.updateTags({
      title: 'Test Page',
      description: 'Test description for SEO',
      url: '/test'
    });

    expect(titleService.getTitle()).toBe('Test Page | Vemala Srinivasulu');
    expect(metaService.getTag("name='description'")?.content).toBe('Test description for SEO');
    expect(metaService.getTag("property='og:title'")?.content).toBe('Test Page | Vemala Srinivasulu');
    expect(metaService.getTag("property='og:url'")?.content).toContain('/test');
  });

  it('should inject and remove dynamic JSON-LD script', () => {
    const testSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'name': 'Test Breadcrumb'
    };

    service.updateTags({
      title: 'Breadcrumb Test',
      description: 'Testing JSON-LD',
      schema: testSchema
    });

    const script = document.getElementById('dynamic-jsonld');
    expect(script).toBeTruthy();
    expect(script?.textContent).toContain('BreadcrumbList');

    // Update without schema should remove it
    service.updateTags({
      title: 'No Schema Test',
      description: 'Testing cleanup'
    });

    const removedScript = document.getElementById('dynamic-jsonld');
    expect(removedScript).toBeNull();
  });
});
