import { SkillGroup } from './models';

export interface CapabilityStatement {
  statement: string;
}

export const CAPABILITY_STATEMENTS: CapabilityStatement[] = [
  {
    statement: 'Designing and maintaining REST APIs and backend microservices for emergency, disaster and smart-city platforms.'
  },
  {
    statement: 'Implementing real-time communication and event workflows with WebSocket, MQTT, Apache Kafka and Firebase Cloud Messaging (FCM).'
  },
  {
    statement: 'Writing and optimizing Microsoft SQL Server queries, relational transactions, validations and stored procedures.'
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    label: 'Languages & Backend',
    items: ['Java', 'SQL', 'JavaScript', 'TypeScript', 'Spring Boot', 'Microservices', 'REST APIs']
  },
  {
    label: 'Frontend',
    items: ['Angular', 'HTML5', 'CSS', 'TypeScript']
  },
  {
    label: 'Database',
    items: ['Microsoft SQL Server', 'Stored Procedures', 'SQL Query Optimization', 'Redis']
  },
  {
    label: 'Real-Time & Integrations',
    items: [
      'MQTT',
      'WebSocket',
      'Apache Kafka',
      'Firebase Cloud Messaging',
      'WhatsApp Business API',
      'Webhooks',
      'Apache NiFi',
      'REST API Integration'
    ]
  },
  {
    label: 'Cloud & Tools',
    items: ['AWS', 'Git', 'GitHub', 'Maven', 'Docker', 'Kubernetes', 'Postman', 'JIRA', 'VS Code', 'Eclipse']
  }
];
