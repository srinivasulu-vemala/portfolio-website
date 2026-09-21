import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { MonoLabelComponent } from '../../shared/mono-label/mono-label.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MonoLabelComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'Page Not Found (404)',
      description: 'The requested route does not exist.'
    });
  }
}
