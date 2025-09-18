"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PumpDataConfig } from "@/hooks/use-pump-data"

interface ConfigPanelProps {
  config: PumpDataConfig
  isConnected: boolean
  isLoading: boolean
  error: string | null
  onConfigUpdate: (config: Partial<PumpDataConfig>) => void
  onConnect: (tokenAddress: string) => void
  onDisconnect: () => void
  onClose: () => void
}

export function ConfigPanel({
  config,
  isConnected,
  isLoading,
  error,
  onConfigUpdate,
  onConnect,
  onDisconnect,
  onClose,
}: ConfigPanelProps) {
  const [localTokenAddress, setLocalTokenAddress] = useState(config.tokenAddress)
  const [showTicker, setShowTicker] = useState(true)
  const [overlayPosition, setOverlayPosition] = useState("top-center")
  const [theme, setTheme] = useState("default")
  const [opacity, setOpacity] = useState([95])

  const handleConnect = () => {
    if (localTokenAddress.trim()) {
      onConnect(localTokenAddress.trim())
    }
  }

  const handleTokenAddressChange = (value: string) => {
    setLocalTokenAddress(value)
    onConfigUpdate({ tokenAddress: value })
  }

  return (
    <Card className="w-96 bg-card/95 backdrop-blur-sm border-2 border-primary/20 shadow-2xl max-h-[80vh] overflow-hidden">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Overlay Settings</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-destructive/20">
            ✕
          </Button>
        </div>

        <Tabs defaultValue="connection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connection">Connection</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* Connection Tab */}
          <TabsContent value="connection" className="space-y-4 mt-4">
            {/* Connection Status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/50">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-primary pulse-glow" : error ? "bg-destructive" : "bg-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">
                  {isLoading ? "Connecting..." : isConnected ? "Connected" : error ? "Error" : "Disconnected"}
                </span>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  isConnected
                    ? "bg-primary text-primary-foreground"
                    : error
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {isConnected ? "LIVE" : error ? "FAILED" : "DEMO"}
              </Badge>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Token Address */}
            <div className="space-y-2">
              <Label htmlFor="token-address">Pump.fun Token Address</Label>
              <Input
                id="token-address"
                placeholder="Enter token contract address..."
                value={localTokenAddress}
                onChange={(e) => handleTokenAddressChange(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">Leave empty for demo mode with mock data</p>
            </div>

            {/* Connection Actions */}
            <div className="flex gap-2">
              {isConnected ? (
                <Button onClick={onDisconnect} variant="destructive" size="sm" className="flex-1" disabled={isLoading}>
                  Disconnect
                </Button>
              ) : (
                <Button
                  onClick={handleConnect}
                  size="sm"
                  className="flex-1"
                  disabled={isLoading || !localTokenAddress.trim()}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setLocalTokenAddress("")} disabled={isLoading}>
                Clear
              </Button>
            </div>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-4 mt-4">
            {/* Max Buyers */}
            <div className="space-y-2">
              <Label htmlFor="max-buyers">Max Buyers Shown: {config.maxBuyers}</Label>
              <Slider
                id="max-buyers"
                min={3}
                max={10}
                step={1}
                value={[config.maxBuyers]}
                onValueChange={([value]) => onConfigUpdate({ maxBuyers: value })}
                className="w-full"
              />
            </div>

            {/* Update Interval */}
            <div className="space-y-2">
              <Label htmlFor="update-interval">Update Interval: {config.updateInterval}s</Label>
              <Slider
                id="update-interval"
                min={1}
                max={30}
                step={1}
                value={[config.updateInterval]}
                onValueChange={([value]) => onConfigUpdate({ updateInterval: value })}
                className="w-full"
              />
            </div>

            {/* Overlay Position */}
            <div className="space-y-2">
              <Label htmlFor="position">Overlay Position</Label>
              <Select value={overlayPosition} onValueChange={setOverlayPosition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">Top Left</SelectItem>
                  <SelectItem value="top-center">Top Center</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="bottom-center">Bottom Center</SelectItem>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <Label htmlFor="opacity">Overlay Opacity: {opacity[0]}%</Label>
              <Slider
                id="opacity"
                min={50}
                max={100}
                step={5}
                value={opacity}
                onValueChange={setOpacity}
                className="w-full"
              />
            </div>

            {/* Show Status Ticker */}
            <div className="flex items-center justify-between">
              <Label htmlFor="show-ticker">Show Status Ticker</Label>
              <Switch id="show-ticker" checked={showTicker} onCheckedChange={setShowTicker} />
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-4 mt-4">
            {/* Theme Selection */}
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default (Emerald)</SelectItem>
                  <SelectItem value="gold">Gold Rush</SelectItem>
                  <SelectItem value="neon">Neon Cyber</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Animation Settings */}
            <div className="space-y-3">
              <Label>Animation Settings</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Crown Flash</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rank Change Effects</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Celebration Mode</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Particle Effects</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* OBS Integration */}
            <div className="space-y-2">
              <Label>OBS Browser Source URL</Label>
              <div className="p-2 bg-muted/10 rounded border border-border/50">
                <code className="text-xs text-muted-foreground break-all">
                  {typeof window !== "undefined" ? window.location.href : "http://localhost:3000"}
                </code>
              </div>
              <p className="text-xs text-muted-foreground">
                Copy this URL into OBS as a Browser Source (recommended size: 800x600)
              </p>
            </div>

            {/* Export/Import Settings */}
            <div className="space-y-2">
              <Label>Settings</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Export
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Import
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Reset
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pump.fun Stream Overlay v1.0</span>
            <span>Made for streamers</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
