# Deployment Guide for Vercel

## ✅ Build Status: PASSING

Your Echelon store is ready to deploy to Vercel!

## 📋 Pre-Deployment Checklist

- [x] Build passes locally (`npm run build`)
- [x] All TypeScript errors resolved
- [x] Old pages directory removed
- [x] Convex functions configured
- [ ] Environment variables ready
- [ ] Admin credentials updated

## 🚀 Deployment Steps

### 1. Deploy Convex Backend

First, deploy your Convex backend to production:

```bash
npx convex deploy
```

This will give you a production Convex URL like:
`https://your-project.convex.cloud`

### 2. Push to GitHub

```bash
git add .
git commit -m "Ready for production"
git push origin main
```

### 3. Deploy to Vercel

#### Option A: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### Option B: Vercel CLI
```bash
npm i -g vercel
vercel
```

### 4. Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```
NEXT_PUBLIC_CONVEX_URL=https://your-production-url.convex.cloud
```

**Important:** Use your PRODUCTION Convex URL, not the dev URL!

### 5. Redeploy

After adding environment variables, trigger a new deployment:
- Go to Deployments tab
- Click "Redeploy" on the latest deployment

## 🔒 Security Checklist

### Update Admin Credentials

**CRITICAL:** Change default admin credentials before going live!

1. Update `convex/functions/setupAdmin.ts`:
```typescript
await db.insert("admins", {
  username: "your-secure-username",
  password: "your-secure-password-hash", // Use bcrypt in production!
});
```

2. Run the setup function in Convex dashboard

### Recommended Security Improvements

1. **Hash Passwords**: Use bcrypt or similar
2. **Add JWT Auth**: Implement proper session management
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Input Validation**: Add server-side validation
5. **HTTPS Only**: Ensure all traffic uses HTTPS

## 🔧 Post-Deployment

### 1. Test Your Site

Visit your Vercel URL and test:
- [ ] Homepage loads
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Order placement works
- [ ] Order tracking works
- [ ] Admin login works
- [ ] Admin dashboard works
- [ ] Image uploads work

### 2. Set Up Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### 3. Monitor Performance

- Check Vercel Analytics
- Monitor Convex usage
- Set up error tracking (Sentry, etc.)

## 🐛 Troubleshooting

### Build Fails on Vercel

**Issue**: TypeScript errors
**Solution**: Run `npm run build` locally first to catch errors

**Issue**: Missing environment variables
**Solution**: Double-check `NEXT_PUBLIC_CONVEX_URL` is set

### Images Not Loading

**Issue**: Convex storage URLs not working
**Solution**: Ensure you're using production Convex URL

### Admin Can't Login

**Issue**: Credentials not working
**Solution**: Run setupAdmin function in Convex dashboard

### Orders Not Saving

**Issue**: Convex mutations failing
**Solution**: Check Convex logs in dashboard

## 📊 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function execution
- Check analytics

### Convex Dashboard
- View database queries
- Monitor function calls
- Check storage usage
- View logs

## 🔄 Updates

To deploy updates:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically deploy the changes.

## 📈 Scaling Considerations

### When You Grow:
1. **Database Indexes**: Add indexes for frequently queried fields
2. **Image CDN**: Consider using a dedicated CDN
3. **Caching**: Implement Redis for session management
4. **Load Balancing**: Vercel handles this automatically
5. **Database Sharding**: Convex scales automatically

## 💰 Cost Estimates

### Vercel (Hobby Plan - Free)
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS
- Edge Network

### Convex (Free Tier)
- 1GB storage
- 1M function calls/month
- Real-time updates

**Upgrade when:**
- Traffic exceeds free tier limits
- Need custom domains
- Require advanced features

## 🎉 You're Live!

Your Echelon store is now live and ready to accept orders!

**Next Steps:**
1. Add your first products
2. Test the complete checkout flow
3. Share your store URL
4. Start selling!

---

Need help? Check:
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Convex Docs](https://docs.convex.dev)
