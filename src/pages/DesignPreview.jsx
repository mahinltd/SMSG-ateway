// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import React from 'react'
import Card from '../components/ui/Card'
import Skeleton from '../components/ui/Skeleton'

export default function DesignPreview() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-white">Design Preview</h1>
          <p className="text-sm text-slate-300 mt-1">Glassmorphism cards, neon accents, and skeleton loaders.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-300">Messages Today</p>
                <h2 className="text-2xl font-semibold text-white">1,234</h2>
              </div>
              <div className="rounded-full bg-gradient-to-br from-[#00D2FF] to-[#9D50BB] p-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L19 8.5V21H5V8.5L12 2Z" fill="white" opacity="0.9"/></svg>
              </div>
            </div>
            <p className="text-sm text-slate-300">Active devices: <span className="text-white">12</span></p>
          </Card>

          <Card>
            <div className="mb-3">
              <p className="text-xs text-slate-300">Queued Messages</p>
              <h2 className="text-2xl font-semibold text-white">24</h2>
            </div>
            <Skeleton height={10} />
            <div className="mt-3 space-y-2">
              <Skeleton height={12} />
              <Skeleton height={12} width="80%" />
            </div>
          </Card>

          <Card>
            <div className="mb-3">
              <p className="text-xs text-slate-300">System Health</p>
              <h2 className="text-2xl font-semibold text-white">Good</h2>
            </div>
            <p className="text-sm text-slate-300">All services are operational.</p>
          </Card>
        </div>
      </div>
    </main>
  )
}
