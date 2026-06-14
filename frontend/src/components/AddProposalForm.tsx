import { useState } from 'react'
import { createProposal, type Proposal } from '../api/proposals'

export default function AddProposalForm({ onAdded }: { onAdded: (proposal: Proposal) => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    const proposal = await createProposal({ title, description })
    onAdded(proposal)
    setTitle('')
    setDescription('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3">
      <h2 className="font-semibold text-gray-700">Legg til forslag</h2>
      <input
        type="text"
        placeholder="Tittel *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <textarea
        placeholder="Beskrivelse (valgfritt)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-none"
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        className="bg-yellow-400 hover:bg-yellow-500 disabled:opacity-50 text-white font-medium py-2 rounded transition-colors"
      >
        {loading ? 'Legger til...' : 'Legg til forslag'}
      </button>
    </form>
  )
}