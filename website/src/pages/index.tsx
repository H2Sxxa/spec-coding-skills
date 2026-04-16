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

const signals: ReadonlyArray<Signal> = [
  {
    label: 'Core loop',
    value: 'Plan -> Correct -> Remember',
    detail:
      'The three skills are designed to reinforce one another instead of acting like disconnected prompts.',
  },
  {
    label: 'Repository control',
    value: 'Root SPEC.md',
    detail:
      'Each target repository can override language, validation commands, and knowledge-base paths without forking the skills.',
  },
  {
    label: 'Demo benchmark',
    value: '+88.9 pts',
    detail:
      'In a small 3-prompt local demo, skill-guided outputs matched the expected workflow structure far more consistently than baseline output.',
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

const benchmarkRows: ReadonlyArray<readonly [string, string, string]> = [
  ['Planning an existing feature', '33.3%', '100.0%'],
  ['Correcting a failing test', '0.0%', '100.0%'],
  ['Saving a reusable root cause', '0.0%', '100.0%'],
  ['Overall mean', '11.1%', '100.0%'],
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="spec-coding-skills"
      description="Plan with acceptance criteria, correct from feedback, and remember reusable project knowledge.">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Spec-driven skills for AI coding agents</span>
            <Heading as="h1" className={styles.heroTitle}>
              Give agents a tighter loop than “just write some code.”
            </Heading>
            <p className={styles.heroSubtitle}>
              <strong>spec-coding-skills</strong> helps agents define the work before
              implementation, correct implementation drift with evidence, and keep reusable
              project memory close at hand.
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
            <div className={styles.installBlock}>
              <span className={styles.installLabel}>Install from GitHub</span>
              <pre className={styles.installCode}>
                <code>npx skills add H2Sxxa/spec-coding-skills --all</code>
              </pre>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.heroStack}>
              <article className={styles.miniCard}>
                <span className={styles.miniLabel}>What changes</span>
                <Heading as="h2" className={styles.miniTitle}>
                  Less improvisation. More contracts, evidence, and memory.
                </Heading>
                <p>
                  The goal is not to make agents verbose. It is to make them more reliable when
                  work gets ambiguous, risky, or iterative.
                </p>
              </article>

              <article className={styles.terminalCard}>
                <div className={styles.terminalHeader}>
                  <span>repository/SPEC.md</span>
                  <span>override example</span>
                </div>
                <pre className={styles.terminalBody}>
                  <code>{`## Documentation Language
- Default documentation language: Simplified Chinese.

## Validation
- Lint command: \`pnpm lint\`
- Test command: \`pnpm test\`

## Paths
- Knowledge base root: \`docs/knowledge-base/\``}</code>
                </pre>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.signalSection}>
          <div className={styles.signalGrid}>
            {signals.map((signal) => (
              <article key={signal.label} className={styles.signalCard}>
                <span className={styles.signalLabel}>{signal.label}</span>
                <p className={styles.signalValue}>{signal.value}</p>
                <p className={styles.signalDetail}>{signal.detail}</p>
              </article>
            ))}
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
              <table className={styles.metricTable}>
                <thead>
                  <tr>
                    <th>Eval</th>
                    <th>Baseline</th>
                    <th>With skills</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarkRows.map(([name, baseline, withSkills]) => (
                    <tr key={name}>
                      <td>{name}</td>
                      <td>{baseline}</td>
                      <td>{withSkills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
