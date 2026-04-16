import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

type Signal = {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
};

type Feature = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly to: string;
};

type WorkflowStep = {
  readonly label: string;
  readonly title: string;
  readonly body: string;
};

type DocCard = {
  readonly title: string;
  readonly body: string;
  readonly to: string;
};

type BenchmarkRow = {
  readonly title: string;
  readonly baseline: string;
  readonly withSkills: string;
  readonly impact: string;
};

type HeroPoint = {
  readonly title: string;
  readonly body: string;
};

const signals: ReadonlyArray<Signal> = [
  {
    label: 'Core loop',
    value: 'Plan -> Correct -> Remember',
    detail:
      'Three skills that reinforce one another instead of acting like disconnected prompts.',
  },
  {
    label: 'Repository control',
    value: 'Root SPEC.md',
    detail:
      'Repositories can override language, validation commands, and knowledge-base paths without forking the skills.',
  },
  {
    label: 'Demo benchmark',
    value: '+88.9 pts',
    detail:
      'In a small 3-prompt local demo, skill-guided outputs matched the expected workflow structure far more consistently.',
  },
];

const heroPoints: ReadonlyArray<HeroPoint> = [
  {
    title: 'Define scope before implementation',
    body:
      'Turn fuzzy requests into implementation-ready specs with clear scope and acceptance criteria.',
  },
  {
    title: 'Correct with evidence, not guesswork',
    body:
      'Use tests, logs, CI output, and review feedback to fix drift against the current spec.',
  },
  {
    title: 'Reuse project memory',
    body:
      'Capture decisions and root causes so the next task starts with real context.',
  },
];

const features: ReadonlyArray<Feature> = [
  {
    eyebrow: 'spec-plan',
    title: 'Turn vague requests into implementation-ready specs',
    body:
      'Capture scope boundaries, assumptions, acceptance criteria, validation steps, execution guardrails, and blocking questions before code starts drifting.',
    to: '/docs/intro#spec-plan',
  },
  {
    eyebrow: 'spec-crlp',
    title: 'Debug against evidence instead of guessing',
    body:
      'Use lint, tests, logs, CI output, and review feedback to run a correction loop that is grounded in the current spec and current code.',
    to: '/docs/intro#spec-crlp',
  },
  {
    eyebrow: 'spec-index',
    title: 'Build project memory that stays searchable',
    body:
      'Capture decisions, root causes, fix patterns, pitfalls, and validation rules so the next task starts with context instead of amnesia.',
    to: '/docs/intro#spec-index',
  },
];

const workflow: ReadonlyArray<WorkflowStep> = [
  {
    label: '01',
    title: 'Read the repository contract',
    body:
      'When the target repository defines a root SPEC.md, the skills use it to honor local language, validation, and knowledge-base conventions.',
  },
  {
    label: '02',
    title: 'Retrieve historical context',
    body:
      'spec-index looks up relevant decisions, root causes, and pitfalls before planning or correction work starts.',
  },
  {
    label: '03',
    title: 'Define done before implementation',
    body:
      'spec-plan turns fuzzy requests into an implementation-ready spec with testable acceptance criteria and execution guardrails.',
  },
  {
    label: '04',
    title: 'Implement in the normal coding loop',
    body:
      'The skills do not replace coding. They tighten the contract around what should happen and how the work will be verified.',
  },
  {
    label: '05',
    title: 'Correct with real feedback',
    body:
      'If reality diverges from the spec, spec-crlp runs a fix-verify-repeat loop using evidence instead of moving the goalposts.',
  },
  {
    label: '06',
    title: 'Persist reusable lessons',
    body:
      'Reusable findings flow back into spec-index so later tasks inherit project memory rather than repeating the same mistakes.',
  },
];

const docs: ReadonlyArray<DocCard> = [
  {
    title: 'Overview',
    body:
      'Understand the three skills, their responsibilities, and the default workflow they create together.',
    to: '/docs/intro',
  },
  {
    title: 'Testing',
    body:
      'See the smoke tests, local verification steps, and the small eval workflow used to validate this project.',
    to: '/docs/testing',
  },
  {
    title: 'Demo benchmark',
    body:
      'Review the 3-prompt local benchmark and what the current numbers do and do not claim.',
    to: '/docs/benchmark',
  },
];

