import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Project } from '../../data/models';

@Component({
  selector: 'app-spec-table',
  standalone: true,
  templateUrl: './spec-table.component.html',
  styleUrl: './spec-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecTableComponent {
  readonly project = input.required<Project>();
}
