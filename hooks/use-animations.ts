"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { BuyerData } from "./use-pump-data"

export interface AnimationState {
  rankChanges: Set<string>
  newEntries: Set<string>
  flashingCrown: boolean
  celebrationMode: boolean
}

export function useAnimations(buyers: BuyerData[]) {
  const [animationState, setAnimationState] = useState<AnimationState>({
    rankChanges: new Set(),
    newEntries: new Set(),
    flashingCrown: false,
    celebrationMode: false,
  })

  const previousBuyers = useRef<BuyerData[]>([])
  const previousTopBuyer = useRef<string | null>(null)

  // Detect changes and trigger animations
  useEffect(() => {
    if (buyers.length === 0) return

    const newRankChanges = new Set<string>()
    const newEntries = new Set<string>()
    let shouldFlashCrown = false
    let shouldCelebrate = false

    // Check for new top buyer
    const currentTopBuyer = buyers[0]?.id
    if (currentTopBuyer && currentTopBuyer !== previousTopBuyer.current) {
      shouldFlashCrown = true
      shouldCelebrate = true
      newRankChanges.add(currentTopBuyer)
      previousTopBuyer.current = currentTopBuyer
    }

    // Check for rank changes
    if (previousBuyers.current.length > 0) {
      buyers.forEach((buyer, index) => {
        const previousBuyer = previousBuyers.current.find((b) => b.id === buyer.id)

        if (!previousBuyer) {
          // New entry
          newEntries.add(buyer.id)
          newRankChanges.add(buyer.id)
        } else if (previousBuyer.rank !== buyer.rank) {
          // Rank changed
          newRankChanges.add(buyer.id)

          // If moved up significantly, trigger celebration
          if (previousBuyer.rank - buyer.rank >= 2) {
            shouldCelebrate = true
          }
        }
      })
    }

    // Update animation state
    setAnimationState({
      rankChanges: newRankChanges,
      newEntries,
      flashingCrown: shouldFlashCrown,
      celebrationMode: shouldCelebrate,
    })

    // Store current state for next comparison
    previousBuyers.current = [...buyers]

    // Clear animations after duration
    const timeout = setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        rankChanges: new Set(),
        newEntries: new Set(),
        flashingCrown: false,
        celebrationMode: false,
      }))
    }, 2000)

    return () => clearTimeout(timeout)
  }, [buyers])

  const triggerCelebration = useCallback((buyerId: string) => {
    setAnimationState((prev) => ({
      ...prev,
      rankChanges: new Set([...prev.rankChanges, buyerId]),
      celebrationMode: true,
    }))

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        celebrationMode: false,
      }))
    }, 3000)
  }, [])

  const triggerFlashCrown = useCallback(() => {
    setAnimationState((prev) => ({
      ...prev,
      flashingCrown: true,
    }))

    setTimeout(() => {
      setAnimationState((prev) => ({
        ...prev,
        flashingCrown: false,
      }))
    }, 1000)
  }, [])

  return {
    animationState,
    triggerCelebration,
    triggerFlashCrown,
  }
}
