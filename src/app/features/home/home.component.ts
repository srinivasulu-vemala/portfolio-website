import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../data/content.service';
import { SeoService } from '../../core/seo.service';
import { ScrollRevealDirective } from '../../core/scroll-reveal.directive';

interface TechPill {
  name: string;
  category: 'primary' | 'secondary';
  iconType: string;
}

interface CareerCard {
  id: number;
  title: string;
  stack: string;
  description: string;
  iconType: string;
  themeClass: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    ScrollRevealDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly content = inject(ContentService);
  private readonly seo = inject(SeoService);

  readonly profile = this.content.profile;
  readonly projects = this.content.orderedProjects;
  readonly skills = this.content.skills;
  readonly experience = this.content.experience;
  readonly capabilities = this.content.capabilityStatements;

  readonly emailCopied = signal(false);

  // 1. Primary Technology Pills
  readonly techPillsRow1: TechPill[] = [
    { name: 'Java', category: 'primary', iconType: 'java' },
    { name: 'Spring Boot', category: 'primary', iconType: 'spring' },
    { name: 'Angular', category: 'primary', iconType: 'angular' },
    { name: 'SQL Server', category: 'primary', iconType: 'sqlserver' },
    { name: 'AWS', category: 'primary', iconType: 'aws' }
  ];

  readonly techPillsRow2: TechPill[] = [
    { name: 'REST APIs', category: 'secondary', iconType: 'api' },
    { name: 'Microservices', category: 'secondary', iconType: 'microservices' },
    { name: 'Kafka', category: 'secondary', iconType: 'kafka' },
    { name: 'MQTT', category: 'secondary', iconType: 'mqtt' }
  ];

  // 2. Right Side 4 Floating Career Cards
  readonly careerCards: CareerCard[] = [
    {
      id: 1,
      title: 'Web Application Development',
      stack: 'Java • Spring Boot • Angular',
      description: 'Building modern, scalable web applications with Angular & Spring Boot.',
      iconType: 'code',
      themeClass: 'card-theme-blue'
    },
    {
      id: 2,
      title: 'Cloud & DevOps',
      stack: 'AWS • Git • Docker',
      description: 'Deploying and managing modern applications and cloud services on AWS.',
      iconType: 'cloud',
      themeClass: 'card-theme-cyan'
    },
    {
      id: 3,
      title: 'Backend & APIs',
      stack: 'REST APIs • Microservices • SQL Server',
      description: 'Designing reliable backend services, APIs, and data-driven applications.',
      iconType: 'database',
      themeClass: 'card-theme-indigo'
    },
    {
      id: 4,
      title: 'Real-Time & Integrations',
      stack: 'Kafka • MQTT • WebSocket • WhatsApp API',
      description: 'Building real-time event streaming and external system integrations.',
      iconType: 'realtime',
      themeClass: 'card-theme-emerald'
    }
  ];

  ngOnInit(): void {
    this.seo.updateTags({
      title: 'Vemala Srinivasulu | Full Stack Developer',
      description:
        'Vemala Srinivasulu is a Full Stack Developer specializing in Java, Spring Boot, Angular, SQL Server and AWS.',
      url: '/'
    });
  }

  copyEmail(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const email = this.profile().email;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2200);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    } else {
      window.location.href = `mailto:${email}`;
    }
  }

  getTechTriplet(stack: string[]): string {
    return stack.slice(0, 3).join(' · ');
  }
}
