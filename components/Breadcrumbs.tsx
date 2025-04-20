import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  link: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="container mx-auto px-4 py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.link} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground">{item.label}</span>
            ) : (
              <Link 
                href={item.link} 
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 