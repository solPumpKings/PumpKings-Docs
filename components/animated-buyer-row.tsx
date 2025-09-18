"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { BuyerData } from "@/hooks/use-pump-data"

interface AnimatedBuyerRowProps {
  buyer: BuyerData
  index: number
  isAnimating: boolean
  isNewEntry: boolean
  showCelebration: boolean
}

export function AnimatedBuyerRow({ buyer, index, isAnimating, isNewEntry, showCelebration }: AnimatedBuyerRowProps) {
  const [showParticles, setShowParticles] = useState(false)
  const [bounceAmount, setBounceAmount] = useState(0)

  const formatSol = (amount: number) => amount.toFixed(1)
  const formatWallet = (wallet: string) => {
    if (wallet.length > 12) {
      return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
    }
    return wallet
  }

  const getTimeSince = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ago`
  }

  // Trigger particle effect for celebrations
  useEffect(() => {
    if (showCelebration) {
      setShowParticles(true)
      setBounceAmount(Math.random() * 10 + 5)

      const timeout = setTimeout(() => {
        setShowParticles(false)
        setBounceAmount(0)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [showCelebration])

  return (
    <div className="relative">
      {/* Particle effects */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
      )}

      {/* Main row */}
      <div
        className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 relative ${
          isAnimating
            ? "bg-primary/20 border-primary slide-up pulse-glow transform scale-105"
            : isNewEntry
              ? "bg-secondary/20 border-secondary slide-up"
              : "bg-muted/10 border-border/50"
        }`}
        style={{
          transform: bounceAmount > 0 ? `translateY(-${bounceAmount}px) scale(1.05)` : undefined,
        }}
      >
        {/* Rank indicator */}
        <div className="flex items-center justify-center w-8 h-8 relative">
          {index === 0 ? (
            <div className="relative">
              <Image
                src="/crown-logo.png"
                alt="Crown"
                width={20}
                height={20}
                className={`${isAnimating ? "flash-crown" : ""} ${showCelebration ? "animate-bounce" : ""}`}
              />
              {showCelebration && <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />}
            </div>
          ) : (
            <span
              className={`text-lg font-bold transition-colors duration-300 ${
                isAnimating ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {index + 1}
            </span>
          )}
        </div>

        {/* Buyer information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold truncate transition-colors duration-300 ${
                isAnimating ? "text-primary" : "text-card-foreground"
              }`}
            >
              {formatWallet(buyer.wallet)}
            </span>

            {/* Special badges */}
            {index === 0 && (
              <Badge
                variant="secondary"
                className={`bg-primary text-primary-foreground text-xs transition-all duration-300 ${
                  showCelebration ? "animate-pulse scale-110" : ""
                }`}
              >
                KING
              </Badge>
            )}

            {isNewEntry && (
              <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs animate-pulse">
                NEW
              </Badge>
            )}

            {isAnimating && !isNewEntry && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs animate-bounce">
                UP
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{buyer.buyCount} buys</span>
            <span>{getTimeSince(buyer.lastBuy)}</span>
          </div>
        </div>

        {/* SOL amount with animation */}
        <div className="text-right">
          <div
            className={`text-lg font-bold transition-all duration-300 ${
              isAnimating ? "text-primary scale-110" : "text-primary"
            }`}
          >
            {formatSol(buyer.solSpent)} SOL
          </div>

          {/* Trending indicator */}
          {isAnimating && (
            <div className="text-xs text-primary animate-pulse">📈 +{(Math.random() * 10 + 1).toFixed(1)} SOL</div>
          )}
        </div>

        {/* Glow effect for top buyer */}
        {index === 0 && showCelebration && (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 rounded-lg animate-pulse" />
        )}
      </div>
    </div>
  )
}