const benchmarkRows: ReadonlyArray<BenchmarkRow> = [
  {
    title: 'Planning an existing feature',
    baseline: '33.3%',
    withSkills: '100.0%',
    impact:
      'Adds scope boundaries, acceptance criteria, validation planning, and memory context before implementation starts.',
  },
  {
    title: 'Correcting a failing test',
    baseline: '0.0%',
    withSkills: '100.0%',
    impact:
      'Pushes the agent toward evidence-driven debugging with explicit root cause, validation, and memory capture.',
  },
  {
    title: 'Saving a reusable root cause',
    baseline: '0.0%',
    withSkills: '100.0%',
    impact:
      'Turns one-off debugging knowledge into searchable project memory with structure, tags, and reuse conditions.',
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Spec-driven skills for AI coding agents"
      description="spec-coding-skills helps AI coding agents plan with acceptance criteria, correct implementation drift from real feedback, and reuse durable project memory.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Plan. Correct. Remember.</span>
            <Heading as="h1" className={styles.heroTitle}>
              Give AI coding agents a tighter spec loop.
            </Heading>
            <p className={styles.heroSubtitle}>
              <strong>spec-coding-skills</strong> helps agents define done before coding, correct
              drift with evidence, and reuse project memory instead of starting each task cold.
            </p>
            <div className={styles.actions}>
              <Link
                className={clsx('button button--primary button--lg', styles.primaryButton)}
                to="/docs/intro">
                Start with the docs
              </Link>
              <Link
                className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                href="https://github.com/H2Sxxa/spec-coding-skills">
                View on GitHub
              </Link>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <article className={styles.heroCard}>
              <span className={styles.heroCardLabel}>What changes in practice</span>
              <p className={styles.heroCardTitle}>
                Planning, correction, and memory stay connected instead of getting improvised task
                by task.
              </p>
              <ul className={styles.heroPointList}>
                {heroPoints.map((point) => (
                  <li key={point.title} className={styles.heroPoint}>
                    <span className={styles.heroPointTitle}>{point.title}</span>
                    <span className={styles.heroPointBody}>{point.body}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={styles.signalSection}>
          <div className={styles.proofRow}>
            <div className={styles.installBlock}>
              <div className={styles.installHeader}>
                <span className={styles.installLabel}>Install when you are ready</span>
                <span className={styles.installHint}>One command, all three skills.</span>
              </div>
              <pre className={styles.installCode}>
                <code>npx skills add H2Sxxa/spec-coding-skills --all</code>
              </pre>
            </div>

            <div className={styles.signalGrid}>
              {signals.map((signal) => (
                <article key={signal.label} className={styles.signalCard}>
                  <span className={styles.signalLabel}>{signal.label}</span>
                  <p className={styles.signalValue}>{signal.value}</p>
                  <p className={styles.signalDetail}>{signal.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Three skills</span>
            <Heading as="h2">One loop for planning, correction, and durable memory.</Heading>
            <p>
              Each skill is useful on its own, but the real value appears when they pass context to
              one another across the life of a task.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <span className={styles.featureEyebrow}>{feature.eyebrow}</span>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.body}</p>
                <Link className={styles.inlineLink} to={feature.to}>
                  Open docs
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Default workflow</span>
            <Heading as="h2">How the loop behaves in a real repository.</Heading>
            <p>
              The flow stays lightweight in day-to-day use: read local conventions, plan against
              explicit done conditions, and close the gap when runtime evidence disagrees.
            </p>
          </div>
          <div className={styles.workflowGrid}>
            {workflow.map((step) => (
              <article key={step.label} className={styles.workflowCard}>
                <span className={styles.workflowLabel}>{step.label}</span>
                <Heading as="h3">{step.title}</Heading>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.benchmarkSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Demo benchmark</span>
            <Heading as="h2">A small signal that the workflow changes agent behavior.</Heading>
            <p>
              In a 3-prompt local Codex demo, the skill-guided outputs matched the expected planning,
              correction, and memory structures far more consistently than baseline generic outputs.
            </p>
          </div>

          <div className={styles.benchmarkLayout}>
            <div className={styles.metricCard}>
              <div className={styles.metricSummary}>
                <div>
                  <span className={styles.metricSummaryLabel}>Overall demo result</span>
                  <p className={styles.metricSummaryValue}>11.1% → 100.0%</p>
                </div>
                <span className={styles.metricSummaryDelta}>+88.9 pts</span>
              </div>

              <div className={styles.metricStack}>
                {benchmarkRows.map((row) => (
                  <article key={row.title} className={styles.metricRow}>
                    <div className={styles.metricRowTop}>
                      <Heading as="h3" className={styles.metricRowTitle}>
                        {row.title}
                      </Heading>
                      <span className={styles.metricImpact}>What improved</span>
                    </div>
                    <div className={styles.metricCompare}>
                      <div className={styles.metricValueCard}>
                        <span className={styles.metricLabel}>Baseline</span>
                        <p className={styles.metricValue}>{row.baseline}</p>
                      </div>
                      <div className={styles.metricValueCard}>
                        <span className={styles.metricLabel}>With skills</span>
                        <p className={styles.metricValue}>{row.withSkills}</p>
                      </div>
                    </div>
                    <p className={styles.metricImpactBody}>{row.impact}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.benchmarkNotes}>
              <article className={styles.noteCard}>
                <Heading as="h3">What it measures</Heading>
                <p>
                  The benchmark checks whether the agent produced the workflow artifacts that make
                  real development safer: clear scope, testable acceptance criteria, structured
                  correction steps, and retrievable project memory.
                </p>
              </article>
              <article className={styles.noteCard}>
                <Heading as="h3">What it does not claim</Heading>
                <p>
                  It is not a statistical statement about final code quality. Treat it as a compact
                  before-and-after demo of process quality rather than a universal benchmark claim.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.docsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>Learn faster</span>
            <Heading as="h2">Everything you need to evaluate or adopt the project.</Heading>
            <p>
              Start with the overview, verify the local workflow, then inspect the compact benchmark
              before rolling the skills into a real repository.
            </p>
          </div>
          <div className={styles.docGrid}>
            {docs.map((doc) => (
              <article key={doc.title} className={styles.docCard}>
                <Heading as="h3">{doc.title}</Heading>
                <p>{doc.body}</p>
                <Link className={styles.inlineLink} to={doc.to}>
                  Read section
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
