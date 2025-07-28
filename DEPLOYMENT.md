# Deploying to Vercel

This Astro project is configured for easy deployment to Vercel's free plan.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Bun**: The project uses Bun as the package manager

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository
2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's an Astro project

3. **Configure Build Settings**:
   - **Framework Preset**: Astro (auto-detected)
   - **Build Command**: `bun run build`
   - **Output Directory**: `dist`
   - **Install Command**: `bun install`

4. **Environment Variables**: None required for this project

5. **Deploy**: Click "Deploy" and wait for the build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   bun add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

## Vercel Free Plan Limits

✅ **What's Included**:
- 100GB bandwidth per month
- 100GB storage
- 100GB function execution time
- Automatic HTTPS
- Custom domains (with DNS configuration)
- Automatic deployments from Git

✅ **Perfect for this project**:
- Static site generation
- No server-side functions
- Optimized images and assets
- Fast loading times

## Post-Deployment

1. **Custom Domain** (Optional):
   - Go to your project settings in Vercel
   - Add your custom domain
   - Configure DNS records as instructed

2. **Environment Variables** (if needed later):
   - Add any environment variables in the Vercel dashboard
   - Redeploy to apply changes

3. **Monitoring**:
   - Check the "Analytics" tab for performance metrics
   - Monitor function execution in the "Functions" tab

## Troubleshooting

### Build Issues
- Ensure all dependencies are in `package.json`
- Check that Bun is available in the build environment
- Verify the build command: `bun run build`

### Performance Issues
- Images are optimized for web delivery
- Assets are cached with appropriate headers
- Static generation ensures fast loading

### Domain Issues
- DNS propagation can take up to 48 hours
- Ensure CNAME records point to Vercel
- Check SSL certificate status

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Astro Documentation](https://docs.astro.build)
- [Vercel Community](https://github.com/vercel/vercel/discussions) 