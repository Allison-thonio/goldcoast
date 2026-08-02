# Goldcoast Developmental Foundation Website

A comprehensive nonprofit website built with Next.js 16, featuring real-time data management, admin dashboard, donation processing, and volunteer management systems.

## Stack

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS v4
- **Backend**: Convex (data + real-time updates)
- **Auth**: Clerk (admin authentication with MFA)
- **Payments**: Paystack (card donations)
- **Bot Protection**: Cloudflare Turnstile
- **Rate Limiting**: Upstash Redis
- **Validation**: Zod (server-side)

## Features

### Public Pages
- **Homepage**: Eyebrow copy, hero section, Field Ledger, programme carousel, field notes preview
- **About**: Founding narrative, vision, timeline, leadership team, partners
- **Programmes** (3): Health, Education, Youth Development with detailed descriptions
- **Donate**: Multi-method payment (card/bank/crypto) with Turnstile verification
- **Volunteer**: Application form with status pipeline visualization
- **Field Notes**: Project stories with category filtering
- **Contact**: Contact form, location info, bank details
- **Legal**: Privacy Policy and Terms (flagged for legal review)
- **404**: Custom not-found page

### Admin Dashboard
- **Donations**: View pending, verified, failed donations; verify card payments; manually approve bank/crypto transfers
- **Volunteers**: Application pipeline (applied → screening → induction → placed)
- **Contact Messages**: View and manage incoming messages
- **Audit Log**: Track all admin actions (super_admin only)
- **Settings**: Admin management (super_admin only)

### Backend Systems
- **Convex Schema**: 8 tables (programmes, donations, volunteer_applications, contact_messages, admins, audit_log, field_ledger_aggregate)
- **API Routes**: Donation intent creation, Paystack webhook verification, volunteer application submission, contact form submission
- **Security**: HMAC-SHA512 webhook verification, CORS checks, server-side validation, rate limiting per IP

## Setup Instructions

### 1. Environment Variables

Create `.env.local` file with all variables from `.env.example`. You'll need:

```bash
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Clerk (get from dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Paystack (get from dashboard)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_... PAYSTACK_SECRET_KEY=sk_live_...

# Cloudflare Turnstile (get from dashboard)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...

# Upstash Redis (get from dashboard)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# App config
NEXT_PUBLIC_APP_URL=https://goldcoast.ng  # or http://localhost:3000 for dev
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Deploy Convex Schema

```bash
# Install Convex CLI if not already done
npm install -g convex

# Deploy schema and functions
convex deploy
```

### 4. Set Up Clerk Organization

- Create a new application in Clerk
- Set up MFA for the `super_admin` role
- Add admin users and assign roles via Convex database

### 5. Configure Integrations

1. **Paystack**: Set webhook URL to `{your-domain}/api/donations/webhook`
2. **Turnstile**: Add your domain to the allowed list
3. **Upstash Redis**: Ensure REST API is enabled

### 6. Run Development Server

```bash
pnpm dev
```

Visit http://localhost:3000

### 7. Access Admin Dashboard

- Navigate to `/admin`
- Sign in with Clerk
- System will verify your admin role against Convex database

## Architecture Notes

### Data Flow
- **Client → API Route**: Form submission with Turnstile token
- **API Route → Convex**: Server-side validation, then Convex mutation
- **Convex → Database**: Persistent storage with indexes for efficiency
- **Webhook → Convex**: Paystack sends payment confirmation to webhook, which updates donation status

### Security
- **CORS checks** on all public POST endpoints
- **Rate limiting** via Upstash Redis (per IP, per endpoint)
- **Webhook verification** using HMAC-SHA512 signature
- **Two-layer auth** on admin routes (Clerk + Convex role check)
- **No client-side auth**: All sensitive operations validated server-side
- **CSP headers** in next.config.mjs for script source restrictions

### Data Flags
Pages marked with "NEEDS REAL DATA" indicate where real content should replace placeholders:
- Testimonial quotes (do not fabricate)
- Programme-specific metrics (where unavailable)
- Photo collage images (awaiting client photos)
- Contact email (unconfirmed - currently using placeholder)
- Legal documents (flagged for legal review)

## Deployment

### Vercel
```bash
# Push to GitHub first
git push origin main

# Deploy on Vercel
vercel deploy
```

### Post-Deployment Checklist
- [ ] Convex schema deployed
- [ ] Clerk configuration complete with production keys
- [ ] Paystack webhook URL configured
- [ ] Turnstile production site key active
- [ ] Upstash Redis connection tested
- [ ] All environment variables set in production
- [ ] Admin users created in database with roles
- [ ] robots.txt indexed correctly
- [ ] CSP headers not blocking legitimate resources
- [ ] Payment flow tested end-to-end

## Common Issues

### "Convex function not found"
- Ensure `convex deploy` was run successfully
- Check that `/convex/_generated/api.ts` exists and is up-to-date

### "Turnstile verification failed"
- Verify site key matches domain
- Check that TURNSTILE_SECRET_KEY is set correctly
- Ensure Turnstile is in verification mode (not report-only)

### "Payment webhook not updating donations"
- Check Paystack webhook is registered and active
- Verify webhook URL is publicly accessible
- Check raw webhook body contains correct signature
- Monitor Paystack dashboard for failed deliveries

### Admin dashboard blank or unauthorized
- Verify user is signed in with Clerk
- Check admin record exists in Convex database
- Confirm role is either "reviewer" or "super_admin"
- Check browser console for auth errors

## File Structure

```
app/
  layout.tsx (root with providers)
  page.tsx (homepage)
  about/
  programmes/
    [slug]/ (detail pages)
  donate/
  volunteer/
  field-notes/
  contact/
  privacy-policy/
  terms/
  admin/ (gated with Clerk + Convex role check)
    donations/
    volunteers/
    audit-log/
    settings/
  api/
    donations/
      intent/ (POST - create donation)
      webhook/ (POST - Paystack verification)
    volunteers/
      apply/ (POST - submit application)
    contact/ (POST - submit message)

components/
  Navigation.tsx (fullscreen mobile nav)
  Footer.tsx
  FieldLedger.tsx (computed aggregates)
  DonateForm.tsx (client - form logic)
  VolunteerForm.tsx (client - form logic)
  ContactForm.tsx (client - form logic)

convex/
  schema.ts (Convex tables)
  lib/auth.ts (requireAdmin guard)
  programmes.ts (queries/mutations)
  donations.ts
  volunteers.ts
  contact.ts
  auditLog.ts

lib/
  rateLimit.ts (Upstash Redis)
  verifyTurnstile.ts (Cloudflare verification)
  utils.ts (Tailwind cn helper)
```

## Contact & Support

For issues during setup, refer to:
- Convex: https://docs.convex.dev
- Clerk: https://clerk.com/docs
- Next.js: https://nextjs.org/docs
- Paystack: https://paystack.com/docs

---

**Last Updated**: August 2026  
**Status**: Complete build with all systems integrated. Ready for integration testing and client data population.
