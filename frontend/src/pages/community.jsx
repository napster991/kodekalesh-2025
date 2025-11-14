import { CommunityHeader } from '@/components/community/community_header'
import { ThoughtForm } from '@/components/community/thought_form'
import { ThoughtsList } from '@/components/community/thought_list'

export const metadata = {
  title: 'Community - Share Your Thoughts',
  description: 'A minimal community where everyone can share their thoughts and ideas',
}

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <CommunityHeader />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <ThoughtForm />
        <ThoughtsList />
      </div>
    </main>
  )
}
