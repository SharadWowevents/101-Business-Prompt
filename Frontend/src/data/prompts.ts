import { PromptItem } from '../types';

export const BUSINESS_PROMPTS: PromptItem[] = [
  // ─── MARKETING ───
  {
    id: 'mkt-01',
    number: 1,
    category: 'Marketing',
    title: 'Irresistible Value Proposition & Hook Generator',
    prompt:
      'Act as a world-class direct-response copywriter. Analyze my target audience: [Target Audience] and my core offering: [Product/Service Description]. Generate 5 distinct, punchy value propositions using the "Pain-Agitate-Solve" framework. Include 3 thumb-stopping hooks suitable for [Marketing Channel, e.g., LinkedIn / Meta Ads] that emphasize our key differentiator: [Unique Differentiator].',
  },
  {
    id: 'mkt-02',
    number: 2,
    category: 'Marketing',
    title: 'High-Converting Cold Outreach Email Sequence',
    prompt:
      'Write a 4-part cold email sequence targeting [Job Title, e.g., VP of Engineering] at [Target Industry] companies with [Company Size, e.g., 50-250 employees]. Each email must stay under 120 words. Focus on addressing [Primary Pain Point] without sounding salesy. Include a soft call-to-action inviting them to review our [Lead Magnet / Case Study].',
  },
  {
    id: 'mkt-03',
    number: 3,
    category: 'Marketing',
    title: 'Customer Persona & Psychographic Teardown',
    prompt:
      'Build an in-depth ICP (Ideal Customer Profile) for [Product Category]. Our typical buyer is [Role/Demographic]. Detail their: 1) Top 3 daily frustrations, 2) Professional KPIs they are evaluated on, 3) Hidden objections when considering [Solution Type], and 4) The exact trigger event that forces them to buy within [Timeframe].',
  },
  {
    id: 'mkt-04',
    number: 4,
    category: 'Marketing',
    title: 'Authority-Building Thought Leadership Calendar',
    prompt:
      'Develop a 30-day content calendar for [Founder / Executive Name] in the [Industry / Niche] space. Create 4 weekly themes around [Core Pillars]. For each week, provide 3 post concepts with provocative angles, estimated engagement format [Story, Framework, Contrarian Take], and a template CTA directing followers to [Newsletter / Community URL].',
  },
  {
    id: 'mkt-05',
    number: 5,
    category: 'Marketing',
    title: 'Competitive Differentiation & Positioning Matrix',
    prompt:
      'Evaluate our business [Company Name] against our primary competitors: [Competitor A, Competitor B]. Map out an "Only-We" positioning statement that highlights our unique advantage: [Unfair Advantage]. Draft a comparison battlecard addressing the objection: "Why should we choose you over [Competitor A] when they are [Competitor Strength]?"',
  },

  // ─── SALES ───
  {
    id: 'sal-06',
    number: 6,
    category: 'Sales',
    title: 'Executive Discovery Call Framework',
    prompt:
      'Act as an enterprise sales director. Write a structured 30-minute discovery call script for selling [Product/Service] to [Buyer Persona]. Include 5 open-ended diagnostic questions to uncover the financial impact of [Specific Problem], 2 tactical pivot questions if they say "[Common Brush-off Objection]", and a closing question to lock in a second meeting.',
  },
  {
    id: 'sal-07',
    number: 7,
    category: 'Sales',
    title: 'Objection-Handling Playbook for Price Resistance',
    prompt:
      'Provide a 4-step framework to neutralize the prospect objection: "Your price of [Price Point] is significantly higher than [Alternative Solution]." Structure the response to reframe price as an investment return based on [Expected ROI / Cost of Inaction]. Include verbatim dialogue scripts for the account executive to deliver with confidence.',
  },
  {
    id: 'sal-08',
    number: 8,
    category: 'Sales',
    title: 'Enterprise Proposal Executive Summary',
    prompt:
      'Draft a high-impact, 1-page executive summary for a proposal sent to [Client Executive Title] at [Client Company]. Synthesize their current bottleneck: [Client Challenge], quantify the projected upside: [Target Metric / Revenue Impact], present our 3-phase rollout of [Solution Name], and specify the pilot investment of [Budget Amount].',
  },
  {
    id: 'sal-09',
    number: 9,
    category: 'Sales',
    title: 'Stalled Deal Re-engagement Campaign',
    prompt:
      'Create 3 short, non-needy email follow-ups for prospects who went completely dark after receiving a proposal for [Deal Value]. Follow-up #1 uses a new industry insight: [Recent Trend/Stat]. Follow-up #2 uses a 9-word challenge question. Follow-up #3 is a polite "closing the file" permission-to-walk-away message.',
  },
  {
    id: 'sal-10',
    number: 10,
    category: 'Sales',
    title: 'Upsell & Cross-sell Expansion Script',
    prompt:
      'Develop a client review script to introduce our premium tier [Premium Offering Name] to existing customers currently on [Basic Plan] for [Duration of Relationship]. Anchor the conversation on recent wins they achieved: [Client Milestone Achieved] and show how [Advanced Feature/Service] unlocks [Next Tier Business Goal].',
  },

  // ─── DELIVERY ───
  {
    id: 'del-11',
    number: 11,
    category: 'Delivery',
    title: 'White-Glove Client Onboarding SOP',
    prompt:
      'Draft a comprehensive 14-day client onboarding standard operating procedure (SOP) for our service: [Service Offering]. Break it down into: Day 1 (Welcome & Asset Gathering), Day 3 (Kickoff Call Agenda), Day 7 (Quick Win Delivery), and Day 14 (Initial Review). Include automated email templates and an onboarding checklist for [Account Manager Role].',
  },
  {
    id: 'del-12',
    number: 12,
    category: 'Delivery',
    title: 'Project Scope Creep Containment Protocol',
    prompt:
      'Act as a seasoned operations consultant. Write a professional email response to a client who just asked for [Unscoped Deliverable / Feature Request] within our fixed-scope engagement: [Project Name]. Acknowledge the value of the idea, gently explain the boundary without confrontation, and present two clear options: [Change Order with Price / Phased V2 Rollout].',
  },
  {
    id: 'del-13',
    number: 13,
    category: 'Delivery',
    title: 'SLA Incident Post-Mortem & Remediation',
    prompt:
      'Write an incident root-cause analysis and client communication template for when [Service / Infrastructure Outage / Delivery Delay] occurred for a duration of [Downtime/Delay Period]. Outline the exact timeline, root cause [Root Cause], corrective measures to prevent recurrence [Remediation Step], and compensatory gesture: [Credit / Extension].',
  },
  {
    id: 'del-14',
    number: 14,
    category: 'Delivery',
    title: 'Weekly Client Status Report Dashboard Template',
    prompt:
      'Design a concise, executive-friendly weekly status report format for [Client Name] tracking [Project Deliverables]. Structure into: 1) Executive Summary (Green/Yellow/Red status), 2) Milestones Completed this week, 3) Priorities for next week, 4) Blockers requiring [Client Action/Approval], and 5) Updated completion forecast for [Key Deadline].',
  },
  {
    id: 'del-15',
    number: 15,
    category: 'Delivery',
    title: 'Quality Assurance (QA) Pre-Flight Checklist',
    prompt:
      'Generate a 20-point pre-delivery Quality Assurance checklist for our team before handing over [Deliverable Type, e.g., Web App / Campaign Asset / Strategic Audit] to [Client Stakeholder]. Categorize checkpoints by: Functionality, Brand Consistency, Performance, Security & Access, and Client Deliverable Polish.',
  },

  // ─── FINANCE ───
  {
    id: 'fin-16',
    number: 16,
    category: 'Finance',
    title: 'Unit Economics & Customer Lifetime Value Audit',
    prompt:
      'Analyze the unit economics for our business model: [Subscription / Agency / E-commerce]. Given an Average Order Value / ARPU of [ARPU], Customer Acquisition Cost (CAC) of [CAC], and monthly churn rate of [Churn Rate %], calculate: 1) Estimated LTV, 2) LTV:CAC ratio, 3) CAC Payback period in months, and 4) Top 3 levers to increase contribution margin by [Target %].',
  },
  {
    id: 'fin-17',
    number: 17,
    category: 'Finance',
    title: 'Cash Flow Runway & Burn Optimization Plan',
    prompt:
      'Act as a fractional CFO. Our company currently has [Cash Balance in Bank] in reserves with a gross monthly burn of [Monthly Expenses] and monthly recurring revenue of [Current MRR]. Build a 3-scenario runway model (Conservative, Base, Aggressive) and propose 5 immediate expense rationalization actions to extend runway by [Target Additional Months].',
  },
  {
    id: 'fin-18',
    number: 18,
    category: 'Finance',
    title: 'Value-Based Pricing Restructuring Model',
    prompt:
      'Review our current pricing model: [Current Price & Structure] for [Target Customer Profile]. Help us transition from cost-plus/hourly billing to value-based tiered packaging. Design 3 tiers: [Good, Better, Best] where Tier 2 anchors our revenue goal of [Target Average Contract Value]. Detail the value drivers that justify a [X%] price increase.',
  },
  {
    id: 'fin-19',
    number: 19,
    category: 'Finance',
    title: 'Vendor Renegotiation & Contract Audit Letter',
    prompt:
      'Draft a firm yet collaborative contract renegotiation email to our key software vendor [Vendor Name]. We currently spend [Annual Spend] on [Product/Service]. Cite our company’s vendor consolidation initiative, market benchmarks showing alternatives at [Lower Benchmark Price], and request a [Target Discount %] discount in exchange for [Multi-year Commitment / Case Study Rights].',
  },

  // ─── PEOPLE ───
  {
    id: 'peo-20',
    number: 20,
    category: 'People',
    title: 'High-Impact Job Description & Scorecard',
    prompt:
      'Create an outcome-oriented Job Scorecard (not a boring task list) for hiring a [Job Title, e.g., Head of Growth / Senior Full-Stack Engineer]. Define the role’s North Star Mission, 3 measurable outcomes expected within [Timeframe, e.g., 90 Days], and 5 non-negotiable behavioral competencies required to succeed in our culture: [Core Company Value].',
  },
  {
    id: 'peo-21',
    number: 21,
    category: 'People',
    title: 'Behavioral & Situational Interview Guide',
    prompt:
      'Design a 45-minute structured interview protocol to evaluate candidates for [Role Title]. Formulate 6 situational questions using the STAR method (Situation, Task, Action, Result) specifically testing for [Key Skill 1] and [Resilience under pressure]. Include red flags to watch for and what a "World-Class" candidate response looks like.',
  },
  {
    id: 'peo-22',
    number: 22,
    category: 'People',
    title: 'Radical Candor Performance Feedback Script',
    prompt:
      'Provide a managerial conversation guide for delivering constructive feedback to an employee [Employee Name / Role] who is struggling with [Performance Issue, e.g., Missing Project Deadlines]. Structure using the SBI model (Situation, Behavior, Impact). Keep the tone supportive yet firm, establish clear accountability, and agree on an action plan for review in [Review Period, e.g., 2 Weeks].',
  },
  {
    id: 'peo-23',
    number: 23,
    category: 'People',
    title: 'First 90 Days Executive Onboarding Blueprint',
    prompt:
      'Develop a comprehensive 30-60-90 day roadmap for a newly hired [Key Role, e.g., Operations Manager]. Days 1-30 focus on Listening & Discovery: [Key Stakeholders to interview]. Days 31-60 focus on Diagnostic & Quick Wins: [Quick Win Project]. Days 61-90 focus on Execution & Strategic Ownership of [Key Annual Metric].',
  },

  // ─── AI ───
  {
    id: 'ai-24',
    number: 24,
    category: 'AI',
    title: 'Autonomous Executive Assistant System Prompt',
    prompt:
      'You are the Chief of Staff and AI Executive Assistant to [Executive Name/Title] at [Company Name]. Your mandate is to prioritize incoming communications, synthesize complex briefs into 3 bullet points, and draft replies matching their tone: [Concise, direct, and warm]. Never commit to meetings without checking [Calendar Rules]. Always flag financial risks above [Threshold Amount].',
  },
  {
    id: 'ai-25',
    number: 25,
    category: 'AI',
    title: 'Automated Customer Support Triage & Resolution Agent',
    prompt:
      'Act as a Tier-2 Support Automation Specialist for [Company Product]. Analyze the following customer ticket: [Customer Complaint/Inquiry]. 1) Classify ticket urgency (P1 Critical to P4 Minor), 2) Detect sentiment and churn probability, 3) Extract key metadata: [Account ID / Error Code], and 4) Generate an empathetic, step-by-step resolution referencing our docs: [Knowledge Base Link].',
  },
  {
    id: 'ai-26',
    number: 26,
    category: 'AI',
    title: 'Weekly Business Intelligence & KPI Synthesis',
    prompt:
      'Analyze the following raw weekly performance data across sales, ops, and marketing: [Paste Raw Metrics/CSV Data]. Produce an executive brief containing: 1) Top 3 positive anomalies, 2) Critical bottlenecks or trailing indicators needing immediate attention, 3) Correlative patterns between [Metric A] and [Metric B], and 4) Three data-driven decisions to implement for next week.',
  },
  {
    id: 'ai-27',
    number: 27,
    category: 'AI',
    title: 'Marketing Content Repurposing Engine',
    prompt:
      'Take the following long-form transcript from [Podcast Episode / Webinar / Client Interview]: [Paste Transcript Text]. Transform it into: 1) A viral 7-tweet Twitter/X thread with an irresistible opening hook, 2) A formatted LinkedIn article highlighting 3 key insights, 3) An email newsletter snippet with a CTA to [Product URL], and 4) Five punchy quotes suitable for social graphic overlays.',
  },
  {
    id: 'ai-28',
    number: 28,
    category: 'AI',
    title: 'Prompt Optimization & Variable Injector',
    prompt:
      'You are a prompt engineering specialist. I want to optimize the following draft prompt: [Paste Draft Prompt]. Enhance it by applying role-priming, few-shot examples, dynamic bracket variables for [Custom Variables], clear constraints, and edge-case handling. Ensure the final prompt reliably outputs in [Desired Format, e.g., JSON / Markdown Table].',
  },
];
