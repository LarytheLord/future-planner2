import React, { useState } from 'react'
import { createPage } from '../lib/notion'

export default function BlankPage() {
  const [content, setContent] = useState('')

  async function handleSave() {
    try {
      await createPage(process.env.NEXT_PUBLIC_NOTION_DATABASE_ID, {
        Name: { title: [{ text: { content: 'New Page' } }] },
        Content: { rich_text: [{ text: { content } }] },
      })
      alert('Page saved to Notion!')
    } catch (error) {
      console.error('Error saving to Notion:', error)
      alert('Failed to save page to Notion')
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Blank Page</h2>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your ideas..."
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save to Notion
      </button>
    </div>
  )
}