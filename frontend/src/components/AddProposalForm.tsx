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
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'rgba(255,255,255,0.6)',
        border: '0.5px solid #D4C4A0',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
      }}
    >
      <input
        type="text"
        placeholder="Tittel *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{
          flex: 1,
          minWidth: '160px',
          background: 'rgba(255,255,255,0.95)',
          border: '0.5px solid #D4C4A0',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      <input
        type="text"
        placeholder="Beskrivelse (valgfritt)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={{
          flex: 2,
          minWidth: '160px',
          background: 'rgba(255,255,255,0.95)',
          border: '0.5px solid #D4C4A0',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        disabled={loading || !title.trim()}
        style={{
          background: loading || !title.trim() ? '#D4C4A0' : '#C8A86B',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          cursor: loading || !title.trim() ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Legger til...' : '+ Legg til'}
      </button>
    </form>
  )
}