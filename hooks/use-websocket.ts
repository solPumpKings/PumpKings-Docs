"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface WebSocketConfig {
  url: string
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

export function useWebSocket(config: WebSocketConfig) {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastMessage, setLastMessage] = useState<any>(null)

  const ws = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null)

  const connect = useCallback(() => {
    try {
      // For demo purposes, we'll simulate a WebSocket connection
      // In production, this would connect to pump.fun's WebSocket API
      console.log("[v0] Attempting WebSocket connection to:", config.url)

      // Simulate connection success
      setTimeout(() => {
        setIsConnected(true)
        setError(null)
        reconnectAttempts.current = 0

        // Simulate receiving messages
        const messageInterval = setInterval(() => {
          if (isConnected) {
            setLastMessage({
              type: "buy",
              wallet: `Wallet${Math.floor(Math.random() * 1000)}`,
              amount: Math.random() * 50 + 1,
              timestamp: Date.now(),
            })
          }
        }, 3000)

        return () => clearInterval(messageInterval)
      }, 500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed")
      setIsConnected(false)

      // Attempt reconnection
      if (reconnectAttempts.current < (config.maxReconnectAttempts || 5)) {
        reconnectAttempts.current++
        reconnectTimeout.current = setTimeout(() => {
          connect()
        }, config.reconnectInterval || 3000)
      }
    }
  }, [config.url, config.reconnectInterval, config.maxReconnectAttempts, isConnected])

  const disconnect = useCallback(() => {
    if (ws.current) {
      ws.current.close()
    }
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current)
    }
    setIsConnected(false)
    setError(null)
    reconnectAttempts.current = 0
  }, [])

  const sendMessage = useCallback(
    (message: any) => {
      if (ws.current && isConnected) {
        ws.current.send(JSON.stringify(message))
      }
    },
    [isConnected],
  )

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return {
    isConnected,
    error,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
  }
}
