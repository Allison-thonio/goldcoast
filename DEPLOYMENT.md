# Goldcoast Foundation - Deployment Guide

## Pre-Deployment Checklist

### Environment Setup
- [ ] Convex project created and deployed
- [ ] Clerk application configured
- [ ] Paystack account setup with webhooks
- [ ] Turnstile site created
- [ ] Upstash Redis instance provisioned
- [ ] Domain registered or transferred

### Environment Variables
Set these in your deployment platform (Vercel, etc.):

```
NEXT_PUBLIC_CONVEX_URL=https://[your-team]-[project].convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
TURNSTILE_SECRET_KEY=...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
NEXT_PUBLIC_APP_URL=https://goldcoast.ng
```

### Custom Domain Setup
1. Update `goldcoast.ng` DNS records to point to Vercel
2. Configure SSL/TLS certificate (auto-provisioned by Vercel)
3. Set redirect from www to apex domain or vice versa

### Admin User Setup
1. Sign up on `goldcoast.ng/sign-up` with Clerk
2. Access Clerk Dashboard
3. Promote first user to `admin` role
4. Second admin promoted to `super_admin` for audit log access

### Paystack Webhook Configuration
1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://goldcoast.ng/api/donations/webhook`
3. Select events: `charge.success`
4. Copy webhook secret to `PAYSTACK_WEBHOOK_SECRET`

## Deployment Steps

### Via Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Import project into Vercel
   - Select framework: Next.js
   - Select root directory: `./`

2. **Set Environment Variables**
   - Settings → Environment Variables
   - Add all keys from above
   - Set for Production

3. **Configure Build**
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Deploy**
   - Trigger deployment from main branch
   - Monitor build logs
   - Wait for success checkmark

5. **Post-Deploy Verification**
   ```bash
   # Test homepage loads
   curl https://goldcoast.ng
   
   # Check CSP headers
   curl -i https://goldcoast.ng | grep Content-Security-Policy
   
   # Verify Clerk redirect
   curl -i https://goldcoast.ng/admin
   ```

### Manual Deployment

1. **Build**
   ```bash
   pnpm install
   pnpm build
   ```

2. **Upload**
   - Deploy `.next` directory
   - Deploy `public` directory
   - Deploy other static assets

3. **Verify**
   - Check all pages load
   - Test donation flow
   - Test admin login

## Post-Deployment Tasks

### Day 1
- [ ] Verify homepage displays correctly
- [ ] Test donation form (use Paystack test card: 4081 5740 3840 3009)
- [ ] Test volunteer form submission
- [ ] Test contact form
- [ ] Verify admin dashboard accessible
- [ ] Check console for errors

### Day 7
- [ ] Monitor error logs
- [ ] Check rate limiting is working
- [ ] Verify donations appear in admin dashboard
- [ ] Test volunteer status pipeline
- [ ] Audit log contains expected entries
- [ ] Load test with artificial traffic

### Monthly
- [ ] Review database usage in Convex
- [ ] Check Clerk user growth
- [ ] Monitor Paystack webhook delivery
- [ ] Review error logs and fix issues
- [ ] Update content if needed

## Testing Integration

### Donation Testing
```bash
# Test card (Paystack)
Card: 4081 5740 3840 3009
Expiry: 12/30
CVV: 819

# Create test donation
curl -X POST https://goldcoast.ng/api/donations/intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10000, "name": "Test Donor", "email": "test@example.com"}'
```

### Volunteer Testing
```bash
# Submit test application
curl -X POST https://goldcoast.ng/api/volunteers/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Volunteer",
    "email": "volunteer@example.com",
    "phone": "+234701234567",
    "experience": "None",
    "area": "Health"
  }'
```

### Contact Testing
```bash
# Submit test message
curl -X POST https://goldcoast.ng/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Sender",
    "email": "sender@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## Rollback Plan

If deployment fails:

1. **Quick Rollback**
   ```bash
   vercel rollback  # Reverts to previous deployment
   ```

2. **Manual Rollback**
   - Revert code to previous commit
   - Push to GitHub
   - Vercel auto-deploys new version

3. **Database Rollback**
   - Convex maintains change history
   - Contact Convex support for point-in-time restore
   - Admin actions logged in audit trail

## Monitoring

### Key Metrics to Track
- Page load time (target: < 2.5s LCP)
- Error rate (target: < 0.1%)
- Donation conversion rate
- Volunteer application volume
- Admin user activity

### Alerts to Configure
- Error rate > 1%
- Payment webhook failures
- High rate limit hits
- Unusual admin activity

### Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Convex Dashboard**: Database queries and latency
- **Paystack Dashboard**: Payment processing health
- **Clerk Dashboard**: Authentication metrics

## Security Checklist

- [ ] HTTPS enforced (automatic on Vercel)
- [ ] CSP headers enabled
- [ ] Rate limiting active
- [ ] Webhook signature verification working
- [ ] Admin auth required
- [ ] Audit log populated
- [ ] No secrets in code
- [ ] Environment variables use production keys

## Disaster Recovery

### Backup Strategy
- Database: Convex automatic backups (30-day retention)
- Code: GitHub repository (always maintained)
- Configuration: Environment variables documented

### Recovery Procedures
1. **Data Loss**: Contact Convex support for restore
2. **Code Loss**: Restore from GitHub
3. **Complete Outage**: Redeploy via Vercel with same env vars

## Cost Optimization

### Services & Pricing (Approximate)
| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| Vercel | Pro | $20/mo | Scales with traffic |
| Convex | Pro | $50/mo | 2M read ops/month |
| Clerk | Free-Pro | $25/mo | 10k MAU included |
| Paystack | Standard | 1.5% + ₦100 | Per transaction |
| Turnstile | Free | $0 | 100k checks/month |
| Upstash | Starter | $7/mo | 10,000 requests/day |
| **Total** | | ~$102/mo | First month estimate |

### Cost Reduction
- Use Convex free tier during development
- Use Clerk free tier for < 1k users
- Optimize database queries
- Cache static pages (Vercel does this automatically)

## Next Steps

1. Configure all integrations
2. Set environment variables
3. Deploy to staging first
4. Run full testing suite
5. Deploy to production
6. Monitor for 24 hours
7. Announce go-live

---

**Last Updated**: August 2, 2026
**Deployment Status**: Ready for Production
