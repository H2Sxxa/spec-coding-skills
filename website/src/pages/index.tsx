import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

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

const getSignals = (): ReadonlyArray<Signal> => [
  {
    label: translate({
      id: 'homepage.signals.coreLoop.label',
      message: 'Core loop',
      description: 'Homepage signal card label for the core workflow loop',
    }),
    value: translate({
      id: 'homepage.signals.coreLoop.value',
      message: 'Plan -> Correct -> Remember',
      description: 'Homepage signal card value for the core workflow loop',
    }),
    detail: translate({
      id: 'homepage.signals.coreLoop.detail',
      message:
        'Three skills that reinforce one another instead of acting like disconnected prompts.',
      description: 'Homepage signal card detail for the core workflow loop',
    }),
  },
  {
    label: translate({
      id: 'homepage.signals.repositoryControl.label',
      message: 'Repository control',
      description: 'Homepage signal card label for repository customization',
    }),
    value: translate({
      id: 'homepage.signals.repositoryControl.value',
      message: 'Root SPEC.md',
      description: 'Homepage signal card value for repository customization',
    }),
    detail: translate({
      id: 'homepage.signals.repositoryControl.detail',
      message:
        'Repositories can override language, validation commands, and knowledge-base paths without forking the skills.',
      description: 'Homepage signal card detail for repository customization',
    }),
  },
  {
    label: translate({
      id: 'homepage.signals.demoBenchmark.label',
      message: 'Demo benchmark',
      description: 'Homepage signal card label for the benchmark summary',
    }),
    value: translate({
      id: 'homepage.signals.demoBenchmark.value',
      message: '+88.9 pts',
      description: 'Homepage signal card value for the benchmark summary',
    }),
    detail: translate({
      id: 'homepage.signals.demoBenchmark.detail',
      message:
        'In a small 3-prompt local demo, skill-guided outputs matched the expected workflow structure far more consistently.',
      description: 'Homepage signal card detail for the benchmark summary',
    }),
  },
];

const getHeroPoints = (): ReadonlyArray<HeroPoint> => [
  {
    title: translate({
      id: 'homepage.hero.points.defineScope.title',
      message: 'Define scope before implementation',
      description: 'Homepage hero bullet title about defining scope',
    }),
    body: translate({
      id: 'homepage.hero.points.defineScope.body',
      message:
        'Turn fuzzy requests into implementation-ready specs with clear scope and acceptance criteria.',
      description: 'Homepage hero bullet body about defining scope',
    }),
  },
  {
    title: translate({
      id: 'homepage.hero.points.correctWithEvidence.title',
      message: 'Correct with evidence, not guesswork',
      description: 'Homepage hero bullet title about evidence-driven correction',
    }),
    body: translate({
      id: 'homepage.hero.points.correctWithEvidence.body',
      message:
        'Use tests, logs, CI output, and review feedback to fix drift against the current spec.',
      description: 'Homepage hero bullet body about evidence-driven correction',
    }),
  },
  {
    title: translate({
      id: 'homepage.hero.points.reuseMemory.title',
      message: 'Reuse project memory',
      description: 'Homepage hero bullet title about project memory',
    }),
    body: translate({
      id: 'homepage.hero.points.reuseMemory.body',
      message:
        'Capture decisions and root causes so the next task starts with real context.',
      description: 'Homepage hero bullet body about project memory',
    }),
  },
];

