import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../data/content.service';
import { SeoService } from '../../core/seo.service';
import { MonoLabelComponent } from '../../shared/mono-label/mono-label.component';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly education = this.content.education;
  readonly certification = this.content.certification;

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'About',
      description:
        'Background, engineering philosophy, and education of Vemala Srinivasulu, Full Stack Developer at Trinity Mobility.',
      url: '/about'
    });
  }
}
