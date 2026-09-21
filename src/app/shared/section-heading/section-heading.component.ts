import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div class="section-heading-block">
      @if (eyebrow()) {
        <span class="meta eyebrow">{{ eyebrow() }}</span>
      }
      <h2 class="heading-2 title">{{ title() }}</h2>
      @if (description()) {
        <p class="body-l description">{{ description() }}</p>
      }
    </div>
  `,
  styles: [`
    .section-heading-block {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      margin-bottom: var(--space-48);
    }

    .eyebrow {
      color: var(--signal);
      font-weight: 500;
    }

    .title {
      color: var(--ink);
    }

    .description {
      margin-top: var(--space-8);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeadingComponent {
  readonly eyebrow = input<string>();
  readonly title = input.required<string>();
  readonly description = input<string>();
}
