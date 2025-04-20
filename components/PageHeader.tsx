import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl opacity-90">{subtitle}</p>}
      </div>
    </div>
  )
} 