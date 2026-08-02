import { File, Paths } from 'expo-file-system';
import { NUMBER_MEANINGS } from '@/data/number-meanings';
import { LIFE_PATH_INTERPRETATIONS } from '@/data/life-path';

interface ReportData {
  profileName: string;
  core: {
    lifePath: number;
    expression: number;
    soulUrge: number;
    personality: number;
    birthday: number;
    attitude: number;
    maturity: number;
  };
  personal: {
    personalYear: number;
    personalMonth: number;
    personalDay: number;
    universalYear: number;
    universalMonth: number;
    universalDay: number;
  };
  cycles: {
    pinnacles: Array<{ number: number; startAge: number; endAge: number }>;
    challenges: Array<{ number: number; startAge: number; endAge: number }>;
  };
  advanced: {
    karmicDebt: number[];
    karmicLessons: number[];
    hiddenPassion: number[];
    balance: number;
  };
}

function numMeaning(n: number) {
  return NUMBER_MEANINGS[n] ?? null;
}

function lifePath(n: number) {
  return LIFE_PATH_INTERPRETATIONS[n] ?? null;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function list(items: string[]) {
  return items.map((i) => `<li>${escapeHtml(i)}</li>`).join('\n');
}

export async function exportReportAsPdf(report: ReportData): Promise<string> {
  const lp = lifePath(report.core.lifePath);
  const exp = numMeaning(report.core.expression);
  const su = numMeaning(report.core.soulUrge);
  const per = numMeaning(report.core.personality);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Numon Report — ${escapeHtml(report.profileName)}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a2e; background: #fff; padding: 48px; line-height: 1.6; }
  .header { text-align: center; margin-bottom: 48px; border-bottom: 2px solid #1a1a2e; padding-bottom: 24px; }
  .header h1 { font-size: 36px; letter-spacing: 2px; margin-bottom: 8px; }
  .header .subtitle { font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 3px; }
  .header .date { font-size: 13px; color: #999; margin-top: 8px; }
  h2 { font-size: 22px; margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #ddd; }
  h3 { font-size: 17px; margin: 20px 0 10px; color: #333; }
  p { margin-bottom: 12px; font-size: 14px; }
  ul { margin: 8px 0 16px 20px; font-size: 14px; }
  li { margin-bottom: 6px; }
  .number-grid { display: flex; flex-wrap: wrap; gap: 16px; margin: 16px 0; }
  .number-card { border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; flex: 1; min-width: 140px; text-align: center; }
  .number-card .num { font-size: 32px; font-weight: bold; color: #1a1a2e; }
  .number-card .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-top: 4px; }
  .section { page-break-inside: avoid; }
  .footer { text-align: center; margin-top: 48px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 11px; color: #999; }
  @media print { body { padding: 24px; } }
</style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(report.profileName)}</h1>
    <div class="subtitle">Numerology Report</div>
    <div class="date">Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <div class="section">
    <h2>Core Numbers</h2>
    <div class="number-grid">
      <div class="number-card"><div class="num">${report.core.lifePath}</div><div class="label">Life Path</div></div>
      <div class="number-card"><div class="num">${report.core.expression}</div><div class="label">Expression</div></div>
      <div class="number-card"><div class="num">${report.core.soulUrge}</div><div class="label">Soul Urge</div></div>
      <div class="number-card"><div class="num">${report.core.personality}</div><div class="label">Personality</div></div>
      <div class="number-card"><div class="num">${report.core.birthday}</div><div class="label">Birthday</div></div>
      <div class="number-card"><div class="num">${report.core.attitude}</div><div class="label">Attitude</div></div>
      <div class="number-card"><div class="num">${report.core.maturity}</div><div class="label">Maturity</div></div>
    </div>
  </div>

  ${lp ? `
  <div class="section">
    <h2>Life Path ${report.core.lifePath} — ${escapeHtml(lp.title)}</h2>
    <p>${escapeHtml(lp.overview)}</p>
    <h3>Strengths</h3>
    <ul>${list(lp.strengths)}</ul>
    <h3>Challenges</h3>
    <ul>${list(lp.challenges)}</ul>
    <h3>Career</h3>
    <ul>${list(lp.career)}</ul>
    <h3>Relationships</h3>
    <p>${escapeHtml(lp.relationships)}</p>
    <h3>Spiritual Growth</h3>
    <p>${escapeHtml(lp.spiritualGrowth)}</p>
  </div>` : ''}

  ${exp ? `
  <div class="section">
    <h2>Expression ${report.core.expression} — ${escapeHtml(exp.title)}</h2>
    <p>${escapeHtml(exp.description)}</p>
    <h3>Keywords</h3>
    <p>${exp.keywords.join(', ')}</p>
    <h3>Positive Traits</h3>
    <ul>${list(exp.positive)}</ul>
    <h3>Career</h3>
    <ul>${list(exp.career)}</ul>
  </div>` : ''}

  ${su ? `
  <div class="section">
    <h2>Soul Urge ${report.core.soulUrge} — ${escapeHtml(su.title)}</h2>
    <p>${escapeHtml(su.description)}</p>
    <h3>Keywords</h3>
    <p>${su.keywords.join(', ')}</p>
  </div>` : ''}

  ${per ? `
  <div class="section">
    <h2>Personality ${report.core.personality} — ${escapeHtml(per.title)}</h2>
    <p>${escapeHtml(per.description)}</p>
    <h3>Keywords</h3>
    <p>${per.keywords.join(', ')}</p>
  </div>` : ''}

  <div class="section">
    <h2>Personal Cycles</h2>
    <div class="number-grid">
      <div class="number-card"><div class="num">${report.personal.personalYear}</div><div class="label">Personal Year</div></div>
      <div class="number-card"><div class="num">${report.personal.personalMonth}</div><div class="label">Personal Month</div></div>
      <div class="number-card"><div class="num">${report.personal.personalDay}</div><div class="label">Personal Day</div></div>
    </div>
    <div class="number-grid">
      <div class="number-card"><div class="num">${report.personal.universalYear}</div><div class="label">Universal Year</div></div>
      <div class="number-card"><div class="num">${report.personal.universalMonth}</div><div class="label">Universal Month</div></div>
      <div class="number-card"><div class="num">${report.personal.universalDay}</div><div class="label">Universal Day</div></div>
    </div>
  </div>

  <div class="section">
    <h2>Life Cycles</h2>
    <h3>Pinnacles</h3>
    <ul>
    ${report.cycles.pinnacles.map((p, i) => `<li>Pinnacle ${i + 1}: Number ${p.number} (Ages ${p.startAge}–${p.endAge})</li>`).join('\n')}
    </ul>
    <h3>Challenges</h3>
    <ul>
    ${report.cycles.challenges.map((c, i) => `<li>Challenge ${i + 1}: Number ${c.number} (Ages ${c.startAge}–${c.endAge})</li>`).join('\n')}
    </ul>
  </div>

  <div class="section">
    <h2>Advanced Numbers</h2>
    <h3>Karmic Debt</h3>
    <p>${report.advanced.karmicDebt.length > 0 ? report.advanced.karmicDebt.join(', ') : 'None detected'}</p>
    <h3>Karmic Lessons (Missing Numbers)</h3>
    <p>${report.advanced.karmicLessons.length > 0 ? report.advanced.karmicLessons.join(', ') : 'None — all numbers present'}</p>
    <h3>Hidden Passion</h3>
    <p>${report.advanced.hiddenPassion.join(', ')}</p>
    <h3>Balance Number</h3>
    <p>${report.advanced.balance}</p>
  </div>

  <div class="footer">
    Generated by Numon — Complete Offline Numerology Platform
  </div>
</body>
</html>`;

  const filename = `numon-report-${report.profileName.replace(/\s+/g, '-').toLowerCase()}.html`;
  const path = `${Paths.cache}/${filename}`;
  const file = new File(path);
  await file.write(html);
  return path;
}

export async function exportReportAsCsv(report: ReportData): Promise<string> {
  const rows = [
    ['Category', 'Number', 'Name'],
    ['Life Path', String(report.core.lifePath), lifePath(report.core.lifePath)?.title ?? ''],
    ['Expression', String(report.core.expression), numMeaning(report.core.expression)?.title ?? ''],
    ['Soul Urge', String(report.core.soulUrge), numMeaning(report.core.soulUrge)?.title ?? ''],
    ['Personality', String(report.core.personality), numMeaning(report.core.personality)?.title ?? ''],
    ['Birthday', String(report.core.birthday), numMeaning(report.core.birthday)?.title ?? ''],
    ['Attitude', String(report.core.attitude), numMeaning(report.core.attitude)?.title ?? ''],
    ['Maturity', String(report.core.maturity), numMeaning(report.core.maturity)?.title ?? ''],
    ['Personal Year', String(report.personal.personalYear), ''],
    ['Personal Month', String(report.personal.personalMonth), ''],
    ['Personal Day', String(report.personal.personalDay), ''],
    ['Universal Year', String(report.personal.universalYear), ''],
    ['Universal Month', String(report.personal.universalMonth), ''],
    ['Universal Day', String(report.personal.universalDay), ''],
    ['Balance', String(report.advanced.balance), ''],
    ['Hidden Passion', report.advanced.hiddenPassion.join(' '), ''],
    ['Karmic Debt', report.advanced.karmicDebt.join(' '), ''],
    ['Karmic Lessons', report.advanced.karmicLessons.join(' '), ''],
  ];

  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const filename = `numon-report-${report.profileName.replace(/\s+/g, '-').toLowerCase()}.csv`;
  const path = `${Paths.cache}/${filename}`;
  const file = new File(path);
  await file.write(csv);
  return path;
}
