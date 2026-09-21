import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  computed,
  effect
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContentService } from '../../data/content.service';
import { SeoService } from '../../core/seo.service';
import { MonoLabelComponent } from '../../shared/mono-label/mono-label.component';
import { SpecTableComponent } from '../../shared/spec-table/spec-table.component';
import { SystemDiagramComponent } from '../../shared/system-diagram/system-diagram.component';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';
import { Project } from '../../data/models';

@Component({
  selector: 'app-work-detail',
  standalone: true,
  imports: [
    RouterLink,
    MonoLabelComponent,
    SpecTableComponent,
    SystemDiagramComponent,
    ScrollRevealDirective
  ],
  templateUrl: './work-detail.component.html',
  styleUrl: './work-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkDetailComponent {
  readonly slug = input.required<string>();

  private readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);

  readonly project = computed<Project | undefined>(() => {
    return this.content.getProjectBySlug(this.slug());
  });

  readonly adjacent = computed(() => {
    return this.content.getAdjacentProjects(this.slug());
  });

  constructor() {
    effect(() => {
      const p = this.project();
      if (!p) {
        this.router.navigate(['/not-found'], { replaceUrl: true });
        return;
      }

      const breadcrumbsSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://srinivasulu-vemala.github.io/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': p.name,
            'item': `https://srinivasulu-vemala.github.io/work/${p.slug}`
          }
        ]
      };

      this.seo.updateTags({
        title: `${p.name} — Case Study`,
        description: p.summary,
        url: `/work/${p.slug}`,
        schema: breadcrumbsSchema
      });
    });
  }
}
