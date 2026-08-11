import { useEffect, useRef, useState } from 'react'
import { Resume } from './resume'
import { EditingProvider } from './editable'
import { clearResume, defaultResume, loadResume, parseResume, saveResume } from './data'
import type { ResumeData } from './data'

const ToolbarButton: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) =>
  <button type="button" onClick={onClick} className="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer">
    {children}
  </button>

export const Page = () => {
  const [data, setData] = useState<ResumeData>(loadResume)
  const [editing, setEditing] = useState(true)
  const fileInput = useRef<HTMLInputElement>(null)

  useEffect(() => saveResume(data), [data])

  const onImport = async (file: File | undefined) => {
    if (!file) return

    try {
      const parsed = parseResume(JSON.parse(await file.text()))
      if (!parsed) throw new Error('unrecognized file')
      setData(parsed)
    } catch {
      window.alert('that file does not look like a resume export')
    }
  }

  const onExport = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const onReset = () => {
    if (!window.confirm('discard your edits and go back to the template?')) return
    clearResume()
    setData(defaultResume())
  }

  return (
    <div className='mx-auto my-4 max-w-[8.5in] h-full print:m-0 leading-[1.22rem]'>
      <div className="print:hidden flex justify-center items-center gap-2 mb-3 text-sm text-gray-700">
        <ToolbarButton onClick={() => setEditing(!editing)}>{editing ? 'preview' : 'edit'}</ToolbarButton>
        <ToolbarButton onClick={() => window.print()}>print / pdf</ToolbarButton>
        <ToolbarButton onClick={onExport}>export</ToolbarButton>
        <ToolbarButton onClick={() => fileInput.current?.click()}>import</ToolbarButton>
        <ToolbarButton onClick={onReset}>reset</ToolbarButton>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={event => {
            void onImport(event.target.files?.[0])
            event.target.value = ''
          }}
        />
      </div>
      <div className="shadow-lg py-3 px-7 print:h-full print:shadow-none">
        <EditingProvider value={editing}>
          <Resume data={data} onChange={setData} />
        </EditingProvider>
      </div>
    </div>
  );
}
