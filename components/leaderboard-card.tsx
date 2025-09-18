"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { AnimatedBuyerRow } from "./animated-buyer-row"
import { useAnimations } from "@/hooks/use-animations"
import type { BuyerData } from "@/hooks/use-pump-data"

interface LeaderboardCardProps {
  buyers: BuyerData[]
  isConnected: boolean
  isLoading?: boolean
}

export function LeaderboardCard({ buyers, isConnected, isLoading }: LeaderboardCardProps) {
  const { animationState } = useAnimations(buyers)

  const formatSol = (amount: number) => {
    return amount.toFixed(1)
  }

  if (isLoading) {
    return (
      <Card className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl min-w-[400px]">
        <div className="p-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="animate-spin">
              <Image src="/crown-logo.png" alt="Crown" width={32} height={32} />
            </div>
            <h2 className="text-xl font-bold text-card-foreground">CONNECTING...</h2>
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-muted/20 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl min-w-[400px] relative overflow-hidden">
      {/* Celebration overlay */}
      {animationState.celebrationMode && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse pointer-events-none" />
      )}

      <div className="p-4 relative">
        {/* Header with animated crown */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Image
              src="/crown-logo.png"
              alt="Crown"
              width={32}
              height={32}
              className={`transition-transform duration-300 ${
                animationState.flashingCrown ? "flash-crown scale-110" : ""
              }`}
            />
            {animationState.celebrationMode && (
              <div className="absolute -inset-2 bg-primary/30 rounded-full animate-ping" />
            )}
          </div>

          <h2
            className={`text-xl font-bold text-card-foreground text-center transition-all duration-300 ${
              animationState.celebrationMode ? "text-primary animate-pulse" : ""
            }`}
          >
            TOP BUYERS
          </h2>

          <div className="relative">
            <Image
              src="/crown-logo.png"
              alt="Crown"
              width={32}
              height={32}
              className={`transition-transform duration-300 ${
                animationState.flashingCrown ? "flash-crown scale-110" : ""
              }`}
            />
            {animationState.celebrationMode && (
              <div className="absolute -inset-2 bg-primary/30 rounded-full animate-ping" />
            )}
          </div>
        </div>

        {/* Connection status with animation */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              isConnected ? "bg-primary pulse-glow" : "bg-destructive animate-pulse"
            }`}
          />
          <span
            className={`text-sm transition-colors duration-300 ${
              isConnected ? "text-muted-foreground" : "text-destructive"
            }`}
          >
            {isConnected ? "LIVE" : "DISCONNECTED"}
          </span>
        </div>

        {/* Animated leaderboard entries */}
        <div className="space-y-2">
          {buyers.slice(0, 5).map((buyer, index) => (
            <AnimatedBuyerRow
              key={buyer.id}
              buyer={buyer}
              index={index}
              isAnimating={animationState.rankChanges.has(buyer.id)}
              isNewEntry={animationState.newEntries.has(buyer.id)}
              showCelebration={animationState.celebrationMode && index === 0}
            />
          ))}
        </div>

        {/* Footer stats with subtle animation */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span className={`transition-colors duration-300 ${animationState.celebrationMode ? "text-primary" : ""}`}>
              Total Volume: {formatSol(buyers.reduce((sum, b) => sum + b.solSpent, 0))} SOL
            </span>
            <span>Active Buyers: {buyers.length}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
