import type { ApproachInfoEntry } from "../../types/Question";
import type { OPTIONS } from "./options";

export const APPROACH_INFO: Record<
  (typeof OPTIONS)[number],
  ApproachInfoEntry
> = {
  MONO: {
    label: "Serverful Monolith (Node/TS)",
    blurb:
      "One deployable Node/TS application (e.g., Express/NestJS/Fastify) with a single database. Easiest path for small teams, strong ACID guarantees, long-lived connections (WebSockets/SSE), and long-running jobs. You keep full control over runtime, networking (VPC), and dependencies (native addons like sharp/FFmpeg). Can evolve into a modular monolith or be carved out into services later.",
    useCases: [
      "Small team, one repo, simple deployments",
      "Cross-module ACID in a single DB (Postgres/MySQL)",
      "Long-lived connections (Socket.IO/ws), background workers",
      "Compliance / VPC / native OS deps / low vendor lock-in",
      "High, steady throughput where reserved capacity is cheaper",
    ],
    frameworks: [
      "Web: Express · NestJS · Fastify",
      "Data: Prisma · Drizzle · TypeORM",
      "Jobs: BullMQ · Agenda · node-cron",
      "Runtime: PM2 · Docker · Nginx/Traefik",
      "Obs: OpenTelemetry (OTel) · pino/winston",
    ],
    tips: [
      "Start as a **modular monolith**: enforce domain boundaries in one repo.",
      "Use a job queue (BullMQ) and a separate worker process for heavy tasks.",
      "Centralize schema with Prisma and use migrations for discipline.",
      "Plan an interface layer (REST/gRPC) so you can extract services later.",
    ],
  },

  SERVERLESS: {
    label: "Serverless (Functions & Managed Services)",
    blurb:
      "Functions (Node/TS) and managed services with autoscale-to-zero and pay-per-use. Ideal for spiky or uncertain traffic, minimal ops, and global presence via edge runtimes. Great for event-driven workloads, webhooks, and managed async (queues/cron). Watch out for cold starts, runtime limits, and DB connection pooling.",
    useCases: [
      "Spiky/unpredictable traffic; pay-per-use economics",
      "Global low-latency via edge (Workers/Edge Functions)",
      "Low-ops MVPs, APIs, webhooks, scheduled tasks",
      "Managed queues/events/cron with retries & DLQs",
    ],
    frameworks: [
      "Compute: AWS Lambda (Node.js) · Vercel Functions · Cloudflare Workers/Pages Functions",
      "Async: SQS/SNS + EventBridge · Cloudflare Queues/Cron · Vercel Cron",
      "Data: DynamoDB · serverless Postgres (Neon/PlanetScale via pooling/proxy) · S3/R2/KV",
      "Obs: OpenTelemetry (where supported) · provider tools (X-Ray/Logs)",
    ],
    tips: [
      "Use **connection pooling/proxies** for Postgres/MySQL (e.g., RDS Proxy, PgBouncer/Neon pooling).",
      "Design around **time limits** and **cold starts** (keep functions small; use warmers when needed).",
      "Prefer **event-driven** patterns and idempotent handlers; leverage retries/DLQs.",
      "Edge runtimes often **don’t support native addons**—choose libraries accordingly.",
    ],
  },

  MICRO: {
    label: "Microservices (Node/TS per domain)",
    blurb:
      "Multiple small Node/TS services per bounded context, deployed on containers (Kubernetes/ECS/Cloud Run). Enables independent team ownership, separate deploy cycles, and horizontal scalability. Requires platform/observability maturity (service discovery, tracing, CI/CD, API gateway, message bus). Avoid distributed transactions; use async messaging and well-defined contracts.",
    useCases: [
      "Independent domain teams and deploy lifecycles",
      "Large/complex domains with clear bounded contexts",
      "High/steady throughput and specialized scaling per service",
      "Compliance & portability with containerized workloads",
    ],
    frameworks: [
      "Service: NestJS (microservices) · Fastify · Express",
      "Contracts: OpenAPI/Swagger · gRPC (ts-proto) · tRPC (intra-org)",
      "Messaging: KafkaJS · NATS · RabbitMQ · SQS/SNS",
      "Platform: Kubernetes/EKS/GKE · ECS/Fargate · Cloud Run · API Gateway/Kong/Envoy",
      "Obs: OpenTelemetry · Prometheus/Grafana · Jaeger/Tempo · Loki",
    ],
    tips: [
      "Start from a **modular monolith**; extract services when boundaries stabilize.",
      "Prefer **async messaging** over distributed transactions; embrace eventual consistency.",
      "Define **strong contracts** (OpenAPI/gRPC) and version them; automate client generation.",
      "Invest early in **tracing/logs/metrics** and per-service CI/CD to keep teams fast.",
    ],
  },
};
