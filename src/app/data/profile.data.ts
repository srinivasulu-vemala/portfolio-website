import { Profile } from './models';

export const PROFILE_DATA: Profile = {
  name: 'Vemala Srinivasulu',
  role: 'Associate Software Developer',
  company: 'Trinity Mobility',
  location: 'Bengaluru, India',
  email: 'vemalasrinivasulu1211@gmail.com',
  phone: '+91 9949783696',
  positioningLine: 'I build the backend systems behind emergency response, disaster warning and city infrastructure.',
  links: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/vemala-srinivasulu',
      handle: 'vemala-srinivasulu'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/srinivasulu-vemala',
      handle: 'srinivasulu-vemala'
    }
  ],
  summary: [
    'Full Stack Developer with 2+ years of experience building and supporting enterprise applications using Java, Spring Boot, Angular, and Microsoft SQL Server at Trinity Mobility in Bengaluru.',
    'Works on backend services, REST APIs, and real-time data flows running inside public-safety and civic infrastructure platforms, including state emergency response numbers, state disaster early-warning systems, city lighting infrastructure, and citizen communication over WhatsApp.',
    'Graduated with a B.Tech in Civil Engineering before transitioning from physical infrastructure to the software systems that operate infrastructure. Independently built and deployed a production business website on AWS.'
  ]
};