const getFeatures = (): ReadonlyArray<Feature> => [
  {
    eyebrow: 'spec-plan',
    title: translate({
      id: 'homepage.features.specPlan.title',
      message: 'Turn vague requests into implementation-ready specs',
      description: 'Homepage feature card title for spec-plan',
    }),
    body: translate({
      id: 'homepage.features.specPlan.body',
      message:
        'Capture scope boundaries, assumptions, acceptance criteria, validation steps, execution guardrails, and blocking questions before code starts drifting.',
      description: 'Homepage feature card body for spec-plan',
    }),
    to: '/docs/intro#spec-plan',
  },
  {
    eyebrow: 'spec-crlp',
    title: translate({
      id: 'homepage.features.specCrlp.title',
      message: 'Debug against evidence instead of guessing',
      description: 'Homepage feature card title for spec-crlp',
    }),
    body: translate({
      id: 'homepage.features.specCrlp.body',
      message:
        'Use lint, tests, logs, CI output, and review feedback to run a correction loop that is grounded in the current spec and current code.',
      description: 'Homepage feature card body for spec-crlp',
    }),
    to: '/docs/intro#spec-crlp',
  },
  {
    eyebrow: 'spec-index',
    title: translate({
      id: 'homepage.features.specIndex.title',
      message: 'Build project memory that stays searchable',
      description: 'Homepage feature card title for spec-index',
    }),
    body: translate({
      id: 'homepage.features.specIndex.body',
      message:
        'Capture decisions, root causes, fix patterns, pitfalls, and validation rules so the next task starts with context instead of amnesia.',
      description: 'Homepage feature card body for spec-index',
    }),
    to: '/docs/intro#spec-index',
  },
];

const getWorkflow = (): ReadonlyArray<WorkflowStep> => [
  {
    label: '01',
    title: translate({
      id: 'homepage.workflow.readRepository.title',
      message: 'Read the repository contract',
      description: 'Homepage workflow step title for reading repository conventions',
    }),
    body: translate({
      id: 'homepage.workflow.readRepository.body',
      message:
        'When the target repository defines a root SPEC.md, the skills use it to honor local language, validation, and knowledge-base conventions.',
      description: 'Homepage workflow step body for reading repository conventions',
    }),
  },
  {
    label: '02',
    title: translate({
      id: 'homepage.workflow.retrieveContext.title',
      message: 'Retrieve historical context',
      description: 'Homepage workflow step title for loading project memory',
    }),
    body: translate({
      id: 'homepage.workflow.retrieveContext.body',
      message:
        'spec-index looks up relevant decisions, root causes, and pitfalls before planning or correction work starts.',
      description: 'Homepage workflow step body for loading project memory',
    }),
  },
  {
    label: '03',
    title: translate({
      id: 'homepage.workflow.defineDone.title',
      message: 'Define done before implementation',
      description: 'Homepage workflow step title for planning',
    }),
    body: translate({
      id: 'homepage.workflow.defineDone.body',
      message:
        'spec-plan turns fuzzy requests into an implementation-ready spec with testable acceptance criteria and execution guardrails.',
      description: 'Homepage workflow step body for planning',
    }),
  },
  {
    label: '04',
    title: translate({
      id: 'homepage.workflow.implement.title',
      message: 'Implement in the normal coding loop',
      description: 'Homepage workflow step title for implementation',
    }),
    body: translate({
      id: 'homepage.workflow.implement.body',
      message:
        'The skills do not replace coding. They tighten the contract around what should happen and how the work will be verified.',
      description: 'Homepage workflow step body for implementation',
    }),
  },
  {
    label: '05',
    title: translate({
      id: 'homepage.workflow.correct.title',
      message: 'Correct with real feedback',
      description: 'Homepage workflow step title for correction',
    }),
    body: translate({
      id: 'homepage.workflow.correct.body',
      message:
        'If reality diverges from the spec, spec-crlp runs a fix-verify-repeat loop using evidence instead of moving the goalposts.',
      description: 'Homepage workflow step body for correction',
    }),
  },
  {
    label: '06',
    title: translate({
      id: 'homepage.workflow.persist.title',
      message: 'Persist reusable lessons',
      description: 'Homepage workflow step title for saving project memory',
    }),
    body: translate({
      id: 'homepage.workflow.persist.body',
      message:
        'Reusable findings flow back into spec-index so later tasks inherit project memory rather than repeating the same mistakes.',
      description: 'Homepage workflow step body for saving project memory',
    }),
  },
];

