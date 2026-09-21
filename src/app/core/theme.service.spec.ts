import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update theme mode and apply data-theme attribute', () => {
    service.setTheme('dark');
    expect(service.themeMode()).toBe('dark');
    expect(service.effectiveTheme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');

    service.setTheme('light');
    expect(service.themeMode()).toBe('light');
    expect(service.effectiveTheme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should cycle theme between light and dark', () => {
    service.setTheme('light');
    service.cycleTheme();
    expect(service.effectiveTheme()).toBe('dark');

    service.cycleTheme();
    expect(service.effectiveTheme()).toBe('light');
  });

  it('should support system theme mode', () => {
    service.setTheme('system');
    expect(service.themeMode()).toBe('system');
    expect(localStorage.getItem('theme')).toBeNull();
  });
});
