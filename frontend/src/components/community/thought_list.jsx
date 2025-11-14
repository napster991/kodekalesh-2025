'use client'

import { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'


export function ThoughtsList() {
  const [thoughts, setThoughts] = useState([
    {
      id: '1',
      content: 'Just launched my new project today! Feeling excited about the possibilities ahead.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: 'Alex',
    },
    {
      id: '2',
      content: 'Minimal design is truly timeless. Less clutter, more focus on what matters.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      author: 'Jordan',
    },
    {
      id: '3',
      content: 'The best part about building in public is the feedback and connections you make along the way.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      author: 'Casey',
    },
  ])

  return (
    <div className="space-y-4">
      {thoughts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No thoughts yet. Be the first to share one!</p>
        </div>
      ) : (
        thoughts.map(thought => (
          <article
            key={thought.id}
            className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-medium text-foreground">{thought.author || 'Anonymous'}</p>
                <time className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(thought.timestamp), { addSuffix: true })}
                </time>
              </div>
            </div>
            <p className="text-foreground leading-relaxed">{thought.content}</p>
          </article>
        ))
      )}
    </div>
  )
}
