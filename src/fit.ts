import { useEffect, useLayoutEffect, useRef } from 'react'

type Range = { min: number, max: number, step: number }

// the printed sheet is us letter, and css uses 96px per inch
export const PAGE_WIDTH = 8.5 * 96
export const PAGE_HEIGHT = 11 * 96

// the ranges the resume is allowed to move within: font size wins first (the
// largest one that still fits a page), then line height is maximised for it
export const FONT_SIZE: Range = { min: 10, max: 16, step: 0.25 }
export const LINE_HEIGHT: Range = { min: 1.15, max: 1.5, step: 0.01 }

const stepCount = (range: Range) => Math.max(0, Math.ceil((range.max - range.min) / range.step))

const valueAt = (range: Range, step: number) => Math.min(range.max, range.min + step * range.step)

// largest value in the range that still fits, falling back to the minimum;
// taller text never fits better, so the predicate can be searched
const largestFitting = (range: Range, fits: (value: number) => boolean) => {
  let low = 0
  let high = stepCount(range)

  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    if (fits(valueAt(range, mid))) low = mid
    else high = mid - 1
  }

  return valueAt(range, low)
}

const fit = (sheet: HTMLElement) => {
  // the editing chrome does not print, so it must not count towards the page
  const chrome = Array.from(sheet.querySelectorAll<HTMLElement>('[data-chrome]'))
  chrome.forEach(element => { element.style.display = 'none' })

  // measuring at the printed width keeps the result the same no matter how
  // wide the window is; nothing is painted before the width is restored
  const width = sheet.style.width
  sheet.style.width = `${PAGE_WIDTH}px`

  const apply = (fontSize: number, lineHeight: number) => {
    sheet.style.fontSize = `${fontSize}px`
    sheet.style.lineHeight = `${lineHeight}`
    return sheet.getBoundingClientRect().height <= PAGE_HEIGHT
  }

  const fontSize = largestFitting(FONT_SIZE, size => apply(size, LINE_HEIGHT.min))
  const lineHeight = largestFitting(LINE_HEIGHT, height => apply(fontSize, height))
  apply(fontSize, lineHeight)

  sheet.style.width = width
  chrome.forEach(element => { element.style.removeProperty('display') })
}

// keeps the resume as large as it can be while staying on a single page
export const useAutoFit = <T extends HTMLElement>() => {
  const ref = useRef<T>(null)
  const width = useRef(0)

  // any edit can change how much content there is, so refit after every render
  useLayoutEffect(() => {
    if (ref.current) fit(ref.current)
  })

  useEffect(() => {
    const sheet = ref.current
    if (!sheet) return

    // how wide the sheet is decides how the text wraps, and that can still
    // change after the first paint (stylesheets, window resize)
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect.width === width.current) continue
        width.current = entry.contentRect.width
        fit(sheet)
      }
    })
    observer.observe(sheet)

    // fonts change the metrics once they finish loading
    void document.fonts.ready.then(() => fit(sheet))

    return () => observer.disconnect()
  }, [])

  return ref
}
