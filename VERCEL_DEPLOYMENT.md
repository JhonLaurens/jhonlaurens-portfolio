# Vercel Deployment Guide

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jhonlaurens/jhonlaurens-portfolio)

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli) (optional)
- Git repository connected to GitHub

## 🔧 Configuration

### 1. Environment Variables

Set these environment variables in your Vercel dashboard:

```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Optional
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
CONTACT_FORM_API_KEY=your-api-key
```

### 2. Build Settings

- **Framework Preset**: Other
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 3. Domain Configuration

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (optional)
4. Configure DNS records as instructed

## 🏗️ Deployment Methods

### Method 1: GitHub Integration (Recommended)

1. Connect your GitHub repository to Vercel
2. Push changes to `main` branch
3. Automatic deployment triggers

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Manual Upload

1. Zip your project files
2. Upload via Vercel dashboard
3. Configure build settings

## 📁 Project Structure

```
jhonlaurens-portfolio/
├── public/                 # Static files (served directly)
│   ├── assets/            # CSS, JS, images
│   ├── index.html         # Main page
│   └── *.html            # Other pages
├── backend/api/           # Serverless functions
│   ├── server.js         # Main API
│   ├── sitemap.js        # Dynamic sitemap
│   ├── robots.js         # Dynamic robots.txt
│   └── health-check.js   # Health monitoring
├── vercel.json           # Vercel configuration
├── .vercelignore         # Files to ignore
└── package.json          # Dependencies and scripts
```

## ⚡ Performance Optimizations

### Caching Strategy
- **Static assets**: 1 year cache with immutable flag
- **HTML files**: No cache for dynamic content
- **API responses**: Custom cache headers per endpoint

### Edge Functions
- Sitemap generation
- Robots.txt generation
- Health check monitoring

### Compression
- Automatic Gzip/Brotli compression
- Image optimization via Vercel
- CSS/JS minification

## 🔒 Security Features

### Headers
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer Policy: strict-origin-when-cross-origin

### Environment Isolation
- Separate configurations for preview/production
- Secure environment variable handling
- HTTPS enforcement

## 📊 Monitoring

### Built-in Analytics
- Vercel Analytics (automatic)
- Performance monitoring
- Error tracking

### Health Checks
- Automated health monitoring every 6 hours
- Memory and performance metrics
- Uptime tracking

### Custom Monitoring
```bash
# Check health endpoint
curl https://your-domain.vercel.app/api/health-check
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Verify package.json scripts
   npm run build  # Test locally
   ```

2. **404 Errors**
   - Check `vercel.json` routes configuration
   - Verify file paths in `public/` directory
   - Review `.vercelignore` exclusions

3. **Function Timeouts**
   - Increase `maxDuration` in `vercel.json`
   - Optimize function performance
   - Check memory allocation

4. **Environment Variables**
   - Verify variables are set in Vercel dashboard
   - Check variable names and scopes
   - Redeploy after variable changes

### Debug Commands

```bash
# Local development
npm run dev

# Test build locally
npm run build

# Verify Vercel configuration
vercel dev

# Check deployment logs
vercel logs [deployment-url]
```

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **Production**: Triggered on push to `main` branch
- **Preview**: Triggered on pull requests
- **Branch Deployments**: Each branch gets a unique URL

### Deployment Hooks
- Pre-build: Environment setup
- Build: Asset compilation and optimization
- Post-build: Cache warming and validation

## 📈 Scaling

### Performance Tiers
- **Hobby**: Free tier with basic features
- **Pro**: Enhanced performance and analytics
- **Enterprise**: Custom solutions and SLA

### Edge Network
- Global CDN with 40+ regions
- Automatic edge caching
- Smart routing optimization

## 📞 Support

- [Vercel Documentation](https://vercel.com/docs)
- [Community Discord](https://vercel.com/discord)
- [GitHub Issues](https://github.com/jhonlaurens/jhonlaurens-portfolio/issues)

---

**Last Updated**: January 2024  
**Vercel Version**: 2.0  
**Node.js Version**: 18.x