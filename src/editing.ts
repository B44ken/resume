import { createContext, useContext } from 'react'

export const EditingContext = createContext(false)

export const useEditing = () => useContext(EditingContext)

// moves the caret to the end of a field once it has been rendered, used after
// structural edits like splitting or deleting a bullet
export const focusField = (field: string) => {
  requestAnimationFrame(() => {
    const el = document.querySelector<HTMLElement>(`[data-field="${CSS.escape(field)}"]`)
    if (!el) return

    el.focus()
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  })
}
