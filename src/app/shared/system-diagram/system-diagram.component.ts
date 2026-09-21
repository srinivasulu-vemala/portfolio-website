import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
  signal,
  inject,
  PLATFORM_ID,
  HostListener,
  OnInit
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DiagramSpec } from '../../data/models';
import { computeDiagramLayout, DiagramLayout } from './system-diagram.layout';

@Component({
  selector: 'app-system-diagram',
  standalone: true,
  templateUrl: './system-diagram.component.html',
  styleUrl: './system-diagram.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemDiagramComponent implements OnInit {
  readonly spec = input.required<DiagramSpec>();

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly isVertical = signal<boolean>(false);

  @HostListener('window:resize', [])
  onResize(): void {
    if (this.isBrowser) {
      this.isVertical.set(window.innerWidth < 640);
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isVertical.set(window.innerWidth < 640);
    }
  }

  readonly layout = computed<DiagramLayout>(() => {
    return computeDiagramLayout(this.spec(), this.isVertical());
  });

  getKindBadge(kind: string): string {
    switch (kind) {
      case 'external':
        return 'EXT';
      case 'client':
        return 'UI';
      case 'store':
        return 'DB';
      case 'service':
      default:
        return 'SRV';
    }
  }
}
