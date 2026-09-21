import { Injectable, signal, computed } from '@angular/core';
import { Profile, Experience, Project, SkillGroup, Education, Certification } from './models';
import { PROFILE_DATA } from './profile.data';
import { EXPERIENCE_DATA } from './experience.data';
import { PROJECTS_DATA } from './projects.data';
import { SKILLS_DATA, CAPABILITY_STATEMENTS, CapabilityStatement } from './skills.data';
import { EDUCATION_DATA, CERTIFICATION_DATA } from './education.data';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  readonly profile = signal<Profile>(PROFILE_DATA).asReadonly();
  readonly experience = signal<Experience[]>(EXPERIENCE_DATA).asReadonly();
  readonly projects = signal<Project[]>(PROJECTS_DATA).asReadonly();
  readonly skills = signal<SkillGroup[]>(SKILLS_DATA).asReadonly();
  readonly capabilityStatements = signal<CapabilityStatement[]>(CAPABILITY_STATEMENTS).asReadonly();
  readonly education = signal<Education[]>(EDUCATION_DATA).asReadonly();
  readonly certification = signal<Certification[]>(CERTIFICATION_DATA).asReadonly();

  // Selected work sorted by order
  readonly orderedProjects = computed(() =>
    [...this.projects()].sort((a, b) => a.order - b.order)
  );

  getProjectBySlug(slug: string): Project | undefined {
    return this.projects().find(p => p.slug === slug);
  }

  getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
    const list = this.orderedProjects();
    const index = list.findIndex(p => p.slug === slug);
    if (index === -1) {
      return {};
    }

    const prev = index > 0 ? list[index - 1] : undefined;
    const next = index < list.length - 1 ? list[index + 1] : undefined;
    return { prev, next };
  }
}
