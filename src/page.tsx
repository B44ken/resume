import { useEffect, useRef, useState } from 'react'
import { Resume } from './resume'
import { EditingProvider } from './editable'
import { useAutoFit } from './fit'
import {
  FONT_BOUNDS, FONT_STEP, LINE_BOUNDS, LINE_STEP,
  clamp, clearResume, defaultFit, defaultResume, loadFit, loadResume, parseResume, saveFit, saveResume,
} from './data'
import type { Bounds, FitLimits, ResumeData } from './data'

const ToolbarButton: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) =>
  <button type="button" onClick={onClick} className="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-100 cursor-pointer">
    {children}
  </button>

type NumberFieldProps = { value: number, bounds: Bounds, step: number, title: string, onChange: (value: number) => void }

// a half finished entry like "1" is out of bounds and would be clamped into
// something the typist did not ask for, so only usable values are applied while
// typing and whatever is left over is clamped once the field is left
const NumberField: React.FC<NumberFieldProps> = ({ value, bounds, step, title, onChange }) => {
  const [text, setText] = useState<string | null>(null)

  const commit = () => {
    const next = Number(text)
    setText(null)
    if (text !== null && text.trim() !== '' && Number.isFinite(next)) onChange(clamp(next, bounds))
  }

  return <input
    type="number"
    inputMode="decimal"
    title={title}
    aria-label={title}
    min={bounds.min}
    max={bounds.max}
    step={step}
    value={text ?? String(value)}
    className="w-14 px-1 py-0.5 rounded border border-gray-300 tabular-nums"
    onChange={event => {
      setText(event.target.value)
      const next = Number(event.target.value)
      if (event.target.value.trim() === '' || !Number.isFinite(next)) return
      if (next >= bounds.min && next <= bounds.max) {
        setText(null)
        onChange(next)
      }
    }}
    onBlur={commit}
    onKeyDown={event => { if (event.key === 'Enter') event.currentTarget.blur() }}
  />
}

type FitFieldsProps = { label: string, bounds: Bounds, step: number, value: Bounds, onChange: (value: Bounds) => void }

const FitFields: React.FC<FitFieldsProps> = ({ label, bounds, step, value, onChange }) =>
  <span className="inline-flex items-center gap-1">
    <span>{label}</span>
    <NumberField
      value={value.min}
      bounds={bounds}
      step={step}
      title={`minimum ${label}`}
      onChange={min => onChange({ min, max: Math.max(min, value.max) })}
    />
    <span>–</span>
    <NumberField
      value={value.max}
      bounds={bounds}
      step={step}
      title={`maximum ${label}`}
      onChange={max => onChange({ min: Math.min(max, value.min), max })}
    />
  </span>

export const Page = () => {
  const [data, setData] = useState<ResumeData>(loadResume)
  const [editing, setEditing] = useState(true)
  const [fit, setFit] = useState<FitLimits>(loadFit)
  const fileInput = useRef<HTMLInputElement>(null)
  const sheet = useAutoFit<HTMLDivElement>(fit)

  useEffect(() => saveResume(data), [data])
  useEffect(() => saveFit(fit), [fit])

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
    setFit(defaultFit())
  }

  return (
    <div className='mx-auto my-4 max-w-[8.5in] h-full print:m-0'>
      <div className="print:hidden flex flex-wrap justify-center items-center gap-2 mb-3 text-sm text-gray-700">
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
        <FitFields
          label="font"
          bounds={FONT_BOUNDS}
          step={FONT_STEP}
          value={fit.fontSize}
          onChange={fontSize => setFit({ ...fit, fontSize })}
        />
        <FitFields
          label="line"
          bounds={LINE_BOUNDS}
          step={LINE_STEP}
          value={fit.lineHeight}
          onChange={lineHeight => setFit({ ...fit, lineHeight })}
        />
      </div>
      <div ref={sheet} className="shadow-lg py-3 px-7 print:h-full print:shadow-none">
        <EditingProvider value={editing}>
          <Resume data={data} onChange={setData} />
        </EditingProvider>
      </div>
    </div>
  );
}