const getDocs = (): ReadonlyArray<DocCard> => [
  {
    title: translate({
      id: 'homepage.docs.overview.title',
      message: 'Overview',
      description: 'Homepage docs card title for the overview page',
    }),
    body: translate({
      id: 'homepage.docs.overview.body',
      message:
        'Understand the three skills, their responsibilities, and the default workflow they create together.',
      description: 'Homepage docs card body for the overview page',
    }),
    to: '/docs/intro',
  },
  {
    title: translate({
      id: 'homepage.docs.testing.title',
      message: 'Testing',
      description: 'Homepage docs card title for the testing page',
    }),
    body: translate({
      id: 'homepage.docs.testing.body',
      message:
        'See the smoke tests, local verification steps, and the small eval workflow used to validate this project.',
      description: 'Homepage docs card body for the testing page',
    }),
    to: '/docs/testing',
  },
  {
    title: translate({
      id: 'homepage.docs.benchmark.title',
      message: 'Demo benchmark',
      description: 'Homepage docs card title for the benchmark page',
    }),
    body: translate({
      id: 'homepage.docs.benchmark.body',
      message:
        'Review the 3-prompt local benchmark and what the current numbers do and do not claim.',
      description: 'Homepage docs card body for the benchmark page',
    }),
    to: '/docs/benchmark',
  },
];

const getBenchmarkRows = (): ReadonlyArray<BenchmarkRow> => [
  {
    title: translate({
      id: 'homepage.benchmark.rows.planning.title',
      message: 'Planning an existing feature',
      description: 'Homepage benchmark row title for the planning scenario',
    }),
    baseline: '33.3%',
    withSkills: '100.0%',
    impact: translate({
      id: 'homepage.benchmark.rows.planning.impact',
      message:
        'Adds scope boundaries, acceptance criteria, validation planning, and memory context before implementation starts.',
      description: 'Homepage benchmark row impact for the planning scenario',
    }),
  },
  {
    title: translate({
      id: 'homepage.benchmark.rows.correction.title',
      message: 'Correcting a failing test',
      description: 'Homepage benchmark row title for the correction scenario',
    }),
    baseline: '0.0%',
    withSkills: '100.0%',
    impact: translate({
      id: 'homepage.benchmark.rows.correction.impact',
      message:
        'Pushes the agent toward evidence-driven debugging with explicit root cause, validation, and memory capture.',
      description: 'Homepage benchmark row impact for the correction scenario',
    }),
  },
  {
    title: translate({
      id: 'homepage.benchmark.rows.memory.title',
      message: 'Saving a reusable root cause',
      description: 'Homepage benchmark row title for the memory scenario',
    }),
    baseline: '0.0%',
    withSkills: '100.0%',
    impact: translate({
      id: 'homepage.benchmark.rows.memory.impact',
      message:
        'Turns one-off debugging knowledge into searchable project memory with structure, tags, and reuse conditions.',
      description: 'Homepage benchmark row impact for the memory scenario',
    }),
  },
];

