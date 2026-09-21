const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const paperDark = rgb(0.08, 0.08, 0.06); // #14140F
  const inkSecondary = rgb(0.27, 0.27, 0.25); // #454540
  const inkMuted = rgb(0.48, 0.48, 0.45); // #7C7A73
  const ruleColor = rgb(0.87, 0.85, 0.82); // #DFDAD1
  const signalColor = rgb(0.76, 0.19, 0.04); // #C1300B

  let y = height - 48;
  const margin = 48;

  // Header
  page.drawText('VEMALA SRINIVASULU', {
    x: margin,
    y,
    size: 20,
    font: fontBold,
    color: paperDark,
  });

  y -= 16;
  page.drawText('Full Stack Developer  ·  Bengaluru, India', {
    x: margin,
    y,
    size: 10,
    font: fontRegular,
    color: inkSecondary,
  });

  y -= 14;
  page.drawText('vemalasrinivasulu1211@gmail.com  ·  +91 9949783696  ·  linkedin.com/in/vemala-srinivasulu  ·  github.com/srinivasulu-vemala', {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: inkMuted,
  });

  y -= 12;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 0.75,
    color: ruleColor,
  });

  function drawSection(title) {
    y -= 18;
    page.drawText(title.toUpperCase(), {
      x: margin,
      y,
      size: 9,
      font: fontBold,
      color: signalColor,
    });
    y -= 4;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.5,
      color: ruleColor,
    });
    y -= 12;
  }

  function drawBullet(text, indent = margin + 10) {
    page.drawText('·', {
      x: margin + 2,
      y,
      size: 10,
      font: fontBold,
      color: signalColor,
    });
    page.drawText(text, {
      x: indent,
      y,
      size: 8.5,
      font: fontRegular,
      color: inkSecondary,
    });
    y -= 12;
  }

  // Experience
  drawSection('Experience');
  page.drawText('Trinity Mobility  —  Associate Software Developer', {
    x: margin,
    y,
    size: 10,
    font: fontBold,
    color: paperDark,
  });
  page.drawText('Bengaluru, India  |  Jun 2024 – Present', {
    x: width - margin - 160,
    y,
    size: 8.5,
    font: fontRegular,
    color: inkMuted,
  });
  y -= 14;

  const expBullets = [
    'Develops and maintains enterprise applications using Java, Spring Boot, Angular and SQL Server.',
    'Develops and maintains REST APIs and backend services for emergency, disaster and smart-city systems.',
    'Implements business logic, validations, exception handling and database operations.',
    'Writes and optimizes SQL queries and stored procedures in Microsoft SQL Server.',
    'Integrates third-party APIs, weather forecast feeds, and external system services.',
    'Developed and supports WhatsApp chatbot for Namma112 enabling automated citizen communication.',
    'Integrated WhatsApp Business API webhooks, media message handling and status tracking.',
    'Works on IoT/device integrations and real-time data processing with MQTT, WebSocket and FCM.',
    'Analyzes application logs and troubleshoots frontend, backend, database and integration issues.'
  ];
  for (const b of expBullets) {
    drawBullet(b);
  }

  // Projects
  drawSection('Key Projects');

  const projects = [
    {
      title: 'trinityRESPOND (CAD & Emergency Response)  |  Namma112 & Maharashtra 112',
      tech: 'Java, Spring Boot, Angular, SQL Server, REST APIs, WebSocket, FCM',
      desc: 'Backend services for incident creation, assignment, monitoring and dispatch; real-time WebSocket & FCM; SQL Server stored procedures; production root-cause log analysis.'
    },
    {
      title: 'KaWaCHaM (Kerala Warnings, Crisis & Hazard Management System)',
      tech: 'Java, Spring Boot, Angular, SQL Server, REST APIs, Third-Party APIs',
      desc: 'Disaster-related data processing, backend services, and REST APIs; integrated external weather data (Fyllo Actual Weather, Experiq Forecast, CWC APIs).'
    },
    {
      title: 'Namma112 — WhatsApp Chatbot Integration',
      tech: 'Java, Spring Boot, WhatsApp Business API, Webhooks, trinityRESPOND backend',
      desc: 'Chatbot workflows for citizen messaging; incoming webhook events (text, media, audio); delivery/read status tracking; backend integration.'
    },
    {
      title: 'trinityENERGY — Smart Energy & Centralized Lighting Management',
      tech: 'Java, Spring Boot, Angular, SQL Server, MQTT, REST APIs',
      desc: 'Backend services and Angular interfaces for lighting monitoring, schedules, device status, operational workflows, and IoT real-time data processing.'
    },
    {
      title: 'LANS Lift — Business Website & AWS Deployment (Independent Project)',
      tech: 'Angular, TypeScript, HTML5, CSS3, AWS, Git, GitHub  |  https://lanslift.com',
      desc: 'Independently developed responsive business website from requirements through production deployment. Handled Git, AWS hosting, and production support.'
    }
  ];

  for (const p of projects) {
    page.drawText(p.title, {
      x: margin,
      y,
      size: 9,
      font: fontBold,
      color: paperDark,
    });
    y -= 11;
    page.drawText('Tech: ' + p.tech, {
      x: margin,
      y,
      size: 8,
      font: fontOblique,
      color: inkMuted,
    });
    y -= 11;
    page.drawText(p.desc, {
      x: margin,
      y,
      size: 8,
      font: fontRegular,
      color: inkSecondary,
    });
    y -= 14;
  }

  // Skills
  drawSection('Technical Skills');
  const skills = [
    'Languages: Java, SQL, JavaScript, TypeScript',
    'Backend & Frameworks: Spring Boot, Microservices, REST APIs',
    'Frontend: Angular, HTML5, CSS',
    'Database: Microsoft SQL Server, Stored Procedures, SQL Query Optimization',
    'Cloud & DevOps: AWS, Git, GitHub, Maven, Docker (Basic), Kubernetes (Basic)',
    'IoT, Messaging & Integration: MQTT, WebSocket, FCM, Kafka, WhatsApp Business API, Webhooks, NiFi, Redis',
    'Tools: Postman, JIRA, Eclipse, VS Code'
  ];
  for (const s of skills) {
    drawBullet(s);
  }

  // Education & Certification
  drawSection('Education & Certification');
  page.drawText('Sri Venkateswara College of Engineering (SVCE), Tirupati  —  B.Tech, Civil Engineering (CGPA: 8.5)', {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: inkSecondary,
  });
  y -= 12;
  page.drawText('MGM Junior College (Intermediate, CGPA: 10.0)   ·   Shanthiniketan E.M. School (SSC, CGPA: 9.8)', {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: inkMuted,
  });
  y -= 12;
  page.drawText('Certification: Generative AI to AI Agent Masterclass for Software Engineers — Udemy, 2025', {
    x: margin,
    y,
    size: 8.5,
    font: fontRegular,
    color: inkSecondary,
  });

  const pdfBytes = await pdfDoc.save();
  const dest = path.join(__dirname, '..', 'public', 'Vemala-Srinivasulu-Resume.pdf');
  fs.writeFileSync(dest, pdfBytes);
  console.log('Resume successfully generated at', dest);
}

createResume().catch(console.error);
