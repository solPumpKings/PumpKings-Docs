# 📡 API Documentation

## Overview

The Pump.fun Stream Overlay provides both REST API endpoints and WebSocket connections for real-time data access.

## Base URLs

- **Production**: `https://pump-overlay.vercel.app/api`
- **Development**: `http://localhost:3000/api`
- **WebSocket**: `wss://pump-overlay.vercel.app/ws`

## Authentication

Currently, the API is public and doesn't require authentication. Premium features will require API keys in future versions.

\`\`\`http
# Future authentication header
Authorization: Bearer your-api-key
\`\`\`

## Rate Limits

- **Free Tier**: 100 requests per 15 minutes per IP
- **Premium**: 1000 requests per 15 minutes
- **Pro**: 10000 requests per 15 minutes

## REST API Endpoints

### Get Token Data

Retrieve current leaderboard data for a specific token.

\`\`\`http
GET /api/token/{address}
\`\`\`

**Parameters:**
- `address` (string, required): Token contract address

**Query Parameters:**
- `limit` (number, optional): Number of top buyers to return (default: 10, max: 50)
- `sortBy` (string, optional): Sort criteria - `sol` or `buys` (default: `sol`)
- `timeframe` (string, optional): Time window - `1h`, `24h`, `7d`, `all` (default: `24h`)

**Example Request:**
\`\`\`bash
curl "https://pump-overlay.vercel.app/api/token/ABC123?limit=5&sortBy=sol"
\`\`\`

**Example Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "address": "ABC123",
    "name": "Example Token",
    "symbol": "EXT",
    "price": 0.00123,
    "volume24h": 1234.56,
    "holders": 5678,
    "marketCap": 123456.78,
    "buyers": [
      {
        "wallet": "DEF456...",
        "totalSol": 45.67,
        "buyCount": 12,
        "avgBuySize": 3.81,
        "firstBuy": "2024-01-15T10:30:00Z",
        "lastBuy": "2024-01-15T15:45:00Z",
        "rank": 1,
        "previousRank": 2,
        "avatar": "https://example.com/avatar.jpg",
        "ens": "cryptowhale.eth"
      }
    ],
    "lastUpdate": "2024-01-15T16:00:00Z",
    "totalBuyers": 234
  },
  "meta": {
    "requestId": "req_123456",
    "timestamp": "2024-01-15T16:00:00Z",
    "processingTime": 45
  }
}
\`\`\`

### Get Historical Data

Retrieve historical trading data and leaderboard changes.

\`\`\`http
GET /api/token/{address}/history
\`\`\`

**Query Parameters:**
- `period` (string, required): Time period - `1h`, `6h`, `24h`, `7d`, `30d`
- `interval` (string, optional): Data point interval - `1m`, `5m`, `15m`, `1h` (default: `5m`)
- `metric` (string, optional): Metric to track - `volume`, `buyers`, `price` (default: `volume`)

**Example Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "address": "ABC123",
    "period": "24h",
    "interval": "1h",
    "dataPoints": [
      {
        "timestamp": "2024-01-15T00:00:00Z",
        "volume": 123.45,
        "buyers": 23,
        "price": 0.00120,
        "topBuyer": {
          "wallet": "DEF456...",
          "amount": 12.34
        }
      }
    ]
  }
}
\`\`\`

### Get Wallet Details

Get detailed information about a specific wallet's trading activity.

\`\`\`http
GET /api/wallet/{address}
\`\`\`

**Query Parameters:**
- `tokens` (string, optional): Comma-separated list of token addresses to filter by

**Example Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "wallet": "DEF456...",
    "ens": "cryptowhale.eth",
    "avatar": "https://example.com/avatar.jpg",
    "totalVolume": 1234.56,
    "totalTrades": 89,
    "tokens": [
      {
        "address": "ABC123",
        "name": "Example Token",
        "totalSol": 45.67,
        "buyCount": 12,
        "rank": 1
      }
    ],
    "firstTrade": "2024-01-01T00:00:00Z",
    "lastTrade": "2024-01-15T15:45:00Z"
  }
}
\`\`\`

### Get Market Overview

Get overview of all tracked tokens and market statistics.

\`\`\`http
GET /api/market/overview
\`\`\`

**Example Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "totalTokens": 1234,
    "totalVolume24h": 123456.78,
    "totalTrades24h": 5678,
    "activeTraders24h": 2345,
    "topTokens": [
      {
        "address": "ABC123",
        "name": "Example Token",
        "volume24h": 1234.56,
        "change24h": 15.67
      }
    ],
    "topTraders": [
      {
        "wallet": "DEF456...",
        "volume24h": 123.45,
        "trades24h": 23
      }
    ]
  }
}
\`\`\`

## WebSocket API

### Connection

Connect to the WebSocket endpoint for real-time updates:

\`\`\`javascript
const ws = new WebSocket('wss://pump-overlay.vercel.app/ws');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
\`\`\`

### Subscribe to Token Updates

\`\`\`javascript
// Subscribe to a specific token
ws.send(JSON.stringify({
  type: 'subscribe',
  data: {
    token: 'ABC123',
    interval: 1000 // Update interval in milliseconds
  }
}));
\`\`\`

### Unsubscribe from Updates

\`\`\`javascript
// Unsubscribe from token updates
ws.send(JSON.stringify({
  type: 'unsubscribe',
  data: {
    token: 'ABC123'
  }
}));
\`\`\`

### Message Types

#### Buyers Update
Sent when the leaderboard changes:

\`\`\`json
{
  "type": "buyers_update",
  "data": {
    "token": "ABC123",
    "buyers": [...],
    "timestamp": 1642262400000,
    "changes": [
      {
        "wallet": "DEF456...",
        "oldRank": 3,
        "newRank": 1,
        "change": "rank_up"
      }
    ]
  }
}
\`\`\`

#### Rank Change
Sent when a specific wallet changes rank:

\`\`\`json
{
  "type": "rank_change",
  "data": {
    "token": "ABC123",
    "wallet": "DEF456...",
    "oldRank": 3,
    "newRank": 1,
    "amount": 12.34,
    "timestamp": 1642262400000
  }
}
\`\`\`

#### Whale Alert
Sent when a large transaction occurs:

\`\`\`json
{
  "type": "whale_alert",
  "data": {
    "token": "ABC123",
    "wallet": "DEF456...",
    "amount": 100.0,
    "threshold": 50.0,
    "timestamp": 1642262400000,
    "txHash": "0x123..."
  }
}
\`\`\`

#### New Token
Sent when a new token starts being tracked:

\`\`\`json
{
  "type": "new_token",
  "data": {
    "address": "GHI789",
    "name": "New Token",
    "symbol": "NEW",
    "initialPrice": 0.001,
    "timestamp": 1642262400000
  }
}
\`\`\`

#### Connection Status
Sent to confirm connection status:

\`\`\`json
{
  "type": "connection_status",
  "data": {
    "status": "connected",
    "clientId": "client_123",
    "subscriptions": ["ABC123", "DEF456"],
    "timestamp": 1642262400000
  }
}
\`\`\`

### Error Handling

WebSocket errors are sent in this format:

\`\`\`json
{
  "type": "error",
  "data": {
    "code": "INVALID_TOKEN",
    "message": "Token address is invalid",
    "details": {
      "token": "INVALID123"
    },
    "timestamp": 1642262400000
  }
}
\`\`\`

**Error Codes:**
- `INVALID_TOKEN` - Token address is malformed or doesn't exist
- `RATE_LIMIT_EXCEEDED` - Too many requests from client
- `SUBSCRIPTION_LIMIT` - Maximum subscriptions reached
- `INTERNAL_ERROR` - Server-side error occurred

## SDK Usage

### JavaScript/TypeScript SDK

\`\`\`bash
npm install @pump-overlay/sdk
\`\`\`

\`\`\`typescript
import { PumpOverlayClient } from '@pump-overlay/sdk';

const client = new PumpOverlayClient({
  apiUrl: 'https://pump-overlay.vercel.app/api',
  wsUrl: 'wss://pump-overlay.vercel.app/ws',
  apiKey: 'your-api-key' // Optional for premium features
});

// Get token data
const tokenData = await client.getToken('ABC123');

// Subscribe to real-time updates
client.subscribe('ABC123', (data) => {
  console.log('Token update:', data);
});

// Get historical data
const history = await client.getHistory('ABC123', '24h');
\`\`\`

### React Hooks

\`\`\`typescript
import { usePumpData, useWebSocket } from '@pump-overlay/react';

function MyComponent() {
  // Get token data with automatic updates
  const { data, loading, error } = usePumpData('ABC123', {
    updateInterval: 5000,
    maxEntries: 10
  });

  // WebSocket connection with automatic reconnection
  const { connected, subscribe, unsubscribe } = useWebSocket({
    onMessage: (data) => console.log(data),
    onError: (error) => console.error(error)
  });

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div>
          {data.buyers.map(buyer => (
            <div key={buyer.wallet}>
              {buyer.wallet}: {buyer.totalSol} SOL
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
\`\`\`

## Response Formats

### Success Response
\`\`\`json
{
  "success": true,
  "data": { ... },
  "meta": {
    "requestId": "req_123456",
    "timestamp": "2024-01-15T16:00:00Z",
    "processingTime": 45,
    "rateLimit": {
      "remaining": 95,
      "reset": 1642262400
    }
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "TOKEN_NOT_FOUND",
    "message": "Token with address ABC123 was not found",
    "details": {
      "address": "ABC123",
      "suggestion": "Check if the token address is correct"
    }
  },
  "meta": {
    "requestId": "req_123456",
    "timestamp": "2024-01-15T16:00:00Z"
  }
}
\`\`\`

### Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `TOKEN_NOT_FOUND` | Token address doesn't exist | 404 |
| `INVALID_ADDRESS` | Malformed wallet/token address | 400 |
| `RATE_LIMIT_EXCEEDED` | Too many requests | 429 |
| `INTERNAL_ERROR` | Server error | 500 |
| `VALIDATION_ERROR` | Invalid request parameters | 400 |
| `UNAUTHORIZED` | Invalid or missing API key | 401 |
| `FORBIDDEN` | Insufficient permissions | 403 |

## Webhooks (Premium Feature)

Configure webhooks to receive notifications about important events.

### Setup

\`\`\`http
POST /api/webhooks
Content-Type: application/json
Authorization: Bearer your-api-key

{
  "url": "https://your-server.com/webhook",
  "events": ["rank_change", "whale_alert"],
  "tokens": ["ABC123", "DEF456"],
  "secret": "your-webhook-secret"
}
\`\`\`

### Webhook Payload

\`\`\`json
{
  "event": "rank_change",
  "data": {
    "token": "ABC123",
    "wallet": "DEF456...",
    "oldRank": 3,
    "newRank": 1,
    "amount": 12.34,
    "timestamp": 1642262400000
  },
  "webhook": {
    "id": "wh_123456",
    "timestamp": 1642262400000
  }
}
\`\`\`

### Verification

Verify webhook authenticity using HMAC:

\`\`\`javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === `sha256=${expectedSignature}`;
}
\`\`\`

## Testing

### Postman Collection

Import our Postman collection for easy API testing:

\`\`\`bash
curl -o pump-overlay-api.json https://pump-overlay.vercel.app/api/postman
\`\`\`

### Test Endpoints

Use these test endpoints for development:

- **Test Token**: `TEST123456789` - Always returns sample data
- **Test WebSocket**: `wss://pump-overlay.vercel.app/ws/test` - Sends mock updates

### Mock Data

Enable mock data mode for testing:

\`\`\`http
GET /api/token/ABC123?mock=true
\`\`\`

This returns realistic but fake data for development purposes.
