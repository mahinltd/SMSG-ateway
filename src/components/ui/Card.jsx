// ©2026 SMS GATEWAY Mahin Ltd Developed By Tanvir
import React from 'react'

export default function Card({ children, className = '', style = {}, ...rest }) {
  return (
    <div
      {...rest}
      className={`rounded-[var(--card-radius)] border ${className}`}
      style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
        borderColor: 'var(--glass-border)',
        backdropFilter: `blur(var(--glass-blur))`,
        WebkitBackdropFilter: `blur(var(--glass-blur))`,
        padding: '1rem',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
