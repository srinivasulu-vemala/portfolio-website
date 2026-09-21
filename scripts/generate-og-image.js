const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

// 1. OG Image (1200x630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <style>
      .bg { fill: #F6F4F0; }
      .title { font-family: 'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif; font-size: 72px; fill: #14140F; font-weight: 700; letter-spacing: -0.03em; }
      .title-sub { fill: #7C7A73; font-weight: 500; }
      .role { font-family: 'Inter', system-ui, -apple-system, sans-serif; font-size: 26px; fill: #454540; font-weight: 500; letter-spacing: -0.011em; }
      .deployments { font-family: 'JetBrains Mono', monospace; font-size: 15px; fill: #7C7A73; letter-spacing: 0.08em; text-transform: uppercase; }
      .meta { font-family: 'JetBrains Mono', monospace; font-size: 14px; fill: #7C7A73; letter-spacing: 0.08em; text-transform: uppercase; }
    </style>
  </defs>

  <rect width="1200" height="630" class="bg"/>

  <!-- Top hairline rule -->
  <line x1="80" y1="80" x2="1120" y2="80" stroke="#DFDAD1" stroke-width="1"/>

  <!-- Top mono row -->
  <text x="80" y="116" class="meta">FULL STACK DEVELOPER · BENGALURU, INDIA</text>
  <text x="1120" y="116" class="meta" text-anchor="end">TRINITY MOBILITY</text>

  <!-- Single signal hairline accent -->
  <line x1="80" y1="210" x2="200" y2="210" stroke="#C1300B" stroke-width="2"/>

  <!-- Name in serif -->
  <text x="80" y="290" class="title">
    Vemala <tspan class="title-sub">Srinivasulu</tspan>
  </text>

  <!-- Role line in sans -->
  <text x="80" y="348" class="role">
    Backend systems behind emergency response, disaster warning &amp; city infrastructure.
  </text>

  <!-- Deployments hairline separator -->
  <line x1="80" y1="440" x2="1120" y2="440" stroke="#DFDAD1" stroke-width="1"/>

  <!-- Deployments proof -->
  <text x="80" y="480" class="deployments">DEPLOYMENTS</text>
  <text x="80" y="520" class="meta" fill="#454540">NAMMA112  ·  MAHARASHTRA 112  ·  KERALA STATE EARLY WARNING  ·  CITY LIGHTING INFRASTRUCTURE</text>

  <!-- Bottom hairline rule -->
  <line x1="80" y1="560" x2="1120" y2="560" stroke="#DFDAD1" stroke-width="1"/>
</svg>`;

const ogSvgPath = path.join(__dirname, '..', 'public', 'og-image.svg');
fs.writeFileSync(ogSvgPath, ogSvg);

const resvgOg = new Resvg(ogSvg, {
  fitTo: { mode: 'width', value: 1200 }
});
const pngDataOg = resvgOg.render();
const pngBufferOg = pngDataOg.asPng();
fs.writeFileSync(path.join(__dirname, '..', 'public', 'og-image.png'), pngBufferOg);

// 2. Apple Touch Icon (180x180)
const appleIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" fill="#F6F4F0"/>
  <text x="48" y="125" font-family="serif" font-size="110" font-style="italic" font-weight="600" fill="#14140F">V</text>
  <circle cx="136" cy="118" r="10" fill="#C1300B"/>
</svg>`;

const resvgApple = new Resvg(appleIconSvg, {
  fitTo: { mode: 'width', value: 180 }
});
const pngDataApple = resvgApple.render();
fs.writeFileSync(path.join(__dirname, '..', 'public', 'apple-touch-icon.png'), pngDataApple.asPng());

console.log('OG images and Apple Touch Icon generated successfully.');
