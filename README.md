# Make this page

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/diego-bolds-projects/v0-make-this-page)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/bgi0CDDiNKK)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

### API security configuration

The forms retain their original Resend connection: the existing server-only `RESEND_API_KEY`, the `noreply@resend.dev` senders, and delivery to `eauthermalavene.guatemala@gmail.com`. No Redis account, credentials or new service is required. Subscription submissions remain email notifications to that inbox; they do not add a contact to a mailing list.

The local mail budget has two fixed counters with expiring windows. Defaults are **10 attempts per 60 seconds** and **100 per 24 hours**, combined across contact/subscription handlers that share one JavaScript isolate. Optional `EMAIL_RATE_LIMIT_PER_MINUTE` and `EMAIL_RATE_LIMIT_PER_DAY` can set positive integer limits. Invalid explicit limits return `503`; absent limits use the defaults. Failed provider attempts still consume budget. Request IP headers never create keys or select allowances, so rotating them cannot reset these counters or grow retained state.

**This is a local mitigation, not a distributed quota.** Other processes, serverless instances and cold starts receive separate allowances. It fixes unbounded retained keys and forwarding-header rotation, but the original finding's deployment-wide provider-budget gap remains unresolved under the requirement to keep the existing service setup. A caller can also exhaust a local budget and temporarily block legitimate submissions. A deployment-wide cap requires shared infrastructure or a verified hosting-platform control; no such service was configured in this change.

Browser POSTs require `application/json` and an exact allowed `Origin`. The production domains `https://www.avene.com.gt`, `https://avene.com.gt`, and the legacy `https://avene.guatemala.com` are allowed. `NEXT_PUBLIC_SITE_URL` may add one explicit origin; set it to `http://localhost:3000` for local form testing. Do not include a path, query or fragment. `Referer`, `Host` and forwarding headers do not grant trust. Origin checks do not authenticate command-line clients; the shared budget applies to them too.

`POST /api/fb-capi` is retired (`410` after middleware validation) and performs no external request. The site has no verified purchase workflow or first-party CAPI caller. The existing browser Meta Pixel PageView remains in place. A future CAPI integration must derive events from verified server-side business state.

Run `pnpm test:security` for the regression suite. It uses the actual handlers, a Resend test double and isolated local clocks/state. It sends no network requests and requires no external credentials. It covers successful submissions with only the original Resend configuration, local concurrency, quota expiry and the known separation of allowances between isolates.

Your project is live at:

**[https://vercel.com/diego-bolds-projects/v0-make-this-page](https://vercel.com/diego-bolds-projects/v0-make-this-page)**

## Build your app

Use Node.js 20.9 or newer. Both lockfiles include the security dependency updates (Next.js 16.4.4, Resend 6.37.0 and Zod 4.6.7). `pnpm-workspace.yaml` and npm `overrides` must stay aligned; they pin corrected transitive versions. Unused Nodemailer and resolver dependencies were removed.

Validation commands: `pnpm typecheck`, `pnpm lint`, `pnpm test:security`, `pnpm build`, and `pnpm audit --prod`. Full development audits still flag the Minimatch 3 dependency used by ESLint/plugins; there is no compatible patched 3.x release. Do not force a global upgrade to Minimatch 11: its exports differ from the function API expected by those plugins. This development-only glob issue does not accept public HTTP input in this application. Revisit when the lint dependencies migrate.

Email provider rejections return `502` and `success: false`; a provider error must never show a delivery confirmation.

Continue building your app on:

**[https://v0.dev/chat/projects/bgi0CDDiNKK](https://v0.dev/chat/projects/bgi0CDDiNKK)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
