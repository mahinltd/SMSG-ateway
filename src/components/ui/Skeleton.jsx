// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import React from 'react'

export default function Skeleton({ width = '100%', height = 16, className = '' }) {
  return (
    <div
      className={`animate-pulse bg-slate-800/60 rounded ${className}`}
      style={{ width, height }}
    />
  )
}
