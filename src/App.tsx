import { useMemo, useState } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

function App() {
  const [text, setText] = useState('')
  const notes = useQuery(api.notes.list)
  const addNote = useMutation(api.notes.add)

  const isDisabled = useMemo(() => text.trim().length === 0, [text])

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault()
    if (isDisabled) return
    await addNote({ text: text.trim() })
    setText('')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            Rental Property
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Notes powered by Convex
          </h1>
          <p className="text-base text-slate-400">
            This is a tiny live demo so you can see data flowing end-to-end.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleAdd}>
            <input
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/40"
              placeholder="Add a note about a property..."
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isDisabled}
            >
              Save note
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
            {notes === undefined ? (
              <p className="text-sm text-slate-400">Loading notes…</p>
            ) : notes.length === 0 ? (
              <p className="text-sm text-slate-400">
                No notes yet. Add the first one above.
              </p>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="rounded-xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-200"
                >
                  {note.text}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
