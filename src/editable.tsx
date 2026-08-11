import { useEffect, useRef } from 'react'
import type { KeyboardEvent, ClipboardEvent, ReactNode } from 'react'
import { EditingContext, useEditing } from './editing'

export const EditingProvider: React.FC<{ value: boolean, children: ReactNode }> = ({ value, children }) =>
  <EditingContext.Provider value={value}>{children}</EditingContext.Provider>

type EditableProps = {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
  field?: string
  onEnter?: () => void
  onEmptyBackspace?: () => void
}

const insertPlainText = (text: string) => {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return
  const range = selection.getRangeAt(0)
  range.deleteContents()
  const node = document.createTextNode(text)
  range.insertNode(node)
  range.setStartAfter(node)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

export const Editable: React.FC<EditableProps> = ({ value, onChange, className, placeholder, field, onEnter, onEmptyBackspace }) => {
  const editing = useEditing()
  const ref = useRef<HTMLSpanElement>(null)

  // the field is uncontrolled: the DOM is only written when the value changed
  // somewhere else (undo, import, reordering), so typing never moves the caret
  useEffect(() => {
    const el = ref.current
    if (el && el.textContent !== value) el.textContent = value
  }, [value, editing])

  if (!editing) return <span className={className}>{value}</span>

  const onKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onEnter?.()
    }
    if (event.key === 'Backspace' && onEmptyBackspace && !event.currentTarget.textContent) {
      event.preventDefault()
      onEmptyBackspace()
    }
  }

  // paste as plain text only, so foreign markup never enters the document
  const onPaste = (event: ClipboardEvent<HTMLSpanElement>) => {
    event.preventDefault()
    insertPlainText(event.clipboardData.getData('text/plain').replace(/\s+/g, ' '))
    onChange(ref.current?.textContent ?? '')
  }

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      role="textbox"
      data-field={field}
      data-placeholder={placeholder}
      className={`editable ${className ?? ''}`}
      onInput={event => onChange(event.currentTarget.textContent ?? '')}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  )
}

type ControlProps = { label: string, title: string, onClick: () => void }

export const Control: React.FC<ControlProps> = ({ label, title, onClick }) =>
  <button
    type="button"
    title={title}
    aria-label={title}
    onMouseDown={event => event.preventDefault()}
    onClick={onClick}
    className="px-1 rounded text-xs leading-4 text-gray-500 bg-gray-100 hover:bg-gray-300 hover:text-gray-900 cursor-pointer"
  >{label}</button>

// controls live in the left margin and only show on hover, so the page keeps
// looking exactly like the printed resume while you edit it
export const Controls: React.FC<{ children: ReactNode }> = ({ children }) => {
  const editing = useEditing()
  if (!editing) return null

  return (
    <span className="absolute right-full top-0 mr-2 hidden md:flex gap-1 opacity-0 group-hover:opacity-100 print:hidden">
      {children}
    </span>
  )
}

export const InlineControls: React.FC<{ children: ReactNode }> = ({ children }) => {
  const editing = useEditing()
  if (!editing) return null

  return <span className="inline-flex gap-1 align-middle opacity-30 hover:opacity-100 print:hidden">{children}</span>
}
