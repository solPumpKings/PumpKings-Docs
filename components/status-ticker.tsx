"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface BuyerData {
  id: string
  wallet: string
  solSpent: number
  buyCount: number
  lastBuy: Date
  rank: number
}

interface StatusTickerProps {
  buyers: BuyerData[]
}

export function StatusTicker({ buyers }: StatusTickerProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const messages = [
    `🔥 ${buyers[0]?.wallet || "CryptoKing420"} is dominating with ${buyers[0]?.solSpent.toFixed(1) || "125.5"} SOL!`,
    `💎 ${buyers.length} whales are battling for the crown!`,
    `⚡ New buy detected! Rankings are shifting!`,
    `🚀 FOMO is real - who will claim the throne?`,
    `👑 Only legends make it to the top 5!`,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
        setIsVisible(true)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <div className="flex justify-center">
      <div
        className={`transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <Badge
          variant="secondary"
          className="bg-card/95 text-card-foreground border-primary/30 px-6 py-2 text-sm font-medium backdrop-blur-sm"
        >
          {messages[currentMessage]}
        </Badge>
      </div>
    </div>
  )
}
