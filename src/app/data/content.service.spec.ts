import { TestBed } from '@angular/core/testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide profile data matching the allowed corpus', () => {
    const profile = service.profile();
    expect(profile.name).toBe('Vemala Srinivasulu');
    expect(profile.company).toBe('Trinity Mobility');
    expect(profile.location).toBe('Bengaluru, India');
    expect(profile.email).toBe('vemalasrinivasulu1211@gmail.com');
    expect(profile.phone).toBe('+91 9949783696');
  });

  it('should provide exactly 5 projects in designated order', () => {
    const projects = service.orderedProjects();
    expect(projects.length).toBe(5);
    expect(projects[0]?.slug).toBe('trinityrespond');
    expect(projects[1]?.slug).toBe('kawacham');
    expect(projects[2]?.slug).toBe('namma112-whatsapp');
    expect(projects[3]?.slug).toBe('trinityenergy');
    expect(projects[4]?.slug).toBe('lans-lift');
    expect(projects[4]?.isSolo).toBe(true);
  });

  it('should retrieve a project by its slug', () => {
    const project = service.getProjectBySlug('kawacham');
    expect(project).toBeDefined();
    expect(project?.name).toBe('KaWaCHaM');
    expect(project?.domain).toContain('Disaster Management');
  });

  it('should return undefined for a nonexistent slug', () => {
    const project = service.getProjectBySlug('nonexistent-slug');
    expect(project).toBeUndefined();
  });

  it('should calculate adjacent projects correctly', () => {
    const adjFirst = service.getAdjacentProjects('trinityrespond');
    expect(adjFirst.prev).toBeUndefined();
    expect(adjFirst.next?.slug).toBe('kawacham');

    const adjMiddle = service.getAdjacentProjects('kawacham');
    expect(adjMiddle.prev?.slug).toBe('trinityrespond');
    expect(adjMiddle.next?.slug).toBe('namma112-whatsapp');

    const adjLast = service.getAdjacentProjects('lans-lift');
    expect(adjLast.prev?.slug).toBe('trinityenergy');
    expect(adjLast.next).toBeUndefined();
  });

  it('should provide skills groups and capability statements', () => {
    const skills = service.skills();
    expect(skills.length).toBe(5);
    expect(skills.some(g => g.label === 'Languages & Backend')).toBe(true);

    const caps = service.capabilityStatements();
    expect(caps.length).toBe(3);
  });

  it('should provide education and certification matching corpus', () => {
    const edu = service.education();
    expect(edu.length).toBe(3);
    expect(edu[0]?.institution).toContain('Sri Venkateswara College of Engineering');
    expect(edu[0]?.score).toBe('CGPA 8.5');

    const cert = service.certification();
    expect(cert.length).toBe(1);
    expect(cert[0]?.issuer).toBe('Udemy');
  });
});
