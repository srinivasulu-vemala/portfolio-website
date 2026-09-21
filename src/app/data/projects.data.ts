import { Project } from './models';

export const PROJECTS_DATA: Project[] = [
  {
    slug: 'trinityrespond',
    name: 'trinityRESPOND',
    subtitle: 'Computer-Aided Dispatch (CAD) and Emergency Response platform',
    domain: 'Emergency Response & Public Safety',
    deployments: ['Namma112', 'Maharashtra 112'],
    organisation: 'Trinity Mobility',
    roleLine: 'Backend Services, Real-Time Streams & Production Support',
    period: '2024 – Present',
    stack: ['Java', 'Spring Boot', 'Angular', 'SQL Server', 'REST APIs', 'WebSocket', 'FCM'],
    summary: 'Computer-Aided Dispatch (CAD) and Emergency Response platform deployed for Namma112 and Maharashtra 112 state emergency services.',
    systemDescription: [
      'trinityRESPOND is an enterprise Computer-Aided Dispatch (CAD) and Emergency Response platform operated by state emergency management authorities, including Namma112 and Maharashtra 112.',
      'The platform manages emergency call intake, incident logging, location tracking, unit assignment, and multi-agency dispatch workflows where system reliability directly impacts response operations.'
    ],
    contributionGroups: [
      {
        title: 'Dispatch workflows',
        points: [
          'Worked on backend services for incident creation, assignment, monitoring and dispatch workflows.',
          'Developed and maintained REST APIs for application operations and operational data exchange.',
          'Supported location and map-based functionality for tracking and dispatching emergency units.'
        ]
      },
      {
        title: 'Real-time communication',
        points: [
          'Implemented and supported real-time communication using WebSocket for live event streaming to operator consoles.',
          'Integrated Firebase Cloud Messaging (FCM) to deliver immediate alerts and updates to field devices and clients.'
        ]
      },
      {
        title: 'Data layer',
        points: [
          'Worked with Microsoft SQL Server queries and stored procedures to handle critical transaction workflows and state transitions.',
          'Optimized queries to support dispatch monitoring and status updates across concurrent active incidents.'
        ]
      },
      {
        title: 'Production support',
        points: [
          'Performed production debugging, log analysis, and root-cause analysis to resolve operational incidents.',
          'Participated in development, testing, deployment, and ongoing production support.'
        ]
      }
    ],
    engineeringNotes: [
      'Dispatch state must remain strictly synchronized across multiple operator consoles, which is why WebSocket channels and FCM push messaging are integrated into the architecture.',
      'Emergency intake requires high transaction consistency; incident status transitions and unit assignments are governed by transactional stored procedures in SQL Server.',
      'Map and location tracking services rely on continuous backend coordinate feeds to maintain live situational awareness for dispatchers.'
    ],
    diagram: {
      nodes: [
        { id: 'citizen', label: 'Citizen Alert / Call', kind: 'external' },
        { id: 'client', label: 'Dispatcher Console (Angular)', kind: 'client' },
        { id: 'api', label: 'CAD & Dispatch Services (Spring Boot)', kind: 'service' },
        { id: 'realtime', label: 'WebSocket & FCM Broker', kind: 'service' },
        { id: 'db', label: 'SQL Server (State & Stored Procs)', kind: 'store' }
      ],
      edges: [
        { from: 'citizen', to: 'client', label: 'Emergency Intake' },
        { from: 'client', to: 'api', label: 'Create / Dispatch Incident' },
        { from: 'api', to: 'db', label: 'Execute Stored Procedures' },
        { from: 'api', to: 'realtime', label: 'Broadcast Dispatch Event' },
        { from: 'realtime', to: 'client', label: 'Live Console Sync', direction: 'return' }
      ],
      caption: 'Incident intake, dispatch coordination, and real-time state broadcast flow',
      altText: 'Flow diagram showing incident creation through CAD backend services, SQL Server state persistence, and WebSocket/FCM updates to dispatcher consoles.'
    },
    isSolo: false,
    order: 1
  },
  {
    slug: 'kawacham',
    name: 'KaWaCHaM',
    subtitle: 'Kerala Warnings, Crisis & Hazard Management System',
    domain: 'Disaster Management & Early Warning',
    deployments: ['Kerala State Early Warning'],
    organisation: 'Trinity Mobility',
    roleLine: 'Disaster Data Workflows & External Weather Integrations',
    period: '2024 – Present',
    stack: ['Java', 'Spring Boot', 'Angular', 'SQL Server', 'REST APIs', 'External Weather APIs'],
    summary: 'Kerala Warnings, Crisis & Hazard Management System for disaster management, early hazard detection, and multi-source forecast processing.',
    systemDescription: [
      'KaWaCHaM (Kerala Warnings, Crisis & Hazard Management System) is an enterprise disaster management and early-warning platform operated by state emergency authorities.',
      'The platform ingests, aggregates, and processes multi-agency hydrometeorological forecasts and sensor telemetry to generate timely hazard alerts and support crisis response workflows.'
    ],
    contributionGroups: [
      {
        title: 'Backend services',
        points: [
          'Supported disaster-related data processing and application workflows across state hazard monitoring layers.',
          'Developed and maintained backend services and REST APIs for operational workflows and external system integrations.',
          'Implemented business logic, validations, exception handling, and database operations in Spring Boot.',
          'Worked with Microsoft SQL Server queries and stored procedures to handle hazard logs and warning telemetry.'
        ]
      },
      {
        title: 'External data integration',
        points: [
          'Integrated external weather and forecast data feeds from multiple external providers.',
          'Integrated Fyllo Actual Weather Data APIs to consume localized ground-level weather observations.',
          'Integrated Experiq Forecast feeds for predictive weather intelligence.',
          'Integrated Central Water Commission (CWC)-related APIs for river water levels and flood monitoring.'
        ]
      }
    ],
    engineeringNotes: [
      'Forecast and weather providers each expose distinct payload shapes, ingestion cadences, and rate limits, making resilient adapter logic and validation critical.',
      'Sensor telemetry and water-level thresholds require automated database checks so operators can evaluate hazard conditions without manual polling.',
      'Disaster early-warning platforms demand defensive error handling to isolate third-party API interruptions from internal alert processing.'
    ],
    diagram: {
      nodes: [
        { id: 'weather', label: 'Weather Feeds (Fyllo / Experiq / CWC)', kind: 'external' },
        { id: 'ingest', label: 'API Ingestion & Normalization (Spring Boot)', kind: 'service' },
        { id: 'db', label: 'SQL Server (Hazard & Telemetry Data)', kind: 'store' },
        { id: 'api', label: 'Hazard Workflow Services (REST APIs)', kind: 'service' },
        { id: 'portal', label: 'Early Warning Portal (Angular)', kind: 'client' }
      ],
      edges: [
        { from: 'weather', to: 'ingest', label: 'Raw Forecast & River Data' },
        { from: 'ingest', to: 'db', label: 'Persist Normalized Telemetry' },
        { from: 'api', to: 'db', label: 'Query Thresholds & History' },
        { from: 'api', to: 'portal', label: 'Stream Warning Feeds' }
      ],
      caption: 'External forecast ingestion, data normalization, and hazard management workflow',
      altText: 'Diagram showing weather data ingestion from Fyllo, Experiq, and CWC into Spring Boot services, persistence in SQL Server, and display on the Angular warning portal.'
    },
    isSolo: false,
    order: 2
  },
  {
    slug: 'namma112-whatsapp',
    name: 'Namma112 WhatsApp Chatbot',
    subtitle: 'Citizen Communication & Emergency Response Integration',
    domain: 'Citizen Communication & Emergency Response',
    deployments: ['Namma112'],
    organisation: 'Trinity Mobility',
    roleLine: 'Chatbot Workflows, Webhook Processing & Backend Sync',
    period: '2024 – Present',
    stack: ['Java', 'Spring Boot', 'WhatsApp Business API', 'Webhooks', 'trinityRESPOND Backend'],
    summary: 'Citizen communication integration over WhatsApp for Namma112, enabling automated conversational workflows, inbound media handling, and emergency message processing.',
    systemDescription: [
      'Namma112 WhatsApp Chatbot provides an official conversational channel for citizens to interact with the state emergency response infrastructure.',
      'The service connects Meta\'s WhatsApp Business platform directly with trinityRESPOND backend workflows for automated triage, assistance, and incident processing.'
    ],
    contributionGroups: [
      {
        title: 'Webhook processing',
        points: [
          'Integrated WhatsApp Business API webhooks to receive real-time citizen messages and event notifications.',
          'Built processing services to parse and handle incoming webhook events including text, media attachments, and voice/audio messages.',
          'Implemented verification, signature checks, and validation on webhook endpoints.'
        ]
      },
      {
        title: 'Message lifecycle',
        points: [
          'Built chatbot conversation workflows to evaluate incoming citizen queries and return automated responses.',
          'Implemented message delivery tracking, read-receipt tracking, and status-callback processing.',
          'Integrated backend services to process citizen-submitted incident information and coordinate responses over WhatsApp.',
          'Monitored message logs, diagnosed delivery failures, and supported production operations.'
        ]
      }
    ],
    engineeringNotes: [
      'WhatsApp Business webhooks deliver asynchronous delivery and read notifications that arrive out of order, requiring state-tracking mechanisms to prevent status regression.',
      'Citizen emergency reports frequently arrive as mixed media (photos of incident sites, location pins, voice messages), necessitating unified multi-modal payload handlers.',
      'High-volume citizen messaging requires fast non-blocking webhook acknowledgement to satisfy Meta endpoint timeout limits before downstream processing.'
    ],
    diagram: {
      nodes: [
        { id: 'citizen', label: 'Citizen (WhatsApp App)', kind: 'external' },
        { id: 'meta', label: 'WhatsApp Business API (Meta Cloud)', kind: 'external' },
        { id: 'webhook', label: 'Webhook Endpoint (Spring Boot)', kind: 'service' },
        { id: 'engine', label: 'Chatbot Engine & Message Parser', kind: 'service' },
        { id: 'cad', label: 'trinityRESPOND Backend & SQL Server', kind: 'store' }
      ],
      edges: [
        { from: 'citizen', to: 'meta', label: 'Send Incident Message / Media' },
        { from: 'meta', to: 'webhook', label: 'HTTPS Webhook Payload' },
        { from: 'webhook', to: 'engine', label: 'Parse Text / Media / Audio' },
        { from: 'engine', to: 'cad', label: 'Sync Emergency Incident Data' },
        { from: 'engine', to: 'meta', label: 'Send Automated Response', direction: 'return' },
        { from: 'meta', to: 'citizen', label: 'Deliver Citizen Reply', direction: 'return' }
      ],
      caption: 'Inbound webhook ingestion, multi-modal payload parsing, and emergency response integration',
      altText: 'Flow diagram showing citizen messages sent via WhatsApp Business API, processed by Spring Boot webhook handlers, synchronized with trinityRESPOND backend, and returning automated replies.'
    },
    isSolo: false,
    order: 3
  },
  {
    slug: 'trinityenergy',
    name: 'trinityENERGY',
    subtitle: 'Smart Energy & Centralized Lighting Management',
    domain: 'Smart City & Energy Infrastructure',
    deployments: ['City Lighting Infrastructure'],
    organisation: 'Trinity Mobility',
    roleLine: 'Backend Services, Angular Interfaces & MQTT Telemetry',
    period: '2024 – Present',
    stack: ['Java', 'Spring Boot', 'Angular', 'SQL Server', 'MQTT', 'REST APIs'],
    summary: 'Centralized smart lighting management platform controlling municipal streetlights, operational schedules, telemetry, and automated energy monitoring.',
    systemDescription: [
      'trinityENERGY is a centralized smart lighting management platform engineered to operate municipal lighting infrastructure across urban districts.',
      'The platform interfaces with smart lighting controllers and feeder panels to manage operational schedules, monitor electrical consumption, and detect equipment faults.'
    ],
    contributionGroups: [
      {
        title: 'Device and telemetry',
        points: [
          'Worked on IoT/device integrations and real-time telemetry data processing.',
          'Implemented messaging workflows utilizing MQTT to receive device status, voltage, current, and energy parameters from field controllers.',
          'Developed backend services to validate, process, and persist high-frequency operational telemetry.',
          'Supported lighting schedule automation and operational command workflows.'
        ]
      },
      {
        title: 'Operator interfaces',
        points: [
          'Developed Angular interfaces for lighting monitoring, schedule configuration, and device fleet management.',
          'Implemented UI components to visualize feeder panel operational status, lighting states, and fault alerts.',
          'Developed and maintained REST APIs for schedule deployment and device control.',
          'Wrote and optimized SQL Server queries and stored procedures for historical energy consumption analysis.'
        ]
      }
    ],
    engineeringNotes: [
      'Field lighting controllers communicate over intermittent cellular connections, requiring lightweight MQTT protocol topics with QoS guarantees.',
      'Centralized lighting schedules must account for sunrise/sunset astronomical tables and emergency override states across distributed street panels.',
      'Operator interfaces in Angular require clean tabular and telemetry views capable of reflecting real-time status changes without full page refreshes.'
    ],
    diagram: {
      nodes: [
        { id: 'panels', label: 'Feeder Panels & IoT Streetlights', kind: 'external' },
        { id: 'broker', label: 'MQTT Broker', kind: 'service' },
        { id: 'backend', label: 'Energy Telemetry Services (Spring Boot)', kind: 'service' },
        { id: 'db', label: 'SQL Server (Schedules & Logs)', kind: 'store' },
        { id: 'ui', label: 'Lighting Operations Console (Angular)', kind: 'client' }
      ],
      edges: [
        { from: 'panels', to: 'broker', label: 'Publish Telemetry & Status' },
        { from: 'broker', to: 'backend', label: 'Subscribe Telemetry Stream' },
        { from: 'backend', to: 'db', label: 'Log Energy & Fault Records' },
        { from: 'backend', to: 'ui', label: 'Expose REST API Status' },
        { from: 'ui', to: 'backend', label: 'Trigger Schedule Updates', direction: 'return' },
        { from: 'backend', to: 'broker', label: 'Broadcast Control Commands', direction: 'return' }
      ],
      caption: 'Device telemetry collection, schedule configuration, and central lighting management',
      altText: 'System diagram illustrating streetlight IoT feeder panels communicating via MQTT broker to Spring Boot backend services, SQL Server persistence, and Angular management console.'
    },
    isSolo: false,
    order: 4
  },
  {
    slug: 'lans-lift',
    name: 'LANS Lift',
    subtitle: 'Business Website & AWS Deployment',
    domain: 'Client Commercial Web Platform',
    organisation: 'Independent Project',
    roleLine: 'Solo Developer (Requirements to AWS Cloud Deployment)',
    period: 'Completed & Live',
    stack: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'AWS', 'Git', 'GitHub'],
    summary: 'Responsive commercial business website engineered, built, and deployed end to end on AWS for an elevator and lift enterprise.',
    systemDescription: [
      'LANS Lift (https://lanslift.com) is an independently designed, developed, and deployed commercial web platform for an elevator and mobility engineering enterprise.',
      'Built from initial requirement gathering through final cloud provisioning, the site serves as the company\'s primary digital touchpoint for technical elevator specifications and customer inquiries.'
    ],
    contributionGroups: [
      {
        title: 'Build',
        points: [
          'Independently developed a responsive business website from requirement gathering through completion.',
          'Architected the frontend using Angular, TypeScript, HTML5, and CSS3.',
          'Implemented business pages showcasing product categories, technical specifications, and company details.',
          'Developed customer enquiry and contact sections with client-side form validation.'
        ]
      },
      {
        title: 'Deploy',
        points: [
          'Configured version control repositories using Git and GitHub for organized release management.',
          'Provisioned and deployed the production build to AWS cloud hosting.',
          'Configured domain settings, DNS records, production routing, and SSL certificates.'
        ]
      },
      {
        title: 'Operate',
        points: [
          'Handled post-deployment monitoring, production configuration, and client handover.',
          'Conducted cross-browser and mobile responsive testing across diverse screen sizes.',
          'Maintains the live production site at https://lanslift.com.'
        ]
      }
    ],
    engineeringNotes: [
      'Managing a project end-to-end alone means owning the entire lifecycle: client requirement scoping, UX architecture, production builds, DNS routing, and cloud hosting.',
      'Commercial product catalogs require accessible layouts, semantic markup, and predictable navigation on mobile devices.',
      'Hosting static single-page applications on AWS requires configuring cloud storage, content delivery caching headers, and SPA routing rewrites.'
    ],
    liveUrl: 'https://lanslift.com',
    isSolo: true,
    order: 5
  }
];
