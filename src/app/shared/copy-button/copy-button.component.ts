import { Component, ChangeDetectionStrategy, input, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  template: `
    <button
      type="button"
      class="copy-btn"
      (click)="copyToClipboard()"
      [attr.aria-label]="label() || 'Copy to clipboard'"
    >
      <span class="meta-small copy-label">
        {{ copied() ? 'COPIED' : 'COPY' }}
      </span>
    </button>
    <span class="visually-hidden" aria-live="polite">
      {{ announcement() }}
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
    }

    .copy-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 10px;
      border: 1px solid var(--rule);
      border-radius: var(--radius-subtle);
      background: transparent;
      color: var(--ink-2);
      cursor: pointer;
      transition: border-color var(--duration-fast) ease, color var(--duration-fast) ease;
    }

    .copy-btn:hover {
      border-color: var(--signal);
      color: var(--signal);
    }

    .copy-label {
      color: inherit;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyButtonComponent {
  readonly text = input.required<string>();
  readonly label = input<string>();

  private readonly platformId = inject(PLATFORM_ID);
  readonly copied = signal(false);
  readonly announcement = signal('');

  async copyToClipboard(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.set(true);
      this.announcement.set(`Copied ${this.text()} to clipboard`);

      setTimeout(() => {
        this.copied.set(false);
        this.announcement.set('');
      }, 3000);
    } catch (err) {
      this.announcement.set('Failed to copy to clipboard');
    }
  }
}
