import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'system' | 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // The user selected preference ('system', 'light', 'dark')
  readonly themeMode = signal<ThemeMode>(this.getInitialThemeMode());

  // System OS preference
  private readonly systemIsDark = signal<boolean>(this.getSystemDarkPreference());

  // Effective active theme ('light' or 'dark')
  readonly effectiveTheme = computed<'light' | 'dark'>(() => {
    const mode = this.themeMode();
    if (mode === 'system') {
      return this.systemIsDark() ? 'dark' : 'light';
    }
    return mode;
  });

  constructor() {
    if (this.isBrowser) {
      // Listen to OS color scheme changes
      try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
          this.systemIsDark.set(e.matches);
          if (this.themeMode() === 'system') {
            this.applyTheme(e.matches ? 'dark' : 'light');
          }
        });
      } catch (e) {
        // Fallback for older browsers
      }

      // Apply initial theme
      this.applyTheme(this.effectiveTheme());
    }
  }

  setTheme(mode: ThemeMode): void {
    this.themeMode.set(mode);
    if (this.isBrowser) {
      try {
        if (mode === 'system') {
          localStorage.removeItem('theme');
        } else {
          localStorage.setItem('theme', mode);
        }
      } catch (e) {}
      this.applyTheme(this.effectiveTheme());
    }
  }

  cycleTheme(): void {
    const current = this.effectiveTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  private applyTheme(effective: 'light' | 'dark'): void {
    if (!this.isBrowser) return;
    document.documentElement.setAttribute('data-theme', effective);
  }

  private getInitialThemeMode(): ThemeMode {
    if (!this.isBrowser) return 'system';
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch (e) {}
    return 'system';
  }

  private getSystemDarkPreference(): boolean {
    if (!this.isBrowser) return false;
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  }
}
