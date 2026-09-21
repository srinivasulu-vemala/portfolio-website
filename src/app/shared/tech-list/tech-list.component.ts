import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-tech-list',
  standalone: true,
  template: `
    <ul class="tech-list" aria-label="Technologies used">
      @for (item of items(); track item) {
        <li class="tech-item meta-small">{{ item }}</li>
      }
    </ul>
  `,
  styles: [`
    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-8);
      align-items: center;
    }

    .tech-item {
      padding: 3px 8px;
      border: 1px solid var(--rule);
      border-radius: var(--radius-subtle);
      color: var(--ink-2);
      background-color: var(--paper-raised);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechListComponent {
  readonly items = input.required<string[]>();
}
