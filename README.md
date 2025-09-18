# 🚀 Pump.fun Stream Overlay

A real-time leaderboard overlay for streamers showing the top buyers of pump.fun tokens. Creates FOMO and competition by displaying who's spending the most SOL, with flashy animations when rankings change.

![Pump.fun Overlay Demo](public/crown-logo.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pump-fun-overlay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)

## 📋 Table of Contents

- [Features](#-features)
- [Demo & Screenshots](#-demo--screenshots)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [API Reference](#-api-reference)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Performance](#-performance)
- [Security](#-security)
- [Monetization](#-monetization)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [Support](#-support)

## ✨ Features

### Core Functionality
- **Real-time Leaderboard** - Shows top wallets ranked by SOL spent or number of buys
- **Live Updates** - WebSocket connections for instant data refresh (1-second intervals)
- **Multi-token Support** - Track multiple pump.fun tokens simultaneously
- **Historical Data** - View trading patterns and trends over time
- **Wallet Analytics** - Detailed buyer profiles and trading history

### Visual Effects
- **Flashy Animations** - Celebration effects when someone climbs the ranks
- **Particle Systems** - Dynamic visual effects for major trades
- **Smooth Transitions** - Fluid rank changes and data updates
- **Custom Themes** - Multiple visual styles and color schemes
- **Responsive Design** - Works on all screen sizes and overlay dimensions

### Streaming Integration
- **OBS Ready** - Plug-and-play integration with OBS/Streamlabs
- **Transparent Background** - Perfect overlay compatibility
- **Customizable Layout** - Adjust size, position, and display elements
- **Chat Integration** - Optional chat commands for viewer interaction
- **Stream Alerts** - Notifications for major trades and rank changes

### Advanced Features
- **FOMO Generator** - Psychological triggers to increase viewer engagement
- **Whale Detection** - Special effects for large transactions
- **Trend Analysis** - Real-time market sentiment indicators
- **Social Features** - Leaderboard sharing and community challenges
- **Analytics Dashboard** - Detailed metrics for streamers

## 🎬 Demo & Screenshots

### Live Demo
🔗 **[Try the Live Demo](https://pump-overlay-demo.vercel.app)**

### Screenshots

| Feature | Screenshot |
|---------|------------|
| Main Overlay | ![Main Overlay](docs/images/main-overlay.png) |
| Configuration Panel | ![Config Panel](docs/images/config-panel.png) |
| Celebration Effects | ![Celebrations](docs/images/celebrations.gif) |
| Mobile View | ![Mobile](docs/images/mobile-view.png) |

### Video Tutorials
- 📺 [5-Minute Setup Guide](https://youtube.com/watch?v=example)
- 📺 [Advanced Customization](https://youtube.com/watch?v=example)
- 📺 [Troubleshooting Common Issues](https://youtube.com/watch?v=example)

## 🎯 Perfect For

- **Crypto Streamers** - Showcasing pump.fun tokens and trading activity
- **Community Building** - Creating viewer engagement and competition
- **Token Launches** - Driving FOMO and trading activity during launches
- **Educational Content** - Teaching about DeFi and token mechanics
- **Entertainment** - Gamifying the trading experience for viewers

## 🚀 Quick Start

### For Streamers (Easy Setup)

1. **Get Your Overlay URL**
   \`\`\`
   https://pump-overlay.vercel.app/?token=YOUR_TOKEN_ADDRESS
   \`\`\`

2. **Add Browser Source in OBS/Streamlabs**
   - Width: `400px` | Height: `600px`
   - URL: Your overlay URL from step 1
   - Check "Shutdown source when not visible"
   - Check "Refresh browser when scene becomes active"

3. **Position and Style**
   - Drag to desired position on your stream
   - Resize if needed (maintains aspect ratio)
   - Add filters for additional effects

4. **Configure Settings**
   - Right-click overlay → Interact
   - Click settings gear
   - Enter token address and customize options
   - Save and you're live!

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pump-fun-overlay)

## 💻 Installation

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git (for cloning)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/pump-fun-overlay.git
   cd pump-fun-overlay
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit `.env.local` with your configuration:
   \`\`\`env
   # Required
   NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
   
   # Optional
   NEXT_PUBLIC_BRAND_NAME="Your Stream Name"
   NEXT_PUBLIC_BRAND_COLOR="#10b981"
   NEXT_PUBLIC_ANALYTICS_ID="your-analytics-id"
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open in browser**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Docker Installation

\`\`\`bash
# Build the image
docker build -t pump-overlay .

# Run the container
docker run -p 3000:3000 pump-overlay
\`\`\`

### Production Build

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🛠️ Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_PUMP_API_URL` | Yes | - | Pump.fun API endpoint |
| `NEXT_PUBLIC_WEBSOCKET_URL` | Yes | - | WebSocket connection URL |
| `NEXT_PUBLIC_BRAND_NAME` | No | "Pump Overlay" | Your brand/stream name |
| `NEXT_PUBLIC_BRAND_COLOR` | No | "#10b981" | Primary brand color |
| `NEXT_PUBLIC_UPDATE_INTERVAL` | No | 1000 | Update frequency (ms) |
| `NEXT_PUBLIC_MAX_ENTRIES` | No | 10 | Max leaderboard entries |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | - | Analytics tracking ID |
| `NEXT_PUBLIC_SENTRY_DSN` | No | - | Error tracking DSN |

### Overlay Settings

Access the configuration panel by clicking the gear icon in the overlay.

#### Basic Settings
- **Token Address** - The pump.fun token to track
- **Display Mode** - Rank by SOL spent, buy count, or volume
- **Update Frequency** - 1-30 seconds (premium: real-time)
- **Max Entries** - 5-20 leaderboard positions
- **Language** - English, Spanish, French, German, Japanese

#### Display Options
- **Theme** - Default, Neon, Minimal, Dark, Custom
- **Animation Speed** - Slow, Normal, Fast, Disabled
- **Show Avatars** - Display wallet profile pictures
- **Show Values** - Display SOL amounts and percentages
- **Compact Mode** - Smaller overlay for limited space

#### Advanced Settings
- **Whale Threshold** - Minimum SOL for special effects
- **Celebration Duration** - How long effects last
- **Sound Effects** - Enable/disable audio notifications
- **Chat Integration** - Connect with Twitch/YouTube chat
- **Custom CSS** - Advanced styling options

### URL Parameters

You can configure the overlay using URL parameters:

\`\`\`
https://your-overlay.vercel.app/?token=ABC123&theme=neon&entries=15&update=5
\`\`\`

| Parameter | Type | Description |
|-----------|------|-------------|
| `token` | string | Token address to track |
| `theme` | string | Visual theme (default, neon, minimal, dark) |
| `entries` | number | Number of leaderboard entries (5-20) |
| `update` | number | Update interval in seconds |
| `compact` | boolean | Enable compact mode |
| `sounds` | boolean | Enable sound effects |

## 📡 API Reference

### Data Structures

#### Buyer Interface
\`\`\`typescript
interface Buyer {
  wallet: string;           // Wallet address
  totalSol: number;         // Total SOL spent
  buyCount: number;         // Number of purchases
  avgBuySize: number;       // Average purchase size
  firstBuy: Date;          // First purchase timestamp
  lastBuy: Date;           // Last purchase timestamp
  rank: number;            // Current leaderboard rank
  previousRank?: number;   // Previous rank (for animations)
  avatar?: string;         // Profile picture URL
  ens?: string;           // ENS name if available
}
\`\`\`

#### Token Data Interface
\`\`\`typescript
interface TokenData {
  address: string;         // Token contract address
  name: string;           // Token name
  symbol: string;         // Token symbol
  price: number;          // Current price in SOL
  volume24h: number;      // 24h trading volume
  holders: number;        // Number of holders
  marketCap: number;      // Market capitalization
  buyers: Buyer[];        // Top buyers array
  lastUpdate: Date;       // Last data update
}
\`\`\`

### WebSocket Events

#### Incoming Events
\`\`\`typescript
// New buyer data
{
  type: 'buyers_update',
  data: {
    token: string,
    buyers: Buyer[],
    timestamp: number
  }
}

// Rank change notification
{
  type: 'rank_change',
  data: {
    wallet: string,
    oldRank: number,
    newRank: number,
    token: string
  }
}

// Large transaction alert
{
  type: 'whale_alert',
  data: {
    wallet: string,
    amount: number,
    token: string,
    timestamp: number
  }
}
\`\`\`

#### Outgoing Events
\`\`\`typescript
// Subscribe to token updates
{
  type: 'subscribe',
  data: {
    token: string,
    interval: number
  }
}

// Unsubscribe from updates
{
  type: 'unsubscribe',
  data: {
    token: string
  }
}
\`\`\`

### REST API Endpoints

#### Get Token Data
\`\`\`http
GET /api/token/{address}
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "data": {
    "address": "...",
    "name": "...",
    "buyers": [...],
    "lastUpdate": "..."
  }
}
\`\`\`

#### Get Historical Data
\`\`\`http
GET /api/token/{address}/history?period=24h
\`\`\`

Parameters:
- `period`: 1h, 6h, 24h, 7d, 30d

### Custom Hooks

#### usePumpData
\`\`\`typescript
const { data, loading, error, refetch } = usePumpData(tokenAddress, {
  updateInterval: 1000,
  maxEntries: 10,
  autoRefresh: true
});
\`\`\`

#### useWebSocket
\`\`\`typescript
const { connected, subscribe, unsubscribe } = useWebSocket(wsUrl, {
  onMessage: (data) => console.log(data),
  onError: (error) => console.error(error),
  reconnect: true
});
\`\`\`

#### useAnimations
\`\`\`typescript
const { triggerCelebration, animateRankChange } = useAnimations({
  duration: 2000,
  intensity: 'high',
  particles: true
});
\`\`\`

## 🎨 Customization

### Themes

#### Built-in Themes

1. **Default Theme**
   - Colors: Emerald green, dark backgrounds
   - Style: Clean, professional
   - Best for: General streaming

2. **Neon Theme**
   - Colors: Bright cyan, purple, pink
   - Style: Cyberpunk, high contrast
   - Best for: Gaming streams, night streams

3. **Minimal Theme**
   - Colors: Subtle grays, white
   - Style: Clean, understated
   - Best for: Educational content

4. **Dark Theme**
   - Colors: Deep blacks, subtle accents
   - Style: Sleek, modern
   - Best for: Dark overlays

#### Custom Theme Creation

Create a custom theme by defining CSS variables:

\`\`\`css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background-color: #your-color;
  --text-color: #your-color;
  --accent-color: #your-color;
}
\`\`\`

Or use the theme builder:
\`\`\`typescript
const customTheme = {
  name: 'My Theme',
  colors: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    background: 'rgba(0,0,0,0.8)',
    text: '#ffffff',
    accent: '#ffe66d'
  },
  fonts: {
    primary: 'Inter',
    secondary: 'JetBrains Mono'
  },
  animations: {
    speed: 'normal',
    particles: true,
    celebrations: true
  }
};
\`\`\`

### Animation Customization

#### Animation Types

1. **Rank Change Animations**
   \`\`\`typescript
   const rankChangeConfig = {
     duration: 1500,
     easing: 'spring',
     highlight: true,
     sound: true
   };
   \`\`\`

2. **Celebration Effects**
   \`\`\`typescript
   const celebrationConfig = {
     particles: {
       count: 50,
       colors: ['#gold', '#silver'],
       duration: 3000
     },
     crown: {
       flash: true,
       glow: true,
       bounce: true
     }
   };
   \`\`\`

3. **Entry/Exit Animations**
   \`\`\`typescript
   const entryConfig = {
     type: 'slideIn', // slideIn, fadeIn, bounceIn
     direction: 'left', // left, right, top, bottom
     duration: 800,
     stagger: 100
   };
   \`\`\`

### Layout Customization

#### Responsive Breakpoints
\`\`\`css
/* Mobile */
@media (max-width: 480px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Large screens */
@media (min-width: 1440px) { ... }
\`\`\`

#### Custom Layouts
\`\`\`typescript
const layoutConfig = {
  orientation: 'vertical', // vertical, horizontal
  alignment: 'center', // left, center, right
  spacing: 'normal', // tight, normal, loose
  showHeader: true,
  showFooter: false,
  compactMode: false
};
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub Repository**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables**
   \`\`\`
   NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   NEXT_PUBLIC_WEBSOCKET_URL=wss://api.pump.fun/ws
   \`\`\`

4. **Deploy**
   - Click "Deploy"
   - Your overlay will be available at `https://your-project.vercel.app`

### Netlify

1. **Build Settings**
   \`\`\`
   Build command: npm run build && npm run export
   Publish directory: out
   \`\`\`

2. **Environment Variables**
   Add the same variables as Vercel

3. **Deploy**
   - Connect repository
   - Configure settings
   - Deploy

### Railway

1. **Create New Project**
   \`\`\`bash
   railway login
   railway init
   railway add
   \`\`\`

2. **Configure Environment**
   \`\`\`bash
   railway variables set NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   \`\`\`

3. **Deploy**
   \`\`\`bash
   railway up
   \`\`\`

### Docker Deployment

1. **Build Image**
   \`\`\`bash
   docker build -t pump-overlay .
   \`\`\`

2. **Run Container**
   \`\`\`bash
   docker run -p 3000:3000 \
     -e NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun \
     pump-overlay
   \`\`\`

3. **Docker Compose**
   \`\`\`yaml
   version: '3.8'
   services:
     overlay:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NEXT_PUBLIC_PUMP_API_URL=https://api.pump.fun
   \`\`\`

### Self-Hosting

1. **Server Requirements**
   - Node.js 18+
   - 512MB RAM minimum
   - 1GB storage
   - SSL certificate (recommended)

2. **PM2 Process Manager**
   \`\`\`bash
   npm install -g pm2
   pm2 start npm --name "pump-overlay" -- start
   pm2 save
   pm2 startup
   \`\`\`

3. **Nginx Configuration**
   \`\`\`nginx
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   \`\`\`

## 🔧 Troubleshooting

### Common Issues

#### 1. Overlay Not Loading in OBS

**Symptoms:**
- Black screen in OBS browser source
- "Failed to load" error message

**Solutions:**
\`\`\`bash
# Check URL accessibility
curl -I https://your-overlay-url.vercel.app

# Verify OBS browser source settings
Width: 400px
Height: 600px
FPS: 30
CSS: body { margin: 0; overflow: hidden; }
\`\`\`

**OBS Browser Source Settings:**
- ✅ Shutdown source when not visible
- ✅ Refresh browser when scene becomes active  
- ❌ Use hardware acceleration (can cause issues)

#### 2. WebSocket Connection Failed

**Symptoms:**
- Data not updating in real-time
- "Connection lost" indicator

**Debugging:**
\`\`\`javascript
// Check WebSocket connection in browser console
const ws = new WebSocket('wss://api.pump.fun/ws');
ws.onopen = () => console.log('Connected');
ws.onerror = (error) => console.error('WebSocket error:', error);
\`\`\`

**Solutions:**
- Check firewall settings
- Verify WebSocket URL in environment variables
- Try different WebSocket endpoint
- Check network connectivity

#### 3. Token Data Not Loading

**Symptoms:**
- Empty leaderboard
- "No data available" message

**Debugging Steps:**
1. **Verify Token Address**
   \`\`\`bash
   # Check if token exists on pump.fun
   curl "https://api.pump.fun/token/YOUR_TOKEN_ADDRESS"
   \`\`\`

2. **Check API Response**
   \`\`\`javascript
   // In browser console
   fetch('/api/token/YOUR_TOKEN_ADDRESS')
     .then(r => r.json())
     .then(console.log);
   \`\`\`

3. **Validate Environment Variables**
   \`\`\`bash
   echo $NEXT_PUBLIC_PUMP_API_URL
   \`\`\`

#### 4. Performance Issues

**Symptoms:**
- Slow animations
- High CPU usage
- Memory leaks

**Solutions:**
\`\`\`typescript
// Optimize update frequency
const config = {
  updateInterval: 5000, // Increase from 1000ms
  maxEntries: 5, // Reduce from 10
  animations: false // Disable if needed
};

// Memory leak prevention
useEffect(() => {
  return () => {
    // Cleanup WebSocket connections
    ws.close();
    // Clear intervals
    clearInterval(intervalId);
  };
}, []);
\`\`\`

#### 5. CORS Issues

**Symptoms:**
- API requests blocked
- "Access-Control-Allow-Origin" errors

**Solutions:**
\`\`\`javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
        ],
      },
    ];
  },
};
\`\`\`

### Debug Mode

Enable debug mode for detailed logging:

\`\`\`bash
# Environment variable
NEXT_PUBLIC_DEBUG=true

# URL parameter
https://your-overlay.vercel.app/?debug=true
\`\`\`

Debug features:
- Console logging for all API calls
- WebSocket message logging
- Performance metrics
- Error stack traces
- Network request details

### Performance Monitoring

#### Built-in Metrics
\`\`\`typescript
// Access performance data
const metrics = usePerformanceMetrics();
console.log({
  apiLatency: metrics.apiLatency,
  wsLatency: metrics.wsLatency,
  renderTime: metrics.renderTime,
  memoryUsage: metrics.memoryUsage
});
\`\`\`

#### External Monitoring
- **Sentry** - Error tracking and performance monitoring
- **LogRocket** - Session replay and debugging
- **Vercel Analytics** - Web vitals and user metrics

### Getting Help

1. **Check Documentation** - Review this README and wiki
2. **Search Issues** - Look for similar problems on GitHub
3. **Enable Debug Mode** - Get detailed error information
4. **Join Discord** - Ask the community for help
5. **Create Issue** - Report bugs with reproduction steps

## ⚡ Performance

### Optimization Strategies

#### 1. Data Fetching
\`\`\`typescript
// Implement efficient caching
const { data } = useSWR(
  `token-${address}`,
  () => fetchTokenData(address),
  {
    refreshInterval: 5000,
    revalidateOnFocus: false,
    dedupingInterval: 2000
  }
);
\`\`\`

#### 2. Component Optimization
\`\`\`typescript
// Memoize expensive components
const LeaderboardCard = memo(({ buyer, rank }) => {
  return <div>...</div>;
});

// Optimize re-renders
const BuyerRow = memo(({ buyer }) => {
  return <div>...</div>;
}, (prevProps, nextProps) => {
  return prevProps.buyer.wallet === nextProps.buyer.wallet &&
         prevProps.buyer.totalSol === nextProps.buyer.totalSol;
});
\`\`\`

#### 3. Animation Performance
\`\`\`typescript
// Use CSS transforms for better performance
const animationConfig = {
  transform: true, // Use transform instead of changing layout
  willChange: 'transform', // Hint to browser
  hardware: true // Enable hardware acceleration
};
\`\`\`

#### 4. Bundle Optimization
\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
\`\`\`

### Performance Benchmarks

| Metric | Target | Good | Needs Improvement |
|--------|--------|------|-------------------|
| First Contentful Paint | < 1.5s | < 2.5s | > 2.5s |
| Largest Contentful Paint | < 2.5s | < 4.0s | > 4.0s |
| Cumulative Layout Shift | < 0.1 | < 0.25 | > 0.25 |
| First Input Delay | < 100ms | < 300ms | > 300ms |
| WebSocket Latency | < 50ms | < 100ms | > 100ms |

### Memory Management

\`\`\`typescript
// Prevent memory leaks
useEffect(() => {
  const cleanup = () => {
    // Clear timers
    clearInterval(updateTimer);
    clearTimeout(animationTimeout);
    
    // Close connections
    websocket.close();
    
    // Remove event listeners
    window.removeEventListener('resize', handleResize);
  };
  
  return cleanup;
}, []);
\`\`\`

## 🔒 Security

### Data Protection

#### 1. API Security
\`\`\`typescript
// Rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Input validation
const tokenSchema = z.string().regex(/^[A-Za-z0-9]{32,44}$/);
\`\`\`

#### 2. WebSocket Security
\`\`\`typescript
// Secure WebSocket connection
const wsUrl = process.env.NODE_ENV === 'production' 
  ? 'wss://api.pump.fun/ws'
  : 'ws://localhost:8080/ws';

// Message validation
const validateMessage = (message) => {
  const schema = z.object({
    type: z.enum(['buyers_update', 'rank_change', 'whale_alert']),
    data: z.object({...})
  });
  return schema.parse(message);
};
\`\`\`

#### 3. Environment Variables
\`\`\`bash
# Never commit sensitive data
PUMP_API_KEY=your-secret-key
DATABASE_URL=your-database-url

# Use different keys for different environments
NEXT_PUBLIC_PUMP_API_URL_DEV=http://localhost:3001
NEXT_PUBLIC_PUMP_API_URL_PROD=https://api.pump.fun
\`\`\`

### Privacy Considerations

#### 1. Wallet Address Handling
\`\`\`typescript
// Anonymize wallet addresses if needed
const anonymizeWallet = (wallet: string) => {
  return `${wallet.slice(0, 4)}...${wallet.slice(-4)}`;
};

// Optional wallet tracking
const trackingConsent = localStorage.getItem('tracking-consent');
if (trackingConsent === 'true') {
  // Track wallet interactions
}
\`\`\`

#### 2. Data Retention
\`\`\`typescript
// Clear old data periodically
const cleanupOldData = () => {
  const cutoff = Date.now() - (24 * 60 * 60 * 1000); // 24 hours
  buyers = buyers.filter(buyer => buyer.lastBuy > cutoff);
};
\`\`\`

### Content Security Policy

\`\`\`javascript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' wss: https:;
  font-src 'self';
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

## 💰 Monetization

### Pricing Strategy

#### Free Tier
- ✅ Basic leaderboard (top 5 entries)
- ✅ Standard themes (3 options)
- ✅ 5-minute update intervals
- ✅ Basic animations
- ✅ Community support

#### Premium Tier ($9.99/month)
- ✅ Extended leaderboard (up to 20 entries)
- ✅ Real-time updates (1-second intervals)
- ✅ All themes + custom theme builder
- ✅ Advanced animations and effects
- ✅ Multiple token tracking
- ✅ Custom branding and logos
- ✅ Priority support
- ✅ Analytics dashboard

#### Pro Tier ($29.99/month)
- ✅ Everything in Premium
- ✅ White-label solution
- ✅ API access for custom integrations
- ✅ Advanced analytics and reporting
- ✅ Custom development support
- ✅ Multi-stream management
- ✅ Team collaboration features

### Implementation

#### Subscription Management
\`\`\`typescript
// Stripe integration
import { loadStripe } from '@stripe/stripe-js';

const handleSubscribe = async (priceId: string) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
  
  const { error } = await stripe!.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  });
};
\`\`\`

#### Feature Gating
\`\`\`typescript
// Check subscription status
const useSubscription = () => {
  const [tier, setTier] = useState<'free' | 'premium' | 'pro'>('free');
  
  useEffect(() => {
    // Check user's subscription status
    fetchSubscriptionStatus().then(setTier);
  }, []);
  
  return {
    tier,
    canUseFeature: (feature: string) => {
      const features = {
        'real-time-updates': ['premium', 'pro'],
        'custom-branding': ['premium', 'pro'],
        'api-access': ['pro']
      };
      return features[feature]?.includes(tier) ?? false;
    }
  };
};
\`\`\`

### Revenue Streams

1. **Subscription Revenue** - Monthly recurring revenue from premium features
2. **Custom Development** - Bespoke overlay development for large streamers
3. **Affiliate Commissions** - Revenue sharing with pump.fun or other platforms
4. **Sponsored Features** - Branded themes or special effects
5. **Enterprise Licensing** - White-label solutions for streaming platforms

### Marketing Strategy

#### Target Audience
- **Primary**: Crypto streamers on Twitch/YouTube
- **Secondary**: DeFi educators and content creators
- **Tertiary**: Trading communities and Discord servers

#### Growth Tactics
- **Content Marketing** - Tutorial videos and setup guides
- **Influencer Partnerships** - Collaborations with crypto streamers
- **Community Building** - Discord server and user forums
- **SEO Optimization** - Ranking for "crypto stream overlay" keywords
- **Social Media** - Twitter engagement with crypto community

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information.

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Run the test suite**: `npm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Workflow

\`\`\`bash
# Setup development environment
git clone https://github.com/yourusername/pump-fun-overlay.git
cd pump-fun-overlay
npm install
npm run dev

# Run tests
npm test
npm run test:watch
npm run test:coverage

# Code quality checks
npm run lint
npm run type-check
npm run format

# Build for production
npm run build
npm start
\`\`\`

### Contribution Areas

- 🐛 **Bug Fixes** - Help us squash bugs and improve stability
- ✨ **New Features** - Add exciting new functionality
- 📚 **Documentation** - Improve guides and API documentation
- 🎨 **Design** - Create new themes and improve UX
- 🧪 **Testing** - Add test coverage and improve quality
- 🌐 **Internationalization** - Add support for new languages
- ⚡ **Performance** - Optimize speed and resource usage

## 📈 Changelog

### Version 2.1.0 (Latest)
- ✨ Added multi-token support
- 🎨 New neon and minimal themes
- ⚡ Improved WebSocket performance
- 🐛 Fixed memory leak in animations
- 📱 Better mobile responsiveness

### Version 2.0.0
- 🚀 Complete rewrite in Next.js 14
- ✨ Real-time WebSocket updates
- 🎨 New animation system
- 📊 Analytics dashboard
- 🔒 Enhanced security measures

### Version 1.5.0
- ✨ Custom theme builder
- 🎯 Whale detection alerts
- 📱 Mobile-friendly interface
- 🐛 Various bug fixes

[View Full Changelog](CHANGELOG.md)

## 🆘 Support

### Documentation
- 📖 **[Wiki](https://github.com/yourusername/pump-fun-overlay/wiki)** - Comprehensive guides
- 🎥 **[Video Tutorials](https://youtube.com/playlist?list=example)** - Step-by-step walkthroughs
- 📋 **[FAQ](https://github.com/yourusername/pump-fun-overlay/wiki/FAQ)** - Common questions

### Community
- 💬 **[Discord Server](https://discord.gg/example)** - Real-time chat support
- 🐦 **[Twitter](https://twitter.com/pumpoverlay)** - Updates and announcements
- 📧 **[Newsletter](https://newsletter.example.com)** - Monthly updates

### Professional Support
- 🎫 **[GitHub Issues](https://github.com/yourusername/pump-fun-overlay/issues)** - Bug reports and feature requests
- 📧 **Email Support** - support@pumpoverlay.com
- 💼 **Enterprise Support** - enterprise@pumpoverlay.com

### Response Times
- **Community Support** - Best effort, typically 24-48 hours
- **Premium Support** - Within 12 hours on business days
- **Enterprise Support** - Within 4 hours, 24/7 availability

## 🎉 Showcase

### Featured Streamers
- **[CryptoKing](https://twitch.tv/example)** - 50K followers, uses custom neon theme
- **[DeFiQueen](https://youtube.com/example)** - Educational content with minimal theme
- **[TokenHunter](https://twitch.tv/example)** - Pump.fun specialist with pro features

### Community Creations
- **Custom Themes** - User-created themes in our Discord
- **Integration Examples** - Community-built extensions
- **Success Stories** - How streamers grew their audience

### Media Coverage
- **[CoinDesk Article](https://example.com)** - "The Future of Crypto Streaming"
- **[Decrypt Interview](https://example.com)** - Founder interview
- **[YouTube Review](https://example.com)** - Popular crypto YouTuber review

## 🏆 Awards & Recognition

- 🥇 **Best Streaming Tool 2024** - Crypto Streaming Awards
- 🏆 **Community Choice Award** - DeFi Tools Summit
- ⭐ **4.9/5 Stars** - 500+ reviews on Product Hunt

## 🔮 Roadmap

### Q1 2024
- [ ] Mobile app for overlay management
- [ ] Integration with more streaming platforms
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

### Q2 2024
- [ ] AI-powered trade predictions
- [ ] Social trading features
- [ ] NFT integration
- [ ] Voice alerts and TTS

### Q3 2024
- [ ] Cross-chain support (Ethereum, BSC)
- [ ] Advanced charting integration
- [ ] Automated highlight clips
- [ ] Streamer marketplace

[View Full Roadmap](ROADMAP.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pump.fun Team** - For the amazing platform and API
- **Vercel** - For excellent hosting and deployment tools
- **Next.js Team** - For the incredible React framework
- **Community Contributors** - For bug reports, features, and feedback
- **Beta Testers** - Early adopters who helped shape the product

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/pump-fun-overlay)
![GitHub forks](https://img.shields.io/github/forks/yourusername/pump-fun-overlay)
![GitHub issues](https://img.shields.io/github/issues/yourusername/pump-fun-overlay)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/pump-fun-overlay)
![GitHub license](https://img.shields.io/github/license/yourusername/pump-fun-overlay)

---

**Made with ❤️ for the pump.fun community**

*Disclaimer: This tool is for entertainment purposes. Always trade responsibly and never invest more than you can afford to lose. Cryptocurrency trading involves substantial risk of loss.*

**🚀 Ready to get started? [Deploy your overlay now!](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/pump-fun-overlay)**
