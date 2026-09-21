import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-hairline-row',
  standalone: true,
  template: `
    <div
      class="hairline-row hairline-top"
      [class.has-hover]="interactive()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .hairline-row {
      width: 100%;
      padding-block: var(--space-24);
      transition: background-color var(--duration-fast) ease, transform var(--duration-fast) var(--ease-editorial);
    }

    .has-hover:hover {
      background-color: var(--paper-raised);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HairlineRowComponent {
  readonly interactive = input<boolean>(false);
}