export default function Home(): JSX.Element {
  const signals = getSignals();
  const heroPoints = getHeroPoints();
  const features = getFeatures();
  const workflow = getWorkflow();
  const docs = getDocs();
  const benchmarkRows = getBenchmarkRows();

  return (
    <Layout
      title={translate({
        id: 'homepage.layout.title',
        message: 'Spec-driven skills for AI coding agents',
        description: 'Homepage layout title',
      })}
      description={translate({
        id: 'homepage.layout.description',
        message:
          'spec-coding-skills helps AI coding agents plan with acceptance criteria, correct implementation drift from real feedback, and reuse durable project memory.',
        description: 'Homepage layout description',
      })}>
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>
              {translate({
                id: 'homepage.hero.kicker',
                message: 'Plan. Correct. Remember.',
                description: 'Homepage hero kicker text',
              })}
            </span>
            <Heading as="h1" className={styles.heroTitle}>
              {translate({
                id: 'homepage.hero.title',
                message: 'Give AI coding agents a tighter spec loop.',
                description: 'Homepage hero title',
              })}
            </Heading>
            <p className={styles.heroSubtitle}>
              <strong>spec-coding-skills</strong>{' '}
              {translate({
                id: 'homepage.hero.subtitle',
                message:
                  'helps agents define done before coding, correct drift with evidence, and reuse project memory instead of starting each task cold.',
                description: 'Homepage hero subtitle after the project name',
              })}
            </p>
            <div className={styles.actions}>
              <Link
                className={clsx('button button--primary button--lg', styles.primaryButton)}
                to="/docs/intro">
                {translate({
                  id: 'homepage.hero.primaryAction',
                  message: 'Start with the docs',
                  description: 'Homepage primary CTA label',
                })}
              </Link>
              <Link
                className={clsx('button button--secondary button--lg', styles.secondaryButton)}
                href="https://github.com/H2Sxxa/spec-coding-skills">
                {translate({
                  id: 'homepage.hero.secondaryAction',
                  message: 'View on GitHub',
                  description: 'Homepage secondary CTA label',
                })}
              </Link>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <article className={styles.heroCard}>
              <span className={styles.heroCardLabel}>
                {translate({
                  id: 'homepage.hero.card.label',
                  message: 'What changes in practice',
                  description: 'Homepage hero card label',
                })}
              </span>
              <p className={styles.heroCardTitle}>
                {translate({
                  id: 'homepage.hero.card.title',
                  message:
                    'Planning, correction, and memory stay connected instead of getting improvised task by task.',
                  description: 'Homepage hero card title',
                })}
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
                <span className={styles.installLabel}>
                  {translate({
                    id: 'homepage.install.label',
                    message: 'Install when you are ready',
                    description: 'Homepage install block label',
                  })}
                </span>
                <span className={styles.installHint}>
                  {translate({
                    id: 'homepage.install.hint',
                    message: 'One command, all three skills.',
                    description: 'Homepage install block hint',
                  })}
                </span>
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
            <span className={styles.kicker}>
              {translate({
                id: 'homepage.features.kicker',
                message: 'Three skills',
                description: 'Homepage features section kicker',
              })}
            </span>
            <Heading as="h2">
              {translate({
                id: 'homepage.features.title',
                message: 'One loop for planning, correction, and durable memory.',
                description: 'Homepage features section title',
              })}
            </Heading>
            <p>
              {translate({
                id: 'homepage.features.body',
                message:
                  'Each skill is useful on its own, but the real value appears when they pass context to one another across the life of a task.',
                description: 'Homepage features section body',
              })}
            </p>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article key={feature.title} className={styles.featureCard}>
                <span className={styles.featureEyebrow}>{feature.eyebrow}</span>
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.body}</p>
                <Link className={styles.inlineLink} to={feature.to}>
                  {translate({
                    id: 'homepage.features.link',
                    message: 'Open docs',
                    description: 'Homepage features section link label',
                  })}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workflowSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>
              {translate({
                id: 'homepage.workflow.kicker',
                message: 'Default workflow',
                description: 'Homepage workflow section kicker',
              })}
            </span>
            <Heading as="h2">
              {translate({
                id: 'homepage.workflow.title',
                message: 'How the loop behaves in a real repository.',
                description: 'Homepage workflow section title',
              })}
            </Heading>
            <p>
              {translate({
                id: 'homepage.workflow.body',
                message:
                  'The flow stays lightweight in day-to-day use: read local conventions, plan against explicit done conditions, and close the gap when runtime evidence disagrees.',
                description: 'Homepage workflow section body',
              })}
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
            <span className={styles.kicker}>
              {translate({
                id: 'homepage.benchmark.kicker',
                message: 'Demo benchmark',
                description: 'Homepage benchmark section kicker',
              })}
            </span>
            <Heading as="h2">
              {translate({
                id: 'homepage.benchmark.title',
                message: 'A small signal that the workflow changes agent behavior.',
                description: 'Homepage benchmark section title',
              })}
            </Heading>
            <p>
              {translate({
                id: 'homepage.benchmark.body',
                message:
                  'In a 3-prompt local Codex demo, the skill-guided outputs matched the expected planning, correction, and memory structures far more consistently than baseline generic outputs.',
                description: 'Homepage benchmark section body',
              })}
            </p>
          </div>

          <div className={styles.benchmarkLayout}>
            <div className={styles.metricCard}>
              <div className={styles.metricSummary}>
                <div>
                  <span className={styles.metricSummaryLabel}>
                    {translate({
                      id: 'homepage.benchmark.summary.label',
                      message: 'Overall demo result',
                      description: 'Homepage benchmark summary label',
                    })}
                  </span>
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
                      <span className={styles.metricImpact}>
                        {translate({
                          id: 'homepage.benchmark.metricImpact',
                          message: 'What improved',
                          description: 'Homepage benchmark row impact label',
                        })}
                      </span>
                    </div>
                    <div className={styles.metricCompare}>
                      <div className={styles.metricValueCard}>
                        <span className={styles.metricLabel}>
                          {translate({
                            id: 'homepage.benchmark.metricLabel.baseline',
                            message: 'Baseline',
                            description: 'Homepage benchmark baseline label',
                          })}
                        </span>
                        <p className={styles.metricValue}>{row.baseline}</p>
                      </div>
                      <div className={styles.metricValueCard}>
                        <span className={styles.metricLabel}>
                          {translate({
                            id: 'homepage.benchmark.metricLabel.withSkills',
                            message: 'With skills',
                            description: 'Homepage benchmark with-skills label',
                          })}
                        </span>
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
                <Heading as="h3">
                  {translate({
                    id: 'homepage.benchmark.notes.measures.title',
                    message: 'What it measures',
                    description: 'Homepage benchmark note title for what it measures',
                  })}
                </Heading>
                <p>
                  {translate({
                    id: 'homepage.benchmark.notes.measures.body',
                    message:
                      'The benchmark checks whether the agent produced the workflow artifacts that make real development safer: clear scope, testable acceptance criteria, structured correction steps, and retrievable project memory.',
                    description: 'Homepage benchmark note body for what it measures',
                  })}
                </p>
              </article>
              <article className={styles.noteCard}>
                <Heading as="h3">
                  {translate({
                    id: 'homepage.benchmark.notes.noClaim.title',
                    message: 'What it does not claim',
                    description: 'Homepage benchmark note title for what it does not claim',
                  })}
                </Heading>
                <p>
                  {translate({
                    id: 'homepage.benchmark.notes.noClaim.body',
                    message:
                      'It is not a statistical statement about final code quality. Treat it as a compact before-and-after demo of process quality rather than a universal benchmark claim.',
                    description: 'Homepage benchmark note body for what it does not claim',
                  })}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.docsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>
              {translate({
                id: 'homepage.docs.kicker',
                message: 'Learn faster',
                description: 'Homepage docs section kicker',
              })}
            </span>
            <Heading as="h2">
              {translate({
                id: 'homepage.docs.title',
                message: 'Everything you need to evaluate or adopt the project.',
                description: 'Homepage docs section title',
              })}
            </Heading>
            <p>
              {translate({
                id: 'homepage.docs.body',
                message:
                  'Start with the overview, verify the local workflow, then inspect the compact benchmark before rolling the skills into a real repository.',
                description: 'Homepage docs section body',
              })}
            </p>
          </div>
          <div className={styles.docGrid}>
            {docs.map((doc) => (
              <article key={doc.title} className={styles.docCard}>
                <Heading as="h3">{doc.title}</Heading>
                <p>{doc.body}</p>
                <Link className={styles.inlineLink} to={doc.to}>
                  {translate({
                    id: 'homepage.docs.link',
                    message: 'Read section',
                    description: 'Homepage docs section link label',
                  })}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
