"use client"

import { useState, useEffect, useCallback } from "react"

export interface BuyerData {
  id: string
  wallet: string
  solSpent: number
  buyCount: number
  lastBuy: Date
  rank: number
}

export interface PumpDataConfig {
  tokenAddress: string
  updateInterval: number
  maxBuyers: number
}

export function usePumpData(config: PumpDataConfig) {
  const [buyers, setBuyers] = useState<BuyerData[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock data generator for demonstration
  const generateMockData = useCallback((): BuyerData[] => {
    const walletNames = [
      "CryptoKing420",
      "DiamondHands",
      "MoonShot",
      "ApeStrong",
      "ToTheMoon",
      "WhaleWatcher",
      "DeFiLord",
      "SolanaGod",
      "PumpMaster",
      "TokenHunter",
      "CryptoNinja",
      "BlockchainBoss",
      "SolPrince",
      "DegenerateApe",
      "MemeKing",
    ]

    return Array.from({ length: config.maxBuyers }, (_, index) => {
      const baseAmount = 150 - index * 15 + (Math.random() * 20 - 10)
      return {
        id: `buyer-${index}`,
        wallet: walletNames[index] || `Wallet${index + 1}`,
        solSpent: Math.max(baseAmount, 10),
        buyCount: Math.floor(Math.random() * 15) + 1,
        lastBuy: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
        rank: index + 1,
      }
    }).sort((a, b) => b.solSpent - a.solSpent)
  }, [config.maxBuyers])

  // Simulate real-time updates
  const updateBuyerData = useCallback(() => {
    setBuyers((prevBuyers) => {
      const updated = [...prevBuyers]

      // Randomly update 1-2 buyers
      const updateCount = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < updateCount && updated.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * updated.length)
        const buyer = updated[randomIndex]

        // Simulate a new buy
        const additionalSol = Math.random() * 10 + 1
        updated[randomIndex] = {
          ...buyer,
          solSpent: buyer.solSpent + additionalSol,
          buyCount: buyer.buyCount + 1,
          lastBuy: new Date(),
        }
      }

      // Re-sort and update ranks
      return updated.sort((a, b) => b.solSpent - a.solSpent).map((buyer, index) => ({ ...buyer, rank: index + 1 }))
    })
  }, [])

  // Initialize data
  useEffect(() => {
    if (config.tokenAddress) {
      setIsLoading(true)
      setError(null)

      // Simulate API connection delay
      const timeout = setTimeout(() => {
        setBuyers(generateMockData())
        setIsConnected(true)
        setIsLoading(false)
      }, 1000)

      return () => clearTimeout(timeout)
    } else {
      setBuyers([])
      setIsConnected(false)
    }
  }, [config.tokenAddress, generateMockData])

  // Set up real-time updates
  useEffect(() => {
    if (!isConnected || !config.tokenAddress) return

    const interval = setInterval(updateBuyerData, config.updateInterval * 1000)
    return () => clearInterval(interval)
  }, [isConnected, config.tokenAddress, config.updateInterval, updateBuyerData])

  const connect = useCallback(
    async (tokenAddress: string) => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real implementation, this would connect to pump.fun API
        // For now, we simulate the connection
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setBuyers(generateMockData())
        setIsConnected(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connection failed")
        setIsConnected(false)
      } finally {
        setIsLoading(false)
      }
    },
    [generateMockData],
  )

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setBuyers([])
    setError(null)
  }, [])

  return {
    buyers,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect,
  }
}
