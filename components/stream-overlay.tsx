"use client"

import { useState, useEffect } from "react"
import { LeaderboardCard } from "./leaderboard-card"
import { StatusTicker } from "./status-ticker"
import { ConfigPanel } from "./config-panel"
import { usePumpData, type PumpDataConfig } from "@/hooks/use-pump-data"
import { useWebSocket } from "@/hooks/use-websocket"

export function StreamOverlay() {
  const [showConfig, setShowConfig] = useState(false)
  const [config, setConfig] = useState<PumpDataConfig>({
    tokenAddress: "demo-token",
    updateInterval: 5,
    maxBuyers: 5,
  })

  const { buyers, isConnected, isLoading, error, connect, disconnect } = usePumpData(config)

  // WebSocket for real-time updates (demo implementation)
  const {
    isConnected: wsConnected,
    lastMessage,
    connect: wsConnect,
    disconnect: wsDisconnect,
  } = useWebSocket({
    url: "wss://api.pump.fun/ws", // Demo URL
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
  })

  // Handle configuration updates
  const handleConfigUpdate = (newConfig: Partial<PumpDataConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }))
  }

  // Handle connection
  const handleConnect = async (tokenAddress: string) => {
    await connect(tokenAddress)
    wsConnect()
  }

  const handleDisconnect = () => {
    disconnect()
    wsDisconnect()
  }

  // Log WebSocket messages for debugging
  useEffect(() => {
    if (lastMessage) {
      console.log("[v0] Received WebSocket message:", lastMessage)
    }
  }, [lastMessage])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Configuration toggle - only element with pointer events */}
      <button
        onClick={() => setShowConfig(!showConfig)}
        className="fixed top-4 right-4 z-50 pointer-events-auto bg-card text-card-foreground p-2 rounded-lg border border-border hover:bg-accent transition-colors"
      >
        ⚙️
      </button>

      {/* Configuration panel */}
      {showConfig && (
        <div className="fixed top-16 right-4 z-40 pointer-events-auto">
          <ConfigPanel
            config={config}
            isConnected={isConnected}
            isLoading={isLoading}
            error={error}
            onConfigUpdate={handleConfigUpdate}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onClose={() => setShowConfig(false)}
          />
        </div>
      )}

      {/* Main leaderboard overlay */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <LeaderboardCard buyers={buyers} isConnected={isConnected && wsConnected} isLoading={isLoading} />
      </div>

      {/* Status ticker at bottom */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <StatusTicker buyers={buyers} />
      </div>
    </div>
  )
}
