import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  HostListener,
  ElementRef,
  viewChild,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeService } from '../../theme.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

interface NavItem {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly activeSection = signal<string>('home');

  readonly navItems: NavItem[] = [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Skills', sectionId: 'skills' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'Contact', sectionId: 'contact' }
  ];

  readonly menuButtonRef = viewChild<ElementRef<HTMLButtonElement>>('menuButton');
  readonly firstMenuLinkRef = viewChild<ElementRef<HTMLAnchorElement>>('firstMenuLink');

  private routerSub?: Subscription;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.closeMobileMenu();
        if (typeof window !== 'undefined') {
          setTimeout(() => this.setupIntersectionObserver(), 300);
        }
      });

    if (typeof window !== 'undefined') {
      setTimeout(() => this.setupIntersectionObserver(), 300);
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.observer?.disconnect();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 30);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isMobileMenuOpen() && event.key === 'Escape') {
      this.closeMobileMenu();
    }
  }

  navigateToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.closeMobileMenu();

    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => this.scrollToElement(sectionId), 100);
      });
    } else {
      this.scrollToElement(sectionId);
    }
  }

  private scrollToElement(sectionId: string): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        this.activeSection.set(sectionId);
      }
    }
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    this.observer?.disconnect();

    const sectionIds = this.navItems.map(item => item.sectionId);
    this.observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.1
      }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  toggleMobileMenu(): void {
    const nextState = !this.isMobileMenuOpen();
    this.isMobileMenuOpen.set(nextState);
    this.updateBodyScrollLock(nextState);

    if (nextState) {
      setTimeout(() => {
        this.firstMenuLinkRef()?.nativeElement.focus();
      }, 50);
    } else {
      this.menuButtonRef()?.nativeElement.focus();
    }
  }

  closeMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuOpen.set(false);
      this.updateBodyScrollLock(false);
      this.menuButtonRef()?.nativeElement.focus();
    }
  }

  private updateBodyScrollLock(lock: boolean): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  }
}
