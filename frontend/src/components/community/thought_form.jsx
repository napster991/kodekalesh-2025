'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ThoughtForm() {
  const [thoughts, setThoughts] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return ;

    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    const newThought = {
      id: Date.now().toString(),
      content: input,
      timestamp: new Date(),
    }

    setThoughts(prev => [newThought, ...prev])
    setInput('')
    setIsLoading(false)
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full min-h-24 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? 'Posting...' : 'Share Thought'}
          </Button>
        </div>
      </form>

      {/* Store thoughts in session state for demo */}
      {typeof window !== 'undefined' && (
        <div className="hidden">
          {thoughts.map(thought => (
            <div key={thought.id} data-thought={JSON.stringify(thought)} />
          ))}
        </div>
      )}
    </div>
  )
}
