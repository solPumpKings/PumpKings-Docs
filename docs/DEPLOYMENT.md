# 🚀 Deployment Guide

Complete guide for deploying the Pump.fun Stream Overlay to various platforms.

## Quick Deploy Options

### 1. Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pump-fun-overlay)

**Why Vercel?**
- ✅ Optimized for Next.js applications
- ✅ Automatic deployments from Git
- ✅ Built-in CDN and edge functions
- ✅ Easy environment variable management
- ✅ Free tier available

### 2. Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/pump-fun-overlay)

### 3. Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/pump-overlay)

## Detailed Deployment Instructions

### Vercel Deployment

#### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   \`\`\`
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Development Command: npm run dev
   \`\`\`

4. **Set Environment Variables**
   \`\`\`env
   NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
   NEXT_PUBLIC_BRAND_NAME=Your Stream Name
   NEXT_PUBLIC_BRAND_COLOR=#10b981
   \`\`\`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your overlay will be available at `https://your-project.vercel.app`

#### Method 2: Vercel CLI

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts:
# ? Set up and deploy "~/pump-fun-overlay"? [Y/n] y
# ? Which scope do you want to deploy to? Your Name
# ? Link to existing project? [y/N] n
# ? What's your project's name? pump-fun-overlay
# ? In which directory is your code located? ./

# Set environment variables
vercel env add NEXT_PUBLIC_PUMP_API_URL
vercel env add NEXT_PUBLIC_WEBSOCKET_URL

