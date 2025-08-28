export const OPTIONS = ["MONO", "SERVERLESS", "MICRO"] as const;
export type Option = (typeof OPTIONS)[number];

export type Question = {
  id: number;
  text: string;
  techText: string;
  answers: Record<Option, boolean>;
};

export const QUESTIONS: ReadonlyArray<Question> = [
  // 1) Single deployable, small team
  {
    id: 1,
    text: "Do you want a single deployable owned by a small team (e.g., one Express/NestJS/Fastify app in one repo)?",
    techText: "Needs one service/codebase with a single deployment unit.",
    answers: { MONO: true, SERVERLESS: false, MICRO: false },
  },

  // 2) Spiky traffic & minimal ops (serverless)
  {
    id: 2,
    text: "Is traffic spiky/unpredictable and you want pay-per-use with autoscale-to-zero (e.g., AWS Lambda (Node.js), Vercel Functions, Cloudflare Workers)?",
    techText: "Needs serverless autoscaling and a managed runtime (low ops).",
    answers: { MONO: false, SERVERLESS: true, MICRO: false },
  },

  // 3) Always-on workloads (long connections/jobs or steady throughput)
  {
    id: 3,
    text: "Do you have always-on needs: long-lived connections (WebSockets/SSE via Socket.IO/ws), long-running jobs/ETL (FFmpeg, Puppeteer, BullMQ/Agenda), or high, steady throughput?",
    techText: "Needs warm, persistent compute and worker processes.",
    answers: { MONO: true, SERVERLESS: false, MICRO: true },
  },

  // 4) Global presence out of the box
  {
    id: 4,
    text: "Do you want multi-region/edge execution out of the box (e.g., Cloudflare Workers, Vercel Edge) for worldwide low latency?",
    techText: "Needs managed global distribution with minimal platform work.",
    answers: { MONO: false, SERVERLESS: true, MICRO: false },
  },

  // 5) Strong ACID across modules (kept separate)
  {
    id: 5,
    text: "Do features require single-transaction ACID across modules (e.g., one Postgres DB with Prisma transactions)?",
    techText:
      "Needs cross-module transactional consistency within one service/DB boundary.",
    answers: { MONO: true, SERVERLESS: false, MICRO: false },
  },

  // 6) Independent team deploys by domain
  {
    id: 6,
    text: "Do domain teams need independent deploys/ownership with clear bounded contexts (service per domain with REST/gRPC)?",
    techText: "Needs service-per-domain with autonomous lifecycles.",
    answers: { MONO: false, SERVERLESS: false, MICRO: true },
  },

  // 7) Platform/observability maturity
  {
    id: 7,
    text: "Do you already have (or plan to build) the platform & observability needed to run many Node/TS services (Kubernetes/ECS, API gateway, OpenTelemetry, centralized logs, KafkaJS/NATS)?",
    techText:
      "Needs org maturity for distributed systems (platform engineering + tracing + service ops).",
    answers: { MONO: false, SERVERLESS: false, MICRO: true },
  },

  // 8) Compliance/runtime control + low lock-in
  {
    id: 8,
    text: "Do you need tight runtime & network control (VPC, native addons like sharp/FFmpeg, Puppeteer/Chrome) or to keep vendor lock-in low (Node LTS in Docker, portable infra)?",
    techText:
      "Needs full control of runtime/network and portability (containerized Node/TS).",
    answers: { MONO: true, SERVERLESS: false, MICRO: true },
  },

  // 9) Event-driven & integrations
  {
    id: 9,
    text: "Is the system event-driven with many integrations (SNS/SQS/PubSub, KafkaJS, webhooks with Node handlers)?",
    techText: "Needs first-class async/event patterns and integration glue.",
    answers: { MONO: false, SERVERLESS: true, MICRO: true },
  },

  // 10) Managed async & scheduling out of the box
  {
    id: 10,
    text: "Do you want managed async tasks and scheduling out of the box—queues/events/cron with retries & DLQs (e.g., SQS/SNS + EventBridge, Cloudflare Queues + Cron Triggers, Vercel Cron) without running your own workers?",
    techText:
      "Needs managed queues/events/schedulers with at-least-once delivery, retries, and dead-letter queues—no custom worker infrastructure.",
    answers: { MONO: false, SERVERLESS: true, MICRO: false },
  },
];
