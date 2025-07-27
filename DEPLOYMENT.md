# 🚀 Deployment Guide - Centro Betel Website

## Recommended Hosting: Vercel (Free POC)

### Why Vercel?
- ✅ **Perfect for Astro** - Zero configuration needed
- ✅ **Free tier** - 100GB bandwidth/month
- ✅ **Automatic deployments** - Connect to GitHub
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Custom domains** - Free SSL certificates
- ✅ **Analytics** - Built-in performance monitoring

---

## 📋 Pre-Deployment Checklist

### 1. Build the Project
```bash
# Install dependencies
bun install

# Build for production
bun run build

# Test locally
bun run preview
```

### 2. Check Build Output
- Verify `dist/` folder is created
- Check that all images are optimized
- Test all pages work correctly

---

## 🚀 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
bun add -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow the prompts:**
   - Link to existing project? → `N` (new project)
   - Project name → `betel-orphanage`
   - Directory → `./` (current directory)
   - Override settings? → `N` (use defaults)

### Option 2: GitHub Integration (Automatic Deployments)

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

---

## 🔧 Configuration

### Environment Variables (if needed)
```bash
# Add to Vercel dashboard or .env.local
PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### Custom Domain (Optional)
1. Go to Vercel dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Update DNS records as instructed

---

## 📊 Performance Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Core Web Vitals tracking
- Real user metrics

### Lighthouse Scores
- Run Lighthouse audit after deployment
- Target: 90+ for all metrics
- Monitor regularly

---

## 🔄 Continuous Deployment

### Automatic Updates
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Instant rollback capability

### Manual Deployment
```bash
vercel --prod
```

---

## 🆘 Troubleshooting

### Common Issues

1. **Build Fails**
```bash
# Check for missing dependencies
bun install

# Clear cache
rm -rf node_modules .astro dist
bun install
```

2. **Images Not Loading**
- Check image paths in `public/images/`
- Verify image optimization is working
- Check browser console for errors

3. **Performance Issues**
- Run `bun run build` to check bundle size
- Use Vercel Analytics to identify bottlenecks
- Optimize images further if needed

---

## 📈 Scaling Up

### When to Upgrade
- Traffic exceeds 100GB/month
- Need team collaboration
- Require advanced analytics
- Custom server-side features

### Alternative Hosting Options
- **Netlify** - Similar to Vercel, great for static sites
- **GitHub Pages** - Free, good for simple sites
- **Cloudflare Pages** - Excellent performance, generous free tier

---

## 🎯 Next Steps

1. **Deploy to Vercel** using the steps above
2. **Test thoroughly** on different devices
3. **Set up monitoring** with Vercel Analytics
4. **Add custom domain** when ready
5. **Share the URL** with stakeholders

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Docs**: [docs.astro.build](https://docs.astro.build)
- **Community**: [astro.build/community](https://astro.build/community)

---

**Happy Deploying! 🚀** 