# Deploy to production
vercel --prod
\`\`\`

#### Custom Domain Setup

1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Configuration**
   \`\`\`
   Type: CNAME
   Name: overlay (or @)
   Value: cname.vercel-dns.com
   \`\`\`

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes to activate

### Netlify Deployment

#### Method 1: Git Integration

1. **Build Configuration**
   Create `netlify.toml`:
   \`\`\`toml
   [build]
     command = "npm run build && npm run export"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   \`\`\`

2. **Update next.config.js**
   \`\`\`javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };
   
   module.exports = nextConfig;
   \`\`\`

3. **Deploy**
   - Connect GitHub repository to Netlify
   - Configure build settings
   - Add environment variables
   - Deploy

#### Method 2: Netlify CLI

\`\`\`bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Build and deploy
npm run build && npm run export
netlify deploy --prod --dir=out
\`\`\`

### Railway Deployment

1. **Create Railway Project**
   \`\`\`bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   railway init
   
   # Add service
   railway add
   \`\`\`

2. **Configure Environment**
   \`\`\`bash
   # Set environment variables
   railway variables set NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   railway variables set NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
   \`\`\`

3. **Deploy**
   \`\`\`bash
   railway up
   \`\`\`

### Docker Deployment

#### Dockerfile
\`\`\`dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
\`\`\`

#### Docker Compose
\`\`\`yaml
version: '3.8'

services:
  overlay:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
      - NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
      - NEXT_PUBLIC_BRAND_NAME=Your Stream Name
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - overlay
    restart: unless-stopped
\`\`\`

#### Build and Run
\`\`\`bash
# Build the image
docker build -t pump-overlay .

# Run with environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun \
  -e NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws \
  pump-overlay

# Or use docker-compose
docker-compose up -d
\`\`\`

### Self-Hosting

#### Server Requirements

**Minimum Requirements:**
- CPU: 1 vCPU
- RAM: 512MB
- Storage: 1GB SSD
- Bandwidth: 100GB/month
- OS: Ubuntu 20.04+ or CentOS 8+

**Recommended Requirements:**
- CPU: 2 vCPU
- RAM: 2GB
- Storage: 10GB SSD
- Bandwidth: 1TB/month

#### Ubuntu/Debian Setup

1. **Update System**
   \`\`\`bash
   sudo apt update && sudo apt upgrade -y
   \`\`\`

2. **Install Node.js**
   \`\`\`bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   \`\`\`

3. **Install PM2**
   \`\`\`bash
   sudo npm install -g pm2
   \`\`\`

4. **Clone and Setup**
   \`\`\`bash
   git clone https://github.com/yourusername/pump-fun-overlay.git
   cd pump-fun-overlay
   npm install
   npm run build
   \`\`\`

5. **Create PM2 Ecosystem File**
   \`\`\`javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'pump-overlay',
       script: 'npm',
       args: 'start',
       cwd: '/path/to/pump-fun-overlay',
       env: {
         NODE_ENV: 'production',
         PORT: 3000,
         NEXT_PUBLIC_PUMP_API_URL: 'https://api.pump.fun',
         NEXT_PUBLIC_WEBSOCKET_URL: 'wss://api.pump.fun/ws'
       },
       instances: 'max',
       exec_mode: 'cluster',
       watch: false,
       max_memory_restart: '1G',
       error_file: './logs/err.log',
       out_file: './logs/out.log',
       log_file: './logs/combined.log',
       time: true
     }]
   };
   \`\`\`

6. **Start with PM2**
   \`\`\`bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   \`\`\`

#### Nginx Configuration

\`\`\`nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
\`\`\`

#### SSL Certificate with Let's Encrypt

\`\`\`bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
\`\`\`

### Environment-Specific Configurations

#### Development
\`\`\`env
NODE_ENV=development
NEXT_PUBLIC_PUMP_API_URL=http://localhost:3001
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8080
NEXT_PUBLIC_DEBUG=true
\`\`\`

#### Staging
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_PUMP_API_URL=https://staging-api.pump.fun
NEXT_PUBLIC_WEBSOCKET_URL=wss://staging-api.pump.fun/ws
NEXT_PUBLIC_ANALYTICS_ID=staging-analytics-id
\`\`\`

#### Production
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
NEXT_PUBLIC_ANALYTICS_ID=production-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
\`\`\`

## Performance Optimization

### Build Optimization

\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['api.pump.fun', 'your-cdn.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
\`\`\`

### CDN Configuration

#### Cloudflare Setup

1. **Add Site to Cloudflare**
   - Add your domain to Cloudflare
   - Update nameservers

2. **Configure Caching Rules**
   \`\`\`
   Cache Level: Standard
   Browser Cache TTL: 4 hours
   Edge Cache TTL: 2 hours
   \`\`\`

3. **Enable Optimizations**
   - Auto Minify: CSS, JavaScript, HTML
   - Brotli compression
   - Image optimization

#### AWS CloudFront

\`\`\`json
{
  "DistributionConfig": {
    "CallerReference": "pump-overlay-cdn",
    "Origins": [
      {
        "Id": "pump-overlay-origin",
        "DomainName": "your-app.vercel.app",
        "CustomOriginConfig": {
          "HTTPPort": 443,
          "HTTPSPort": 443,
          "OriginProtocolPolicy": "https-only"
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "pump-overlay-origin",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "managed-caching-optimized",
      "Compress": true
    }
  }
}
\`\`\`

## Monitoring and Logging

### Health Checks

Create a health check endpoint:

\`\`\`typescript
// pages/api/health.ts
export default function handler(req, res) {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    env: process.env.NODE_ENV,
    version: process.env.npm_package_version
  };
  
  try {
    res.status(200).send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send();
  }
}
\`\`\`

### Uptime Monitoring

#### UptimeRobot Configuration
\`\`\`bash
# Monitor endpoints
https://your-domain.com/api/health
https://your-domain.com/

# Alert settings
Email: your-email@example.com
SMS: +1234567890
Webhook: https://your-webhook-url.com
\`\`\`

### Error Tracking

#### Sentry Integration

\`\`\`bash
npm install @sentry/nextjs
\`\`\`

\`\`\`javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
\`\`\`

### Analytics

#### Vercel Analytics

\`\`\`bash
npm install @vercel/analytics
\`\`\`

\`\`\`typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
\`\`\`

## Troubleshooting Deployment Issues

### Common Build Errors

#### 1. Out of Memory
\`\`\`bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
\`\`\`

#### 2. Missing Environment Variables
\`\`\`bash
# Check required variables
echo $NEXT_PUBLIC_PUMP_API_URL
echo $NEXT_PUBLIC_WEBSOCKET_URL
\`\`\`

#### 3. TypeScript Errors
\`\`\`bash
# Skip TypeScript errors during build (not recommended)
npm run build -- --no-lint
\`\`\`

### Runtime Issues

#### 1. WebSocket Connection Failed
- Check firewall settings
- Verify WebSocket URL
- Test connection manually

#### 2. API Rate Limiting
- Implement request caching
- Add retry logic
- Use multiple API endpoints

#### 3. Memory Leaks
- Monitor memory usage
- Implement proper cleanup
- Use PM2 memory restart

### Performance Issues

#### 1. Slow Loading
- Enable compression
- Optimize images
- Use CDN

#### 2. High CPU Usage
- Reduce update frequency
- Optimize animations
- Use worker threads

## Security Considerations

### Environment Variables
- Never commit secrets to Git
- Use different keys for different environments
- Rotate API keys regularly

### HTTPS Configuration
- Always use HTTPS in production
- Implement HSTS headers
- Use strong SSL ciphers

### Content Security Policy
\`\`\`javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' wss: https:;
`;

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};
\`\`\`

## Backup and Recovery

### Database Backups
\`\`\`bash
# If using a database, create regular backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
\`\`\`

### Code Backups
- Use Git for version control
- Create regular repository backups
- Store backups in multiple locations

### Disaster Recovery Plan
1. **Identify critical components**
2. **Create recovery procedures**
3. **Test recovery process regularly**
4. **Document all procedures**

## Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Implement session storage
- Scale WebSocket connections

### Vertical Scaling
- Monitor resource usage
- Upgrade server specifications
- Optimize application performance

### Database Scaling
- Implement read replicas
- Use connection pooling
- Consider database sharding

This comprehensive deployment guide should help you successfully deploy your Pump.fun Stream Overlay to any platform. Choose the deployment method that best fits your needs and technical expertise.
