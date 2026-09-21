import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-mono-label',
  standalone: true,
  template: `
    <span class="mono-label meta" [class.is-signal]="signal()">
      @if (index()) {
        <span class="mono-index">[{{ index() }}]</span>
      }
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .mono-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .mono-index {
      color: var(--signal);
      font-weight: 500;
    }

    .is-signal {
      color: var(--signal);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonoLabelComponent {
  readonly index = input<string>();
  readonly signal = input<boolean>(false);
}
